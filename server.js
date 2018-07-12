  // Setup an Express app
  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require('path');
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
  app.use('/search', search);  
  app.use('/', operations);


// // Serve static assets if in production
// if(process.env.NODE_ENV == 'production'){
//     // Set static folder
//     add.use(express.static('client/build'));

//     app.get('*', (req) => {
//         res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
//     });
// }

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));