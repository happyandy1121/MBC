require('dotenv').config();
const mysql = require('mysql2');

// 建立 MySQL 連線
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'test',
    port: process.env.DB_PORT
});

// 測試連線
connection.connect((err) => {
    if (err) {
        console.error('連線錯誤: ' + err.stack);
        return;
    }
    console.log('已成功連線至 MySQL，連線ID: ' + connection.threadId);

    // 在連線成功後執行查詢
    connection.query('SELECT * FROM test.dog', (err, results, fields) => {
        if (err) {
            console.error('查詢錯誤: ' + err.message);
            connection.end();  // 如果查詢出錯，立即關閉連線
            return;
        }
        console.log('查詢結果:', results);

        // 關閉連線
        connection.end();
    });
});
