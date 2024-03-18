const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');
const app = express();
const path = require('path');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'k16753121',
  database: 'my_database',
});

// MySQL 연결
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL에 연결되었습니다!');
});

// 파일 업로드를 위한 multer 설정
const upload = multer({ dest: 'uploads/' });

// 이미지를 데이터베이스에 저장하는 API 엔드포인트
app.post('/api/save-image', upload.single('image'), (req, res) => {
  fs.readFile(req.file.path, (err, data) => {
    if (err) throw err;
    const image = data.toString('base64');
    const sql = 'INSERT INTO images (image_data) VALUES (?)';
    db.query(sql, image, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
});

// API 엔드포인트 생성
app.get('/api/data', (req, res) => {
  let sql = 'SELECT * FROM images';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// React 앱의 빌드 폴더를 정적 폴더로 설정
app.use(express.static(path.join(__dirname, 'build')));

// 모든 라우팅에 대해 index.html 파일 제공
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(8080, () => {
  console.log('서버가 8080 포트에서 실행 중입니다.');
});
