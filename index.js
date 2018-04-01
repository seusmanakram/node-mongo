const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');
const url = 'mongodb://localhost:27017/conFusion';


MongoClient.connect(url).then( (database) => {


    const db_name = database.db('conFusion');

    console.log("Connected correctly to the server");

    dboper.insertDocument(db_name, { name: "Vadounat", description: "Hello" }, "dishes")
    .then((result) => {
        console.log("Insert Document:\n", result.ops);

        return dboper.findDocuments(db_name, "dishes");
    })
    .then( (docs) => {
        console.log("Found Documents:\n", docs);

        return dboper.updateDocument(db_name, { name: "Vadounat" },
            { description: "Updated Text" }, "dishes");
    })
    .then( (result) => {
        console.log("Updated Document:\n", result.result);
                    
        return dboper.findDocuments(db_name, "dishes");
    })
    .then( (docs) => {
        console.log("Found Updated Documents:\n", docs);

        return db_name.dropCollection("dishes");
    })
    .then( (result) => {
        console.log("Dropped Collection: ", result);
        return database.close();
    })
    .catch((err) => console.log(err));
                  

}, (err) => console.log(err)).catch( (err) => console.log(err));








