import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-acct-info',
  templateUrl: './acct-info.page.html',
  styleUrls: ['./acct-info.page.scss'],
})
export class AcctInfoPage implements OnInit {

  account: any;

  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    let that = this;
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.account = this.router.getCurrentNavigation().extras.state.acct;
        let account = this.router.getCurrentNavigation().extras.state.acct;
          that.auth.database.get(that.auth.userInfo.email).then(function(doc) {
            var string= doc
            if(doc["accounts"] != null)
            {
              for(var i = 0; i < doc["accounts"].length; i++)
              {
                if (doc["accounts"][i].name === account.name)
                {
                  doc["accounts"][i] = account;
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