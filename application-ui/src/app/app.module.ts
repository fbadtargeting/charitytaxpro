import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatDividerModule} from '@angular/material/divider'
import {MatRadioModule} from '@angular/material/radio'
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { T3010Component } from './components/t3010/t3010.component';
import { Rc232Component } from './components/rc232/rc232.component';
import { T1235Component } from './components/t1235/t1235.component';
import { T1236Component } from './components/t1236/t1236.component';
import { T2081Component } from './components/t2081/t2081.component';
import { GuideComponent } from './components/guide/guide.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Schedule2Component } from './components/schedule2/schedule2.component';
import { Schedule4Table1Component } from './components/schedule4-table1/schedule4-table1.component';
import { Schedule4Table2Component } from './components/schedule4-table2/schedule4-table2.component';
import { Schedule3Component } from './components/schedule3/schedule3.component';
import { Schedule5Component } from './components/schedule5/schedule5.component';
import { Schedule1Component } from './components/schedule1/schedule1.component';
import { InfoComponent } from './components/info/info.component';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { Fill4570Component } from './components/fill4570/fill4570.component';
import { Fill4250Component } from './components/fill4250/fill4250.component';
import { Verify4250Component } from './components/verify4250/verify4250.component';
import { T1236PopUpComponent } from './components/t1236-pop-up/t1236-pop-up.component';
import { UserInfoPopupComponent } from './components/user-info-popup/user-info-popup.component';
import { SendCredsComponent } from './components/send-creds/send-creds.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmDialogComponent,
    HomeComponent,
    T3010Component,
    Rc232Component,
    T1235Component,
    T1236Component,
    T2081Component,
    GuideComponent,
    Schedule2Component,
    Schedule4Table1Component,
    Schedule4Table2Component,
    Schedule3Component,
    Schedule5Component,
    Schedule1Component,
    InfoComponent,
    Fill4570Component,
    Fill4250Component,
    Verify4250Component,
    T1236PopUpComponent,
    UserInfoPopupComponent,
    SendCredsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    PdfViewerModule
  ],
  providers: [],
  entryComponents: [ConfirmDialogComponent,Schedule2Component,InfoComponent,Schedule1Component,Schedule4Table1Component,
  Schedule3Component,Schedule4Table2Component,Schedule5Component,T1236PopUpComponent, UserInfoPopupComponent, SendCredsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
