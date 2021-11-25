import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { t3010DTO } from 'src/app/dtos/t3010DTO';
import { T3010SecA } from 'src/app/dtos/t3010SecA';
import { T3010SecC } from 'src/app/dtos/t3010SecC';
import { T3010SecD } from 'src/app/dtos/t3010SecD';
import { T3010SecE } from 'src/app/dtos/t3010SecE';
import { T3010SecF } from 'src/app/dtos/t3010SecF';
import { UserAcceptDto } from 'src/app/dtos/UserAcceptDto';
import { CsServiceService } from 'src/app/services/cs-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Fill4250Component } from '../fill4250/fill4250.component';
import { Fill4570Component } from '../fill4570/fill4570.component';
import { InfoComponent } from '../info/info.component';
import { Schedule1Component } from '../schedule1/schedule1.component';
import { Schedule2Component } from '../schedule2/schedule2.component';
import { Schedule3Component } from '../schedule3/schedule3.component';
import { Schedule4Table1Component } from '../schedule4-table1/schedule4-table1.component';
import { Schedule4Table2Component } from '../schedule4-table2/schedule4-table2.component';
import { Schedule5Component } from '../schedule5/schedule5.component';
import { T1236PopUpComponent } from '../t1236-pop-up/t1236-pop-up.component';
import { UserInfoPopupComponent } from '../user-info-popup/user-info-popup.component';
import { Verify4250Component } from '../verify4250/verify4250.component';

interface CountryCode {
  code: string;
  country: string;
}

@Component({
  selector: 'app-t3010',
  templateUrl: './t3010.component.html',
  styleUrls: ['./t3010.component.css'],
  providers: [DatePipe]
})
export class T3010Component implements OnInit {

  @ViewChild("col200") col200: ElementRef;
  @ViewChild("col300") col300: ElementRef;
  @ViewChild("col500") col500;
  @ViewChild("S4T1") S4T1: ElementRef;
  @ViewChild("S4T2") S4T2: ElementRef;
  @ViewChild("col4020") col4020;
  @ViewChild("col100") col100;
  @ViewChild("col1600") col1600;

  constructor(public csService: CsServiceService,
    public t3010FormSectionABuilder: FormBuilder,
    public t3010FormSectionCBuilder: FormBuilder,
    public t3010FormSectionDBuilder: FormBuilder,
    public t3010FormSectionEBuilder: FormBuilder,
    public t3010FormSectionFBuilder: FormBuilder,
    public schedule1TempFormBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private dialog: MatDialog) { }

  t3010color = 'warn';
  t3010value = 0;
  t3010bufferValue = 0;
  t3010Status: string = 'Not Started'
  t3010Completion: number = 0
  mode = 'buffer';

  rc23218ecolor: string
  rc23218evalue: number
  rc23218eStatus: string

  t123520ecolor: string
  t123520evalue: number
  t123520eStatus: string

  t123619ecolor: string
  t123619evalue: number
  t123619eStatus: string

  t208110ecolor: string
  t208110evalue: number
  t208110eStatus: string

  CountryCodes: CountryCode[]
  progressOfFrorm: boolean = true
  showTabs: boolean = true
  showLogout: boolean = true
  tempSchedule1: boolean = false
  fillSectionD: boolean = true
  showConfirmation: boolean = false
  c1_showConfirmation: boolean = false
  c3_showConfirmation: boolean = false
  c4_showConfirmation: boolean = false
  c9_showConfirmation: boolean = false
  c10_showConfirmation: boolean = false
  c11_showConfirmation: boolean = false
  s1_4_showConfirmation: boolean = false

  currentDate: Date
  userName: string
  charityName: string

  t3010FormSectionA: FormGroup
  t3010FormSectionC: FormGroup
  t3010FormSectionD: FormGroup
  t3010FormSectionE: FormGroup
  t3010FormSectionF: FormGroup
  schedule1TempForm: FormGroup

  isDisabled: boolean = true
  isDownloadDisabled: boolean = true

  t3010dto: t3010DTO

  ngOnInit(): void {
    this.message = ''
    this.t3010Complete = false
    this.t1235Complete = false
    this.t1236Complete = false
    this.rc232Complete = false
    this.t2081Complete = false
    this.financialStatements = false
    
    this.currentDate = new Date()
    this.userName = this.csService.userName
    this.charityName = this.csService.charityName
    this.isDownloadDisabled = true
    this.loadContryCodes()
    this.createFormt3010SectionA()
    this.createFormt3010SectionC()
    this.createFormt3010SectionD()
    this.createFormt3010SectionE()
    this.createFormt3010SectionF()
    this.createTempSchedule1Form()
    this.showConfirmation = false

    let t3010 = this.csService.getFormT3010()
    t3010.subscribe(item => {
      let tempValA = 0
      let tempValC = 0
      let tempValD = 0
      let tempValE = 0
      let tempValF = 0
      let t3010secAdto = item.t3010.t3010SecA
      let t3010seCdto = item.t3010.t3010SecC
      let t3010secDdto = item.t3010.t3010SecD
      let t3010secEDto = item.t3010.t3010SecE
      let t3010secFdto = item.t3010.t3010SecF

      if (t3010secAdto || t3010secFdto || t3010seCdto || t3010secDdto || t3010secEDto) {
        if (t3010secAdto) {
          tempValA = t3010secAdto.percentCompleted
          console.log("tempVal A : " + tempValA)
        }
        if (t3010secFdto) {
          tempValF = t3010secFdto.percentCompleted
          console.log("tempVal F : " + tempValF)
        }
        if (t3010seCdto) {
          tempValC = t3010seCdto.percentCompleted
          console.log("tempVal C : " + tempValC)
        }
        if (t3010secDdto) {
          tempValD = t3010secDdto.percentCompleted
          console.log("tempVal D : " + tempValD)
        }
        if (t3010secEDto) {
          tempValE = t3010secEDto.percentCompleted
          console.log("tempValE : " + tempValE)
        }
        console.log("value of D : " + tempValD)
        this.t3010value = tempValA + tempValC + tempValD + tempValE + tempValF
        console.log("PROGRESS VALUE : " + this.t3010value)
        if (this.t3010value == 100 && this.csService.isSubmitted) {
          this.t3010color = 'primary'
          this.t3010Status = "Completed"
        } else if (this.t3010value == 0) {
          this.t3010color = 'warn'
          this.t3010Status = "Not Started"
        } else {
          this.t3010color = 'accent'
          this.t3010Status = "In Progress"
        }
        console.log("INSIDE T3010 IF .... ")
        this.fillFormValues(t3010secAdto, t3010secFdto, t3010seCdto, t3010secDdto, t3010secEDto)
      }
      this.patchUserAcceptValues(item)
    })
    let t1235Resp = this.csService.getFormT1235()
    t1235Resp.subscribe(item => {
      let t1235dto = item.t1235
      if (t1235dto) {
        if (t1235dto.percentCompleted == 100) {
          this.t123520evalue = t1235dto.percentCompleted
          this.t123520eStatus = 'Completed'
          this.t123520ecolor = 'primary'
        } else if (t1235dto.percentCompleted == 0) {
          this.t123520evalue = t1235dto.percentCompleted
          this.t123520eStatus = 'Not Started'
          this.t123520ecolor = 'warn'
        } else {
          this.t123520evalue = t1235dto.percentCompleted
          this.t123520eStatus = 'In Progress'
          this.t123520ecolor = 'accent'
        }
      }
    })
    let t1236 = this.csService.getFormT1236()
    t1236.subscribe(item => {
      let t1236Dto = item.t1236
      if (t1236Dto) {
        if (t1236Dto.percentCompleted == 100) {
          this.t123619ecolor = 'primary'
          this.t123619evalue = t1236Dto.percentCompleted;
          this.t123619eStatus = 'Completed'
        }
        else if (t1236Dto.percentCompleted == 0) {
          this.t123619ecolor = 'warn'
          this.t123619evalue = t1236Dto.percentCompleted;
          this.t123619eStatus = 'Not Started'
        }
        else {
          this.t123619ecolor = 'accent'
          this.t123619evalue = t1236Dto.percentCompleted;
          this.t123619eStatus = 'In Progress'
        }
      }
    })
    this.isDownloadDisabled = !(this.csService.isSubmitted)
    console.log("the value of is submitted is : " + this.isDownloadDisabled)
    this.loadRC232Progress()
    this.loadT2081Progress()
  }

