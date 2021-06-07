import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { T3010SecF } from 'src/app/dtos/t3010SecF';
import { CsServiceService } from 'src/app/services/cs-service.service';

@Component({
  selector: 'app-schedule4-table2',
  templateUrl: './schedule4-table2.component.html',
  styleUrls: ['./schedule4-table2.component.css']
})
export class Schedule4Table2Component implements OnInit {

  constructor(private schedule4table2FormBuilder:FormBuilder,
    public dialogRef: MatDialogRef<Schedule4Table2Component>,
    public csService:CsServiceService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    schedule4Table2Form: FormGroup
  ngOnInit(): void {
    this.schedule4Table2Form = this.schedule4table2FormBuilder.group(
      {
        schedule4_donor_name_1: new FormControl(),
        schedule4_donor_type_1: new FormControl(),
        schedule4_donor_value_1: new FormControl(),
        schedule4_donor_name_2: new FormControl(),
        schedule4_donor_type_2: new FormControl(),
        schedule4_donor_value_2: new FormControl(),
        schedule4_donor_name_3: new FormControl(),
        schedule4_donor_type_3: new FormControl(),
        schedule4_donor_value_3: new FormControl()
      }
    )
  }

  saveSchedule4Table2(){
    //let secFData = new T3010SecF()
    let secFData = this.csService.getT3010SecF()
    secFData.schedule4_donor_name_1 = this.schedule4Table2Form.getRawValue().schedule4_donor_name_1
      secFData.schedule4_donor_type_1 = this.schedule4Table2Form.getRawValue().schedule4_donor_type_1
      secFData.schedule4_donor_value_1 = this.schedule4Table2Form.getRawValue().schedule4_donor_value_1

      secFData.schedule4_donor_name_2 = this.schedule4Table2Form.getRawValue().schedule4_donor_name_2
      secFData.schedule4_donor_type_2 = this.schedule4Table2Form.getRawValue().schedule4_donor_type_2
      secFData.schedule4_donor_value_2 = this.schedule4Table2Form.getRawValue().schedule4_donor_value_2

      secFData.schedule4_donor_name_3 = this.schedule4Table2Form.getRawValue().schedule4_donor_name_3
      secFData.schedule4_donor_type_3 = this.schedule4Table2Form.getRawValue().schedule4_donor_type_3
      secFData.schedule4_donor_value_3 = this.schedule4Table2Form.getRawValue().schedule4_donor_value_3
      this.csService.setT3010SecF(secFData)
        this.dialogRef.close();
  }

}
