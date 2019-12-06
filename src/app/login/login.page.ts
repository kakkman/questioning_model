import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import AppID from 'ibmcloud-appid-js';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService){
  }

 //logs user in and creates database entry if it didn't exist already
  public async logIn() {
    let that = this;
   	try {
  		const tokens = await this.auth.appID.signin();
      this.auth.setTokens(tokens);
      this.auth.appID.getUserInfo(tokens.accessToken).then(userInfo => {
        this.auth.setUserInfo(userInfo);
        that.auth.database.get(userInfo.email).then(function(doc) {
          console.log("Account with email " + userInfo.email + " exists. Logging in.");
          that.router.navigate(['home']);
        }).catch(function (err) {
          console.log(err);
          //new account does not exist, create account.
          if(err.status == '404'){
            console.log("Creating Account...");
            that.auth.database.put({'_id':userInfo.email,
              'name':userInfo.name, 
              'email': userInfo.email
            }).then((resp) => {
              that.router.navigate(['home']);
            }).catch((e) => {
              console.log(e);
            });
          }
        }); 
      });
		} catch (e) {
			console.log(e);
		}
  }
}
