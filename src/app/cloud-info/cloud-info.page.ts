import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-cloud-info',
  templateUrl: './cloud-info.page.html',
  styleUrls: ['./cloud-info.page.scss'],
})
export class CloudInfoPage implements OnInit {


account: any[] = [];
cloudsInUse: any[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.account = this.router.getCurrentNavigation().extras.state.acct;
      }
    });
}
usingVMWare = false;

  ngOnInit() {
  }

//adds cloud to list of clouds that the client is using
  addValue(e, cloud) {
  	if(e.currentTarget.checked) {
  		this.cloudsInUse.push(cloud);
  	}
  	else{
  		var index = this.cloudsInUse.indexOf(cloud);
  		if(index!= -1) {
  			this.cloudsInUse.splice(index, 1);
  		}
  	}

  }

  navigateToPage(page) {
    let navigationExtras: NavigationExtras = {
            state: {
                acct: this.account
            }
        };
        this.router.navigate([page], navigationExtras);
  }

  updateVMWare(e) {
  	if(e.currentTarget.checked)
  	{
  		this.usingVMWare = true;
  	}
  	else{
  		this.usingVMWare = false;
  	}
  }

}
