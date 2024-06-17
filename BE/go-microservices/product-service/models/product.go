package models
import "time"

// Product represents the structure of a product in the database
type Product struct {
	No                    string    `bson:"no"`
	Name                  string    `bson:"name"`
	ManufacturerCode      string    `bson:"manufacturer_code"`
	CountryPurchasedCode  string    `bson:"country_purchased_code"`
	CountryName           string    `bson:"country_name"`
	Class                 string    `bson:"class"`
	SubGroupCode2         string    `bson:"sub_group_code_2"`
	ColorName             string    `bson:"color_name"`
	SurfaceName           string    `bson:"surface_name"`
	ItemGroup2            string    `bson:"item_group_2"`
	Width                 float64   `bson:"width"`
	Length                float64   `bson:"length"`
	BaseUnitOfMeasure     string    `bson:"base_unit_of_measure"`
	ProductTypeLevel2     string    `bson:"product_type_level_2"`
	ProductTypeLevel2Desc string    `bson:"product_type_level_2_description"`
	ProductTypeLevel3     string    `bson:"product_type_level_3"`
	ProductTypeLevel3Desc string    `bson:"product_type_level_3_description"`
	Overflow              string    `bson:"overflow"`
	TapHole               string    `bson:"tap_hole"`
	TapHoleWithDrain      string    `bson:"tap_hole_with_drain"`
	Smart                 string    `bson:"smart"`
	WallDrainage          string    `bson:"wall_drainage"`
	FloorDrainage         string    `bson:"floor_drainage"`
	ProductGroupName      string    `bson:"product_group_name"`
	StyleName             string    `bson:"style_name"`
	Color                 string    `bson:"color"`
	Surface               string    `bson:"surface"`
	InstallationType      string    `bson:"installation_type"`
	Depth                 float64   `bson:"depth"`
	Height                float64   `bson:"height"`
	Diameter              float64   `bson:"diameter"`
	BathFeets             string    `bson:"bath_feets"`
	Shape                 string    `bson:"shape"`
	Image                 []string  `bson:"image"`
	Price                 []Price   `bson:"price"`
	CreatedAt             time.Time `bson:"created_at"`
	UpdatedAt             time.Time `bson:"updated_at"`
}

// Price represents the structure of a price in the database
type Price struct {
	ItemNo       string    `bson:"item_no"`
	LotNo        string    `bson:"lot_no"`
	StartingDate time.Time `bson:"starting_date"`
	EndingDate   time.Time `bson:"ending_date"`
	SalesType    string    `bson:"sales_type"`
	UOM          string    `bson:"uom"`
	PriceDate    time.Time `bson:"price_date"`
}
