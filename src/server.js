const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json())

const customers = [
    { id:1, name:"Sergio", age:26, country:"Viçosa"},
    { id:2, name:"Lorrayne", age:24, country:"Ipatinga"},
    { id:3, name:"Ana", age:25, country:"Pedra Azul"},
];

//Método Get
app.get('/',(req, res) => {
    res.send(customers);
})

app.get('/cliente/:id', (req, res)=> {
    const client = customers.find((c) => c.id === parseInt(req.params.id));
    if(!client)
        return res.status(400).send('Não foi possivel identificar cliente com esse ID')
    res.send(client)
})

//Método Post
app.post('/cliente', (req,res) => {

    const client = {
        id: customers.length + 1,
        name: req.body.name,
        age: +req.body.age,
        country: req.body.country
    };

    customers.push(client);
    res.send(client);
})

//Método Put
app.put('/cliente/:id', (req, res) => {
    const client = customers.find((c) => c.id === parseInt(req.params.id));
    if(!client)
        return res.status(400).send('Não foi possivel identificar cliente com esse ID')

    client.name = req.body.name;
    client.age = req.body.age;
    client.country = req.body.country;
    
    res.send(client)
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Servidor executando na porta ${port}`));

