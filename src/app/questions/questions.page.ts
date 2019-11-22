import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

cp4d1 = ["Do you have projects you are currently considering in order to capitalize on the use of data and AI?", "Yes", "No"];
cp4d2 = ["Do you get the data and insights you need in a timely fashion?", "No", "Yes"];
cp4d3 = ["Do you experience significant skill gaps when supporting data science and AI projects?", "Yes", "No"];
cp4d4 = ["Do you have an effective and easy way to operationalize and govern machine learning models to support AI?", "No", "Yes"];
cp4d5 = ["Do you apply and automate data privacy and governance?", "No", "Yes"];
cp4d6 = ["Do you have policies and rules management for your data?", "No", "Yes"];
cp4d7 = ["Do you know what data is available?", "No", "Yes"];

cloudPakForData = [this.cp4d1, this.cp4d2, this.cp4d3, this.cp4d4,this.cp4d5, this.cp4d6, this.cp4d7];

cp4a1 = ["Are you building Cloud Native Applications?", "Yes", "No"];
cp4a2 = ["Are you modernizing your legacy applications?", "Yes", "No"];
cloudPakForApplications = [this.cp4a1, this.cp4a2];

	account: any;

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage) { 
  this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.account = this.router.getCurrentNavigation().extras.state.acct;
      }
    });
}

  ngOnInit() {
  }

  updateItem(event, answer, question){

    console.log(this.account.questions.length)
    for(var i = 0; i < this.account.questions.length; i++) {
       if(this.account.questions[i][0] === question[0]) {
          this.account.questions.splice(i, 1);
      }
    }

  	if(answer === question[1])
  	{
  		//console.log("true");
      let index = this.account.questions.indexOf([question[0], question[2]])
      //console.log(index)
      if( index != -1)
      {
        this.account.questions.splice(index, 1);
      }
  		this.account.questions.push([question[0], question[1]]);
  	}
  	else{

  		//console.log("false");
  		let index = this.account.questions.indexOf([question[0], question[1]])
      //console.log(index);
  		if( index != -1)
  		{
  			this.account.questions.splice(index, 1);
  		}
      this.account.questions.push([question[0],question[2]])
  	}
    //console.log(this.account.questions);
  	this.storage.get("accounts").then((val) => { 

  		let obj = val.find(x => x.name === this.account.name)
  		let index = val.indexOf(obj);

  		val[index] = this.account;
  		this.storage.set("accounts", val);
  	});

  }

  hasItem(question, choice) {
    /*console.log(this.account.questions[0])
    console.log("question : " + question[0] )
    console.log("Choice " + choice);
    console.log(this.account.questions.indexOf([question[0], choice]) != -1) */
    if(this.account.questions != [])
    {
      for(var i = 0; i < this.account.questions.length; i++) {
         if(this.account.questions[i][0] === question[0] &&
             this.account.questions[i][1] === choice) {
           return true;
        }
      }
      return false;
    }
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
