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
  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService){
  	//TODO: IF LOGGED IN, AUTO NAVIGATE
  }

  ngOnInit(){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public async logIn() {
   	try {
		await this.auth.appID.signin();
    	this.router.navigate(['home']);
		} catch (e) {
			console.log(e);
		}
  }
}
