import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    message:string=''
  ngOnInit(): void {
    this.message = this.data['message']
    setTimeout(()=>{
      this.dialogRef.close();
    },3000)
  }

}
