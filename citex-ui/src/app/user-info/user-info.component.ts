import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { User } from '../models/user';
import { Account } from '../models/Account';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

    user = {} as User;
    account = {} as Account;

    constructor(private tokenService: TokenService) { }

    async ngOnInit() {
        try {
            this.account = await this.tokenService.getAccountInfo()
        } catch(ex) {
            this.account = {} as Account;
        }
    }

    async updateUserInfo(email, tokens) {
        try {
            const transaction = await this.tokenService.updateUser(email, tokens)
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

    async getUserInfo(email) {
        try {
            this.user = await this.tokenService.getUserByEmail(email)
        } catch(ex) {
            this.user = {} as User
            console.log(ex)
        }
    }

}
