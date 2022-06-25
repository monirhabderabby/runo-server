const express = require('express')
const cors = require("cors");
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@runo.iucnn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    await client.connect();
    const blogCollection = client.db("RUNO").collection("BLOGS");

    // All GET API
    app.get('/blogs', async (req, res)=> {
        const query = {};
        const result = await blogCollection.find(query).toArray();
        res.send(result)
    })

    app.get('/blogs/:category', async (req, res)=> {
        const category = req.params.category;
        const query = {category: category}
        const result = await blogCollection.find(query).toArray();
        res.send(result)

    })

    app.get('/blog/:id', async (req, res)=> {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await blogCollection.findOne(query);
      res.send(result)
      

  })

    // All POST API
  }
  finally{

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})