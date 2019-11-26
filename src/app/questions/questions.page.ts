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

  updateItem(event, answer, question){
  	if(answer === question[1])
  	{
  		console.log("true");
  		this.account.questions.push(question[0]);
  	}
  	else{

  		console.log("false");
  		let index = this.account.questions.indexOf(question[0])
  		if( index != -1)
  		{
  			this.account.questions.splice(index, 1);
  		}
  	}
  }

  hasItem(item, choice) {
  	return this.account.questions.indexOf(item) != -1
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
