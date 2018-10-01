import { Injectable } from '@angular/core';
import * as Web3 from '../web3/dist/web3.min.js';
import { Account } from './models/account';

declare let require: any;
declare let window: any;

let tokenAbi = require('../../../build/contracts/citexToken.json');

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    private web3Provider: null;
    private contracts: {};

    constructor() {
        if (typeof window.web3 !== 'undefined') {
            this.web3Provider = window.web3.currentProvider;
            console.log(this.web3Provider)
        } else {
            this.web3Provider = new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws');
        }
        window.web3 = new Web3(this.web3Provider);
    }

    async getTokenInfo() {
        const networkId = await window.web3.eth.net.getId()
        const address = tokenAbi.networks[networkId].address
        const CitexToken = new window.web3.eth.Contract(tokenAbi.abi, address)
        
        let name = await CitexToken.methods.name().call()
        let symbol = await CitexToken.methods.symbol().call()
        let totalSupply = await CitexToken.methods.totalSupply().call()

        return {
            name,
            symbol,
            totalSupply
        }
    }

    getAccount(): Promise<string> {
        return new Promise((resolve, reject) => {
            window.web3.eth.getCoinbase(function (err, account) {
                if (err === null) {
                    resolve(account)
                } else {
                    reject(err)
                }
            });
        })
    }

    getEtherBalance(account): Promise<number> {
        return new Promise((resolve, reject) => {
            window.web3.eth.getBalance(account, function (err, balance) {
                if (err === null) {
                    resolve((window.web3.utils.fromWei(balance, "ether")));
                } else {
                    reject(0);
                }
            });
        })
    }

    async getTokenBalance(account): Promise<Number> {
        try {
            const networkId = await window.web3.eth.net.getId()
            const address = tokenAbi.networks[networkId].address
            const CitexToken = new window.web3.eth.Contract(tokenAbi.abi, address)
            const balance = await CitexToken.methods.balanceOf(account).call()
            return (window.web3.utils.fromWei(balance, 'ether'))
        } catch(ex) {
            throw Error(ex)
        }
    
    }

    async getAccountInfo() {
        let address: string = await this.getAccount()
        if (address) {
            let balance: Number = await this.getEtherBalance(address)
            let tokens: Number = await this.getTokenBalance(address)
            return {
                address: address,
                balance: balance, 
                tokens: tokens
            }
        }
        return {
            address: '0x0',
            balance: Number(0), 
            tokens: Number(0)
        }
    }

    async transferToken(_transferFrom, _transferTo, _amount) {
        // try {
        //     const networkId = await window.web3.eth.net.getId()
        //     const address = tokenAbi.networks[networkId].address
        //     const CitexToken = new window.web3.eth.Contract(tokenAbi.abi, address)

        //     const result = await CitexToken.methods.transfer(_transferTo, _amount).send({ from: _transferFrom })
        //     return result

        // } catch(ex) {
        //     throw Error(ex)
        // }
        return new Promise((resolve, reject) => {
            window.web3.eth.net.getId()
            .then(networkId => {
                const address = tokenAbi.networks[networkId].address
                const CitexToken = new window.web3.eth.Contract(tokenAbi.abi, address)

                CitexToken.methods.transfer(_transferTo, _amount).send({ from: _transferFrom })
                .on('transactionHash', hash => {
                    resolve(hash)
                })
                .on('receipt', receipt => {
                    console.log(receipt)
                    resolve(receipt)
                })
                .on('error', error => {
                    throw Error(error)
                })
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })

    }

}
