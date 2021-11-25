import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GenericRespDTO } from 'src/app/dtos/GenericRespDTO';
import { T1236DTO } from 'src/app/dtos/t1236DTO';
import { CsServiceService } from 'src/app/services/cs-service.service';

@Component({
  selector: 'app-t1236-pop-up',
  templateUrl: './t1236-pop-up.component.html',
  styleUrls: ['./t1236-pop-up.component.css']
})
export class T1236PopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<T1236PopUpComponent>,
    public csService:CsServiceService,
    private dialog: MatDialog,
    private t1236PopupFormBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

    t1236PopupForm:FormGroup
    resp1236:Observable<GenericRespDTO>

  ngOnInit(): void {
    this.t1236PopupForm = this.t1236PopupFormBuilder.group({
      t1236PopUpChanrityName: new FormControl(),
      t1236PopUpbn_prefix_1: new FormControl(''),
      t1236PopUpbn_suffix_1: new FormControl(''),
      PopUpfiscalPeriodEnding_1236: new FormControl(),
      t1236PopUpNumberOfDonees: new FormControl(),

      Popupt1236OrgName_1:new FormControl(),
      Popupt1236AssoCharity_1:new FormControl(),
      Popupt1236Prefix_1:new FormControl(''),
      Popupt1236Suffix_1:new FormControl(''),
      Popupt1236CityProv_1:new FormControl(),
      Popupt1236Country_1:new FormControl(),
      Popupt1236NonCashGifts_1:new FormControl(),
      Popupt1236TotalAmtGifts_1:new FormControl(),

      Popupt1236OrgName_2:new FormControl(),
      Popupt1236AssoCharity_2:new FormControl(),
      Popupt1236Prefix_2:new FormControl(''),
      Popupt1236Suffix_2:new FormControl(''),
      Popupt1236CityProv_2:new FormControl(),
      Popupt1236Country_2:new FormControl(),
      Popupt1236NonCashGifts_2:new FormControl(),
      Popupt1236TotalAmtGifts_2:new FormControl(),

      Popupt1236OrgName_3:new FormControl(),
      Popupt1236AssoCharity_3:new FormControl(),
      Popupt1236Prefix_3:new FormControl(''),
      Popupt1236Suffix_3:new FormControl(''),
      Popupt1236CityProv_3:new FormControl(),
      Popupt1236Country_3:new FormControl(),
      Popupt1236NonCashGifts_3:new FormControl(),
      Popupt1236TotalAmtGifts_3:new FormControl(),

      Popupt1236OrgName_4:new FormControl(),
      Popupt1236AssoCharity_4:new FormControl(),
      Popupt1236Prefix_4:new FormControl(''),
      Popupt1236Suffix_4:new FormControl(''),
      Popupt1236CityProv_4:new FormControl(),
      Popupt1236Country_4:new FormControl(),
      Popupt1236NonCashGifts_4:new FormControl(),
      Popupt1236TotalAmtGifts_4:new FormControl(),

      Popupt1236OrgName_5:new FormControl(),
      Popupt1236AssoCharity_5:new FormControl(),
      Popupt1236Prefix_5:new FormControl(''),
      Popupt1236Suffix_5:new FormControl(''),
      Popupt1236CityProv_5:new FormControl(),
      Popupt1236Country_5:new FormControl(),
      Popupt1236NonCashGifts_5:new FormControl(),
      Popupt1236TotalAmtGifts_5:new FormControl(),

      Popupt1236OrgName_6:new FormControl(),
      Popupt1236AssoCharity_6:new FormControl(),
      Popupt1236Prefix_6:new FormControl(''),
      Popupt1236Suffix_6:new FormControl(''),
      Popupt1236CityProv_6:new FormControl(),
      Popupt1236Country_6:new FormControl(),
      Popupt1236NonCashGifts_6:new FormControl(),
      Popupt1236TotalAmtGifts_6:new FormControl()
    })
  }

  submitFormT1236PopUp(){

    let t1236Dto = new T1236DTO()
    t1236Dto.t1236CharityName = this.t1236PopupForm.getRawValue().t1236PopUpChanrityName
t1236Dto.fiscalPeriodEnding_1236 = this.t1236PopupForm.getRawValue(). PopUpfiscalPeriodEnding_1236
t1236Dto.t1236NumberOfDonees = this.t1236PopupForm.getRawValue().t1236PopUpNumberOfDonees
t1236Dto.t1236bn_registration = this.t1236PopupForm.getRawValue().t1236PopUpbn_prefix_1 + "RR"+this.t1236PopupForm.getRawValue().t1236PopUpbn_suffix_1

t1236Dto.t1236OrgName_1 = this.t1236PopupForm.getRawValue(). Popupt1236OrgName_1
t1236Dto.t1236AssoCharity_1 = this.t1236PopupForm.getRawValue().Popupt1236AssoCharity_1
t1236Dto.t1236bn_registration_1 = this.t1236PopupForm.getRawValue().Popupt1236Prefix_1+"RR"+this.t1236PopupForm.getRawValue().Popupt1236Suffix_1
t1236Dto.t1236CityProv_1 = this.t1236PopupForm.getRawValue().Popupt1236CityProv_1
t1236Dto.t1236Country_1 = this.t1236PopupForm.getRawValue().Popupt1236Country_1
t1236Dto.t1236NonCashGifts_1 = this.t1236PopupForm.getRawValue().Popupt1236NonCashGifts_1
t1236Dto.t1236TotalAmtGifts_1 = this.t1236PopupForm.getRawValue().Popupt1236TotalAmtGifts_1

t1236Dto.t1236OrgName_2 = this.t1236PopupForm.getRawValue(). Popupt1236OrgName_2
t1236Dto.t1236AssoCharity_2 = this.t1236PopupForm.getRawValue().Popupt1236AssoCharity_2
t1236Dto.t1236bn_registration_2 = this.t1236PopupForm.getRawValue().Popupt1236Prefix_2+"RR"+this.t1236PopupForm.getRawValue().Popupt1236Suffix_2
t1236Dto.t1236CityProv_2 = this.t1236PopupForm.getRawValue().Popupt1236CityProv_2
t1236Dto.t1236Country_2 = this.t1236PopupForm.getRawValue().Popupt1236Country_2
t1236Dto.t1236NonCashGifts_2 = this.t1236PopupForm.getRawValue().Popupt1236NonCashGifts_2
t1236Dto.t1236TotalAmtGifts_2 = this.t1236PopupForm.getRawValue().Popupt1236TotalAmtGifts_2


t1236Dto.t1236OrgName_3 = this.t1236PopupForm.getRawValue(). Popupt1236OrgName_3
t1236Dto.t1236AssoCharity_3 = this.t1236PopupForm.getRawValue().Popupt1236AssoCharity_3
t1236Dto.t1236bn_registration_3 = this.t1236PopupForm.getRawValue().Popupt1236Prefix_3+"RR"+this.t1236PopupForm.getRawValue().Popupt1236Suffix_3
t1236Dto.t1236CityProv_3 = this.t1236PopupForm.getRawValue().Popupt1236CityProv_3
t1236Dto.t1236Country_3 = this.t1236PopupForm.getRawValue().Popupt1236Country_3
t1236Dto.t1236NonCashGifts_3 = this.t1236PopupForm.getRawValue().Popupt1236NonCashGifts_3
t1236Dto.t1236TotalAmtGifts_3 = this.t1236PopupForm.getRawValue().Popupt1236TotalAmtGifts_3

t1236Dto.t1236OrgName_4 = this.t1236PopupForm.getRawValue(). Popupt1236OrgName_4
t1236Dto.t1236AssoCharity_4 = this.t1236PopupForm.getRawValue().Popupt1236AssoCharity_4
t1236Dto.t1236bn_registration_4 = this.t1236PopupForm.getRawValue().Popupt1236Prefix_4+"RR"+this.t1236PopupForm.getRawValue().Popupt1236Suffix_4
t1236Dto.t1236CityProv_4 = this.t1236PopupForm.getRawValue().Popupt1236CityProv_4
t1236Dto.t1236Country_4 = this.t1236PopupForm.getRawValue().Popupt1236Country_4
t1236Dto.t1236NonCashGifts_4 = this.t1236PopupForm.getRawValue().Popupt1236NonCashGifts_4
t1236Dto.t1236TotalAmtGifts_4 = this.t1236PopupForm.getRawValue().Popupt1236TotalAmtGifts_4

t1236Dto.t1236OrgName_5 = this.t1236PopupForm.getRawValue(). Popupt1236OrgName_5
t1236Dto.t1236AssoCharity_5 = this.t1236PopupForm.getRawValue().Popupt1236AssoCharity_5
t1236Dto.t1236bn_registration_5 = this.t1236PopupForm.getRawValue().Popupt1236Prefix_5+"RR"+this.t1236PopupForm.getRawValue().Popupt1236Suffix_5
t1236Dto.t1236CityProv_5 = this.t1236PopupForm.getRawValue().Popupt1236CityProv_5
t1236Dto.t1236Country_5 = this.t1236PopupForm.getRawValue().Popupt1236Country_5
t1236Dto.t1236NonCashGifts_5 = this.t1236PopupForm.getRawValue().Popupt1236NonCashGifts_5
t1236Dto.t1236TotalAmtGifts_5 = this.t1236PopupForm.getRawValue().Popupt1236TotalAmtGifts_5

t1236Dto.t1236OrgName_6 = this.t1236PopupForm.getRawValue(). Popupt1236OrgName_6
t1236Dto.t1236AssoCharity_6 = this.t1236PopupForm.getRawValue().Popupt1236AssoCharity_6
t1236Dto.t1236bn_registration_6 = this.t1236PopupForm.getRawValue().Popupt1236Prefix_6+"RR"+this.t1236PopupForm.getRawValue().Popupt1236Suffix_6
t1236Dto.t1236CityProv_6 = this.t1236PopupForm.getRawValue().Popupt1236CityProv_6
t1236Dto.t1236Country_6 = this.t1236PopupForm.getRawValue().Popupt1236Country_6
t1236Dto.t1236NonCashGifts_6 = this.t1236PopupForm.getRawValue().Popupt1236NonCashGifts_6
t1236Dto.t1236TotalAmtGifts_6 = this.t1236PopupForm.getRawValue().Popupt1236TotalAmtGifts_6

t1236Dto.user_id = this.csService.user_id
this.resp1236 = this.csService.saveFormT1236(t1236Dto)
this.resp1236.subscribe(item=>{
  console.log("Saved the data for T1236 .... ")
  console.log(item)
  this.dialogRef.close();
})
}

}
