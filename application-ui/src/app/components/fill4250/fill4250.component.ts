import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-fill4250',
  templateUrl: './fill4250.component.html',
  styleUrls: ['./fill4250.component.css']
})
export class Fill4250Component implements OnInit {

  constructor(public dialogRef: MatDialogRef<Fill4250Component>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    message:string=''
    _4150_:number=0
    _4155_:number=0
    _4160_:number=0
    _4165_:number=0
    _4170_:number=0
  ngOnInit(): void {
    this.message = this.data['message']
    this._4150_ = this.data['4150']
    this._4155_ = this.data['4155']
    this._4160_ = this.data['4160']
    this._4165_ = this.data['4165']
    this._4170_ = this.data['4170']
  }

  ok(){
    let val_4150 = (<HTMLInputElement>document.getElementById("_4150")).value;
    let val_4155 = (<HTMLInputElement>document.getElementById("_4155")).value;
    let val_4160 = (<HTMLInputElement>document.getElementById("_4160")).value;
    let val_4165 = (<HTMLInputElement>document.getElementById("_4165")).value;
    let val_4170 = (<HTMLInputElement>document.getElementById("_4170")).value;

    this.dialogRef.close({event:'ok',data:{'4150':val_4150,'4155':val_4155,'4160':val_4160,'4165':val_4165,'4170':val_4170}})
  }

  cancel(): void {
    console.log("Action cancelled by the user")
    this.dialogRef.close({event:'cancel',data:{}});
  }
}
