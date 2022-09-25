require('dotenv').config()
const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromeDriver = require('chromedriver');
const sleep = require('../utils/sleep');
const { transformData, transformDataResult } = require('../utils/transform');

const PORT = 3000;

const { USER_LOGIN, PASSWORD, URL } = process.env;

chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());

let driver;

async function aviator(driver) {
    // await driver.manage().window().maximize();
    await driver.manage().window();
    await driver.get(URL);

    await driver.switchTo().frame(0);
    console.log('Iniciando a API...');

    await driver.findElement(By.xpath('//*[@id="username"]')).sendKeys(USER_LOGIN);
    await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys(PASSWORD);

    await driver.executeScript("return document.querySelector('#app > div > main > div > form > button').click()")
    console.log('Login efetuado com sucesso!')
    console.log(`AGUARDE a API abrir a porta ${PORT} para iniciar as requisições!`)

    await driver.switchTo().defaultContent();

    console.log(`Abrindo porta ${PORT}...`)

    await sleep(20);
}

async function getResultado() {

    try {
        let valor = await driver.executeScript(`
        
        try{

            let divPoints = document.querySelector('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.stage-board > app-play-board > div > div.dom-container > app-dom-container > div > div > div.flew-coefficient.ng-star-inserted').innerText
            return divPoints
        }catch{
            return 0;
        }

        `);

        const verifyIfLogged = await driver.executeScript(`
        try{
            const values = document.querySelectorAll('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.result-history > app-stats-widget > div > app-stats-dropdown > div > div.payouts-block')[0].children
            if(values) return true
                
        }catch{
            return false
        }
        `)

        if (!verifyIfLogged) {
            throw Error('Ocorreu um erro com o login.');
        }

        return transformDataResult(valor);

    }
    catch (error) {
        console.log('Ocorreu um erro, efetuando login novamente...')
        await driver.quit();
        await start();
        return {
            Erro: 'Ocorreu um erro, o login foi efetuado novamente, faça a requisição novamente agora.'
        }
    }
}

async function getData(trueColor) {
    try {
        const valoresAviatorGame = [];
        let valoresChild;

        // await sleep(10)
        const values = await driver.executeScript("return document.querySelectorAll('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.result-history > app-stats-widget > div > app-stats-dropdown > div > div.payouts-block')[0].children");

        for (let i = 0; i < values.length; i++) {
            const valores = await driver.executeScript(`return document.querySelectorAll('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.result-history > app-stats-widget > div > app-stats-dropdown > div > div.payouts-block')[0].children[${i}].innerText`);

            if (trueColor) {
                valoresChild = await driver.executeScript(`
        
        const value = document.querySelectorAll('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.result-history > app-stats-widget > div > app-stats-dropdown > div > div.payouts-block')[0].children[${i}].lastChild.children[0].children[0]
        return window.getComputedStyle(value).backgroundColor
        
        `);

                valoresAviatorGame.push({
                    valor: valores.trim(),
                    cor: valoresChild
                })
            }

            valoresAviatorGame.push({
                valor: valores.trim(),
            })
        }

        const verifyIfLogged = await driver.executeScript(`
        try{
            const values = document.querySelectorAll('body > app-root > app-game > div > div.main-container > div.w-100.h-100 > div > div.game-play > div.result-history > app-stats-widget > div > app-stats-dropdown > div > div.payouts-block')[0].children
            if(values) return true
                
        }catch{
            return false
        }
        `)

        if (!verifyIfLogged) {
            throw Error('Ocorreu um erro com o login.');
        }

        return transformData(valoresAviatorGame);
    } catch (error) {
        console.log('Ocorreu um erro, efetuando login novamente...')
        await driver.quit();
        await start();
        return {
            Erro: 'Ocorreu um erro, o login foi efetuado novamente, faça a requisição novamente agora.'
        }
    }
}

async function start() {
    driver = await new Builder().forBrowser('chrome').build();
    await aviator(driver);
    const iframe = await driver.executeScript("return document.querySelector('.game-play-providers')");
    await driver.switchTo().frame(iframe);
}

module.exports = {
    aviator,
    getData,
    getResultado,
    start,
    driver,
    PORT
};