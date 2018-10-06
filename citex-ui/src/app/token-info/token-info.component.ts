import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Token } from '../models/token';

@Component({
  selector: 'token-info',
  templateUrl: './token-info.component.html',
  styleUrls: ['./token-info.component.scss']
})
export class TokenInfoComponent implements OnInit {

    token = {} as Token;

    constructor(private tokenService: TokenService) { }

    async ngOnInit() {
        try {
            this.token = await this.tokenService.getTokenInfo()
            console.log(this.token)
        } catch(ex) {
            this.token = {} as Token;
        }
    }

    async updateToken($event) {
        try {
            this.token = await this.tokenService.getTokenInfo($event.target.value)
        } catch(ex) {
            // ToDo: apply error to UI
            console.log(ex)
            this.token = {} as Token;
        }
    }

}
