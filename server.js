const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require('path');

const documents = require('./routes/document');  

const app = express();
app.use(bodyParser.json());


app.use('/document', documents);

// // Serve static assets if in production
// if(process.env.NODE_ENV == 'production'){
//     // Set static folder
//     add.use(express.static('client/build'));

//     app.get('*', (req) => {
//         res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
//     });
// }

const elastic = require('./elasticsearch');  
elastic.indexExists().then(function (exists) {  
    console.log("test");
  if (exists) {
    return elastic.deleteIndex();
  }
}).then(function () {
  return elastic.initIndex().then(elastic.initMapping).then(function () {
    //Add a few titles for the autocomplete
    //elasticsearch offers a bulk functionality as well, but this is for a different time
    const promises = [
      'Thing Explainer',
      'The Internet Is a Playground',
      'The Pragmatic Programmer',
      'The Hitchhikers Guide to the Galaxy',
      'Trial of the Clone'
    ].map(function (bookTitle) {
      return elastic.addDocument({
        title: bookTitle,
        content: bookTitle + " content",
        metadata: {
          titleLength: bookTitle.length
        }
      });
    });
    return Promise.all(promises);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));