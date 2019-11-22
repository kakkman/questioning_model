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
    this.storage.get("accounts").then((val) => { 

      let obj = val.find(x => x.name === this.account.name)
      let index = val.indexOf(obj);

      console.log(index);
      val[index] = this.account;
      this.storage.set("accounts", val);
    });
    console.log(this.account)

  }

  hasCloud(cloud){
    let obj = this.account.clouds.find(x => x.name === cloud)
    let index = this.account.clouds.indexOf(obj);
    return(index != -1);
  }

  updateService(index, service) {

    this.account.clouds[index].services.push(service);

    this.storage.get("accounts").then((val) => { 

      let obj = val.find(x => x.name === this.account.name)
      let index = val.indexOf(obj);

      console.log(index);
      val[index] = this.account;
      this.storage.set("accounts", val);
    });
    console.log(this.account)

  }

  hasService(i, service)
  {
    let cloud = this.account.clouds[i].services
    return(cloud.indexOf(service) != -1)
    /*let obj = cloud.find(x => x.services === service)
      let index = cloud.indexOf(obj); */
    //return(index != -1)

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
      this.account.vmware = true;
  	}
  	else{
  		this.usingVMWare = false;
      this.account.vmware = false;
  	}
    this.storage.get("accounts").then((val) => { 

      let obj = val.find(x => x.name === this.account.name)
      let index = val.indexOf(obj);

      console.log(index);
      val[index] = this.account;
      this.storage.set("accounts", val);
    });
  }

}
