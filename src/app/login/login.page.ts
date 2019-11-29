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

  public acctInfo:any;
  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService){
  	//TODO: IF LOGGED IN, AUTO NAVIGATE
    this.autoLogin();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //if(this.auth.tokens.accessToken != null && this.auth.tokens.accessToken){}
  }

//logs user in and creates database entry if it didn't exist already
  public async logIn() {
    let that = this;
   	try {
  		const tokens = await this.auth.appID.signin();
      this.auth.tokens = tokens;
      console.log(tokens);
      this.auth.appID.getUserInfo(this.auth.tokens.accessToken).then(res => {
        that.auth.userInfo = res;
        //console.log(res);
        console.log(res.email);
        that.auth.database.get(that.auth.userInfo.email).then(function(doc) {
          console.log("Account Exists. Logging in.");
          let navigationExtras: NavigationExtras = {
            state: {
              accountInfo: doc
            }
          };
          that.router.navigate(['home'], navigationExtras);

        }).catch(function (err) {
          console.log(err);
          //new account does not exist, create account.
          if(err.status == '404')
          {
            console.log("Creating Account...");
            that.auth.database.put({'_id':that.auth.userInfo.email,'name': that.auth.userInfo.name, 'email': that.auth.userInfo.email}).then((resp) => {
              console.log(resp)
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

  public autoLogin(){
    if(this.auth.tokens != null && 
      this.auth.userInfo.email != null && 
      this.auth.tokenIsValid()){

      this.auth.database.get(this.auth.userInfo.email).then(function(doc) {
        console.log("Account Information Saved. Logging in.");
        let navigationExtras: NavigationExtras = {
          state: {
            accountInfo: doc
          }
        };
        this.router.navigate(['home'], navigationExtras);
      })
    }
  }
}
