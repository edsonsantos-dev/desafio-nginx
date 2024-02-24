const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createPool(config);

const namesList  = [
    'Ana',
    'Carlos',
    'Daniel',
    'Eva',
    'Fernando',
    'Gabriela',
    'Hugo',
    'Isabel',
    'João',
    'Karla',
    'Lucas',
    'Mariana',
    'Nuno',
    'Olga',
    'Paulo',
    'Quiteria',
    'Ricardo',
    'Sofia',
    'Tiago',
    'Ursula'
  ];

let names = [];

app.get('/', async (req,res) => {
    const randomName = getRandomName();
    
    await saveName(randomName);
    names = await getNames();

    const template = createTemplate(names);
        
    res.send(template)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

const saveName = async (name) => {
    const sql = `INSERT INTO people(name) values('${name}')`
    connection.query(sql)
}

const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * 100)
    return namesList[randomIndex]
}

const getNames = () => {
    const sql = "select * from people"

    return new Promise((resolve, reject) => {
        connection.query(sql, async (err, result) => {
            if (err) return reject(err); 
            return resolve(result);
        })

    })
}

const createTemplate = (names) => {
    const header = "<h1>Full Cycle</h1>";
    let list = '';

    names.forEach(name => list += `<li>Id: ${name.id} Nome: ${name.name}</li>`);

    template = header + `<ul>${list}</u>`

    return template;
}