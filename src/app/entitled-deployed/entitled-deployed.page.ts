import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-entitled-deployed',
  templateUrl: './entitled-deployed.page.html',
  styleUrls: ['./entitled-deployed.page.scss'],
})
export class EntitledDeployedPage {

  public products: any;
  public currentAccount;

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService, public storage: Storage) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.currAcct) {
        this.currentAccount = JSON.parse(params.currAcct);
      }
    });
    this.auth.entitledDeployedDB.allDocs({include_docs: true}).then(res => {
      this.products = res.rows;
    });
    let that = this;
    this.storage.get('currentAccount').then((val)=> {
        that.currentAccount = val;
      });
  }

  ionViewWillEnter(){
    if(this.currentAccount === undefined || this.currentAccount === null){
      this.router.navigate(['home']);
    }
  }

  complete(page){
    this.currentAccount.entitledComplete = true;
    this.navigateToPage(page);
  }

  navigateToPage(page) {
    this.auth.setCurrentAccount(this.currentAccount);
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }

  checkedItem(e, item) {
  	if(e.currentTarget.checked) {
  		this.currentAccount.entitledDeployed.push(item);
  	}
  	else {
  		var index = this.currentAccount.entitledDeployed.indexOf(item);
  		if(index!= -1) {
  			this.currentAccount.entitledDeployed.splice(index, 1);
  		}
  	}
  }

  hasItem(item)
  {
    if(item != null)
    {
  	let hasItem = this.currentAccount.entitledDeployed.indexOf(item) != -1;
    return hasItem;
    }
    return false;
  	
  }
}
