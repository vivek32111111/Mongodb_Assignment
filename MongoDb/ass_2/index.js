const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongo = require('mongodb');
const model = require('./model/model');
const { collection } = require('./model/model');

const MongoClient = mongo.MongoClient;
const uri = "mongodb+srv://vivek_kumar:La8VWbv9au2YvEP@cluster0.qwbtc.mongodb.net/mongo_ass_2?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(bodyParser.json());

const port = 3003;

app.post('/quote/add', (req, res) => {
    const enter_quote = req.body.quote;
    const enter_author = req.body.author;
    client.connect(err => {
        if(err) {
            throw err;
        }
        const collection = client.db('mongo_ass_2').collection('data');
        const addQuery = new model({
            quote : enter_quote,
            author : enter_author
        });
        collection.insertOne(addQuery, function(err, result) {
            res.json({
                "result" : "success"
            });
            client.close();
        });
    });
});

app.get('/quote/getAll', (req, res) => {
    client.connect(err => {
        if(err) {
            throw err;
        }
        const collection = client.db('mongo_ass_2').collection('data');
        const fetchData = {};
        collection.find(fetchData).toArray(function(err, result) {
            res.send(result);
            client.close();
        })
    })
});

app.listen(port, () => {
    console.log(`Application running at http://localhost:${port}`);
});
