import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CsServiceService } from 'src/app/services/cs-service.service';

@Component({
  selector: 'app-user-info-popup',
  templateUrl: './user-info-popup.component.html',
  styleUrls: ['./user-info-popup.component.css']
})
export class UserInfoPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserInfoPopupComponent>,
    public csService:CsServiceService,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    currentDate:string
    userName:string
    charityName:string

  ngOnInit(): void {
    console.log("data string : ")
    console.log(this.data)
    this.currentDate = this.data['loggedInDate']
    this.userName = this.data['userName']
    this.charityName = this.data['charityName']
  }

  logout() {
    this.router.navigateByUrl("").then(e => {
      if (e) {
        this.dialogRef.close()
        console.log("Reload Successfull");
      } else {
        console.log("Reload Failed !!");
      }
    });
  }

}
