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
  public competitiveInstallDB;

  public currentAccount;

	constructor(public storage: Storage) { 

		//all for user information collection 
		this.appID.init({
			clientId: "21013e6e-b7cd-4f5b-acfa-0c8001c4a3af",
			discoveryEndpoint: "https://us-south.appid.cloud.ibm.com/oauth/v4/7d89648c-6d14-4d96-8e04-02b319d3dec0/.well-known/openid-configuration"
		});

		this.database = new PouchDB("https://cda4b381-5cbc-4adc-a069-f3a01615a817-bluemix.cloudantnosqldb.appdomain.cloud/user_info");
		this.remote = "https://cda4b381-5cbc-4adc-a069-f3a01615a817-bluemix.cloudantnosqldb.appdomain.cloud"

		this.username = "cda4b381-5cbc-4adc-a069-f3a01615a817-bluemix"
		this.password = "4ac82e0648e732200cb48086e7ce602825aa0d90e14e097c90fe0f6434340c7f"

		let options = {
	    auth: {
	    	username: this.username,
	    	password: this.password
		}
 		};

    try {
   		this.database.sync(this.remote, options);

   		//database for entitled deployed
   		this.entitledDeployedDB = new PouchDB("https://cda4b381-5cbc-4adc-a069-f3a01615a817-bluemix.cloudantnosqldb.appdomain.cloud/entitled_deployed");
   		this.entitledDeployedDB.sync(this.remote, options);

   		//database for prospecting questions
   		this.prospectingDB = new PouchDB("https://cda4b381-5cbc-4adc-a069-f3a01615a817-bluemix.cloudantnosqldb.appdomain.cloud/prospecting_questions");
   		this.prospectingDB.sync(this.remote, options);

   } catch(error){
      console.log(error);
   }
	}

  updateCurrentAccount(){
    this.setCurrentAccount(this.currentAccount);
    var userInfo;
    var that = this;
    this.getUserInfo().then(user =>{
      userInfo = user.email;
    }).then(res =>{
      this.database.get(userInfo).then(doc => {
        if(doc["accounts"] != null){
          for(var i = 0; i < doc["accounts"].length; i++){
            console.log(this.currentAccount);
            if (doc["accounts"][i].name === that.currentAccount.name){
              doc["accounts"][i] = that.currentAccount;
            }
          }
          that.database.put(doc)
        }
      }) 
    })
  }

  //checks the time remaining on the certificate
  tokenIsValid(){
    let that = this;
    return this.storage.get('tokens').then((val)=> {
      let now = new Date().getTime(); 
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
    this.storage.set("userInfo", userInfo);
  }

  setCurrentAccount(currentAccount){
    this.storage.set("currentAccount", currentAccount);
  }
}
