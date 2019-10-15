import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-entitled-deployed',
  templateUrl: './entitled-deployed.page.html',
  styleUrls: ['./entitled-deployed.page.scss'],
})
export class EntitledDeployedPage implements OnInit {


 dataScienceAndAI: any[] = ["Watson Studio",
  "Watson Machine Learning",
   "Watson OpenScale", 
   "Watson Applications and Services", 
   "SPSS", "Cognos Analytics", 
   "Planning Analytics", 
   "Decision Optimization"];

 hybridDataManagement = ["Hybrid Data Management Platform", 
 	"IBM Integrated Analytics System", 
 	"Cloud Pak for Data, Cloudera", 
 	"MongoDB", 
 	"IBM Cloud Private for Data", 
 	"Db2", 
 	"Db2 Warehouse", 
 	"Db2 Event Store", 
 	"Db2 BigSQL", 
 	"Informix", 
 	"Streams", 
 	"Truata"];

unifiedGovernanceAndIntegration = ["Information Server", 
	"Replication", 
	"Unified Governance Catalog", 
	"Watson Knowledge Catalog", 
	"Optim", 
	"Stored IQ", 
	"Master Data Management", 
	"InfoSphere Advanced Data Preparation", 
	"InfoSphere Virtual Data Pipeline"];

digitalBusinessAutomation = ["Business Automation Workflow", 
	"Datacap", 
	"FileNet Content Manager", 
	"Operational Decision Manager", 
	"Business Automation Content Analyzer on Cloud",
	"Robotic Process Automation", 
	"Blueworks Live", 
	"CMOD", 
	"Information Lifecycle Governance"];


integrationAndDevelopment = ["Cloud Pak for Integration", 
	"MQ", 
	"DataPower Gateway", 
	"API Connect", 
	"App Connect Enterprise", 
	"Aspera", 
	"Event Streams",
	"Blockchain Platform"];

managementAndPlatform = ["WebSphere Application Server (WAS)", 
	"IBM Cloud Private", 
	"IBM Multicloud Manager", 
	"Hybrid Cloud Management (PureApp, CAM, ICO)", 
	"App Insights (APM, ICAM, ICD, IWA)", 
	"Op Insights (NOI, CEM, RBA, AN, Operations Analytics, N/W Mgmt, NPI, TNPM, TADDM, ASM)", 
	"DevOps (Rational, UrbanCode)", 
	"Runtimes for Business"];

dataAndAIonIBMZ = ["Db2 for z/OS", 
	"Db2 AI for z/OS", 
	"Db2 Tools and Utilities", 
	"Db2 Analytics Accelerator", 
	"QMF for z/OS", 
	"Data Virtualization Manager", 
	"Watson Machine Learning for z/OS",
	"IBM Advanced Analytics for z/OS", 
	"MQ Advanced VUE for z/OS", 
	"ODM", 
	"IBM Cloud Private for Z", 
	"DevOps with UrbanCode and Rational"];

IBMCloudPlatform = ["IaaS", 
	"PaaS", 
	"Cloud Object Storage", 
	"VMware", 
	"Blockchain Platform", 
	"SAP Certified Infrastructure"];

IBMSecurity = ["Digital Trust", 
	"Threat Management", 
	"Strategy & Risk", 
	"Cross-Security - Cloud and Mobile Security" ];

IBMCognitiveApplications = ["Watson Media & Weather",
"Watson Internet of Things",
"Watson Customer Engagement",
"Watson Talent & Collaboration"];


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

  navigateToPage(page) {
  	let navigationExtras: NavigationExtras = {
            state: {
                acct: this.account
            }
        };
        this.router.navigate([page], navigationExtras);
  }

  checkedItem(e, item) {
  	if(e.currentTarget.checked) {
  		this.account.entitledDeployed.push(item);
  	}
  	else{
  		var index = this.account.entitledDeployed.indexOf(item);
  		if(index!= -1) {
  			this.account.entitledDeployed.splice(index, 1);
  		}
  	}

  	console.log(this.account.entitledDeployed);
  	this.storage.get("accounts").then((val) => { 

  		let obj = val.find(x => x.name === this.account.name)
  		let index = val.indexOf(obj);

  		console.log(index);
  		val[index] = this.account;
  		this.storage.set("accounts", val);
  	});
  }

  hasItem(item)
  {
  	let hasItem = this.account.entitledDeployed.indexOf(item) != -1;
  	return hasItem;
  }


//reading in products from CSV
  
}
