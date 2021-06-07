import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RC232DTO } from 'src/app/dtos/rc232DTO';
import { CsServiceService } from 'src/app/services/cs-service.service';
import { UserInfoPopupComponent } from '../user-info-popup/user-info-popup.component';

interface CountryCode {
  code: string;
  country: string;
}

@Component({
  selector: 'app-rc232',
  templateUrl: './rc232.component.html',
  styleUrls: ['./rc232.component.css'],
  providers:[DatePipe]
})
export class Rc232Component implements OnInit {

  constructor(private router: Router,
    private rc232FormBuilder: FormBuilder,
    private datePipe:DatePipe,
    private dialog: MatDialog,
    public csService: CsServiceService) { }


  rc23218ecolor='Warn'
  rc23218evalue = 0;
  rc23218eStatus:string='Not Started'
  rc23218ebufferValue = 0;
  rc23218eCompletion:number=0
  mode = 'buffer';
  
  t3010color:string
  t3010Status:string
  t3010value:number

  t123520ecolor:string
  t123520evalue:number
  t123520eStatus:string

  t123619ecolor:string
  t123619evalue:number
  t123619eStatus:string

  t208110ecolor:string
  t208110evalue:number
  t208110eStatus:string

  progressOfFrorm: boolean = true
  showTabs: boolean = true
  showLogout: boolean = true
  CountryCodes: CountryCode[]
  rc232Form: FormGroup
  isDownloadDisabled:boolean = true

  currentDate:Date
  userName:string
  charityName:string

