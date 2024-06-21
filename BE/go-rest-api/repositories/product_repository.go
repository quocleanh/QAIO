// repository/product_repository.go

package repositories

import (
	"database/sql"
	"go-rest-api/models"
	"log"
)

type ProductRepository struct {
	DB *sql.DB
}

func NewProductRepository(db *sql.DB) *ProductRepository {
	return &ProductRepository{
		DB: db,
	}
}

// The GetProducts method iterates over the rows returned by the query and scans the values into a Product struct
func (repo *ProductRepository) GetProducts_SQL(pageIndex, pageSize int) ([]models.Product_SQL, error) {
	query := `
			SELECT  
			A.No,
			A.Name,
			A.ManufacturerCode,
			A.CountryPurchasedCode,
			A.Class,
			A.SubGroupCode2,
			A.ColorCode,
			A.SurfaceName,
			A.ItemGroup2,
			A.Width,
			A.Length,
			A.BaseUnitOfMeasure,
			A.ProductTypeLevel2,
			A.ProductTypeLevel2Desc,
			A.ProductTypeLevel3,
			A.ProductTypeLevel3Desc,
			A.ContentMarketing,
			A.DescriptionMarketing,
			A.ContentMarketingEn,
			A.DescriptionMarketingEn,
			A.Overflow,
			A.TapHole,
			A.Smart,
			A.WallDrainage,
			A.FloorDrainage,
			A.Depth,
			A.Height,
			A.Diameter,
			A.BathFeets,
			A.Shape,
			A.CreatedAt,
			A.UpdatedAt ,
			TotalRecords
		FROM
		(
			SELECT i.RowID AS ID,
				i.No_ AS No,
				i.Name,
				ISNULL(i.[Manufacturer Code], '') AS ManufacturerCode,
				ISNULL(i.[Country Purchased Code], '') AS CountryPurchasedCode,
				i.Class,
				ISNULL(i.[Sub Group Code 2], '') AS SubGroupCode2,
				ISNULL(i.[Color Code], '') AS ColorCode,
				ISNULL(i.[Surface], '') AS SurfaceName,
				ISNULL(i.[Item Group 2], '') AS ItemGroup2,
				ISNULL(i.Width, 0) AS Width,
				ISNULL(i.Length, 0) AS Length,
				ISNULL(i.[Base Unit of Measure], '') AS BaseUnitOfMeasure,
				ISNULL(i.[Product Type Level 2], '') AS ProductTypeLevel2,
				ISNULL(i.[Product Type Level 2 Description], '') AS ProductTypeLevel2Desc,
				ISNULL(i.[Product Type Level 3], '') AS ProductTypeLevel3,
				ISNULL(i.[Product Type Level 3 Description], '') AS ProductTypeLevel3Desc,
				ISNULL(i.[Content Marketing], '') AS  'ContentMarketing',
				ISNULL(i.[Description Marketing], '') AS  DescriptionMarketing,
				ISNULL(i.[Content Marketing EN] , '') AS ContentMarketingEn,
				ISNULL(i.[Description Marketing EN] , '') AS DescriptionMarketingEn,
				ISNULL(i.Overflow, 0) AS Overflow,
				ISNULL(i.[Tap Hole], 0) AS TapHole,
				ISNULL(i.Smart, 0) AS Smart,
				ISNULL(i.[Wall Drainage], 0) AS WallDrainage,
				ISNULL(i.[Floor Drainage], 0) AS FloorDrainage,
				ISNULL(i.Depth, 0) AS Depth,
				ISNULL(i.Height, 0) AS Height,
				ISNULL(i.Diameter, 0) AS Diameter,
				ISNULL(i.[Bath Feets], 0) AS BathFeets,
				ISNULL(i.Shape, '') AS Shape,
				i.[Last Date Modified] AS CreatedAt,
				i.[Last Date Modified] AS UpdatedAt,
				ROW_NUMBER() OVER (ORDER BY i.RowID) AS RowNum,
				COUNT(*) OVER () AS TotalRecords -- Tổng số bản ghi
			FROM dbo.Item i
			WHERE i.[Content Marketing] IS NOT NULL
				AND i.[Content Marketing] <> ''
		) AS A
		WHERE A.RowNum
		BETWEEN (@PageIndex - 1) * @PageSize + 1 AND @PageIndex * @PageSize
		ORDER BY A.RowNum
	`
	rows, err := repo.DB.Query(query, sql.Named("PageIndex", pageIndex), sql.Named("PageSize", pageSize))
	if err != nil {
		log.Println("SQL Error when querying products:", err)
		return nil, err
	}
	defer rows.Close()

	var products []models.Product_SQL
	for rows.Next() {
		var product models.Product_SQL
		err := rows.Scan(
			&product.No,
			&product.Name,
			&product.ManufacturerCode,
			&product.CountryPurchasedCode,
			&product.Class,
			&product.SubGroupCode2,
			&product.ColorCode,
			&product.SurfaceName,
			&product.ItemGroup2,
			&product.Width,
			&product.Length,
			&product.BaseUnitOfMeasure,
			&product.ProductTypeLevel2,
			&product.ProductTypeLevel2Desc,
			&product.ProductTypeLevel3,
			&product.ProductTypeLevel3Desc,
			&product.ContentMarketing,
			&product.DescriptionMarketing,
			&product.ContentMarketingEn,
			&product.DescriptionMarketingEn,
			&product.Overflow,
			&product.TapHole,
			&product.Smart,
			&product.WallDrainage,
			&product.FloorDrainage,
			&product.Depth,
			&product.Height,
			&product.Diameter,
			&product.BathFeets,
			&product.Shape,
			&product.CreatedAt,
			&product.UpdatedAt,
			&product.TotalRecords,
		)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return products, nil
}
func (repo *ProductRepository) GetTotalRecords() (int, error) {
	query := `
	SELECT COUNT(*) AS TotalRecords
	FROM dbo.Item i
	WHERE i.[Content Marketing] IS NOT NULL
		AND [Item Category Code] NOT LIKE N'%GC'
          AND No_ NOT LIKE N'%-GC'
          AND No_ NOT LIKE N'%-XR'
          AND No_ NOT LIKE N'%_LOI'
          AND [Account Type] IN ( 0, 4, 99 )
          AND [Website Vietceramics] = 1
          AND [Description Marketing] <> ''
          AND Nonstock <> 1
	`
	var totalRecords int
	err := repo.DB.QueryRow(query).Scan(&totalRecords)
	if err != nil {
		return 0, err
	}
	return totalRecords, nil
}
