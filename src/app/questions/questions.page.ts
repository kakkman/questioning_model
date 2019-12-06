import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
	account: any;
  questions: any;

  public currentAccount;

  constructor(private route: ActivatedRoute,
   private router: Router, 
   public auth: AuthenticationService, 
   public storage: Storage) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.currAcct) {
        this.currentAccount = JSON.parse(params.currAcct);
      }
    });
    this.auth.prospectingDB.allDocs({include_docs: true}).then(res => {
      this.questions = res.rows;
    });
    let that = this;
    this.storage.get('currentAccount').then((val)=> {
        that.currentAccount = val;
      });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    let that = this;
    this.storage.get('currentAccount').then((val)=> {
      that.currentAccount = val;
      if(that.currentAccount === undefined || that.currentAccount === null){
        that.router.navigate(['home']);
      }
    });
  }

  updateItem(product1, question1, answer1){
    let obj = this.currentAccount.questions.find(x => x.question === question1);
    let index = this.currentAccount.questions.indexOf(obj);
    if(index != -1){
      obj.answer = answer1;
      this.currentAccount.questions[index] = obj;
    }
    else {
      let newAnswer = { 
        product: product1,
        question: question1,
        answer: answer1
      }
      this.currentAccount.questions.push(newAnswer);
    }
  }

  hasItem(question, answer) {
    let obj = this.currentAccount.questions.find(x => x.question === question);
    let index = this.currentAccount.questions.indexOf(obj);
  	return (index != -1 && obj.answer === answer);
  }
  
  complete(page){
    this.currentAccount.prospectComplete = true;
    this.navigateToPage(page);
  }

  navigateToPage(page) {
    this.auth.setCurrentAccount(this.currentAccount);
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }



}
