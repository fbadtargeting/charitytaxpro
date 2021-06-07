import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CsServiceService } from 'src/app/services/cs-service.service';
import { UserInfoPopupComponent } from '../user-info-popup/user-info-popup.component';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {

  constructor(private router: Router,
    private dialog: MatDialog,
    public csService: CsServiceService) { }
  showTabs: boolean = true
  progressOfFrorm: boolean = true
  showLogout: boolean = true
  currentDate:Date
  userName:string
  charityName:string
  pdfSource = "assets/t4033-20e.pdf"
  showPdf:boolean = false
  ngOnInit(): void {
    this.currentDate = new Date()
    this.userName = this.csService.userName
    this.charityName = this.csService.charityName
    this.showPdf = true
  }

  changeTabTorc232() {
    this.router.navigateByUrl("rc232").then(e => {
      if (e) {
        console.log("Navigation Successfull to 232");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot3010() {
    this.router.navigateByUrl("t3010").then(e => {
      if (e) {
        console.log("Navigation Successfull to t3010");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot1236() {
    this.router.navigateByUrl("t1236").then(e => {
      if (e) {
        console.log("Navigation Successfull to 1236");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot2081() {
    this.router.navigateByUrl("t2081").then(e => {
      if (e) {
        console.log("Navigation Successfull to 2081");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot1235() {
    this.router.navigateByUrl("t1235").then(e => {
      if (e) {
        console.log("Navigation Successfull to 1235");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }
  changeTabToGuide(){
    this.router.navigateByUrl("guide").then(e => {
      if (e) {
        console.log("Navigation Successfull to guide");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  logout() {
    this.router.navigateByUrl("").then(e => {
      if (e) {
        console.log("Reload Successfull");
      } else {
        console.log("Reload Failed !!");
      }
    });
  }

  userInfo(){
    console.log("show user info")
    const dialogRef = this.dialog.open(UserInfoPopupComponent, {
      width: '300px',
      data: {
        'userName':this.userName,
        'charityName':this.charityName,
        'loggedInDate':this.currentDate
      },
      /*data: {
        'userName':"vishal singwall",
        'charityName':"CHarity Test",
        'loggedInDate':new Date()
      },*/
      position:{
        top:'177px',
        left:'901px'
      }
    });
  }

}
