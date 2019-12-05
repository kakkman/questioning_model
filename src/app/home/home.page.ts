import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: ActivatedRoute, 
    private alertCtrl: AlertController, 
    private router: Router, 
    public auth: AuthenticationService) {
  }

  ionViewWillEnter(){
    if(!this.auth.tokenIsValid()){
      //navigating back to login
      this.router.navigate(['login']);
    }
    else {
      //load relevant information
      let that = this;
      this.auth.database.get(this.auth.userInfo.email).then(function(doc) {
        that.auth.accounts = doc["accounts"];
       }).catch(function (err) {
        console.log(err); 
      });
    }
  }

  async presentAlert() {
    let that = this;
    const alert = await this.alertCtrl.create({
      message: 'Create a New Business Profile',
      inputs: [
        {
            name: 'name',
            placeholder: 'Business Name'
        },
        {
            name: 'location',
            placeholder: 'Location',
        },
        {
          	name: 'date',
          	placeholder: 'date',
          	type: 'date'
        },
        {
          	name: "info",
          	placeholder: "Additional Client Info",
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            console.log('Create clicked');
            let newAcct = {
              name: data.name,
              location: data.location,
              date: data.date,
              info: data.info,
              entitledDeployed: [],
              clouds: [],
              vmware: "",
              docker: "",
              questions: [],
              report: []
            };
            this.auth.database.get(this.auth.userInfo.email).then(function(doc) {
              if(doc["accounts"] == null)
              {
                 doc["accounts"] = [];
              }
              doc["accounts"].unshift(newAcct);
              //TODO: CHECK TO SEE DUPLICATE ACCOUNTS, ETC
              that.auth.database.put(doc).then(res => {
                that.auth.accounts = doc["accounts"];
              });
            });                    
        }
      }]    
    });
    await alert.present(); 
  }

  openAccountPage(account){
    this.auth.currentAccount = account;
    console.log("setting current account");
    this.auth.saveCurrentAccount();
    this.router.navigate(['acct-info']);
  }

  async getAcct(account){
    return this.auth.database.get(this.auth.userInfo.email).then(function(doc) {
      return doc;
    });
  }

  async updateAccount(account){
    let that = this;
    var index;
    var obj;
    var doc;
    await this.getAcct(account).then(data => {
      doc = data;
      obj = doc["accounts"].find(x => x.name === account.name);
      index = doc["accounts"].indexOf(obj);
    });
    const alert = await this.alertCtrl.create({
      message: 'Create a New Business Profile',
      inputs: [
        {
            name: 'name',
            placeholder: 'Business Name',
            value: obj.name
        },
        {
            name: 'location',
            placeholder: 'Location',
            value: obj.location
        },
        {
            name: 'date',
            placeholder: 'date',
            type: 'date',
            value: obj.date
        },
        {
            name: "info",
            placeholder: "Additional Client Info",
            value: obj.info
        }
      ],
      buttons: [
        {
          text: 'Update',
          handler: data => {
            console.log('Update clicked');
            obj = {
              name: data.name,
              location: data.location,
              date: data.date,
              info: data.info,
              entitledDeployed: obj.entitledDeployed,
              clouds: obj.clouds,
              vmware: obj.vmware,
              docker: obj.docker,
              questions: obj.questions,
              report: []
            };
            doc["accounts"][index] = obj;
            that.auth.database.put(doc).then(res => {
                that.auth.accounts = doc["accounts"];                   
          });
          }      
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]    
    });
    await alert.present();  
  }

  async delete(account){
    let that = this;
    var index;
    var obj;
    var doc;
    await this.getAcct(account).then(data => {
      doc = data;
      obj = doc["accounts"].find(x => x.name === account.name);
      index = doc["accounts"].indexOf(obj);
    });

    const alert = await this.alertCtrl.create({
      message: 'Are you sure you want to delete this account?',
      buttons: [
        {
          text: 'Delete',
          role: 'delete',
          cssClass:"color=Danger",
          handler: data => {
            doc["accounts"].splice(index, 1);
            that.auth.database.put(doc).then(res => {
              that.auth.accounts = doc["accounts"];
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();  
  }

  logOut(){
    this.auth.logOut();
    this.router.navigate(['login']);
  }
}
