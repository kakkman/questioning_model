import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-cloud-info',
  templateUrl: './cloud-info.page.html',
  styleUrls: ['./cloud-info.page.scss'],
})
export class CloudInfoPage implements OnInit {

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private auth: AuthenticationService) { 
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
  		this.auth.currentAccount.clouds.push(cloudProvider);
  	}
  	else{
      //removes cloud
      let obj = this.auth.currentAccount.clouds.find(x => x.name === cloudName)
      let index = this.auth.currentAccount.clouds.indexOf(obj);

  		if(index!= -1) {
  			this.auth.currentAccount.clouds.splice(index, 1);
  		}
  	}
  }

  hasCloud(cloud){
    let obj = this.auth.currentAccount.clouds.find(x => x.name === cloud)
    let index = this.auth.currentAccount.clouds.indexOf(obj);
    return(index != -1);
  }

  updateService(index, service) {
    this.auth.currentAccount.clouds[index].services.push(service);
  }

  hasService(i, service) {
    let cloud = this.auth.currentAccount.clouds[i].services
    return(cloud.indexOf(service) != -1)
  }

  navigateToPage(page) {
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }
}
