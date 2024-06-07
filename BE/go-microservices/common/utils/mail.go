package utils

import (
	"fmt"
	"net/smtp"
	"os"
)

func SendMail(MailTo, Subject, Body string) error {
	from := os.Getenv("email_username")
	password := os.Getenv("email_password")
	FromName := os.Getenv("email_fullname")
	to := []string{MailTo}

	host := os.Getenv("email_host")
	port := os.Getenv("email_port")
	address := host + ":" + port

	// Tạo tiêu đề MIME cho email HTML
	headers := make(map[string]string)
	headers["From"] = fmt.Sprintf("%s <%s>", FromName, from)
	headers["To"] = MailTo
	headers["Subject"] = Subject
	headers["MIME-version"] = "1.0"
	headers["Content-Type"] = "text/html; charset=\"UTF-8\""

	// Tạo thân email
	message := ""
	for key, value := range headers {
		message += fmt.Sprintf("%s: %s\r\n", key, value)
	}
	message += "\r\n" + Body

	auth := smtp.PlainAuth("", from, password, host)

	// Gửi email
	err := smtp.SendMail(address, auth, from, to, []byte(message))
	if err != nil {
		return err
	}
	return nil
}

// Đọc nội dung file html
func HTMLFileContent(filePath string) (string, error) {
	htmlBytes, err := os.ReadFile(filePath)
	if err != nil {
		return "", err
	}
	htmlContent := string(htmlBytes)
	return htmlContent, nil
}
