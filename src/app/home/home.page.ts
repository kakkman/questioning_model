import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertCtrl: AlertController) {}


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
        placeholder: 'Password',
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
          console.log('Cancel clicked');
        }
      }
    ]
   });
   		await alert.present(); 
	}

}