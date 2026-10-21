
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { AppSettings } from 'app/models/appsetting';
import { Delivery } from 'app/models/delivery';
import { loginModel } from 'app/models/login.model';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { AuthService } from 'app/services/auth/auth.service';
import { LoginService } from 'app/services/login/login.service';
import { error } from 'console';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.css']
})
export class VendorLoginComponent implements OnInit {
  VendorLogin: FormGroup;
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  delivery = new Delivery();
  div1: boolean = true;
  div2: boolean = false;
  div3: boolean = false;
  // siteKey: string = "6Ld_H3sbAAAAAARN_lMYL3LCVf4gKmSXnSWl-bea";
  siteKey: string = "6LdJzPYpAAAAAJyY_8qs7p1_D3hzMGvnSWLClRMZ";
  loginModel = new loginModel();
  data: any = [];
  mail: any = []
  flag = 0;
  panNo: string;
  emailID: string;
  isAuthenticationFailure: boolean = true;
  loginMessage: string
  email: any;
  submitted = false;
  timeDifference: number;
  milliSecondsInASecond: number = 1000;
  private subscription: Subscription;
  timerFlag: boolean = false;
  wrongotp: boolean = false;
  emailhere: string;
  errorMessage: boolean = false;
  emailmessage: string;
  loginMessage1: string;
  invalid: boolean = false;
  invalidmessage: any;
  message: string = "false";
  samplearray4: Array<Delivery> = [];
  otp: void;
  errorcode: string = "";

  constructor(private fb: FormBuilder, private router: Router, private LoginService: LoginService,
    private loaderservice: LoaderService, private route: ActivatedRoute, private authService: AuthService) {
    this.timeDifference = AppSettings.OTP_TIME;
    sessionStorage.removeItem("PROFILE_ACCESS")
  }

  public loginForm = new FormGroup({
    OTP: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]),
    Email: new FormControl(''),

    // TO ENABLE RE-CAPTCHA
    // recaptcha: new FormControl('', Validators.required) 
  });

  get f() { return this.loginForm.controls };

  ngOnInit(): void {
    sessionStorage.removeItem('portaltype');

    this.route.queryParams.subscribe(params => {
      this.message = params.order;
      this.errorcode = params.errorstatus;
    });

    if (this.message == "true") {
      if (this.errorcode == '408') {
        this.loginMessage = "Invalid session. Session timed out !!!"
        this.authService.logout();
        this.emailmessage = "null";
      }
      else {
        this.loginMessage = "Session expired. Please login !!! "
        this.authService.logout();
        this.emailmessage = "null";
      }
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    // debugger
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  ValidateEmail(event) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(event.target.value)) {
      // [<>=]{1,2}
      this.submitted = false;
      // console.log("true here");
      return (true)
    }
    this.submitted = true;
    // console.log("false here")
    return (false)
  }
  startTimer() {
    this.subscription = interval(this.milliSecondsInASecond)
      .subscribe(x => { this.getTimeDifference(0); });
  }
  private getTimeDifference(ref: number) {
    this.allocateTimeUnits(this.timeDifference, ref);
  }

  private allocateTimeUnits(timeDifference, ref: number) {
    this.timeDifference = timeDifference - 1;
    if (this.timeDifference == 0) {
      this.stopTimer()
    }
  }
  stopTimer() {
    this.subscription.unsubscribe();
    this.timerFlag = false
  }

  sendemailid(Email: string) {
    debugger
    this.loaderservice.show();
    this.timeDifference = AppSettings.OTP_TIME;

    this.loginForm.controls['OTP'].setValue(null);
    // this.loaderservice.show();
    this.loginMessage = "";
    if (!this.loginForm.controls.Email.valid) {
      this.submitted = true;
      return
    }

    let emailid = Email.toLowerCase();
    console.log(emailid);

    this.LoginService.vendorlogin(emailid, " ","").subscribe(res => {
      debugger
      this.loaderservice.hide();
      // console.log(res);
      if (res[0].StatusCode == '203') {
        this.loginMessage = res[0].message
      }
      else {
        // debugger
        sessionStorage.setItem("loginUser", emailid);
        // this.bussinesspartneroid = res[0].poData.BUSINESSPARTNEROID;
        // console.log("this.bussinesspartneroid ==> " + this.bussinesspartneroid);

        if ((res[0].StatusCode == '200')) {
          // debugger
          this.startTimer();
          this.timerFlag = true;
          this.otp = res[0].OTP;
          this.emailmessage = "otpsuccess";
          setTimeout(() => {
            this.loginMessage = "";
          },
            10000);
          this.loginMessage = "OTP sent successfully to your E-mail ID."
        } else {
          // debugger
          this.emailmessage = "otpfail";
          setTimeout(() => {
            this.loginMessage = "";

          }, 10000);
          // debugger
          this.loginMessage = "Email not delivered !!"
        }
        this.div1 = false;
        this.div2 = true
        this.div3 = true;
      }
    },
    err => {
      this.loaderservice.hide();
    });
    
  }

  clearform() {
    this.loginForm.controls.OTP.setValue(null)
    this.wrongotp = false;
    this.invalid = false;
  }

  login() {
    debugger
    this.loaderservice.show();
    this.loginModel.Email = this.loginForm.controls['Email'].value.toLowerCase();
    if (this.loginForm.controls.OTP.value != null){
      this.loginModel.OTP = this.loginForm.controls.OTP.value;
    }
    if (this.loginForm.status == 'VALID') {
      this.LoginService.VendorOTPCheck(this.loginModel.Email, this.loginModel.OTP).subscribe(res => {
        const accessKey = res.headers.get('Authorizationkey');
        const profileAccesKey = res.headers.get('Authorization');
        sessionStorage.setItem("requestid", res.body[0].RequestID);
        if (res.body[0].message == "Invalid OTP") {
          this.invalid = true;
          setTimeout(() => {
            this.invalidmessage = "";
          },
            10000);
          this.invalidmessage = res.body[0].message;
        }
        else if (res.body[0].message == "Valid Otp") {
          sessionStorage.setItem("PartnerOID", res.body[0].PARTNEROID);

          if (res != null || res != undefined) {
            if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
              sessionStorage.setItem('ACCESS_TOKEN', accessKey);
              sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
              sessionStorage.setItem("portaltype", "vendorregistration");
              setTimeout(() => {
                this.router.navigate(['/UploadDocument']);
              }, 100);
              this.loaderservice.hide();
            }
          }
        } else {
          this.loaderservice.hide();
          this.invalid = true;
          setTimeout(() => {
            this.invalidmessage = "";
          },
            10000);
          this.invalidmessage = res.body[0].message;
        }
      },
      error => {
        this.loaderservice.hide();
      })
    }
    // else {
    //   this.emailmessage = null;
    //   this.loginMessage = "Please Select Captcha"
    // }
  }
}
