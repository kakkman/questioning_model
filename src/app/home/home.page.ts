import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
        cloudInfo: [],
        questions: [],
        report: [] };

    constructor(private alertCtrl: AlertController, private storage: Storage) {
        storage.get('accounts').then((val)=> {
            if (val != null) {
                this.accounts = val;
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
                            cloudInfo: [],
                            questions: [],
                            report: []
                        };
                        this.accounts.push(newAcct);
                        this.storage.set("accounts", this.accounts);
                    }
                }
            ]
        });
        await alert.present(); 
    }
}