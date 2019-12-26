import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-entitled-deployed',
  templateUrl: './entitled-deployed.page.html',
  styleUrls: ['./entitled-deployed.page.scss'],
})
export class EntitledDeployedPage {

  public products: any;

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService) { 
    this.auth.entitledDeployedDB.allDocs({include_docs: true}).then(res => {
      this.products = res.rows;
    });
  }

  async ionViewWillEnter(){
    if(this.auth.currentAccount === undefined || this.auth.currentAccount === null){
      this.router.navigate(['home']);
    }
  }

  complete(page){
    this.auth.currentAccount.entitledComplete = true;
    this.navigateToPage(page);
  }

  navigateToPage(page) {
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }

  checkedItem(e, item) {
  	if(e.currentTarget.checked) {
      console.log("Adding element" + item +"and it's name " + item.name);
  		this.auth.currentAccount.entitledDeployed.push(item.name);
  	}
  	else {
  		var index = this.auth.currentAccount.entitledDeployed.indexOf(item.name);
  		if(index!= -1) {
  			this.auth.currentAccount.entitledDeployed.splice(index, 1);
  		}
  	}
  }

  hasItem(item)
  {
    if(item != null)
    {
  	let hasItem = this.auth.currentAccount.entitledDeployed.indexOf(item.name) != -1;
    return hasItem;
    }
    return false;
  	
  }
}
