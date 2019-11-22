import { Injectable } from '@angular/core';
import AppID from 'ibmcloud-appid-js';
import db2 from 'ibm_db';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	public appID = new AppID();
	public tokens;

	public database;

  	constructor() { 
  		this.appID.init({
  			clientId: "cfff1466-8996-49f5-acb2-7a316cb082d7",
  			discoveryEndpoint: "https://us-south.appid.cloud.ibm.com/oauth/v4/547b2dd4-7a0f-4af5-b696-416798121de4/.well-known/openid-configuration"
  		});

  		this.database = db2.open("DATABASE=<dbname>;HOSTNAME=<myhost>;UID=db2user;PWD=password;PORT=<dbport>;PROTOCOL=TCPIP", function (err,conn) {
  			if (err) return console.log(err);
	  		conn.query('select 1 from sysibm.sysdummy1', function (err, data) {
	   			if (err) console.log(err);
	    		else console.log(data);

	    		conn.close(function () {
	      			console.log('done');
	    		});
	  		});
		});
	}
}
