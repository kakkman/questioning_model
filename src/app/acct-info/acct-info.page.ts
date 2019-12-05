import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-acct-info',
  templateUrl: './acct-info.page.html',
  styleUrls: ['./acct-info.page.scss'],
})
export class AcctInfoPage implements OnInit {

  constructor(public storage: Storage, public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) {
       let that = this;

 this.storage.get('currentAccount').then((val)=> {
      that.auth.currentAccount = val;
    });
  }

  ngOnInit() {
     //this.auth.updateCurrentAccount()
  }

  async ionViewWillEnter(){
    let that = this;
    this.storage.get('currentAccount').then((val)=> {
      that.auth.currentAccount = val;
    });

    if(this.auth.currentAccount === undefined || this.auth.currentAccount === null){
      this.router.navigate(['home']);
    }
  }

  //getter methods to prevent error from async loading

  getAccountName()
  {
    if(this.auth.currentAccount === undefined){
      return "";
    }
    return this.auth.currentAccount.name
  }

  entitledDeployed(){
    if(this.auth.currentAccount === undefined){
      return false;
    }
    return this.auth.currentAccount.entitledComplete
  }

  cloudInfo(){
    if(this.auth.currentAccount === undefined){
      return false;
    }
    return this.auth.currentAccount.cloudComplete
  }

  prospecting(){
    if(this.auth.currentAccount === undefined){
      return false;
    }
    return this.auth.currentAccount.prospectComplete
  }


  navigateToPage(page) {
    this.router.navigate([page]);
  }

}