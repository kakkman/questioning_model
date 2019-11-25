import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    accounts: any[] = [];

    account = {
        name: "",
        location: "",
        date: "",
        info: "",
        entitledDeployed: [],
        clouds: [],
        vmware: [],
        docker: "",
        questions: [],
        report: [] };

    user: any; 
    constructor(private alertCtrl: AlertController, private storage: Storage, private router: Router, public auth: AuthenticationService) {
        storage.get('accounts').then((val)=> {
            if (val != null) {
                this.accounts = val;
            }
        });

        //new stuff here. load from db


        //this.accounts = this.auth.loadAccounts();

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
                }}]    
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




