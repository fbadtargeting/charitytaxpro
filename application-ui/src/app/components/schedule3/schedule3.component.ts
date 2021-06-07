import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { T3010SecF } from 'src/app/dtos/t3010SecF';
import { CsServiceService } from 'src/app/services/cs-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-schedule3',
  templateUrl: './schedule3.component.html',
  styleUrls: ['./schedule3.component.css']
})
export class Schedule3Component implements OnInit {

  constructor(private schedule3Formbuilder:FormBuilder,
    public dialogRef: MatDialogRef<Schedule3Component>,
    public csService:CsServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    schedule3Form: FormGroup
  ngOnInit(): void {
    this.schedule3Form = this.schedule3Formbuilder.group(
      {
        col_300: new FormControl(),
        col_305: new FormControl(),
        col_310: new FormControl(),
        col_315: new FormControl(),
        col_320: new FormControl(),
        col_325: new FormControl(),
        col_330: new FormControl(),
        col_335: new FormControl(),
        col_340: new FormControl(),
        col_345: new FormControl(),
        col_370: new FormControl(),
        col_380: new FormControl(),
        col_390: new FormControl()
      }
    )
  }

  saveSchedule3(){
    //let secFData = new T3010SecF();
    let secFData = this.csService.getT3010SecF()
    let val_300 = this.schedule3Form.getRawValue().col_300
    let val_305 = this.schedule3Form.getRawValue().col_305
    let val_310 = this.schedule3Form.getRawValue().col_310
    let val_315 = this.schedule3Form.getRawValue().col_315
    let val_320 = this.schedule3Form.getRawValue().col_320
    let val_325 = this.schedule3Form.getRawValue().col_325
    let val_330 = this.schedule3Form.getRawValue().col_330
    let val_335 = this.schedule3Form.getRawValue().col_335
    let val_340 = this.schedule3Form.getRawValue().col_340
    let val_345 = this.schedule3Form.getRawValue().col_345
    let val_370 = this.schedule3Form.getRawValue().col_370
    let val_380 = this.schedule3Form.getRawValue().col_380
    let val_390 = this.schedule3Form.getRawValue().col_390

    let totalFieldsValue = Number(val_305) + Number(val_310) + Number(val_315) + Number(val_320) + Number(val_325) + Number(val_330) + Number(val_335) + Number(val_340) + Number(val_345)
    if(10 < totalFieldsValue){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': "Sum of the fields ( 305 through 345 ) should not exceed 10. Only a total of 10 are permitted",
          'amount': -11, 'amount2': 0
        }
      });
      dialogRef.afterClosed().subscribe(item => {
        
      })
    }else{
     if(totalFieldsValue > val_300){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': "Please verify the values entered for fields from 300 through 345. The sum of fields from 305 through 345 should not exceed the value of field 300",
          'amount': -11, 'amount2': 0
        }
      });
      dialogRef.afterClosed().subscribe(item => {
        
      })
     }else{
      console.log("After verifying fields from 300 through 345 ....")
    secFData.col_300 = val_300
      secFData.col_305 = val_305
      secFData.col_310 = val_310
      secFData.col_315 = val_315
      secFData.col_320 = val_320
      secFData.col_325 = val_325
      secFData.col_330 = val_330
      secFData.col_335 = val_335
      secFData.col_340 = val_340
      secFData.col_345 = val_345
      secFData.col_370 = val_370
      secFData.col_380 = val_380
      secFData.col_390 = val_390
      this.csService.setT3010SecF(secFData)
    this.dialogRef.close();
     }
    }

    
  }

  alertClass: boolean = false
  _4880_: number = 0
  calculate4880() {
    let _390_ = this.schedule3Form.getRawValue().col_390
    let _300_ = this.schedule3Form.getRawValue().col_300
    if (Number(_300_) == Number(_390_)) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': 'You have entered the same value for the total number of full-time employees and total compensation. One of these numbers need to be corrected.',
          'amount': _300_, 'amount2': _390_
        }
      });
      this.schedule3Form.controls.col_300.patchValue('');
      this.schedule3Form.controls.col_390.patchValue('');
      this.alertClass = true
    } else {
      this.alertClass = false
    }

    console.log("calculating 4880 " + this.alertClass);
    //this.t3010FormSectionF.controls.col_4880.patchValue(Number(_390_))
  }
  confirmValue() {
    let _390_ = this.schedule3Form.getRawValue().col_390
    let _300_ = this.schedule3Form.getRawValue().col_300
    if (Number(_390_)) {
      console.log("value of 390 " + Number(_390_))
      if (Number(_300_) == Number(_390_)) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '500px',
          data: {
            'message': 'You have entered the same value for the total number of full-time employees and total compensation. One of these numbers need to be corrected.',
            'amount': _300_,
            'amount2': _390_
          }
        });
        this.schedule3Form.controls.col_300.patchValue('');
      this.schedule3Form.controls.col_390.patchValue('');
        this.alertClass = true
      } else {
        this.alertClass = false
      }
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': 'Please confirm that the amount entered is for the total number of full-time employees and NOT the Total Compensation.',
          'amount': _300_
        }
      });
    }
  }

}
