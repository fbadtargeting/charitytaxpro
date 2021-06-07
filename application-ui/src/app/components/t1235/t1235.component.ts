import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GenericRespDTO } from 'src/app/dtos/GenericRespDTO';
import { T1235DTO } from 'src/app/dtos/t1235DTO';
import { CsServiceService } from 'src/app/services/cs-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserInfoPopupComponent } from '../user-info-popup/user-info-popup.component';

@Component({
  selector: 'app-t1235',
  templateUrl: './t1235.component.html',
  styleUrls: ['./t1235.component.css'],
  providers:[DatePipe]
})
export class T1235Component implements OnInit {

  constructor(private router: Router,
    private formT1235Builder: FormBuilder,
    private dialog:MatDialog,
    private datePipe:DatePipe,
    public csService: CsServiceService) { }

    t123520ecolor='Warn'
    t123520evalue = 0;
    t123520eStatus:string='Not Started'
    t123520ebufferValue = 0;
    t123520eCompletion:number=0
    mode = 'buffer';

  t3010color:string
  t3010Status:string
  t3010value:number

  rc23218ecolor:string
  rc23218evalue:number
  rc23218eStatus:string

  t123619ecolor:string
  t123619evalue:number
  t123619eStatus:string

  t208110ecolor:string
  t208110evalue:number
  t208110eStatus:string
    
  progressOfFrorm: boolean = true
  showTabs: boolean = true
  showLogout: boolean = true
  isDownloadDisabled:boolean = true
  showSpinner: boolean = false
  resp1235:Observable<GenericRespDTO>
  currentDate:Date
  userName:string
  charityName:string

  formT1235: FormGroup

  ngOnInit(): void {

    this.currentDate = new Date()
    this.userName = this.csService.userName
    this.charityName = this.csService.charityName

    this.createFormT1235()
    let t1235Resp = this.csService.getFormT1235()
    t1235Resp.subscribe(item=>{
      let t1235dto = item
      if(t1235dto){
        if(t1235dto.percentCompleted == 100){
          this.t123520evalue = t1235dto.percentCompleted
          this.t123520eStatus = 'Completed'
          this.t123520ecolor = 'primary'
        }else if(t1235dto.percentCompleted == 0){
          this.t123520evalue = t1235dto.percentCompleted
          this.t123520eStatus = 'Not Started'
          this.t123520ecolor = 'warn'
        }else{
          this.t123520evalue = t1235dto.percentCompleted
          this.t123520eStatus = 'In Progress'
          this.t123520ecolor = 'accent'
        }
        this.fillFormValues(t1235dto)
        //this.csService.setT1235Progress(this.t123520evalue,this.t123520ecolor,this.t123520eStatus)
      }
    })
    let t3010 = this.csService.getFormT3010()
    t3010.subscribe(item => {
      let tempValA=0
      let tempValC=0
      let tempValD=0
      let tempValE=0
      let tempValF=0
      let t3010secAdto = item.t3010SecA
      let t3010seCdto = item.t3010SecC
      let t3010secDdto = item.t3010SecD
      let t3010secEDto = item.t3010SecE
      let t3010secFdto = item.t3010SecF
      
        if(t3010secAdto){
          tempValA = t3010secAdto.percentCompleted
          console.log("tempVal A : " + tempValA)
        }
        if(t3010secFdto){
          tempValF = t3010secFdto.percentCompleted
          console.log("tempVal F : " + tempValF)
        }
        if(t3010seCdto){
          tempValC = t3010seCdto.percentCompleted
          console.log("tempVal C : " + tempValC)
        }
        if(t3010secDdto){
          tempValD = t3010secDdto.percentCompleted
          console.log("tempVal D : " + tempValD)
        }
        if(t3010secEDto){
          tempValE = t3010secEDto.percentCompleted
          console.log("tempValE : " + tempValE)
        }
        console.log("value of D : " + tempValD )
        this.t3010value = tempValA + tempValC + tempValD + tempValE + tempValF
        console.log("PROGRESS VALUE : " + this.t3010value)
        if(this.t3010value == 100 && this.csService.isSubmitted){
          this.t3010color = 'primary'
          this.t3010Status = "Completed"
        }else if(this.t3010value == 0){
          this.t3010color = 'warn'
          this.t3010Status = "Not Started"
        }else{
          this.t3010color = 'accent'
          this.t3010Status = "In Progress"
        }
      
    })
    let t1236 = this.csService.getFormT1236()
    t1236.subscribe(item=>{
      let t1236Dto = item
      if (t1236Dto) {
        if(t1236Dto.percentCompleted == 100){
          this.t123619ecolor='primary'
          this.t123619evalue = t1236Dto.percentCompleted;
          this.t123619eStatus='Completed'
        }
        else if(t1236Dto.percentCompleted == 0){
          this.t123619ecolor='warn'
          this.t123619evalue = t1236Dto.percentCompleted;
          this.t123619eStatus='Not Started'
        }
        else{
          this.t123619ecolor='accent'
          this.t123619evalue = t1236Dto.percentCompleted;
          this.t123619eStatus='In Progress'
        }
      }
    })
    this.isDownloadDisabled = !(this.csService.isSubmitted)
    this.loadT3010Progress()
    this.loadRC232Progress()
    this.loadT1236Progress()
    this.loadT2081Progress()
  }

