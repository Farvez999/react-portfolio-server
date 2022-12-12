const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mordayw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// const uri = `mongodb+srv:${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mordayw.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const projectsCollection = client.db("portfolioWebsite").collection("projects");


        app.get('/projects', async (req, res) => {
            const query = {}
            const projects = await projectsCollection.find(query).toArray()
            res.send(projects)
        })



        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const categorie = await projectsCollection.findOne(query)
            res.send(categorie)
        })

        app.get('/categories/:name', async (req, res) => {
            const name = req.params.name;
            const query = {
                category: name
            }

            const products = await productsCollection.find(query).toArray()

            // -----------booking paid == Category product dekhabe na--------------- 
            const remainingProduct = products.filter(product => product.paid !== true)
            // -----------booking paid == Category product dekhabe na--------------- 

            res.send(remainingProduct)
        })





    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Portfolio Website is Running')
})

app.listen(port, () => {
    console.log(`Portfolio Website running on Server ${port}`);
})