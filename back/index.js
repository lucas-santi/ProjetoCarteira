const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

app.listen(process.env.PORT, ()=>{
    console.log(`rodando na porta ${process.env.PORT}`);
})

db = mysql.createPool({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

app.use(express.json());
app.use(cors());

app.post('/register', (req, res)=>{
    const sentEmail = req.body.Email;
    const sentUserName = req.body.UserName;
    const sentPassword = req.body.Password;

    const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';

    const values=[sentEmail, sentUserName, sentPassword];

    db.query(SQL, values, (err, result)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log('usuario cadastrado')
            res.send({message:'usuario cadastrado'})
        }
    })
})

app.post('/', (req, res)=>{
    const sentLoginUser= req.body.loginUserName;
    const sentLoginPassword= req.body.loginPassword;
    const SQL = 'SELECT * FROM users WHERE username=? && password=?';

    const values=[sentLoginUser, sentLoginPassword]
    db.query(SQL, values, (err, result)=>{
        if(err){
            res.send({error:err});
        }else if(result.length > 0){
            res.send(result.data);
        } else{
            res.send({message:'nao bateu'});
        }
    })
})