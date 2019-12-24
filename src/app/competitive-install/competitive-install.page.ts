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

public products;


  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService) { 
   // this.auth.entitledDeployedDB.allDocs({include_docs: true}).then(res => {
    //  this.product = res.rows;
   // });
  }

    ngOnInit() {
  }

  async ionViewWillEnter(){
    if(this.auth.currentAccount === undefined || this.auth.currentAccount === null){
      this.router.navigate(['home']);
    }
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
  	if(e.currentTarget.checked) {
  		this.auth.currentAccount.entitledDeployed.push(item);
  	}
  	else {
  		var index = this.auth.currentAccount.entitledDeployed.indexOf(item);
  		if(index!= -1) {
  			this.auth.currentAccount.entitledDeployed.splice(index, 1);
  		}
  	}
  }

  hasItem(item)
  {
    if(item != null)
    {
  	let hasItem = this.auth.currentAccount.entitledDeployed.indexOf(item) != -1;
    return hasItem;
    }
    return false;
  	
  }

}
