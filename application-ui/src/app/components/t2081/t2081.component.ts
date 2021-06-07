import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CsServiceService } from 'src/app/services/cs-service.service';
import { UserInfoPopupComponent } from '../user-info-popup/user-info-popup.component';

@Component({
  selector: 'app-t2081',
  templateUrl: './t2081.component.html',
  styleUrls: ['./t2081.component.css']
})
export class T2081Component implements OnInit {

  constructor(private router:Router,
    private csService:CsServiceService,
    private dialog:MatDialog,
    private formT20821Builder:FormBuilder) { }

  progressOfFrorm:boolean=true
  showTabs:boolean=true
  showLogout:boolean=true

  t208110ecolor='Warn'
  t208110evalue = 0;
  t208110ebufferValue = 0;
  t208110eStatus:string='Not Complete'
  t208110eCompletion:number=0
  mode='buffer'

  rc23218ecolor: string
  rc23218evalue: number
  rc23218eStatus: string

  t123520ecolor: string
  t123520evalue: number
  t123520eStatus: string

  t123619ecolor:string
  t123619evalue:number
  t123619eStatus:string

  t3010color:string
  t3010Status:string
  t3010value:number

  showSpinner:boolean = false
  currentDate:Date
  userName:string
  charityName:string

  isDownloadDisabled:boolean = true

  formT2081:FormGroup
  ngOnInit(): void {
    this.currentDate = new Date()
    this.userName = this.csService.userName
    this.charityName = this.csService.charityName
    this.createFormT2180()
    //this.csService.getFormT2081()
    this.loadT1235Progress()
    this.loadT3010Progress()
    this.loadRC232Progress()
    this.loadT1236Progress()
    this.loadT2081Progress()
  }

