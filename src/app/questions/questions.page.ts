import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
  }

}
