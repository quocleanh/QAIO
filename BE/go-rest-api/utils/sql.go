package utils

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/denisenkom/go-mssqldb" // Import driver cho SQL Server
)

func ConnectSQLServer() (*sql.DB, error) {
	connString := os.Getenv("SQL_SERVER_URI")
	log.Println("Connecting to SQL Server..")
	db, err := sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err)
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
