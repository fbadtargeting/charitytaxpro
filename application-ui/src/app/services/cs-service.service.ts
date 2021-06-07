import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharityNewUserDto } from '../dtos/CharityNewUserDto';
import { CharityUserAuthReq } from '../dtos/CharityUserAuthReq ';
import { CharityUserAuthResp } from '../dtos/CharityUserAuthResp';
import { CharityUserRegistrationResp } from '../dtos/CharityUserRegistrationResp';
import { GenericRespDTO } from '../dtos/GenericRespDTO';
import { RC232DTO } from '../dtos/rc232DTO';
import { T1235DTO } from '../dtos/t1235DTO';
import { T1236DTO } from '../dtos/t1236DTO';
import { t3010DTO } from '../dtos/t3010DTO';
import { T3010SecA } from '../dtos/t3010SecA';
import { T3010SecC } from '../dtos/t3010SecC';
import { T3010SecD } from '../dtos/t3010SecD';
import { T3010SecE } from '../dtos/t3010SecE';
import { T3010SecF } from '../dtos/t3010SecF';

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class CsServiceService {

  baseUrl = "http://3.98.43.92:7070/api/"


  showLogout: boolean = false
  progressOfFrorm: boolean = false
  showTabs: boolean = false
  user_id: number
  isSubmitted: boolean = false
  userName: string
  charityName: string

  t3010: t3010DTO
  t3010secA: T3010SecA
  t3010secF = new T3010SecF()
  t3010secC: T3010SecC
  t3010secD: T3010SecD
  t3010secE: T3010SecE

  t1235: T1235DTO
  t1236: T1236DTO
  rc232: RC232DTO

  mode = 'buffer';

  t3010color: string
  t3010value: number
  t3010bufferValue: number
  t3010Status: string
  t3010Completion: number

  rc23218ecolor: string
  rc23218evalue: number
  rc23218ebufferValue: number;
  rc23218eStatus: string = 'Not Started'
  rc23218eCompletion: number

  t123520ecolor: string
  t123520evalue: number
  t123520ebufferValue: number
  t123520eStatus: string
  t123520eCompletion: number

  t123619ecolor: string
  t123619evalue: number
  t123619eStatus: string
  t123619ebufferValue: number
  t123619eCompletion: number

  t208110ecolor: string
  t208110evalue: number
  t208110eStatus: string = 'Not Started'
  t208110ebufferValue: number
  t208110eCompletion


  constructor(private http: HttpClient) { }

  authenticateUser(loginReq: CharityUserAuthReq) {
    let url = this.baseUrl + "user-management/authenticateUser"
    return this.http.post<CharityUserAuthResp>(url, JSON.stringify(loginReq), HttpUploadOptions)
  }

  registerUser(registerUser: CharityNewUserDto) {
    let url = this.baseUrl + "user-management/registerUser"
    return this.http.post<CharityUserRegistrationResp>(url, JSON.stringify(registerUser), HttpUploadOptions)
  }

  setT3010Dto(t3010dto: t3010DTO) {
    this.t3010 = t3010dto
  }
  getT3010Dto() {
    return this.t3010
  }

  setT3010SecA(t3010secA: T3010SecA) {
    this.t3010secA = t3010secA
  }
  getT3010SecA() {
    return this.t3010secA
  }

  setT3010SecF(t3010secF: T3010SecF) {
    this.t3010secF = t3010secF
  }
  getT3010SecF() {
    return this.t3010secF
  }

  setT3010SecC(t3010secC: T3010SecC) {
    this.t3010secC = t3010secC
  }
  getT3010SecC() {
    return this.t3010secC
  }

  setT3010SecD(t3010secD: T3010SecD) {
    this.t3010secD = t3010secD
  }
  getT3010SecD() {
    return this.t3010secD
  }

  setT3010SecE(t3010secE: T3010SecE) {
    this.t3010secE = t3010secE
  }
  getT3010SecE() {
    return this.t3010secE
  }

  setT1235(t1235dto: T1235DTO) {
    this.t1235 = t1235dto
  }
  getT1235() {
    return this.t1235
  }

  setT1236(t1236dto: T1236DTO) {
    this.t1236 = t1236dto
  }
  getT1236() {
    return this.t1236
  }

  setRC232(rc232dto: RC232DTO) {
    this.rc232 = rc232dto
  }
  getRC232() {
    return this.rc232
  }

  saveFormT3010() {
    console.log("Saving form t3010 with following data :::: ")
    console.log(this.t3010secA)
    console.log(this.t3010secC)
    console.log(this.t3010secD)
    console.log(this.t3010secE)
    console.log(this.t3010secF)

    let t3010dto = new t3010DTO()
    t3010dto.t3010SecA = this.t3010secA
    t3010dto.t3010SecC = this.t3010secC
    t3010dto.t3010SecD = this.t3010secD
    t3010dto.t3010SecE = this.t3010secE
    t3010dto.t3010SecF = this.t3010secF
    t3010dto.user_id = this.user_id
    let url = this.baseUrl + "charity-form/saveFormT3010"
    return this.http.post(url, JSON.stringify(t3010dto), HttpUploadOptions)
  }

  getFormT3010() {
    let url = this.baseUrl + "charity-form/getFormT3010/" + this.user_id
    return this.http.get<t3010DTO>(url)
  }

  saveFormT1235(t1235Dto: T1235DTO) {
    let url = this.baseUrl + "charity-form/saveFormT1235"
    return this.http.post<GenericRespDTO>(url, JSON.stringify(t1235Dto), HttpUploadOptions)
  }

  getFormT1235() {
    let url = this.baseUrl + "charity-form/getFormT1235/" + this.user_id
    return this.http.get<T1235DTO>(url)
  }

  saveFormT1236(t1236Dto: T1236DTO) {
    let url = this.baseUrl + "charity-form/saveFormT1236"
    return this.http.post<GenericRespDTO>(url, JSON.stringify(t1236Dto), HttpUploadOptions)
  }

  getFormT1236() {
    let url = this.baseUrl + "charity-form/getFormT1236/" + this.user_id
    return this.http.get<T1236DTO>(url)
  }

  
  submitCharityForm() {
    console.log("submitting charity form with the following values :::: ")
    let url = this.baseUrl + "charity-form/submitTaxForm/" + this.user_id
    return this.http.get(url)
  }

  downloadPdf() {
    console.log("downloading form")
    let url = this.baseUrl + "charity-form/downloadForm/" + this.user_id
    window.open(url)
    return this.http.get(url)
  }

  downloadCharityForm(formType, lang) {
    let url = this.baseUrl + "charity-form/downloadCharityForm/" + this.user_id + "/" + formType + "/" + lang
    window.open(url)
    return this.http.get(url)
  }

  setT3010Progress(value, color, status) {
    this.t3010value = value
    this.t3010color = color
    this.t3010Status = status
  }
  getT3010Progress() {
    let progress = {
      'value': this.t3010value,
      'color': this.t3010color,
      'status': this.t3010Status
    }
    return progress
  }

  setRC232Progress(value, color, status) {
    this.rc23218evalue = value
    this.rc23218ecolor = color
    this.rc23218eStatus = status
  }
  getRC232Progress() {
    let progress = {
      'value': this.rc23218evalue,
      'color': this.rc23218ecolor,
      'status': this.rc23218eStatus
    }
    return progress
  }

  setT1235Progress(value, color, status) {
    this.t123520evalue = value
    this.t123520ecolor = color
    this.t123619eStatus = status
  }
  getT1235Progress() {
    let progress = {
      'value': this.t123520evalue,
      'color': this.t123520ecolor,
      'status': this.t123520eStatus
    }
    return progress
  }

  setT1236Progress(value, color, status) {
    this.t123619evalue = value
    this.t123619ecolor = color
    this.t123619eStatus = status
  }
  getT1236Progress() {
    let progress = {
      'value': this.t123619evalue,
      'color': this.t123619ecolor,
      'status': this.t123619eStatus
    }
    return progress
  }

  setT2081Progress(value, color, status) {
    this.t208110evalue = value
    this.t208110ecolor = color
    this.t208110eStatus = status
  }
  getT2081Progress() {
    let progress = {
      'value': this.t208110evalue,
      'color': this.t208110ecolor,
      'status': this.t208110eStatus
    }
    return progress
  }

  sendUserCredentials(bn) {
    console.log("submitting charity form with the following values :::: ")
    let url = this.baseUrl + "charity-form/sendUserCreds/" + bn
    return this.http.get(url)
  }
}
