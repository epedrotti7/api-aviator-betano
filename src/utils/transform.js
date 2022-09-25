

async function transformData(dados) {

    return {
        resultadoPartidaAnterior: dados[0],
        historicoResultados: dados
    }
}

async function transformDataResult(dados) {

    return {
        fimPartida: dados
    }
}

module.exports = {
    transformData,
    transformDataResult
}