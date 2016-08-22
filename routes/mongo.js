//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydata';

function opendatabase(){
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
  }
})
}

function insert(data){
    // Get the documents collection
    var collection = db.collection('traindata');

    //Create some users
    //var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};

    // Insert some users
    collection.insert(data, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the  collection. The documents inserted with "_id" are:', result.length, result);
      }
    })}

function closedatabase(){
      //Close connection
      db.close();
    }