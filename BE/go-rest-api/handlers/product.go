// handlers/product.go

package handlers

import (
	"net/http"
	"strconv"

	"go-rest-api/repositories"

	"github.com/gin-gonic/gin"
)

type ProductHandler struct {
	Repo *repositories.ProductRepository
}

func NewProductHandler(repo *repositories.ProductRepository) *ProductHandler {
	return &ProductHandler{
		Repo: repo,
	}
}

func (h *ProductHandler) GetProducts(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	pageIndexStr := c.Query("pageIndex")
	pageSizeStr := c.Query("pageSize")

	pageIndex, err := strconv.Atoi(pageIndexStr)
	if err != nil {
		pageIndex = 1
	}

	pageSize, err := strconv.Atoi(pageSizeStr)
	if err != nil {
		pageSize = 100
	}
	if pageSize > 100 {
		pageSize = 100
	}
	products, err := h.Repo.GetProducts(pageIndex, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal Server Error",
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  "500",
		})
		return
	}
	if products == nil {
		c.JSON(http.StatusOK, gin.H{
			"message": "Success",
			"msg_key": "_SUCCESS_",
			"status":  "200",
			"data":    nil,
		})
	} else {
		productResponse := gin.H{
			"products":     products,
			"pageIndex":    pageIndex,
			"pageSize":     pageSize,
			"totalRecords": products[len(products)-1].TotalRecords,
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "Success",
			"msg_key": "_SUCCESS_",
			"status":  "200",
			"data":    productResponse,
		})
	}

}
