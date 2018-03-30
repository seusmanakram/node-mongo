const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');
const url = 'mongodb://localhost:27017/conFusion';


MongoClient.connect(url, (err, database) => {

    assert.equal(err, null);

    const db_name = database.db('conFusion');

    console.log("Connected correctly to the server");

    dboper.insertDocument(db_name, { name: "Vadounat", description: "Hello" }, "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db_name, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db_name, { name: "Vadounat" },
                { description: "Updated Text" }, "dishes",
                (result) => {
                    console.log("Updated Document:\n", result.result);
                    dboper.findDocuments(db_name, "dishes", (docs) => {
                        console.log("Found Updated Documents:\n", docs);

                        db_name.dropCollection("dishes", (result) => {
                            console.log("Dropped Collection: ", result);
                            database.close();
                        });
                    });

                });
        });

    });


});








