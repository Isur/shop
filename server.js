const fillDatabase = require('./db/db');
// Setup an Express app
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const socket = require('socket.io');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const app = express();
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var db;
if(process.env.NODE_ENV === 'production')
  db = require('./config/keys').mongoURL_prod;
else
  db = require('./config/keys').mongoURL;

mongoose.connect(db)
  .then(() => console.log("MongoDB Connected"))
  .then(fillDatabase(400))
  .catch(err => console.log(err));
  
// routes:
const search = require('./routes/api/productSearch');
const operations = require('./routes/api/productOperations');
const users = require('./routes/api/userOperations');
const logs = require('./routes/api/logs');
// routes:
app.use('/products', search);  
app.use('/api', operations);
app.use('/user', users);
app.use('/logs', logs);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
      res.status(401).send(err);
  }
  else {
      next(err);
  }
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

const io = socket(server);
io.on('connection', (socket) => {
  console.log('connection with ', socket.id);
  socket.on('test', (data) => {
    io.emit('test', (data));
  })

  socket.on('addProduct', (data) => {
   socket.broadcast.emit('addProduct', {message:data.message});
  })
})


module.exports = app;