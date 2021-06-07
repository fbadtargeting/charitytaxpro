import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsServiceService } from './services/cs-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CS';

  constructor(public csService:CsServiceService,
    private router:Router) {
  }

  progressOfFrorm:boolean=true
  showTabs:boolean=true
  showLogout:boolean=true

  ngOnInit(){
  //this.showLogout=this.csService.showLogout  
  //this.showTabs=this.csService.showTabs
  //this.progressOfFrorm=this.csService.progressOfFrorm  
  }
}
