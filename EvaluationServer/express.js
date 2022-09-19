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

app.post('/invite', function(req, res) {
    var table = db.db("EvaluationDB");
    table.collection('manager').find().toArray(function(err, docs) {
        for(var i = 0 ; i < docs.length ; i++) {
            if(managerName === docs[i].name) {
                res.json(docs[i]._id);
            }
        }
    })
})

app.post('/assignments' , function(req, res) {
    const {name , subject, assiname, explains, date} = req.body;

    var table = db.db("EvaluationDB");

    table.collection('manager').find().toArray(function(err, docs) {
        for(var i = 0 ; i < docs.length ; i++) {
            if(name === docs[i].name) {
                console.log('subName', docs[i].subjectNames)
                for(var j = 0 ; j < docs[i].subjectNames.length ; j++) {
                    if(docs[i].subjectNames[j] === subject) {
                        console.log('same', docs[i].subjectNames[j]);
                        var currentSubName = {subjectNames : docs[i].subjectNames[j]}
                        var newAssignment = {$push : {subject : [docs[i].subjectNames[j] , assiname, explains, date]}}
                        table.collection('manager').updateOne(currentSubName, newAssignment, function(err, res) {
                            if(err) {
                                console.log('assignment update err')
                            }
                            console.log('assignment update')
                        })
                    }
                }
            }
        }
    })

})

const assignmentList = [];

app.post('/assilist', function(req, res) {
    var table = db.db("EvaluationDB");

    table.collection('manager').find().toArray(function(err, docs) {
        for(var i = 0 ; i < docs.length ; i++) {
            if(managerName === docs[i].name) {
                for(var j = 0 ; j < docs[i].subject.length ; j++) {
                    if(docs[i].subject[j][0] === managerSubName) {
                        assignmentList.push(docs[i].subject[j]);
                    }
                }
            }
        }
        res.json(assignmentList);
        assignmentList.length = 0;
    })
})

let solvingName;
let solvingText;

app.post('/SolvingList', function(req, res) {
    const {name , text} = req.body;
    solvingName = name;
    solvingText = text;
    res.send('posting');
})

app.post('/Solving', function(req, res) {
    console.log(solvingName, solvingText)
    var table = db.db("EvaluationDB");
    table.collection('manager').find().toArray(function(err, docs) {
        for(var i = 0 ; i < docs.length ; i++) {
            if(solvingName === docs[i].name) {
                for(var j = 0 ; j < docs[i].subject.length ; j++) {
                    if(solvingText === docs[i].subject[j][1]) {
                        res.json(docs[i].subject[j]);
                    }
                }
            }
        }
    })
    //res.json([solvingName, solvingText])
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
    const {number , pw , name, subjectNames, subject} = req.body;
    var datas = ({name : name , number : number , pw : pw, subjectNames : subjectNames, subject : subject})

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

let a;

app.post('/loginmanager', function(req, res) {
    let re;
    const {loginnumber, loginpw} = req.body;

    var table = db.db("EvaluationDB");
    table.collection('manager').find().toArray(function(err, docs) {
        for(i = 0 ; i < docs.length ; i++) {
            if(loginnumber === docs[i].number) {
                re = true;
                managerName = docs[i].name;
                managetUrl = docs[i]._id;
                break;
            } else if (loginnumber !== docs[i].number) {
                re = false;
            }
        }
        res.send(re);
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

app.use(express.static(path.join(__dirname, 'EvaluationClient/build')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'EvaluationClient/build/index.html'))
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'EvaluationClient/build/index.html'))
})

app.listen(9000 , (req, res) => {
    console.log('server start');
});

