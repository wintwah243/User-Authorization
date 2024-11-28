import express from 'express';
import mysql from 'mysql2'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST","GET"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000 * 60 * 60 * 24
    }
}))

const dbConnection = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
})

app.post('/signup',(req,res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    dbConnection.query(sql,[values], (err,result) => {
        if(err){
            return res.json(err)
        }
        return res.json(result);
    })
})

app.post('/login',(req,res) => {
    const sql = "SELECT * FROM login WHERE email = ? and password = ?";
    dbConnection.query(sql,[req.body.email,req.body.password],(err,result) => {
        if(err){
            return res.json(err)
        }
        if(result.length > 0){
            req.session.name = result[0].name;
            return res.json({Login: true});
        }else{
            return res.json({Login: false})
        }
    })
})

app.get('/',(req,res) => {
    if(req.session.name){
        return res.json({valid: true,name: req.session.name})
    }else{
        return res.json({valid:false})
    }
})

app.listen(8081, () => {
    console.log("Listening.....");
}) 