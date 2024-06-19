package worker

import (
	"context"
	"encoding/json"
	"go-rest-api/repositories"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Worker struct {
	ProductRepo *repositories.ProductRepository
	MongoClient *mongo.Client
}

func ProductWorker(productRepo *repositories.ProductRepository, mongoClient *mongo.Client) *Worker {
	return &Worker{
		ProductRepo: productRepo,
		MongoClient: mongoClient,
	}
}

func (w *Worker) Run() {
	// Chạy lần đồng bộ đầu tiên ngay lập tức
	w.syncProducts()

	// Sau đó tiếp tục đồng bộ mỗi 24 giờ
	ticker := time.NewTicker(24 * time.Hour)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			w.syncProducts()
		}
	}
}
func (w *Worker) syncProducts() {
	log.Println("Starting product sync...")
	products, err := w.ProductRepo.GetProducts(1, 10)
	if err != nil {
		log.Println("Error when getting products:", err)
		return
	}
	productsJSON, err := json.Marshal(products)
	log.Println("Fetched products:", string(productsJSON))

	return
	var upsertDocs []mongo.WriteModel
	for _, product := range products {
		// Bỏ qua sản phẩm nếu `No` bị null hoặc rỗng
		if product.No == "" {
			log.Println("Skipping product with null No:", product)
			continue
		}
		filter := bson.M{"no": product.No}
		update := bson.M{"$set": product}
		upsertDocs = append(upsertDocs, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true))
	}

	if len(upsertDocs) == 0 {
		log.Println("No valid products to sync.")
		return
	}

	session, err := w.MongoClient.StartSession()
	if err != nil {
		log.Println("Error when starting session:", err)
		return
	}
	defer session.EndSession(context.Background())

	err = mongo.WithSession(context.Background(), session, func(sc mongo.SessionContext) error {
		if err := session.StartTransaction(); err != nil {
			return err
		}

		_, err := w.MongoClient.Database("go_rest_api").Collection("products").BulkWrite(sc, upsertDocs, options.BulkWrite().SetOrdered(false))
		if err != nil {
			log.Println("Error upserting products:", err)
			if abortErr := session.AbortTransaction(sc); abortErr != nil {
				log.Println("Error aborting transaction:", abortErr)
			}
			return err
		}

		if err := session.CommitTransaction(sc); err != nil {
			log.Println("Error committing transaction:", err)
			return err
		}

		return nil
	})

	if err != nil {
		log.Println("Error during session with transaction:", err)
	}
	log.Println("Product sync completed!")
}
