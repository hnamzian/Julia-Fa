const CitexToken = require('../contract/token.js')

module.exports.tokenOwner = async function () {
    const Token = await CitexToken()
    const owner = await Token.methods.owner().call()
    return owner()
}

