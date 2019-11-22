import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

	cp4d1 = ["Do you have projects you are currently considering in order to capitalize on the use of data and AI?", "Yes"];
cp4d2 = ["Do you get the data and insights you need in a timely fashion?", "No"];
cp4d3 = ["Do you experience significant skill gaps when supporting data science and AI projects?", "Yes"];
cp4d4 = ["Do you have an effective and easy way to operationalize and govern machine learning models to support AI?", "No"];
cp4d5 = ["Do you apply and automate data privacy and governance?", "No"];
cp4d6 = ["Do you have policies and rules management for your data?", "No"];
cp4d7 = ["Do you know what data is available?", "No"];

	cloudPakForData = [this.cp4d1, this.cp4d2, this.cp4d3, this.cp4d4,this.cp4d5, this.cp4d6, this.cp4d7];

	cp4a1 = "Are you building Cloud Native Applications?";
	cp4a2 = "Are you modernizing your legacy applications?";
	cloudPakForApplications = [this.cp4a1, this.cp4a2];

	account: any;
	plays: any[] = [];

/*
 var a = [ [1,2] , [3,4] ];
 var b = [1,2];
 a = JSON.stringify(a);
 b = JSON.stringify(b);
then you can do just an indexOf() to check if it is present

var c = a.indexOf(b);
if(c != -1){
    console.log('element present');
}
*/
  constructor(private route: ActivatedRoute, private router: Router) { 
  this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.account = this.router.getCurrentNavigation().extras.state.acct;
        console.log(this.account)

        if(this.account.vmware){
		var vmPlay = { 
			explanation: "Because you said your customer is using VMWare Please see the following Sales Plays:",
			link: "https://ibm.seismic.com/X5/DocCenter.aspx?ContentId=4ba45436-b157-47a5-ab91-4659a0c7438f#/doccenter/6978143f-3408-4831-8558-9527b1279d8a/doc/%252Fdd86dcc126-ab33-495f-8000-fddd47641ea0%252Fdde42aea40-e441-4590-bf19-9547502c139b%252Fdfd7040a75-9ebb-4509-9de9-0976d354dc8e%252Fdfd91fb685-d3de-4a0c-b994-362b08b520c9%252Fdf98afe617-f223-4563-a0e2-1f873317b6ad%252Flf86493785-a540-4297-99fe-35b1cf1c5788//?mode=view&searchId=39db74b7-29df-47b7-a486-ff8b6e65d2a4"
		}
		this.plays.push(vmPlay);
		}

		/*(var i = 0; i < this.account.questions.length; i++)
		{
			console.log(this.account.questions[i])
			for(var j = 0; j < this.cloudPakForData.length; j++)
			{
				console.log(this.account.questions[i])
				console.log(this.cloudPakForApplications[j])
				if(this.account.questions[i][0] === this.cloudPakForApplications[j][0])
				{
					console.log("AWh yeah");
				}
			}
			if(this.account.questions[i].every( e => this.cloudPakForData.includes(e))){
				console.log("YEP")
				var cp4dPlay = { 
				explanation: "Because you said your customer is using Cognos analytics and does not know what data is available please see the following sales plays",
				link: "https://ibm.seismic.com/X5/DocCenter.aspx?ContentId=4ba45436-b157-47a5-ab91-4659a0c7438f#/doccenter/6978143f-3408-4831-8558-9527b1279d8a/doc/%252Fdd2194899e-2651-4d05-a864-ef1fd55170f9%252FdfOTRiYmU4NTQtNWY4NC03Y2QyLWZjYWUtOGIxYmFmZjkyZThk%252CPT0%253D%252CU2FsZXMgUGxheQ%253D%253D%252Flff6b1b42b-c7bd-4874-86b0-033014ba4cef/grid/"
			}
			this.plays.push(cp4dPlay);
			console.log("Does contain")
			break;

			}
		}
		for(var i = 0; i < this.account.questions.length; i++)
		{
			if(this.account.questions[i].every( e => this.cloudPakForApplications[0].includes(e))){
				var cp4aPlay = { 
				explanation: "Because you said your customer is building cloud native applications please see the following sales plays: CloudPak for Applications",
				link: "https://ibm.seismic.com/X5/DocCenter.aspx?ContentId=7bde5d9f-5892-4361-a6ec-e439f72957ea#/doccenter/6978143f-3408-4831-8558-9527b1279d8a/doc/%252Fdd08cb9fe2-d37b-4290-a0d3-9c6edb904029%252Flffaa26885-494c-45d2-9181-01d1245db7f0/grid/"		
			}
			this.plays.push(cp4aPlay);
			break;

			}
		} */

		
		if(this.account.questions.some(v => {console.log(v); console.log(this.cloudPakForData.includes(v))}))
		{
			var cp4dPlay = { 
				explanation: "Because you said your customer is using Cognos analytics and does not know what data is available please see the following sales plays",
				link: "https://ibm.seismic.com/X5/DocCenter.aspx?ContentId=4ba45436-b157-47a5-ab91-4659a0c7438f#/doccenter/6978143f-3408-4831-8558-9527b1279d8a/doc/%252Fdd2194899e-2651-4d05-a864-ef1fd55170f9%252FdfOTRiYmU4NTQtNWY4NC03Y2QyLWZjYWUtOGIxYmFmZjkyZThk%252CPT0%253D%252CU2FsZXMgUGxheQ%253D%253D%252Flff6b1b42b-c7bd-4874-86b0-033014ba4cef/grid/"
			}
			this.plays.push(cp4dPlay);


		}
		if(this.account.questions.some(v => this.cloudPakForApplications.includes(v)))
		{
			var cp4aPlay = { 
				explanation: "Because you said your customer is building cloud native applications please see the following sales plays: CloudPak for Applications",
				link: "https://ibm.seismic.com/X5/DocCenter.aspx?ContentId=7bde5d9f-5892-4361-a6ec-e439f72957ea#/doccenter/6978143f-3408-4831-8558-9527b1279d8a/doc/%252Fdd08cb9fe2-d37b-4290-a0d3-9c6edb904029%252Flffaa26885-494c-45d2-9181-01d1245db7f0/grid/"		
			}
			this.plays.push(cp4aPlay);
		} 
	      }
	});


  /* */

}

