import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cloud-info',
  templateUrl: './cloud-info.page.html',
  styleUrls: ['./cloud-info.page.scss'],
})
export class CloudInfoPage implements OnInit {


cloudsInUse: any[] = [];
  constructor() { }
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
