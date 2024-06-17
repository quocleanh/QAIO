package handlers

import (
	"database/sql"
	"go-rest-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

var productscollection *sql.DB

// InitUProductCollection initializes the product collection
func InitProductCollection(client *sql.DB) {
	productscollection = client
}

// GetProducts retrieves all products
func GetProducts(c *gin.Context) {
	rows, err := productscollection.Query("SELECT TOP 100 i.No_ No, i.Class, i.[Content Marketing] Name FROM dbo.Item i WHERE i.[Content Marketing] IS NOT NULL AND i.[Content Marketing] <> ''")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}
	defer rows.Close()
	var products []models.Product
	for rows.Next() {
		var product models.Product
		err := rows.Scan(
			//&product.ID,
			&product.No,
			&product.Name,
			// &product.ManufacturerCode,
			// &product.CountryPurchasedCode,
			&product.Class,
			// &product.SubGroupCode2,
			// &product.ColorCode,
			// &product.SurfaceName,
			// &product.ItemGroup2,
			// &product.Width,
			// &product.Length,
			// &product.BaseUnitOfMeasure,
			// &product.ProductTypeLevel2,
			// &product.ProductTypeLevel2Desc,
			// &product.ProductTypeLevel3,
			// &product.ProductTypeLevel3Desc,
			// &product.Overflow,
			// &product.TapHole,
			// &product.Smart,
			// &product.WallDrainage,
			// &product.FloorDrainage,
			// &product.Depth,
			// &product.Height,
			// &product.Diameter,
			// &product.BathFeets,
			// &product.Shape,
			// &product.CreatedAt,
			// &product.UpdatedAt,
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"msg":     err.Error(),
				"msg_key": "_INTERNAL_SERVER_ERROR_",
				"status":  http.StatusInternalServerError,
			})
			return
		}
		products = append(products, product)
	}
	c.JSON(http.StatusOK, gin.H{
		"data": products,
	})
}
