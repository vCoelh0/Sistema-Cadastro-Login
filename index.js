const express = require('express')
const mysql = require('mysql2')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.json())


app.post('/cadastro', (req, res)=>{
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        database: 'loja',
        password:'****'
    })

    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha

    console.log(nome)
    console.log(email)
    console.log(senha)
    

    const sql = "INSERT INTO tb_usuario(nome,email, senha ) VALUES('"+nome+"', '"+email+"', '"+senha+"');"
    connection.query(sql,(err, results)=>{
        console.log(results)
        res.send('ok')
    })
})


app.post('/login', (req,res)=>{
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        database: 'loja',
        password:'****'
    })



    const email = req.body.email
    const senha = req.body.senha

    const sql = "SELECT * FROM tb_usuario WHERE email = ? AND senha = ?";
    connection.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao realizar login');
        } else {
            if (results.length > 0) {
                res.send('Login realizado com sucesso');
            } else {
                res.status(401).send('Email ou senha incorretos');
            }
        }
    });
});





app.listen(3001, ()=> console.log('rodando na porta 3001...'))



