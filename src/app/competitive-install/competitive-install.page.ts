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
  //this is used to remove duplicates of competitive products. Ie, 2 IBM offerings in Data and AI have the same 
  //competitor, this will make sure it is only produced once. 
  public competitiveProductMap = new Map();
  public productList: any;


//what I want to do is map all of the competitive products as the main keys 
///and then associate the ibm products with them separately so {name: watsonStudio, competitors: [x,y,z]}
  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService) { 
          //this.competitiveProductMap = new Map();

    this.auth.entitledDeployedDB.allDocs({include_docs: true}).then(res => {
      this.products = res.rows;
      //map by product sector / pillar 
      for(var x = 0; x < this.products.length; x++){
        var prod = this.products[x].doc.products; //as in watson studio, etc, full list
        var category = this.products[x].doc.name;
        var currentArray = [];
        this.competitiveProductMap.set(category, []);

        for(var y = 0; y < this.products[x].doc.products.length; y++){
          var currentProduct = prod[y].name; //watson studio for example. 

          if(prod[y].competitive != undefined) {
            for(var z = 0; z < prod[y].competitive.length; z++){
              var obj = currentArray.find(x => x.competitive === prod[y].competitive[z]);
              if(obj === undefined){
                console.log("Unable to find, adding new item")
                var newItem = {
                  competitive: prod[y].competitive[z],
                  ibm: [currentProduct]
                }
                currentArray.push(newItem)
              } else {
                var index = currentArray.indexOf(obj);
                var ibmProds = obj.ibm.concat(currentProduct);

                var updatedItem = {
                  competitive: obj.competitive,
                  ibm: ibmProds
                }
                currentArray[index] = updatedItem;
              }
              currentArray.sort((a,b) => (a.competitive > b.competitive) ? 1 : ((b.competitive > a.competitive) ? -1 : 0));
              this.competitiveProductMap.set(category, currentArray);
            }
          }
        }
      }
      console.log(this.competitiveProductMap);
      this.productList = Array.from(this.competitiveProductMap.keys());
    });
    //map all products.
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

  /*removeDuplicateAndSort(items, category){
    if(this.competitiveProductMap.has(category)){
      var currArray = this.competitiveProductMap.get(category);
      currArray = Array.from(currArray);
      currArray = currArray.concat(items);
      let toReturn = [...new Set(currArray)].sort();
      this.competitiveProductMap.set(category, toReturn);
    } else {
      let toReturn = [...new Set(items)].sort();
      this.competitiveProductMap.set(category, toReturn);
    }
  } */

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
