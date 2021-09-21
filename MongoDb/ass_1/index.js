const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const dataModel = require('./model/model');

const MongoClient = mongo.MongoClient;

const uri = "mongodb+srv://vivek_kumar:La8VWbv9au2YvEP@cluster0.qwbtc.mongodb.net/mongo_ass_1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use(bodyParser.json());

const port = 3001;

app.get('/api/get', (req, res) => {
    client.connect(err => {
        if(err) {
            throw err;
        }
        const collection = client.db('mongo_ass_1').collection('data');
        const fetchedData = {};
        collection.find(fetchedData).toArray(function(err, result) {
            res.send(result);
            client.close();
        });
    })
});

app.get('/api/getStudentDetails', (req, res) => {                     //The API I have written to query through the Database
    const result_1 = req.params.name;
    client.connect(err => {
        if(err) {   
            throw err;
        }
        const collection = client.db('mongo_ass_1').collection('data');
        // const fetchedData = new dataModel({
        //     name : req.params.name
        // });
        const query = {
            name : new RegExp('^' + result_1 , 'i'), // i - case insensitive, => /^S/i
        };
        collection.find(query).toArray(function(err, result) {
            res.send(result);
            client.close();
        })
    })
});

app.post('/api/add', (req, res) => {            //To add Data
    const name1 = req.body.name;
    const collegeName1 = req.body.collegeName;
    const location1 = req.body.location;

    client.connect(err => {
        if(err) {
            throw err;
        }
        
            const collection = client.db('mongo_ass_1').collection('data');
            const storeData = new dataModel({
                name : name1,
                collegeName : collegeName1,
                location : location1
            });
            console.log(storeData);
            collection.insertOne(storeData, function(err, result) {
                res.json({
                    result : "Success"
                });
                console.log(err);
                client.close();
            });
        })
    });

    app.listen(port, () => {
        console.log(`Application running at http://localhost:${port}`)
    })

