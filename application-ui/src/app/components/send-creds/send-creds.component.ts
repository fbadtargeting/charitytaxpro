import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-send-creds',
  templateUrl: './send-creds.component.html',
  styleUrls: ['./send-creds.component.css']
})
export class SendCredsComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<SendCredsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    message:string
  ngOnInit(): void {
    this.message = this.data['message']
  }

  submitReq(){
    let bn = (<HTMLInputElement>document.getElementById("bnPrefix")).value+"RR"+ (<HTMLInputElement>document.getElementById("bnSuffix")).value
    this.dialogRef.close({event:'submit',data:{"bn":bn}});
  }

  cancel(){
    this.dialogRef.close({event:'cancel',data:{}});
  }

}
