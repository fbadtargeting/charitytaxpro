import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { T3010SecF } from 'src/app/dtos/t3010SecF';
import { CsServiceService } from 'src/app/services/cs-service.service';

@Component({
  selector: 'app-schedule5',
  templateUrl: './schedule5.component.html',
  styleUrls: ['./schedule5.component.css']
})
export class Schedule5Component implements OnInit {

  constructor(private schedule5Formbuilder:FormBuilder,
    public dialogRef: MatDialogRef<Schedule5Component>,
    public csService:CsServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    schedule5Form: FormGroup
  ngOnInit(): void {
    this.schedule5Form = this.schedule5Formbuilder.group(
      {
        col_500: new FormControl(),
        col_525: new FormControl(),
        col_550: new FormControl(),
        col_505: new FormControl(),
        col_530: new FormControl(),
        col_555: new FormControl(),
        col_510: new FormControl(),
        col_535: new FormControl(),
        col_560: new FormControl(),
        col_515: new FormControl(),
        col_540: new FormControl(),
        col_565: new FormControl(),
        col_520: new FormControl(),
        col_545: new FormControl(),
        col_580: new FormControl()
      }
    )
  }

  saveSchedule5(){
    //let secFData = new T3010SecF();
    let secFData = this.csService.getT3010SecF()
    secFData.col_500 = this.schedule5Form.getRawValue().col_500
secFData.col_525 = this.schedule5Form.getRawValue().col_525
secFData.col_550 = this.schedule5Form.getRawValue().col_550
secFData.col_505 = this.schedule5Form.getRawValue().col_505
secFData.col_530 = this.schedule5Form.getRawValue().col_530
secFData.col_555 = this.schedule5Form.getRawValue().col_555
secFData.col_510 = this.schedule5Form.getRawValue().col_510
secFData.col_535 = this.schedule5Form.getRawValue().col_535
secFData.col_560 = this.schedule5Form.getRawValue().col_560
secFData.col_515 = this.schedule5Form.getRawValue().col_515
secFData.col_540 = this.schedule5Form.getRawValue().col_540
secFData.col_565 = this.schedule5Form.getRawValue().col_565
secFData.col_520 = this.schedule5Form.getRawValue().col_520
secFData.col_545 = this.schedule5Form.getRawValue().col_545
secFData.col_580 = this.schedule5Form.getRawValue().col_580
this.csService.setT3010SecF(secFData)
    this.dialogRef.close();
  }

}
