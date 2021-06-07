import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-fill4570',
  templateUrl: './fill4570.component.html',
  styleUrls: ['./fill4570.component.css']
})
export class Fill4570Component implements OnInit {

  message:string
  constructor(
    public dialogRef: MatDialogRef<Fill4570Component>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
    this.message = this.data['message']
  }

  calculate_4570(){
    let _4540_ = (<HTMLInputElement>document.getElementById("col_4540")).value
    let _4550_ = (<HTMLInputElement>document.getElementById("col_4550")).value
    let _4560_ = (<HTMLInputElement>document.getElementById("col_4560")).value;
    (<HTMLInputElement>document.getElementById("total_4570")).value = (Number(_4560_)+Number(_4550_)+Number(_4540_)).toString();
  }

  submit4570(){
    this.dialogRef.close({event:'ok',data:(<HTMLInputElement>document.getElementById("total_4570")).value});
  }

}
