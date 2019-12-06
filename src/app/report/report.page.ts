import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {

  questions: any;
  positiveList: any;
  currentAccount;

  constructor(private route: ActivatedRoute,
   private router: Router, 
   public auth: AuthenticationService, 
   public storage: Storage) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.currAcct) {
        this.currentAccount = params.currAcct;
      }
    });
    this.auth.updateCurrentAccount();
    this.auth.prospectingDB.allDocs({include_docs: true}).then(res => {
      this.questions = res.rows;
    });
    let that = this;
    this.storage.get('currentAccount').then((val)=> {
        that.currentAccount = val;
      });
  }

  filter(element) {
    var allPaths = [];
    allPaths = element.doc.questions.filter(value => {
      let obj = {
        product: element.doc.name,
        question: value.question,
        answer: value.good
      }
      return this.currentAccount.questions.some(item => JSON.stringify(item) == JSON.stringify(obj));
    });
    return allPaths;
  }

  ionViewWillEnter(){
    
  }

  navigateToPage(page) {
    this.auth.setCurrentAccount(this.currentAccount);
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }
}
