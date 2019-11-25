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

  accounts: any[] = [];

  constructor(private route: ActivatedRoute, 
    private alertCtrl: AlertController, 
    private router: Router, 
    public auth: AuthenticationService) {

//update list of accounts

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras);
        if(this.router.getCurrentNavigation().extras.state.accountInfo != null)
        {
          this.accounts = this.router.getCurrentNavigation().extras.state.accountInfo["accounts"];
        }
        //account was updated by one of the child pages
        else if(this.router.getCurrentNavigation().extras.state.acct != null)
        {
          let account = this.router.getCurrentNavigation().extras.state.acct;
          this.auth.database.get(this.auth.userInfo.email).then(function(doc) {
            var string= doc
            if(doc["accounts"] != null)
            {
              for(var i = 0; i < doc["accounts"].length; i++)
              {
                if (doc["accounts"][i].name === account.name)
                {
                  doc["accounts"][i] = account;
                }
              }
              this.auth.database.put(doc);
            }
          });
        }
      }
    });
  }

  async presentAlert() {
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
              vmware: [],
              docker: "",
              questions: [],
              report: []
            };

            let that = this;
            this.auth.database.get(this.auth.userInfo.email).then(function(doc) {
              var string= doc
              if(doc["accounts"] == null)
              {
                 doc["accounts"] = [];
              }
              doc["accounts"].unshift(newAcct);
              //TODO: CHECK TO SEE DUPLICATE ACCOUNTS, ETC
              that.auth.database.put(doc);
            });                    
        }
      }]    
    });
    await alert.present(); 
  }

  openAccountPage(account){
    let navigationExtras: NavigationExtras = {
      state: {
        acct: account
      }
    };
    this.router.navigate(['acct-info'], navigationExtras);
  }
}




