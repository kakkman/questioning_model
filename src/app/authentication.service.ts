import { Injectable } from '@angular/core';
import AppID from 'ibmcloud-appid-js';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { Storage } from '@ionic/storage';


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


  public currentAccount;
	//database for entitledDemployed

	public entitledDeployedDB;

	//database for prospecting
	public prospectingDB;


  	constructor(public storage: Storage) { 

  		//all for user information collection 
  		this.appID.init({
  			clientId: "cfff1466-8996-49f5-acb2-7a316cb082d7",
  			discoveryEndpoint: "https://us-south.appid.cloud.ibm.com/oauth/v4/547b2dd4-7a0f-4af5-b696-416798121de4/.well-known/openid-configuration"
  		});

  		this.database = new PouchDB("https://bf066fcc-9236-41e9-8ce0-0d3f9e8f28a9-bluemix.cloudantnosqldb.appdomain.cloud/test2");
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

      try {
     		this.database.sync(this.remote, options);

     		//database for entitled deployed
     		this.entitledDeployedDB = new PouchDB("https://bf066fcc-9236-41e9-8ce0-0d3f9e8f28a9-bluemix.cloudantnosqldb.appdomain.cloud/entitled_deployed");
     		this.entitledDeployedDB.sync(this.remote, options);

     		//database for prospecting questions
     		this.prospectingDB = new PouchDB("https://bf066fcc-9236-41e9-8ce0-0d3f9e8f28a9-bluemix.cloudantnosqldb.appdomain.cloud/prospecting_questions");
     		this.prospectingDB.sync(this.remote, options);
     } catch(error){
        console.log(error);
     }
     //attempts to load from last session. 
     this.getAcctInfo();
	}

  updateCurrentAccount(){
    this.saveCurrentAccount();
    let that = this
    this.database.get(this.userInfo.email).then(function(doc) {
      if(doc["accounts"] != null){
        for(var i = 0; i < doc["accounts"].length; i++){
          if (doc["accounts"][i].name === that.currentAccount.name){
            doc["accounts"][i] = that.currentAccount;
          }
        }
        that.database.put(doc).then(res => {
          that.accounts = doc["accounts"];
        });
      }
    });
  }

  getAcctInfo(){
    this.storage.get('tokens').then((val)=> {
      if (val != null) {
        this.tokens = val;
      }
    });
    this.storage.get('userInfo').then((val)=> {
      if (val != null) {
        this.userInfo = val;
      }
    });
    this.storage.get('currentAccount').then((val)=> {
      if (val != null) {
        this.currentAccount = val;
      }
    });
  }

  saveUserAccount(){
    console.log("Saving account info")
    this.storage.set("tokens", this.tokens);
    this.storage.set("userInfo", this.userInfo);
  }

//this method is for the company account that is currently being accessed. 
  saveCurrentAccount() {
    this.storage.set("currentAccount", this.currentAccount);
    console.log("In method saveCurrentAccount")
    console.log(this.currentAccount);
  }

//checks the time remaining on the certificate
  tokenIsValid(){
    let now = new Date().getTime(); 
    if(this.tokens === undefined) {
      this.logOut();
      return false;
    }
    return(now > this.tokens.accessTokenPayload.exp);
  }

  logOut(){
    //revoke token and remove current information. 
    this.tokens = undefined;
    this.userInfo = undefined;
    this.accounts = undefined;
    this.currentAccount = undefined;
    this.storage.set("tokens", null);
    this.storage.set("userInfo", null);
  }
}
