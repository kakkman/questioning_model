import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

account: any;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService) { 
  let that = this;
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.account = this.router.getCurrentNavigation().extras.state.acct;
          that.auth.database.get(that.auth.userInfo.email).then(function(doc) {
            if(doc["accounts"] != null)
            {
              for(var i = 0; i < doc["accounts"].length; i++)
              {
                if (doc["accounts"][i].name === that.account.name)
                {
                  doc["accounts"][i] = that.account;
                }
              }
              that.auth.database.put(doc);
            }
          });
      }
    });
}

  ngOnInit() {
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
