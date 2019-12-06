import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-acct-info',
  templateUrl: './acct-info.page.html',
  styleUrls: ['./acct-info.page.scss'],
})
export class AcctInfoPage {

  public currentAccount;

  constructor(public storage: Storage, public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    let that = this;
    this.storage.get('currentAccount').then((val)=> {
        that.currentAccount = val;
      });
  }

  async ionViewWillEnter(){
    let that = this;
    this.storage.get('currentAccount').then((val)=> {
      that.currentAccount = val;
      if(this.currentAccount === undefined || this.currentAccount === null){
        this.router.navigate(['home']);
      }
    });
  }

  //getter methods to prevent error from async loading

  getAccountName(){
    if(this.currentAccount === undefined){
      return "";
    }
    return this.currentAccount.name
  }

  entitledDeployed(){
    if(this.currentAccount === undefined){
      return false;
    }
    return this.currentAccount.entitledComplete
  }

  cloudInfo(){
    if(this.currentAccount === undefined){
      return false;
    }
    return this.currentAccount.cloudComplete
  }

  prospecting(){
    if(this.currentAccount === undefined){
      return false;
    }
    return this.currentAccount.prospectComplete
  }


  navigateToPage(page) {
    this.auth.setCurrentAccount(null);
    this.router.navigate([page]);
  }

}