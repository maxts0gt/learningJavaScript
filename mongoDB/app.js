import {
    MongoClient
} from "mongodb";
import {
    createRequire
} from "module";
const require = createRequire(
    import.meta.url);

const assert = require("assert");

const uri = "mongodb://localhost:27017/";
const dbName = "fruitsDB";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection("fruits");
        // craete an array of documents to insert
        // const docs = [{
        //     name: "Apple",
        //     score: 8,
        //     review: "Great fruit"
        // }, {
        //     name: "Orange",
        //     score: 6,
        //     review: "Kinda sour"
        // }, {
        //     name: "Banana",
        //     score: 9,
        //     review: "Great stuff"
        // }]

        // const options = {
        //     ordered: true,
        // };
        // const result = await collection.insertMany(docs, options);
        // console.log(`${result.insertedCount} documents were inserted`);

        // finding documents inside the table

        const query = {

            name: "Banana"
        };
        const options = {

            // Include only the `score` and `review` fields in the returned document
            projection: {
                _id: 0,
                score: 1,
                review: 1
            },
        };

        const result = await collection.findOne(query, options);
        // since this method returns the matched document, not a cursor, print it directly
        console.log(result);


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);