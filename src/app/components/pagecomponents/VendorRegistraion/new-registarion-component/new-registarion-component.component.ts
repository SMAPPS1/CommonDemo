import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupComponent } from '../../../commoncomponents/popup/popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginService } from 'app/services/login/login.service';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { AuthService } from 'app/services/auth/auth.service';
@Component({
  selector: 'app-new-registarion-component',
  templateUrl: './new-registarion-component-new.component.html',
  styleUrls: ['./new-registarion-component.component.css']
})
export class NewRegistarionComponentComponent implements OnInit {
  registarion_form: FormGroup;
  Email:any=[];
  Mobile:any=[];
  buyerEmail :string;

  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router,public dialog: MatDialog, private LoginService:LoginService ,private loaderservice: LoaderService,) { }
  ngOnInit(): void {
    this.registarion_form =  this.fb.group({
      Email :[,[Validators.required,Validators.email]],
      Mobile_no: [,[Validators.required,Validators.maxLength(10),Validators.pattern('^[6-9][0-9]{9}$')]],

   });
   this.buyerEmail = sessionStorage.getItem('username');
  //  console.log(this.buyerEmail);
  }
  Submit(){
    debugger
    if(this.registarion_form.invalid){
      this.registarion_form.controls?.Email.markAsTouched();
      this.registarion_form.controls?.Mobile_no.markAsTouched();
      console.log(this.registarion_form)
    }else{
      debugger
      this.loaderservice.show();
      let email = this.registarion_form.controls?.Email.value
      let Mobile =this.registarion_form.controls?.Mobile_no.value
      console.log(this.registarion_form)
      this.LoginService.VendorRegistration(this.buyerEmail,email,Mobile).subscribe(res => {
        debugger
        this.loaderservice.hide();
        if(res[0].message=='Success'){
          debugger
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: res[0].Email,
            condition: 'note',
            page: 'information2',
            specific: 'note'
          };
        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: 'custom-modalbox',
          width: '500px',
          data: { datakey: dialogConfig.data }   
        });
        setTimeout(() => {
          this.router.navigate(['/internalTrackPO']).then(() => {
            // , { queryParams: { orderNo: this.forinternal } }
              // window.location.reload();
          });
      }, 3000);
        }else{
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: res[0].Email,
            condition: 'note',
            page: 'information2',
            specific: 'note'
          };
        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: 'custom-modalbox',
          width: '500px',
          data: { datakey: dialogConfig.data }
        });
        }
      }, error => {
        console.error("API call failed", error);
      });
    }
  }
}
