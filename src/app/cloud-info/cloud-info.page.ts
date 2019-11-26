import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-cloud-info',
  templateUrl: './cloud-info.page.html',
  styleUrls: ['./cloud-info.page.scss'],
})
export class CloudInfoPage implements OnInit {

  account: any;
  cloudsInUse: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.account = this.router.getCurrentNavigation().extras.state.acct;
      }
    });
  }

  ngOnInit() {
  }

  //adds cloud to list of clouds that the client is using
  addValue(e, cloudName) {
  	if(e.currentTarget.checked) {
      let cloudProvider = {
        name: cloudName,
        services: []
      }
  		this.account.clouds.push(cloudProvider);
  	}
  	else{
      //removes cloud
      let obj = this.account.clouds.find(x => x.name === cloudName)
      let index = this.account.clouds.indexOf(obj);
      console.log(index);

  		if(index!= -1) {
  			this.account.clouds.splice(index, 1);
  		}
  	}
    console.log(this.account)
  }

  hasCloud(cloud){
    let obj = this.account.clouds.find(x => x.name === cloud)
    let index = this.account.clouds.indexOf(obj);
    return(index != -1);
  }

  updateService(index, service) {
    this.account.clouds[index].services.push(service);
    console.log(this.account)
  }

  hasService(i, service) {
    let cloud = this.account.clouds[i].services
    return(cloud.indexOf(service) != -1)
  }

  navigateToPage(page) {
    let navigationExtras: NavigationExtras = {
      state: {
         acct: this.account
      }
    };
    this.router.navigate([page], navigationExtras);
  }

}
