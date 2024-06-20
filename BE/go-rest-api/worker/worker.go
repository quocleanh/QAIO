package worker

import (
	"context"
	"go-rest-api/repositories"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
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
	totalRecords, err := w.ProductRepo.GetTotalRecords()
	if err != nil {
		log.Println("Error when getting total records:", err)
		return
	}
	pageIndex := 1
	pageSize := 100
	for pageIndex <= totalRecords/pageSize+1 {
		// Lấy dữ liệu sản phẩm từ SQL
		products, err := w.ProductRepo.GetProducts(pageIndex, pageSize)
		if err != nil {
			log.Println("Error when getting products:", err)
			return
		}
		for _, product := range products {
			// Kiểm tra xem sản phẩm đã tồn tại trong MongoDB chưa
			filter := bson.M{"no": product.No}
			var existingProduct bson.M
			err := w.MongoClient.Database("products").Collection("products").FindOne(context.Background(), filter).Decode(&existingProduct)
			if err == mongo.ErrNoDocuments {
				// Nếu sản phẩm chưa tồn tại thì thêm mới
				_, err := w.MongoClient.Database(os.Getenv("MONGO_DB_NAME")).Collection("products").InsertOne(context.Background(), product)
				if err != nil {
					log.Println("Error when inserting product:", err)
				}
			} else if err != nil {
				log.Println("Error when checking existing product:", err)
			} else {
				// Nếu sản phẩm đã tồn tại thì cập nhật
				update := bson.M{"$set": product}
				_, err := w.MongoClient.Database(os.Getenv("MONGO_DB_NAME")).Collection("products").UpdateOne(context.Background(), filter, update)
				if err != nil {
					log.Println("Error when updating product:", err)
				}
			}
		}

		log.Println("Product sync completed!")
	}
}
