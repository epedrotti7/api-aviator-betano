
-> ENDPOINTS

Vamos lá, a api consiste em 2 endpoints

GET http://localhost:3000/aviator
GET http://localhost:3000/aviator/semcor
GET http://localhost:3000/aviator/resultado

onde o primeiro endpoint traz os dados no seguinte formato:

{
    "resultadoPartidaAnterior": {
        "valor": "1.43x",
        "cor": "rgb(0, 93, 145)"
    },
    "historicoResultados": [
        {
            "valor": "1.43x",
            "cor": "rgb(0, 93, 145)"
        },
        {
            "valor": "1.43x"
        },
    ]
}

e o segundo endpoint retorna os dados neste formato:

{
    "resultadoPartidaAnterior": {
        "valor": "1.48x"
    },
    "historicoResultados": [
        {
            "valor": "1.48x"
        },
        {
            "valor": "1.00x"
        },
    ]
}

OBS: Deixei a collection do postman já com tudo pronto, basta utilizar.

-> FLUXO

O fluxo da API consite em, entrar no site, efetuar login, e buscar os dados através dos elementos do IFRAME do jogo Aviator.

-> Pacotes Utilizados

Foi utilizado como server o Express, micro framework nao opinado de fácil manipulação server-side.
https://www.npmjs.com/package/express

Também utilizei o Selenium, framework de automação usado para testar aplicativos da Web, pode ser usado para qualquer tarefa que exija interação com o navegador.
https://www.npmjs.com/package/selenium-webdriver

Dotenv para utilizar variáveis de ambiente (.env).
https://www.npmjs.com/package/dotenv

Chromedriver que é nosso navegador padrão, para conseguir subir uma instancia e realizar a manipulação dos elementos (chromium).
https://www.npmjs.com/package/chromedriver

-> Como executar a API

Pra executar, basta ter o Node.js versão 12.x ++ instalado
https://nodejs.org/en/

entrar na pasta do projeto, rodar o comando npm install, para instalar as dependencias
feito isso, basta dar um npm start, e o arquivo server.js será executado, subindo a API na porta 3000.

OBS: É preciso passar nos campos USER_LOGIN e PASSWORD dentro do arquivo .env, as credenciais, para a API conseguir logar no site e entrar no jogo Aviator.