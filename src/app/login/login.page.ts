import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import AppID from 'ibmcloud-appid-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  private username: string = '';
  private password: string = '';
  private appId = new AppID();

  constructor(private route: ActivatedRoute, private router: Router){
  	this.appId.init({
  		clientId: "cfff1466-8996-49f5-acb2-7a316cb082d7",
  		discoveryEndpoint: "https://us-south.appid.cloud.ibm.com/oauth/v4/547b2dd4-7a0f-4af5-b696-416798121de4/.well-known/openid-configuration"
  	});
  }

  ngOnInit(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public async logIn() {
      	const tokens = await this.appId.signin();

      	console.log(tokens);


      	console.log("CURRENT INSTANCE");
      	console.log(AppID.getInstance());
  }

}
