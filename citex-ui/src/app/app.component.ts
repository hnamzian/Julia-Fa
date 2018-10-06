import { Component } from '@angular/core';
import { TokenService } from './token.service';
import { Account } from './models/account';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Token Gateway';
    accounts: any;
    transferFrom = '0x0';
    balance;
    tokens;
    transferTo = '';
    amount = 0;
    remarks = '';

    constructor(private tokenService: TokenService) {
        // 0x474a8dcd54a1baa6580c559caa395f1fc19c2728
    }

    async ngOnInit() {

        // try {
        //     let tokenInfo = await this.tokenService.getTokenInfo()
        //     console.log(tokenInfo)
    
        //     let account = await this.getAccount()
        //     console.log(account)
        // } catch(ex) {
        //     console.log(ex)
        // }
        
    }

    getAccount = async () => {
        let account: Account = await this.tokenService.getAccountInfo()
        if (account) {
            this.transferFrom = account.address
            this.balance = account.balance
            this.tokens = account.tokens
            console.log(account)
        }
    };

    async transferToken(event) {

        try {
            this.tokens = await this.tokenService.getTokenBalance(this.transferFrom)
            console.log('tokens (before):', this.tokens)

            let transaction = await this.tokenService.transferToken(this.transferTo, this.amount)

            transaction.send({ from: this.transferFrom })
            .on('transactionHash', console.log)
            .on('receipt', console.log)
            .on('error', console.log)

        } catch(ex) {
            console.log(ex.message)
        }
        
    }
}