  loadT3010Progress(){
    this.t3010value = this.csService.getT3010Progress().value
    this.t3010Status = this.csService.getT3010Progress().status
    this.t3010color = this.csService.getT3010Progress().color
  }
  loadRC232Progress(){
    this.rc23218evalue = this.csService.getRC232Progress().value
    this.rc23218eStatus = this.csService.getRC232Progress().status
    this.rc23218ecolor = this.csService.getRC232Progress().color
  }
  loadT1235Progress(){
    this.t123520evalue = this.csService.getT1235Progress().value
    this.t123520eStatus = this.csService.getT1235Progress().status
    this.t123520ecolor = this.csService.getT1235Progress().color
  }

  loadT1236Progress(){
    this.t123619ecolor = this.csService.getT1236Progress().color
    this.t123619evalue = this.csService.getT1236Progress().value
    this.t123619eStatus = this.csService.getT1236Progress().status
  }
  loadT2081Progress(){
    this.t208110ecolor = this.csService.getT2081Progress().color
    this.t208110evalue = this.csService.getT2081Progress().value
    this.t208110eStatus = this.csService.getT2081Progress().status
  }

  createFormT1235() {
    this.formT1235 = this.formT1235Builder.group(
      {
        t1235NumberOfDirectors: new FormControl(),
        t1235CharityName: new FormControl(),
        t1235Prefix: new FormControl(),
        t1235Suffix: new FormControl(),
        t1235ReturnOfFiscalPeriod: new FormControl(),

        t1235LastName_1: new FormControl(),
        t1235FirstName_1: new FormControl(),
        t1235Initials_1: new FormControl(),
        t1235sd1: new FormControl(),
        t1235ed1: new FormControl(),
        t1235Position_1: new FormControl(),
        t1235AtArms_1: new FormControl(),
        t1235Street_1: new FormControl(),
        t1235City_1: new FormControl(),
        t1235Prov_1: new FormControl(),
        t1235Code_1: new FormControl(),
        t1235Phone_1: new FormControl(),
        t1235dob1: new FormControl(),

        t1235LastName_2: new FormControl(),
        t1235FirstName_2: new FormControl(),
        t1235Initials_2: new FormControl(),
        t1235sd2: new FormControl(),
        t1235ed2: new FormControl(),
        t1235Position_2: new FormControl(),
        t1235AtArms_2: new FormControl(),
        t1235Street_2: new FormControl(),
        t1235City_2: new FormControl(),
        t1235Prov_2: new FormControl(),
        t1235Code_2: new FormControl(),
        t1235Phone_2: new FormControl(),
        t1235dob2: new FormControl(),

        t1235LastName_3: new FormControl(),
        t1235FirstName_3: new FormControl(),
        t1235Initials_3: new FormControl(),
        t1235sd3: new FormControl(),
        t1235ed3: new FormControl(),
        t1235Position_3: new FormControl(),
        t1235AtArms_3: new FormControl(),
        t1235Street_3: new FormControl(),
        t1235City_3: new FormControl(),
        t1235Prov_3: new FormControl(),
        t1235Code_3: new FormControl(),
        t1235Phone_3: new FormControl(),
        t1235dob3: new FormControl(),

        t1235LastName_4: new FormControl(),
        t1235FirstName_4: new FormControl(),
        t1235Initials_4: new FormControl(),
        t1235sd4: new FormControl(),
        t1235ed4: new FormControl(),
        t1235Position_4: new FormControl(),
        t1235AtArms_4: new FormControl(),
        t1235Street_4: new FormControl(),
        t1235City_4: new FormControl(),
        t1235Prov_4: new FormControl(),
        t1235Code_4: new FormControl(),
        t1235Phone_4: new FormControl(),
        t1235dob4: new FormControl(),

        t1235LastName_5: new FormControl(),
        t1235FirstName_5: new FormControl(),
        t1235Initials_5: new FormControl(),
        t1235sd5: new FormControl(),
        t1235ed5: new FormControl(),
        t1235Position_5: new FormControl(),
        t1235AtArms_5: new FormControl(),
        t1235Street_5: new FormControl(),
        t1235City_5: new FormControl(),
        t1235Prov_5: new FormControl(),
        t1235Code_5: new FormControl(),
        t1235Phone_5: new FormControl(),
        t1235dob5: new FormControl(),

        t1235LastName_6: new FormControl(),
        t1235FirstName_6: new FormControl(),
        t1235Initials_6: new FormControl(),
        t1235sd6: new FormControl(),
        t1235ed6: new FormControl(),
        t1235Position_6: new FormControl(),
        t1235AtArms_6: new FormControl(),
        t1235Street_6: new FormControl(),
        t1235City_6: new FormControl(),
        t1235Prov_6: new FormControl(),
        t1235Code_6: new FormControl(),
        t1235Phone_6: new FormControl(),
        t1235dob6: new FormControl(),

        t1235LastName_7: new FormControl(),
        t1235FirstName_7: new FormControl(),
        t1235Initials_7: new FormControl(),
        t1235sd7: new FormControl(),
        t1235ed7: new FormControl(),
        t1235Position_7: new FormControl(),
        t1235AtArms_7: new FormControl(),
        t1235Street_7: new FormControl(),
        t1235City_7: new FormControl(),
        t1235Prov_7: new FormControl(),
        t1235Code_7: new FormControl(),
        t1235Phone_7: new FormControl(),
        t1235dob7: new FormControl(),

        t1235LastName_8: new FormControl(),
        t1235FirstName_8: new FormControl(),
        t1235Initials_8: new FormControl(),
        t1235sd8: new FormControl(),
        t1235ed8: new FormControl(),
        t1235Position_8: new FormControl(),
        t1235AtArms_8: new FormControl(),
        t1235Street_8: new FormControl(),
        t1235City_8: new FormControl(),
        t1235Prov_8: new FormControl(),
        t1235Code_8: new FormControl(),
        t1235Phone_8: new FormControl(),
        t1235dob8: new FormControl(),

        t1235LastName_9: new FormControl(),
        t1235FirstName_9: new FormControl(),
        t1235Initials_9: new FormControl(),
        t1235sd9: new FormControl(),
        t1235ed9: new FormControl(),
        t1235Position_9: new FormControl(),
        t1235AtArms_9: new FormControl(),
        t1235Street_9: new FormControl(),
        t1235City_9: new FormControl(),
        t1235Prov_9: new FormControl(),
        t1235Code_9: new FormControl(),
        t1235Phone_9: new FormControl(),
        t1235dob9: new FormControl()
      }
    )
  }

