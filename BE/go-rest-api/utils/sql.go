package utils

import (
	"database/sql"
	"log"

	_ "github.com/denisenkom/go-mssqldb" // Import driver cho SQL Server
)

// ConnectSQLServer thiết lập kết nối tới SQL Server và trả về đối tượng *sql.DB
func ConnectSQLServer(uri string) (*sql.DB, error) {
	db, err := sql.Open("sqlserver", uri)
	if err != nil {
		return nil, err
	}

	// Kiểm tra kết nối
	if err := db.Ping(); err != nil {
		return nil, err
	}

	log.Println("Successfully connected to SQL Server")
	return db, nil
}
