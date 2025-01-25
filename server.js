const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const data = `姓名: ${name}, 电子邮件: ${email}\n`;

  // 将数据追加到文件中
  fs.appendFile('submissions.txt', data, (err) => {
    if (err) throw err;
    console.log('数据已保存到 submissions.txt');
  });

  res.send('表单数据已提交');
});

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
