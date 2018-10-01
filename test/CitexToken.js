var web3 = require('web3')
var CitexToken = artifacts.require("CitexToken");

contract('CitexToken', async (accounts) => {
    it("should return citex as name of token", async () => {
        const citexToken = await CitexToken.new()
        const name = await citexToken.name()
        assert.equal(name, 'citex')
    });

    it("should return cix as symbol of token", async () => {
        const citexToken = await CitexToken.new()
        const symbol = await citexToken.symbol()
        assert.equal(symbol, 'cix')
    });

    it("should return 1000000 CitexToken in totalSupply", async () => {
        const citexToken = await CitexToken.new()
        const balance = await citexToken.totalSupply()
        const expected = web3.utils.toWei('1000000', 'ether')
        assert.equal(expected, balance.toNumber())
    });

    it("should return 1000000 CitexToken in the first account", async () => {
        const citexToken = await CitexToken.new()
        const balance = await citexToken.balanceOf(accounts[0])
        const expected = web3.utils.toWei('1000000', 'ether')
        assert.equal(expected, balance.toNumber())
    });

    it("should revert on transfering to", async () => {
        const citexToken = await CitexToken.new()
        const balance = await citexToken.balanceOf(accounts[0])
        const expected = web3.utils.toWei('1000000', 'ether')
        assert.equal(expected, balance.toNumber())
    });
})