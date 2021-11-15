const { response } = require('express');
const express = require('express')

const app = express();
app.get('/teste', (request, response) => {
    return response.json([
        "roupa1",
        "roupa2",
        "roupa3.1"])
})
app.listen(3333, () => {
    console.log('Servidor Iniciado! ^_^');
});