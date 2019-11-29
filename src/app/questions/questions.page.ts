import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
	account: any;
  questions: any;

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthenticationService) { 
    this.auth.prospectingDB.allDocs({include_docs: true}).then(res => {
      this.questions = res.rows;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(!this.auth.tokenIsValid())
    {
      //navigating back to login
      this.router.navigate(['login']);
    }
  }

  updateItem(product1, question1, answer1){
    let obj = this.auth.currentAccount.questions.find(x => x.question === question1);
    let index = this.auth.currentAccount.questions.indexOf(obj);
    if(index != -1){
      obj.answer = answer1;
      this.auth.currentAccount.questions[index] = obj;
    }
    else {
      let newAnswer = { 
        product: product1,
        question: question1,
        answer: answer1
      }
      this.auth.currentAccount.questions.push(newAnswer);
    }
  }

  hasItem(question, answer) {
    let obj = this.auth.currentAccount.questions.find(x => x.question === question);
    let index = this.auth.currentAccount.questions.indexOf(obj);
  	return (index != -1 && obj.answer === answer);
  }

  navigateToPage(page) {
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }

}
