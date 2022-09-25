async function sleep(seg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seg * 1000)
    })
}

module.exports = sleep;