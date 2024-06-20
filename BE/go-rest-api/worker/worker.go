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

	// Lấy dữ liệu sản phẩm từ SQL
	products, err := w.ProductRepo.GetProducts(1, 11)
	if err != nil {
		log.Println("Error when getting products:", err)
		return
	}

	for _, product := range products {
		// Bỏ qua sản phẩm nếu `No` bị null hoặc rỗng
		if product.No == "" {
			log.Println("Skipping product with null No:", product)
			continue
		}

		filter := bson.M{"no": product.No}
		update := bson.M{"$set": bson.M{"name": product.Name}}

		// Chuyển đổi product sang JSON để log
		productJSON, err := json.Marshal(product)
		if err != nil {
			log.Println("Error marshalling product to JSON:", err)
			continue
		}

		// Log chi tiết sản phẩm dưới dạng JSON
		log.Printf("Upserting product: %s\n", productJSON)

		// Thực hiện upsert sản phẩm vào MongoDB, chỉ cập nhật trường "name"
		_, err = w.MongoClient.Database("go_rest_api").Collection("products").UpdateOne(context.Background(), filter, update, options.Update().SetUpsert(true))
		if err != nil {
			log.Println("Error upserting product:", string(productJSON), err)
			continue
		}
	}

	log.Println("Product sync completed!")
}
