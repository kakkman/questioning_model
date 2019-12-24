import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-competitive-install',
  templateUrl: './competitive-install.page.html',
  styleUrls: ['./competitive-install.page.scss'],
})

export class CompetitiveInstallPage implements OnInit {

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

  ngOnInit(){

  }

  complete(page){
    this.auth.currentAccount.competitiveComplete = true;
    this.navigateToPage(page);
  }

  navigateToPage(page) {
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }

  checkedItem(e, item) {
  	if(this.auth.currentAccount.competitiveInstall === undefined)
  	{
  		this.auth.currentAccount.competitiveInstall = [];
  	}
  	if(e.currentTarget.checked) {
  		this.auth.currentAccount.competitiveInstall.push(item);
  	}
  	else {
  		var index = this.auth.currentAccount.competitiveInstall.indexOf(item);
  		if(index!= -1) {
  			this.auth.currentAccount.competitiveInstall.splice(index, 1);
  		}
  	}
  }

  removeDuplicateAndSort(array){
  	let toReturn = Array.from(new Set(array)).sort();
  	return toReturn;
  }

  hasItem(item)
  {
    if(item != null && this.auth.currentAccount.competitiveInstall != undefined) {
  		let hasItem = this.auth.currentAccount.competitiveInstall.indexOf(item) != -1;
    	return hasItem;
    }
    return false;	
  }
}
