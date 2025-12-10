
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { PurchaseOrderListService } from "app/services/purchaseOrderList/purchaseorderlist.service";
import { event } from "jquery";
import { Location } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Delivery, Registraion } from "app/models/delivery";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { PopupComponent } from "app/components/commoncomponents/popup/popup.component";
import { AuthService } from "app/services/auth/auth.service";
import { ShareDataService } from "app/services/ShareData/share-data.service";
import { Subscription } from "rxjs";
import { LoginService } from "app/services/login/login.service";
import { LoaderService } from 'app/services/LoaderService/loader.service';



@Component({
  selector: "app-view-registration",
  templateUrl: "./view-registration.component.html",
  styleUrls: ["./view-registration.component.css"],
})
export class ViewRegistrationComponent implements OnInit {
  public FinalData: any[] = []; // Declare FinalData as a class property
  showEndUserTooltip:any[];
  status='P'
  NoDATA: boolean = false;
  EmailID: string;
 
  constructor(private router: Router, private LoginService: LoginService, private loaderservice: LoaderService
  ) {

  }
    ngOnInit(): void {
      debugger
    this.EmailID=sessionStorage.getItem('username')
    this.LoginService.vendorlogin(this.EmailID,'VendorList',"P").subscribe(data=>{
      console.log(data); // Log the response to check the structure
      // Check if data is an array and has at least one element
      if (Array.isArray(data) && data.length > 0) {
        debugger
        this.FinalData = data[0].vendorReqList || [];
        this.showEndUserTooltip = Array(this.FinalData.length).fill(false);
      } else {
        // this.NoDATA=true
        this.FinalData = [];
        console.warn('Unexpected data format or empty array');
      }
      console.log(this.FinalData); // Log the FinalData array
    },
    error => {
      console.error('Error fetching data', error); // Handle error
    }
    );
  }
  sortdata(status){
    debugger
    this.status=status
    this.loaderservice.show
    this.EmailID=sessionStorage.getItem('username')
    this.LoginService.vendorlogin(this.EmailID,'VendorList',status).subscribe(data=>{
      console.log(data); // Log the response to check the structure
      // Check if data is an array and has at least one element
      this.loaderservice.hide()
      if (Array.isArray(data) && data.length > 0) {
        debugger
        this.FinalData = data[0].vendorReqList || [];
        this.showEndUserTooltip = Array(this.FinalData.length).fill(false);
      } else {
        // this.NoDATA= 
        this.FinalData = [];
        console.warn('Unexpected data format or empty array');
      }
      console.log(this.FinalData); // Log the FinalData array
    },
    error => {
      console.error('Error fetching data', error); // Handle error
    }
    );
  }
  resirectregistration(data,event,status) {
    debugger
    console.log(event)
    sessionStorage.setItem("RequestID",JSON.stringify(event));
    sessionStorage.setItem("RegistrationType", data);
    sessionStorage.setItem("disabeleSubmit",status)
    this.router.navigate(['/profileGeneralData']);
  }
}
