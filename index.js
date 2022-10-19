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
    apis: ['./index.js'],
};

const openapiSpecification = swaggerJSDoc(options);
app.use('/api', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


const artists = require('./artists.json')

/**
 * @swagger
 * /artists:
 *   get:
 *     description: retourne une liste d'artistes
 *     responses:
 *       200:
 *         description: retourne une liste d'artistes.
  *   post:
 *     description: créé un artiste
 *     responses:
 *       200:
 *         description: créé un artiste
 */
app.get('/artists', (req,res) => {    
    res.status(200).json(artists)
})

app.listen(3000, () => {    
    console.log("Serveur à l'écoute")
})
