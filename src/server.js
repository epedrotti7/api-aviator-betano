const express = require('express');
const { Builder } = require('selenium-webdriver');
const { getData, getResultado, start, PORT } = require("./service/painel-service");

const app = express();
app.use(express.json());

const endpointGameAviator = '/aviator';
const endpointGameAviatorSemCor = '/aviator/semcor';
const endpointGameResultado = '/aviator/resultado';

app.get(endpointGameAviator, async (req, res) => {
    const response = await getData(true);
    return res.json(response);
});

app.get(endpointGameResultado, async (req, res) => {
    const response = await getResultado();
    return res.json(response);
});

app.get(endpointGameAviatorSemCor, async (req, res) => {
    const response = await getData();
    return res.json(response);
});

app.listen(PORT, async () => {
    await start();
    console.log(`API rodando na porta ${PORT}`);
});

module.exports = {
    PORT
}