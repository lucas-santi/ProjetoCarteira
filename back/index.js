const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');

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

app.post('/register', async (req, res)=>{
    const sentEmail = req.body.Email;
    const sentUserName = req.body.UserName;
    const sentPassword = req.body.Password;
    const hashedPassword = await bcrypt.hash(sentPassword, 10);
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';

    const values=[sentEmail, sentUserName, hashedPassword];

    db.query(SQL, values, (err, result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send({message:'Usuário cadastrado com sucesso!'})
        }
    })
})

app.post('/', (req, res)=>{
    const sentLoginUser= req.body.loginUserName;
    const sentLoginPassword= req.body.loginPassword;
    const SQL = 'SELECT * FROM users WHERE username=?';

    const values=[sentLoginUser];
    db.query(SQL, values, async (err, result)=>{
        if(err){
            res.send({error:err});
        }else if(result.length > 0){
            const hashedPassword = result[0].password;
            const passwordMatch = await bcrypt.compare(sentLoginPassword, hashedPassword);
            if(passwordMatch){
                res.status(200).send({message: "Login realizado com sucesso!"});
            } else {
                // Senha incorreta
                res.status(401).send({message: "Senha incorreta!"});
            }
        } else{
            res.status(404).send({message: "Usuário não encontrado!"});
        }
    })
})