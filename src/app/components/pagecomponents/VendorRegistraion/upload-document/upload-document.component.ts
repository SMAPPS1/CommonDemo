import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { PurchaseOrderListService } from "app/services/purchaseOrderList/purchaseorderlist.service";
import { event } from "jquery";
import { DatePipe, Location } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { catchError, filter } from "rxjs/operators";
import { Delivery, Registraion } from "app/models/delivery";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AdminLayoutComponent } from "app/layouts/admin-layout/admin-layout.component";
import { PopupComponent } from "app/components/commoncomponents/popup/popup.component";
import { AuthService } from "app/services/auth/auth.service";
import { ShareDataService } from "app/services/ShareData/share-data.service";
import { forkJoin, Subscription, throwError } from "rxjs";
import { LoaderService } from "app/services/LoaderService/loader.service";
import { InternalportalserviceService } from "app/services/internalportal/internalportalservice.service";
interface DropdownItem {
  id: string;
  value: string;
}

@Component({
  selector: "app-upload-document",
  templateUrl: "./upload-document-new.component.html",
  styleUrls: ["./upload-document.component.css"],
})
export class UploadDocumentComponent implements OnInit {

 
  UploadDocument: any;
  showfeilds: boolean = true;
  formdetails: any;
  showCheque: boolean = false;
  showfeilds1: boolean = false;
  showGST: boolean;
  viewUploadFile: any;
  viewAttachmentName: any;
  Pandata: any;
  GST: any;
  filecount: number = 0;
  multiplefilechanged: boolean;
  ArrayOfSelectedFile: any = [];
  ArrayOfSelectedFilename: any = [];
  ArrayOfSelectedSavedFile: any = [];
  multiplactualfilenamearray: any = [];
  multiplsavedfilenamearray: any;
  multipleactualendfilename: any;
  multiplesavedendfilename: any;
  individualsavedendname: any = [];

  RegistrationArray: Array<Registraion> = [];

