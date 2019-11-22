import { Injectable } from '@angular/core';
import AppID from 'ibmcloud-appid-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	public appID = new AppID();

  	constructor() { 
  		this.appID.init({
  			clientId: "cfff1466-8996-49f5-acb2-7a316cb082d7",
  			discoveryEndpoint: "https://us-south.appid.cloud.ibm.com/oauth/v4/547b2dd4-7a0f-4af5-b696-416798121de4/.well-known/openid-configuration"
  		});
	}
}
