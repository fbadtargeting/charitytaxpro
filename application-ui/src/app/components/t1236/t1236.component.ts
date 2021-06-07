import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GenericRespDTO } from 'src/app/dtos/GenericRespDTO';
import { T1236DTO } from 'src/app/dtos/t1236DTO';
import { CsServiceService } from 'src/app/services/cs-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserInfoPopupComponent } from '../user-info-popup/user-info-popup.component';

@Component({
  selector: 'app-t1236',
  templateUrl: './t1236.component.html',
  styleUrls: ['./t1236.component.css'],
  providers:[DatePipe]
})
export class T1236Component implements OnInit {

  constructor(private router: Router,
    private formT1236Builder: FormBuilder,
    private dialog:MatDialog,
    private datePipe:DatePipe,
    private csService: CsServiceService) { }

    t123619ecolor='warn'
    t123619evalue = 0;
    t123619ebufferValue = 0;
    t123619eStatus:string='Not Started'
    t123619eCompletion:number=0
    mode = 'buffer';

    t3010color:string
  t3010Status:string
  t3010value:number

  t123520ecolor:string
  t123520evalue:number
  t123520eStatus:string

  t208110ecolor:string
  t208110evalue:number
  t208110eStatus:string

  rc23218ecolor: string
  rc23218evalue: number
  rc23218eStatus: string
    
    isDownloadDisabled:boolean = true
  progressOfFrorm: boolean = true
  showTabs: boolean = true
  showLogout: boolean = true
  currentDate:Date
  userName:string
  charityName:string

  resp1236:Observable<GenericRespDTO>
  formT1236: FormGroup

