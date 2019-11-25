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

  public account: any;

  public products: any;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { 
  	this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.account = this.router.getCurrentNavigation().extras.state.acct;
      }
    });
    this.auth.entitledDeployedDB.allDocs({include_docs: true}).then(res => {
      this.products = res.rows;
      console.log(this.products);
    });
  }

  navigateToPage(page) {
  	let navigationExtras: NavigationExtras = {
      state: {
        acct: this.account
      }
    };
    this.router.navigate([page], navigationExtras);
  }

  checkedItem(e, item) {
  	if(e.currentTarget.checked) {
  		this.account.entitledDeployed.push(item);
  	}
  	else {
  		var index = this.account.entitledDeployed.indexOf(item);
  		if(index!= -1) {
  			this.account.entitledDeployed.splice(index, 1);
  		}
  	}
  }

  hasItem(item)
  {
  	let hasItem = this.account.entitledDeployed.indexOf(item) != -1;
  	return hasItem;
  }
}