  patchUserAcceptValues(item:any){
    console.log("&*&&&&&&&&&")
    console.log(item)
    this.t3010Complete = item.userAccept.filledFormT3010
    this.t1235Complete = item.userAccept.filledFormT1235
    this.t1236Complete = item.userAccept.filledFormT1236
    this.rc232Complete = item.userAccept.filledFormRC232
    this.t2081Complete = item.userAccept.filledFormT2081
    this.financialStatements = item.userAccept.copyOfFinancialStatements
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
  loadT1236Progress() {
    this.t123619ecolor = this.csService.getT1236Progress().color
    this.t123619evalue = this.csService.getT1236Progress().value
    this.t123619eStatus = this.csService.getT1236Progress().status
  }
  loadT2081Progress() {
    this.t208110ecolor = this.csService.getT2081Progress().color
    this.t208110evalue = this.csService.getT2081Progress().value
    this.t208110eStatus = this.csService.getT2081Progress().status
  }

  savet3010FormSectionD() {
    let secDData = new T3010SecD()
    secDData.col_4020_secD = this.t3010FormSectionD.getRawValue().col_4020_secD
    secDData.col_4050 = this.t3010FormSectionD.getRawValue().col_4050
    secDData.col_4200_secD = this.t3010FormSectionD.getRawValue().col_4200_secD
    secDData.col_4350_secD = this.t3010FormSectionD.getRawValue().col_4350_secD
    secDData.col_4400 = this.t3010FormSectionD.getRawValue().col_4400
    secDData.col_4490 = this.t3010FormSectionD.getRawValue().col_4490
    secDData.col_4500_secD = this.t3010FormSectionD.getRawValue().col_4500_secD
    secDData.col_4505_secD = this.t3010FormSectionD.getRawValue().col_4505_secD
    secDData.col_4510_secD = this.t3010FormSectionD.getRawValue().col_4510_secD
    secDData.col_4530_secD = this.t3010FormSectionD.getRawValue().col_4530_secD
    secDData.col_4565 = this.t3010FormSectionD.getRawValue().col_4565
    secDData.col_4571_secD = this.t3010FormSectionD.getRawValue().col_4571_secD
    secDData.col_4575_secD = this.t3010FormSectionD.getRawValue().col_4575_secD
    secDData.col_4630_secD = this.t3010FormSectionD.getRawValue().col_4630_secD
    secDData.col_4640_secD = this.t3010FormSectionD.getRawValue().col_4640_secD
    secDData.col_4650_secD = this.t3010FormSectionD.getRawValue().col_4650_secD
    secDData.col_4860_secD = this.t3010FormSectionD.getRawValue().col_4860_secD
    secDData.col_4810_secD = this.t3010FormSectionD.getRawValue().col_4810_secD
    secDData.col_4920_secD = this.t3010FormSectionD.getRawValue().col_4920_secD
    secDData.col_4950_secD = this.t3010FormSectionD.getRawValue().col_4950_secD
    secDData.col_5000_secD = this.t3010FormSectionD.getRawValue().col_5000_secD
    secDData.col_5010_secD = this.t3010FormSectionD.getRawValue().col_5010_secD
    secDData.col_5050_secD = this.t3010FormSectionD.getRawValue().col_5050_secD
    secDData.col_5100_secD = this.t3010FormSectionD.getRawValue().col_5100_secD
    secDData.col_4570_secD = this.t3010FormSectionD.getRawValue().col_4570_secD
    secDData.col_4700_secD = this.t3010FormSectionD.getRawValue().col_4700_secD

    secDData.user_id = this.csService.user_id
    secDData.percentCompleted = 20
    this.csService.setT3010SecD(secDData)
    let userAccept = new UserAcceptDto()
    userAccept.copyOfFinancialStatements = this.financialStatements
    userAccept.filledFormRC232 = this.rc232Complete
    userAccept.filledFormT1235 = this.t1235Complete
    userAccept.filledFormT1236 = this.t1236Complete
    userAccept.filledFormT2081 = this.t2081Complete
    userAccept.filledFormT3010 = this.t3010Complete
    userAccept.privacyStatement = this.privacyStatementComplete

    this.csService.setUserAccpet(userAccept)
    this.resp = this.csService.saveFormT3010()
    this.resp.subscribe(item => {
      console.log("Response after saving section D ")
      console.log(item)
      const dialogRef = this.dialog.open(InfoComponent, {
        width: '500px',
        data: {
          'message': item.message
        }
      });
    })
    this.t3010value = 20
    this.t3010Status = 'In Progress'
    this.t3010color = 'accent'
    //this.csService.setT3010Progress(20, 'accent', 'In Progress')
  }
  savet3010FormSectionE() {
    let secEData = new T3010SecE()
    secEData.e_name = this.t3010FormSectionE.getRawValue().e_name
    secEData.e_signature = this.t3010FormSectionE.getRawValue().e_signature
    secEData.e_position = this.t3010FormSectionE.getRawValue().e_position
    secEData.secEDate = this.t3010FormSectionE.getRawValue().secEDate
    secEData.secEphone = this.t3010FormSectionE.getRawValue().secEphone
    secEData.user_id = this.csService.user_id
    secEData.percentCompleted = 20
    this.csService.setT3010SecE(secEData)
    let userAccept = new UserAcceptDto()
    userAccept.copyOfFinancialStatements = this.financialStatements
    userAccept.filledFormRC232 = this.rc232Complete
    userAccept.filledFormT1235 = this.t1235Complete
    userAccept.filledFormT1236 = this.t1236Complete
    userAccept.filledFormT2081 = this.t2081Complete
    userAccept.filledFormT3010 = this.t3010Complete
    userAccept.privacyStatement = this.privacyStatementComplete

    this.csService.setUserAccpet(userAccept)
    this.resp = this.csService.saveFormT3010()
    this.resp.subscribe(item => {
      console.log("Response after saving section D ")
      console.log(item)
      const dialogRef = this.dialog.open(InfoComponent, {
        width: '500px',
        data: {
          'message': item.message
        }
      });
    })

    this.t3010value = 20
    this.t3010Status = 'In Progress'
    this.t3010color = 'accent'
    //this.csService.setT3010Progress(20, 'accent', 'In Progress')

  }
  savet3010FormSectionF() {
    let secFData = new T3010SecF()
    secFData.f1_phyAddCharity = this.t3010FormSectionF.getRawValue().f1_phyAddCharity
    secFData.f1_addCharityBooks = this.t3010FormSectionF.getRawValue().f1_addCharityBooks
    secFData.f1_charityCity = this.t3010FormSectionF.getRawValue().f1_charityCity
    secFData.f1_charityBooksCity = this.t3010FormSectionF.getRawValue().f1_charityBooksCity
    secFData.f1_phyProv = this.t3010FormSectionF.getRawValue().f1_phyProv
    secFData.f1_booksProv = this.t3010FormSectionF.getRawValue().f1_booksProv
    secFData.f2_name = this.t3010FormSectionF.getRawValue().f2_name
    secFData.f2_compName = this.t3010FormSectionF.getRawValue().f2_compName
    secFData.f2_streetAddr = this.t3010FormSectionF.getRawValue().f2_streetAddr
    secFData.f2_city = this.t3010FormSectionF.getRawValue().f2_city
    secFData.f2_phone = this.t3010FormSectionF.getRawValue().f2_phone
    secFData.f2_isInSecE = this.t3010FormSectionF.getRawValue().f2_isInSecE
    secFData.privacyStatement = this.t3010FormSectionF.getRawValue().privacyStatement
    secFData.col_100 = this.t3010FormSectionF.getRawValue().col_100
    secFData.col_110 = this.t3010FormSectionF.getRawValue().col_110
    secFData.col_120 = this.t3010FormSectionF.getRawValue().col_120
    secFData.col_130 = this.t3010FormSectionF.getRawValue().col_130
    secFData.col_200 = this.t3010FormSectionF.getRawValue().col_200
    secFData.col_210 = this.t3010FormSectionF.getRawValue().col_210
    secFData.schedule2_name_1 = this.t3010FormSectionF.getRawValue().schedule2_name_1
    secFData.schedule2_cc_1 = this.t3010FormSectionF.getRawValue().schedule2_cc_1
    secFData.schedule2_amount_1 = this.t3010FormSectionF.getRawValue().schedule2_amount_1
    secFData.schedule2_name_2 = this.t3010FormSectionF.getRawValue().schedule2_name_2
    secFData.schedule2_cc_2 = this.t3010FormSectionF.getRawValue().schedule2_cc_2
    secFData.schedule2_amount_2 = this.t3010FormSectionF.getRawValue().schedule2_amount_2
    secFData.schedule2_name_3 = this.t3010FormSectionF.getRawValue().schedule2_name_3
    secFData.schedule2_cc_3 = this.t3010FormSectionF.getRawValue().schedule2_cc_3
    secFData.schedule2_amount_3 = this.t3010FormSectionF.getRawValue().schedule2_amount_3
    secFData.schedule2_3_1 = this.t3010FormSectionF.getRawValue().schedule2_3_1
    secFData.schedule2_3_2 = this.t3010FormSectionF.getRawValue().schedule2_3_2
    secFData.schedule2_3_3 = this.t3010FormSectionF.getRawValue().schedule2_3_3
    secFData.schedule2_3_4 = this.t3010FormSectionF.getRawValue().schedule2_3_4
    secFData.schedule2_3_5 = this.t3010FormSectionF.getRawValue().schedule2_3_5
    secFData.schedule2_3_6 = this.t3010FormSectionF.getRawValue().schedule2_3_6
    secFData.schedule2_3_7 = this.t3010FormSectionF.getRawValue().schedule2_3_7
    secFData.schedule2_3_8 = this.t3010FormSectionF.getRawValue().schedule2_3_8
    secFData.schedule2_3_9 = this.t3010FormSectionF.getRawValue().schedule2_3_9
    secFData.schedule2_3_10 = this.t3010FormSectionF.getRawValue().schedule2_3_10
    secFData.col_220 = this.t3010FormSectionF.getRawValue().col_220
    secFData.col_230 = this.t3010FormSectionF.getRawValue().col_230
    secFData.col_240 = this.t3010FormSectionF.getRawValue().col_240
    secFData.col_250 = this.t3010FormSectionF.getRawValue().col_250
    secFData.col_260 = this.t3010FormSectionF.getRawValue().col_260
    secFData.schedule2_7_item_1 = this.t3010FormSectionF.getRawValue().schedule2_7_item_1
    secFData.schedule2_7_dest_1 = this.t3010FormSectionF.getRawValue().schedule2_7_dest_1
    secFData.schedule2_7_countryCode_1 = this.t3010FormSectionF.getRawValue().schedule2_7_countryCode_1
    secFData.schedule2_7_value_1 = this.t3010FormSectionF.getRawValue().schedule2_7_value_1
    secFData.schedule2_7_item_2 = this.t3010FormSectionF.getRawValue().schedule2_7_item_2
    secFData.schedule2_7_dest_2 = this.t3010FormSectionF.getRawValue().schedule2_7_dest_2
    secFData.schedule2_7_countryCode_2 = this.t3010FormSectionF.getRawValue().schedule2_7_countryCode_2
    secFData.schedule2_7_value_2 = this.t3010FormSectionF.getRawValue().schedule2_7_value_2
    secFData.schedule2_7_item_3 = this.t3010FormSectionF.getRawValue().schedule2_7_item_3
    secFData.schedule2_7_dest_3 = this.t3010FormSectionF.getRawValue().schedule2_7_dest_3
    secFData.schedule2_7_countryCode_3 = this.t3010FormSectionF.getRawValue().schedule2_7_countryCode_3
    secFData.schedule2_7_value_3 = this.t3010FormSectionF.getRawValue().schedule2_7_value_3
    secFData.schedule2_7_item_4 = this.t3010FormSectionF.getRawValue().schedule2_7_item_4
    secFData.schedule2_7_dest_4 = this.t3010FormSectionF.getRawValue().schedule2_7_dest_4
    secFData.schedule2_7_countryCode_4 = this.t3010FormSectionF.getRawValue().schedule2_7_countryCode_4
    secFData.schedule2_7_value_4 = this.t3010FormSectionF.getRawValue().schedule2_7_value_4
    secFData.col_300 = this.t3010FormSectionF.getRawValue().col_300
    secFData.col_305 = this.t3010FormSectionF.getRawValue().col_305
    secFData.col_310 = this.t3010FormSectionF.getRawValue().col_310
    secFData.col_315 = this.t3010FormSectionF.getRawValue().col_315
    secFData.col_320 = this.t3010FormSectionF.getRawValue().col_320
    secFData.col_325 = this.t3010FormSectionF.getRawValue().col_325
    secFData.col_330 = this.t3010FormSectionF.getRawValue().col_330
    secFData.col_335 = this.t3010FormSectionF.getRawValue().col_335
    secFData.col_340 = this.t3010FormSectionF.getRawValue().col_340
    secFData.col_345 = this.t3010FormSectionF.getRawValue().col_345
    secFData.col_370 = this.t3010FormSectionF.getRawValue().col_370
    secFData.col_380 = this.t3010FormSectionF.getRawValue().col_380
    secFData.col_390 = this.t3010FormSectionF.getRawValue().col_390
    secFData.schedule4_name_1 = this.t3010FormSectionF.getRawValue().schedule4_name_1
    secFData.schedule4_atArms_1 = this.t3010FormSectionF.getRawValue().schedule4_atArms_1
    secFData.schedule4_name_2 = this.t3010FormSectionF.getRawValue().schedule4_name_2
    secFData.schedule4_atArms_2 = this.t3010FormSectionF.getRawValue().schedule4_atArms_2
    secFData.schedule4_donor_name_1 = this.t3010FormSectionF.getRawValue().schedule4_donor_name_1
    secFData.schedule4_donor_type_1 = this.t3010FormSectionF.getRawValue().schedule4_donor_type_1
    secFData.schedule4_donor_value_1 = this.t3010FormSectionF.getRawValue().schedule4_donor_value_1
    secFData.schedule4_donor_name_2 = this.t3010FormSectionF.getRawValue().schedule4_donor_name_2
    secFData.schedule4_donor_type_2 = this.t3010FormSectionF.getRawValue().schedule4_donor_type_2
    secFData.schedule4_donor_value_2 = this.t3010FormSectionF.getRawValue().schedule4_donor_value_2
    secFData.schedule4_donor_name_3 = this.t3010FormSectionF.getRawValue().schedule4_donor_name_3
    secFData.schedule4_donor_type_3 = this.t3010FormSectionF.getRawValue().schedule4_donor_type_3
    secFData.schedule4_donor_value_3 = this.t3010FormSectionF.getRawValue().schedule4_donor_value_3
    secFData.col_500 = this.t3010FormSectionF.getRawValue().col_500
    secFData.col_525 = this.t3010FormSectionF.getRawValue().col_525
    secFData.col_550 = this.t3010FormSectionF.getRawValue().col_550
    secFData.col_505 = this.t3010FormSectionF.getRawValue().col_505
    secFData.col_530 = this.t3010FormSectionF.getRawValue().col_530
    secFData.col_555 = this.t3010FormSectionF.getRawValue().col_555
    secFData.col_510 = this.t3010FormSectionF.getRawValue().col_510
    secFData.col_535 = this.t3010FormSectionF.getRawValue().col_535
    secFData.col_560 = this.t3010FormSectionF.getRawValue().col_560
    secFData.col_515 = this.t3010FormSectionF.getRawValue().col_515
    secFData.col_540 = this.t3010FormSectionF.getRawValue().col_540
    secFData.col_565 = this.t3010FormSectionF.getRawValue().col_565
    secFData.col_520 = this.t3010FormSectionF.getRawValue().col_520
    secFData.col_545 = this.t3010FormSectionF.getRawValue().col_545
    secFData.col_580 = this.t3010FormSectionF.getRawValue().col_580
    secFData.col_4020 = this.t3010FormSectionF.getRawValue().col_4020
    secFData.col_4100 = this.t3010FormSectionF.getRawValue().col_4100
    secFData.col_4110 = this.t3010FormSectionF.getRawValue().col_4110
    secFData.col_4120 = this.t3010FormSectionF.getRawValue().col_4120
    secFData.col_4130 = this.t3010FormSectionF.getRawValue().col_4130
    secFData.col_4140 = this.t3010FormSectionF.getRawValue().col_4140
    secFData.col_4150 = this.t3010FormSectionF.getRawValue().col_4150
    secFData.col_4155 = this.t3010FormSectionF.getRawValue().col_4155
    secFData.col_4160 = this.t3010FormSectionF.getRawValue().col_4160
    secFData.col_4165 = this.t3010FormSectionF.getRawValue().col_4165
    secFData.col_4166 = this.t3010FormSectionF.getRawValue().col_4166
    secFData.col_4170 = this.t3010FormSectionF.getRawValue().col_4170
    secFData.col_4180 = this.t3010FormSectionF.getRawValue().col_4180
    secFData.col_4300 = this.t3010FormSectionF.getRawValue().col_4300
    secFData.col_4310 = this.t3010FormSectionF.getRawValue().col_4310
    secFData.col_4320 = this.t3010FormSectionF.getRawValue().col_4320
    secFData.col_4330 = this.t3010FormSectionF.getRawValue().col_4330
    secFData.col_4350 = this.t3010FormSectionF.getRawValue().col_4350
    secFData.col_4500 = this.t3010FormSectionF.getRawValue().col_4500
    secFData.col_5610 = this.t3010FormSectionF.getRawValue().col_5610
    secFData.col_4505 = this.t3010FormSectionF.getRawValue().col_4505
    secFData.col_4510 = this.t3010FormSectionF.getRawValue().col_4510
    secFData.col_4530 = this.t3010FormSectionF.getRawValue().col_4530
    secFData.col_4540 = this.t3010FormSectionF.getRawValue().col_4540
    secFData.col_4550 = this.t3010FormSectionF.getRawValue().col_4550
    secFData.col_4560 = this.t3010FormSectionF.getRawValue().col_4560
    secFData.col_4571 = this.t3010FormSectionF.getRawValue().col_4571
    secFData.col_4575 = this.t3010FormSectionF.getRawValue().col_4575
    secFData.col_4580 = this.t3010FormSectionF.getRawValue().col_4580
    secFData.col_4590 = this.t3010FormSectionF.getRawValue().col_4590
    secFData.col_4600 = this.t3010FormSectionF.getRawValue().col_4600
    secFData.col_4610 = this.t3010FormSectionF.getRawValue().col_4610
    secFData.col_4620 = this.t3010FormSectionF.getRawValue().col_4620
    secFData.col_4630 = this.t3010FormSectionF.getRawValue().col_4630
    secFData.col_4640 = this.t3010FormSectionF.getRawValue().col_4640
    secFData.col_4650 = this.t3010FormSectionF.getRawValue().col_4650
    secFData.col_4655 = this.t3010FormSectionF.getRawValue().col_4655
    secFData.col_4800 = this.t3010FormSectionF.getRawValue().col_4800
    secFData.col_4810 = this.t3010FormSectionF.getRawValue().col_4810
    secFData.col_4820 = this.t3010FormSectionF.getRawValue().col_4820
    secFData.col_4830 = this.t3010FormSectionF.getRawValue().col_4830
    secFData.col_4840 = this.t3010FormSectionF.getRawValue().col_4840
    secFData.col_4850 = this.t3010FormSectionF.getRawValue().col_4850
    secFData.col_4860 = this.t3010FormSectionF.getRawValue().col_4860
    secFData.col_4870 = this.t3010FormSectionF.getRawValue().col_4870
    secFData.col_4890 = this.t3010FormSectionF.getRawValue().col_4890
    secFData.col_4891 = this.t3010FormSectionF.getRawValue().col_4891
    secFData.col_4900 = this.t3010FormSectionF.getRawValue().col_4900
    secFData.col_4910 = this.t3010FormSectionF.getRawValue().col_4910
    secFData.col_4920 = this.t3010FormSectionF.getRawValue().col_4920
    secFData.col_4930 = this.t3010FormSectionF.getRawValue().col_4930
    secFData.col_4950 = this.t3010FormSectionF.getRawValue().col_4950
    secFData.col_5000 = this.t3010FormSectionF.getRawValue().col_5000
    secFData.col_5010 = this.t3010FormSectionF.getRawValue().col_5010
    secFData.col_5020 = this.t3010FormSectionF.getRawValue().col_5020
    secFData.col_5040 = this.t3010FormSectionF.getRawValue().col_5040
    secFData.col_5050 = this.t3010FormSectionF.getRawValue().col_5050
    secFData.col_5500 = this.t3010FormSectionF.getRawValue().col_5500
    secFData.col_5510 = this.t3010FormSectionF.getRawValue().col_5510
    secFData.col_5750 = this.t3010FormSectionF.getRawValue().col_5750
    secFData.col_5900 = this.t3010FormSectionF.getRawValue().col_5900
    secFData.col_5910 = this.t3010FormSectionF.getRawValue().col_5910
    secFData.col_4250 = this.t3010FormSectionF.getRawValue().col_4250
    secFData.col_4570 = this.t3010FormSectionF.getRawValue().col_4570
    secFData.col_4700 = this.t3010FormSectionF.getRawValue().col_4700
    secFData.col_4880 = this.t3010FormSectionF.getRawValue().col_4880
    secFData.col_5100 = this.t3010FormSectionF.getRawValue().col_5100
    secFData.col_4200 = this.t3010FormSectionF.getRawValue().col_4200

    secFData.user_id = this.csService.user_id
    secFData.percentCompleted = 20
    
    this.csService.setT3010SecF(secFData)
    let userAccept = new UserAcceptDto()
    userAccept.copyOfFinancialStatements = this.financialStatements
    userAccept.filledFormRC232 = this.rc232Complete
    userAccept.filledFormT1235 = this.t1235Complete
    userAccept.filledFormT1236 = this.t1236Complete
    userAccept.filledFormT2081 = this.t2081Complete
    userAccept.filledFormT3010 = this.t3010Complete
    userAccept.privacyStatement = this.privacyStatementComplete

    this.csService.setUserAccpet(userAccept)
    this.resp = this.csService.saveFormT3010()
    this.resp.subscribe(item => {
      console.log("Response after saving section A & F ")
      console.log(item)
      const dialogRef = this.dialog.open(InfoComponent, {
        width: '500px',
        data: {
          'message': item.message
        }
      });
    })

    this.t3010value = 20
    this.t3010Status = 'In Progress'
    this.t3010color = 'accent'
    //this.csService.setT3010Progress(20, 'accent', 'In Progress')
  }

  show_C1_ConfDiv(event) {
    if (event.value == 2) {
      this.c1_showConfirmation = true
    } else {
      this.c1_showConfirmation = false
    }
  }
  show_C3_ConfDiv(event) {
    if (event.value == 1) {
      const dialogRef = this.dialog.open(T1236PopUpComponent, {
        width: '1100px',
        maxHeight:'700px',
        data: {},
        position: {
          top: '10px'
        }
      });
      this.c3_showConfirmation = true
    } else {
      this.c3_showConfirmation = false
    }
  }

  fillSchedule1(event) {
    if (event.value == 1) {
      this.showConfirmation = true
      const dialogRef = this.dialog.open(Schedule1Component, {
        width: '1100px',
        data: {}
      });
      //this.col100.focus()
    } else {
      this.showConfirmation = false
    }
  }

  backToA3(event) {
    if (event.value == 1) {
      this.s1_4_showConfirmation = true
    } else {
      this.s1_4_showConfirmation = false
    }
    //this.col1600.focus()
  }

  fillTempSchedule2(event) {
    if (event.value == 1) {
      this.c4_showConfirmation = true
      //this.col200.nativeElement.focus();
      const dialogRef = this.dialog.open(Schedule2Component, {
        width: '1100px',
        maxHeight:'650px',
        data: {},
        position: {
          top: '10px'
        }
      });
      console.log("printing this now ....")
    } else {
      this.c4_showConfirmation = false
    }
  }

  createTempSchedule1Form() {
    this.schedule1TempForm = this.schedule1TempFormBuilder.group(
      {
        col_100: new FormControl(),
        col_110: new FormControl(),
        col_120: new FormControl(),
        col_130: new FormControl()
      }
    )
  }

  createFormt3010SectionA() {
    this.t3010FormSectionA = this.t3010FormSectionABuilder.group(
      {
        charityName: new FormControl(),
        fiscalPeriodEnding: new FormControl(),
        bnRegistration_suffix_1: new FormControl(),
        bnRegistration_prefix_1: new FormControl(),
        webAddress: new FormControl(),
        col_1510: new FormControl(),
        a1_name: new FormControl(),
        a1_bnRegistration_prefix: new FormControl(),
        a1_bnRegistration_suffix: new FormControl(),
        col_1570: new FormControl(),
        col_1600: new FormControl()
      }
    )
  }

  createFormt3010SectionC() {
    this.t3010FormSectionC = this.t3010FormSectionCBuilder.group(
      {
        col_1800: new FormControl(),
        c2_ongoing_programs: new FormControl(),
        c2_new_programs: new FormControl(),
        col_2000: new FormControl(),
        col_2100: new FormControl(),
        col_2500: new FormControl(),
        col_2570: new FormControl(),
        col_2620: new FormControl(),
        col_2510: new FormControl(),
        col_2575: new FormControl(),
        col_2630: new FormControl(),
        col_2530: new FormControl(),
        col_2580: new FormControl(),
        col_2640: new FormControl(),
        col_2540: new FormControl(),
        col_2590: new FormControl(),
        col_2650: new FormControl(),
        col_2550: new FormControl(),
        col_2600: new FormControl(),
        col_2660: new FormControl(),
        col_2560: new FormControl(),
        col_2610: new FormControl(),
        col_2700: new FormControl(),
        col_5450: new FormControl(),
        col_5460: new FormControl(),
        col_2730: new FormControl(),
        col_2750: new FormControl(),
        col_2770: new FormControl(),
        col_2740: new FormControl(),
        col_2760: new FormControl(),
        col_2780: new FormControl(),
        col_2790: new FormControl(),
        col_2800: new FormControl(),
        col_3200: new FormControl(),
        col_3400: new FormControl(),
        col_3900: new FormControl(),
        col_4000: new FormControl(),
        col_5800: new FormControl(),
        col_5810: new FormControl(),
        col_5820: new FormControl(),
        col_5830: new FormControl()
      }
    )
  }

  createFormt3010SectionD() {
    this.t3010FormSectionD = this.t3010FormSectionDBuilder.group(
      {
        col_4020_secD: new FormControl(),
        col_4050: new FormControl(),
        col_4200_secD: new FormControl(),
        col_4350_secD: new FormControl(),
        col_4400: new FormControl(),
        col_4490: new FormControl(),
        col_4500_secD: new FormControl(),
        col_4505_secD: new FormControl(),
        col_4510_secD: new FormControl(),
        col_4530_secD: new FormControl(),
        col_4565: new FormControl(),
        col_4571_secD: new FormControl(),
        col_4575_secD: new FormControl(),
        col_4630_secD: new FormControl(),
        col_4640_secD: new FormControl(),
        col_4650_secD: new FormControl(),
        col_4860_secD: new FormControl(),
        col_4810_secD: new FormControl(),
        col_4920_secD: new FormControl(),
        col_4950_secD: new FormControl(),
        col_5000_secD: new FormControl(),
        col_5010_secD: new FormControl(),
        col_5050_secD: new FormControl(),
        col_5100_secD: new FormControl(),
        col_4570_secD: new FormControl(),
        col_4700_secD: new FormControl()
      }
    )
  }

  createFormt3010SectionE() {
    this.t3010FormSectionE = this.t3010FormSectionEBuilder.group(
      {
        e_name: new FormControl(),
        e_signature: new FormControl(),
        e_position: new FormControl(),
        secEDate: new FormControl(),
        secEphone: new FormControl()
      }
    )
  }

  createFormt3010SectionF() {
    this.t3010FormSectionF = this.t3010FormSectionFBuilder.group(
      {
        f1_phyAddCharity: new FormControl(),
        f1_addCharityBooks: new FormControl(),
        f1_charityCity: new FormControl(),
        f1_charityBooksCity: new FormControl(),
        f1_phyProv: new FormControl(),
        f1_booksProv: new FormControl(),
        f2_name: new FormControl(),
        f2_compName: new FormControl(),
        f2_streetAddr: new FormControl(),
        f2_city: new FormControl(),
        f2_phone: new FormControl(),
        f2_isInSecE: new FormControl(),
        privacyStatement: new FormControl(),
        col_100: new FormControl(),
        col_110: new FormControl(),
        col_120: new FormControl(),
        col_130: new FormControl(),
        col_200: new FormControl(),
        col_210: new FormControl(),
        schedule2_name_1: new FormControl(),
        schedule2_cc_1: new FormControl(),
        schedule2_amount_1: new FormControl(),
        schedule2_name_2: new FormControl(),
        schedule2_cc_2: new FormControl(),
        schedule2_amount_2: new FormControl(),
        schedule2_name_3: new FormControl(),
        schedule2_cc_3: new FormControl(),
        schedule2_amount_3: new FormControl(),
        schedule2_3_1: new FormControl(),
        schedule2_3_2: new FormControl(),
        schedule2_3_3: new FormControl(),
        schedule2_3_4: new FormControl(),
        schedule2_3_5: new FormControl(),
        schedule2_3_6: new FormControl(),
        schedule2_3_7: new FormControl(),
        schedule2_3_8: new FormControl(),
        schedule2_3_9: new FormControl(),
        schedule2_3_10: new FormControl(),
        col_220: new FormControl(),
        col_230: new FormControl(),
        col_240: new FormControl(),
        col_250: new FormControl(),
        col_260: new FormControl(),
        schedule2_7_item_1: new FormControl(),
        schedule2_7_dest_1: new FormControl(),
        schedule2_7_countryCode_1: new FormControl(),
        schedule2_7_value_1: new FormControl(),
        schedule2_7_item_2: new FormControl(),
        schedule2_7_dest_2: new FormControl(),
        schedule2_7_countryCode_2: new FormControl(),
        schedule2_7_value_2: new FormControl(),
        schedule2_7_item_3: new FormControl(),
        schedule2_7_dest_3: new FormControl(),
        schedule2_7_countryCode_3: new FormControl(),
        schedule2_7_value_3: new FormControl(),
        schedule2_7_item_4: new FormControl(),
        schedule2_7_dest_4: new FormControl(),
        schedule2_7_countryCode_4: new FormControl(),
        schedule2_7_value_4: new FormControl(),
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
        col_390: new FormControl(),
        schedule4_name_1: new FormControl(),
        schedule4_atArms_1: new FormControl(),
        schedule4_name_2: new FormControl(),
        schedule4_atArms_2: new FormControl(),
        schedule4_donor_name_1: new FormControl(),
        schedule4_donor_type_1: new FormControl(),
        schedule4_donor_value_1: new FormControl(),
        schedule4_donor_name_2: new FormControl(),
        schedule4_donor_type_2: new FormControl(),
        schedule4_donor_value_2: new FormControl(),
        schedule4_donor_name_3: new FormControl(),
        schedule4_donor_type_3: new FormControl(),
        schedule4_donor_value_3: new FormControl(),
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
        col_580: new FormControl(),
        col_4020: new FormControl(),
        col_4100: new FormControl(),
        col_4110: new FormControl(),
        col_4120: new FormControl(),
        col_4130: new FormControl(),
        col_4140: new FormControl(),
        col_4150: new FormControl(),
        col_4155: new FormControl(),
        col_4160: new FormControl(),
        col_4165: new FormControl(),
        col_4166: new FormControl(),
        col_4170: new FormControl(),
        col_4180: new FormControl(),
        col_4300: new FormControl(),
        col_4310: new FormControl(),
        col_4320: new FormControl(),
        col_4330: new FormControl(),
        col_4350: new FormControl(),
        col_4500: new FormControl(),
        col_5610: new FormControl(),
        col_4505: new FormControl(),
        col_4510: new FormControl(),
        col_4530: new FormControl(),
        col_4540: new FormControl(),
        col_4550: new FormControl(),
        col_4560: new FormControl(),
        col_4571: new FormControl(),
        col_4575: new FormControl(),
        col_4580: new FormControl(),
        col_4590: new FormControl(),
        col_4600: new FormControl(),
        col_4610: new FormControl(),
        col_4620: new FormControl(),
        col_4630: new FormControl(),
        col_4640: new FormControl(),
        col_4650: new FormControl(),
        col_4655: new FormControl(),
        col_4800: new FormControl(),
        col_4810: new FormControl(),
        col_4820: new FormControl(),
        col_4830: new FormControl(),
        col_4840: new FormControl(),
        col_4850: new FormControl(),
        col_4860: new FormControl(),
        col_4870: new FormControl(),
        col_4890: new FormControl(),
        col_4891: new FormControl(),
        col_4900: new FormControl(),
        col_4910: new FormControl(),
        col_4920: new FormControl(),
        col_4930: new FormControl(),
        col_4950: new FormControl(),
        col_5000: new FormControl(),
        col_5010: new FormControl(),
        col_5020: new FormControl(),
        col_5040: new FormControl(),
        col_5050: new FormControl(),
        col_5500: new FormControl(),
        col_5510: new FormControl(),
        col_5750: new FormControl(),
        col_5900: new FormControl(),
        col_5910: new FormControl(),
        col_4250: new FormControl(),
        col_4880: new FormControl(),
        col_4700: new FormControl(),
        col_4570: new FormControl(),
        col_5100: new FormControl(),
        col_4200: new FormControl()
      }
    )
  }

  showa1_: boolean = false
  a1(event) {
    if (event.value == 1) {
      this.showa1_ = true
    } else {
      this.showa1_ = false
    }
  }

  showc7_: boolean = false
  c7(event) {
    if (event.value == 1) {
      this.showc7_ = true
    } else {
      this.showc7_ = false
    }
  }
  c7_d(event) {
    if (event.value == 1) {
      const dialogRef = this.dialog.open(Schedule4Table1Component, {
        width: '1100px',
        data: {}
      });
    } else {

    }

    //this.S4T1.nativeElement.focus()
  }


  c9(event) {
    if (event.value == 1) {
      this.c9_showConfirmation = true
      const dialogRef = this.dialog.open(Schedule3Component, {
        width: '1100px',
        data: {}
      });
      //this.col300.nativeElement.focus()
    } else {
      this.c9_showConfirmation = false
    }
  }


  c10(event) {
    if (event.value == 1) {
      this.c10_showConfirmation = true
      const dialogRef = this.dialog.open(Schedule4Table2Component, {
        width: '1100px',
        data: {}
      });
      //this.S4T2.nativeElement.focus()
    } else {
      this.c10_showConfirmation = false
    }
  }

  c11(event) {
    if (event.value == 1) {
      this.c11_showConfirmation = true
      const dialogRef = this.dialog.open(Schedule5Component, {
        width: '1100px',
        data: {}
      });
      //this.col500.focus()
    } else {
      this.c11_showConfirmation = false
    }
  }

  fillSchedule6(event) {
    if (event.value == 1) {
      //this.col4020.focus()
      this.fillSectionD = false
    } else {
      this.fillSectionD = true
    }
  }

  showd3_EA: boolean = false
  d3_eligible_amount(event) {
    if (event.value == 1) {
      this.showd3_EA = true
    } else {
      this.showd3_EA = false
    }
  }

  showd3_AR: boolean = false
  d3_amount_received(event) {
    if (event.value == 1) {
      const dialogRef = this.dialog.open(Fill4570Component, {
        width: '520px',
        data: { 'message': "Please enter the amount of government funding you have received:" }
      });
      dialogRef.afterClosed().subscribe(item => {
        console.log(item)
        this.t3010FormSectionD.controls.col_4570_secD.patchValue(item.data)
        this.calculate4700SecD(0)
      })
      this.showd3_AR = true
    } else {
      this.t3010FormSectionD.controls.col_4570_secD.patchValue(0)
      this.calculate4700SecD(0)
      this.showd3_AR = false
    }
  }

  shwoSchedule2_2: boolean = false
  schedule2_2(event) {
    if (event.value == 1) {
      this.shwoSchedule2_2 = true
    } else {
      this.shwoSchedule2_2 = false
    }
  }

  shwoSchedule2_2_temp: boolean = false
  schedule2_2_temp(event) {
    if (event.value == 1) {
      this.shwoSchedule2_2_temp = true
    } else {
      this.shwoSchedule2_2_temp = false
    }
  }

  showSchedule2_4: boolean = false
  shcedule2_4(event) {
    if (event.value == 1) {
      this.showSchedule2_4 = true
    } else {
      this.showSchedule2_4 = false
    }
  }
  showSchedule2_4_temp: boolean = false
  shcedule2_4_temp(event) {
    if (event.value == 1) {
      this.showSchedule2_4_temp = true
    } else {
      this.showSchedule2_4_temp = false
    }
  }

  showSchedule2_7: boolean = false
  schedule2_7(event) {
    if (event.value == 1) {
      this.showSchedule2_7 = true
    } else {
      this.showSchedule2_7 = false
    }
  }

  showSchedule2_7_temp: boolean = false
  schedule2_7_temp(event) {
    if (event.value == 1) {
      this.showSchedule2_7_temp = true
    } else {
      this.showSchedule2_7_temp = false
    }
  }

  calculate4350() {
    //let _4300_ = this.t3010FormSectionF.getRawValue().col_4300
    let _4300_ = (<HTMLInputElement>document.getElementById("4300")).value
    //let _4310_ = this.t3010FormSectionF.getRawValue().col_4310
    let _4310_ = (<HTMLInputElement>document.getElementById("4310")).value
    //let _4320_ = this.t3010FormSectionF.getRawValue().col_4320
    let _4320_ = (<HTMLInputElement>document.getElementById("4320")).value
    //let _4330_ = this.t3010FormSectionF.getRawValue().col_4330
    let _4330_ = (<HTMLInputElement>document.getElementById("4330")).value
    this.t3010FormSectionF.controls.col_4350.patchValue(Number(_4300_) + Number(_4310_) + Number(_4320_) + Number(_4330_))
  }

  _4570_: number = 0
  calculate4570() {
    console.log("calculating 4570");
    let _4540_ = (<HTMLInputElement>document.getElementById("4540")).value
    let _4550_ = (<HTMLInputElement>document.getElementById("4550")).value
    let _4560_ = (<HTMLInputElement>document.getElementById("4560")).value
    this._4570_ = Number(_4540_) + Number(_4550_) + Number(_4560_)
  }

  calculate4700(val: number) {
    if (val == 1) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': "dsdfsd",
          'amount': -1, 'amount2': 0
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'cancel') {
          console.log(Number(this.t3010FormSectionF.getRawValue().col_4700))
          console.log(Number((<HTMLInputElement>document.getElementById("4530_F")).value))
          let val = Number(this.t3010FormSectionF.getRawValue().col_4700) - Number((<HTMLInputElement>document.getElementById("4530_F")).value)
          if (val < 0) {
            this.t3010FormSectionF.controls.col_4700.patchValue(0)
          } else {
            this.t3010FormSectionF.controls.col_4700.patchValue(val)
          }
          this.t3010FormSectionF.controls.col_4530.patchValue(0)

        } else {
          console.log("calculating 4700")
          let _4500_ = (<HTMLInputElement>document.getElementById("4500_F")).value
          let _4510_ = (<HTMLInputElement>document.getElementById("4510_F")).value
          let _4530_ = (<HTMLInputElement>document.getElementById("4530_F")).value
          //let _4570_ = (<HTMLInputElement>document.getElementById("4570")).value
          let _4575_ = (<HTMLInputElement>document.getElementById("4575_F")).value
          let _4630_ = (<HTMLInputElement>document.getElementById("4630_F")).value
          let _4640_ = (<HTMLInputElement>document.getElementById("4640_F")).value
          let _4650_ = (<HTMLInputElement>document.getElementById("4650_F")).value

          let _4540_ = (<HTMLInputElement>document.getElementById("4540_F")).value
          let _4550_ = (<HTMLInputElement>document.getElementById("4550_F")).value
          let _4560_ = (<HTMLInputElement>document.getElementById("4560_F")).value
          let _4580_ = (<HTMLInputElement>document.getElementById("4580_F")).value
          let _4600_ = (<HTMLInputElement>document.getElementById("4600_F")).value
          let _4610_ = (<HTMLInputElement>document.getElementById("4610_F")).value
          let _4620_ = (<HTMLInputElement>document.getElementById("4620_F")).value

          this.t3010FormSectionF.controls.col_4700.patchValue(
            Number(_4500_) +
            Number(_4510_) +
            Number(_4530_) +

            Number(_4540_) +
            Number(_4550_) +
            Number(_4560_) +
            Number(_4580_) +
            Number(_4600_) +
            Number(_4610_) +
            Number(_4620_) +

            //Number(_4570_) +
            Number(_4575_) +
            Number(_4630_) +
            Number(_4640_) +
            Number(_4650_)
          )
        }
      })
    } else {
      console.log("calculating 4700")
      let _4500_ = (<HTMLInputElement>document.getElementById("4500_F")).value
      let _4510_ = (<HTMLInputElement>document.getElementById("4510_F")).value
      let _4530_ = (<HTMLInputElement>document.getElementById("4530_F")).value
      //let _4570_ = (<HTMLInputElement>document.getElementById("4570")).value
      let _4575_ = (<HTMLInputElement>document.getElementById("4575_F")).value
      let _4630_ = (<HTMLInputElement>document.getElementById("4630_F")).value
      let _4640_ = (<HTMLInputElement>document.getElementById("4640_F")).value
      let _4650_ = (<HTMLInputElement>document.getElementById("4650_F")).value

      let _4540_ = (<HTMLInputElement>document.getElementById("4540_F")).value
      let _4550_ = (<HTMLInputElement>document.getElementById("4550_F")).value
      let _4560_ = (<HTMLInputElement>document.getElementById("4560_F")).value

      let _4580_ = (<HTMLInputElement>document.getElementById("4580_F")).value
      let _4600_ = (<HTMLInputElement>document.getElementById("4600_F")).value
      let _4610_ = (<HTMLInputElement>document.getElementById("4610_F")).value
      let _4620_ = (<HTMLInputElement>document.getElementById("4620_F")).value

      this.t3010FormSectionF.controls.col_4700.patchValue(
        Number(_4500_) +
        Number(_4510_) +
        Number(_4530_) +

        Number(_4540_) +
        Number(_4550_) +
        Number(_4560_) +

        Number(_4580_) +
        Number(_4600_) +
        Number(_4610_) +
        Number(_4620_) +

        //Number(_4570_) +
        Number(_4575_) +
        Number(_4630_) +
        Number(_4640_) +
        Number(_4650_)
      )
    }

  }

  calculate4950() {
    let _4800_ = (<HTMLInputElement>document.getElementById("4800_F")).value
    let _4810_ = (<HTMLInputElement>document.getElementById("4810_F")).value
    let _4820_ = (<HTMLInputElement>document.getElementById("4820_F")).value
    let _4830_ = (<HTMLInputElement>document.getElementById("4830_F")).value
    let _4840_ = (<HTMLInputElement>document.getElementById("4840_F")).value
    let _4850_ = (<HTMLInputElement>document.getElementById("4850_F")).value
    let _4860_ = (<HTMLInputElement>document.getElementById("4860_F")).value
    let _4870_ = (<HTMLInputElement>document.getElementById("4870_F")).value
    let _4890_ = (<HTMLInputElement>document.getElementById("4890_F")).value
    let _4891_ = (<HTMLInputElement>document.getElementById("4891_F")).value
    let _4900_ = (<HTMLInputElement>document.getElementById("4900_F")).value
    let _4910_ = (<HTMLInputElement>document.getElementById("4910_F")).value
    let _4920_ = (<HTMLInputElement>document.getElementById("4920_F")).value
    let _4930_ = (<HTMLInputElement>document.getElementById("4930_F")).value
    let _4880_ = (<HTMLInputElement>document.getElementById("4880")).value
    this.t3010FormSectionF.controls.col_4950.patchValue(
      Number(_4800_) +
      Number(_4810_) +
      Number(_4820_) +
      Number(_4830_) +
      Number(_4840_) +
      Number(_4850_) +
      Number(_4860_) +
      Number(_4870_) +
      Number(_4890_) +
      Number(_4891_) +
      Number(_4900_) +
      Number(_4910_) +
      Number(_4920_) +
      Number(_4930_) +
      Number(_4880_)
    )
    this.t3010FormSectionF.controls.col_5100.patchValue((<HTMLInputElement>document.getElementById("4950_F")).value)
  }

  calculate4950SecD() {
    this.t3010FormSectionD.controls.col_4950_secD.patchValue(
      Number(this.t3010FormSectionD.getRawValue().col_4860_secD) +
      Number(this.t3010FormSectionD.getRawValue().col_4810_secD) +
      Number(this.t3010FormSectionD.getRawValue().col_4920_secD)
    )
    this.t3010FormSectionD.controls.col_5100_secD.patchValue((<HTMLInputElement>document.getElementById("4950")).value)
  }

  calculate5100SecD() {
    this.t3010FormSectionD.controls.col_5100_secD.patchValue(Number(this.t3010FormSectionD.getRawValue().col_4950_secD) +
      Number(this.t3010FormSectionD.getRawValue().col_5050_secD))
  }

  calculate5100() {
    console.log("calculating 5100");
    let _4950_ = (<HTMLInputElement>document.getElementById("4950_F")).value
    let _5050_ = (<HTMLInputElement>document.getElementById("5050_F")).value
    this.t3010FormSectionF.controls.col_5100.patchValue(
      Number(_4950_) +
      Number(_5050_))
  }

  calculate4700SecD(val: number) {
    if (val == 1) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': "dsdfsd",
          'amount': -1, 'amount2': 0
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if (result.event == 'cancel') {
          let val = Number(this.t3010FormSectionD.getRawValue().col_4700_secD) - Number((<HTMLInputElement>document.getElementById("SecD4530")).value)
          if (val < 0) {
            this.t3010FormSectionD.controls.col_4700_secD.patchValue(0)
          } else {
            this.t3010FormSectionD.controls.col_4700_secD.patchValue(val)
          }
          this.t3010FormSectionD.controls.col_4530_secD.patchValue(0)
        } else {
          let _4570_ = 0
          let _4500_ = 0
          if (document.getElementById("SecD4500") != null) {
            _4500_ = Number((<HTMLInputElement>document.getElementById("SecD4500")).value)
          }
          let _4510_ = (<HTMLInputElement>document.getElementById("SecD4510")).value
          let _4530_ = (<HTMLInputElement>document.getElementById("SecD4530")).value
          if (document.getElementById("SecD4570") != null) {
            _4570_ = Number((<HTMLInputElement>document.getElementById("SecD4570")).value)
          }
          let _4575_ = (<HTMLInputElement>document.getElementById("SecD4575")).value
          let _4630_ = (<HTMLInputElement>document.getElementById("SecD4630")).value
          let _4640_ = (<HTMLInputElement>document.getElementById("SecD4640")).value
          let _4650_ = (<HTMLInputElement>document.getElementById("SecD4650")).value

          this.t3010FormSectionD.controls.col_4700_secD.patchValue(
            Number(_4500_) +
            Number(_4510_) +
            Number(_4530_) +
            Number(_4570_) +
            Number(_4575_) +
            Number(_4630_) +
            Number(_4640_) +
            Number(_4650_)
          )
        }
      });
    } else {
      let _4570_ = 0
      let _4500_ = 0
      if (document.getElementById("SecD4500") != null) {
        _4500_ = Number((<HTMLInputElement>document.getElementById("SecD4500")).value)
      }
      let _4510_ = (<HTMLInputElement>document.getElementById("SecD4510")).value
      let _4530_ = (<HTMLInputElement>document.getElementById("SecD4530")).value
      if (document.getElementById("SecD4570") != null) {
        _4570_ = Number((<HTMLInputElement>document.getElementById("SecD4570")).value)
      }
      let _4575_ = (<HTMLInputElement>document.getElementById("SecD4575")).value
      let _4630_ = (<HTMLInputElement>document.getElementById("SecD4630")).value
      let _4640_ = (<HTMLInputElement>document.getElementById("SecD4640")).value
      let _4650_ = (<HTMLInputElement>document.getElementById("SecD4650")).value

      this.t3010FormSectionD.controls.col_4700_secD.patchValue(
        Number(_4500_) +
        Number(_4510_) +
        Number(_4530_) +
        Number(_4570_) +
        Number(_4575_) +
        Number(_4630_) +
        Number(_4640_) +
        Number(_4650_)
      )
    }
  }

  /*confirmation4350(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        'message': "dsdfsd",
        'amount': -1, 'amount2': 0
      }
    });
  }*/

  alertClass: boolean = false
  _4880_: number = 0
  calculate4880() {
    let _390_ = (<HTMLInputElement>document.getElementById("390")).value
    let _300_ = (<HTMLInputElement>document.getElementById("300")).value
    if (Number(_300_) == Number(_390_)) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': 'You have entered the same value for the total number of full-time employees and total compensation. One of these numbers need to be corrected.',
          'amount': _300_, 'amount2': _390_
        }
      });
      (<HTMLInputElement>document.getElementById("300")).value = '';
      (<HTMLInputElement>document.getElementById("390")).value = '';
      this.alertClass = true
      _390_ = '0'
    } else {
      this.alertClass = false
    }

    console.log("calculating 4880 " + this.alertClass);
    this.t3010FormSectionF.controls.col_4880.patchValue(Number(_390_))
  }

  confirmValueForField370() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        'message': "Confirm you entered the NUMBER OF PART-TIME ONLY employees (including part-year or seasonal)",
        'amount': 0, 'amount2': 0
      }
    });
    dialogRef.afterClosed().subscribe(item => {
      if (item.event == 'cancel') {
        this.t3010FormSectionF.controls.col_370.patchValue(0)
      }
    })
  }

  confirmValueForField380() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        'message': "Confirm the COMPENSATION amount you entered is ONLY for PART-TIME employees (including part-year or seasonal)",
        'amount': 0, 'amount2': 0
      }
    });
    dialogRef.afterClosed().subscribe(item => {
      if (item.event == 'cancel') {
        this.t3010FormSectionF.controls.col_380.patchValue(0)
      }
    })
  }

  confirmValue() {
    let _300_ = (<HTMLInputElement>document.getElementById("300")).value
    let _390_ = (<HTMLInputElement>document.getElementById("390")).value
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
        (<HTMLInputElement>document.getElementById("300")).value = '';
        (<HTMLInputElement>document.getElementById("390")).value = '';
        this.alertClass = true
        _390_ = '0'
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
      dialogRef.afterClosed().subscribe(item => {
        if (item.event == 'cancel') {
          this.t3010FormSectionF.controls.col_300.patchValue(0)
        }
      })
    }
  }

  _4200_: number = 0
  calculate4200(val) {
    if (Number(val) == 1) {
      this.calculate4250()
    }
    let _4100_ = (<HTMLInputElement>document.getElementById("4100")).value
    let _4110_ = (<HTMLInputElement>document.getElementById("4110")).value
    let _4120_ = (<HTMLInputElement>document.getElementById("4120")).value
    let _4130_ = (<HTMLInputElement>document.getElementById("4130")).value
    let _4140_ = (<HTMLInputElement>document.getElementById("4140")).value
    let _4150_ = (<HTMLInputElement>document.getElementById("4150")).value
    let _4155_ = (<HTMLInputElement>document.getElementById("4155")).value
    let _4160_ = (<HTMLInputElement>document.getElementById("4160")).value
    let _4165_ = (<HTMLInputElement>document.getElementById("4165")).value
    let _4166_ = (<HTMLInputElement>document.getElementById("4166")).value
    let _4170_ = (<HTMLInputElement>document.getElementById("4170")).value
    this.t3010FormSectionF.controls.col_4200.patchValue(Number(_4100_) + Number(_4110_) + Number(_4120_) + Number(_4130_) + Number(_4140_) + Number(_4150_) + Number(_4155_) + Number(_4160_) + Number(_4165_) + Number(_4166_) + Number(_4170_))
    //this._4200_ = Number(_4100_) + Number(_4110_) + Number(_4120_) + Number(_4130_) + Number(_4140_) + Number(_4150_) + Number(_4155_) + Number(_4160_) + Number(_4165_) + Number(_4166_) + Number(_4170_)
  }

  calculate4250() {
    let _4150_ = (<HTMLInputElement>document.getElementById("4150")).value
    let _4155_ = (<HTMLInputElement>document.getElementById("4155")).value
    let _4160_ = (<HTMLInputElement>document.getElementById("4160")).value
    let _4165_ = (<HTMLInputElement>document.getElementById("4165")).value
    let _4170_ = (<HTMLInputElement>document.getElementById("4170")).value
    this.t3010FormSectionF.controls.col_4250.patchValue(Number(_4150_) + Number(_4155_) + Number(_4160_) + Number(_4165_) + Number(_4170_))
  }

  process4250() {
    const dialogRef = this.dialog.open(Verify4250Component, {
      width: '500px',
      data: {
        'message': 'Please confirm that the amount you entered is the amount that was NOT used in charitable activities.'
      }
    });
    dialogRef.afterClosed().subscribe(item => {
      if (item.data) {
        const dialogRef = this.dialog.open(Fill4250Component, {
          width: '600px',
          data: {
            'message': 'What amounts were not used in charitable activites:',
            '4150': (<HTMLInputElement>document.getElementById("4150")).value,
            '4155': (<HTMLInputElement>document.getElementById("4155")).value,
            '4160': (<HTMLInputElement>document.getElementById("4160")).value,
            '4165': (<HTMLInputElement>document.getElementById("4165")).value,
            '4170': (<HTMLInputElement>document.getElementById("4170")).value
          }
        });
        dialogRef.afterClosed().subscribe(item => {
          if (item.event == 'ok') {
            this.t3010FormSectionF.controls.col_4150.patchValue(item.data['4150'])
            this.t3010FormSectionF.controls.col_4155.patchValue(item.data['4155'])
            this.t3010FormSectionF.controls.col_4160.patchValue(item.data['4160'])
            this.t3010FormSectionF.controls.col_4165.patchValue(item.data['4165'])
            this.t3010FormSectionF.controls.col_4170.patchValue(item.data['4170'])
            this.calculate4200(0)
          } else {

          }

          let val_4250 = this.t3010FormSectionF.getRawValue().col_4250
          let _4150_ = (<HTMLInputElement>document.getElementById("4150")).value;
          let _4155_ = (<HTMLInputElement>document.getElementById("4155")).value;
          let _4160_ = (<HTMLInputElement>document.getElementById("4160")).value;
          let _4165_ = (<HTMLInputElement>document.getElementById("4165")).value;
          let _4170_ = (<HTMLInputElement>document.getElementById("4170")).value;
          let total = (Number(_4150_) + Number(_4155_) + Number(_4160_) + Number(_4165_) + Number(_4170_));

          if (total > Number(val_4250)) {

          } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '500px',
              data: {
                'message': 'Value of field 4250 should be less than the SUM of amount entered, NOT used in Charitable activities. ( 4250 < 4150 + 4155 + 4160 + 4165 + 4170 )',
                'amount': 0
              }
            });
            dialogRef.afterClosed().subscribe(item => {
              if (item.event == 'ok') {
                this.t3010FormSectionF.controls.col_4250.patchValue(0)
              }
            })
          }
        })
      } else {
        let val_4250 = this.t3010FormSectionF.getRawValue().col_4250
        let _4150_ = (<HTMLInputElement>document.getElementById("4150")).value;
        let _4155_ = (<HTMLInputElement>document.getElementById("4155")).value;
        let _4160_ = (<HTMLInputElement>document.getElementById("4160")).value;
        let _4165_ = (<HTMLInputElement>document.getElementById("4165")).value;
        let _4170_ = (<HTMLInputElement>document.getElementById("4170")).value;
        let total = (Number(_4150_) + Number(_4155_) + Number(_4160_) + Number(_4165_) + Number(_4170_))

        if (total > Number(val_4250)) {

        } else {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '500px',
            data: {
              'message': 'Value of field 4250 should be less than the SUM of amount entered, NOT used in Charitable activities. ( 4250 < 4150 + 4155 + 4160 + 4165 + 4170 )',
              'amount': 0
            }
          });
          dialogRef.afterClosed().subscribe(item => {
            if (item.event == 'ok') {
              this.t3010FormSectionF.controls.col_4250.patchValue(0)
            }
          })
        }

      }

    })
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

  changeTabGuide() {
    this.router.navigateByUrl("guide").then(e => {
      if (e) {
        console.log("Navigation Successfull to guide");
      } else {
        console.log("Navigation Failed !!");
      }
    });
  }

  resp: Observable<any>
  savet3010FormSectionA() {
    let secAData = new T3010SecA()
    secAData.charityName = this.t3010FormSectionA.getRawValue().charityName
    console.log("FISCAL PERIOD ENDING  :::: ")
    console.log(this.t3010FormSectionA.getRawValue())
    secAData.fiscalPeriodEnding = this.datePipe.transform(this.t3010FormSectionA.getRawValue().fiscalPeriodEnding, "yyyy-MM-dd")
    secAData.bnRegistration = this.t3010FormSectionA.getRawValue().bnRegistration_prefix_1 + "RR" + this.t3010FormSectionA.getRawValue().bnRegistration_suffix_1
    secAData.webAddress = this.t3010FormSectionA.getRawValue().webAddress
    secAData.col_1510 = this.t3010FormSectionA.getRawValue().col_1510

    if (Number(secAData.col_1510) == 1) {
      secAData.a1_bnRegistration = this.t3010FormSectionA.getRawValue().a1_bnRegistration_prefix + "RR" + this.t3010FormSectionA.getRawValue().a1_bnRegistration_suffix
      secAData.a1_name = this.t3010FormSectionA.getRawValue().a1_name
    }
    secAData.col_1570 = this.t3010FormSectionA.getRawValue().col_1570
    secAData.col_1600 = this.t3010FormSectionA.getRawValue().col_1600


    if (Number(secAData.col_1600) == 1) {
      let secFData = this.csService.getT3010SecF()
      this.t3010FormSectionF.controls.col_100.patchValue(secFData.col_100)
      this.t3010FormSectionF.controls.col_110.patchValue(secFData.col_110)
      this.t3010FormSectionF.controls.col_120.patchValue(secFData.col_120)
      this.t3010FormSectionF.controls.col_130.patchValue(secFData.col_130)
    }
    console.log("user id being set is  : " + this.csService.user_id)
    secAData.user_id = this.csService.user_id
    secAData.percentCompleted = 20
    this.csService.setT3010SecA(secAData)
    let userAccept = new UserAcceptDto()
    userAccept.copyOfFinancialStatements = this.financialStatements
    userAccept.filledFormRC232 = this.rc232Complete
    userAccept.filledFormT1235 = this.t1235Complete
    userAccept.filledFormT1236 = this.t1236Complete
    userAccept.filledFormT2081 = this.t2081Complete
    userAccept.filledFormT3010 = this.t3010Complete
    userAccept.privacyStatement = this.privacyStatementComplete

    this.csService.setUserAccpet(userAccept)
    this.resp = this.csService.saveFormT3010()
    this.resp.subscribe(item => {
      console.log("Response after saving section A & F ")
      console.log(item)
      const dialogRef = this.dialog.open(InfoComponent, {
        width: '500px',
        data: {
          'message': item.message
        }
      });
    })

    this.t3010value = 20
    this.t3010Status = 'In Progress'
    this.t3010color = 'accent'
  }
  savet3010FormSectionC() {
    let secCData = new T3010SecC()
    let secFData = this.csService.getT3010SecF()

    console.log("VALUES IN SECF DATA ::::: ")
    console.log(secFData)

    secCData.col_1800 = this.t3010FormSectionC.getRawValue().col_1800
    secCData.c2_new_programs = this.t3010FormSectionC.getRawValue().c2_new_programs
    secCData.c2_ongoing_programs = this.t3010FormSectionC.getRawValue().c2_ongoing_programs
    secCData.col_2000 = this.t3010FormSectionC.getRawValue().col_2000
    secCData.col_2100 = this.t3010FormSectionC.getRawValue().col_2100

    if (Number(secCData.col_2100) == 1) {

      this.t3010FormSectionF.controls.col_200.patchValue(secFData.col_200)
      this.t3010FormSectionF.controls.col_210.patchValue(secFData.col_210)

      if (Number(secFData.col_210) == 1) {
        this.t3010FormSectionF.controls.schedule2_name_1.patchValue(secFData.schedule2_name_1)
        this.t3010FormSectionF.controls.schedule2_cc_1.patchValue(secFData.schedule2_cc_1)
        this.t3010FormSectionF.controls.schedule2_amount_1.patchValue(secFData.schedule2_amount_1)
        this.t3010FormSectionF.controls.schedule2_name_2.patchValue(secFData.schedule2_name_2)
        this.t3010FormSectionF.controls.schedule2_cc_2.patchValue(secFData.schedule2_cc_2)
        this.t3010FormSectionF.controls.schedule2_amount_2.patchValue(secFData.schedule2_amount_2)
        this.t3010FormSectionF.controls.schedule2_name_3.patchValue(secFData.schedule2_name_3)
        this.t3010FormSectionF.controls.schedule2_cc_3.patchValue(secFData.schedule2_cc_3)
        this.t3010FormSectionF.controls.schedule2_amount_3.patchValue(secFData.schedule2_amount_3)
      }
      this.t3010FormSectionF.controls.schedule2_3_1.patchValue(secFData.schedule2_3_1)
      this.t3010FormSectionF.controls.schedule2_3_2.patchValue(secFData.schedule2_3_2)
      this.t3010FormSectionF.controls.schedule2_3_3.patchValue(secFData.schedule2_3_3)
      this.t3010FormSectionF.controls.schedule2_3_4.patchValue(secFData.schedule2_3_4)
      this.t3010FormSectionF.controls.schedule2_3_5.patchValue(secFData.schedule2_3_5)
      this.t3010FormSectionF.controls.schedule2_3_6.patchValue(secFData.schedule2_3_6)
      this.t3010FormSectionF.controls.schedule2_3_7.patchValue(secFData.schedule2_3_7)
      this.t3010FormSectionF.controls.schedule2_3_8.patchValue(secFData.schedule2_3_8)
      this.t3010FormSectionF.controls.schedule2_3_9.patchValue(secFData.schedule2_3_9)
      this.t3010FormSectionF.controls.schedule2_3_10.patchValue(secFData.schedule2_3_10)

      this.t3010FormSectionF.controls.col_220.patchValue(secFData.col_220)
      if (Number(secFData.col_220) == 1) {
        this.t3010FormSectionF.controls.col_230.patchValue(secFData.col_230)
      }
      this.t3010FormSectionF.controls.col_240.patchValue(secFData.col_240)
      this.t3010FormSectionF.controls.col_250.patchValue(secFData.col_250)
      this.t3010FormSectionF.controls.col_260.patchValue(secFData.col_260)
      
      if (Number(secFData.col_260) == 1) {
        this.t3010FormSectionF.controls.schedule2_7_item_1.patchValue(secFData.schedule2_7_item_1)
        this.t3010FormSectionF.controls.schedule2_7_dest_1.patchValue(secFData.schedule2_7_dest_1)
        this.t3010FormSectionF.controls.schedule2_7_countryCode_1.patchValue(secFData.schedule2_7_countryCode_1)
        this.t3010FormSectionF.controls.schedule2_7_value_1.patchValue(secFData.schedule2_7_value_1)
        this.t3010FormSectionF.controls.schedule2_7_item_2.patchValue(secFData.schedule2_7_item_2)
        this.t3010FormSectionF.controls.schedule2_7_dest_2.patchValue(secFData.schedule2_7_dest_2)
        this.t3010FormSectionF.controls.schedule2_7_countryCode_2.patchValue(secFData.schedule2_7_countryCode_2)
        this.t3010FormSectionF.controls.schedule2_7_value_2.patchValue(secFData.schedule2_7_value_2)
        this.t3010FormSectionF.controls.schedule2_7_item_3.patchValue(secFData.schedule2_7_item_3)
        this.t3010FormSectionF.controls.schedule2_7_dest_3.patchValue(secFData.schedule2_7_dest_3)
        this.t3010FormSectionF.controls.schedule2_7_countryCode_3.patchValue(secFData.schedule2_7_countryCode_3)
        this.t3010FormSectionF.controls.schedule2_7_value_3.patchValue(secFData.schedule2_7_value_3)
        this.t3010FormSectionF.controls.schedule2_7_item_4.patchValue(secFData.schedule2_7_item_4)
        this.t3010FormSectionF.controls.schedule2_7_dest_4.patchValue(secFData.schedule2_7_dest_4)
        this.t3010FormSectionF.controls.schedule2_7_countryCode_4.patchValue(secFData.schedule2_7_countryCode_4)
        this.t3010FormSectionF.controls.schedule2_7_value_4.patchValue(secFData.schedule2_7_value_4)
      }
    }
    secCData.col_2500 = this.t3010FormSectionC.getRawValue().col_2500
    secCData.col_2510 = this.t3010FormSectionC.getRawValue().col_2510
    secCData.col_2530 = this.t3010FormSectionC.getRawValue().col_2530
    secCData.col_2540 = this.t3010FormSectionC.getRawValue().col_2540
    secCData.col_2550 = this.t3010FormSectionC.getRawValue().col_2550
    secCData.col_2560 = this.t3010FormSectionC.getRawValue().col_2560
    secCData.col_2570 = this.t3010FormSectionC.getRawValue().col_2570
    secCData.col_2575 = this.t3010FormSectionC.getRawValue().col_2575
    secCData.col_2580 = this.t3010FormSectionC.getRawValue().col_2580
    secCData.col_2590 = this.t3010FormSectionC.getRawValue().col_2590
    secCData.col_2600 = this.t3010FormSectionC.getRawValue().col_2600
    secCData.col_2610 = this.t3010FormSectionC.getRawValue().col_2610
    secCData.col_2620 = this.t3010FormSectionC.getRawValue().col_2620
    secCData.col_2630 = this.t3010FormSectionC.getRawValue().col_2630
    secCData.col_2640 = this.t3010FormSectionC.getRawValue().col_2640
    secCData.col_2650 = this.t3010FormSectionC.getRawValue().col_2650
    secCData.col_2660 = this.t3010FormSectionC.getRawValue().col_2660
    secCData.col_2700 = this.t3010FormSectionC.getRawValue().col_2700
    if (Number(secCData.col_2700) == 1) {
      secCData.col_5450 = this.t3010FormSectionC.getRawValue().col_5450
      secCData.col_5460 = this.t3010FormSectionC.getRawValue().col_5460
      secCData.col_2730 = this.t3010FormSectionC.getRawValue().col_2730
      secCData.col_2740 = this.t3010FormSectionC.getRawValue().col_2740
      secCData.col_2750 = this.t3010FormSectionC.getRawValue().col_2750
      secCData.col_2760 = this.t3010FormSectionC.getRawValue().col_2760
      secCData.col_2770 = this.t3010FormSectionC.getRawValue().col_2770
      secCData.col_2780 = this.t3010FormSectionC.getRawValue().col_2780
      secCData.col_2790 = this.t3010FormSectionC.getRawValue().col_2790
      secCData.col_2800 = this.t3010FormSectionC.getRawValue().col_2800
      if (Number(secCData.col_2800) == 1) {
        this.t3010FormSectionF.controls.schedule4_name_1.patchValue(secFData.schedule4_name_1)
        this.t3010FormSectionF.controls.schedule4_atArms_1.patchValue(secFData.schedule4_atArms_1)
        this.t3010FormSectionF.controls.schedule4_name_2.patchValue(secFData.schedule4_name_2)
        this.t3010FormSectionF.controls.schedule4_atArms_2.patchValue(secFData.schedule4_atArms_2)
      }
    }
    secCData.col_3200 = this.t3010FormSectionC.getRawValue().col_3200
    secCData.col_3400 = this.t3010FormSectionC.getRawValue().col_3400
    if (Number(secCData.col_3400) == 1) {
      this.t3010FormSectionF.controls.col_300.patchValue(secFData.col_300)
      this.t3010FormSectionF.controls.col_305.patchValue(secFData.col_305)
      this.t3010FormSectionF.controls.col_310.patchValue(secFData.col_310)
      this.t3010FormSectionF.controls.col_315.patchValue(secFData.col_315)
      this.t3010FormSectionF.controls.col_320.patchValue(secFData.col_320)
      this.t3010FormSectionF.controls.col_325.patchValue(secFData.col_325)
      this.t3010FormSectionF.controls.col_330.patchValue(secFData.col_330)
      this.t3010FormSectionF.controls.col_335.patchValue(secFData.col_335)
      this.t3010FormSectionF.controls.col_340.patchValue(secFData.col_340)
      this.t3010FormSectionF.controls.col_345.patchValue(secFData.col_345)
      this.t3010FormSectionF.controls.col_370.patchValue(secFData.col_370)
      this.t3010FormSectionF.controls.col_380.patchValue(secFData.col_380)
      this.t3010FormSectionF.controls.col_390.patchValue(secFData.col_390)
      this.t3010FormSectionF.controls.col_4880.patchValue(secFData.col_390)
    }
    secCData.col_3900 = this.t3010FormSectionC.getRawValue().col_3900
    if (Number(secCData.col_3900) == 1) {
      this.t3010FormSectionF.controls.schedule4_donor_name_1.patchValue(secFData.schedule4_donor_name_1)
      this.t3010FormSectionF.controls.schedule4_donor_type_1.patchValue(secFData.schedule4_donor_type_1)
      this.t3010FormSectionF.controls.schedule4_donor_value_1.patchValue(secFData.schedule4_donor_value_1)
      this.t3010FormSectionF.controls.schedule4_donor_name_2.patchValue(secFData.schedule4_donor_name_2)
      this.t3010FormSectionF.controls.schedule4_donor_type_2.patchValue(secFData.schedule4_donor_type_2)
      this.t3010FormSectionF.controls.schedule4_donor_value_2.patchValue(secFData.schedule4_donor_value_2)
      this.t3010FormSectionF.controls.schedule4_donor_name_3.patchValue(secFData.schedule4_donor_name_3)
      this.t3010FormSectionF.controls.schedule4_donor_type_3.patchValue(secFData.schedule4_donor_type_3)
      this.t3010FormSectionF.controls.schedule4_donor_value_3.patchValue(secFData.schedule4_donor_value_3)
    }
    secCData.col_4000 = this.t3010FormSectionC.getRawValue().col_4000
    if (Number(secCData.col_4000) == 1) {
      this.t3010FormSectionF.controls.col_500.patchValue(secFData.col_500)
      this.t3010FormSectionF.controls.col_525.patchValue(secFData.col_525)
      this.t3010FormSectionF.controls.col_550.patchValue(secFData.col_550)
      this.t3010FormSectionF.controls.col_505.patchValue(secFData.col_505)
      this.t3010FormSectionF.controls.col_530.patchValue(secFData.col_530)
      this.t3010FormSectionF.controls.col_555.patchValue(secFData.col_555)
      this.t3010FormSectionF.controls.col_510.patchValue(secFData.col_510)
      this.t3010FormSectionF.controls.col_535.patchValue(secFData.col_535)
      this.t3010FormSectionF.controls.col_560.patchValue(secFData.col_560)
      this.t3010FormSectionF.controls.col_515.patchValue(secFData.col_515)
      this.t3010FormSectionF.controls.col_540.patchValue(secFData.col_540)
      this.t3010FormSectionF.controls.col_565.patchValue(secFData.col_565)
      this.t3010FormSectionF.controls.col_520.patchValue(secFData.col_520)
      this.t3010FormSectionF.controls.col_545.patchValue(secFData.col_545)
      this.t3010FormSectionF.controls.col_580.patchValue(secFData.col_580)
    }
    secCData.col_5800 = this.t3010FormSectionC.getRawValue().col_5800
    secCData.col_5810 = this.t3010FormSectionC.getRawValue().col_5810
    secCData.col_5820 = this.t3010FormSectionC.getRawValue().col_5820
    secCData.col_5830 = this.t3010FormSectionC.getRawValue().col_5830

    secCData.user_id = this.csService.user_id
    secCData.percentCompleted = 20
    this.csService.setT3010SecC(secCData)

    let userAccept = new UserAcceptDto()
    userAccept.copyOfFinancialStatements = this.financialStatements
    userAccept.filledFormRC232 = this.rc232Complete
    userAccept.filledFormT1235 = this.t1235Complete
    userAccept.filledFormT1236 = this.t1236Complete
    userAccept.filledFormT2081 = this.t2081Complete
    userAccept.filledFormT3010 = this.t3010Complete
    userAccept.privacyStatement = this.privacyStatementComplete

    this.csService.setUserAccpet(userAccept)

    this.resp = this.csService.saveFormT3010()
    this.resp.subscribe(item => {
      console.log("Response after saving section C & F ")
      console.log(item)
      const dialogRef = this.dialog.open(InfoComponent, {
        width: '500px',
        data: {
          'message': item.message
        }
      });
    })

    this.t3010value = 20
    this.t3010Status = 'In Progress'
    this.t3010color = 'accent'
  }

  t3010Complete: boolean = false
  financialStatements: boolean = false
  t1235Complete: boolean = false
  rc232Complete: boolean = false
  t1236Complete: boolean = false
  t2081Complete: boolean = false
  privacyStatementComplete:boolean = false

  setPrivacyStatement(event){
    if(event.value){
      console.log(event.value)
      this.privacyStatementComplete = true
    }else{
      console.log("did not change")
    }
  }
  setCheckListOption1(event) {
    if (event.checked) {
      this.t3010Complete = true
    } else {
      this.t3010Complete = false
    }
  }
  setCheckListOption2(event) {
    if (event.checked) {
      this.financialStatements = true
    } else {
      this.financialStatements = false
    }
  }
  setCheckListOption3(event) {
    if (event.checked) {
      this.t1235Complete = true
    } else {
      this.t1235Complete = false
    }
  }
  setCheckListOption4(event) {
    if (event.checked) {
      this.rc232Complete = true
    } else {
      this.rc232Complete = false
    }
  }
  setCheckListOption5(event) {
    if (event.checked) {
      this.t1236Complete = true
    } else {
      this.t1236Complete = false
    }
  }
  setCheckListOption6(event) {
    if (event.checked) {
      this.t2081Complete = true
    } else {
      this.t2081Complete = false
    }
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

  loadContryCodes() {
    this.CountryCodes = [
      { code: 'AF', country: 'AF-Afghanistan' },
      { code: 'AL', country: 'AL-Albania' },
      { code: 'DZ', country: 'DZ-Algeria ' },
      { code: 'AO', country: 'AO-Angola ' },
      { code: 'AR', country: 'AR-Argentina ' },
      { code: 'AM', country: 'AM-Armenia ' },
      { code: 'AZ', country: 'AZ-Azerbaijan ' },
      { code: 'BD', country: 'BD-Bangladesh ' },
      { code: 'BY', country: 'BY-Belarus ' },
      { code: 'BT', country: 'BT-Bhutan' },
      { code: 'BO', country: 'BO-Bolivia' },
      { code: 'BA', country: 'BA-Bosnia and Herzegovina' },
      { code: 'BW', country: 'BW-Botswana' },
      { code: 'BR', country: 'BR-Brazil' },
      { code: 'BN', country: 'BN-Brunei Darussalam' },
      { code: 'BG', country: 'BG-Bulgaria' },
      { code: 'BI', country: 'BI-Burundi' },
      { code: 'KH', country: 'KH-Cambodia' },
      { code: 'CM', country: 'CM-Cameroon' },
      { code: 'CF', country: 'CF-Central African Republic' },
      { code: 'TD', country: 'TD-Chad' },
      { code: 'CL', country: 'CL-Chile' },
      { code: 'CN', country: 'CN-China' },
      { code: 'CO', country: 'CO-Colombia' },
      { code: 'KM', country: 'KM-Comoros' },
      { code: 'CD', country: 'CD-Democratic Republic of Congo' },
      { code: 'CG', country: 'CG-Republic of Congo' },
      { code: 'CR', country: 'CR-Costa Rica' },
      { code: 'CI', country: 'CI-Côte d’Ivoire' },
      { code: 'HR', country: 'HR-Croatia' },
      { code: 'CU', country: 'CU-Cuba' },
      { code: 'CY', country: 'CY-Cyprus' },
      { code: 'DK', country: 'DK-Denmark' },
      { code: 'DO', country: 'DO-Dominican Republic' },
      { code: 'EC', country: 'EC-Ecuador' },
      { code: 'EG', country: 'EG-Egypt' },
      { code: 'SV-EL', country: 'SV-El Salvador' },
      { code: 'ET', country: 'ET-Ethiopia' },
      { code: 'FR', country: 'FR-France' },
      { code: 'GA', country: 'GA-Gabon' },
      { code: 'GM', country: 'GM-Gambia' },
      { code: 'GE', country: 'GE-Georgia' },
      { code: 'DE', country: 'DE-Germany' },
      { code: 'GH', country: 'GH-Ghana' },
      { code: 'GT', country: 'GT-Guatemala' },
      { code: 'GY', country: 'GY-Guyana' },
      { code: 'HT', country: 'HT-Haiti' },
      { code: 'HN', country: 'HN-Honduras' },
      { code: 'IN', country: 'IN-India' },
      { code: 'ID', country: 'ID-Indonesia' },
      { code: 'IR', country: 'IR-Iran' },
      { code: 'IQ', country: 'IQ-Iraq' },
      { code: 'IL', country: 'IL-Israel' },
      { code: 'PS', country: 'PS-Israeli Occupied Territories' },
      { code: 'IT', country: 'IT-Italy' },
      { code: 'JM', country: 'JM-Jamaica' },
      { code: 'JP', country: 'JP-Japan' },
      { code: 'JO', country: 'JO-Jordan' },
      { code: 'KZ', country: 'KZ-Kazakhstan' },
      { code: 'KE', country: 'KE-Kenya' },
      { code: 'KP', country: 'KP-North Korea' },
      { code: 'KR', country: 'KR-South Korea' },
      { code: 'KW', country: 'KW-Kuwait' },
      { code: 'KG', country: 'KG-Kyrgyzstan' },
      { code: 'LA', country: 'LA-Laos' },
      { code: 'LB', country: 'LB-Lebanon' },
      { code: 'LR', country: 'LR-Liberia' },
      { code: 'MK', country: 'MK-Macedonia' },
      { code: 'MG', country: 'MG-Madagascar' },
      { code: 'MY', country: 'MY-Malaysia' },
      { code: 'ML', country: 'ML-Mali' },
      { code: 'MU', country: 'MU-Mauritius' },
      { code: 'MX', country: 'MX-Mexico' },
      { code: 'MN', country: 'MN-Mongolia' },
      { code: 'ME', country: 'ME-Montenegro' },
      { code: 'MZ', country: 'MZ-Mozambique' },
      { code: 'MM', country: 'MM-Myanmar (Burma)' },
      { code: 'NA', country: 'NA-Namibia' },
      { code: 'NL', country: 'NL-Netherlands' },
      { code: 'NI', country: 'NI-Nicaragua' },
      { code: 'NE', country: 'NE-Niger' },
      { code: 'NG', country: 'NG-Nigeria' },
      { code: 'OM', country: 'OM-Oman' },
      { code: 'PK', country: 'PK-Pakistan' },
      { code: 'PA', country: 'PA-Panama' },
      { code: 'PE', country: 'PE-Peru' },
      { code: 'PH', country: 'PH-Philippines' },
      { code: 'PL', country: 'PL-Poland' },
      { code: 'QA', country: 'QA-Qatar' },
      { code: 'RE', country: 'RE-Réunion' },
      { code: 'RO', country: 'RO-Romania' },
      { code: 'RU', country: 'RU-Russia' },
      { code: 'RW', country: 'RW-Rwanda' },
      { code: 'SA', country: 'SA-Saudi Arabia' },
      { code: 'RS', country: 'RS-Serbia' },
      { code: 'SL', country: 'SL-Sierra Leone' },
      { code: 'SG', country: 'SG-Singapore' },
      { code: 'SO', country: ' SO-Somalia' },
      { code: 'ES', country: 'ES-Spain' },
      { code: 'LK', country: 'LK-Sri Lanka' },
      { code: 'SD', country: 'SD-Sudan' },
      { code: 'SY', country: 'SY-Syrian Arab Republic' },
      { code: 'TJ', country: 'TJ-Tajikistan' },
      { code: 'TZ', country: 'TZ-United Republic of Tanzania' },
      { code: 'TH', country: 'TH-Thailand' },
      { code: 'TL', country: 'TL-Timor-Leste' },
      { code: 'TR', country: 'TR-Turkey' },
      { code: 'UG', country: 'UG-Uganda' },
      { code: 'UA', country: 'UA-Ukraine' },
      { code: 'GB', country: 'GB-United Kingdom' },
      { code: 'US', country: 'US-United States of America' },
      { code: 'UY', country: 'UY-Uruguay' },
      { code: 'UZ', country: 'UZ-Uzbekistan' },
      { code: 'VW', country: 'VE-Venezuela' },
      { code: 'VN', country: 'VN-Vietnam' },
      { code: 'YE', country: 'YE-Yemen' },
      { code: 'ZM', country: 'ZM-Zambia' },
      { code: 'ZW', country: 'ZW-Zimbabwe' },
      { code: 'QS', country: 'QS-Other countries in Africa' },
      { code: 'QR', country: 'QR-Other countries in Asia and Oceania' },
      { code: 'QM', country: 'QM-Other countries in Central and South America' },
      { code: 'QP', country: 'QP-Other countries in Europe' },
      { code: 'QO', country: 'QO-Other countries in the Middle East' },
      { code: 'QN', country: 'QN-Other countries in North America' }
    ]
  }

  fillFormValues(t3010secAdto: T3010SecA, t3010secFdto: T3010SecF, t3010seCdto: T3010SecC,
    t3010secDdto: T3010SecD, t3010secEDto: T3010SecE) {
    if (t3010secAdto) {
      this.t3010FormSectionA.controls.charityName.patchValue(t3010secAdto.charityName)
      this.t3010FormSectionA.controls.fiscalPeriodEnding.patchValue(t3010secAdto.fiscalPeriodEnding)
      if (t3010secAdto.bnRegistration) {
        this.t3010FormSectionA.controls.bnRegistration_prefix_1.patchValue(t3010secAdto.bnRegistration.split('RR')[0])
        this.t3010FormSectionA.controls.bnRegistration_suffix_1.patchValue(t3010secAdto.bnRegistration.split('RR')[1])
      }
      if (t3010secAdto.a1_bnRegistration) {
        this.t3010FormSectionA.controls.a1_bnRegistration_prefix.patchValue(t3010secAdto.a1_bnRegistration.split('RR')[0])
        this.t3010FormSectionA.controls.a1_bnRegistration_suffix.patchValue(t3010secAdto.a1_bnRegistration.split('RR')[1])
      }
      this.t3010FormSectionA.controls.webAddress.patchValue(t3010secAdto.webAddress)
      this.t3010FormSectionA.controls.a1_name.patchValue(t3010secAdto.a1_name)
      this.t3010FormSectionA.controls.col_1510.patchValue(t3010secAdto.col_1510)
      this.t3010FormSectionA.controls.col_1570.patchValue(t3010secAdto.col_1570)
      this.t3010FormSectionA.controls.col_1600.patchValue(t3010secAdto.col_1600)
    }
    if (t3010secFdto) {
      this.t3010FormSectionF.controls.f1_phyAddCharity.patchValue(t3010secFdto.f1_phyAddCharity)
      this.t3010FormSectionF.controls.f1_addCharityBooks.patchValue(t3010secFdto.f1_addCharityBooks)
      this.t3010FormSectionF.controls.f1_charityCity.patchValue(t3010secFdto.f1_charityCity)
      this.t3010FormSectionF.controls.f1_charityBooksCity.patchValue(t3010secFdto.f1_charityBooksCity)
      this.t3010FormSectionF.controls.f1_phyProv.patchValue(t3010secFdto.f1_phyProv)
      this.t3010FormSectionF.controls.f1_booksProv.patchValue(t3010secFdto.f1_booksProv)
      this.t3010FormSectionF.controls.f2_name.patchValue(t3010secFdto.f2_name)
      this.t3010FormSectionF.controls.f2_compName.patchValue(t3010secFdto.f2_compName)
      this.t3010FormSectionF.controls.f2_streetAddr.patchValue(t3010secFdto.f2_streetAddr)
      this.t3010FormSectionF.controls.f2_city.patchValue(t3010secFdto.f2_city)
      this.t3010FormSectionF.controls.f2_phone.patchValue(t3010secFdto.f2_phone)
      this.t3010FormSectionF.controls.f2_isInSecE.patchValue(t3010secFdto.f2_isInSecE)
      this.t3010FormSectionF.controls.privacyStatement.patchValue(t3010secFdto.privacyStatement)
      this.t3010FormSectionF.controls.col_100.patchValue(t3010secFdto.col_100)
      this.t3010FormSectionF.controls.col_110.patchValue(t3010secFdto.col_110)
      this.t3010FormSectionF.controls.col_120.patchValue(t3010secFdto.col_120)
      this.t3010FormSectionF.controls.col_130.patchValue(t3010secFdto.col_130)
      this.t3010FormSectionF.controls.col_200.patchValue(t3010secFdto.col_200)
      this.t3010FormSectionF.controls.col_210.patchValue(t3010secFdto.col_210)
      this.t3010FormSectionF.controls.schedule2_name_1.patchValue(t3010secFdto.schedule2_name_1)
      this.t3010FormSectionF.controls.schedule2_cc_1.patchValue(t3010secFdto.schedule2_cc_1)
      this.t3010FormSectionF.controls.schedule2_amount_1.patchValue(t3010secFdto.schedule2_amount_1)
      this.t3010FormSectionF.controls.schedule2_name_2.patchValue(t3010secFdto.schedule2_name_2)
      this.t3010FormSectionF.controls.schedule2_cc_2.patchValue(t3010secFdto.schedule2_cc_2)
      this.t3010FormSectionF.controls.schedule2_amount_2.patchValue(t3010secFdto.schedule2_amount_2)
      this.t3010FormSectionF.controls.schedule2_name_3.patchValue(t3010secFdto.schedule2_name_3)
      this.t3010FormSectionF.controls.schedule2_cc_3.patchValue(t3010secFdto.schedule2_cc_3)
      this.t3010FormSectionF.controls.schedule2_amount_3.patchValue(t3010secFdto.schedule2_amount_3)
      this.t3010FormSectionF.controls.schedule2_3_1.patchValue(t3010secFdto.schedule2_3_1)
      this.t3010FormSectionF.controls.schedule2_3_2.patchValue(t3010secFdto.schedule2_3_2)
      this.t3010FormSectionF.controls.schedule2_3_3.patchValue(t3010secFdto.schedule2_3_3)
      this.t3010FormSectionF.controls.schedule2_3_4.patchValue(t3010secFdto.schedule2_3_4)
      this.t3010FormSectionF.controls.schedule2_3_5.patchValue(t3010secFdto.schedule2_3_5)
      this.t3010FormSectionF.controls.schedule2_3_6.patchValue(t3010secFdto.schedule2_3_6)
      this.t3010FormSectionF.controls.schedule2_3_7.patchValue(t3010secFdto.schedule2_3_7)
      this.t3010FormSectionF.controls.schedule2_3_8.patchValue(t3010secFdto.schedule2_3_8)
      this.t3010FormSectionF.controls.schedule2_3_9.patchValue(t3010secFdto.schedule2_3_9)
      this.t3010FormSectionF.controls.schedule2_3_10.patchValue(t3010secFdto.schedule2_3_10)
      this.t3010FormSectionF.controls.col_220.patchValue(t3010secFdto.col_220)
      this.t3010FormSectionF.controls.col_230.patchValue(t3010secFdto.col_230)
      this.t3010FormSectionF.controls.col_240.patchValue(t3010secFdto.col_240)
      this.t3010FormSectionF.controls.col_250.patchValue(t3010secFdto.col_250)
      this.t3010FormSectionF.controls.col_260.patchValue(t3010secFdto.col_260)
      this.t3010FormSectionF.controls.schedule2_7_item_1.patchValue(t3010secFdto.schedule2_7_item_1)
      this.t3010FormSectionF.controls.schedule2_7_dest_1.patchValue(t3010secFdto.schedule2_7_dest_1)
      this.t3010FormSectionF.controls.schedule2_7_countryCode_1.patchValue(t3010secFdto.schedule2_7_countryCode_1)
      this.t3010FormSectionF.controls.schedule2_7_value_1.patchValue(t3010secFdto.schedule2_7_value_1)
      this.t3010FormSectionF.controls.schedule2_7_item_2.patchValue(t3010secFdto.schedule2_7_item_2)
      this.t3010FormSectionF.controls.schedule2_7_dest_2.patchValue(t3010secFdto.schedule2_7_dest_2)
      this.t3010FormSectionF.controls.schedule2_7_countryCode_2.patchValue(t3010secFdto.schedule2_7_countryCode_2)
      this.t3010FormSectionF.controls.schedule2_7_value_2.patchValue(t3010secFdto.schedule2_7_value_2)
      this.t3010FormSectionF.controls.schedule2_7_item_3.patchValue(t3010secFdto.schedule2_7_item_3)
      this.t3010FormSectionF.controls.schedule2_7_dest_3.patchValue(t3010secFdto.schedule2_7_dest_3)
      this.t3010FormSectionF.controls.schedule2_7_countryCode_3.patchValue(t3010secFdto.schedule2_7_countryCode_3)
      this.t3010FormSectionF.controls.schedule2_7_value_3.patchValue(t3010secFdto.schedule2_7_value_3)
      this.t3010FormSectionF.controls.schedule2_7_item_4.patchValue(t3010secFdto.schedule2_7_item_4)
      this.t3010FormSectionF.controls.schedule2_7_dest_4.patchValue(t3010secFdto.schedule2_7_dest_4)
      this.t3010FormSectionF.controls.schedule2_7_countryCode_4.patchValue(t3010secFdto.schedule2_7_countryCode_4)
      this.t3010FormSectionF.controls.schedule2_7_value_4.patchValue(t3010secFdto.schedule2_7_value_4)
      this.t3010FormSectionF.controls.col_300.patchValue(t3010secFdto.col_300)
      this.t3010FormSectionF.controls.col_305.patchValue(t3010secFdto.col_305)
      this.t3010FormSectionF.controls.col_310.patchValue(t3010secFdto.col_310)
      this.t3010FormSectionF.controls.col_315.patchValue(t3010secFdto.col_315)
      this.t3010FormSectionF.controls.col_320.patchValue(t3010secFdto.col_320)
      this.t3010FormSectionF.controls.col_325.patchValue(t3010secFdto.col_325)
      this.t3010FormSectionF.controls.col_330.patchValue(t3010secFdto.col_330)
      this.t3010FormSectionF.controls.col_335.patchValue(t3010secFdto.col_335)
      this.t3010FormSectionF.controls.col_340.patchValue(t3010secFdto.col_340)
      this.t3010FormSectionF.controls.col_345.patchValue(t3010secFdto.col_345)
      this.t3010FormSectionF.controls.col_370.patchValue(t3010secFdto.col_370)
      this.t3010FormSectionF.controls.col_380.patchValue(t3010secFdto.col_380)
      this.t3010FormSectionF.controls.col_390.patchValue(t3010secFdto.col_390)
      this.t3010FormSectionF.controls.schedule4_name_1.patchValue(t3010secFdto.schedule4_name_1)
      this.t3010FormSectionF.controls.schedule4_atArms_1.patchValue(t3010secFdto.schedule4_atArms_1)
      this.t3010FormSectionF.controls.schedule4_name_2.patchValue(t3010secFdto.schedule4_name_2)
      this.t3010FormSectionF.controls.schedule4_atArms_2.patchValue(t3010secFdto.schedule4_atArms_2)
      this.t3010FormSectionF.controls.schedule4_donor_name_1.patchValue(t3010secFdto.schedule4_donor_name_1)
      this.t3010FormSectionF.controls.schedule4_donor_type_1.patchValue(t3010secFdto.schedule4_donor_type_1)
      this.t3010FormSectionF.controls.schedule4_donor_value_1.patchValue(t3010secFdto.schedule4_donor_value_1)
      this.t3010FormSectionF.controls.schedule4_donor_name_2.patchValue(t3010secFdto.schedule4_donor_name_2)
      this.t3010FormSectionF.controls.schedule4_donor_type_2.patchValue(t3010secFdto.schedule4_donor_type_2)
      this.t3010FormSectionF.controls.schedule4_donor_value_2.patchValue(t3010secFdto.schedule4_donor_value_2)
      this.t3010FormSectionF.controls.schedule4_donor_name_3.patchValue(t3010secFdto.schedule4_donor_name_3)
      this.t3010FormSectionF.controls.schedule4_donor_type_3.patchValue(t3010secFdto.schedule4_donor_type_3)
      this.t3010FormSectionF.controls.schedule4_donor_value_3.patchValue(t3010secFdto.schedule4_donor_value_3)
      this.t3010FormSectionF.controls.col_500.patchValue(t3010secFdto.col_500)
      this.t3010FormSectionF.controls.col_525.patchValue(t3010secFdto.col_525)
      this.t3010FormSectionF.controls.col_550.patchValue(t3010secFdto.col_550)
      this.t3010FormSectionF.controls.col_505.patchValue(t3010secFdto.col_505)
      this.t3010FormSectionF.controls.col_530.patchValue(t3010secFdto.col_530)
      this.t3010FormSectionF.controls.col_555.patchValue(t3010secFdto.col_555)
      this.t3010FormSectionF.controls.col_510.patchValue(t3010secFdto.col_510)
      this.t3010FormSectionF.controls.col_535.patchValue(t3010secFdto.col_535)
      this.t3010FormSectionF.controls.col_560.patchValue(t3010secFdto.col_560)
      this.t3010FormSectionF.controls.col_515.patchValue(t3010secFdto.col_515)
      this.t3010FormSectionF.controls.col_540.patchValue(t3010secFdto.col_540)
      this.t3010FormSectionF.controls.col_565.patchValue(t3010secFdto.col_565)
      this.t3010FormSectionF.controls.col_520.patchValue(t3010secFdto.col_520)
      this.t3010FormSectionF.controls.col_545.patchValue(t3010secFdto.col_545)
      this.t3010FormSectionF.controls.col_580.patchValue(t3010secFdto.col_580)
      this.t3010FormSectionF.controls.col_4020.patchValue(t3010secFdto.col_4020)
      this.t3010FormSectionF.controls.col_4100.patchValue(t3010secFdto.col_4100)
      this.t3010FormSectionF.controls.col_4110.patchValue(t3010secFdto.col_4110)
      this.t3010FormSectionF.controls.col_4120.patchValue(t3010secFdto.col_4120)
      this.t3010FormSectionF.controls.col_4130.patchValue(t3010secFdto.col_4130)
      this.t3010FormSectionF.controls.col_4140.patchValue(t3010secFdto.col_4140)
      this.t3010FormSectionF.controls.col_4150.patchValue(t3010secFdto.col_4150)
      this.t3010FormSectionF.controls.col_4155.patchValue(t3010secFdto.col_4155)
      this.t3010FormSectionF.controls.col_4160.patchValue(t3010secFdto.col_4160)
      this.t3010FormSectionF.controls.col_4165.patchValue(t3010secFdto.col_4165)
      this.t3010FormSectionF.controls.col_4166.patchValue(t3010secFdto.col_4166)
      this.t3010FormSectionF.controls.col_4170.patchValue(t3010secFdto.col_4170)
      this.t3010FormSectionF.controls.col_4180.patchValue(t3010secFdto.col_4180)
      this.t3010FormSectionF.controls.col_4300.patchValue(t3010secFdto.col_4300)
      this.t3010FormSectionF.controls.col_4310.patchValue(t3010secFdto.col_4310)
      this.t3010FormSectionF.controls.col_4320.patchValue(t3010secFdto.col_4320)
      this.t3010FormSectionF.controls.col_4330.patchValue(t3010secFdto.col_4330)
      this.t3010FormSectionF.controls.col_4350.patchValue(t3010secFdto.col_4350)
      this.t3010FormSectionF.controls.col_4500.patchValue(t3010secFdto.col_4500)
      this.t3010FormSectionF.controls.col_5610.patchValue(t3010secFdto.col_5610)
      this.t3010FormSectionF.controls.col_4505.patchValue(t3010secFdto.col_4505)
      this.t3010FormSectionF.controls.col_4510.patchValue(t3010secFdto.col_4510)
      this.t3010FormSectionF.controls.col_4530.patchValue(t3010secFdto.col_4530)
      this.t3010FormSectionF.controls.col_4540.patchValue(t3010secFdto.col_4540)
      this.t3010FormSectionF.controls.col_4550.patchValue(t3010secFdto.col_4550)
      this.t3010FormSectionF.controls.col_4560.patchValue(t3010secFdto.col_4560)
      this.t3010FormSectionF.controls.col_4571.patchValue(t3010secFdto.col_4571)
      this.t3010FormSectionF.controls.col_4575.patchValue(t3010secFdto.col_4575)
      this.t3010FormSectionF.controls.col_4580.patchValue(t3010secFdto.col_4580)
      this.t3010FormSectionF.controls.col_4590.patchValue(t3010secFdto.col_4590)
      this.t3010FormSectionF.controls.col_4600.patchValue(t3010secFdto.col_4600)
      this.t3010FormSectionF.controls.col_4610.patchValue(t3010secFdto.col_4610)
      this.t3010FormSectionF.controls.col_4620.patchValue(t3010secFdto.col_4620)
      this.t3010FormSectionF.controls.col_4630.patchValue(t3010secFdto.col_4630)
      this.t3010FormSectionF.controls.col_4640.patchValue(t3010secFdto.col_4640)
      this.t3010FormSectionF.controls.col_4650.patchValue(t3010secFdto.col_4650)
      this.t3010FormSectionF.controls.col_4655.patchValue(t3010secFdto.col_4655)
      this.t3010FormSectionF.controls.col_4800.patchValue(t3010secFdto.col_4800)
      this.t3010FormSectionF.controls.col_4810.patchValue(t3010secFdto.col_4810)
      this.t3010FormSectionF.controls.col_4820.patchValue(t3010secFdto.col_4820)
      this.t3010FormSectionF.controls.col_4830.patchValue(t3010secFdto.col_4830)
      this.t3010FormSectionF.controls.col_4840.patchValue(t3010secFdto.col_4840)
      this.t3010FormSectionF.controls.col_4850.patchValue(t3010secFdto.col_4850)
      this.t3010FormSectionF.controls.col_4860.patchValue(t3010secFdto.col_4860)
      this.t3010FormSectionF.controls.col_4870.patchValue(t3010secFdto.col_4870)
      this.t3010FormSectionF.controls.col_4890.patchValue(t3010secFdto.col_4890)
      this.t3010FormSectionF.controls.col_4891.patchValue(t3010secFdto.col_4891)
      this.t3010FormSectionF.controls.col_4900.patchValue(t3010secFdto.col_4900)
      this.t3010FormSectionF.controls.col_4910.patchValue(t3010secFdto.col_4910)
      this.t3010FormSectionF.controls.col_4920.patchValue(t3010secFdto.col_4920)
      this.t3010FormSectionF.controls.col_4930.patchValue(t3010secFdto.col_4930)
      this.t3010FormSectionF.controls.col_4950.patchValue(t3010secFdto.col_4950)
      this.t3010FormSectionF.controls.col_5000.patchValue(t3010secFdto.col_5000)
      this.t3010FormSectionF.controls.col_5010.patchValue(t3010secFdto.col_5010)
      this.t3010FormSectionF.controls.col_5020.patchValue(t3010secFdto.col_5020)
      this.t3010FormSectionF.controls.col_5040.patchValue(t3010secFdto.col_5040)
      this.t3010FormSectionF.controls.col_5050.patchValue(t3010secFdto.col_5050)
      this.t3010FormSectionF.controls.col_5500.patchValue(t3010secFdto.col_5500)
      this.t3010FormSectionF.controls.col_5510.patchValue(t3010secFdto.col_5510)
      this.t3010FormSectionF.controls.col_5750.patchValue(t3010secFdto.col_5750)
      this.t3010FormSectionF.controls.col_5900.patchValue(t3010secFdto.col_5900)
      this.t3010FormSectionF.controls.col_5910.patchValue(t3010secFdto.col_5910)

      this.t3010FormSectionF.controls.col_4250.patchValue(t3010secFdto.col_4250)
      this.t3010FormSectionF.controls.col_4570.patchValue(t3010secFdto.col_4570)
      this.t3010FormSectionF.controls.col_4700.patchValue(t3010secFdto.col_4700)
      this.t3010FormSectionF.controls.col_4880.patchValue(t3010secFdto.col_4880)
      this.t3010FormSectionF.controls.col_5100.patchValue(t3010secFdto.col_5100)
      this.t3010FormSectionF.controls.col_4200.patchValue(t3010secFdto.col_4200)
    }
    if (t3010seCdto) {
      this.t3010FormSectionC.controls.col_1800.patchValue(t3010seCdto.col_1800)
      this.t3010FormSectionC.controls.c2_ongoing_programs.patchValue(t3010seCdto.c2_ongoing_programs)
      this.t3010FormSectionC.controls.c2_new_programs.patchValue(t3010seCdto.c2_new_programs)
      this.t3010FormSectionC.controls.col_2000.patchValue(t3010seCdto.col_2000)
      this.t3010FormSectionC.controls.col_2100.patchValue(t3010seCdto.col_2100)
      this.t3010FormSectionC.controls.col_2500.patchValue(t3010seCdto.col_2500)
      this.t3010FormSectionC.controls.col_2570.patchValue(t3010seCdto.col_2570)
      this.t3010FormSectionC.controls.col_2620.patchValue(t3010seCdto.col_2620)
      this.t3010FormSectionC.controls.col_2510.patchValue(t3010seCdto.col_2510)
      this.t3010FormSectionC.controls.col_2575.patchValue(t3010seCdto.col_2575)
      this.t3010FormSectionC.controls.col_2630.patchValue(t3010seCdto.col_2630)
      this.t3010FormSectionC.controls.col_2530.patchValue(t3010seCdto.col_2530)
      this.t3010FormSectionC.controls.col_2580.patchValue(t3010seCdto.col_2580)
      this.t3010FormSectionC.controls.col_2640.patchValue(t3010seCdto.col_2640)
      this.t3010FormSectionC.controls.col_2540.patchValue(t3010seCdto.col_2540)
      this.t3010FormSectionC.controls.col_2590.patchValue(t3010seCdto.col_2590)
      this.t3010FormSectionC.controls.col_2650.patchValue(t3010seCdto.col_2650)
      this.t3010FormSectionC.controls.col_2550.patchValue(t3010seCdto.col_2550)
      this.t3010FormSectionC.controls.col_2600.patchValue(t3010seCdto.col_2600)
      this.t3010FormSectionC.controls.col_2660.patchValue(t3010seCdto.col_2660)
      this.t3010FormSectionC.controls.col_2560.patchValue(t3010seCdto.col_2560)
      this.t3010FormSectionC.controls.col_2610.patchValue(t3010seCdto.col_2610)
      this.t3010FormSectionC.controls.col_2700.patchValue(t3010seCdto.col_2700)
      this.t3010FormSectionC.controls.col_5450.patchValue(t3010seCdto.col_5450)
      this.t3010FormSectionC.controls.col_5460.patchValue(t3010seCdto.col_5460)
      this.t3010FormSectionC.controls.col_2730.patchValue(t3010seCdto.col_2730)
      this.t3010FormSectionC.controls.col_2750.patchValue(t3010seCdto.col_2750)
      this.t3010FormSectionC.controls.col_2770.patchValue(t3010seCdto.col_2770)
      this.t3010FormSectionC.controls.col_2740.patchValue(t3010seCdto.col_2740)
      this.t3010FormSectionC.controls.col_2760.patchValue(t3010seCdto.col_2760)
      this.t3010FormSectionC.controls.col_2780.patchValue(t3010seCdto.col_2780)
      this.t3010FormSectionC.controls.col_2790.patchValue(t3010seCdto.col_2790)
      this.t3010FormSectionC.controls.col_2800.patchValue(t3010seCdto.col_2800)
      this.t3010FormSectionC.controls.col_3200.patchValue(t3010seCdto.col_3200)
      this.t3010FormSectionC.controls.col_3400.patchValue(t3010seCdto.col_3400)
      this.t3010FormSectionC.controls.col_3900.patchValue(t3010seCdto.col_3900)
      this.t3010FormSectionC.controls.col_4000.patchValue(t3010seCdto.col_4000)
      this.t3010FormSectionC.controls.col_5800.patchValue(t3010seCdto.col_5800)
      this.t3010FormSectionC.controls.col_5810.patchValue(t3010seCdto.col_5810)
      this.t3010FormSectionC.controls.col_5820.patchValue(t3010seCdto.col_5820)
      this.t3010FormSectionC.controls.col_5830.patchValue(t3010seCdto.col_5830)
    }

    if (t3010secDdto) {
      this.t3010FormSectionD.controls.col_4020_secD.patchValue(t3010secDdto.col_4020_secD)
      this.t3010FormSectionD.controls.col_4050.patchValue(t3010secDdto.col_4050)
      this.t3010FormSectionD.controls.col_4200_secD.patchValue(t3010secDdto.col_4200_secD)
      this.t3010FormSectionD.controls.col_4350_secD.patchValue(t3010secDdto.col_4350_secD)
      this.t3010FormSectionD.controls.col_4400.patchValue(t3010secDdto.col_4400)
      this.t3010FormSectionD.controls.col_4490.patchValue(t3010secDdto.col_4490)
      this.t3010FormSectionD.controls.col_4500_secD.patchValue(t3010secDdto.col_4500_secD)
      this.t3010FormSectionD.controls.col_4505_secD.patchValue(t3010secDdto.col_4505_secD)
      this.t3010FormSectionD.controls.col_4510_secD.patchValue(t3010secDdto.col_4510_secD)
      this.t3010FormSectionD.controls.col_4530_secD.patchValue(t3010secDdto.col_4530_secD)
      this.t3010FormSectionD.controls.col_4565.patchValue(t3010secDdto.col_4565)
      this.t3010FormSectionD.controls.col_4571_secD.patchValue(t3010secDdto.col_4571_secD)
      this.t3010FormSectionD.controls.col_4575_secD.patchValue(t3010secDdto.col_4575_secD)
      this.t3010FormSectionD.controls.col_4630_secD.patchValue(t3010secDdto.col_4630_secD)
      this.t3010FormSectionD.controls.col_4640_secD.patchValue(t3010secDdto.col_4640_secD)
      this.t3010FormSectionD.controls.col_4650_secD.patchValue(t3010secDdto.col_4650_secD)
      this.t3010FormSectionD.controls.col_4860_secD.patchValue(t3010secDdto.col_4860_secD)
      this.t3010FormSectionD.controls.col_4810_secD.patchValue(t3010secDdto.col_4810_secD)
      this.t3010FormSectionD.controls.col_4920_secD.patchValue(t3010secDdto.col_4920_secD)
      this.t3010FormSectionD.controls.col_4950_secD.patchValue(t3010secDdto.col_4950_secD)
      this.t3010FormSectionD.controls.col_5000_secD.patchValue(t3010secDdto.col_5000_secD)
      this.t3010FormSectionD.controls.col_5010_secD.patchValue(t3010secDdto.col_5010_secD)
      this.t3010FormSectionD.controls.col_5050_secD.patchValue(t3010secDdto.col_5050_secD)
      this.t3010FormSectionD.controls.col_5100_secD.patchValue(t3010secDdto.col_5100_secD)
      this.t3010FormSectionD.controls.col_4570_secD.patchValue(t3010secDdto.col_4570_secD)
      this.t3010FormSectionD.controls.col_4700_secD.patchValue(t3010secDdto.col_4700_secD)
    }
    if (t3010secEDto) {
      this.t3010FormSectionE.controls.e_name.patchValue(t3010secEDto.e_name)
      this.t3010FormSectionE.controls.e_signature.patchValue(t3010secEDto.e_signature)
      this.t3010FormSectionE.controls.e_position.patchValue(t3010secEDto.e_position)
      this.t3010FormSectionE.controls.secEDate.patchValue(t3010secEDto.secEDate)
      this.t3010FormSectionE.controls.secEphone.patchValue(t3010secEDto.secEphone)
    }
  }

  submitCharityForm() {
    console.log("Submitting form T3010")
    this.showSpinner = true
    let userAccept = new UserAcceptDto()
    userAccept.copyOfFinancialStatements = this.financialStatements
    userAccept.filledFormRC232 = this.rc232Complete
    userAccept.filledFormT1235 = this.t1235Complete
    userAccept.filledFormT1236 = this.t1236Complete
    userAccept.filledFormT2081 = this.t2081Complete
    userAccept.filledFormT3010 = this.t3010Complete
    userAccept.privacyStatement = this.privacyStatementComplete

    this.csService.setUserAccpet(userAccept)
    this.resp = this.csService.submitCharityForm()
    this.resp.subscribe(item => {
      console.log(item)
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': item.message,
          'amount': 0, 'amount2': 0
        }
      });
      this.showSpinner = false
      this.csService.isSubmitted = true
      this.isDownloadDisabled = false
    })
  }

  message: string = ''

  downloadForm(formType: string, language: string) {
    console.log("formtypeand language : " + formType + "   --  " + language)
    this.resp = this.csService.downloadCharityForm(formType, language)
    this.resp.subscribe(item => {
     console.log(item)
    })
  }

  changeTabToGuide() {
    this.router.navigateByUrl("guide").then(e => {
      if (e) {
        console.log("Navigation to guide Successfull");
      } else {
        console.log("Navigation to guide Failed !!");
      }
    });
  }

  enableSubmitButton(event) {
    console.log(event)
    if (event.checked) {
      this.isDisabled = false
    } else {
      this.isDisabled = true
    }
  }
  showSpinner: boolean = false

  userInfo() {
    console.log("show user info")
    const dialogRef = this.dialog.open(UserInfoPopupComponent, {
      width: '300px',
      data: {
        'userName': this.userName,
        'charityName': this.charityName,
        'loggedInDate': this.currentDate
      },
      position: {
        top: '177px',
        left: '901px'
      }
    });
  }
}