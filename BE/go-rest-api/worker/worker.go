package worker

import (
	"context"
	"go-rest-api/models"
	"go-rest-api/repositories"
	"log"
	"math"
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

	// Sau đó tiếp tục 12:00 AM hàng ngày
	for {
		now := time.Now()
		nextMidnight := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local).AddDate(0, 0, 1)
		time.Sleep(nextMidnight.Sub(now))
		w.syncProducts()
	}

}

func (w *Worker) syncProducts() {
	log.Println("Starting product sync...")
	totalRecords, err := w.ProductRepo.GetTotalRecords()
	if err != nil {
		log.Println("Error when getting total records:", err)
		return
	}
	pageIndex := 0
	pageSize := 10
	totalPages := int(math.Round(float64(totalRecords)/float64(pageSize))) + 1
	for pageIndex <= totalPages {
		pageIndex++
		products_SQL, err := w.ProductRepo.GetProducts_SQL(pageIndex, pageSize)
		if err != nil {
			log.Println("Error when getting products:", err)
			return
		}
		products := models.ConvertToProducts(products_SQL)
		for _, product := range products {
			// Kiểm tra xem sản phẩm đã tồn tại trong MongoDB chưa
			filter := bson.M{"no": product.No}
			var existingProduct bson.M
			err := w.MongoClient.Database(os.Getenv("MONGO_DB_NAME")).Collection("products").FindOne(context.Background(), filter).Decode(&existingProduct)
			if err == mongo.ErrNoDocuments {
				// Nếu sản phẩm chưa tồn tại thì thêm mới
				_, err := w.MongoClient.Database(os.Getenv("MONGO_DB_NAME")).Collection("products").InsertOne(context.Background(), product)
				if err != nil {
					log.Println("Error when inserting product:", err)
				}
				log.Println("Inserted product:", product.No)
			} else if err != nil {
				log.Println("Error when checking existing product:", err)
			} else {
				// Nếu sản phẩm đã tồn tại thì cập nhật
				update := bson.M{"$set": product}
				_, err := w.MongoClient.Database(os.Getenv("MONGO_DB_NAME")).Collection("products").UpdateOne(context.Background(), filter, update)
				if err != nil {
					log.Println("Error when updating product:", err)
				}
				log.Println("Updated product:", product.No)
			}
		}

	}
}
