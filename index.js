const express = require("express");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json())


const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Artists API',
            version: '1.0.0',
        },
    },
    apis: ['./index.js', './doc/definitions.yaml'],

};

const openapiSpecification = swaggerJSDoc(options);
app.use('/api', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


const artists = require('./artists.json')

app.get('/artists', (req,res) => {    
    res.status(200).json(artists)
})

app.get('/artists/:id', (req,res) => {
    const id = parseInt(req.params.id)    
    const artist = artists.find(artist => artist.id === id)    
    res.status(200).json(artist)
})


app.post('/artists', (req,res) => {
    console.log(req.body);
    artists.push(req.body)    
    res.status(201).json(artists)
})


app.put('/artists/:id', (req,res) => {    
    const id = parseInt(req.params.id)    
    let artist = artists.find(artist => artist.id === id)
    console.log(id)
    console.log(req.body);
    artist.name =req.body.name,
    artist.description =req.body.description,
    artist.type =req.body.type,    
    res.status(200).json(artist)
})


app.delete('/artists/:id', (req,res) => {
    const id = parseInt(req.params.id)    
    let artist = artists.find(artist => artist.id === id)    
    artists.splice(artists.indexOf(artist),1)    
    res.status(200).json(artists)
})


app.listen(3000, () => {    
    console.log("Serveur à l'écoute")
})
