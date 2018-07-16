  // Setup an Express app
  const express = require('express');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const app = express();
  app.use(bodyParser.json());

  const db = require('./config/keys').mongoURL;
  mongoose.connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
  
  // routes:
  const search = require('./routes/api/productSearch');
  const operations = require('./routes/api/productOperations');
  // routes:
  app.use('/products', search);  
  app.use('/api', operations);

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server started on port ${port}`));