/*ionViewWillEnter()
{
	if(this.account.vmware){
		var vmPlay = { 
			explanation: "Because you said your customer is using VMWare Please see the following Sales Plays:",
			link: "https://ibm.seismic.com/X5/DocCenter.aspx?ContentId=4ba45436-b157-47a5-ab91-4659a0c7438f#/doccenter/6978143f-3408-4831-8558-9527b1279d8a/doc/%252Fdd86dcc126-ab33-495f-8000-fddd47641ea0%252Fdde42aea40-e441-4590-bf19-9547502c139b%252Fdfd7040a75-9ebb-4509-9de9-0976d354dc8e%252Fdfd91fb685-d3de-4a0c-b994-362b08b520c9%252Fdf98afe617-f223-4563-a0e2-1f873317b6ad%252Flf86493785-a540-4297-99fe-35b1cf1c5788//?mode=view&searchId=39db74b7-29df-47b7-a486-ff8b6e65d2a4"
		}
		this.plays.push(vmPlay);
		}

		for(var i = 0; i < this.account.questions.length; i++)
		{
			if(this.account.questions[i].every( e => this.cloudPakForData[0].includes(e))){
				var cp4dPlay = { 
				explanation: "Because you said your customer is using Cognos analytics and does not know what data is available please see the following sales plays",
				link: "https://ibm.seismic.com/X5/DocCenter.aspx?ContentId=4ba45436-b157-47a5-ab91-4659a0c7438f#/doccenter/6978143f-3408-4831-8558-9527b1279d8a/doc/%252Fdd2194899e-2651-4d05-a864-ef1fd55170f9%252FdfOTRiYmU4NTQtNWY4NC03Y2QyLWZjYWUtOGIxYmFmZjkyZThk%252CPT0%253D%252CU2FsZXMgUGxheQ%253D%253D%252Flff6b1b42b-c7bd-4874-86b0-033014ba4cef/grid/"
			}
			this.plays.push(cp4dPlay);
			console.log("Does contain")
			break;

			}
		}
		for(var i = 0; i < this.account.questions.length; i++)
		{
			if(this.account.questions[i].every( e => this.cloudPakForApplications[0].includes(e))){
				var cp4aPlay = { 
				explanation: "Because you said your customer is building cloud native applications please see the following sales plays: CloudPak for Applications",
				link: "https://ibm.seismic.com/X5/DocCenter.aspx?ContentId=7bde5d9f-5892-4361-a6ec-e439f72957ea#/doccenter/6978143f-3408-4831-8558-9527b1279d8a/doc/%252Fdd08cb9fe2-d37b-4290-a0d3-9c6edb904029%252Flffaa26885-494c-45d2-9181-01d1245db7f0/grid/"		
			}
			this.plays.push(cp4aPlay);
			break;

			}
		}
} */
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

  /* Because you said your customer is using VMWare Please see the following Sales Plays:
VMWare on IBM Cloud
 
Because you said your customer is using Cognos analytics and does not know what data is available please see the following sales plays:
CloudPak for Data
 
Because you said your customer is building cloud native applications please see the following sales plays:
CloudPak for Applications */


}
