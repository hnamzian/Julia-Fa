import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { 
    MatButtonModule, 
    MatSlideToggleModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatToolbarModule, 
    MatCardModule, 
    MatListModule, 
    MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TokenService } from './token.service';
import { TokenInfoComponent } from './token-info/token-info.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { NetworkComponent } from './network/network.component';
import { GatewayComponent } from './gateway/gateway.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { OwnershipComponent } from './ownership/ownership.component';

@NgModule({
  declarations: [
    AppComponent,
    TokenInfoComponent,
    AccountInfoComponent,
    NetworkComponent,
    GatewayComponent,
    UserInfoComponent,
    OwnershipComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, 
    MatSlideToggleModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatToolbarModule, 
    MatCardModule, 
    MatListModule, 
    MatDialogModule
  ],
  providers: [TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
