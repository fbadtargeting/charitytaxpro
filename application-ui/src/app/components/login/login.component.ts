import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CharityNewUserDto } from 'src/app/dtos/CharityNewUserDto';
import { CharityUserAuthReq } from 'src/app/dtos/CharityUserAuthReq ';
import { CharityUserAuthResp } from 'src/app/dtos/CharityUserAuthResp';
import { CharityUserRegistrationResp } from 'src/app/dtos/CharityUserRegistrationResp';
import { CsServiceService } from 'src/app/services/cs-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SendCredsComponent } from '../send-creds/send-creds.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
    private dialog: MatDialog,
    public csService:CsServiceService) { }
    showSpinnerLogin: boolean = false
  ngOnInit() {
    this.showForgotPasswordMessage=false
    this.forgotPasswordMessage = ''
    this.showSpinnerLogin = false
  }

  loginResp:Observable<CharityUserAuthResp>
  validate(){
    let username = (<HTMLInputElement>document.getElementById('user_name')).value
    let pass = (<HTMLInputElement>document.getElementById('pass_word')).value
    if(username.length == 0 || pass.length == 0){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': 'Please enter values to login !!!',
          'amount': -11, 'amount2': 0
        }
      });
      return
    }
    console.log("VALIDATING")
    this.showSpinnerLogin = true
    let loginReq = new CharityUserAuthReq()
    loginReq.userName = username
    loginReq.password = pass
    this.loginResp = this.csService.authenticateUser(loginReq)
    this.loginResp.subscribe(item=>{
      if(item.isValid){
        console.log("received authenticate response : ")
        console.log(item)
        this.csService.user_id = item.userId
        this.csService.isSubmitted = item.isSubmitted
        this.csService.userName = item.userName
        this.csService.charityName = item.charityName
        this.router.navigateByUrl("t3010").then( e => {
          if(e){
            console.log("Navigation Successfull");
          }else{
            console.log("Navigation Failed !!");
          }
        });
      }else{
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '500px',
          data: {
            'message': item.message,
            'amount': -11, 'amount2': 0
          }
        });
      }
      this.showSpinnerLogin = false
    })
  }


  registerResponse:Observable<CharityUserRegistrationResp>
  register(){
    let registerDto = new CharityNewUserDto()
    let charityName = (<HTMLInputElement>document.getElementById('charityName')).value
    let userName = (<HTMLInputElement>document.getElementById('userName')).value
    let password = (<HTMLInputElement>document.getElementById('password')).value
    if(charityName){
      if(charityName.includes("RR")){
        if(charityName.split("RR")[0].length == 9){
          if(charityName.split("RR")[1].length == 4){

          }else{
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '500px',
              data: {
                'message': "BN Registration Number {9 Digits 2 Letters 4 Digits}",
                'amount': -11, 'amount2': 0
              }
            });
            return
          }
        }else{
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '500px',
            data: {
              'message': "BN Registration Number {9 Digits 2 Letters 4 Digits}",
              'amount': -11, 'amount2': 0
            }
          });
          return
        }
      }else{
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '500px',
          data: {
            'message': "Please adhere to the format of BN Registration Number Ex: {123456789RR1234}",
            'amount': -11, 'amount2': 0
          }
        });
        return
      }
    }else{
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': "Please enter BN Registration Number",
          'amount': -11, 'amount2': 0
        }
      });
      return
    }
    if(userName){

    }else{
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': "Please enter User Name",
          'amount': -11, 'amount2': 0
        }
      });
      return
    }
    if(password){

    }else{
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': "Please choose a password",
          'amount': -11, 'amount2': 0
        }
      });
      return
    }
    registerDto.charityName = charityName
    registerDto.userName = userName
    registerDto.password = password
    registerDto.emailId = (<HTMLInputElement>document.getElementById('emailId')).value
    this.registerResponse = this.csService.registerUser(registerDto)
    this.registerResponse.subscribe(item=>{
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          'message': item.message,
          'amount': -11, 'amount2': 0
        }
      });
    })
  }

  sendCredsResponse:Observable<any>
  showForgotPasswordMessage:boolean = false
  forgotPasswordMessage:string=''
  sendPassword(){
    this.showForgotPasswordMessage=false
    this.forgotPasswordMessage = ''
    console.log("Sending the password to the user")
    const dialogRef = this.dialog.open(SendCredsComponent, {
      width: '500px',
      data: {
        'message': 'Please enter the following information'
      }
    });
    dialogRef.afterClosed().subscribe(item => {
      if (item.event == 'submit') {
        console.log(item.data['bn'])
        this.sendCredsResponse = this.csService.sendUserCredentials(item.data['bn'].trim())
        this.sendCredsResponse.subscribe(event => {
          console.log(event)
          this.showForgotPasswordMessage = true
          if(event.status == "SUCCESS"){
            this.forgotPasswordMessage = "Please check your registered email for password."
          }else{
            this.forgotPasswordMessage = "Failed to send email."
          }
        })
      }
    })
  }

}