  cancel: any;
  chechData: any;
  pancardfilename: any;
  GSTfilename: any;
  cancelledCheque: any;
  GSTData: any;
  registration = new Registraion();
  ganeralData: boolean = false;
  bankingData: boolean = false;
  SubmitData: string;
  receivedData: any;
  sharedDataSubscription: Subscription;
  Region:any=[];
  dropdownLists: { [key: string]: DropdownItem[] } = {
    typeOfindustr: [],
    BusinessType: [],
    title: [],
    Countrykey: [],
    // title:[],
  };
  // countryKeyList:s { id: string; value: string }[];
  Promoters: { id: string; value: string }[];
  Turnover: { id: string; value: string }[];
  MSMEDocu: any;
  MSMEStatusdrop: { id: string; value: string }[];
  requestID: string;
  MSMEDetails: any;
  pageflage: string;
  pageFlag: string;
  fieldsToValidate: string[];
  msmeflage: boolean=false;
  cCode: any;
  bankkey: any;
  WHTType: any;
  paymentMethodre: any;
  showMSME: boolean=false;
  showGSTUpload: boolean=false;
  TDSDocu: string;
  showTDS: boolean=false;
  // datePipe: any;
  constructor(
    private fb: FormBuilder,
    private purchaseOrderListService: PurchaseOrderListService,
    private location: Location,
    private router: Router,
    public dialog: MatDialog,
    public datePipe:DatePipe,
    private authService: AuthService,
    private shareData: ShareDataService,
    private loaderservice: LoaderService,
    private internalportalservice: InternalportalserviceService,
    private admin:AdminLayoutComponent
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if the NavigationEnd event corresponds to your component
        if (event.url.includes("/UploadDocument")) {
          // Push a new state to the browser's history to disable the back button
          this.location.go(event.url);
        }
      });
  }

  ngOnInit(): void {
    sessionStorage.removeItem('componentReloaded');
    sessionStorage.removeItem('componentReloaded2');
    sessionStorage.removeItem("PanData");
    sessionStorage.removeItem("cheque");
    sessionStorage.removeItem("GST");
    sessionStorage.removeItem("MSMEDetails");
    this.UploadDocument = this.fb.group({
      GSTattachments: [,],
      PANattachments: [null, Validators.required],
      ChequeAtt: [null, Validators.required],
      MSMEAtt: [,],
      TDSatt:[null,]
    });
    
  
    this.formdetails = this.fb.group({
      PanName: [,],
      Title: [null,],
      vendorName1: ["",],
      vendorName2: ["",],
      PanNumber: ["", Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")],
      AccNumber: ["",
      ],
      IFSCCODE: ["",],
      MICR: ["",],
      BankNAme: ["",],
      bankBrach: ["",],
      // AccHolderName:["",],
      GSTNumber: ["",Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")],
      Tradname: ["",],
      Address: ["",],
      Street1: ["",],
      Street2: ["",],
      Street3: ["",],
      Street4: ["",],
      City: ["",],
      PinCode: ["",],
      TelNo: [""],
      Mobile_No: ["",],
      Fax_no: ["",],
      Email_ID: ["",],
      countryKey: [null,Validators.required],
      region: [null,Validators.required],
      emailId1: ["", Validators.pattern(/^[a-zA-Z0-9](?!.*[!#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]{2})[^\s@]*[a-zA-Z0-9]@[^\s@]+\.[a-zA-Z]{2,}$/
)],
      emailId2: ["", Validators.pattern(/^[a-zA-Z0-9](?!.*[!#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]{2})[^\s@]*[a-zA-Z0-9]@[^\s@]+\.[a-zA-Z]{2,}$/
)],
      emailId3: ["", Validators.pattern(/^[a-zA-Z0-9](?!.*[!#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]{2})[^\s@]*[a-zA-Z0-9]@[^\s@]+\.[a-zA-Z]{2,}$/
)],
      emailId4: ["", Validators.pattern(/^[a-zA-Z0-9](?!.*[!#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]{2})[^\s@]*[a-zA-Z0-9]@[^\s@]+\.[a-zA-Z]{2,}$/
)],
      GeneralData: ["", Validators.required],
      BuissinessDataCheck: ["", Validators.required],
      swift_code: ["",],
      MSMEStatus: ["No"],
      MSMENO: ["",],
      TDSEXMP: ["",],
      TDSEXMPPer: ["",],
      TDSEXMPFrom: ["",],
      TDSEXMPTO: ["",],
      PFRegNo: ["",],
      ESIRegNo: ["",],
      TypeOfbuisiness: [null,],
      TypeOfIndustory: [null,Validators.required],
      Promoters: [null,],
      Turnover: ["",],
      TopClients: ["",],
      
      clientRef: ["",],
      emails: this.fb.array([this.createEmailControl()]),
      clients: this.fb.array([this.createEmailControl()]),
    },{ validators: this.validateExcepDates } );
    jQuery(".form-wizard-next-btn, .form-wizard-previous-btn").on(
      "click",
      function () {
        // jQuery('.form-wizard-steps li').removeClass('active');
        // jQuery(this).addClass('active');

        //first hide all other div
        jQuery(".wizard-fieldset").hide();
        var idBtn = jQuery(this).data("id");
        //now open the selected div
        jQuery("#" + idBtn).css("display", "block");
        jQuery(".form-wizard-steps li").removeClass("active");
        jQuery(`.form-wizard-steps li[data-id="${idBtn}"]`).addClass("active");
      }
    );
    this.Promoters = [
      { id: "ALL", value: "--Select---" },
      { id: "1M", value: "Last 1 Month" },
      { id: "3M", value: "Last 3 Months" },
      { id: "6M", value: "Last 6 Months" },
      { id: "1Y", value: "Last 1 Year" },
    ];
    this.MSMEStatusdrop = [
      
      { id: "Yes", value: "Yes" },
      { id: "No", value: "No" },
    ];
    this.Turnover = [
      { id: "1L", value: "1 Lakh to 50 Lakh" },
      { id: "2L", value: "50 Lakh 1 Cr" },
      { id: "1L", value: "1 Cr to 5 Cr" },
      { id: "10L", value: "above 5 Cr" },
    ];
    const dataTypes = Object.keys(this.dropdownLists);
    const requests$ = dataTypes.map((type) =>
      this.purchaseOrderListService.getAccountMaster(type).pipe(
        catchError((err) => {
          console.error(`Error fetching data for ${type}`, err);
          return throwError(err);
        })
      )
    );
    forkJoin(requests$).subscribe(
      (responses: any[]) => {
        ;
        responses.forEach((response, index) => {
          const dataType = dataTypes[index];
          if (response?.[0]?.IndustryList) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.IndustryList || []
            );
          } else if (response?.[0]?.TypeOfBusinessList) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.TypeOfBusinessList || []
            );
          } else if (response?.[0]?.TitleList) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.TitleList || []
            );
          }
           else if (response?.[0]?.countryList) {
            ;
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.countryList || []
            );
          }
           else {
            ;
            console.error(`Invalid API response for ${dataType}`, response);
          }
        });
        ;
        console.log("Dropdown lists:", this.dropdownLists); // Verify the contents of dropdownLists
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
    
  }
  transformResponse(data: any[]): DropdownItem[] {
    return data.map((item) => ({
      id: item[0] || "NA",
      value: item[1] || "NA",
    }));
  }
   validateExcepDates: ValidatorFn = (group: AbstractControl) => {
      const fromDate = group.get('TDSEXMPFrom')?.value;
      const toDate = group.get('TDSEXMPTO')?.value;
    
      if (fromDate && toDate && new Date(fromDate) >= new Date(toDate)) {
        group.get('TDSEXMPTO')?.setErrors({ dateInvalid: true });
        // this.formdetails.controls.BuissinessDataCheck.reset();
        return { dateInvalid: true };
      }
      
      return null;
    };
  get emailControls() {
    return (this.formdetails.get("emails") as FormArray).controls;
  }
  get CilentsControls() {
    return (this.formdetails.get("clients") as FormArray).controls;
  }

  createEmailControl(emailValue: string = ""): FormControl {
    ;
    console.log(emailValue);

    return this.fb.control(emailValue, Validators.required);
  }
  createClientsControls(clientValue: string = ""): FormControl {
    ;
    console.log(clientValue);
    return this.fb.control(clientValue, Validators.required);
  }
  
  addclient() {
    const clients = this.formdetails.get("clients") as FormArray;
  
    // Limit the number of clients to 5
    if (clients.length < 5) {
      // Add a new empty FormControl to the FormArray
      clients.push(this.createEmailControl(""));
  
      // Update the corresponding `top5Client` property based on the length
      this.updateTop5ClientProperties();
    }
  }
//   addclient(clientValue: string = "") {
//     const clints = this.formdetails.get("clients") as FormArray;
//     if (clints.length < 5) {
//       const newEmailControl = this.createEmailControl(clientValue); // Pass the email value to the createEmailControl function
//       clints.push(newEmailControl);
// debugger
//       switch (clints.length) {
//         case 1:
//           this.registration.top5Client = clientValue;
//           break;
//         case 2:
//           this.registration.top5Client1 = clientValue;
//           break;
//         case 3:
//           this.registration.top5Client2 = clientValue;
//           break;
//         case 4:
//           this.registration.top5Client3 = clientValue;
//           break;
//         case 5:
//           this.registration.top5Client4 = clientValue;
//           break;
//         default:
//           break;
//       }
//     }
//   }
removeclient(index: number) {
  const clients = this.formdetails.get("clients") as FormArray;

  // Remove the FormControl at the specified index
  if (clients.length > index) {
    clients.removeAt(index);

    // Update the `top5Client` properties after removal
    this.updateTop5ClientProperties();
  }
}

updateTop5ClientProperties() {
  debugger
  const clients = this.formdetails.get("clients") as FormArray;

  // Clear all `top5Client` variables
  this.registration.top5Client = "";
  this.registration.top5Client1 = "";
  this.registration.top5Client2 = "";
  this.registration.top5Client3 = "";
  this.registration.top5Client4 = "";

  // Map the clients FormArray values to the top5Client variables
  clients.controls.forEach((control, index) => {
    const value = control.value;
    switch (index) {
      case 0:
        this.registration.top5Client = value;
        break;
      case 1:
        this.registration.top5Client1 = value;
        break;
      case 2:
        this.registration.top5Client2 = value;
        break;
      case 3:
        this.registration.top5Client3 = value;
        break;
      case 4:
        this.registration.top5Client4 = value;
        break;
    }
  });
}

// Getter for `clients` controls to use in the template
get ClientsControls() {
  return (this.formdetails.get("clients") as FormArray).controls;
}
  addEmail(emailValue: string = "") {
    ;
    const emails = this.formdetails.get("emails") as FormArray;
    if (emails.length < 4) {
      const newEmailControl = this.createEmailControl(emailValue);
      emails.push(newEmailControl);
      // Assign email value to registration object based on the number of emails present
      switch (emails.length) {
        case 1:
          this.registration.emailId1 = emailValue || this.registration.emailId1;
          break;
        case 2:
          this.registration.emailId2 = emailValue;
          break;
        case 3:
          this.registration.emailId3 = emailValue;
          break;
        case 4:
          this.registration.emailId4 = emailValue;
          break;
      }
    }
  }
  updateEmailInRegistration(index: number, emailValue: string) {
    switch (index) {
      case 0:
        this.registration.emailId1 = emailValue;
        break;
      case 1:
        this.registration.emailId2 = emailValue;
        break;
      case 2:
        this.registration.emailId3 = emailValue;
        break;
      case 3:
        this.registration.emailId4 = emailValue;
        break;
    }
  }
  removeEmail(index: number) {
    const emails = this.formdetails.get("emails") as FormArray;
    if (emails.length > 0) {
      emails.removeAt(index);

      // Update registration object to remove email
      switch (index) {
        case 0:
          this.registration.emailId1 = "";
          break;
        case 1:
          this.registration.emailId2 = "";
          break;
        case 2:
          this.registration.emailId3 = "";
          break;
        case 3:
          this.registration.emailId4 = "";
          break;
      }

      // Shift the remaining email IDs if needed
      for (let i = index; i < emails.length; i++) {
        this.registration[`emailId${i + 1}`] =
          this.registration[`emailId${i + 2}`];
      }
      delete this.registration[`emailId${emails.length + 1}`];
    }
  }

  getEmailValue(index: number): string {
    const emails = this.formdetails.get("emails") as FormArray;
    const emailControl = emails.at(index);
    return emailControl ? emailControl.value : "";
  }

  // removeEmail(index: number) {
  //   const emails = this.formdetails.get("emails") as FormArray;
  //   if (emails.length > 1) {
  //     emails.removeAt(index);
  //   }
  // }

  onFileSelectEvent(event: any, type: string) {
    this.requestID = sessionStorage.getItem("requestid");
    this.viewUploadFile = event.target.files[0];
    console.log("this.filecount " + this.filecount);
    var specialChars = "<>@!#$%^&*()+[]{}?:;_|'\"\\,/~`-=";
    var checkForSpecialChar = function (string) {
      for (var j = 0; j < specialChars.length; j++) {
        if (string.indexOf(specialChars[j]) > -1) {
          return true;
        }
      }
      return false;
    };
    if (checkForSpecialChar(this.viewUploadFile.name)) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: "Filename can have spaces but no special characters",
        condition: "error",
        page: "invoicesubmit",
      };
      const mydata = dialogConfig.data;
      console.log("PopupComponent", mydata);

      const dialogRef = this.dialog.open(PopupComponent, {
        panelClass: "custom-modalbox",

        width: "400px",
        data: { datakey: dialogConfig.data },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result1: ${result}`);
      });

      // this.filecount -= 1
      // this.filecount = this.filecount - 1;
      return;
    }
    switch (type) {
      case "PanCard":
        this.pancardfilename =
          this.requestID + "_" + "PAN" + "_" + this.viewUploadFile.name;
        // 165_PAN_vardanissues.pdf
        sessionStorage.removeItem("PanData");
        this.callApi(this.viewUploadFile, this.pancardfilename, "PAN");
        this.UploadDocument.get("PANattachments").clearValidators();
        this.UploadDocument.get("PANattachments").updateValueAndValidity();
        type = null;
        break;
      case "GST":
        this.GSTfilename =
          this.requestID + "_" + "GST" + "_" + this.viewUploadFile.name;
          sessionStorage.removeItem("GST");
        this.callApi(this.viewUploadFile, this.GSTfilename, "GST");
        this.UploadDocument.get("GSTattachments").clearValidators();
        this.UploadDocument.get("GSTattachments").updateValueAndValidity();
        type = null;
        break;
      case "Cancelled":
        this.cancelledCheque =
          this.requestID + "_" + "Cheque" + "_" + this.viewUploadFile.name;
          sessionStorage.removeItem("cheque");
        this.callApi(this.viewUploadFile, this.cancelledCheque, "");
        this.UploadDocument.get("ChequeAtt").clearValidators();
        this.UploadDocument.get("ChequeAtt").updateValueAndValidity();
        break;
      case "TDSatt":
        debugger
        this.TDSDocu =
          this.requestID + "_" + "TSD" + "_" + this.viewUploadFile.name;
          // sessionStorage.removeItem("MSMEDetails");
        this.callApi(this.viewUploadFile, this.TDSDocu, "TSD");
        this.UploadDocument.get("TDSatt").clearValidators();
        this.UploadDocument.get("TDSatt").updateValueAndValidity();
        type = null;

        break;
      case "MSME":
        this.MSMEDocu =
          this.requestID + "_" + "MSME" + "_" + this.viewUploadFile.name;
          sessionStorage.removeItem("MSMEDetails");

        this.callApi(this.viewUploadFile, this.MSMEDocu, "MSME");
        this.UploadDocument.get("MSMEAtt").clearValidators();
        this.UploadDocument.get("MSMEAtt").updateValueAndValidity();
        break;
      default:
        break;
    }
  }
  close(type: string) {
    ;
    if (type == "PAN") {
      this.pancardfilename = "";
      this.UploadDocument.controls["PANattachments"].reset();
      this.UploadDocument.get("PANattachments").setValidators([
        Validators.required,
      ]);
      // this.UploadDocument.get('PANattachments').setValidators([Validators.required]);
      this.UploadDocument.get("PANattachments").updateValueAndValidity();
      // sessionStorage.removeItem("PANfilename");
      sessionStorage.removeItem("PanData");
    } else if (type == "GST") {
      this.GSTfilename = "";
      this.UploadDocument.controls["GSTattachments"].reset();
      // this.UploadDocument.get("GSTattachments").setValidators([
      //   Validators.required,
      // ]);
      this.UploadDocument.get("GSTattachments").updateValueAndValidity();
      sessionStorage.removeItem("GST");
    } else if (type == "MSME") {
      this.MSMEDocu = "";
      this.UploadDocument.controls["MSMEAtt"].reset();
      this.UploadDocument.get("MSMEAtt").setValidators([Validators.required]);
      this.UploadDocument.get("MSMEAtt").updateValueAndValidity();
      sessionStorage.removeItem("MSMEDetails");

      // this.UploadDocument.get("MSMEAtt").setValidators([
      //   Validators.required,
      // ]);
    } else if(type =="TDSatt"){
      this.TDSDocu = "";
      this.UploadDocument.controls["TDSatt"].reset();
      this.UploadDocument.get("TDSatt").setValidators([Validators.required]);
      this.UploadDocument.get("TDSatt").updateValueAndValidity();
    }
    else {
      this.cancelledCheque = "";
      this.UploadDocument.controls["ChequeAtt"].reset();
      this.UploadDocument.get("ChequeAtt").setValidators([Validators.required]);
      this.UploadDocument.get("ChequeAtt").updateValueAndValidity();
      sessionStorage.removeItem("cheque");
    }
    // this.UploadDocument.reset()
  }
  callApi(viewUploadFile, viewAttachmentName, type) {
    this.loaderservice.show();
    this.purchaseOrderListService
      .fileupload1(viewUploadFile, viewAttachmentName)
      .subscribe((res) => {
        // ;
        this.loaderservice.hide();
        console.log(JSON.stringify(res));
        if (res[0]?.message == "File Extension not allowed") {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message:
              "The file extension used is not valid.<br> Please use only .jpg and .png file extensions.",
            condition: "success",
            page: "invoicesubmit",
            specific: "note",
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);
          const dialogRef = this.dialog.open(PopupComponent, {
            panelClass: "custom-modalbox",
            width: "600px",
            data: { datakey: dialogConfig.data },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.close(type);
            // this.router.navigate(["/login"]).then(() => {
            //   this.authService.logout();
            //   sessionStorage.removeItem("loginUser");
            // });
          });
          // this.SubmitData=sessionStorage.getItem('Submit')
        }
        if (res[0]?.PANCARD) {
          sessionStorage.setItem("PanData", JSON.stringify(res[0]?.PANCARD[0]));
        } else if (res[0]?.BankDetails) {
          // ;
          sessionStorage.setItem(
            "cheque",
            JSON.stringify(res[0]?.BankDetails[0])
          );
        } else if (res[0]?.MSMEDetails) {
          sessionStorage.setItem(
            "MSMEDetails",
            JSON.stringify(res[0]?.MSMEDetails)
          );
        } else {
          sessionStorage.setItem("GST", JSON.stringify(res[0]?.GSTDetails[0]));
        }
        this.loaderservice.hide();
      });
  }
  emails: string[] = [""]; // Initialize with one input field
  SubmitDocument() {
    if (this.UploadDocument.invalid) {
      //   ;
      // this.showfeilds = false;
      // this.showfeilds1 = true;
      // this.showCheque = false;
      // this.showGST = false;
      
      this.UploadDocument.controls?.PANattachments.markAsTouched();
      this.UploadDocument.controls?.GSTattachments.markAsTouched();
      this.UploadDocument.controls?.ChequeAtt.markAsTouched();
    } else {
      ;
     ` // const formData = this.UploadDocument.value;
      // localStorage.setItem('formData', JSON.stringify(formData));`
      this.UploadDocument;
      this.showfeilds = false;
      this.showfeilds1 = true;
      this.showCheque = false;
      this.showGST = false;
      sessionStorage.setItem("Submit", "uploaddocument");
      this.Pandata = JSON.parse(sessionStorage.getItem("PanData"));
      this.GSTData = JSON.parse(sessionStorage.getItem("GST"));
      // this.formdetails.controls.vendorName1.setValue(this.Pandata.NAME);
      this.formdetails.controls.vendorName1.setValue(this.GSTData?.Legal_Name ||""      );
      this.formdetails.controls.PanNumber.setValue(this.Pandata?.PANNUMBER ||""  );
      const address = this.GSTData?.Address_of_Principal_Place_of;
      const postalCodePattern = /\b\d{6}\b/;
      const postalCodeMatch = address?.match(postalCodePattern);
      const postalCode = postalCodeMatch ? postalCodeMatch[0] : null;
      const addressParts = address?.split(",").map((part) => part.trim()) || [];
      const firstPart = addressParts?.slice(0, 3).join(", ");
      const cityEXt = addressParts[addressParts?.length - 2];
      console.log("City:", cityEXt); // Output the city
      console.log("Postal Code:", postalCode);
      this.formdetails.controls.City.setValue(cityEXt ||""  );
      this.formdetails.controls.PinCode.setValue(postalCode ||""  );
      // this.formdetails.controls.Street1.setValue(firstPart ||""  );
      this.formdetails.controls.Street1.setValue(this.GSTData?.Street1 ||"")  
      this.formdetails.controls.Street2.setValue(this.GSTData?.Street2 || "")
      // this.formdetails.controls.Street2.setValue(this.GSTData?.Street2 || "")
      this.formdetails.controls.Street3.setValue(this.GSTData?.Street3 || "")
      this.formdetails.controls.Street4.setValue(this.GSTData?.Street4 || "")
    }
  }
  // MSMENOVlaue(event) {
  //   this.formdetails.controls.MSMEStatus.setValue("Yes");
  //   console.log(this.formdetails.msmeStatus.value);
  //   if (this.formdetails.controls.msmeStatus.value == "No") {
  //     this.formdetails.controls.msmeNo.setValue(null);
  //     this.formdetails.controls.msmeNo.updateValueAndValidity();
  //   } else {
  //     this.formdetails.controls.msmeNo.setValidators([Validators.required]);
  //     this.formdetails.controls.msmeNo.updateValueAndValidity();
  //     // this.showMSME=true
  //   }
  // }

  MSMENOVlaue(event: any) {
    debugger
    const inputValue = this.formdetails.controls.MSMENO.value?.trim(); // get input value
  
    if (inputValue) {
      // If user has entered something
      this.formdetails.controls.MSMEStatus.setValue("Yes");
      this.formdetails.controls.MSMENO.setValidators([Validators.required]);
      this.formdetails.controls.MSMENO.updateValueAndValidity();
      this.UploadDocument.controls.MSMEAtt.setValidators([Validators.required]);
      this.UploadDocument.controls.MSMEAtt.updateValueAndValidity();
      this.showMSME = true;  // SHOW upload section
    } else {
      // If user cleared the input
      this.formdetails.controls.MSMEStatus.setValue("No");
      this.formdetails.controls.MSMENO.clearValidators();
      this.formdetails.controls.MSMENO.updateValueAndValidity();
      // this.UploadDocument.controls.MSMEAtt.setValidators([null]);
      // this.UploadDocument.controls.MSMEAtt.updateValueAndValidity();
      this.UploadDocument.controls.MSMEAtt.reset();
      // this.close('MSME')
      this.UploadDocument.controls.MSMEAtt.clearValidators();
    this.UploadDocument.controls.MSMEAtt.updateValueAndValidity();

      this.showMSME = false;  // HIDE upload section
    }
  }

  showGSTDocument(){
    const gstValue = this.formdetails.controls.GSTNumber.value?.trim();

  if (gstValue) {
    this.showGSTUpload = true;  // Show Upload Section
    this.UploadDocument.controls.GSTattachments.setValidators([Validators.required]);
    this.UploadDocument.controls.GSTattachments.updateValueAndValidity();
  } else {
    this.showGSTUpload = false; // Hide Upload Section
    this.UploadDocument.controls.GSTattachments.reset();
    // this.close('GST')
    this.UploadDocument.controls.GSTattachments.clearValidators();
    this.UploadDocument.controls.GSTattachments.updateValueAndValidity();
  }
  }
  ShowTDS(){
        const TSD = this.formdetails.controls.TDSEXMP.value?.trim();
if (TSD) {
    this.showTDS = true;  // Show Upload Section
    this.UploadDocument.controls.TDSatt.setValidators([Validators.required]);
    this.UploadDocument.controls.TDSatt.updateValueAndValidity();
  } else {
    this.showTDS = false; // Hide Upload Section
    this.UploadDocument.controls.TDSatt.reset();
    // this.close('GST')
    this.UploadDocument.controls.TDSatt.clearValidators();
    this.UploadDocument.controls.TDSatt.updateValueAndValidity();
  }
  }
  
  GONext(type) {
    debugger
    if (type === "PAN") {
      const fieldsToValidate = [
        "vendorName1",
        "PanNumber",
        "City",
        "PinCode",
        "Street1",
        // "TelNo",
        "Mobile_No",
        "Email_ID",
        "GeneralData",
      ];
      fieldsToValidate.forEach((fieldName) => {
        const control = this.formdetails.controls[fieldName];
        if (fieldName === "Mobile_No") {
          control.setValidators([
            Validators.required,
            Validators.pattern("^[6-9][0-9]{9}$"),
          ]);
        } else if (fieldName === "Email_ID") {
          control.setValidators([
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9](?!.*[!#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]{2})[^\s@]*[a-zA-Z0-9]@[^\s@]+\.[a-zA-Z]{2,}$/
),
          ]);
        } else if (fieldName === "TelNo") {
          control.setValidators([
            Validators.required,
            Validators.pattern("^[0-9]+$"),
            Validators.minLength(10),
          ]); // Example: Pattern for only numbers
        } else if (fieldName === "PinCode") {
          control.setValidators([
            Validators.required,
            Validators.pattern("^[0-9]+$"),
          ]); // Example: Pattern for only numbers
        }else if(fieldName =="PanNumber"){
          control.setValidators([
            Validators.required,
            Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}"),
            Validators.minLength(10),
            Validators.maxLength(10)
          ]);  
        }
        else {
          control.setValidators([Validators.required]);
        }
        control.updateValueAndValidity();
        if (control.invalid) {
          control.markAsTouched();
        }
      });

      if (fieldsToValidate.some((fieldName) => this.formdetails.get(fieldName).hasError("required")) || fieldsToValidate.some((fieldName) =>this.formdetails.get(fieldName).hasError("pattern") || fieldsToValidate.some((fieldName) =>this.formdetails.get(fieldName).hasError("minlength"))  )
      ) {
    
        this.formdetails.markAllAsTouched();
        return;
      }
      //   const control = this.formdetails.controls[fieldName];
      //   if (control.invalid) {
      //     control.setValidators([Validators.required]);
      //     control.updateValueAndValidity();
      //     // if(control == "Mobile_No"){
      //     //   this.formdetails.controls["Mobile_No"].setErrors({ 'pattern': true });
      //     // }
      //     console.log(control);
      //     // this.ganeralData=truey
      //   }
      // });
      // if (
      //   fieldsToValidate.some(
      //     (fieldName) => this.formdetails.get(fieldName).hasError('required') || this.formdetails.get(fieldName).hasError('pattern')
      //   )
      // ) {
      //   this.formdetails.markAllAsTouched();
      //   return;
      // }
      this.showCheque = true;
      this.showfeilds1 = false;
      this.showfeilds = false;
      this.showGST = false;
      sessionStorage.setItem("Submit", "general");
      // this.pushState();
      // this.chechData = JSON.parse(sessionStorage.getItem("cheque"));
      // this.MSMEDetails = JSON.parse(sessionStorage.getItem("MSMEDetails"));
      // this.GSTData = JSON.parse(sessionStorage.getItem("GST"));
      // this.formdetails.controls.MICR.setValue(this.chechData?.MICR ||""  );
      // this.formdetails.controls.AccNumber.setValue(
      //   this.chechData?.AccountNumber ||""  
      // );
      // this.formdetails.controls.bankBrach.setValue(this.chechData?.BankBranch || ""  );
      // this.formdetails.controls.BankNAme.setValue(this.chechData?.BankName || ""  );
      // this.formdetails.controls.IFSCCODE.setValue(this.chechData?.IFSCCode || ""  );
      // this.formdetails.controls.GSTNumber.setValue(
      //   this.GSTData?.Registration_Number || ""  
      // );
      // this.formdetails.controls.MSMENO.setValue(this.MSMEDetails?.msme_number || ""  );
      // if (this.MSMEDetails?.msme_number) {
      //   this.formdetails.controls.MSMEStatus.setValue("Yes");
      // }
    } else if (type === "Cheque") {
      debugger
      // this.CallPanGSTVALIDATION();

      
      this.fieldsToValidate = [];
      const fieldsToValidate = [
        "AccNumber",
        "IFSCCODE",
        "GSTNumber",
        "BuissinessDataCheck",
        "BankNAme"
      ];
      debugger
      fieldsToValidate.forEach((fieldName) => {
        debugger
        const control = this.formdetails.controls[fieldName];
        if (fieldName === "AccNumber") {
          control.setValidators([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9]*$"),
          ]);
        } else if (fieldName === "IFSCCODE") {
          control.setValidators([
            Validators.required,
            Validators.pattern(""),
          ]);
        } else if (fieldName === "GSTNumber") {
          debugger
          control.setValidators([
            // Validators.required,
            Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"),
          ]); // Example: Pattern for only numbers
        } else if(fieldName =="BankNAme"){
          control.setValidators([
            Validators.required,
            Validators.pattern(""),
          ]);
        }
        else if (fieldName === "msmeno") {
          if (this.formdetails.controls.MSMEStatus.value === "yes") {
            control.setValidators([Validators.required]); // Make msmeno required
          } else {
            control.clearValidators(); // Remove validators for msmeno
          }
        }
        else {
          control.setValidators([Validators.required]);
        }
        control.updateValueAndValidity();
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      if (!this.checkDocumentAttachments()) {
        this.formdetails.markAllAsTouched();
        return;
      }
      debugger
      if(this.formdetails.get('MSMENO').hasError('required')){
        this.formdetails.markAllAsTouched();
        return
      }
      if (
        fieldsToValidate.some((fieldName) =>
          this.formdetails.get(fieldName).hasError("required")
        ) || fieldsToValidate.some((fieldName) =>this.formdetails.get(fieldName).hasError("pattern")  )
      ) {
        debugger
        this.formdetails.markAllAsTouched();
        return;
      }
      if (this.formdetails.hasError('dateInvalid')) {
        this.formdetails.markAllAsTouched();
        return;
      }
      this.showGST = true;
      this.showCheque = false;
      this.showfeilds1 = false;
      this.showfeilds = false;
      // this.pushState();
      sessionStorage.setItem("Submit", "bank");
    }
  }

  CallPanGSTVALIDATION(){
    this.purchaseOrderListService.GetPanGstVal(this.formdetails.controls.PanNumber?.value,this.formdetails.controls.GSTNumber?.value).subscribe((result) => {
      debugger
      console.log(result);  
      if(result[0].message == "Warning! Duplicate PAN number with different GSTN number."){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: result[0].message,
          condition: "success",
          page: "invoicesubmit",
          specific: "note",
        };
        const mydata = dialogConfig.data;
        console.log("PopupComponent", mydata);
        
        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: "custom-modalbox",
          width: "400px",
          data: { datakey: dialogConfig.data },
        });
      }
    })

  }
  checkPan(){
    debugger
    this.formdetails.controls.BuissinessDataCheck.reset();
  }
  mobilecheck(event) {
    console.log(this.formdetails.controls.Mobile_No);
  }
  // onCheckboxChange(formControlName: string) {
  //   ;
  //   const controlValue = this.formdetails.get(formControlName)?.value;
  //   const generalDataControl = this.formdetails.get('GeneralData');
  //   if (controlValue) {
  //     if (generalDataControl) {
  //       generalDataControl.clearValidators();  
  //       generalDataControl.updateValueAndValidity(); 
  //     }
  //   } else {
  //     if (generalDataControl) {
  //       generalDataControl.setValidators([Validators.required]); 
  //       generalDataControl.updateValueAndValidity(); 
  //     }
  //   }
  //   if (generalDataControl) {
  //     generalDataControl.markAsTouched();
  //   }
  // }
  GetRegion(event: Event, type: string,data?: any) {
    debugger
    this.loaderservice.show();
    if (type == null) {
      this.cCode = this.formdetails.get("countryKey").value;
    } else {
      this.cCode = event;
    }
    if (type === "bank") {
      this.cCode = this.formdetails.get("BankCountry").value;
    }else{
      if(type == null){
        this.cCode = this.formdetails.get("countryKey").value;
        type= null
      }else{
        this.cCode = event
        type="bank"
      }     
    }
  
    this.purchaseOrderListService.GetRigionMAster(this.cCode, type).pipe(
      catchError((err) => {
        console.error(`Error fetching data for region`, err);
        return throwError(err);
      })
    ).subscribe((response: any) => {
  
      // Handle bank data safely
      if (type === "bank" && response.bankKeyDetails[0]?.BankKeyList) {
        this.bankkey = response.bankKeyDetails[0]?.BankKeyList.map(key => ({
          id: key?.[0]  || "NA", // Use optional chaining and nullish coalescing for safety
          value: key?.[1] || "NA"
          
        }));
      }
      if ( type === "bank" && response.withTtype[0]?.WHTTypeList
      ) {
        this.WHTType = response.withTtype[0]?.WHTTypeList
        .map(key => ({
          id: key?.[0] || "NA", // Use optional chaining and nullish coalescing for safety
          value: key?.[1] || "NA",
          desc:key?.[2] || "NA"
        }));
        console.log(this.WHTType);
        if (data?.whTaxList) {
          data.whTaxList.forEach((item: any) => {
            // this.rows.push(this.createRow(item));
          });
          // this.removeRow(0);
        }
        
      } else {
        console.warn("WHTType is not present in the regionMaster", response);
      }
      // Handle region data safely (updated to correct path)
      if (response?.regionMaster?.[0]?.RegionList) {  // Accessing response.regionMaster[0].RegionList
        this.Region = response.regionMaster[0].RegionList.map(region => ({
          code: region?.[0] || "NA",  // Use optional chaining and nullish coalescing
          id: region?.[1] || "NA",
          value: region?.[2] || "NA"
        }));
        console.log(this.Region);
      } else {
        console.warn("RegionList is not present in the regionMaster", response);
      }
  
      // Handle payment method house list data safely
      if (response?.paymentMaster?.[0]?.HouseList) { // Make sure paymentMaster and HouseList exist
        this.paymentMethodre = response.paymentMaster[0].HouseList.map(key => ({
          id: key?.[0] || "NA",  // Use optional chaining and nullish coalescing
          value: key?.[1] || "NA"
        }));
        console.log(this.paymentMethodre);
      } else {
        console.warn("HouseList is not present in the paymentMaster", response);
      }
      this.loaderservice.hide();
    });
  }
  // onCheckboxChange(formControlName: string) {
  //   ;
  //   const controlValue = this.formdetails.get(formControlName)?.value;
  //   const generalDataControl = this.formdetails.get(formControlName);
  
  //   if (controlValue) {
  //     // Checkbox is checked: Remove validators
  //     if (generalDataControl) {
  //       generalDataControl.clearValidators();
  //       generalDataControl.updateValueAndValidity(); // Update validity after clearing validators
  //     }
  //   } else {
  //     // Checkbox is unchecked: Add required validator
  //     if (generalDataControl) {
  //       generalDataControl.setValidators([Validators.required]);
  //       generalDataControl.updateValueAndValidity(); // Update validity after setting validators
        
  //       // If the value is empty, force invalid state
  //       if (!generalDataControl.value || generalDataControl.value === '') {
  //         generalDataControl.setValue(''); // Reset the value explicitly to trigger validation
  //       }
  //     }
  //   }
  
  //   // Mark the control as touched to trigger validation messages
  //   if (generalDataControl) {
  //     generalDataControl.markAsTouched();
  //   }
  //   if(formControlName === 'BuissinessDataCheck'){
  //     this.CallPanGSTVALIDATION();
  //   }
  // }

   onCheckboxChange(formControlName: string) {
    ;
    const controlValue = this.formdetails.get(formControlName)?.value;
    const generalDataControl = this.formdetails.get(formControlName);

    if (controlValue) {
      // Checkbox is checked: Remove validators
      if (generalDataControl) {
        generalDataControl.clearValidators();
        generalDataControl.updateValueAndValidity(); // Update validity after clearing validators
      }
    } else {
      // Checkbox is unchecked: Add required validator
      if (generalDataControl) {
        generalDataControl.setValidators([Validators.required]);
        generalDataControl.updateValueAndValidity(); // Update validity after setting validators

        // If the value is empty, force invalid state
        if (!generalDataControl.value || generalDataControl.value === '') {
          generalDataControl.setValue(''); // Reset the value explicitly to trigger validation
        }
      }
    }

    // Mark the control as touched to trigger validation messages
    if (generalDataControl) {
      generalDataControl.markAsTouched();
    }
    if (formControlName === 'BuissinessDataCheck') {
      this.CallPanGSTVALIDATION();
    }
  }
  checkDocumentAttachments() {
    let isValid = true;
  
    // Check if PANattachments is required and has a file attached
    if (this.UploadDocument.controls.PANattachments.hasError('required') && !this.UploadDocument.controls.PANattachments.value) {
      isValid = false;
      this.UploadDocument.controls.PANattachments.markAsTouched();
    }
  
    // Check if ChequeAtt is required and has a file attached
    if (this.UploadDocument.controls.ChequeAtt.hasError('required') && !this.UploadDocument.controls.ChequeAtt.value) {
      isValid = false;
      this.UploadDocument.controls.ChequeAtt.markAsTouched();
    }
  
    // Check if MSMEAtt is required and has a file attached
    if (this.UploadDocument.controls.MSMEAtt.hasError('required') && !this.UploadDocument.controls.MSMEAtt.value) {
      isValid = false;
      this.UploadDocument.controls.MSMEAtt.markAsTouched();
    }
  
    // Check if GSTattachments is required and has a file attached
    if (this.UploadDocument.controls.GSTattachments.hasError('required') && !this.UploadDocument.controls.GSTattachments.value) {
      isValid = false;
      this.UploadDocument.controls.GSTattachments.markAsTouched();
    }
    if (this.UploadDocument.controls.TDSatt.hasError('required') && !this.UploadDocument.controls.TDSatt.value) {
      isValid = false;
      this.UploadDocument.controls.TDSatt.markAsTouched();
    }
  
    return isValid;
  }
  
  
  
  
  
  // submit1() {
  //   debugger
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.data = {
  //     message: "Are you sure you want to submit the Data",
  //     condition: "Confirmation",
  //     page: "invoicesubmit",
  //     specific: "SubmitVenodr",
  //   };
  //   const mydata = dialogConfig.data;
  //   console.log("PopupComponent", mydata);
  //   const dialogRef = this.dialog.open(PopupComponent, {
  //     panelClass: "custom-modalbox",
  //     width: "400px",
  //     data: { datakey: dialogConfig.data },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     debugger
  //     if (this.sharedDataSubscription) {
  //       debugger
  //       this.sharedDataSubscription.unsubscribe();
  //       this.receivedData=null
  //     }
  //     this.sharedDataSubscription = this.shareData.sharedData$.subscribe(
  //       (data) => {
  //         this.receivedData = data;
  //         if (this.receivedData === "submit_Registration") {
  //           this.Submit(); 
  //         }
  //         this.receivedData = " ";
  //       }
  //     );
  //   });
  // }
  submit1() {
    debugger;
    if(this.formdetails.controls.TypeOfIndustory.value==null || this.formdetails.controls.TypeOfIndustory.value=="" ){ 
      this.formdetails.controls.TypeOfIndustory.markAsTouched();
      return;
    }
    this.updateTop5ClientProperties();
    console.log(this.registration);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: "Are you sure you want to submit the Data",
      condition: "Confirmation",
      page: "invoicesubmit",
      specific: "SubmitVenodr",
    };
    const mydata = dialogConfig.data;
    console.log("PopupComponent", mydata);
    
    const dialogRef = this.dialog.open(PopupComponent, {
      panelClass: "custom-modalbox",
      width: "400px",
      data: { datakey: dialogConfig.data },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      debugger;
      if (result?.return) {
        if (this.sharedDataSubscription) {
          this.sharedDataSubscription.unsubscribe();
        }
        this.sharedDataSubscription = this.shareData.sharedData$.subscribe((data) => {
          if (data === "submit_Registration") {
            this.Submit(); 
          }
        });
      }
    });
  }
  
  onOptionsSelected(event) {
    if (event == "Yes") {
      this.formdetails.controls.MSMENO.setValidators([Validators.required]);
      this.formdetails.controls.MSMENO.updateValueAndValidity();
      this.msmeflage=true
    } else {
      this.msmeflage=false

      this.formdetails.controls.MSMENO.setValue(null);
      this.formdetails.controls.MSMENO.clearValidators();
      this.formdetails.controls.MSMENO.updateValueAndValidity();
    }
    console.log(event);
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.sharedDataSubscription) {
      this.sharedDataSubscription.unsubscribe();
    }
  }

  Submit() {
    // this.loaderservice.();
    this.registration.bankAcNo = this.formdetails.controls.AccNumber.value;
    this.registration.requesteroId = sessionStorage.getItem("requestid");
    this.registration.city = this.formdetails.controls.City.value;
    this.registration.clientsReferences =
      this.formdetails.controls.clientRef.value;
    this.registration.emailId = this.formdetails.controls.Email_ID.value;
    this.registration.emailId1 = this.formdetails.controls.emailId1.value;
    this.registration.emailId2 = this.formdetails.controls.emailId2.value;
    this.registration.emailId3 = this.formdetails.controls.emailId3.value;
    this.registration.emailId4 = this.formdetails.controls.emailId4.value;
    this.registration.esiRegistrationNo =
      this.formdetails.controls.ESIRegNo.value;
    this.registration.faxNo = this.formdetails.controls.Fax_no.value;
    this.registration.gstNumber = this.formdetails.controls.GSTNumber.value;
    this.registration.ifscCode = this.formdetails.controls.IFSCCODE.value;
    this.registration.mobileNo = this.formdetails.controls.Mobile_No.value;
    this.registration.msmeNo = this.formdetails.controls.MSMENO.value;
    this.registration.msmeStatus = this.formdetails.controls.MSMEStatus.value;
    this.registration.panNumber = this.formdetails.controls.PanNumber.value;
    this.registration.pfRegistrationNo =
      this.formdetails.controls.PFRegNo.value;
    this.registration.pinCode = this.formdetails.controls.PinCode.value;
    this.registration.promoters = this.formdetails.controls.Promoters.value;
    ;
    this.registration.turnOver = this.formdetails.controls.Turnover.value;
    this.registration.streetL1 = this.formdetails.controls.Street1.value;
    this.registration.streetL2 = this.formdetails.controls.Street2.value;
    this.registration.streetL3 = this.formdetails.controls.Street3.value;
    this.registration.streetL4 = this.formdetails.controls.Street4.value;
    this.registration.swiftCode = this.formdetails.controls.swift_code.value;
    this.registration.tdsExemptionFrom =this.datePipe.transform(this.formdetails.controls.TDSEXMPFrom.value, 'dd-MM-yyyy' )
      // this.formdetails.controls.TDSEXMPFrom.value;
    this.registration.tdsExemptionNo = this.formdetails.controls.TDSEXMP.value;
    this.registration.tdsExemptionPercentage =
      this.formdetails.controls.TDSEXMPPer.value;
    this.registration.tdsExemptionTo = this.datePipe.transform(this.formdetails.controls.TDSEXMPTO.value, 'dd-MM-yyyy' )
      // this.formdetails.controls.TDSEXMPTO.value;
    this.registration.telePhoneNo = this.formdetails.controls.TelNo.value;
    ;
    this.registration.title = this.formdetails.controls.Title.value;
    // this.registration.top5Client = this.formdetails.controls.TopClients.value;
    debugger
    this.registration.typeOfBusiness =
      this.formdetails.controls.TypeOfbuisiness.value;
    this.registration.typeOfIndustory =
      this.formdetails.controls.TypeOfIndustory.value;
    this.registration.vendorNameL1 =
      this.formdetails.controls.vendorName1.value;
    this.registration.vendorNameL2 =
      this.formdetails.controls.vendorName2.value;
      this.registration.bankName = this.formdetails.controls.BankNAme.value;
    this.registration.branch = this.formdetails.controls.bankBrach.value;
    // this.registration.accHolderName = this.formdetails.controls.AccHolderName.value;
    this.registration.country = this.formdetails.controls.countryKey.value;
    this.registration.region = this.formdetails.controls.region.value;
    //       panFileName:string;
    // gstFileName:string;
    // chequeFileName:string;
    // msmeFileName:string;
    // addtionalFileName:string;
    this.registration.panFileName = this.pancardfilename;
    // this.UploadDocument.controls.PANattachments.value;
    this.registration.gstFileName = this.GSTfilename;
    // this.UploadDocument.controls.GSTattachments.value;
    this.registration.chequeFileName = this.cancelledCheque;
    this.registration.tdsFileName =this.TDSDocu;
    const commaSeparatedString = this.ArrayOfSelectedSavedFile.join(",");
    debugger
    this.registration.addtionalFileName = commaSeparatedString;

    // this.UploadDocument.controls.ChequeAtt.value;
    this.registration.msmeFileName = this.MSMEDocu;
    // this.UploadDocument.controls.MSMEAtt.value
    this.loaderservice.show()
    this.RegistrationArray.push(this.registration);
    this.purchaseOrderListService
      .submitDetails(this.RegistrationArray)
      .subscribe((res) => {
        this.loaderservice.hide();
        if (res[0].StatusCode == "200") {
          // sessionStorage.setItem('vendorPortal', 'true');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message:
              "Thank you for submitting your registration details.Our team will be processing your request and will communicate on the email ID provided.",
            condition: "success",
            page: "invoicesubmit",
            specific: "note",
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);
          const dialogRef = this.dialog.open(PopupComponent, {
            panelClass: "custom-modalbox",
            width: "600px",
            data: { datakey: dialogConfig.data },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(["/login"]).then(() => {
              this.authService.logout();
              sessionStorage.removeItem("loginUser");
              sessionStorage.removeItem('vendorPortal')
              sessionStorage.setItem('Submit', 'onDocument');
            });
          });
          // this.SubmitData=sessionStorage.getItem('Submit')
        } else {
          // sessionStorage.setItem('vendorPortal', 'true');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: res[0].message,
            condition: "success",
            page: "invoicesubmit",
            specific: "note",
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);
          const dialogRef = this.dialog.open(PopupComponent, {
            panelClass: "custom-modalbox",
            width: "600px",
            data: { datakey: dialogConfig.data },
          });
        }
        this.RegistrationArray = [];
      });
  }
  Back(type) {
    debugger
    if (type === "generalData") {
      debugger
      this.ganeralData = false;
      this.showfeilds = false;
      this.showfeilds1 = false;
      this.showCheque = false;
      this.showGST = false;
      this.showfeilds = true;
      // this.pushState();
      // this.UploadDocument.get('PANattachments')?.setValue('');

      sessionStorage.setItem("Submit","onDocument");
    } else if (type === "businessData") {
      // this.showGSTUpload=false
      // this.showMSME=false
      // this.close("MSME")
      // this.close("GST")
      const requiredFields = [
        "PanNumber",
        "vendorName1",
        "Street1",
        "PinCode",
        "City",
        // "TelNo",
        "Mobile_No",
        "Email_ID",
        "GeneralData",
      ];
      const areAllFieldsValid = requiredFields.every(
        (field) => this.formdetails.controls[field].valid
      );
      ;
      if (areAllFieldsValid) {
        this.bankingData = false;
        this.showCheque = false;
        this.showfeilds1 = true;
        this.showfeilds = false;
        this.showGST = false;
        // this.pushState();
        sessionStorage.setItem("Submit", "uploaddocument");
      }
    } else if (type == "BankingData") {
      // const requiredFields = [
      //   "PanNumber",
      //   "vendorName1",
      //   "Street1",
      //   "PinCode",
      //   "City",
      //   "TelNo",
      //   "Mobile_No",
      //   "Email_ID",
      //   "GeneralData",
      // ];
      // const areAllFieldsValid = requiredFields.every(
      //   (field) => this.formdetails.controls[field].valid
      // );
      // ;
      // if (areAllFieldsValid) {
      //   this.showCheque = true;
      //   this.showfeilds1 = false;
      //   this.showfeilds = false;
      //   this.showGST = false;
      //   // this.pushState();
      //   sessionStorage.setItem("Submit", "general");
      // } else {
      //   requiredFields.forEach((field) => {
      //     const control = this.formdetails.controls[field];
      //     if (control.invalid) {
      //       control.markAsTouched();
      //     }
      //   });
      // }
      const fieldsToValidate = [
        "vendorName1",
        "PanNumber",
        "City",
        "PinCode",
        "Street1",
        // "TelNo",
        "Mobile_No",
        "Email_ID",
        "GeneralData",
      ];
      fieldsToValidate.forEach((fieldName) => {
        const control = this.formdetails.controls[fieldName];
        if (fieldName === "Mobile_No") {
          control.setValidators([
            Validators.required,
            Validators.pattern("^[6-9][0-9]{9}$"),
          ]);
        } else if (fieldName === "Email_ID") {
          control.setValidators([
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9](?!.*[!#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]{2})[^\s@]*[a-zA-Z0-9]@[^\s@]+\.[a-zA-Z]{2,}$/
),
          ]);
        } else if (fieldName === "TelNo") {
          control.setValidators([
            Validators.required,
            Validators.pattern("^[0-9]+$"),
            Validators.minLength(10),
          ]); // Example: Pattern for only numbers
        }  else if(fieldName =="PanNumber"){
          control.setValidators([
            Validators.required,
            Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}"),
            Validators.minLength(10),
            Validators.maxLength(10)
          ]);  
        }
        else {
          control.setValidators([Validators.required]);
        }
        control.updateValueAndValidity();
        if (control.invalid) {
          control.markAsTouched();
        }
      });

      if (fieldsToValidate.some((fieldName) => this.formdetails.get(fieldName).hasError("required")) || fieldsToValidate.some((fieldName) =>this.formdetails.get(fieldName).hasError("pattern") || fieldsToValidate.some((fieldName) =>this.formdetails.get(fieldName).hasError("minlength"))  )
      ) {
    
        this.formdetails.markAllAsTouched();
        return;
      }
      //   const control = this.formdetails.controls[fieldName];
      //   if (control.invalid) {
      //     control.setValidators([Validators.required]);
      //     control.updateValueAndValidity();
      //     // if(control == "Mobile_No"){
      //     //   this.formdetails.controls["Mobile_No"].setErrors({ 'pattern': true });
      //     // }
      //     console.log(control);
      //     // this.ganeralData=truey
      //   }
      // });
      // if (
      //   fieldsToValidate.some(
      //     (fieldName) => this.formdetails.get(fieldName).hasError('required') || this.formdetails.get(fieldName).hasError('pattern')
      //   )
      // ) {
      //   this.formdetails.markAllAsTouched();
      //   return;
      // }
      this.showCheque = true;
      this.showfeilds1 = false;
      this.showfeilds = false;
      this.showGST = false;
      
    } else if (type == "bussine") {
      this.formdetails
      // const requiredFields = [
      //   "AccNumber",
      //   "IFSCCODE",
      //   "GSTNumber",
      //   "BuissinessDataCheck",];
      // const areAllFieldsValid = requiredFields.every(
      //   (field) => this.formdetails.controls[field].valid
      // );
      // ;
      // if (areAllFieldsValid) {
      //   this.showCheque = false;
      //   this.showfeilds1 = false;
      //   this.showfeilds = false;
      //   this.showGST = true;
      //   // this.pushState();
      // } else {
      //   requiredFields.forEach((field) => {
      //     const control = this.formdetails.controls[field];
      //     if (control.invalid) {
      //       control.markAsTouched();
      //     }
      //   });
      // }
      this.fieldsToValidate = [
        "AccNumber",
        "IFSCCODE",
        "GSTNumber",
        "BuissinessDataCheck",
      ];
      this.fieldsToValidate.forEach((fieldName) => {
        debugger
        const control = this.formdetails.controls[fieldName];
        if (fieldName === "AccNumber") {
          control.setValidators([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9]*$"),
          ]);
        } else if (fieldName === "IFSCCODE") {
          control.setValidators([
            Validators.required,
            Validators.pattern(""),
          ]);
        } else if (fieldName === "GSTNumber") {
          debugger
          control.setValidators([
            // Validators.required,
            Validators.pattern(""),
          ]); // Example: Pattern for only numbers
        } else {
          control.setValidators([Validators.required]);
        }
        control.updateValueAndValidity();
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      if(this.formdetails.get('MSMENO').hasError('required')){
        this.formdetails.markAllAsTouched();
        return
      }
      if (
        this.fieldsToValidate.some((fieldName) =>
          this.formdetails.get(fieldName).hasError("required") || this.formdetails.get(fieldName).hasError("pattern")
        )
      ) {
        this.formdetails.markAllAsTouched();
        return;
      }
      this.showGST = true;
      this.showCheque = false;
      this.showfeilds1 = false;
      this.showfeilds = false;
      // this.pushState();
    }
  }
  onFileChanged(event: any) {
    ;
    console.log("this.filecount " + this.filecount);
    var specialChars = "<>@!#$%^&*()+[]{}?:;_|'\"\\,/~`-=";
    var checkForSpecialChar = function (string) {
      for (var j = 0; j < specialChars.length; j++) {
        if (string.indexOf(specialChars[j]) > -1) {
          return true;
        }
      }
      return false;
    };
    var _validFileExtensions = [
      ".JPEG",
      ".JPG",
      ".PNG",
      ".DOC",
      ".DOCX",
      ".XLS",
      ".XLSX",
      ".CSV",
      ".PDF",
    ];
    var ValidateSingleInput = function (string) {
      for (var j = 0; j < _validFileExtensions.length; j++) {
        if (string.toUpperCase().indexOf(_validFileExtensions[j]) > -1) {
          return false;
        }
      }
      return true;
    };
    if (this.filecount == 0) {
      ;
      this.multiplefilechanged = true;
      this.ArrayOfSelectedFile = Array.from(event.target.files);
      if (this.ArrayOfSelectedFile.length < 11) {
        ;
        for (var t = 0; t < this.ArrayOfSelectedFilename.length; t++) {
          if (
            this.ArrayOfSelectedFilename[t] == this.ArrayOfSelectedFile[k].name
          ) {
            // this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: "Duplicate files are not allowed.",
              condition: "error",
              page: "invoicesubmit",
            };
            const mydata = dialogConfig.data;
            console.log("PopupComponent", mydata);

            const dialogRef = this.dialog.open(PopupComponent, {
              panelClass: "custom-modalbox",

              width: "400px",
              data: { datakey: dialogConfig.data },
            });
            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result1: ${result}`);
              // this.router.navigate(['/internaltrackInvoiceList']);
            });

            return;
          }
        }
        for (var m = 0; m < this.ArrayOfSelectedFile.length; m++) {
          if (checkForSpecialChar(this.ArrayOfSelectedFile[m].name)) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: "Filename can have spaces but no special characters",
              condition: "error",
              page: "invoicesubmit",
            };
            const mydata = dialogConfig.data;
            console.log("PopupComponent", mydata);

            const dialogRef = this.dialog.open(PopupComponent, {
              panelClass: "custom-modalbox",

              width: "400px",
              data: { datakey: dialogConfig.data },
            });
            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result1: ${result}`);
            });

            // this.filecount -= 1
            // this.filecount = this.filecount - 1;
            return;
          }
        }
        for (var m = 0; m < this.ArrayOfSelectedFile.length; m++) {
          if (
            ValidateSingleInput(this.ArrayOfSelectedFile[m].name.toUpperCase())
          ) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message:
                "Only jpeg,jpg,png,doc,docx,xls,xlsx,csv,pdf files are allowed",
              condition: "error",
              page: "invoicesubmit",
            };
            const mydata = dialogConfig.data;
            console.log("PopupComponent", mydata);

            const dialogRef = this.dialog.open(PopupComponent, {
              panelClass: "custom-modalbox",

              width: "400px",
              data: { datakey: dialogConfig.data },
            });
            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result1: ${result}`);
            });

            // this.filecount -= 1
            // this.filecount = this.filecount - 1;
            return;
          }
        }
        for (var k = 0; k < this.ArrayOfSelectedFile.length; k++) {
          ;
          this.ArrayOfSelectedFilename.push(this.ArrayOfSelectedFile[k].name);
          // this.ArrayOfSelectedSavedFile.push("_enduserinvoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) + "_" +"." + this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name));
          this.ArrayOfSelectedSavedFile.push(
            this.requestID +
              "_" +
              "additional" +
              "_" +
              this.ArrayOfSelectedFile[k].name
          );
          ;
          console.log(this.ArrayOfSelectedFile[k].name);

          this.multiplactualfilenamearray.push(
            this.ArrayOfSelectedFile[k].name
          );
          console.log(this.multiplactualfilenamearray);
        }
        this.filecount = this.ArrayOfSelectedFile.length;
        this.multiplsavedfilenamearray = this.ArrayOfSelectedFilename.length;
      } else {
        this.ArrayOfSelectedFile = [];
        // this.dialogBox.popUpOpen2('Maximum 10 files allowed.', 'error', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: "Maximum 10 files allowed.",
          condition: "error",
          page: "invoicesubmit",
        };
        const mydata = dialogConfig.data;
        console.log("PopupComponent", mydata);

        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: "custom-modalbox",

          width: "400px",
          data: { datakey: dialogConfig.data },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result1: ${result}`);
          // this.router.navigate(['/internaltrackInvoiceList']);
        });

        return;
      }
      console.log("in");
    } else {
      const array = event.target.files;
      console.log("array length" + array.length);
      this.filecount = this.filecount + array.length;
      if (this.filecount < 11) {
        for (let file of array) {
          this.multiplefilechanged = true;
          for (var t = 0; t < this.ArrayOfSelectedFilename.length; t++) {
            if (this.ArrayOfSelectedFilename[t] == file.name) {
              // this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: "Duplicate files are not allowed.",
                condition: "error",
                page: "invoicesubmit",
              };
              const mydata = dialogConfig.data;
              console.log("PopupComponent", mydata);

              const dialogRef = this.dialog.open(PopupComponent, {
                panelClass: "custom-modalbox",

                width: "400px",
                data: { datakey: dialogConfig.data },
              });
              dialogRef.afterClosed().subscribe((result) => {
                console.log(`Dialog result1: ${result}`);
                // this.router.navigate(['/internaltrackInvoiceList']);
              });

              this.filecount -= 1;
              return;
            }
          }
          for (var m = 0; m < this.ArrayOfSelectedFilename.length; m++) {
            console.log("this.ArrayOfSelectedFilename[m].name", file.name);
            if (checkForSpecialChar(file.name)) {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: "Filename can have spaces but no special characters",
                condition: "error",
                page: "invoicesubmit",
              };
              const mydata = dialogConfig.data;
              console.log("PopupComponent", mydata);

              const dialogRef = this.dialog.open(PopupComponent, {
                panelClass: "custom-modalbox",

                width: "400px",
                data: { datakey: dialogConfig.data },
              });
              dialogRef.afterClosed().subscribe((result) => {
                console.log(`Dialog result1: ${result}`);
              });

              // this.filecount -= 1
              this.filecount = this.filecount - 1;
              return;
            } else if (ValidateSingleInput(file.name.toUpperCase())) {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message:
                  "Only jpeg,jpg,png,doc,docx,xls,xlsx,csv,pdf files are allowed",
                condition: "error",
                page: "invoicesubmit",
              };
              const mydata = dialogConfig.data;
              console.log("PopupComponent", mydata);

              const dialogRef = this.dialog.open(PopupComponent, {
                panelClass: "custom-modalbox",

                width: "400px",
                data: { datakey: dialogConfig.data },
              });
              dialogRef.afterClosed().subscribe((result) => {
                console.log(`Dialog result1: ${result}`);
              });

              // this.filecount -= 1
              // this.filecount = this.filecount - 1;
              return;
            }
          }
          if (this.ArrayOfSelectedFile.includes(file) === false) {
            ;
            this.ArrayOfSelectedFile.push(file);
            this.ArrayOfSelectedFilename.push(file.name);
            this.ArrayOfSelectedSavedFile.push(
              this.requestID +
                "_" +
                "additional_" +
                this.getFileNameWOExtention(file.name) +
                "." +
                this.getExtensionOfFile(file.name)
            );

            this.multiplactualfilenamearray.push(file.name);
            this.filecount = this.ArrayOfSelectedFilename.length;
          } else {
            console.log("duplicate =================");
          }
        }
      } else {
        this.filecount = this.filecount - array.length;
        // this.dialogBox.popUpOpen2('Maximum 11 files allowed.', 'error', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: "Maximum 10 files allowed.",
          condition: "error",
          page: "invoicesubmit",
        };
        const mydata = dialogConfig.data;
        console.log("PopupComponent", mydata);

        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: "custom-modalbox",

          width: "400px",
          data: { datakey: dialogConfig.data },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result1: ${result}`);
          // this.router.navigate(['/internaltrackInvoiceList']);
        });

        return;
      }
    }
    // if (this.ArrayOfSelectedFile.length == 0) {

    // }
    // else {

    // }
    // this.ArrayOfSelectedFile = Array.from(event.target.files);
    console.log(this.ArrayOfSelectedFile);
    console.log("this.filecount >>" + this.filecount);
    const array = event.target.files;
    // ;
    if (array.length != 0) {
      this.uploadfile();
    }
  }
  uploadfile() {
    const formData = new FormData();
    this.loaderservice.show();
    for (var i = 0; i < this.ArrayOfSelectedFile.length; i++) {
      console.log(
        "this.ArrayOfSelectedFile[i].name ==> " +
          this.requestID +
          "_enduserinvoice_" +
          this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) +
          "_" +
          "." +
          this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name)
      );
      if (this.multipleactualendfilename == null) {
        formData.append(
          "file[]",
          this.ArrayOfSelectedFile[i],
          this.requestID +
            "_" +
            "additional_" +
            this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) +
            "." +
            this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name)
        );
      } else {
        console.log(this.individualsavedendname[0]);
        var words = this.individualsavedendname[0].split("_");
        var timestamp = words[words.length - 1].substr(
          0,
          words[words.length - 1].indexOf(".")
        );
        console.log("timestamp" + timestamp);
        formData.append(
          "file[]",
          this.ArrayOfSelectedFile[i],
          this.requestID +
            "_" +
            "additional_" +
            this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) +
            "." +
            this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name)
        );
      }
    }
    this.loaderservice.show();
    this.internalportalservice.AddidtinalVendorDoc(formData).subscribe(
      (res) => {
        console.log(res.toString);
        this.loaderservice.hide();
        if (res[0].status == "Fail") {
          this.ArrayOfSelectedFilename = [];
          // var tempname = this.ArrayOfSelectedFilename[index]
          // this.ArrayOfSelectedFilename.splice(index, 1);
          // this.multiplsavedfilenamearray.splice(index, 1);
          this.ArrayOfSelectedSavedFile = [];
          // this.filecount = 0;
          this.ArrayOfSelectedFile = [];

          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: res[0].message,
            condition: "error",
            page: "invoicesubmit",
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);

          const dialogRef = this.dialog.open(PopupComponent, {
            panelClass: "custom-modalbox",

            width: "400px",
            data: { datakey: dialogConfig.data },
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result1: ${result}`);
          });
          return;
        }
        this.loaderservice.hide();
      },
      (err) => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err));
      }
    );
  }
  removeitem(index) {
    // delete this.ArrayOfSelectedFilename[index];
    var tempname = this.ArrayOfSelectedFilename[index];
    this.ArrayOfSelectedFilename.splice(index, 1);
    // this.multiplsavedfilenamearray.splice(index, 1);
    this.ArrayOfSelectedSavedFile.splice(index, 1);
    this.filecount = this.filecount - 1;
    for (var k = 0; k < this.ArrayOfSelectedFile.length; k++) {
      if (this.ArrayOfSelectedFile[k].name == tempname) {
        this.ArrayOfSelectedFile.splice(k, 1);
      }
    }
    // if(this.ArrayOfSelectedFile[index]!=undefined ||this.ArrayOfSelectedFile[index].name != undefined )
    // {
    //   this.ArrayOfSelectedFile.splice(index, 1);
    // }
    console.log("this.ArrayOfSelectedFilename" + this.ArrayOfSelectedFilename);
  }
  getFileNameWOExtention(name) {
    // return name.split(".")[0];
    var flName = name
      .substr(0, name.lastIndexOf("."))
      .replace(/_/g, "-")
      .replace(/\./g, "-");
    return flName;
  }
  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
  }

  getTooltipValue(): string {
    const pannumber =
      this.formdetails.get("PanNumber")?.value ||
      "This information is required";
    const VendorName =
      this.formdetails.get("vendorName1")?.value ||
      "This information is required";
    //  const PANNumber = this.formdetails.get('PanNumber')?.value || 'This information is required';
    const Street =
      this.formdetails.get("Street1")?.value || "This information is required";
    const Postal =
      this.formdetails.get("PinCode")?.value || "This information is required";
    const City =
      this.formdetails.get("City")?.value || "This information is required";
    const Telephone =
      this.formdetails.get("TelNo")?.value || "This information is required";
    const Mobile =
      this.formdetails.get("Mobile_No")?.value ||
      "This information is required";
    const Email =
      this.formdetails.get("Email_ID")?.value || "This information is required";
    return `Pan Number: ${pannumber} \n Vendor Name: ${VendorName} \n Street: ${Street} \n Postal Code: ${Postal} \n City: ${City} \n Telephone No: ${Telephone} \n Mobile No: ${Mobile} \n Email ID: ${Email}`;
  }
  BankgetTooltipValue(): string {
    const BankAccountNo =
      this.formdetails.get("AccNumber")?.value ||
      "This information is required";
    const IFSC_Code =
      this.formdetails.get("IFSCCODE")?.value || "This information is required";
    const GST_Number =
      this.formdetails.get("GSTNumber")?.value ||
      "This information is required";
    //  const Street = this.formdetails.get('Street1')?.value;
    // const Postal = this.formdetails.get('postalCode')?.value;
    // const City= this.formdetails.get('City')?.value;
    // const Telephone= this.formdetails.get('TelNo')?.value;
    // const Mobile = this.formdetails.get('Mobile_No')?.value;
    // const Email = this.formdetails.get('Email_ID')?.value;
    return `Bank Account No: ${BankAccountNo} \n IFSC Code: ${IFSC_Code} \n GST Number: ${GST_Number}`;
  }
  BuigetTooltipValue(): string {
    const TypeOfbuisiness =
      this.formdetails.get("TypeOfbuisiness")?.value ||
      "This information is required";
    const TypeOfIndustory =
      this.formdetails.get("TypeOfIndustory")?.value ||
      "This information is required";
    //  const promoters =
    return `Type Of Buisiness: ${TypeOfbuisiness}\n Type Of Industory: ${TypeOfIndustory}`;
  }
//   ngAfterViewInit() {
//     ngOnInit();
//     // this.admin.runOnRouteChange();
// }
}
