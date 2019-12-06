import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cloud-info',
  templateUrl: './cloud-info.page.html',
  styleUrls: ['./cloud-info.page.scss'],
})
export class CloudInfoPage implements OnInit {

  public currentAccount;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    public auth: AuthenticationService,
    public storage: Storage) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.currAcct) {
        this.currentAccount = params.currAcct;
      }
    });
    let that = this;
    this.storage.get('currentAccount').then((val)=> {
        that.currentAccount = val;
      });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.currentAccount === undefined || this.currentAccount === null){
      this.router.navigate(['home']);
    }
  }

  //adds cloud to list of clouds that the client is using
  addValue(e, cloudName) {
  	if(e.currentTarget.checked) {
      let cloudProvider = {
        name: cloudName,
        services: []
      }
  		this.currentAccount.clouds.push(cloudProvider);
  	}
  	else{
      //removes cloud
      let obj = this.currentAccount.clouds.find(x => x.name === cloudName)
      let index = this.currentAccount.clouds.indexOf(obj);

  		if(index!= -1) {
  			this.currentAccount.clouds.splice(index, 1);
  		}
  	}
  }

  hasCloud(cloud){
    let obj = this.currentAccount.clouds.find(x => x.name === cloud)
    let index = this.currentAccount.clouds.indexOf(obj);
    return(index != -1);
  }

  updateService(index, service) {
    this.currentAccount.clouds[index].services.push(service);
  }

  hasService(i, service) {
    let cloud = this.currentAccount.clouds[i].services
    return(cloud.indexOf(service) != -1)
  }

  
  complete(page){
    this.currentAccount.cloudComplete = true;
    this.navigateToPage(page);
  }


  navigateToPage(page) {
    this.auth.setCurrentAccount(this.currentAccount);
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }
}
