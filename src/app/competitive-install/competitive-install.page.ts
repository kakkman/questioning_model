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

  checkedItem(e, item, product) {
  	if(this.auth.currentAccount.competitiveInstall === undefined) {
  		this.auth.currentAccount.competitiveInstall = [];
  	}
  	var indexOfProduct = this.auth.currentAccount.competitiveInstall.findIndex(i => i.name === product);
  	if(e.currentTarget.checked) {
  		//checks to see if the ibm related product is already on there, if it isn't it adds it. 
  		if(indexOfProduct != -1) {
  			if(!this.auth.currentAccount.competitiveInstall[indexOfProduct].competitive.includes(item)){
  				this.auth.currentAccount.competitiveInstall[indexOfProduct].competitive.push(item);
  			}
  		} else {
  			//pushes as array to allow for more competitive products to be added.
  			var newCompetitive = {
  				name: product,
  				competitive: [item]
  			};
  			this.auth.currentAccount.competitiveInstall.push(newCompetitive);
  		}
  	} else {
  		if(indexOfProduct != -1) {
  			//removes singular item from competitive install list. 
  			var competitiveIndex = this.auth.currentAccount.competitiveInstall[indexOfProduct].competitive.indexOf(item);
  			if(competitiveIndex!= -1) {
  				this.auth.currentAccount.competitiveInstall[indexOfProduct].competitive.splice(competitiveIndex, 1);
  				//removes product completely from competitive install section if there are no competitors in use.
  				if(this.auth.currentAccount.competitiveInstall[indexOfProduct].competitive.length == 0){
  					this.auth.currentAccount.competitiveInstall.splice(indexOfProduct,1);
  				}
  			}
  		}
  	}
  }

//TODO FIX SORTING FOR THIS.  probably a map of some kind
  removeDuplicateAndSort(array){
  	let toReturn = Array.from(new Set(array)).sort();
  	return toReturn;
  }

  hasItem(item, product) {
    if(item != null && this.auth.currentAccount.competitiveInstall != undefined) {
    	var indexOfProduct = this.auth.currentAccount.competitiveInstall.findIndex(i => i.name === product);
    	if(indexOfProduct != -1){
    		return this.auth.currentAccount.competitiveInstall[indexOfProduct].competitive.includes(item)
    	}
    }
    return false;	
  }
}
