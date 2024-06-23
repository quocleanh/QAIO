package models

import "time"

// cấu trúc dữ liệu của sản phẩm chuẩn
type Product struct {
	No                     string    `json:"no"`
	Name                   string    `json:"name"`
	ManufacturerCode       string    `json:"manufacturer_code"`
	CountryPurchasedCode   string    `json:"country_purchased_code"`
	Class                  string    `json:"class"`
	SubGroupCode2          string    `json:"sub_group_code_2"`
	ColorCode              string    `json:"color_code"`
	SurfaceName            string    `json:"surface_name"`
	ItemGroup2             string    `json:"item_group_2"`
	Width                  float64   `json:"width"`
	Length                 float64   `json:"length"`
	BaseUnitOfMeasure      string    `json:"base_unit_of_measure"`
	ProductTypeLevel2      string    `json:"product_type_level_2"`
	ProductTypeLevel2Desc  string    `json:"product_type_level_2_desc"`
	ProductTypeLevel3      string    `json:"product_type_level_3"`
	ProductTypeLevel3Desc  string    `json:"product_type_level_3_desc"`
	ContentMarketing       string    `json:"content_marketing"`
	DescriptionMarketing   string    `json:"description_marketing"`
	ContentMarketingEn     string    `json:"content_marketing_en"`
	DescriptionMarketingEn string    `json:"description_marketing_en"`
	Overflow               int       `json:"overflow"`
	TapHole                int       `json:"tap_hole"`
	Smart                  int       `json:"smart"`
	WallDrainage           int       `json:"wall_drainage"`
	FloorDrainage          int       `json:"floor_drainage"`
	Depth                  float64   `json:"depth"`
	Height                 float64   `json:"height"`
	Diameter               float64   `json:"diameter"`
	BathFeets              int       `json:"bath_feets"`
	Shape                  string    `json:"shape"`
	CreatedAt              time.Time `json:"created_at"`
	UpdatedAt              time.Time `json:"updated_at"`
}

// cấu trúc dữ liệu của giá bán
type SalesPrice struct {
	ProductNo string  `json:"product_no"`
	Price     float64 `json:"price"`
	FromDate  string  `json:"from_date"`
	ToDate    string  `json:"to_date"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

// cấu trúc dữ liệu của thông tin sản phẩm
// bao gồm thông tin sản phẩm, hình ảnh và giá bán
// dùng để trả về cho API
type ProductInfomation struct {
	Product
	Imags      []string     `json:"images"`
	SalesPrice []SalesPrice `json:"sales_price"`
}

// cấu trúc dữ liệu của sản phẩm trong SQL Server
type Product_SQL struct {
	Product
	TotalRecords int `json:"total_records"`
}

func ConvertToProducts(sqlProduct []Product_SQL) []Product {
	products := make([]Product, 0)
	for _, product := range sqlProduct {
		products = append(products, product.Product)
	}
	return products
}
