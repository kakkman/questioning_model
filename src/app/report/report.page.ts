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

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { 
    this.auth.updateCurrentAccount();
    this.auth.prospectingDB.allDocs({include_docs: true}).then(res => {
      this.questions = res.rows;
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
      return this.auth.currentAccount.questions.some(item => JSON.stringify(item) == JSON.stringify(obj));
    });
    return allPaths;
  }

  ngOnInit() {
  }

  navigateToPage(page) {
    this.auth.updateCurrentAccount();
    this.router.navigate([page]);
  }
}
