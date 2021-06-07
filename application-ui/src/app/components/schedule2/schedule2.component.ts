import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { T3010SecF } from 'src/app/dtos/t3010SecF';
import { CsServiceService } from 'src/app/services/cs-service.service';
interface CountryCode {
  code: string;
  country: string;
}

@Component({
  selector: 'app-schedule2',
  templateUrl: './schedule2.component.html',
  styleUrls: ['./schedule2.component.css']
})
export class Schedule2Component implements OnInit {

  constructor(private schedule2Formbuilder:FormBuilder,
    public dialogRef: MatDialogRef<Schedule2Component>,
    public csService:CsServiceService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    CountryCodes: CountryCode[]
  schedule2Form: FormGroup
  ngOnInit(): void {

    this.schedule2Form = this.schedule2Formbuilder.group(
      {
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
        schedule2_7_value_4: new FormControl()
      }
    )
      this.loadContryCodes()
  }

  saveSchedule2(){
    //let secFData = new T3010SecF();
let secFData = this.csService.getT3010SecF()
    secFData.col_200 = this.schedule2Form.getRawValue().col_200
      secFData.col_210 = this.schedule2Form.getRawValue().col_210
      if (Number(secFData.col_210) == 1) {
        secFData.schedule2_name_1 = this.schedule2Form.getRawValue().schedule2_name_1
        secFData.schedule2_cc_1 = this.schedule2Form.getRawValue().schedule2_cc_1
        secFData.schedule2_amount_1 = this.schedule2Form.getRawValue().schedule2_amount_1

        secFData.schedule2_name_2 = this.schedule2Form.getRawValue().schedule2_name_2
        secFData.schedule2_cc_2 = this.schedule2Form.getRawValue().schedule2_cc_2
        secFData.schedule2_amount_2 = this.schedule2Form.getRawValue().schedule2_amount_2

        secFData.schedule2_name_3 = this.schedule2Form.getRawValue().schedule2_name_3
        secFData.schedule2_cc_3 = this.schedule2Form.getRawValue().schedule2_cc_3
        secFData.schedule2_amount_3 = this.schedule2Form.getRawValue().schedule2_amount_3
      }
      secFData.schedule2_3_1 = this.schedule2Form.getRawValue().schedule2_3_1
      secFData.schedule2_3_2 = this.schedule2Form.getRawValue().schedule2_3_2
      secFData.schedule2_3_3 = this.schedule2Form.getRawValue().schedule2_3_3
      secFData.schedule2_3_4 = this.schedule2Form.getRawValue().schedule2_3_4
      secFData.schedule2_3_5 = this.schedule2Form.getRawValue().schedule2_3_5
      secFData.schedule2_3_6 = this.schedule2Form.getRawValue().schedule2_3_6
      secFData.schedule2_3_7 = this.schedule2Form.getRawValue().schedule2_3_7
      secFData.schedule2_3_8 = this.schedule2Form.getRawValue().schedule2_3_8
      secFData.schedule2_3_9 = this.schedule2Form.getRawValue().schedule2_3_9
      secFData.schedule2_3_10 = this.schedule2Form.getRawValue().schedule2_3_10

      secFData.col_220 = this.schedule2Form.getRawValue().col_220
      if (Number(secFData.col_220) == 1) {
        secFData.col_230 = this.schedule2Form.getRawValue().col_230
      }
      secFData.col_240 = this.schedule2Form.getRawValue().col_240
      secFData.col_250 = this.schedule2Form.getRawValue().col_250
      secFData.col_260 = this.schedule2Form.getRawValue().col_260
      if (Number(secFData.col_260) == 1) {
        secFData.schedule2_7_item_1 = this.schedule2Form.getRawValue().schedule2_7_item_1
        secFData.schedule2_7_dest_1 = this.schedule2Form.getRawValue().schedule2_7_dest_1
        secFData.schedule2_7_countryCode_1 = this.schedule2Form.getRawValue().schedule2_7_countryCode_1
        secFData.schedule2_7_value_1 = this.schedule2Form.getRawValue().schedule2_7_value_1

        secFData.schedule2_7_item_2 = this.schedule2Form.getRawValue().schedule2_7_item_2
        secFData.schedule2_7_dest_2 = this.schedule2Form.getRawValue().schedule2_7_dest_2
        secFData.schedule2_7_countryCode_2 = this.schedule2Form.getRawValue().schedule2_7_countryCode_2
        secFData.schedule2_7_value_2 = this.schedule2Form.getRawValue().schedule2_7_value_2

        secFData.schedule2_7_item_3 = this.schedule2Form.getRawValue().schedule2_7_item_3
        secFData.schedule2_7_dest_3 = this.schedule2Form.getRawValue().schedule2_7_dest_3
        secFData.schedule2_7_countryCode_3 = this.schedule2Form.getRawValue().schedule2_7_countryCode_3
        secFData.schedule2_7_value_3 = this.schedule2Form.getRawValue().schedule2_7_value_3

        secFData.schedule2_7_item_4 = this.schedule2Form.getRawValue().schedule2_7_item_4
        secFData.schedule2_7_dest_4 = this.schedule2Form.getRawValue().schedule2_7_dest_4
        secFData.schedule2_7_countryCode_4 = this.schedule2Form.getRawValue().schedule2_7_countryCode_4
        secFData.schedule2_7_value_4 = this.schedule2Form.getRawValue().schedule2_7_value_4
      }
      this.csService.setT3010SecF(secFData)
    this.dialogRef.close();
  }

  shwoSchedule2_2: boolean = false
  schedule2_2(event) {
    if (event.value == 1) {
      this.shwoSchedule2_2 = true
    } else {
      this.shwoSchedule2_2 = false
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

  showSchedule2_7: boolean = false
  schedule2_7(event) {
    if (event.value == 1) {
      this.showSchedule2_7 = true
    } else {
      this.showSchedule2_7 = false
    }
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

}
