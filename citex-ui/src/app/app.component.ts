import { Component, OnInit } from '@angular/core';
import { TokenService } from './token.service';
import { Account } from './models/account';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'your first DApp in Angular';
    accounts: any;
    transferFrom = '0x0';
    balance;
    tokens;
    transferTo = '';
    amount = 0;
    remarks = '';

    constructor(private tokenService: TokenService) {
        
    }

    async ngOnInit() {
        let tokenInfo = await this.tokenService.getTokenInfo()
        console.log(tokenInfo)

        let account = await this.getAccount()
        console.log(account)
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

            let result = await this.tokenService.transferToken(this.transferFrom, this.transferTo, this.amount)
            console.log(result)

            this.tokens = await this.tokenService.getTokenBalance(this.transferFrom)
            console.log('tokens (after):', this.tokens)
        } catch(ex) {
            console.log(ex.message)
        }
        
    }
}
