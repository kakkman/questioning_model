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
    //load accounts from local if possible. 

  }

  ionViewWillEnter(){
    if(!this.auth.tokenIsValid())
    {
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
      message: 'Create a new client profile',
      inputs: [
        {
            name: 'name',
            placeholder: 'Client Name'
        },
        {
            name: 'location',
            placeholder: 'location',
        },
        {
          	name: 'date',
          	placeholder: 'date',
          	type: 'date'
        },
        {
          	name: "info",
          	placeholder: "additional client info",
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
}




