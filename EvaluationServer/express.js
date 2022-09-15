var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
const path = require('path')
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
let managerSubName;

app.post('/assignments' , function(req, res) {
    const {name , subject, assiname, explains, date} = req.body;
    console.log('name' , name)
    console.log('subject' , subject)
    console.log('assiname' , assiname)
    console.log('explains' , explains)
    console.log('date' , date)

    var table = db.db("EvaluationDB");
    var currentName = {name : name, subjectNames : subject};
    var newAssignment = {$push : {assignment : assiname}}
    table.collection('manager').updateOne(currentName, newAssignment,  function(err, res) {
        if(err) {
            console.log('assignment update err')
        }
        console.log('assignment update')
    })

})

app.post('/managerList', function(req, res) {
    const {list} = req.body;
    managerSubName = list;

    var table = db.db("EvaluationDB");
    table.collection('manager').find().toArray(function(err, docs) {
        for(var i = 0 ; i < docs.length ; i++) {
            if(managerName === docs[i].name) {
                for(var j = 0 ; j < docs[i].subjectNames.length ; j++) {
                    if(list === docs[i].subjectNames[j]) {
                        res.json(docs[i].subjectNames[j]);
                    }
                }
            }
        }
    })
})

app.post('/managerSubName', function(req, res) {
    res.json([managerName, managerSubName]);
})

app.post('/managerdata', function(req, res) {
    const {respon} = req.body;
    console.log('res', respon);


    var table = db.db("EvaluationDB");

    table.collection('manager').find().toArray(function(err, docs) {
        for(var i = 0 ; i < docs.length ; i++) {
            if(managerName === docs[i].name) {
                res.json([docs[i].name, docs[i].subjectNames])
            }
        }
    })
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
                break;
            } else {
                loginResult = false;
            }
        }
        res.send(loginResult);
    })
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

app.use(express.static(path.join(__dirname, 'EvaluationClient/build')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'EvaluationClient/build/index.html'))
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'EvaluationClient/build/index.html'))
})