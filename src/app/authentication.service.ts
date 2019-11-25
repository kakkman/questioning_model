import { Injectable } from '@angular/core';
import AppID from 'ibmcloud-appid-js';
import * as PouchDB from 'pouchdb/dist/pouchdb';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	public appID = new AppID();
	public tokens;

	public database;
	public remote;
	public username;
	public password;

	public userInfo;


	public accounts;

  	constructor() { 
  		this.appID.init({
  			clientId: "cfff1466-8996-49f5-acb2-7a316cb082d7",
  			discoveryEndpoint: "https://us-south.appid.cloud.ibm.com/oauth/v4/547b2dd4-7a0f-4af5-b696-416798121de4/.well-known/openid-configuration"
  		});

  		this.database = new PouchDB('https://bf066fcc-9236-41e9-8ce0-0d3f9e8f28a9-bluemix.cloudantnosqldb.appdomain.cloud/test2');
  		this.remote = "https://bf066fcc-9236-41e9-8ce0-0d3f9e8f28a9-bluemix.cloudantnosqldb.appdomain.cloud/"

  		this.username = "bf066fcc-9236-41e9-8ce0-0d3f9e8f28a9-bluemix"
  		this.password = "88db489b6233f8de00fe7d278e8c48bbf7c6825608901e360b7a3f92a5b62915"


  		let options = {
		    //live: true,
		    //retry: true,
		   // continuous: true,
		    auth: {
		    	username: this.username,
		    	password: this.password
			}
   		};

   		//this.database.sync(this.remote, options);
   		this.database.sync(this.remote, options);

   		/*this.database.post({ '_id':'9', 'name':'John', 'age':30,}).then((resp) => {
   			console.log(resp)
   			console.log("above is response");
   		}).catch((e) => {
       console.log(e);
       return e; 
     }); */


	}

	public loadAccounts()
	{
		var accountList: any = [];
		this.database.get(this.userInfo.email).then(function(doc) {
			var obj = JSON.parse(doc);
			console.log(obj);

		}).catch(function (err) {
			console.log(err);
			//new account does not exist, create account.
			if(err.status == '404')
			{
				this.database.post({'name': this.userInfo.name, 'email': this.userInfo.email}).then((resp) => {
		   			console.log(resp)
		   			console.log("above is response");
		   		}).catch((e) => {
		       		console.log(e);
       				return e; 
     			});
			}
		});
		//JSON.parse
		
		return accountList;
	}

}
