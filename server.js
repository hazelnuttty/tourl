const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb){
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.send("No file uploaded");
  const fileUrl = `/uploads/${req.file.filename}`;
  res.send(`File URL: ${fileUrl}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
