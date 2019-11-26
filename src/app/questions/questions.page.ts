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

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { 
  this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.account = this.router.getCurrentNavigation().extras.state.acct;
      }
    });
  this.auth.prospectingDB.allDocs({include_docs: true}).then(res => {
      this.questions = res.rows;
      console.log(this.questions);
    });
}

  ngOnInit() {
  }

  updateItem(product1, question1, answer1){
    let obj = this.account.questions.find(x => x.question === question1);
    let index = this.account.questions.indexOf(obj);
    if(index != -1)
    {
      obj.answer = answer1;
      this.account.questions[index] = obj;
    }
    else
    {
      let newAnswer = { 
        product: product1,
        question: question1,
        answer: answer1
      }
      this.account.questions.push(newAnswer);
    }

  }

  hasItem(question, answer) {
    console.log("Checking to see if it has");
    let obj = this.account.questions.find(x => x.question === question);
    let index = this.account.questions.indexOf(obj);
    console.log(index)
    if(index != -1)
    {
      console.log("THIS IS THE VALUE " + obj.answer);
    }
  	return (index != -1 && obj.answer === answer);
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
