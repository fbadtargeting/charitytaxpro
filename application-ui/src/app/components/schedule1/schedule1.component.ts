import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { T3010SecF } from 'src/app/dtos/t3010SecF';
import { CsServiceService } from 'src/app/services/cs-service.service';

@Component({
  selector: 'app-schedule1',
  templateUrl: './schedule1.component.html',
  styleUrls: ['./schedule1.component.css']
})
export class Schedule1Component implements OnInit {

  constructor(private schedule1Formbuilder:FormBuilder,
    public dialogRef: MatDialogRef<Schedule1Component>,
    public csService:CsServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    s1_4_showConfirmation: boolean = false
    schedule1Form: FormGroup
  ngOnInit(): void {
    this.schedule1Form = this.schedule1Formbuilder.group(
      {
        col_100: new FormControl(),
        col_110: new FormControl(),
        col_120: new FormControl(),
        col_130: new FormControl()
      }
    )
  }

  backToA3(event){
    if (event.value == 1) {
      this.s1_4_showConfirmation = true
    } else {
      this.s1_4_showConfirmation = false
    }
  }

  saveSchedule1(){
    let secFData = this.csService.getT3010SecF()
    secFData.	col_100	=	this.schedule1Form.getRawValue().	col_100
secFData.	col_110	=	this.schedule1Form.getRawValue().	col_110
secFData.	col_120	=	this.schedule1Form.getRawValue().	col_120
secFData.	col_130	=	this.schedule1Form.getRawValue().	col_130
secFData.user_id = this.csService.user_id
this.csService.setT3010SecF(secFData)
    this.dialogRef.close();
  }

}
