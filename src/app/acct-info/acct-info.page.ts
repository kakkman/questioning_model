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

  constructor(public auth: AuthenticationService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
     //this.auth.updateCurrentAccount()
  }

  ionViewWillEnter(){
    if(!this.auth.tokenIsValid())
    {
      //navigating back to login
      this.router.navigate(['login']);
    }
  }

  navigateToPage(page) {
    this.router.navigate([page]);
  }

}