  ngOnInit(): void {
    this.currentDate = new Date()
    this.userName = this.csService.userName
    this.charityName = this.csService.charityName
    this.createFormT1236()

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
        this.fillFormValues(t1236Dto)
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
      }
    })
    this.isDownloadDisabled = !(this.csService.isSubmitted)
    this.loadT1235Progress()
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

  showSpinner:boolean = false
  submitFormT1236() {
    let t1236Dto = new T1236DTO()
    this.showSpinner = true
    t1236Dto.t1236ChanrityName = this.formT1236.getRawValue().t1236ChanrityName
    t1236Dto.fiscalPeriodEnding_1236 = this.formT1236.getRawValue().fiscalPeriodEnding_1236
    t1236Dto.t1236NumberOfDonees = this.formT1236.getRawValue().t1236NumberOfDonees
    t1236Dto.t1236bn_registration = this.formT1236.getRawValue().t1236bn_prefix_1 + "RR" + this.formT1236.getRawValue().t1236bn_suffix_1
    t1236Dto.t1236OrgName_1 = this.formT1236.getRawValue().t1236OrgName_1
    t1236Dto.t1236AssoCharity_1 = this.formT1236.getRawValue().t1236AssoCharity_1
    t1236Dto.t1236bn_registration_1 = this.formT1236.getRawValue().t1236Prefix_1 + "RR" + this.formT1236.getRawValue().t1236Suffix_1
    t1236Dto.t1236CityProv_1 = this.formT1236.getRawValue().t1236CityProv_1
    t1236Dto.t1236Country_1 = this.formT1236.getRawValue().t1236Country_1
    t1236Dto.t1236NonCashGifts_1 = this.formT1236.getRawValue().t1236NonCashGifts_1
    t1236Dto.t1236TotalAmtGifts_1 = this.formT1236.getRawValue().t1236TotalAmtGifts_1
    t1236Dto.t1236OrgName_2 = this.formT1236.getRawValue().t1236OrgName_2
    t1236Dto.t1236AssoCharity_2 = this.formT1236.getRawValue().t1236AssoCharity_2
    t1236Dto.t1236bn_registration_2 = this.formT1236.getRawValue().t1236Prefix_2 + "RR" + this.formT1236.getRawValue().t1236Suffix_2
    t1236Dto.t1236CityProv_2 = this.formT1236.getRawValue().t1236CityProv_2
    t1236Dto.t1236Country_2 = this.formT1236.getRawValue().t1236Country_2
    t1236Dto.t1236NonCashGifts_2 = this.formT1236.getRawValue().t1236NonCashGifts_2
    t1236Dto.t1236TotalAmtGifts_2 = this.formT1236.getRawValue().t1236TotalAmtGifts_2
    t1236Dto.t1236OrgName_3 = this.formT1236.getRawValue().t1236OrgName_3
    t1236Dto.t1236AssoCharity_3 = this.formT1236.getRawValue().t1236AssoCharity_3
    t1236Dto.t1236bn_registration_3 = this.formT1236.getRawValue().t1236Prefix_3 + "RR" + this.formT1236.getRawValue().t1236Suffix_3
    t1236Dto.t1236CityProv_3 = this.formT1236.getRawValue().t1236CityProv_3
    t1236Dto.t1236Country_3 = this.formT1236.getRawValue().t1236Country_3
    t1236Dto.t1236NonCashGifts_3 = this.formT1236.getRawValue().t1236NonCashGifts_3
    t1236Dto.t1236TotalAmtGifts_3 = this.formT1236.getRawValue().t1236TotalAmtGifts_3
    t1236Dto.t1236OrgName_4 = this.formT1236.getRawValue().t1236OrgName_4
    t1236Dto.t1236AssoCharity_4 = this.formT1236.getRawValue().t1236AssoCharity_4
    t1236Dto.t1236bn_registration_4 = this.formT1236.getRawValue().t1236Prefix_4 + "RR" + this.formT1236.getRawValue().t1236Suffix_4
    t1236Dto.t1236CityProv_4 = this.formT1236.getRawValue().t1236CityProv_4
    t1236Dto.t1236Country_4 = this.formT1236.getRawValue().t1236Country_4
    t1236Dto.t1236NonCashGifts_4 = this.formT1236.getRawValue().t1236NonCashGifts_4
    t1236Dto.t1236TotalAmtGifts_4 = this.formT1236.getRawValue().t1236TotalAmtGifts_4
    t1236Dto.t1236OrgName_5 = this.formT1236.getRawValue().t1236OrgName_5
    t1236Dto.t1236AssoCharity_5 = this.formT1236.getRawValue().t1236AssoCharity_5
    t1236Dto.t1236bn_registration_5 = this.formT1236.getRawValue().t1236Prefix_5 + "RR" + this.formT1236.getRawValue().t1236Suffix_5
    t1236Dto.t1236CityProv_5 = this.formT1236.getRawValue().t1236CityProv_5
    t1236Dto.t1236Country_5 = this.formT1236.getRawValue().t1236Country_5
    t1236Dto.t1236NonCashGifts_5 = this.formT1236.getRawValue().t1236NonCashGifts_5
    t1236Dto.t1236TotalAmtGifts_5 = this.formT1236.getRawValue().t1236TotalAmtGifts_5
    t1236Dto.t1236OrgName_6 = this.formT1236.getRawValue().t1236OrgName_6
    t1236Dto.t1236AssoCharity_6 = this.formT1236.getRawValue().t1236AssoCharity_6
    t1236Dto.t1236bn_registration_6 = this.formT1236.getRawValue().t1236Prefix_6 + "RR" + this.formT1236.getRawValue().t1236Suffix_6
    t1236Dto.t1236CityProv_6 = this.formT1236.getRawValue().t1236CityProv_6
    t1236Dto.t1236Country_6 = this.formT1236.getRawValue().t1236Country_6
    t1236Dto.t1236NonCashGifts_6 = this.formT1236.getRawValue().t1236NonCashGifts_6
    t1236Dto.t1236TotalAmtGifts_6 = this.formT1236.getRawValue().t1236TotalAmtGifts_6
    t1236Dto.user_id = this.csService.user_id
    this.resp1236 = this.csService.saveFormT1236(t1236Dto)
    this.resp1236.subscribe(item=>{
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

  createFormT1236() {
    this.formT1236 = this.formT1236Builder.group(
      {
        t1236ChanrityName: new FormControl(),
        t1236bn_prefix_1: new FormControl(),
        t1236bn_suffix_1: new FormControl(),
        fiscalPeriodEnding_1236: new FormControl(),
        t1236NumberOfDonees: new FormControl(),

        t1236OrgName_1: new FormControl(),
        t1236AssoCharity_1: new FormControl(),
        t1236Prefix_1: new FormControl(),
        t1236Suffix_1: new FormControl(),
        t1236CityProv_1: new FormControl(),
        t1236Country_1: new FormControl(),
        t1236NonCashGifts_1: new FormControl(),
        t1236TotalAmtGifts_1: new FormControl(),

        t1236OrgName_2: new FormControl(),
        t1236AssoCharity_2: new FormControl(),
        t1236Prefix_2: new FormControl(),
        t1236Suffix_2: new FormControl(),
        t1236CityProv_2: new FormControl(),
        t1236Country_2: new FormControl(),
        t1236NonCashGifts_2: new FormControl(),
        t1236TotalAmtGifts_2: new FormControl(),

        t1236OrgName_3: new FormControl(),
        t1236AssoCharity_3: new FormControl(),
        t1236Prefix_3: new FormControl(),
        t1236Suffix_3: new FormControl(),
        t1236CityProv_3: new FormControl(),
        t1236Country_3: new FormControl(),
        t1236NonCashGifts_3: new FormControl(),
        t1236TotalAmtGifts_3: new FormControl(),

        t1236OrgName_4: new FormControl(),
        t1236AssoCharity_4: new FormControl(),
        t1236Prefix_4: new FormControl(),
        t1236Suffix_4: new FormControl(),
        t1236CityProv_4: new FormControl(),
        t1236Country_4: new FormControl(),
        t1236NonCashGifts_4: new FormControl(),
        t1236TotalAmtGifts_4: new FormControl(),

        t1236OrgName_5: new FormControl(),
        t1236AssoCharity_5: new FormControl(),
        t1236Prefix_5: new FormControl(),
        t1236Suffix_5: new FormControl(),
        t1236CityProv_5: new FormControl(),
        t1236Country_5: new FormControl(),
        t1236NonCashGifts_5: new FormControl(),
        t1236TotalAmtGifts_5: new FormControl(),

        t1236OrgName_6: new FormControl(),
        t1236AssoCharity_6: new FormControl(),
        t1236Prefix_6: new FormControl(),
        t1236Suffix_6: new FormControl(),
        t1236CityProv_6: new FormControl(),
        t1236Country_6: new FormControl(),
        t1236NonCashGifts_6: new FormControl(),
        t1236TotalAmtGifts_6: new FormControl()
      }
    )
  }

  fillFormValues(t1236Dto: T1236DTO) {
    this.formT1236.controls.t1236ChanrityName.patchValue(t1236Dto.t1236ChanrityName)
    this.formT1236.controls.fiscalPeriodEnding_1236.patchValue(t1236Dto.fiscalPeriodEnding_1236)
    this.formT1236.controls.t1236NumberOfDonees.patchValue(t1236Dto.t1236NumberOfDonees)

    this.formT1236.controls.t1236bn_prefix_1.patchValue(t1236Dto.t1236bn_registration.split('RR')[0])
    this.formT1236.controls.t1236bn_suffix_1.patchValue(t1236Dto.t1236bn_registration.split('RR')[1])
    
    this.formT1236.controls.t1236OrgName_1.patchValue(t1236Dto.t1236OrgName_1)
    this.formT1236.controls.t1236AssoCharity_1.patchValue(t1236Dto.t1236AssoCharity_1)

    this.formT1236.controls.t1236Prefix_1.patchValue(t1236Dto.t1236bn_registration_1.split('RR')[0])
    this.formT1236.controls.t1236Suffix_1.patchValue(t1236Dto.t1236bn_registration_1.split('RR')[1])

    this.formT1236.controls.t1236CityProv_1.patchValue(t1236Dto.t1236CityProv_1)
    this.formT1236.controls.t1236Country_1.patchValue(t1236Dto.t1236Country_1)
    this.formT1236.controls.t1236NonCashGifts_1.patchValue(t1236Dto.t1236NonCashGifts_1)
    this.formT1236.controls.t1236TotalAmtGifts_1.patchValue(t1236Dto.t1236TotalAmtGifts_1)
    this.formT1236.controls.t1236OrgName_2.patchValue(t1236Dto.t1236OrgName_2)
    this.formT1236.controls.t1236AssoCharity_2.patchValue(t1236Dto.t1236AssoCharity_2)

    this.formT1236.controls.t1236Prefix_2.patchValue(t1236Dto.t1236bn_registration_2.split('RR')[0])
    this.formT1236.controls.t1236Suffix_2.patchValue(t1236Dto.t1236bn_registration_2.split('RR')[1])

    this.formT1236.controls.t1236CityProv_2.patchValue(t1236Dto.t1236CityProv_2)
    this.formT1236.controls.t1236Country_2.patchValue(t1236Dto.t1236Country_2)
    this.formT1236.controls.t1236NonCashGifts_2.patchValue(t1236Dto.t1236NonCashGifts_2)
    this.formT1236.controls.t1236TotalAmtGifts_2.patchValue(t1236Dto.t1236TotalAmtGifts_2)
    this.formT1236.controls.t1236OrgName_3.patchValue(t1236Dto.t1236OrgName_3)
    this.formT1236.controls.t1236AssoCharity_3.patchValue(t1236Dto.t1236AssoCharity_3)

    this.formT1236.controls.t1236Prefix_3.patchValue(t1236Dto.t1236bn_registration_3.split('RR')[0])
    this.formT1236.controls.t1236Suffix_3.patchValue(t1236Dto.t1236bn_registration_3.split('RR')[1])

    this.formT1236.controls.t1236CityProv_3.patchValue(t1236Dto.t1236CityProv_3)
    this.formT1236.controls.t1236Country_3.patchValue(t1236Dto.t1236Country_3)
    this.formT1236.controls.t1236NonCashGifts_3.patchValue(t1236Dto.t1236NonCashGifts_3)
    this.formT1236.controls.t1236TotalAmtGifts_3.patchValue(t1236Dto.t1236TotalAmtGifts_3)
    this.formT1236.controls.t1236OrgName_4.patchValue(t1236Dto.t1236OrgName_4)
    this.formT1236.controls.t1236AssoCharity_4.patchValue(t1236Dto.t1236AssoCharity_4)

    this.formT1236.controls.t1236Prefix_4.patchValue(t1236Dto.t1236bn_registration_4.split('RR')[0])
    this.formT1236.controls.t1236Suffix_4.patchValue(t1236Dto.t1236bn_registration_4.split('RR')[1])

    this.formT1236.controls.t1236CityProv_4.patchValue(t1236Dto.t1236CityProv_4)
    this.formT1236.controls.t1236Country_4.patchValue(t1236Dto.t1236Country_4)
    this.formT1236.controls.t1236NonCashGifts_4.patchValue(t1236Dto.t1236NonCashGifts_4)
    this.formT1236.controls.t1236TotalAmtGifts_4.patchValue(t1236Dto.t1236TotalAmtGifts_4)
    this.formT1236.controls.t1236OrgName_5.patchValue(t1236Dto.t1236OrgName_5)
    this.formT1236.controls.t1236AssoCharity_5.patchValue(t1236Dto.t1236AssoCharity_5)

    this.formT1236.controls.t1236Prefix_5.patchValue(t1236Dto.t1236bn_registration_5.split('RR')[0])
    this.formT1236.controls.t1236Suffix_5.patchValue(t1236Dto.t1236bn_registration_5.split('RR')[1])

    this.formT1236.controls.t1236CityProv_5.patchValue(t1236Dto.t1236CityProv_5)
    this.formT1236.controls.t1236Country_5.patchValue(t1236Dto.t1236Country_5)
    this.formT1236.controls.t1236NonCashGifts_5.patchValue(t1236Dto.t1236NonCashGifts_5)
    this.formT1236.controls.t1236TotalAmtGifts_5.patchValue(t1236Dto.t1236TotalAmtGifts_5)
    this.formT1236.controls.t1236OrgName_6.patchValue(t1236Dto.t1236OrgName_6)
    this.formT1236.controls.t1236AssoCharity_6.patchValue(t1236Dto.t1236AssoCharity_6)

    this.formT1236.controls.t1236Prefix_6.patchValue(t1236Dto.t1236bn_registration_6.split('RR')[0])
    this.formT1236.controls.t1236Suffix_6.patchValue(t1236Dto.t1236bn_registration_6.split('RR')[1])

    this.formT1236.controls.t1236CityProv_6.patchValue(t1236Dto.t1236CityProv_6)
    this.formT1236.controls.t1236Country_6.patchValue(t1236Dto.t1236Country_6)
    this.formT1236.controls.t1236NonCashGifts_6.patchValue(t1236Dto.t1236NonCashGifts_6)
    this.formT1236.controls.t1236TotalAmtGifts_6.patchValue(t1236Dto.t1236TotalAmtGifts_6)
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
