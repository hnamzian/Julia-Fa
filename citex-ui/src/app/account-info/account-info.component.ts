import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Account } from '../models/account';

@Component({
  selector: 'account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

    account = {} as Account;

    constructor(private tokenService: TokenService) { }

    async ngOnInit() {
        try {
            this.account = await this.tokenService.getAccountInfo()
        } catch(ex) {
            this.account = {} as Account;
        }
    }

    async updateInfo($event) {
        try {
            this.account = await this.tokenService.getAccountInfo()
        } catch(ex) {
            // ToDo: apply error to UI
            console.log(ex)
            this.account = {} as Account;
        }
    }
}
