const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';


MongoClient.connect(url, (err, database) => {

    assert.equal(err, null);

    const db_name = database.db('conFusion');

    console.log("Connected correctly to the server");

    const collection = db_name.collection("dishes");
    collection.insertOne({ "name": "Uthappizza", "description": "test" },
        (err, result) => {

            assert.equal(err, null);

            console.log("After Insert:\n");
            console.log(result.ops);
            collection.find({}).toArray((err, docs) => {

                assert.equal(err, null);
                console.log("Found:\n");
                console.log(docs);
                db_name.dropCollection("dishes", (err, result) => {
                    assert.equal(err, null);
                    
                    database.close();

                });

            });
        });

});








