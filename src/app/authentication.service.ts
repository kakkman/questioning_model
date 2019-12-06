import { Injectable } from '@angular/core';
import AppID from 'ibmcloud-appid-js';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	public appID = new AppID();

	public database;
	public remote;
	public username;
	public password;

	public entitledDeployedDB;
	public prospectingDB;

  public currentAccount

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
	}

  updateCurrentAccount(){
    /*let that = this
    let user = this.getUserInfo()
    user.email = ob
    this.database.get(this.getUserInfo().email).then(function(doc) {
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
    }); */
  }

  //checks the time remaining on the certificate
  tokenIsValid(){
    let that = this;
    return this.storage.get('tokens').then((val)=> {
      let now = new Date().getTime(); 
      console.log("THIS IS THE VALUE OF VAL:" + val);
      if (val != null) {
        if(now < val.accessTokenPayload.exp){
          that.logOut();
          return false;
        }
        return true;
      }
      that.logOut();
      return false;
    }); 
  }

  //everything beloow has been updated
  logOut(){
    //revoke token and remove current information. 
    this.setTokens(null);
    this.setCurrentAccount(null);
    this.setUserInfo(null);
  }

  getTokens(){
    return this.storage.get('tokens');
  }

  getUserInfo(){
    return this.storage.get('userInfo');
  }

  getCurrentAccount(){
    return this.storage.get('currentAccount');
  }

  setTokens(token){
    this.storage.set("tokens", token);
  }

  setUserInfo(userInfo){
    console.log("Setting user info to:" + userInfo);
    this.storage.set("userInfo", userInfo);
  }

  setCurrentAccount(currentAccount){
    this.storage.set("currentAccount", currentAccount);
  }
}
