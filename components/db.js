const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://lylaw:lylaw@pentago-db.3rvcu.mongodb.net/?retryWrites=true&w=majority&appName=PentaGo-db";
const DbClient = new MongoClient(uri);

export default DbClient;

