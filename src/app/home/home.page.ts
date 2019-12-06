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

  accounts = [];

  constructor(private route: ActivatedRoute, 
    private alertCtrl: AlertController, 
    private router: Router, 
    public auth: AuthenticationService) {
  }

  async ionViewWillEnter(){
    let that = this;
    var email;
    this.auth.getUserInfo().then(res =>{
      email = res.email;
      that.auth.database.get(email).then(function(doc) {
        that.accounts = doc["accounts"];
       }).catch(function (err) {
         console.log(err);
      });
    })
  }

  async presentAlert() {
    let that = this;
    var userInfo;
    await this.auth.getUserInfo().then(user =>{
      userInfo = user.email;
    }).then(res =>{
      that.alertCtrl.create({
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
              this.auth.database.get(userInfo).then(function(doc) {
                if(doc["accounts"] == null)
                {
                   doc["accounts"] = [];
                }
                doc["accounts"].unshift(newAcct);
                //TODO: CHECK TO SEE DUPLICATE ACCOUNTS, ETC
                that.auth.database.put(doc).then(res => {
                  that.accounts = doc["accounts"];
                });
              });                    
          }
        }]    
      }).then(results => {
        results.present();
      });
    });
  }

  openAccountPage(account){
    console.log(account);
    this.auth.setCurrentAccount(account);
        let navigationExtras: NavigationExtras = {
      queryParams: {
        currAcct: account
      }
    };
    this.router.navigate(['acct-info']);
  }

  async updateAccount(account){
    let that = this;
    var index;
    var obj;
    var doc;
    var userInfo;
    await this.auth.getUserInfo().then(user =>{
      userInfo = user.email;
    }).then(res =>{
      this.auth.database.get(userInfo).then(data => {
        doc = data;
        obj = doc["accounts"].find(x => x.name === account.name);
        index = doc["accounts"].indexOf(obj);
        that.alertCtrl.create({
      message: 'Update Account',
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
                that.accounts = doc["accounts"];                   
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
    }).then(results =>{results.present()});
      }); 
    });
  }

  async delete(account){
    let that = this;
    var index;
    var obj;
    var doc;
    var userInfo;
    await this.auth.getUserInfo().then(user =>{
      userInfo = user.email;
    }).then(res =>{
      this.auth.database.get(userInfo).then(data => {
        doc = data;
        obj = doc["accounts"].find(x => x.name === account.name);
        index = doc["accounts"].indexOf(obj);
        that.alertCtrl.create({
          message: 'Are you sure you want to delete this account?',
          buttons: [
            {
              text: 'Delete',
              role: 'delete',
              cssClass:"color=Danger",
              handler: data => {
                doc["accounts"].splice(index, 1);
                that.auth.database.put(doc).then(res => {
                  that.accounts = doc["accounts"];
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
        }).then(results =>{results.present()});
      }); 
    });
  }
   
  logOut(){
    this.auth.logOut();
    this.router.navigate(['login']);
  }
}
