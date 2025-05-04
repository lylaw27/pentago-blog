const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://lylaw:lylaw@pentago-db.3rvcu.mongodb.net/?retryWrites=true&w=majority&appName=PentaGo-db";
const DbClient = new MongoClient(uri);

// export default function DbClient() {
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
//     return new MongoClient(uri, {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     });
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // return(client);
// }

export default DbClient;

