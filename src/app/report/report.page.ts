import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  questions: any;
  positiveList: any;

  competitiveProducts: any;
  entitledDeployed: any;

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService) { 
    this.auth.updateCurrentAccount();
    let that = this;
    this.auth.entitledDeployedDB.allDocs({include_docs:true}).then(res => {
      that.entitledDeployed = res.rows;
      that.auth.prospectingDB.allDocs({include_docs: true}).then(res2 => {
        that.questions = res2.rows;
      });
    });
  }

  urlForProduct(productName){

    let urlToReturn = this.entitledDeployed.find(x => x.name === productName);
    if(urlToReturn != undefined){
      return urlToReturn;
    }
    return "";
  }


  filter(element) {
    var allPaths = [];
    allPaths = element.doc.questions.filter(value => {
      let obj = {
        product: element.doc.name,
        question: value.question,
        answer: value.good
      }
      return this.auth.currentAccount.questions.some(item => JSON.stringify(item) == JSON.stringify(obj));
    });
    return allPaths;
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    
  }

  navigateToPage(page) {
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }
}
