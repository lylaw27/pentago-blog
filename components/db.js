const { MongoClient } = require('mongodb');

const DbClient = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

export default DbClient;