  submitFormT1235() {
    let t1235Dto = new T1235DTO()
    this.showSpinner = true
    t1235Dto.t1235NumberOfDirectors = this.formT1235.getRawValue().t1235NumberOfDirectors
    t1235Dto.t1235CharityName = this.formT1235.getRawValue().t1235CharityName
    t1235Dto.t1235BnRegistration = this.formT1235.getRawValue().t1235Prefix + "RR" + this.formT1235.getRawValue().t1235Suffix
    t1235Dto.t1235ReturnOfFiscalPeriod = this.formT1235.getRawValue().t1235ReturnOfFiscalPeriod
    t1235Dto.t1235LastName_1 = this.formT1235.getRawValue().t1235LastName_1
    t1235Dto.t1235FirstName_1 = this.formT1235.getRawValue().t1235FirstName_1
    t1235Dto.t1235Initials_1 = this.formT1235.getRawValue().t1235Initials_1
    t1235Dto.t1235sd1 = this.formT1235.getRawValue().t1235sd1
    t1235Dto.t1235ed1 = this.formT1235.getRawValue().t1235ed1
    t1235Dto.t1235Position_1 = this.formT1235.getRawValue().t1235Position_1
    t1235Dto.t1235AtArms_1 = this.formT1235.getRawValue().t1235AtArms_1
    t1235Dto.t1235Street_1 = this.formT1235.getRawValue().t1235Street_1
    t1235Dto.t1235City_1 = this.formT1235.getRawValue().t1235City_1
    t1235Dto.t1235Prov_1 = this.formT1235.getRawValue().t1235Prov_1
    t1235Dto.t1235Code_1 = this.formT1235.getRawValue().t1235Code_1
    t1235Dto.t1235Phone_1 = this.formT1235.getRawValue().t1235Phone_1
    t1235Dto.t1235dob1 = this.formT1235.getRawValue().t1235dob1
    t1235Dto.t1235LastName_2 = this.formT1235.getRawValue().t1235LastName_2
    t1235Dto.t1235FirstName_2 = this.formT1235.getRawValue().t1235FirstName_2
    t1235Dto.t1235Initials_2 = this.formT1235.getRawValue().t1235Initials_2
    t1235Dto.t1235sd2 = this.formT1235.getRawValue().t1235sd2
    t1235Dto.t1235ed2 = this.formT1235.getRawValue().t1235ed2
    t1235Dto.t1235Position_2 = this.formT1235.getRawValue().t1235Position_2
    t1235Dto.t1235AtArms_2 = this.formT1235.getRawValue().t1235AtArms_2
    t1235Dto.t1235Street_2 = this.formT1235.getRawValue().t1235Street_2
    t1235Dto.t1235City_2 = this.formT1235.getRawValue().t1235City_2
    t1235Dto.t1235Prov_2 = this.formT1235.getRawValue().t1235Prov_2
    t1235Dto.t1235Code_2 = this.formT1235.getRawValue().t1235Code_2
    t1235Dto.t1235Phone_2 = this.formT1235.getRawValue().t1235Phone_2
    t1235Dto.t1235dob2 = this.formT1235.getRawValue().t1235dob2
    t1235Dto.t1235LastName_3 = this.formT1235.getRawValue().t1235LastName_3
    t1235Dto.t1235FirstName_3 = this.formT1235.getRawValue().t1235FirstName_3
    t1235Dto.t1235Initials_3 = this.formT1235.getRawValue().t1235Initials_3
    t1235Dto.t1235sd3 = this.formT1235.getRawValue().t1235sd3
    t1235Dto.t1235ed3 = this.formT1235.getRawValue().t1235ed3
    t1235Dto.t1235Position_3 = this.formT1235.getRawValue().t1235Position_3
    t1235Dto.t1235AtArms_3 = this.formT1235.getRawValue().t1235AtArms_3
    t1235Dto.t1235Street_3 = this.formT1235.getRawValue().t1235Street_3
    t1235Dto.t1235City_3 = this.formT1235.getRawValue().t1235City_3
    t1235Dto.t1235Prov_3 = this.formT1235.getRawValue().t1235Prov_3
    t1235Dto.t1235Code_3 = this.formT1235.getRawValue().t1235Code_3
    t1235Dto.t1235Phone_3 = this.formT1235.getRawValue().t1235Phone_3
    t1235Dto.t1235dob3 = this.formT1235.getRawValue().t1235dob3
    t1235Dto.t1235LastName_4 = this.formT1235.getRawValue().t1235LastName_4
    t1235Dto.t1235FirstName_4 = this.formT1235.getRawValue().t1235FirstName_4
    t1235Dto.t1235Initials_4 = this.formT1235.getRawValue().t1235Initials_4
    t1235Dto.t1235sd4 = this.formT1235.getRawValue().t1235sd4
    t1235Dto.t1235ed4 = this.formT1235.getRawValue().t1235ed4
    t1235Dto.t1235Position_4 = this.formT1235.getRawValue().t1235Position_4
    t1235Dto.t1235AtArms_4 = this.formT1235.getRawValue().t1235AtArms_4
    t1235Dto.t1235Street_4 = this.formT1235.getRawValue().t1235Street_4
    t1235Dto.t1235City_4 = this.formT1235.getRawValue().t1235City_4
    t1235Dto.t1235Prov_4 = this.formT1235.getRawValue().t1235Prov_4
    t1235Dto.t1235Code_4 = this.formT1235.getRawValue().t1235Code_4
    t1235Dto.t1235Phone_4 = this.formT1235.getRawValue().t1235Phone_4
    t1235Dto.t1235dob4 = this.formT1235.getRawValue().t1235dob4
    t1235Dto.t1235LastName_5 = this.formT1235.getRawValue().t1235LastName_5
    t1235Dto.t1235FirstName_5 = this.formT1235.getRawValue().t1235FirstName_5
    t1235Dto.t1235Initials_5 = this.formT1235.getRawValue().t1235Initials_5
    t1235Dto.t1235sd5 = this.formT1235.getRawValue().t1235sd5
    t1235Dto.t1235ed5 = this.formT1235.getRawValue().t1235ed5
    t1235Dto.t1235Position_5 = this.formT1235.getRawValue().t1235Position_5
    t1235Dto.t1235AtArms_5 = this.formT1235.getRawValue().t1235AtArms_5
    t1235Dto.t1235Street_5 = this.formT1235.getRawValue().t1235Street_5
    t1235Dto.t1235City_5 = this.formT1235.getRawValue().t1235City_5
    t1235Dto.t1235Prov_5 = this.formT1235.getRawValue().t1235Prov_5
    t1235Dto.t1235Code_5 = this.formT1235.getRawValue().t1235Code_5
    t1235Dto.t1235Phone_5 = this.formT1235.getRawValue().t1235Phone_5
    t1235Dto.t1235dob5 = this.formT1235.getRawValue().t1235dob5
    t1235Dto.t1235LastName_6 = this.formT1235.getRawValue().t1235LastName_6
    t1235Dto.t1235FirstName_6 = this.formT1235.getRawValue().t1235FirstName_6
    t1235Dto.t1235Initials_6 = this.formT1235.getRawValue().t1235Initials_6
    t1235Dto.t1235sd6 = this.formT1235.getRawValue().t1235sd6
    t1235Dto.t1235ed6 = this.formT1235.getRawValue().t1235ed6
    t1235Dto.t1235Position_6 = this.formT1235.getRawValue().t1235Position_6
    t1235Dto.t1235AtArms_6 = this.formT1235.getRawValue().t1235AtArms_6
    t1235Dto.t1235Street_6 = this.formT1235.getRawValue().t1235Street_6
    t1235Dto.t1235City_6 = this.formT1235.getRawValue().t1235City_6
    t1235Dto.t1235Prov_6 = this.formT1235.getRawValue().t1235Prov_6
    t1235Dto.t1235Code_6 = this.formT1235.getRawValue().t1235Code_6
    t1235Dto.t1235Phone_6 = this.formT1235.getRawValue().t1235Phone_6
    t1235Dto.t1235dob6 = this.formT1235.getRawValue().t1235dob6
    t1235Dto.t1235LastName_7 = this.formT1235.getRawValue().t1235LastName_7
    t1235Dto.t1235FirstName_7 = this.formT1235.getRawValue().t1235FirstName_7
    t1235Dto.t1235Initials_7 = this.formT1235.getRawValue().t1235Initials_7
    t1235Dto.t1235sd7 = this.formT1235.getRawValue().t1235sd7
    t1235Dto.t1235ed7 = this.formT1235.getRawValue().t1235ed7
    t1235Dto.t1235Position_7 = this.formT1235.getRawValue().t1235Position_7
    t1235Dto.t1235AtArms_7 = this.formT1235.getRawValue().t1235AtArms_7
    t1235Dto.t1235Street_7 = this.formT1235.getRawValue().t1235Street_7
    t1235Dto.t1235City_7 = this.formT1235.getRawValue().t1235City_7
    t1235Dto.t1235Prov_7 = this.formT1235.getRawValue().t1235Prov_7
    t1235Dto.t1235Code_7 = this.formT1235.getRawValue().t1235Code_7
    t1235Dto.t1235Phone_7 = this.formT1235.getRawValue().t1235Phone_7
    t1235Dto.t1235dob7 = this.formT1235.getRawValue().t1235dob7
    t1235Dto.t1235LastName_8 = this.formT1235.getRawValue().t1235LastName_8
    t1235Dto.t1235FirstName_8 = this.formT1235.getRawValue().t1235FirstName_8
    t1235Dto.t1235Initials_8 = this.formT1235.getRawValue().t1235Initials_8
    t1235Dto.t1235sd8 = this.formT1235.getRawValue().t1235sd8
    t1235Dto.t1235ed8 = this.formT1235.getRawValue().t1235ed8
    t1235Dto.t1235Position_8 = this.formT1235.getRawValue().t1235Position_8
    t1235Dto.t1235AtArms_8 = this.formT1235.getRawValue().t1235AtArms_8
    t1235Dto.t1235Street_8 = this.formT1235.getRawValue().t1235Street_8
    t1235Dto.t1235City_8 = this.formT1235.getRawValue().t1235City_8
    t1235Dto.t1235Prov_8 = this.formT1235.getRawValue().t1235Prov_8
    t1235Dto.t1235Code_8 = this.formT1235.getRawValue().t1235Code_8
    t1235Dto.t1235Phone_8 = this.formT1235.getRawValue().t1235Phone_8
    t1235Dto.t1235dob8 = this.formT1235.getRawValue().t1235dob8
    t1235Dto.t1235LastName_9 = this.formT1235.getRawValue().t1235LastName_9
    t1235Dto.t1235FirstName_9 = this.formT1235.getRawValue().t1235FirstName_9
    t1235Dto.t1235Initials_9 = this.formT1235.getRawValue().t1235Initials_9
    t1235Dto.t1235sd9 = this.formT1235.getRawValue().t1235sd9
    t1235Dto.t1235ed9 = this.formT1235.getRawValue().t1235ed9
    t1235Dto.t1235Position_9 = this.formT1235.getRawValue().t1235Position_9
    t1235Dto.t1235AtArms_9 = this.formT1235.getRawValue().t1235AtArms_9
    t1235Dto.t1235Street_9 = this.formT1235.getRawValue().t1235Street_9
    t1235Dto.t1235City_9 = this.formT1235.getRawValue().t1235City_9
    t1235Dto.t1235Prov_9 = this.formT1235.getRawValue().t1235Prov_9
    t1235Dto.t1235Code_9 = this.formT1235.getRawValue().t1235Code_9
    t1235Dto.t1235Phone_9 = this.formT1235.getRawValue().t1235Phone_9
    t1235Dto.t1235dob9 = this.formT1235.getRawValue().t1235dob9
    t1235Dto.user_id = this.csService.user_id
    //this.csService.setT1235(t1235Dto)
    this.resp1235 = this.csService.saveFormT1235(t1235Dto)
    this.resp1235.subscribe(item=>{
      this.showSpinner = false
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': item.message,
          'amount': 0, 'amount2': 0
        }
      });
    })
  }

  fillFormValues(t1235Dto: T1235DTO) {
    this.formT1235.controls.t1235NumberOfDirectors.patchValue(t1235Dto.t1235NumberOfDirectors)
    this.formT1235.controls.t1235CharityName.patchValue(t1235Dto.t1235CharityName)

    this.formT1235.controls.t1235Prefix.patchValue(t1235Dto.t1235BnRegistration.split('RR')[0])
    this.formT1235.controls.t1235Suffix.patchValue(t1235Dto.t1235BnRegistration.split('RR')[1])

    this.formT1235.controls.t1235ReturnOfFiscalPeriod.patchValue(t1235Dto.t1235ReturnOfFiscalPeriod)
    this.formT1235.controls.t1235LastName_1.patchValue(t1235Dto.t1235LastName_1)
    this.formT1235.controls.t1235FirstName_1.patchValue(t1235Dto.t1235FirstName_1)
    this.formT1235.controls.t1235Initials_1.patchValue(t1235Dto.t1235Initials_1)
    this.formT1235.controls.t1235sd1.patchValue(t1235Dto.t1235sd1)
    this.formT1235.controls.t1235ed1.patchValue(t1235Dto.t1235ed1)
    this.formT1235.controls.t1235Position_1.patchValue(t1235Dto.t1235Position_1)
    this.formT1235.controls.t1235AtArms_1.patchValue(t1235Dto.t1235AtArms_1)
    this.formT1235.controls.t1235Street_1.patchValue(t1235Dto.t1235Street_1)
    this.formT1235.controls.t1235City_1.patchValue(t1235Dto.t1235City_1)
    this.formT1235.controls.t1235Prov_1.patchValue(t1235Dto.t1235Prov_1)
    this.formT1235.controls.t1235Code_1.patchValue(t1235Dto.t1235Code_1)
    this.formT1235.controls.t1235Phone_1.patchValue(t1235Dto.t1235Phone_1)
    this.formT1235.controls.t1235dob1.patchValue(t1235Dto.t1235dob1)
    this.formT1235.controls.t1235LastName_2.patchValue(t1235Dto.t1235LastName_2)
    this.formT1235.controls.t1235FirstName_2.patchValue(t1235Dto.t1235FirstName_2)
    this.formT1235.controls.t1235Initials_2.patchValue(t1235Dto.t1235Initials_2)
    this.formT1235.controls.t1235sd2.patchValue(t1235Dto.t1235sd2)
    this.formT1235.controls.t1235ed2.patchValue(t1235Dto.t1235ed2)
    this.formT1235.controls.t1235Position_2.patchValue(t1235Dto.t1235Position_2)
    this.formT1235.controls.t1235AtArms_2.patchValue(t1235Dto.t1235AtArms_2)
    this.formT1235.controls.t1235Street_2.patchValue(t1235Dto.t1235Street_2)
    this.formT1235.controls.t1235City_2.patchValue(t1235Dto.t1235City_2)
    this.formT1235.controls.t1235Prov_2.patchValue(t1235Dto.t1235Prov_2)
    this.formT1235.controls.t1235Code_2.patchValue(t1235Dto.t1235Code_2)
    this.formT1235.controls.t1235Phone_2.patchValue(t1235Dto.t1235Phone_2)
    this.formT1235.controls.t1235dob2.patchValue(t1235Dto.t1235dob2)
    this.formT1235.controls.t1235LastName_3.patchValue(t1235Dto.t1235LastName_3)
    this.formT1235.controls.t1235FirstName_3.patchValue(t1235Dto.t1235FirstName_3)
    this.formT1235.controls.t1235Initials_3.patchValue(t1235Dto.t1235Initials_3)
    this.formT1235.controls.t1235sd3.patchValue(t1235Dto.t1235sd3)
    this.formT1235.controls.t1235ed3.patchValue(t1235Dto.t1235ed3)
    this.formT1235.controls.t1235Position_3.patchValue(t1235Dto.t1235Position_3)
    this.formT1235.controls.t1235AtArms_3.patchValue(t1235Dto.t1235AtArms_3)
    this.formT1235.controls.t1235Street_3.patchValue(t1235Dto.t1235Street_3)
    this.formT1235.controls.t1235City_3.patchValue(t1235Dto.t1235City_3)
    this.formT1235.controls.t1235Prov_3.patchValue(t1235Dto.t1235Prov_3)
    this.formT1235.controls.t1235Code_3.patchValue(t1235Dto.t1235Code_3)
    this.formT1235.controls.t1235Phone_3.patchValue(t1235Dto.t1235Phone_3)
    this.formT1235.controls.t1235dob3.patchValue(t1235Dto.t1235dob3)
    this.formT1235.controls.t1235LastName_4.patchValue(t1235Dto.t1235LastName_4)
    this.formT1235.controls.t1235FirstName_4.patchValue(t1235Dto.t1235FirstName_4)
    this.formT1235.controls.t1235Initials_4.patchValue(t1235Dto.t1235Initials_4)
    this.formT1235.controls.t1235sd4.patchValue(t1235Dto.t1235sd4)
    this.formT1235.controls.t1235ed4.patchValue(t1235Dto.t1235ed4)
    this.formT1235.controls.t1235Position_4.patchValue(t1235Dto.t1235Position_4)
    this.formT1235.controls.t1235AtArms_4.patchValue(t1235Dto.t1235AtArms_4)
    this.formT1235.controls.t1235Street_4.patchValue(t1235Dto.t1235Street_4)
    this.formT1235.controls.t1235City_4.patchValue(t1235Dto.t1235City_4)
    this.formT1235.controls.t1235Prov_4.patchValue(t1235Dto.t1235Prov_4)
    this.formT1235.controls.t1235Code_4.patchValue(t1235Dto.t1235Code_4)
    this.formT1235.controls.t1235Phone_4.patchValue(t1235Dto.t1235Phone_4)
    this.formT1235.controls.t1235dob4.patchValue(t1235Dto.t1235dob4)
    this.formT1235.controls.t1235LastName_5.patchValue(t1235Dto.t1235LastName_5)
    this.formT1235.controls.t1235FirstName_5.patchValue(t1235Dto.t1235FirstName_5)
    this.formT1235.controls.t1235Initials_5.patchValue(t1235Dto.t1235Initials_5)
    this.formT1235.controls.t1235sd5.patchValue(t1235Dto.t1235sd5)
    this.formT1235.controls.t1235ed5.patchValue(t1235Dto.t1235ed5)
    this.formT1235.controls.t1235Position_5.patchValue(t1235Dto.t1235Position_5)
    this.formT1235.controls.t1235AtArms_5.patchValue(t1235Dto.t1235AtArms_5)
    this.formT1235.controls.t1235Street_5.patchValue(t1235Dto.t1235Street_5)
    this.formT1235.controls.t1235City_5.patchValue(t1235Dto.t1235City_5)
    this.formT1235.controls.t1235Prov_5.patchValue(t1235Dto.t1235Prov_5)
    this.formT1235.controls.t1235Code_5.patchValue(t1235Dto.t1235Code_5)
    this.formT1235.controls.t1235Phone_5.patchValue(t1235Dto.t1235Phone_5)
    this.formT1235.controls.t1235dob5.patchValue(t1235Dto.t1235dob5)
    this.formT1235.controls.t1235LastName_6.patchValue(t1235Dto.t1235LastName_6)
    this.formT1235.controls.t1235FirstName_6.patchValue(t1235Dto.t1235FirstName_6)
    this.formT1235.controls.t1235Initials_6.patchValue(t1235Dto.t1235Initials_6)
    this.formT1235.controls.t1235sd6.patchValue(t1235Dto.t1235sd6)
    this.formT1235.controls.t1235ed6.patchValue(t1235Dto.t1235ed6)
    this.formT1235.controls.t1235Position_6.patchValue(t1235Dto.t1235Position_6)
    this.formT1235.controls.t1235AtArms_6.patchValue(t1235Dto.t1235AtArms_6)
    this.formT1235.controls.t1235Street_6.patchValue(t1235Dto.t1235Street_6)
    this.formT1235.controls.t1235City_6.patchValue(t1235Dto.t1235City_6)
    this.formT1235.controls.t1235Prov_6.patchValue(t1235Dto.t1235Prov_6)
    this.formT1235.controls.t1235Code_6.patchValue(t1235Dto.t1235Code_6)
    this.formT1235.controls.t1235Phone_6.patchValue(t1235Dto.t1235Phone_6)
    this.formT1235.controls.t1235dob6.patchValue(t1235Dto.t1235dob6)
    this.formT1235.controls.t1235LastName_7.patchValue(t1235Dto.t1235LastName_7)
    this.formT1235.controls.t1235FirstName_7.patchValue(t1235Dto.t1235FirstName_7)
    this.formT1235.controls.t1235Initials_7.patchValue(t1235Dto.t1235Initials_7)
    this.formT1235.controls.t1235sd7.patchValue(t1235Dto.t1235sd7)
    this.formT1235.controls.t1235ed7.patchValue(t1235Dto.t1235ed7)
    this.formT1235.controls.t1235Position_7.patchValue(t1235Dto.t1235Position_7)
    this.formT1235.controls.t1235AtArms_7.patchValue(t1235Dto.t1235AtArms_7)
    this.formT1235.controls.t1235Street_7.patchValue(t1235Dto.t1235Street_7)
    this.formT1235.controls.t1235City_7.patchValue(t1235Dto.t1235City_7)
    this.formT1235.controls.t1235Prov_7.patchValue(t1235Dto.t1235Prov_7)
    this.formT1235.controls.t1235Code_7.patchValue(t1235Dto.t1235Code_7)
    this.formT1235.controls.t1235Phone_7.patchValue(t1235Dto.t1235Phone_7)
    this.formT1235.controls.t1235dob7.patchValue(t1235Dto.t1235dob7)
    this.formT1235.controls.t1235LastName_8.patchValue(t1235Dto.t1235LastName_8)
    this.formT1235.controls.t1235FirstName_8.patchValue(t1235Dto.t1235FirstName_8)
    this.formT1235.controls.t1235Initials_8.patchValue(t1235Dto.t1235Initials_8)
    this.formT1235.controls.t1235sd8.patchValue(t1235Dto.t1235sd8)
    this.formT1235.controls.t1235ed8.patchValue(t1235Dto.t1235ed8)
    this.formT1235.controls.t1235Position_8.patchValue(t1235Dto.t1235Position_8)
    this.formT1235.controls.t1235AtArms_8.patchValue(t1235Dto.t1235AtArms_8)
    this.formT1235.controls.t1235Street_8.patchValue(t1235Dto.t1235Street_8)
    this.formT1235.controls.t1235City_8.patchValue(t1235Dto.t1235City_8)
    this.formT1235.controls.t1235Prov_8.patchValue(t1235Dto.t1235Prov_8)
    this.formT1235.controls.t1235Code_8.patchValue(t1235Dto.t1235Code_8)
    this.formT1235.controls.t1235Phone_8.patchValue(t1235Dto.t1235Phone_8)
    this.formT1235.controls.t1235dob8.patchValue(t1235Dto.t1235dob8)
    this.formT1235.controls.t1235LastName_9.patchValue(t1235Dto.t1235LastName_9)
    this.formT1235.controls.t1235FirstName_9.patchValue(t1235Dto.t1235FirstName_9)
    this.formT1235.controls.t1235Initials_9.patchValue(t1235Dto.t1235Initials_9)
    this.formT1235.controls.t1235sd9.patchValue(t1235Dto.t1235sd9)
    this.formT1235.controls.t1235ed9.patchValue(t1235Dto.t1235ed9)
    this.formT1235.controls.t1235Position_9.patchValue(t1235Dto.t1235Position_9)
    this.formT1235.controls.t1235AtArms_9.patchValue(t1235Dto.t1235AtArms_9)
    this.formT1235.controls.t1235Street_9.patchValue(t1235Dto.t1235Street_9)
    this.formT1235.controls.t1235City_9.patchValue(t1235Dto.t1235City_9)
    this.formT1235.controls.t1235Prov_9.patchValue(t1235Dto.t1235Prov_9)
    this.formT1235.controls.t1235Code_9.patchValue(t1235Dto.t1235Code_9)
    this.formT1235.controls.t1235Phone_9.patchValue(t1235Dto.t1235Phone_9)
    this.formT1235.controls.t1235dob9.patchValue(t1235Dto.t1235dob9)
  }

  changeTabTorc232() {
    this.router.navigateByUrl("rc232").then(e => {
      if (e) {
        console.log("Navigation Successfull to 232");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot3010() {
    this.router.navigateByUrl("t3010").then(e => {
      if (e) {
        console.log("Navigation Successfull to t3010");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot1236() {
    this.router.navigateByUrl("t1236").then(e => {
      if (e) {
        console.log("Navigation Successfull to 1236");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot2081() {
    this.router.navigateByUrl("t2081").then(e => {
      if (e) {
        console.log("Navigation Successfull to 2081");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot1235() {
    this.router.navigateByUrl("t1235").then(e => {
      if (e) {
        console.log("Navigation Successfull to 1235");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabToGuide(){
    this.router.navigateByUrl("guide").then(e => {
      if (e) {
        console.log("Navigation to guide Successfull");
      } else {
        console.log("Navigation to guide Failed !!");
      }
    });
  }

  resp:Observable<any>
  downloadForm(formType:string,language:string){
    console.log("formtypeand language : " + formType + "   --  "+ language)
    this.resp = this.csService.downloadCharityForm(formType,language)
    this.resp.subscribe(item => {
      console.log(item)
    })
  }

  logout() {
    this.router.navigateByUrl("").then(e => {
      if (e) {
        console.log("Reload Successfull");
      } else {
        console.log("Reload Failed !!");
      }
    });
  }

  userInfo(){
    console.log("show user info")
    const dialogRef = this.dialog.open(UserInfoPopupComponent, {
      width: '300px',
      data: {
        'userName':this.userName,
        'charityName':this.charityName,
        'loggedInDate':this.currentDate
      },
      /*data: {
        'userName':"vishal singwall",
        'charityName':"CHarity Test",
        'loggedInDate':new Date()
      },*/
      position:{
        top:'177px',
        left:'901px'
      }
    });
  }
}
