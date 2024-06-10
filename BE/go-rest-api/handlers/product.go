package handlers

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var productsollection *mongo.Collection

// Khởi tạo usersCollection và tạo chỉ mục unique cho email
func InitUProductCollection(client *mongo.Client) {
	usersCollection = client.Database("go_rest_api").Collection("product")
	indexModel := mongo.IndexModel{
		Keys: bson.M{
			"No": 1,
		},
		Options: options.Index().SetUnique(true),
	}
	usersCollection.Indexes().CreateOne(context.Background(), indexModel)
}
