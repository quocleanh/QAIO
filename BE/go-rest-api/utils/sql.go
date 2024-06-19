package utils

import (
	"database/sql"

	_ "github.com/denisenkom/go-mssqldb" // Import driver cho SQL Server
)

func ConnectSQLServer(connectionString string) (*sql.DB, error) {
	db, err := sql.Open("sqlserver", connectionString)
	if err != nil {
		return nil, err
	}
	return db, nil
}
