package models

import "time"

type Product struct {
	No                    string    `json:"no"`
	Name                  string    `json:"name"`
	ManufacturerCode      string    `json:"manufacturer_code"`
	CountryPurchasedCode  string    `json:"country_purchased_code"`
	Class                 string    `json:"class"`
	SubGroupCode2         string    `json:"sub_group_code_2"`
	ColorCode             string    `json:"color_code"`
	SurfaceName           string    `json:"surface_name"`
	ItemGroup2            string    `json:"item_group_2"`
	Width                 float64   `json:"width"`
	Length                float64   `json:"length"`
	BaseUnitOfMeasure     string    `json:"base_unit_of_measure"`
	ProductTypeLevel2     string    `json:"product_type_level_2"`
	ProductTypeLevel2Desc string    `json:"product_type_level_2_desc"`
	ProductTypeLevel3     string    `json:"product_type_level_3"`
	ProductTypeLevel3Desc string    `json:"product_type_level_3_desc"`
	Overflow              int       `json:"overflow"`
	TapHole               int       `json:"tap_hole"`
	Smart                 int       `json:"smart"`
	WallDrainage          int       `json:"wall_drainage"`
	FloorDrainage         int       `json:"floor_drainage"`
	Depth                 float64   `json:"depth"`
	Height                float64   `json:"height"`
	Diameter              float64   `json:"diameter"`
	BathFeets             int       `json:"bath_feets"`
	Shape                 string    `json:"shape"`
	CreatedAt             time.Time `json:"created_at"`
	UpdatedAt             time.Time `json:"updated_at"`
	RowNum                int       `json:"row_num"`
	TotalRecords          int       `json:"total_records"`
}