  loadT3010Progress() {
    this.t3010value = this.csService.getT3010Progress().value
    this.t3010Status = this.csService.getT3010Progress().status
    this.t3010color = this.csService.getT3010Progress().color
  }
  loadRC232Progress() {
    this.rc23218evalue = this.csService.getRC232Progress().value
    this.rc23218eStatus = this.csService.getRC232Progress().status
    this.rc23218ecolor = this.csService.getRC232Progress().color
  }
  loadT1235Progress() {
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

  createFormT2180(){
    this.formT2081 =  this.formT20821Builder.group(
      {
        t2081FoundName:new FormControl(),
        t2081prefix:new FormControl(),
        t2081suffix:new FormControl(),
        t2081CorpName:new FormControl(),
        t2081SharesClass:new FormControl(),
        t2081NoOfOutShares:new FormControl(),
        t2081FareMktValue:new FormControl(),
        t2081IsClassListed:new FormControl(),
        t2081905:new FormControl(),
        t2081920:new FormControl(),
        t2081910:new FormControl(),
        t2081915:new FormControl(),
        t2081925:new FormControl(),
        t2081940:new FormControl(),
        t2081930:new FormControl(),
        t2081935:new FormControl(),
        t2081945:new FormControl(),
        t2081950:new FormControl(),
        t2081955:new FormControl(),
        d1t2081945:new FormControl(),
        d1t2081941:new FormControl(),
        d1t2081946:new FormControl(),
        d1t2081947:new FormControl(),
        d1t2081948:new FormControl(),
        d1t2081949:new FormControl(),
        d1t2081950:new FormControl(),
        d1t2081955:new FormControl(),
        t2081960:new FormControl(),
        t2081965:new FormControl(),
        t2081970:new FormControl(),
        t2081975:new FormControl(),
        t2081FiscalPeriod1:new FormControl(),
        t2081FiscalPeriod2:new FormControl(),
        t2081FiscalPeriod3:new FormControl(),
        t2081FiscalPeriod4:new FormControl(),
        t2081FiscalPeriod5:new FormControl(),
        t2081FiscalPeriod6:new FormControl(),
        t2081Step1_1:new FormControl(),
        t2081Step1_2:new FormControl(),
        t2081Step1_3:new FormControl(),
        t2081Step1_4:new FormControl(),
        t2081Step1_5:new FormControl(),
        t2081Step1_6:new FormControl(),
        t2081Step2_1:new FormControl(),
        t2081Step3_6:new FormControl(),
        t2081Step4_3:new FormControl(),
        t2081Step5_2:new FormControl(),
        t2081Step6_1:new FormControl(),
        t2081Step6_2:new FormControl(),
        t2081Step6_3:new FormControl(),
        t2081Step6_4:new FormControl(),
        t2081Step6_5:new FormControl(),
        t2081Step6_6:new FormControl(),
        t2081Divestment_1:new FormControl(),
        t2081Divestment_2:new FormControl(),
        t2081Divestment_3:new FormControl(),
        t2081Divestment_4:new FormControl(),
        t2081Divestment_5:new FormControl(),
        t2081Divestment_6:new FormControl(),
        MTT:new FormControl(),
        SecAMTT_1_1:new FormControl(),
        SecAMTT_1_2:new FormControl(),
        SecAMTT_1_3:new FormControl(),
        SecAMTT_2_1:new FormControl(),
        SecAMTT_2_2:new FormControl(),
        SecAMTT_2_3:new FormControl(),
        SecAMTT_3_1:new FormControl(),
        SecAMTT_3_2:new FormControl(),
        SecAMTT_3_3:new FormControl(),
        SecAMTT_4_1:new FormControl(),
        SecAMTT_4_2:new FormControl(),
        SecAMTT_4_3:new FormControl(),
        SecAMTT_5_1:new FormControl(),
        SecAMTT_5_2:new FormControl(),
        SecAMTT_5_3:new FormControl(),
        SecAMTT_6_1:new FormControl(),
        SecAMTT_6_2:new FormControl(),
        SecAMTT_6_3:new FormControl(),
        SecAMTT_7_1:new FormControl(),
        SecAMTT_7_2:new FormControl(),
        SecAMTT_7_3:new FormControl(),
        SecBMTT_1_1:new FormControl(),
        SecBMTT_1_2:new FormControl(),
        SecBMTT_1_3:new FormControl(),
        SecBMTT_1_4:new FormControl(),
        SecBMTT_2_1:new FormControl(),
        SecBMTT_2_2:new FormControl(),
        SecBMTT_2_3:new FormControl(),
        SecBMTT_2_4:new FormControl(),
        SecBMTT_3_1:new FormControl(),
        SecBMTT_3_2:new FormControl(),
        SecBMTT_3_3:new FormControl(),
        SecBMTT_3_4:new FormControl(),
        SecBMTT_4_1:new FormControl(),
        SecBMTT_4_2:new FormControl(),
        SecBMTT_4_3:new FormControl(),
        SecBMTT_4_4:new FormControl(),
        SecBMTT_5_1:new FormControl(),
        SecBMTT_5_2:new FormControl(),
        SecBMTT_5_3:new FormControl(),
        SecBMTT_5_4:new FormControl()
      }
    )
  }

  submitFormT2081(){
    this.showSpinner = true
    console.log(this.formT2081.getRawValue())
    this.showSpinner = false
  }
  changeTabTorc232(){
    this.router.navigateByUrl("rc232").then( e => {
      if(e){
        console.log("Navigation Successfull to 232");
      }else{
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot3010(){
    this.router.navigateByUrl("t3010").then( e => {
      if(e){
        console.log("Navigation Successfull to t3010");
      }else{
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot1236(){
    this.router.navigateByUrl("t1236").then( e => {
      if(e){
        console.log("Navigation Successfull to 1236");
      }else{
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot2081(){
    this.router.navigateByUrl("t2081").then( e => {
      if(e){
        console.log("Navigation Successfull to 2081");
      }else{
        console.log("Navigation Failed !!");
      }
    });
  }

  changeTabTot1235(){
    this.router.navigateByUrl("t1235").then( e => {
      if(e){
        console.log("Navigation Successfull to 1235");
      }else{
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

  logout() {
    this.router.navigateByUrl("").then(e => {
      if (e) {
        console.log("Reload Successfull");
      } else {
        console.log("Reload Failed !!");
      }
    });
  }
  resp: Observable<any>
  downloadForm(formType:string,language:string) {
    console.log("formtypeand language : " + formType + "   --  "+ language)
    //this.resp = this.csService.downloadPdf()
    this.resp = this.csService.downloadCharityForm(formType,language)
    this.resp.subscribe(item => {
      console.log(item)
    })
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
