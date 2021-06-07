import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { T3010SecF } from 'src/app/dtos/t3010SecF';
import { CsServiceService } from 'src/app/services/cs-service.service';

@Component({
  selector: 'app-schedule4-table1',
  templateUrl: './schedule4-table1.component.html',
  styleUrls: ['./schedule4-table1.component.css']
})
export class Schedule4Table1Component implements OnInit {

  constructor(private schedule4table1FormBuilder:FormBuilder,
    public dialogRef: MatDialogRef<Schedule4Table1Component>,
    public csService:CsServiceService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }
    schedule4Table1Form: FormGroup
  ngOnInit(): void {
    this.schedule4Table1Form = this.schedule4table1FormBuilder.group(
      {
        schedule4_name_1: new FormControl(),
        schedule4_atArms_1: new FormControl(),
        schedule4_name_2: new FormControl(),
        schedule4_atArms_2: new FormControl()
      }
    )
  }

  saveSchedule4Table1(){
    //let secFData = new T3010SecF();
      let secFData = this.csService.getT3010SecF()
    secFData.schedule4_name_1 = this.schedule4Table1Form.getRawValue().schedule4_name_1
        secFData.schedule4_atArms_1 = this.schedule4Table1Form.getRawValue().schedule4_atArms_1
        secFData.schedule4_name_2 = this.schedule4Table1Form.getRawValue().schedule4_name_2
        secFData.schedule4_atArms_2 = this.schedule4Table1Form.getRawValue().schedule4_atArms_2

        this.csService.setT3010SecF(secFData)
        this.dialogRef.close();
  }

}
