import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Account } from '../models/Account';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

    account = {} as Account;

    constructor(private tokenService: TokenService) { }

    async ngOnInit() {
        try {
            this.account = await this.tokenService.getAccountInfo()
        } catch(ex) {
            this.account = {} as Account;
        }
    }

    // ToDo: get account whenever metamask account changed
    // ToDo: show success or failure of tx on UI
    async transferToken(toAddress, tokens) {
        try {
            let transaction = await this.tokenService.transferToken(toAddress, tokens)
            transaction.send({ from: this.account.address })
            .on('transactionHash', txHash => {
                console.log('transactioHash: ', txHash)
            })
            .on('receipt', receipt => {
                console.log('receipt: ', receipt)
            })
            .on('error', error => {
                throw Error(error)
            })
        } catch(ex) {
            console.log('transaction failed: ', ex)
        }
        
    }

}