  ngOnInit(): void {
    this.currentDate = new Date()
    this.userName = this.csService.userName
    this.charityName = this.csService.charityName
    this.loadContryCodes()
    this.createRc232Form()
    let rc232dto = this.csService.getRC232()
    if (rc232dto != undefined) {
      this.fillFormValues(rc232dto)
    }
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

  createRc232Form() {
    this.rc232Form = this.rc232FormBuilder.group(
      {
        rc_100: new FormControl(),
        rc_101: new FormControl(),
        rc_102: new FormControl(),
        rc_200: new FormControl(),
        rc_300: new FormControl(),
        rc_301: new FormControl(),
        rc_302: new FormControl(),
        rc_303: new FormControl(),
        rc_400: new FormControl(),
        rc_401: new FormControl(),
        rc_402: new FormControl(),
        rc_403: new FormControl(),
        rc_404: new FormControl(),
        rc_405: new FormControl(),
        rc_406: new FormControl(),
        rc_407: new FormControl(),
        rc_500: new FormControl(),
        rc_501: new FormControl(),
        rc_502: new FormControl(),
        rc_503: new FormControl(),
        rc_504: new FormControl(),
        rc_505: new FormControl(),
        rc_506: new FormControl(),
        rc_507: new FormControl(),
        rc_508: new FormControl(),
        rc_700: new FormControl(),
        rc_701: new FormControl(),
        rc_702: new FormControl(),
        rc_800: new FormControl(),
        rc_801: new FormControl(),
        rc_802: new FormControl(),
        rc_803: new FormControl(),
        rc_804: new FormControl(),
        rc_900: new FormControl(),
        rc_901: new FormControl(),
        rc_902: new FormControl(),
        rc_903: new FormControl(),
        rc_904: new FormControl(),
        rc_905: new FormControl(),
        rc_906: new FormControl(),
        rc_907: new FormControl(),
        rc_908: new FormControl(),
        rc_909: new FormControl(),
        rc_910: new FormControl(),
        rc_911: new FormControl(),
        rc_912: new FormControl(),
        rc_913: new FormControl(),
        rc_914: new FormControl()
      }
    )
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

  showSpinner:boolean = false
  savetRc232Form() {
    this.showSpinner = true
    let rc232Dto = new RC232DTO()
    rc232Dto.rc_100 = this.rc232Form.getRawValue().rc_100
    rc232Dto.rc_101 = this.rc232Form.getRawValue().rc_101
    rc232Dto.rc_102 = this.rc232Form.getRawValue().rc_102
    rc232Dto.rc_200 = this.rc232Form.getRawValue().rc_200
    rc232Dto.rc_300 = this.rc232Form.getRawValue().rc_300
    rc232Dto.rc_301 = this.rc232Form.getRawValue().rc_301
    rc232Dto.rc_302 = this.rc232Form.getRawValue().rc_302
    rc232Dto.rc_303 = this.rc232Form.getRawValue().rc_303
    rc232Dto.rc_400 = this.rc232Form.getRawValue().rc_400
    rc232Dto.rc_401 = this.rc232Form.getRawValue().rc_401
    rc232Dto.rc_402 = this.rc232Form.getRawValue().rc_402
    rc232Dto.rc_403 = this.rc232Form.getRawValue().rc_403
    rc232Dto.rc_404 = this.rc232Form.getRawValue().rc_404
    rc232Dto.rc_405 = this.rc232Form.getRawValue().rc_405
    rc232Dto.rc_406 = this.rc232Form.getRawValue().rc_406
    rc232Dto.rc_407 = this.rc232Form.getRawValue().rc_407
    rc232Dto.rc_500 = this.rc232Form.getRawValue().rc_500
    rc232Dto.rc_501 = this.rc232Form.getRawValue().rc_501
    rc232Dto.rc_502 = this.rc232Form.getRawValue().rc_502
    rc232Dto.rc_503 = this.rc232Form.getRawValue().rc_503
    rc232Dto.rc_504 = this.rc232Form.getRawValue().rc_504
    rc232Dto.rc_505 = this.rc232Form.getRawValue().rc_505
    rc232Dto.rc_506 = this.rc232Form.getRawValue().rc_506
    rc232Dto.rc_507 = this.rc232Form.getRawValue().rc_507
    rc232Dto.rc_508 = this.rc232Form.getRawValue().rc_508
    rc232Dto.rc_700 = this.rc232Form.getRawValue().rc_700
    rc232Dto.rc_701 = this.rc232Form.getRawValue().rc_701
    rc232Dto.rc_702 = this.rc232Form.getRawValue().rc_702
    rc232Dto.rc_800 = this.rc232Form.getRawValue().rc_800
    rc232Dto.rc_801 = this.rc232Form.getRawValue().rc_801
    rc232Dto.rc_802 = this.rc232Form.getRawValue().rc_802
    rc232Dto.rc_803 = this.rc232Form.getRawValue().rc_803
    rc232Dto.rc_804 = this.rc232Form.getRawValue().rc_804
    rc232Dto.rc_900 = this.rc232Form.getRawValue().rc_900
    rc232Dto.rc_901 = this.rc232Form.getRawValue().rc_901
    rc232Dto.rc_902 = this.rc232Form.getRawValue().rc_902
    rc232Dto.rc_903 = this.rc232Form.getRawValue().rc_903
    rc232Dto.rc_904 = this.rc232Form.getRawValue().rc_904
    rc232Dto.rc_905 = this.rc232Form.getRawValue().rc_905
    rc232Dto.rc_906 = this.rc232Form.getRawValue().rc_906
    rc232Dto.rc_907 = this.rc232Form.getRawValue().rc_907
    rc232Dto.rc_908 = this.rc232Form.getRawValue().rc_908
    rc232Dto.rc_909 = this.rc232Form.getRawValue().rc_909
    rc232Dto.rc_910 = this.rc232Form.getRawValue().rc_910
    rc232Dto.rc_911 = this.rc232Form.getRawValue().rc_911
    rc232Dto.rc_912 = this.rc232Form.getRawValue().rc_912
    rc232Dto.rc_913 = this.rc232Form.getRawValue().rc_913
    rc232Dto.rc_914 = this.rc232Form.getRawValue().rc_914
    rc232Dto.user_id = this.csService.user_id

    this.csService.setRC232(rc232Dto)
    this.showSpinner = false
  }

  fillFormValues(rc232Dto:RC232DTO){
    this.rc232Form.controls.rc_100.patchValue(rc232Dto.rc_100)
this.rc232Form.controls.rc_101.patchValue(rc232Dto.rc_101)
this.rc232Form.controls.rc_102.patchValue(rc232Dto.rc_102)
this.rc232Form.controls.rc_200.patchValue(rc232Dto.rc_200)
this.rc232Form.controls.rc_300.patchValue(rc232Dto.rc_300)
this.rc232Form.controls.rc_301.patchValue(rc232Dto.rc_301)
this.rc232Form.controls.rc_302.patchValue(rc232Dto.rc_302)
this.rc232Form.controls.rc_303.patchValue(rc232Dto.rc_303)
this.rc232Form.controls.rc_400.patchValue(rc232Dto.rc_400)
this.rc232Form.controls.rc_401.patchValue(rc232Dto.rc_401)
this.rc232Form.controls.rc_402.patchValue(rc232Dto.rc_402)
this.rc232Form.controls.rc_403.patchValue(rc232Dto.rc_403)
this.rc232Form.controls.rc_404.patchValue(rc232Dto.rc_404)
this.rc232Form.controls.rc_405.patchValue(rc232Dto.rc_405)
this.rc232Form.controls.rc_406.patchValue(rc232Dto.rc_406)
this.rc232Form.controls.rc_407.patchValue(rc232Dto.rc_407)
this.rc232Form.controls.rc_500.patchValue(rc232Dto.rc_500)
this.rc232Form.controls.rc_501.patchValue(rc232Dto.rc_501)
this.rc232Form.controls.rc_502.patchValue(rc232Dto.rc_502)
this.rc232Form.controls.rc_503.patchValue(rc232Dto.rc_503)
this.rc232Form.controls.rc_504.patchValue(rc232Dto.rc_504)
this.rc232Form.controls.rc_505.patchValue(rc232Dto.rc_505)
this.rc232Form.controls.rc_506.patchValue(rc232Dto.rc_506)
this.rc232Form.controls.rc_507.patchValue(rc232Dto.rc_507)
this.rc232Form.controls.rc_508.patchValue(rc232Dto.rc_508)
this.rc232Form.controls.rc_700.patchValue(rc232Dto.rc_700)
this.rc232Form.controls.rc_701.patchValue(rc232Dto.rc_701)
this.rc232Form.controls.rc_702.patchValue(rc232Dto.rc_702)
this.rc232Form.controls.rc_800.patchValue(rc232Dto.rc_800)
this.rc232Form.controls.rc_801.patchValue(rc232Dto.rc_801)
this.rc232Form.controls.rc_802.patchValue(rc232Dto.rc_802)
this.rc232Form.controls.rc_803.patchValue(rc232Dto.rc_803)
this.rc232Form.controls.rc_804.patchValue(rc232Dto.rc_804)
this.rc232Form.controls.rc_900.patchValue(rc232Dto.rc_900)
this.rc232Form.controls.rc_901.patchValue(rc232Dto.rc_901)
this.rc232Form.controls.rc_902.patchValue(rc232Dto.rc_902)
this.rc232Form.controls.rc_903.patchValue(rc232Dto.rc_903)
this.rc232Form.controls.rc_904.patchValue(rc232Dto.rc_904)
this.rc232Form.controls.rc_905.patchValue(rc232Dto.rc_905)
this.rc232Form.controls.rc_906.patchValue(rc232Dto.rc_906)
this.rc232Form.controls.rc_907.patchValue(rc232Dto.rc_907)
this.rc232Form.controls.rc_908.patchValue(rc232Dto.rc_908)
this.rc232Form.controls.rc_909.patchValue(rc232Dto.rc_909)
this.rc232Form.controls.rc_910.patchValue(rc232Dto.rc_910)
this.rc232Form.controls.rc_911.patchValue(rc232Dto.rc_911)
this.rc232Form.controls.rc_912.patchValue(rc232Dto.rc_912)
this.rc232Form.controls.rc_913.patchValue(rc232Dto.rc_913)
this.rc232Form.controls.rc_914.patchValue(rc232Dto.rc_914)
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
