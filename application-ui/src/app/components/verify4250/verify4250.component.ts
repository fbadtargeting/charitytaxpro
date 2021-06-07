import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verify4250',
  templateUrl: './verify4250.component.html',
  styleUrls: ['./verify4250.component.css']
})
export class Verify4250Component implements OnInit {

  constructor( public dialogRef: MatDialogRef<Verify4250Component>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    message:string=''
    showFill4250Elements:boolean = false
  ngOnInit(): void {
    this.message = this.data['message']
  }

  cancel(): void {
    console.log("Action cancelled by the user")
    this.dialogRef.close({event:'cancel',data:"0"});
  }

  ok(){
    console.log("Proceeding with the entered values")
    this.dialogRef.close({event:'ok',data:this.showFill4250Elements});
  }

  fill4250(event){
    console.log("##############")
    console.log(event)
    if(event.value == 1){
      this.showFill4250Elements = false
    }else{
      this.showFill4250Elements = true
    }
  }

}
