import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  message:string=''
  amount:string=''
  showFor4530:boolean = false
  showForSchedule3:boolean = true
  ngOnInit(): void {
    this.showForSchedule3=true
    console.log("data received : ")
    console.log(this.data)
    this.message = this.data['message']
    this.amount = this.data['amount']
    if(Number(this.amount) == -1){
      this.showFor4530 = true
    }
    if(Number(this.amount) == -11){
      this.showForSchedule3 = false
    }
  }

  cancel(): void {
    console.log("Action cancelled by the user")
    this.dialogRef.close({event:'cancel',data:"0"});
  }

  proceedAsIs(){
    console.log("Proceeding with the entered values")
    this.dialogRef.close({event:'ok',data:"0"});
  }

}
