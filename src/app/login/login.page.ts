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
export class LoginPage implements OnInit {


  private username: string = '';
  private password: string = '';

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService){

  }

  ngOnInit(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public async logIn() {
   	try {

		const tokens = await this.auth.appID.signin();
		let userInfo = this.auth.appID.getUserInfo(tokens.accessToken);
		console.log(userInfo);
    	this.router.navigate(['home']);
	} catch (e) {
		console.log(e);
	}
  }

}
