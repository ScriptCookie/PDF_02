var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
const cors = require('cors');
const { response } = require('express');
const { json } = require('body-parser');
const options = {useUnifiedTopology: true};
var db;
var url = "mongodb://localhost:27017/EvaluationDB/EvaluationDB"

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

MongoClient.connect(url, options, function(err, dataBase) {
    if(err) {
        console.log("연결실패");
        return
    } else{
        console.log("연결성공")
    }
    db = dataBase;
})
//--------------------------------------------------------------------- Manager ---------------------------------------------------------------------------------------

let managerName;
let managetUrl;
let managerSubject;

app.get('/managerdata', function(req, res) {
    res.json([managerName , managerSubject]);
})

app.post('/manager', function(req, res) {
    let result;
    var table = db.db("EvaluationDB");
    const {number , pw , name, subjectNames} = req.body;
    var datas = ({name : name , number : number , pw : pw, subjectNames : subjectNames})

    table.collection('manager').find().toArray(function(err, docs) {
        for(var i = 0 ; i < docs.length ; i++) {
            if(number === docs[i].number) {
                result = docs[i].number;
                res.send(false);
                break;
            }
        }
        if(result === undefined) {
            table.collection('manager').insertOne(datas, function(err, docs) {
                if(err) {
                    console.log('managerPost err');
                }
                console.log('manager insert');
                res.send(true); 
            })
        }
    })
})

app.post('/loginmanager', function(req, res) {
    let loginResult;
    const {loginnumber, loginpw} = req.body;

    var table = db.db("EvaluationDB");
    table.collection('manager').find().toArray(function(err, docs) {
        if(err) {
            console.log('managerFind err')
        }
        for(i = 0 ; i < docs.length ; i++) {
            if(loginnumber === docs[i].number) {
                loginResult = true;
                managerName = docs[i].name;
                managetUrl = docs[i]._id;
                managerSubject = docs[i].subjectNames
                break;
            } else {
                loginResult = false;
            }
        }
        //console.log(loginResult);
        res.send(loginResult);
    })
})

app.post('/managerReload', function(req, res) {
    const {nowurl} = req.body;
    console.log('dd', nowurl);
    var table = db.db("EvaluationDB");
    table.collection('manager').find().toArray(function(err, docs) {
        if(err) {
            console.log('managerUrl err')
        }
        for(var i = 0 ; i < docs.length ; i++) {
            if(nowurl === docs[i].number) {
                res.json(docs[i].name)
            }
        }
    }
)

})

app.post('/createSubject', function(req, res) {
    const {sub} = req.body;
    console.log(sub);

    var table = db.db("EvaluationDB");
    var currentName = {_id : managetUrl};
    var newSubject = {$push : {subjectNames : sub}};
    console.log('이름', managerName);
    table.collection('manager').updateOne(currentName, newSubject, function(err, res) {
        if(err) {
            console.log('update err')
        }
        console.log('update')
    })
})

app.listen(9000 , (req, res) => {
    console.log('server start');
});