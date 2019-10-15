import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-acct-info',
  templateUrl: './acct-info.page.html',
  styleUrls: ['./acct-info.page.scss'],
})
export class AcctInfoPage implements OnInit {

  account: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.account = this.router.getCurrentNavigation().extras.state.acct;
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
