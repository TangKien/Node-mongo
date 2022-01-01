const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

// MongoClient.connect(url, (err,client) => {

//     assert.equal(err,null);
//     console.log('Connected to the server');

//     const db = client.db(dbname);

/* Mongo part 1
    const collection = db.collection('dishes');

    collection.insertOne({"name" : "Uthappizza","description" : "test"}, (err,result) => {
        assert.equal(err,null);
        console.log("After Insert:\n");
        console.log(result);
        
        collection.find({}).toArray((err,docs) => {
            assert.equal(err,null);
            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes', (err,result) => {
                assert.equal(err,null);
                client.close();
            })
        })
    })
    */

/* mongo part 2
    dboper.insertDocument(db,{name : "Vadonut",description : "Test"}, 'dishes' , (result) => {
        console.log("Insert Document:\n" , result);

        dboper.findDocuments(db,'dishes', (docs) => {
            console.log('Found Documents:\n' , docs);

            dboper.updateDocument(db,{name:'Vadonut'},{description : 'Updated test'},'dishes',(result) => {
                console.log('Updated Document:\n', result);
                db.dropCollection('dishes',(result) => {
                    console.log("Drop Collection: " , result);
                    client.close();
                })
            })
        })
    })
    */

// });

MongoClient.connect(url)
  .then((client,err) => {
    assert.equal(err, null);
    console.log("Connected to the server");
    const db = client.db(dbname);
    dboper
      .insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes")
      .then((result) => {
        console.log("Insert Document:\n", result);
        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found Documents:\n", docs);
        return dboper.updateDocument(
          db,
          { name: "Vadonut" },
          { description: "Updated test" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("Updated Document:\n", result);
        return db.dropCollection("dishes");
      })
      .then((result) => {
        console.log("Drop Collection: ", result);
        client.close();
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
