const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lylaw:lylaw@pentago-db.3rvcu.mongodb.net/?retryWrites=true&w=majority&appName=PentaGo-db";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default async function Dbconnect(collection) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db().collection(collection);
        return(db);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}