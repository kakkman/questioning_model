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

  ionViewWillEnter(){
    if(!this.auth.tokenIsValid())
    {
      //navigating back to login
      this.router.navigate(['login']);
    }
    let that = this;

    this.storage.get('currentAccount').then((val)=> {
      that.auth.currentAccount = val;
    });

    if(this.auth.currentAccount === undefined){
      this.router.navigate(['home']);
    }
  }

  getAccountName()
  {
    if(this.auth.currentAccount === undefined){
      return "";
    }
    return this.auth.currentAccount.name
  }

  navigateToPage(page) {
    this.router.navigate([page]);
  }

}