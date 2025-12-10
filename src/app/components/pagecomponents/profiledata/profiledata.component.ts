import { NavigationEnd, Router } from "@angular/router";
import { Location } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from "@angular/core";
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  ValidatorFn, AbstractControl
} from "@angular/forms";
import { profileGeneralData } from "app/models/profile-general-data.model";
import { ProfileDataService } from "app/services/profileData/profileData.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe, ViewportScroller } from "@angular/common";
import { saveAs } from "file-saver";

interface DropdownItem {
  id: string;
  value: string;
}

import { interval as observableInterval, forkJoin, throwError } from "rxjs";
import { catchError, filter } from "rxjs/operators";

import { takeWhile, scan, tap } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";
import { DialogModelComponent } from "app/components/dialogcomponent/dialog-model/dialog-model.component";
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';
declare var $: any; // declaring jquery in this way solved the problem
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { PopupComponent } from "../../commoncomponents/popup/popup.component";
import { PurchaseOrderListService } from "app/services/purchaseOrderList/purchaseorderlist.service";
import { AmendmentRegistration, ByuerAmendament } from "app/models/delivery";
import { LoaderService } from "app/services/LoaderService/loader.service";
import { profile } from "console";
import { InternalportalserviceService } from "app/services/internalportal/internalportalservice.service";
import { event } from "jquery";
import { Cipher } from "crypto";
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';// import { Component, FormArray, FormBuilder, FormGroup, Validators } from '@angular/core';

export function controlContainerFactory(controlContainer?: ControlContainer) {
  return controlContainer;
}

@Component({
  selector: "app-profiledata",
  templateUrl: "./profiledata-new.component.html",
  styleUrls: ["./profiledata-new.component.css"],
})
export class ProfileGeneralDataComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  profileDetails: any = [];
  amendmentDetails: Array<AmendmentRegistration> = [];
  buyerAmendmentDetails: Array<ByuerAmendament> = [];
  profileModel = new profileGeneralData();
  profilemodel: profileGeneralData[];
  EmployeeSizeList = ["0-100", "101-1000", "1001-5000", "5001-10000", "10000+"];
  loginuser;
  genders = ["male", "female"];
  disableTextbox: boolean = true;
  hideCancel: boolean = false;
  isFieldDisabled: boolean = true;
  amendament = new AmendmentRegistration();
  buyerAmendment = new ByuerAmendament();
  profileData = new FormGroup({
    purchGroup: new FormControl("", ),
    plantCode: new FormControl("", ),
    title: new FormControl("", ),
    // panNumber: new FormControl("", Validators.required),
    vendorName1: new FormControl("", ),
    vendorName2: new FormControl("",),
    streetLine1: new FormControl("",),
    streetLine2: new FormControl("",),
    streetLine3: new FormControl("", ),
    streetLine4: new FormControl("", ),
    postalCode: new FormControl("", ),
    countryKey: new FormControl("", ),
    region: new FormControl("", ),
    city: new FormControl("", ),
    accountgroup: new FormControl("",),
    companyCode: new FormControl("",),
    purchasingOrg: new FormControl("",),
    schGrpVndr: new FormControl("",),
    sBuyer: new FormControl(),

    telephoneNo: new FormControl(
      "",[Validators.pattern("^[0-9]*$"),Validators.minLength(10)]
    ),
    mobileNo: new FormControl(
      { value: ""},
    ),
    // faxNo: new FormControl("", Validators.required),
    vendorEmail: new FormControl(
      { value: ""},
    ),
    email1: new FormControl({ value: "",  },),
    email2: new FormControl({ value: "", },),
    email3: new FormControl({ value: "",  }, ),
    email4: new FormControl({ value: "",  },),
  });
  bankingData = new FormGroup({
    ReconAcc:new FormControl("",),
    SortKey:new FormControl("",),
    PlaningGroup:new FormControl("", ),
    PaymentMethods:new FormControl("", ),
    VendorsBAnkKEy:new FormControl("",),
    BankCountry:new FormControl("", ),
    DuplicateInvoice:new FormControl(),
    orderCurrency: new FormControl("", ),
    paymentTerms: new FormControl("",),
    bankName: new FormControl("",),
    branch: new FormControl("",),
    bankAccountNo: new FormControl("",Validators.pattern("^[0-9]*$")),
    swiftCode: new FormControl("",),
    ifscNo: new FormControl("", ),
    pfRegisterationNo: new FormControl("",),
    ESICRegisterationNo: new FormControl("", ),
    VATRegisterationNo: new FormControl("", ),
    panNo: new FormControl("", ),
    serviceTaxRegisterationNo: new FormControl("", ),
    CSTNo: new FormControl("", ),
    LSTNo: new FormControl("", ),
    GSTRegisterationNo: new FormControl("", ),
    taxClassification: new FormControl("",),
    TDSExcemptionNo: new FormControl("", ),
    excemptionPercentage: new FormControl("", ),
    excemptFrom: new FormControl("", ),
    excemptTo: new FormControl("",),
    MSMEStatus: new FormControl("", ),
    MSMENo: new FormControl("", ),

    // WithTType: new FormControl("", Validators.required),
    // withTCode: new FormControl("", Validators.required),
    // Liable: new FormControl("", Validators.required),

    // RecType: new FormControl("", Validators.required),
    // ExcepRea: new FormControl("", Validators.required),
    // WithDisc: new FormControl("", Validators.required),

    // ExcepTo: new FormControl("", Validators.required),
    // ExcepFrom: new FormControl("", Validators.required),
    // ExcepPerc: new FormControl("", Validators.required),
    // ExcepNumber: new FormControl("", Validators.required),
  });
  businessData = new FormGroup({
    businessType: new FormControl("", ),
    industryType: new FormControl("", ),
    promoters: new FormControl("",  ),
    top5Clients: new FormControl("",),
    turnOver: new FormControl("", ),
    clientRef: new FormControl("",),
    complianceCategory: new FormControl("",),
    constitutionBus: new FormControl("", ),
    UploadDocument: new FormControl('',),
    Conf: new FormControl("", ),
    remarks: new FormControl(""),
  });

  organizationData = new FormGroup({
    companyName: new FormControl("", Validators.required),
    parentCompany: new FormControl("", Validators.required),
    globalHeadOffice: new FormControl("", Validators.required),
    IndiaHeadOffice: new FormControl("", Validators.required),
    website: new FormControl("", Validators.required),
    manufacturingSite: new FormControl("", Validators.required),
    mfgCapacity: new FormControl("", Validators.required),
    yearofEshtablihsment: new FormControl("", Validators.required),
    companyDescription: new FormControl("", Validators.required),
    BnC_Category: new FormControl("", Validators.required),
    Material_Service_Provider: new FormControl("", Validators.required),
    revenueLY: new FormControl("", Validators.required),
    PATLY: new FormControl("", Validators.required),
    LYSpend: new FormControl("", Validators.required),
    EmployeeSize: new FormControl("", Validators.required),
    NameL1: new FormControl("", Validators.required),
    emailIDL1: new FormControl("", Validators.required),
    contactNoL1: new FormControl("", Validators.required),
    nameL2: new FormControl("", Validators.required),
    emailIDL2: new FormControl("", Validators.required),
    contactNoL2: new FormControl("", Validators.required),
    BCCLAssociation: new FormControl("", Validators.required),
    BCCLannualSpend: new FormControl("", Validators.required),
    groupCO: new FormControl("", Validators.required),
    marketUpdate: new FormControl("", Validators.required),
    top5Clients: new FormControl(""),
    UploadPortfolio: new FormControl(""),
  });
  model: any = {};
  date: any;
  pageYoffset = 0;
  viewAttachmentName: string = "";
  viewUploadFile: any;
  AttachmentValidExtension: any = ["PDF"];
  fileAttachmentError: string;
  confile: File;
  Vendor_ID1: any;
  disableCancel: boolean = false;
  iconSelected: boolean = false;
  onButtonDisable: boolean;
  submitted: boolean = false;
  filevalue: any;
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

  myInputVariable: any;
  ChecqueData: any;
  Region:any=[];
  PlantCode: { id: string; value: string }[] = [];
  dropdownLists: { [key: string]: DropdownItem[] } = {
    accountdetails: [],
    compnay_code: [],
    "Purch-Group": [],
    SchemaGrpVndr: [],
    Countrykey: [],
    typeOfindustr: [],
    BusinessType: [],
    // puchaseORG: [],
    orderCurrency:[],
    conf:[],
    paymentTrms: [],
    title: [],
    softkey: [],
    // reconAcDetails:[],
    // bankKeyDetails:[],
    planingrp:[],
    // WithTCode: [],
    // softkey: [],
    // MSMEStatus:[],
    // Add more as needed
  };
  registrationType: string;
  showregistrationFields: boolean=false;
  showbuyerregistrationFields: boolean=false;
  countryKeyList: { id: string; value: string }[];
  partneroId: string;
  L1usershowfileds: boolean;
  data: string;
  documentname: any;
  cCode: any;
  showEdit: boolean=true;
  Turnover: { id: string; value: string; }[];
  desablesubmit: boolean = false;
  step: string;
  profile: boolean;
  planningList1:{id:string;value:string;desc:string }[];
  reeconAccount: {id:string;value:string;desc:string }[];
  purorg: {id:string;value:string }[];
  bankkey: any[];
  paymentMethodre: any[];
  withtax: FormGroup;
  // withtax = new FormGroup({
  //   rows: new FormArray([]), // For dynamic rows
  // });
  WHTType:{ id: string; value: string;}[];
  tcode: any;
  Tcode: any;
  ReCType: { id: string; value: string; }[];
  arrayoftex: any[];
  viewAttachmentNames: any[];
  fileNamesArray: any[];
  DecodedFile: any;
  checatt: any;
  panatt: any;
  gstatt: any;
  msmeatt: any;
  additionalData: any;
  perchaseCode: any;
  plantData: any;
  addfileNamesArray: any[];
  status: any;
  fileNamesString: any;
  Compliance: ({ id: string; value: string; disabled: boolean; } | { id: string; value: string; disabled?: undefined; })[];
  constitutionOfBusiness: ({ id: string; value: string; disabled: boolean; } | { id: string; value: string; disabled?: undefined; })[];
  fromAmendment: boolean=false;
  vendorCheck: boolean=false;
  vendorCheckMSG: string;
  maxdate: Date;
  ExcepReason: { id: string; value: string; }[];
  textremark: any;
  
  // whTaxList: any[];


  constructor(
    private loaderservice: LoaderService,
    public dialog: MatDialog,
    private purchaseOrderService: PurchaseOrderListService,
    private profileService: ProfileDataService,
    private router: Router,
    private location:Location,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private scroll: ViewportScroller,
    private internalportalservice: InternalportalserviceService,
    private fb: FormBuilder,
    private trackOrderListService: TrackOrderListService,
  ) {
    this.withtax = this.fb.group({
      rows: this.fb.array([this.createRow("data")])
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes("/UploadDocument")) {
          this.location.go(event.url);
        }
      });
  }
  // @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  get f() {
    return this.organizationData.controls;
  }
  
  Data(value) {
    this.iconSelected = value;
    // console.log(this.iconSelected)
  }
  get rows(): FormArray {
    return this.withtax.get('rows') as FormArray;
  }
 
  
  addRow(): void {
    this.rows.push(this.createRow("data"));
    this.logFormValues();
  }
  removeRow(index: number): void {
    debugger
    if (this.rows.length > 1) {
      this.rows.removeAt(index);
    }
  }
  logFormValues(): void {
    console.log(this.withtax.value);
  }
  

  scrollToTop(step: number) {
    debugger;
  
    // Validation logic for each step
    let isValid = false;
    switch (step) {
      case 1:{
        isValid=true
      }
      break;
      case 2:
        if (this.profileData.valid) {
          isValid = true;
          this.CallPanGSTVALIDATION();
        } else {
          this.profileData.markAllAsTouched();
        }
        break;
  
      case 3:
        if (this.bankingData.valid) {
          if (this.status === "L2") {
            if (this.withtax.valid) {
              isValid = true;
            } else {
              this.withtax.markAllAsTouched(); // Mark only when `withtax` is invalid
            }
          } else {
            isValid = true; // When status is not "L2" and bankingData is valid
          }
        } else {
          this.bankingData.markAllAsTouched(); // Mark bankingData as touched only if invalid
          if (this.status === "L2") {
            this.withtax.markAllAsTouched(); // Mark withtax as touched only when required
          }
        }
        
        break;
      case 4:
        if (this.businessData.valid) {
          isValid = true;
        } else {
          this.businessData.markAllAsTouched();
        }
        break;
  
      default:
        console.error("Invalid step");
        return; // Do nothing if the step is invalid
    }
    // If the form is invalid, stop execution and prevent navigation
    if (!isValid) {
      console.log("Form is invalid. Staying on the same step.");
      return;
    }
    // Proceed to update the UI using jQuery if the form is valid
    jQuery(".wizard-fieldset").hide(); // Hide all fieldsets
    const idBtn = `step${step}`; // Determine the next step's ID
    jQuery(`#${idBtn}`).css("display", "block"); // Show the valid step
    // Update the active step indicator
    jQuery(".form-wizard-steps li").removeClass("active");
    jQuery(`.form-wizard-steps li[data-id="${idBtn}"]`).addClass("active");
    // Scroll the page to the top
    const elements = Array.from(document.getElementsByClassName("ps__rail-y")) as HTMLElement[];
    if (elements.length > 0) {
      elements.forEach((element) => {
        element.style.top = "0"; // Reset position of the element
         element.style.right = "0";
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    console.log("Navigation to step", step, "completed.");
  }
  
  
  
  getPlant(data,type) {
      debugger
      // this.perchaseCode = data.value;
      this.perchaseCode = data.value == undefined ? data : data.value;

this.purchaseOrderService.getPlantCode(this.perchaseCode).pipe(
  catchError((err) => {
    console.error(`Error fetching data for region`, err);
    return throwError(err); // Ensure you re-throw the error to handle it appropriately
  })
).subscribe((response: any) => {
  if (response?.[0]?.PlantList) {
    // Map the response to the expected format
    this.PlantCode = response[0].PlantList.map((item: any) => ({
      id: item[0] , // Fallback to "N/A" if `id` is missing
      value: item[1] , // Fallback to "N/A" if `value` is missing
    }));
  } else {
    // Default case when PlantList is not present
    this.PlantCode = [{ id: "N/A", value: "N/A" }];
  }
  this.loaderservice.hide();
});

    }
  callQuery(){
    debugger
    
    // jQuery(".form-wizard-next-btn, .form-wizard-previous-btn").on(
    //   "click",
    //   function () {
    //     
    //     jQuery(".wizard-fieldset").hide();
    //     var idBtn = jQuery(this).data("id");
    //     jQuery("#" + idBtn).css("display", "block");
    //     jQuery(".form-wizard-steps li").removeClass("active");
    //     jQuery(`.form-wizard-steps li[data-id="${idBtn}"]`).addClass(
    //       "active"
    //     );
    //   }
    // );
    jQuery(document).on("click", ".form-wizard-next-btn, .form-wizard-previous-btn", function () {
      ;
      jQuery(".wizard-fieldset").hide();
      var idBtn = jQuery(this).data("id");
      jQuery("#" + idBtn).css("display", "block");
      jQuery(".form-wizard-steps li").removeClass("active");
      jQuery(`.form-wizard-steps li[data-id="${idBtn}"]`).addClass("active");
  });  
  }

  scrolls(e: Event) {
    
    console.log("scroll", e);
    e.stopPropagation();
  }

  onSubmit() {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.model, null, 4));
  }

  public ngOnInit() {
    this.maxdate = new Date();

    this.Turnover=[
      // { id: "ALL", value: "--Select---" },
      { id: "1L", value: "1 Lakh to 50 Lakh" },
      { id: "2L", value: "50 Lakh 1 Cr" },
      { id: "5L", value: "1 Cr to 5 Cr" },
      { id: "10L", value: "above 5 Cr" },
    ]
    this.Compliance=[
      { id: '1', value: 'regulatory' },
      { id: '2', value: 'corporate' },
      { id: '3', value: 'legal' },
      { id: '4', value: 'security' },
      { id: '5', value: 'industry' },
      { id: '6', value: 'ethical' }]
    this.constitutionOfBusiness=[
      
      { id: '1', value: 'sole_proprietorship' },
      { id: '2', value: 'partnership' },
      { id: '3', value: 'private_limited_company' },
      { id: '4', value: 'public_limited_company' },
      { id: '5', value: 'llp' },
      { id: '6', value: 'trust' },
      { id: '7', value: 'society' },
      { id: '8', value: 'other' }
    ];

    this.ExcepReason = [
      // { id: "ALL", value: "--Select---" },
      { id: "01", value: "Exemption " },
      { id: "C1", value: "EXEMPTUON FOR CONTRACTORS" },
      { id: "H1", value: "EXEMTIOPN FOR COMMISION" },
      { id: "I1", value: " EXEMTIOPN FOR RENT " },
      { id: "J1", value: " EXEMTIOPN FOR PROF SERVICES " },
    ];
    // this.loadData();
    // this.desablesubmit=sessionStorage.getItem('disabeleSubmit')
    if(sessionStorage.getItem('disabeleSubmit')=="true"){
      this.desablesubmit=true
    }
    
    this.data = sessionStorage.getItem("RequestID");
    this.registrationType = sessionStorage.getItem("RegistrationType");
    if (this.registrationType == "FromBuyer") {
                  this.showbuyerregistrationFields = true;
                  this.showEdit=true;
                  this.showregistrationFields = false;
                  this.getMAsterData();
                  this.organizationData.disable();
                  // this.profileData.get('region').enable();

    this.loadData();
      // this.showfeilds1 = true; 
    } else {
      debugger
      this.showregistrationFields = true;
      this.showbuyerregistrationFields = false;
      this.getuserProfile();
      this.profileData.controls["region"].disable();
      this.profileData.controls["vendorName1"].disable();
      this.bankingData.controls["panNo"]?.disable()
      this.bankingData.controls["GSTRegisterationNo"]?.disable()
      // this.getMAsterData();
      this.purchaseOrderService.getAccountMaster("title").pipe(
        catchError((err) => {
          console.error(`Error fetching data for ${"title"}`, err);
          return throwError(err);
        })
      ).subscribe(res=>{
        if(res?.[0]?.TitleList){
          this.dropdownLists['title'] = this.transformResponse(
            res?.[0]?.TitleList || []) 
        }
      })
      this.purchaseOrderService.getAccountMaster("Countrykey").pipe(
        catchError((err) => {
          console.error(`Error fetching data for ${"Countrykey"}`, err);
          return throwError(err);
        })
      ).subscribe(res=>{
        if(res?.[0]?.countryList){
          this.dropdownLists['Countrykey'] = this.transformResponse(
            res?.[0]?.countryList || []) 
        }
      })
    }
    this.ChecqueData = JSON.parse(sessionStorage.getItem("chequeData"));
    if (this.ChecqueData) {
      this.bankingData.controls["bankAccountNo"].setValue(
        this.ChecqueData.AccountNumber
      ),
        this.bankingData.controls["bankName"].setValue(
          this.ChecqueData.BankName
        ),
        this.bankingData.controls["ifscNo"].setValue(this.ChecqueData.IFSCCode),
        this.bankingData.controls["branch"].setValue(
          this.ChecqueData.BankBranch
        );
      this.bankingData.controls["swiftCode"].enable();
      this.bankingData.controls["pfRegisterationNo"].enable();
      this.bankingData.controls["ESICRegisterationNo"].enable();
      this.bankingData.controls["VATRegisterationNo"].enable();
      this.bankingData.controls["panNo"].enable();
      this.bankingData.controls["serviceTaxRegisterationNo"].enable();
      this.bankingData.controls["CSTNo"].enable();
      this.bankingData.controls["LSTNo"].enable();
      this.bankingData.controls["GSTRegisterationNo"].enable();
      this.bankingData.controls["taxClassification"].enable();
      this.bankingData.controls["TDSExcemptionNo"].enable();
      this.bankingData.controls["excemptionPercentage"].enable();
      this.bankingData.controls["excemptFrom"].enable();
      this.bankingData.controls["excemptTo"].enable();
      this.bankingData.controls["MSMEStatus"].enable();
      this.bankingData.controls["MSMENo"].enable();
      this.bankingData.controls[""].enable();
    } else {
      ;
      // this.getuserProfile();
      this.profileData;
    }
    this.ReCType=[
      { id: "CO", value: "Companies" },
      { id: "FI", value: "Firm" },
      { id: "OT", value: "Others" },
    ]
    
    // initiatlizing the form
    jQuery(document).ready(function () {
      
      // click on next button
      // jQuery('.form-wizard-steps li').click(function () {
      // 	$('.form-wizard-steps li').removeClass('active');
      // 	$(this).addClass('active');
      // });
      // if(this.profileData.valid){
      //   console.log("profileData",this.profileData)
      // }
      jQuery(".form-wizard-steps li").on("click", function () {
        
        jQuery(".form-wizard-steps li").removeClass("active");
        jQuery(this).addClass("active");
        //first hide all other div
        jQuery(".wizard-fieldset").hide();
        var idBtn = jQuery(this).data("id");
        //now open the selected div
        jQuery("#" + idBtn).css("display", "block");
      });

      // jQuery(".form-wizard-next-btn, .form-wizard-previous-btn").on(
      //   "click",
      //   function () {
      //     
      //     // jQuery('.form-wizard-steps li').removeClass('active');
      //     // jQuery(this).addClass('active');
      //     //first hide all other div
      //     // if(profileData.valid){

      //     // }
      //     jQuery(".wizard-fieldset").hide();
      //     var idBtn = jQuery(this).data("id");
      //     //now open the selected div
      //     jQuery("#" + idBtn).css("display", "block");

      //     jQuery(".form-wizard-steps li").removeClass("active");
      //     jQuery(`.form-wizard-steps li[data-id="${idBtn}"]`).addClass(
      //       "active"
      //     );
      //   }
      // );

      //click on form submit button
      jQuery(document).on(
        "click",
        ".form-wizard .form-wizard-submit",
        function () {
          
          var parentFieldset = jQuery(this).parents(".wizard-fieldset");
          var currentActiveStep = jQuery(this)
            .parents(".form-wizard")
            .find(".form-wizard-steps .active");
          parentFieldset.find(".wizard-required").each(function () {
            var thisValue = jQuery(this).val();
            if (thisValue == "") {
              jQuery(this).siblings(".wizard-form-error").slideDown();
            } else {
              jQuery(this).siblings(".wizard-form-error").slideUp();
            }
          });
        }
      );

      // focus on input field check empty or not
      jQuery(".form-control")
        .on("focus", function () {
          
          var tmpThis = jQuery(this).val();
          if (tmpThis == "") {
            jQuery(this).parent().addClass("focus-input");
          } else if (tmpThis != "") {
            jQuery(this).parent().addClass("focus-input");
          }
        })
        .on("blur", function () {
          
          var tmpThis = jQuery(this).val();
          if (tmpThis == "") {
            jQuery(this).parent().removeClass("focus-input");
            jQuery(this).siblings(".wizard-form-error").slideDown("3000");
          } else if (tmpThis != "") {
            jQuery(this).parent().addClass("focus-input");
            jQuery(this).siblings(".wizard-form-error").slideUp("3000");
          }
        });
    });
  }
  getMAsterData(){
    this.loaderservice.show();
    const dataTypes = Object.keys(this.dropdownLists);
    const requests$ = dataTypes.map((type) =>
      this.purchaseOrderService.getAccountMaster(type).pipe(
        catchError((err) => {
          console.error(`Error fetching data for ${type}`, err);
          return throwError(err);
        })
      )
    );
    forkJoin(requests$).subscribe(
      (responses: any[]) => {
        responses.forEach((response, index) => {
          const dataType = dataTypes[index];
          if (response?.[0]?.acDetailslist) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.acDetailslist || []
            );
          } else if (response?.[0]?.CompanyList) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.CompanyList || []
            );
          } else if (response?.[0]?.PurchaseList) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.PurchaseList || []
            );
          } else if (response?.[0]?.SchemaList) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.SchemaList || []
            );
          } else if (response?.[0]?.countryList) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.countryList || []
            );
          } else if (response?.[0]?.IndustryList) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.IndustryList || []
            );
          } else if (response?.[0]?.TypeOfBusinessList) {
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.TypeOfBusinessList || []
            );
          // } else if (response?.[0]?.PurOrgList) {
          //   this.dropdownLists[dataType] = this.transformResponse(
          //     response?.[0]?.PurOrgList || []
          //   );
          // } else if(response?.[0]?.PlantList){
          //   this.dropdownLists[dataType] = this.transformResponse(
          //     response?.[0]?.PlantList || []
          //   )
          } else if(response?.[0]?.currencyList){
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.currencyList || []
            )            
          }else if(response?.[0]?.controlList){
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.controlList || []
            )  
            this.dropdownLists.confTemp = this.dropdownLists[dataType]
          }else if(response?.[0]?.PaymentTermsList){
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.PaymentTermsList || []
            )
          // }else if(response?.[0]?.ReconAcountList){
          //   this.dropdownLists[dataType] = this.transformResponse(
          //     response?.[0]?.ReconAcountList || []
          //   )
          }else if(response?.[0]?.PlanningList){
            
            // this.planningList1 = response?.[0]?.PlanningList
            // this.planningList1 = response?.[0]?.PlanningList.map((item: any) => {
            //   return {
            //     id: item.PLANNINGGROUP,  // Mapping PLANNINGGROUP to id
            //     value: item.PLANNINGLEVEL, // Mapping PLANNINGLEVEL to value
            //     desc: item.PLANNINGDESC   // Mapping PLANNINGDESC to desc
            //   };
            // });
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.PlanningList || []
            )
          }
          else if(response?.[0]?.TitleList){
            this.dropdownLists[dataType] = this.transformResponse(
              response?.[0]?.TitleList || []) 
          }else if(response?.[0]?.SortList){
            this.dropdownLists[dataType]=this.transformResponse(
              response?.[0]?.SortList || [])
          }
          else {
            // Assign default value "N/A" if no valid response is found
            this.dropdownLists[dataType] = [{ id: "N/A", value: "N/A"}];
            console.warn(`No valid data for ${dataType}. Defaulting to "N/A".`);
          }
        });
       this.loaderservice.hide();
        console.log("Dropdown lists:", this.dropdownLists); // Verify the contents of dropdownLists
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }

  loadData(): void {
    
    // this.profileData.controls["accountgroup"].setValidators(Validators.required);
    //         this.profileData.controls["accountgroup"].updateValueAndValidity(); 
    let requestID = JSON.parse(this.data);
    this.purchaseOrderService
      .getVendorData(requestID.RequestID)
      .subscribe((data: any) => {
        ;
        this.partneroId = data[0]?.generalReqList[0]?.PartnerID;
        this.status=data[0]?.generalReqList[0]?.Status
        console.log(data);
        debugger
        // this.buyerAmendment.addtionalFileName = data[0].generalReqList[0].additionalFileName;
        // sessionStorage.removeItem("RequestID");
        // this.viewAttachmentNames = data[0].generalReqList[0].additionalFileName.split(', ');
        ;
          this.fileNamesString = data[0]?.generalReqList[0]?.additionalFileName;
        this.fileNamesArray = this.fileNamesString?.split(',');
        this.buyerAmendment.addtionalFileName=this.fileNamesString
        // this.amendament.addtionalFileName=this.fileNamesString
       console.log(this.fileNamesArray);
      this.checatt=data[0]?.generalReqList[0]?.chequeFileName
      this.panatt=data[0]?.generalReqList[0]?.panFileName
      this.gstatt=data[0]?.generalReqList[0]?.gstFileName
      this.msmeatt=data[0]?.generalReqList[0]?.msmeFileName
        this.fileNamesArray = data[0]?.generalReqList[0]?.additionalFileName?.split(',');
        this.addfileNamesArray = data[0]?.generalReqList[0].additionalFileName?.split(',');

        this.profileData.controls["title"]?.setValue(
          data[0]?.generalReqList[0]?.Title
        ),
          this.profileData.controls["vendorName1"].setValue(
            data[0]?.generalReqList[0].ParntnerName
          ),
          this.profileData.controls["vendorName2"].setValue(
            data[0]?.generalReqList[0]?.ParntnerName1
          )
          // this.profileData.controls["vendorName2"].setValue(
          //   response[0].generalData[0].VENDOR_NAME_LINE2
          // ),
          this.profileData.controls["streetLine1"].setValue(
            data[0]?.generalReqList[0]?.Street1
          ),
          this.profileData.controls["streetLine2"].setValue(
            data[0].generalReqList[0].Street2
          ),
          this.profileData.controls["streetLine3"].setValue(
            data[0].generalReqList[0].Street3
          ),
          this.profileData.controls["streetLine4"].setValue(
            data[0].generalReqList[0].Street4
          ),
          this.profileData.controls["postalCode"].setValue(
            data[0].generalReqList[0].PinCode
          ),
          this.profileData.controls["countryKey"].setValue(
            data[0].generalReqList[0].COUNTRY_KEY || ""
          ),
          this.profileData.controls["region"].setValue(
            data[0].generalReqList[0].REGION || ""
          ),
          this.profileData.controls["city"].setValue(
            data[0].generalReqList[0].city
          ),
          this.profileData.controls["telephoneNo"].setValue(
            data[0].generalReqList[0].Telno
          ),
          this.profileData.controls["mobileNo"].setValue(
            data[0].generalReqList[0].MobileNo
          ),
          // this.profileData.controls["faxNo"].setValue(
          //   data[0].generalReqList[0].FAX
          // ),
          this.profileData.controls["vendorEmail"].setValue(
            data[0].generalReqList[0].PrimaryEmailId
          ),
          this.profileData.controls["email1"].setValue(
            data[0].generalReqList[0].SecondaryEmailId
          ),
          this.profileData.controls["email2"].setValue(
            data[0].generalReqList[0].TertiaryEmailId
          ),
          this.profileData.controls["email3"].setValue(
            data[0].generalReqList[0].EmailId4th
          ),
          this.profileData.controls["email4"].setValue(
            data[0].generalReqList[0].EmailId5th
          ),
          this.bankingData.controls["bankName"].setValue(
            data[0].bankReqList[0].bankName
          ),
          this.bankingData.controls["branch"].setValue(
            data[0].bankReqList[0].branch
          ),
          this.bankingData.controls["bankAccountNo"].setValue(
            data[0].bankReqList[0].BankAccNo
          ),
          this.bankingData.controls["swiftCode"].setValue(
            data[0].bankReqList[0].SwiftCoder
          ),
          this.bankingData.controls["ifscNo"].setValue(
            data[0].bankReqList[0].IfscCode
          ),
          this.bankingData.controls["pfRegisterationNo"].setValue(
            data[0].bankReqList[0].PfRegistrationNo
          ),
          this.bankingData.controls["ESICRegisterationNo"].setValue(
            data[0].bankReqList[0].EsiRegistrationNo
          ),
          this.bankingData.controls["VATRegisterationNo"].setValue(
            data[0].bankReqList[0].vatReg
          ),
          this.bankingData.controls["panNo"].setValue(
            data[0].generalReqList[0].PanNumber
          ),
          this.bankingData.controls["serviceTaxRegisterationNo"].setValue(
            data[0].bankReqList[0].sereviceTax
          ),
          this.bankingData.controls["CSTNo"].setValue(
            data[0].bankReqList[0].cstNoDate
          ),
          this.bankingData.controls["LSTNo"].setValue(
            data[0].bankReqList[0].lstNoDate
          ),
          this.bankingData.controls["GSTRegisterationNo"].setValue(
            data[0].bankReqList[0].GstNo
          ),
          this.bankingData.controls["taxClassification"].setValue(
            data[0].bankReqList[0].taxClass
          ),
          this.bankingData.controls["TDSExcemptionNo"].setValue(
            data[0].bankReqList[0].TdsExemption
          ),
          this.bankingData.controls["excemptionPercentage"].setValue(
            data[0].bankReqList[0].TdsExemptionPercent
          ),
          // this.bankingData.controls['TDSExcemptionNo2'].setValue(response.TDSExcemptionNo2),
          // this.bankingData.controls['excemptionPercentage2'].setValue(response.excemptionPercentage2),
          this.bankingData.controls["excemptFrom"].setValue(
            data[0].bankReqList[0].TdsExemptionFrom
          ),
          this.bankingData.controls["excemptTo"].setValue(
            data[0].bankReqList[0].TdsExemptionTo
          ),
          this.bankingData.controls["MSMEStatus"].setValue(
            data[0].bankReqList[0].MsmeStatus
          ),
          this.bankingData.controls["MSMENo"].setValue(
            data[0].bankReqList[0].MsmeNo
          ),
          this.businessData.controls["businessType"].setValue(
            data[0].businessReqList[0].TypeOfBusiness
          ),
          this.businessData.controls["industryType"].setValue(
            data[0].businessReqList[0].TypeOfIndustry
          ),
          this.businessData.controls["promoters"].setValue(
            data[0].businessReqList[0].Promoters
          ),
          this.businessData.controls["turnOver"].setValue(
            data[0].businessReqList[0].Turnover
          ),
          console.log(
            this.businessData.controls.turnOver.value,
            "value here---------"
          );
        this.businessData.controls["clientRef"].setValue(
          data[0].businessReqList[0].CLIENT_REFERNCES
        ),
          this.businessData.controls["complianceCategory"].setValue(
            data[0].businessReqList[0].compliCate
          ),
          this.businessData.controls["constitutionBus"].setValue(
            data[0].businessReqList[0].conasitOfBusin
          );
          if(data[0].generalReqList[0].Status == "L0"){
            this.showregistrationFields = false;
            this.showbuyerregistrationFields = true;
            this.profileData.controls["accountgroup"].setValidators(Validators.required);
            this.profileData.controls["accountgroup"].updateValueAndValidity();
            this.profileData.controls["companyCode"].setValidators(Validators.required);
            this.profileData.controls["companyCode"].updateValueAndValidity();
            this.profileData.controls["purchasingOrg"].setValidators(Validators.required);
            this.profileData.controls["purchasingOrg"].updateValueAndValidity();
            this.profileData.controls["purchGroup"].setValidators(Validators.required);
            this.profileData.controls["purchGroup"].updateValueAndValidity();
            this.profileData.controls["countryKey"].setValidators(Validators.required);
            this.profileData.controls["countryKey"].updateValueAndValidity();
            this.profileData.controls["region"].setValidators(Validators.required);
            this.profileData.controls["region"].updateValueAndValidity();
            this.profileData.controls["vendorEmail"].setValidators(Validators.required);
            this.profileData.controls["vendorEmail"].updateValueAndValidity();
            this.profileData.controls["schGrpVndr"].setValidators(Validators.required);
            this.profileData.controls["schGrpVndr"].updateValueAndValidity();
            this.profileData.controls["plantCode"].setValidators(Validators.required);
            this.profileData.controls["plantCode"].updateValueAndValidity();
            this.bankingData.controls["orderCurrency"].setValidators(Validators.required);
            this.bankingData.controls["orderCurrency"].updateValueAndValidity();
            this.bankingData.controls["paymentTerms"].setValidators(Validators.required);
            this.bankingData.controls["paymentTerms"].updateValueAndValidity();
            this.businessData.controls["businessType"].setValidators(Validators.required);
            this.businessData.controls["businessType"].updateValueAndValidity();
            this.businessData.controls["industryType"].setValidators(Validators.required);
            this.businessData.controls["industryType"].updateValueAndValidity();
            this.businessData.controls["complianceCategory"].setValidators(Validators.required);
            this.businessData.controls["complianceCategory"].updateValueAndValidity();
            this.businessData.controls["constitutionBus"].setValidators(Validators.required);
            this.businessData.controls["constitutionBus"].updateValueAndValidity();
            this.businessData.controls["Conf"].setValidators(Validators.required);
            this.businessData.controls["Conf"].updateValueAndValidity();
            // this.businessData.controls["remarks"].setValidators(Validators.required);
            // this.businessData.controls["remarks"].updateValueAndValidity();
            // this.showEdit=false;
            if(data[0].generalReqList[0].BoId){
              this.profileData.controls["countryKey"]?.setValue(
                data[0].generalReqList[0]?.country || ""
              )
              this.profileData.controls["region"]?.setValue(
                data[0].generalReqList[0]?.region ||""
              )
              this.fromAmendment=true
              // this.profileData.controls["region"].disable();
              // this.profileData.controls["vendorName1"].disable();
              // this.bankingData.controls["panNo"]?.disable()
              // this.bankingData.controls["GSTRegisterationNo"]?.disable()
              this.GetRegion(data[0].generalReqList[0].country,null)
            }
            this.businessData.controls["promoters"].setValue(
              data[0].businessReqList[0].Promoters
            )
            this.profileData.controls["sBuyer"].setValue(
              data[0].generalReqList[0].buyer
            )
            // this.businessData.controls["promoters"].disable();
            this.businessData.controls["turnOver"].setValue(
              data[0].businessReqList[0].Turnover
            )
            // this.businessData.controls["turnOver"].disable();
            this.businessData.controls["clientRef"].setValue(
              data[0].businessReqList[0].clientRefernce
            )
            // this.businessData.controls["clientRef"].disable();
            // this.profileData.controls["countryKey"].setValue(
            //   data[0].generalReqList[0].country
            // )
            // this.profileData.controls["countryKey"].disable();
            
          }else if(data[0].generalReqList[0].Status == "L1"){
            this.L1usershowfileds = false;
            this.profileData.controls["accountgroup"].setValue(
              data[0].generalReqList[0].acGroup
            )
            this.getConf(data[0]?.generalReqList[0]?.acGroup)
            // this.profileData.controls["accountgroup"].disable();
            this.profileData.controls["purchGroup"].setValue(
              data[0].generalReqList[0].purchasGroup
            )
            // this.profileData.controls["purchGroup"].disable();

            this.profileData.controls["purchasingOrg"].setValue(
              data[0].generalReqList[0].purchasOrg
            )
            // this.profileData.controls["purchasingOrg"].disable();
            this.profileData.controls["companyCode"].setValue(
              data[0].generalReqList[0].compCode
            )
            // this.profileData.controls["companyCode"].disable();
            // this.profileData.controls["accountgroup"].disable();
            this.profileData.controls["schGrpVndr"].setValue(
              data[0].generalReqList[0].schemaGroup
            )
            // this.profileData.controls["schGrpVndr"].disable();

            this.profileData.controls["sBuyer"].setValue(
              data[0].generalReqList[0].buyer
            )
            // this.profileData.controls["sBuyer"].disable();
            this.profileData.controls["plantCode"].setValue(data[0].generalReqList[0].plantCode)
            //  this.profileData.controls["plantCode"].disable(); 
            
            this.bankingData.controls["orderCurrency"].setValue(
              data[0].bankReqList[0].orderCurrency
            )
            // this.bankingData.controls["orderCurrency"].disable();
            this.bankingData.controls["paymentTerms"].setValue(
              data[0].bankReqList[0].paymentTerms
            )
            // this.bankingData.controls["paymentTerms"].disable();
          
            this.businessData.controls["promoters"].setValue(
              data[0].businessReqList[0].Promoters
            )
            // this.businessData.controls["promoters"].disable();
            this.businessData.controls["turnOver"].setValue(
              data[0].businessReqList[0].Turnover
            )
            // this.businessData.controls["turnOver"].disable();
            this.businessData.controls["clientRef"].setValue(
              data[0].businessReqList[0].clientRefernce
            )
            this.profileData.controls["countryKey"].setValue(
              data[0].generalReqList[0].country ||""
            )
            debugger
            this.getReeconAccount(data[0].generalReqList[0].compCode,null);
            this.getPlant(data[0].generalReqList[0].purchasGroup,null);
            this.GetRegion(data[0].generalReqList[0].country,null);
            // this.profileData.controls["countryKey"].disable();
            this.profileData.controls["region"].setValue(
              data[0].generalReqList[0].region ||""
            )
            // this.profileData.controls["region"].disable();
            // this.businessData.controls["clientRef"].disable();
            this.businessData.controls["businessType"].setValue(data[0].businessReqList[0].TypeOfBusiness )
              // this.businessData.controls["businessType"].disable();
              this.businessData.controls["industryType"].setValue(data[0].businessReqList[0].TypeOfIndustry )
              // this.businessData.controls["industryType"].disable();
              this.businessData.controls["complianceCategory"].setValue(data[0].businessReqList[0].compliCate )
              // this.businessData.controls["complianceCategory"].disable();
              this.businessData.controls["constitutionBus"].setValue(data[0].businessReqList[0].conasitOfBusin )
              // this.businessData.controls["constitutionBus"].disable();
              this.businessData.controls["Conf"].setValue(data[0].businessReqList[0].confControl )
              // this.businessData.controls["Conf"].disable();
              this.businessData.controls["remarks"].setValue(data[0].businessReqList[0].remarks )
              // this.businessData.controls["remarks"].disable();
          }else if(data[0].generalReqList[0].Status == "L2"){
            this.L1usershowfileds = true;
            this.bankingData.controls["ReconAcc"].setValidators(Validators.required);
            this.bankingData.controls["ReconAcc"].updateValueAndValidity();
            this.bankingData.controls["SortKey"].setValidators(Validators.required);
            this.bankingData.controls["SortKey"].updateValueAndValidity();
            this.bankingData.controls["PlaningGroup"].setValidators(Validators.required);
            this.bankingData.controls["PlaningGroup"].updateValueAndValidity();
            this.bankingData.controls["PaymentMethods"].setValidators(Validators.required);
            this.bankingData.controls["PaymentMethods"].updateValueAndValidity();
            this.bankingData.controls["VendorsBAnkKEy"].setValidators(Validators.required);
            this.bankingData.controls["VendorsBAnkKEy"].updateValueAndValidity();
            this.bankingData.controls["BankCountry"].setValidators(Validators.required);
            this.bankingData.controls["BankCountry"].updateValueAndValidity();
            debugger
            this.bankingData.controls["DuplicateInvoice"].setValidators(Validators.required);
            this.bankingData.controls["DuplicateInvoice"].updateValueAndValidity();
            

            this.getPlant(data[0].generalReqList[0].purchasGroup,null);
            this.GetRegion(data[0].generalReqList[0].country,"type");
            debugger
            this.getReeconAccount(data[0].generalReqList[0].compCode,null);

            this.profileData.controls["accountgroup"].setValue(
                data[0].generalReqList[0].acGroup
              )
              this.getConf(data[0]?.generalReqList[0]?.acGroup)
              // this.profileData.controls["accountgroup"].disable();
              this.profileData.controls["purchGroup"].setValue(
                data[0].generalReqList[0].purchasGroup
              )
              // this.profileData.controls["purchGroup"].disable();
  
              this.profileData.controls["purchasingOrg"].setValue(
                data[0].generalReqList[0].purchasOrg
              )
              // this.profileData.controls["purchasingOrg"].disable();
  
              this.profileData.controls["companyCode"].setValue(
                data[0].generalReqList[0].compCode
              )
              this.profileData.controls["title"].setValue(
                data[0].generalReqList[0].Title
              )
              
              // this.profileData.controls["companyCode"].disable();
              // this.profileData.controls["accountgroup"].disable();
              this.profileData.controls["schGrpVndr"].setValue(
                data[0].generalReqList[0].schemaGroup
              )
              // this.profileData.controls["schGrpVndr"].disable();
              this.profileData.controls["countryKey"].setValue(
                data[0].generalReqList[0].country || ""
              )
              this.GetRegion(data[0].generalReqList[0].country,null);
              // this.profileData.controls["countryKey"].disable();
              this.profileData.controls["region"].setValue(
                data[0].generalReqList[0].region ||""
              )
  
              this.profileData.controls["sBuyer"].setValue(
                data[0].generalReqList[0].buyer
              )
              // this.profileData.controls["sBuyer"].disable();
              this.profileData.controls["plantCode"].setValue(data[0].generalReqList[0].plantCode)
              //  this.profileData.controls["plantCode"].disable(); 
              
              this.bankingData.controls["orderCurrency"].setValue(
                data[0].bankReqList[0].orderCurrency
              )
              // this.bankingData.controls["orderCurrency"].disable();
              this.bankingData.controls["paymentTerms"].setValue(
                data[0].bankReqList[0].paymentTerms
              )
              // this.bankingData.controls["paymentTerms"].disable();
              this.businessData.controls["promoters"].setValue(
                data[0].businessReqList[0].Promoters
              )
              // this.businessData.controls["promoters"].disable();
              this.businessData.controls["turnOver"].setValue(
                data[0].businessReqList[0].Turnover)
              // this.businessData.controls["turnOver"].disable();
              this.businessData.controls["clientRef"].setValue(data[0].businessReqList[0].clientRefernce )
              // this.businessData.controls["clientRef"].disable();
              this.businessData.controls["businessType"].setValue(data[0].businessReqList[0].TypeOfBusiness )
              // this.businessData.controls["businessType"].disable();
              this.businessData.controls["industryType"].setValue(data[0].businessReqList[0].TypeOfIndustry )
              // this.businessData.controls["industryType"].disable();
              this.businessData.controls["complianceCategory"].setValue(data[0].businessReqList[0].compliCate )
              // this.businessData.controls["complianceCategory"].disable();
              this.businessData.controls["constitutionBus"].setValue(data[0].businessReqList[0].conasitOfBusin )
              // this.businessData.controls["constitutionBus"].disable();
              this.businessData.controls["Conf"].setValue(data[0].businessReqList[0].confControl )
              // this.businessData.controls["Conf"].disable();
              this.businessData.controls["remarks"].setValue(data[0].businessReqList[0].remarks )
              // this.businessData.controls["remarks"].disable();
          }
           else if( data[0].generalReqList[0].Status == "L3"){
            debugger
            this.L1usershowfileds = true;
            this.showbuyerregistrationFields = true;

            this.profileData.controls["accountgroup"].setValue(
              data[0].generalReqList[0].acGroup
            )
            this.getConf(data[0]?.generalReqList[0]?.acGroup)

           
            // this.profileData.controls["accountgroup"].disable();
            this.profileData.controls["purchGroup"].setValue(
              data[0].generalReqList[0].purchasGroup
            )
            // this.profileData.controls["purchGroup"].disable();

            this.profileData.controls["purchasingOrg"].setValue(
              data[0].generalReqList[0].purchasOrg
            )
            // this.profileData.controls["purchasingOrg"].disable();

            this.profileData.controls["companyCode"].setValue(
              data[0].generalReqList[0].compCode
            )
            // this.profileData.controls["companyCode"].disable();
            // this.profileData.controls["accountgroup"].disable();
            this.profileData.controls["schGrpVndr"].setValue(
              data[0].generalReqList[0].schemaGroup
            )
            // this.profileData.controls["schGrpVndr"].disable();

            this.profileData.controls["sBuyer"].setValue(
              data[0].generalReqList[0].buyer
            )
            // this.profileData.controls["sBuyer"].disable();
            this.profileData.controls["plantCode"].setValue(data[0].generalReqList[0].plantCode)
            //  this.profileData.controls["plantCode"].disable();
             this.profileData.controls["countryKey"].setValue(
              data[0].generalReqList[0].country || ""
            )
            // this.profileData.controls["countryKey"].disable();
            this.GetRegion(data[0].generalReqList[0].country,null);
            debugger
            this.getPlant(data[0].generalReqList[0].purchasGroup,null);
            this.GetRegion(data[0].generalReqList[0].country,"bankkey", data[0]);
            debugger
            // data[0].whTaxList.forEach((item) => {
            //   this.rows.push(this.createRow(item));
            // });
            this.processResponse(data[0].whTaxList);
            debugger
            this.removeRow(0);
            this.getReeconAccount(data[0].generalReqList[0].compCode,null);
            this.profileData.controls["region"].setValue(
              data[0].generalReqList[0].region || ""
            )
            // this.profileData.controls["region"].disable();

            this.bankingData.controls["ReconAcc"].setValue(
              data[0].bankReqList[0].reconAcc
            )
            // this.bankingData.controls["ReconAcc"].disable();
            this.bankingData.controls["SortKey"].setValue(
              data[0].bankReqList[0].softKey
            )
            // this.bankingData.controls["SortKey"].disable();
            this.bankingData.controls["PlaningGroup"].setValue(
              data[0].bankReqList[0].plannGroup
            )
            // this.bankingData.controls["PlaningGroup"].disable();
            this.bankingData.controls["paymentTerms"].setValue(
              data[0].bankReqList[0].paymentTerms
            )
            // this.bankingData.controls["paymentTerms"].disable();
            this.bankingData.controls["PaymentMethods"].setValue(
              data[0].bankReqList[0].paymentMethod
            )
            // this.bankingData.controls["PaymentMethods"].disable();
            this.bankingData.controls["VendorsBAnkKEy"].setValue(
              data[0].bankReqList[0].venBankKey
            )
            // this.bankingData.controls["VendorsBAnkKEy"].disable();
            this.bankingData.controls["BankCountry"].setValue(
              data[0].bankReqList[0].bankAccKey
            )
            // this.bankingData.controls["BankCountry"].disable();
            this.bankingData.controls["DuplicateInvoice"].setValue(
              data[0].bankReqList[0].duplicateInv
            )
            // this.bankingData.controls["DuplicateInvoice"].disable();
            this.bankingData.controls["orderCurrency"].setValue(data[0].bankReqList[0].orderCurrency)
            // this.bankingData.controls["orderCurrency"].disable();
            this.businessData.controls["promoters"].setValue(
              data[0].businessReqList[0].Promoters
            )
            // this.businessData.controls["promoters"].disable();
            this.businessData.controls["turnOver"].setValue(
              data[0].businessReqList[0].Turnover)
            // this.businessData.controls["turnOver"].disable();
            this.businessData.controls["clientRef"].setValue(data[0].businessReqList[0].clientRefernce )
            // this.businessData.controls["clientRef"].disable();
            this.businessData.controls["businessType"].setValue(data[0].businessReqList[0].TypeOfBusiness )
            // this.businessData.controls["businessType"].disable();
            this.businessData.controls["industryType"].setValue(data[0].businessReqList[0].TypeOfIndustry )
            // this.businessData.controls["industryType"].disable();
            this.businessData.controls["complianceCategory"].setValue(data[0].businessReqList[0].compliCate )
            // this.businessData.controls["complianceCategory"].disable();
            this.businessData.controls["constitutionBus"].setValue(data[0].businessReqList[0].conasitOfBusin )
            // this.businessData.controls["constitutionBus"].disable();
            this.businessData.controls["Conf"].setValue(data[0].businessReqList[0].confControl )
            // this.businessData.controls["Conf"].disable();
            this.businessData.controls["remarks"].setValue(data[0].businessReqList[0].remarks )
            // this.businessData.controls["remarks"].disable(); 
          }
          // this.organizationData.disable();
      });
  }
  
  processResponse(response: any[]) {
    debugger
    // Loop through the response and call `getTcode` for each WhTaxCode
    response.forEach((item, i) => {
      if (item.WhTaxType) {
        this.getTcode(item.WhTaxType,i); // ass the WhTaxCode and RecType (or any other relevant data)
      }
    });
  }
  transformResponse(data: any[]): DropdownItem[] {
    return data.map((item) => ({
      id: item[0] || "NA",
      value: item[1] || "NA",
      // desc:item[2]|| "",
    }));
  }
  validateExcepDates: ValidatorFn = (group: AbstractControl) => {
    const fromDate = group.get('ExcepFrom')?.value;
    const toDate = group.get('ExcepTo')?.value;
  
    if (fromDate && toDate && new Date(fromDate) >= new Date(toDate)) {
      group.get('ExcepTo')?.setErrors({ dateInvalid: true });
      return { dateInvalid: true };
    }
    
    return null;
  };
 
  // //submit the complete form  Dummy function
  submit() {
    console.log("submt", this.profileData);
    this.router.navigate(["/dashboard"]);
  }
  // getting the data of signed in person to the form
  getuserProfile() {
    debugger
    var filevalue = "";
    try {
      this.profileService.getProfile().subscribe((response) => {
        this.profilemodel = response[0];
        console.log("profilemodel", this.profilemodel);
        console.log("profileDetails", response[0]);
        if (response) {
          console.log("success");
          this.Vendor_ID1 = response[0].generalData[0].Vendor_ID;
          console.log("success", this.Vendor_ID1);
          this.bankingData.controls["panNo"]?.setValue(
            response[0].bankingData[0]?.PAN
          ),
          // this.bankingData.controls["panNo"].disable();
            this.profileData.controls["purchGroup"]?.setValue(
              response[0].generalData[0]?.PURCH_GROUP
            ),
            this.profileData.controls["plantCode"]?.setValue(
              response[0].generalData[0]?.COMPANY_CODE
            ),
            this.profileData.controls["title"]?.setValue(
              response[0].generalData[0]?.Title
            ),
            this.profileData.controls["vendorName1"]?.setValue(
              response[0].generalData[0]?.VENDOR_NAME_LINE1
            ),
            this.profileData.controls["vendorName2"]?.setValue(
              response[0].generalData[0]?.VENDOR_NAME_LINE2
            ),
            this.profileData.controls["streetLine1"]?.setValue(
              response[0].generalData[0]?.STREET_LINE1
            ),
            this.profileData.controls["streetLine2"]?.setValue(
              response[0].generalData[0]?.STREET_LINE2
            ),
            this.profileData.controls["streetLine3"]?.setValue(
              response[0].generalData[0]?.STREET_LINE3
            ),
            this.profileData.controls["streetLine4"]?.setValue(
              response[0].generalData[0]?.STREET_LINE4
            ),
            this.profileData.controls["postalCode"]?.setValue(
              response[0].generalData[0]?.POSTAL_CODE
            ),
            this.profileData.controls["countryKey"]?.setValue(
              response[0].generalData[0]?.COUNTRY_KEY || ""
            ),
            this.GetRegion(response[0].generalData[0]?.COUNTRY_KEY,null);
            this.profileData.controls["region"]?.setValue(
              response[0].generalData[0]?.REGION ||""
            ),
            this.profileData.controls["city"]?.setValue(
              response[0].generalData[0].CITY
            ),
            this.profileData.controls["telephoneNo"]?.setValue(
              response[0].generalData[0]?.TELEPHONE
            ),
            this.profileData.controls["mobileNo"]?.setValue(
              response[0].generalData[0]?.MOBILE_NO
            ),
            this.profileData.controls["faxNo"]?.setValue(
              response[0].generalData[0]?.FAX
            ),
            this.profileData.controls["vendorEmail"]?.setValue(
              response[0].generalData[0]?.PRIMARYEMAILID
            ),
            this.profileData.controls["email1"]?.setValue(
              response[0].generalData[0]?.SECONDARYEMAILID
            ),
            this.profileData.controls["email2"]?.setValue(
              response[0].generalData[0]?.TERTIARYEMAILID
            ),
            this.profileData.controls["email3"]?.setValue(
              response[0].generalData[0]?.EMAILID5
            ),
            this.profileData.controls["email4"]?.setValue(
              response[0].generalData[0]?.EMAILID4
            ),
            this.bankingData.controls["bankName"]?.setValue(
              response[0].bankingData[0]?.BANK_NAME
            ),
            this.bankingData.controls["branch"]?.setValue(
              response[0].bankingData[0]?.BRANCH
            ),
            this.bankingData.controls["bankAccountNo"]?.setValue(
              response[0].bankingData[0]?.BANK_ACCOUNT
            ),
            this.bankingData.controls["swiftCode"]?.setValue(
              response[0].bankingData[0]?.SWIFT_CODE
            ),
            this.bankingData.controls["ifscNo"]?.setValue(
              response[0].bankingData[0]?.IFSC_NUMBER
            ),
            this.bankingData.controls["pfRegisterationNo"]?.setValue(
              response[0].bankingData[0]?.PF_REGISTRATION_NUMBER
            ),
            this.bankingData.controls["ESICRegisterationNo"]?.setValue(
              response[0].bankingData[0]?.ESIC_REGISTRATION_NUMBER
            ),
            this.bankingData.controls["VATRegisterationNo"]?.setValue(
              response[0].bankingData[0]?.VAT_REGISTRATION
            ),
            this.bankingData.controls["serviceTaxRegisterationNo"]?.setValue(
              response[0].bankingData[0]?.SERVICE_TAX_REG_NO
            ),
            this.bankingData.controls["CSTNo"]?.setValue(
              response[0].bankingData[0]?.CST_NO
            ),
            this.bankingData.controls["LSTNo"]?.setValue(
              response[0].bankingData[0]?.LST_NO
            ),
            this.bankingData.controls["GSTRegisterationNo"]?.setValue(
              response[0].bankingData[0]?.GST_REGN
            ),
            this.bankingData.controls["taxClassification"]?.setValue(
              response[0].bankingData[0]?.TAX_CLASSSIFICATION
            ),
            this.bankingData.controls["TDSExcemptionNo"]?.setValue(
              response[0].bankingData[0]?.TDS_EXEMP_NO
            ),
            this.bankingData.controls["excemptionPercentage"]?.setValue(
              response[0].bankingData[0]?.EXEMPT
            ),
            // this.bankingData.controls['TDSExcemptionNo2'].setValue(response.TDSExcemptionNo2),
            // this.bankingData.controls['excemptionPercentage2'].setValue(response.excemptionPercentage2),
            this.bankingData.controls["excemptFrom"]?.setValue(
              response[0].bankingData[0]?.EXEMPT_FROM
            ),
            this.bankingData.controls["excemptTo"]?.setValue(
              response[0].bankingData[0]?.EXEMPT_TO
            ),
            this.bankingData.controls["MSMEStatus"]?.setValue(
              response[0].bankingData[0]?.MSME_STATUS
            ),
            this.bankingData.controls["MSMENo"]?.setValue(
              response[0].bankingData[0]?.MSME_NO
            ),
            this.businessData.controls["businessType"]?.setValue(
              response[0].businessData[0]?.TYPE_OF_BUSINESS
            ),
            this.businessData.controls["industryType"]?.setValue(
              response[0].businessData[0]?.TYPE_OF_INDUSTRY
            ),
            this.businessData.controls["promoters"]?.setValue(
              response[0].businessData[0]?.PROMOTERS
            ),
            console.log(
              "top 5",
              response[0].businessData[0].UPLOAD_PRODUCT_PORTFOLIO
            );
          if (response[0].businessData[0].UPLOAD_PRODUCT_PORTFOLIO != "null") {
            this.viewAttachmentName =
              response[0].businessData[0].UPLOAD_PRODUCT_PORTFOLIO;
          }
          console.log(this.viewAttachmentName, "viewAttachmentName");
          // this.organizationData.controls['UploadPortfolio'].setValue(this.viewAttachmentName),
          // console.log(this.organizationData.controls.UploadPortfolio.value,'value here---------')
          this.organizationData.controls["top5Clients"]?.setValue(
            response[0].businessData[0]?.TOP_5_CLIENTS
          ),
            this.businessData.controls["turnOver"]?.setValue(
              response[0].businessData[0]?.TURNOVER
            ),
            console.log(
              this.businessData.controls.turnOver.value,
              "value here---------"
            );
          this.businessData.controls["clientRef"]?.setValue(
            response[0].businessData[0]?.CLIENT_REFERNCES
          ),
            this.businessData.controls["complianceCategory"]?.setValue(
              response[0].businessData[0]?.COMPLIANCE_CATEGORY
            ),
            this.businessData.controls["constitutionBus"]?.setValue(
              response[0].businessData[0]?.CONSITUTION_OF_BUS
            ),
            this.organizationData.controls["companyName"]?.setValue(
              response[0].personalData[0]?.COMPANY_NAME
            ),
            this.organizationData.controls["parentCompany"]?.setValue(
              response[0].personalData[0]?.PARENT_COMPANY
            ),
            this.organizationData.controls["globalHeadOffice"]?.setValue(
              response[0].personalData[0]?.GLOBAL_HEAD_OFFICE
            ),
            this.organizationData.controls["IndiaHeadOffice"]?.setValue(
              response[0].personalData[0]?.INDIA_HEAD_OFFICE
            ),
            this.organizationData.controls["website"]?.setValue(
              response[0].personalData[0]?.WEBSITE
            ),
            this.organizationData.controls["manufacturingSite"]?.setValue(
              response[0].personalData[0]?.MANUFACTUREING_SITE
            ),
            this.organizationData.controls["mfgCapacity"]?.setValue(
              response[0].personalData[0]?.MFG_CAPACITY
            ),
            this.organizationData.controls["yearofEshtablihsment"]?.setValue(
              response[0].personalData[0]?.YEAR_OF_ESTABLISHMENT.toString()
            ),
            this.organizationData.controls["companyDescription"]?.setValue(
              response[0].personalData[0]?.BRIEF_DESC_OF_COMPANY
            ),
            this.organizationData.controls["BnC_Category"]?.setValue(
              response[0].personalData[0]?.BNC_CATEGORY
            ),
            this.organizationData.controls[
              "Material_Service_Provider"
            ]?.setValue(response[0].personalData[0]?.MATERIAL_SERV_PROVIDER),
            this.organizationData.controls["revenueLY"]?.setValue(
              response[0].personalData[0]?.REVENUE
            ),
            this.organizationData.controls["PATLY"]?.setValue(
              response[0].personalData[0]?.PAY_LY
            ),
            this.organizationData.controls["LYSpend"]?.setValue(
              response[0].personalData[0]?.LY_SPEND
            ),
            this.organizationData.controls["EmployeeSize"]?.setValue(
              response[0].personalData[0]?.NO_OF_EMPLOYEES
            ),
            this.organizationData.controls["NameL1"]?.setValue(
              response[0].leadershipData[0]?.L1_LEADER_NAME
            ),
            this.organizationData.controls["emailIDL1"]?.setValue(
              response[0].leadershipData[0]?.L1_LEADER_EMAIL_ID
            ),
            this.organizationData.controls["contactNoL1"]?.setValue(
              response[0].leadershipData[0]?.L1_LEADER_CONTACT_NO
            ),
            this.organizationData.controls["nameL2"]?.setValue(
              response[0].leadershipData2[0].L2_LEADER_NAME
            ),
            this.organizationData.controls["emailIDL2"]?.setValue(
              response[0].leadershipData2[0]?.L2_LEADER_EMAIL_ID
            ),
            this.organizationData.controls["contactNoL2"]?.setValue(
              response[0].leadershipData2[0]?.L2_LEADER_CONTACT_NO
            ),
            this.organizationData.controls["BCCLAssociation"]?.setValue(
              response[0].leadershipData2[0]?.L2_LEADER_ASSOCIATED
            ),
            this.organizationData.controls["BCCLannualSpend"]?.setValue(
              response[0].leadershipData2[0]?.L2_LEADER_BCCL_ANNUAL
            ),
            this.organizationData.controls["groupCO"]?.setValue(
              response[0].leadershipData2[0]?.L2_LEADER_GROUP_CO
            ),
            this.organizationData.controls.marketUpdate?.setValue(
              response[0].leadershipData2[0]?.L2_LEADER_MARKET
            );
            this.organizationData.enable();

          console.log("updated form", this.organizationData);
          if(response[0]?.vendorCheck[0]?.StatusCode=="401" && response[0]?.vendorCheck[0]?.Message=="Request has been already submitted."){
            this.Vendor_ID1 = response[0].generalData[0].Vendor_ID;
            console.log("success", this.Vendor_ID1);
            this.bankingData.controls["panNo"]?.setValue(
              response[0].bankingData[0]?.PAN
            ),
            this.bankingData.controls["panNo"].disable();
              this.profileData.controls["purchGroup"]?.setValue(
                response[0].generalData[0]?.PURCH_GROUP
              ),
              this.profileData.controls["purchGroup"].disable();
              
              this.profileData.controls["plantCode"]?.setValue(
                response[0].generalData[0]?.COMPANY_CODE
              ),
              this.profileData.controls["plantCode"].disable();

              this.profileData.controls["title"]?.setValue(
                response[0].generalData[0]?.Title
              ),
              this.profileData.controls["title"].disable();
              
              this.profileData.controls["vendorName1"]?.setValue(
                response[0].generalData[0]?.VENDOR_NAME_LINE1
              ),
              this.profileData.controls["vendorName1"].disable();
              this.profileData.controls["vendorName2"]?.setValue(
                response[0].generalData[0]?.VENDOR_NAME_LINE2
              ),
              this.profileData.controls["vendorName2"].disable();
              this.profileData.controls["streetLine1"]?.setValue(
                response[0].generalData[0]?.STREET_LINE1
              ),
              this.profileData.controls["streetLine1"].disable();
              this.profileData.controls["streetLine2"]?.setValue(
                response[0].generalData[0]?.STREET_LINE2
              ),
              this.profileData.controls["streetLine2"].disable();
              this.profileData.controls["streetLine3"]?.setValue(
                response[0].generalData[0]?.STREET_LINE3
              ),
              this.profileData.controls["streetLine3"].disable();
              this.profileData.controls["streetLine4"]?.setValue(
                response[0].generalData[0]?.STREET_LINE4
              ),
              this.profileData.controls["streetLine4"].disable();
              this.profileData.controls["postalCode"]?.setValue(
                response[0].generalData[0]?.POSTAL_CODE
              ),
              this.profileData.controls["postalCode"].disable()
              this.profileData.controls["countryKey"]?.setValue(
                response[0].generalData[0]?.COUNTRY_KEY || ""
              ),
              this.profileData.controls["countryKey"].disable();
              this.GetRegion(response[0].generalData[0]?.COUNTRY_KEY,null);
              this.profileData.controls["region"]?.setValue(
                response[0].generalData[0]?.REGION ||""
              ),this.profileData.controls["region"].disable();
              this.profileData.controls["city"]?.setValue(
                response[0].generalData[0].CITY
              ),this.profileData.controls["city"].disable();
              this.profileData.controls["telephoneNo"]?.setValue(
                response[0].generalData[0]?.TELEPHONE
              ),this.profileData.controls["telephoneNo"].disable();
              this.profileData.controls["mobileNo"]?.setValue(
                response[0].generalData[0]?.MOBILE_NO
              ),this.profileData.controls["mobileNo"].disable();
              this.profileData.controls["faxNo"]?.setValue(
                response[0].generalData[0]?.FAX
              ),
              this.profileData.controls["vendorEmail"]?.setValue(
                response[0].generalData[0]?.PRIMARYEMAILID
              ),this.profileData.controls["vendorEmail"].disable(); 
              this.profileData.controls["email1"]?.setValue(
                response[0].generalData[0]?.SECONDARYEMAILID
              ),this.profileData.controls["email1"].disable();
              this.profileData.controls["email2"]?.setValue(
                response[0].generalData[0]?.TERTIARYEMAILID
              ),this.profileData.controls["email2"].disable();
              this.profileData.controls["email3"]?.setValue(
                response[0].generalData[0]?.EMAILID5
              ),this.profileData.controls["email3"].disable();
              this.profileData.controls["email4"]?.setValue(
                response[0].generalData[0]?.EMAILID4
              ),this.profileData.controls["email4"].disable();
              this.bankingData.controls["bankName"]?.setValue(
                response[0].bankingData[0]?.BANK_NAME
              ),this.bankingData.controls["bankName"].disable()
              this.bankingData.controls["branch"]?.setValue(
                response[0].bankingData[0]?.BRANCH
              ),this.bankingData.controls["branch"].disable()
              this.bankingData.controls["bankAccountNo"]?.setValue(
                response[0].bankingData[0]?.BANK_ACCOUNT
              ),this.bankingData.controls["bankAccountNo"].disable()
              this.bankingData.controls["swiftCode"]?.setValue(
                response[0].bankingData[0]?.SWIFT_CODE
              ),this.bankingData.controls["swiftCode"].disable()
              this.bankingData.controls["ifscNo"]?.setValue(
                response[0].bankingData[0]?.IFSC_NUMBER
              ),this.bankingData.controls["ifscNo"].disable()
              this.bankingData.controls["pfRegisterationNo"]?.setValue(
                response[0].bankingData[0]?.PF_REGISTRATION_NUMBER
              ),this.bankingData.controls["pfRegisterationNo"].disable()
              this.bankingData.controls["ESICRegisterationNo"]?.setValue(
                response[0].bankingData[0]?.ESIC_REGISTRATION_NUMBER
              ),this.bankingData.controls["ESICRegisterationNo"].disable()
              this.bankingData.controls["VATRegisterationNo"]?.setValue(
                response[0].bankingData[0]?.VAT_REGISTRATION
              ),this.bankingData.controls["VATRegisterationNo"].disable()
              this.bankingData.controls["serviceTaxRegisterationNo"]?.setValue(
                response[0].bankingData[0]?.SERVICE_TAX_REG_NO
              ),this.bankingData.controls["serviceTaxRegisterationNo"].disable()
              this.bankingData.controls["CSTNo"]?.setValue(
                response[0].bankingData[0]?.CST_NO
              ), this.bankingData.controls["CSTNo"].disable()
              this.bankingData.controls["LSTNo"]?.setValue(
                response[0].bankingData[0]?.LST_NO
              ),this.bankingData.controls["LSTNo"].disable()
              this.bankingData.controls["GSTRegisterationNo"]?.setValue(
                response[0].bankingData[0]?.GST_REGN
              ),this.bankingData.controls["GSTRegisterationNo"].disable()
              this.bankingData.controls["taxClassification"]?.setValue(
                response[0].bankingData[0]?.TAX_CLASSSIFICATION
              ),this.bankingData.controls["taxClassification"].disable()
              this.bankingData.controls["TDSExcemptionNo"]?.setValue(
                response[0].bankingData[0]?.TDS_EXEMP_NO
              ),this.bankingData.controls["TDSExcemptionNo"].disable()
              this.bankingData.controls["excemptionPercentage"]?.setValue(
                response[0].bankingData[0]?.EXEMPT
              ),this.bankingData.controls["excemptionPercentage"].disable()
              // this.bankingData.controls['TDSExcemptionNo2'].setValue(response.TDSExcemptionNo2),
              // this.bankingData.controls['excemptionPercentage2'].setValue(response.excemptionPercentage2),
              this.bankingData.controls["excemptFrom"]?.setValue(
                response[0].bankingData[0]?.EXEMPT_FROM
              ),this.bankingData.controls["excemptFrom"].disable()
              this.bankingData.controls["excemptTo"]?.setValue(
                response[0].bankingData[0]?.EXEMPT_TO
              ),this.bankingData.controls["excemptTo"].disable()
              this.bankingData.controls["MSMEStatus"]?.setValue(
                response[0].bankingData[0]?.MSME_STATUS
              ),this.bankingData.controls["MSMEStatus"]?.disable()
              this.bankingData.controls["MSMENo"]?.setValue(
                response[0].bankingData[0]?.MSME_NO
              ),this.bankingData.controls["MSMENo"].disable()
              this.businessData.controls["businessType"]?.setValue(
                response[0].businessData[0]?.TYPE_OF_BUSINESS
              ),this.businessData.controls["businessType"].disable()
              this.businessData.controls["industryType"]?.setValue(
                response[0].businessData[0]?.TYPE_OF_INDUSTRY
              ),this.businessData.controls["industryType"].disable()
              this.businessData.controls["promoters"]?.setValue(
                response[0].businessData[0]?.PROMOTERS
              ),this.businessData.controls["promoters"].disable()
              console.log(
                "top 5",
                response[0].businessData[0].UPLOAD_PRODUCT_PORTFOLIO
              );
            if (response[0].businessData[0].UPLOAD_PRODUCT_PORTFOLIO != "null") {
              this.viewAttachmentName =
                response[0].businessData[0].UPLOAD_PRODUCT_PORTFOLIO;
            }
            console.log(this.viewAttachmentName, "viewAttachmentName");
            // this.organizationData.controls['UploadPortfolio'].setValue(this.viewAttachmentName),
            // console.log(this.organizationData.controls.UploadPortfolio.value,'value here---------')
            this.organizationData.controls["top5Clients"]?.setValue(
              response[0].businessData[0]?.TOP_5_CLIENTS
            ),this.organizationData.controls["top5Clients"]?.disable()
              this.businessData.controls["turnOver"]?.setValue(
                response[0].businessData[0]?.TURNOVER
              ),this.businessData.controls["turnOver"]?.disable()
              console.log(
                this.businessData.controls.turnOver.value,
                "value here---------"
              );
            this.businessData.controls["clientRef"]?.setValue(
              response[0].businessData[0]?.CLIENT_REFERNCES
            ),this.businessData.controls["clientRef"]?.disable()
              this.businessData.controls["complianceCategory"]?.setValue(
                response[0].businessData[0]?.COMPLIANCE_CATEGORY
              ),this.businessData.controls["complianceCategory"]?.disable()
              this.businessData.controls["constitutionBus"]?.setValue(
                response[0].businessData[0]?.CONSITUTION_OF_BUS
              ),this.businessData.controls["constitutionBus"]?.disable()
              // this.organizationData.controls["companyName"]?.setValue(
              //   response[0].personalData[0]?.COMPANY_NAME
              // ),this.organizationData.controls["companyName"]?.
              // this.organizationData.controls["parentCompany"]?.setValue(
              //   response[0].personalData[0]?.PARENT_COMPANY
              // ),
              // this.organizationData.controls["globalHeadOffice"]?.setValue(
              //   response[0].personalData[0]?.GLOBAL_HEAD_OFFICE
              // ),
              // this.organizationData.controls["IndiaHeadOffice"]?.setValue(
              //   response[0].personalData[0]?.INDIA_HEAD_OFFICE
              // ),
              // this.organizationData.controls["website"]?.setValue(
              //   response[0].personalData[0]?.WEBSITE
              // ),
              // this.organizationData.controls["manufacturingSite"]?.setValue(
              //   response[0].personalData[0]?.MANUFACTUREING_SITE
              // ),
              // this.organizationData.controls["mfgCapacity"]?.setValue(
              //   response[0].personalData[0]?.MFG_CAPACITY
              // ),
              // this.organizationData.controls["yearofEshtablihsment"]?.setValue(
              //   response[0].personalData[0]?.YEAR_OF_ESTABLISHMENT.toString()
              // ),
              // this.organizationData.controls["companyDescription"]?.setValue(
              //   response[0].personalData[0]?.BRIEF_DESC_OF_COMPANY
              // ),
              // this.organizationData.controls["BnC_Category"]?.setValue(
              //   response[0].personalData[0]?.BNC_CATEGORY
              // ),
              // this.organizationData.controls[
              //   "Material_Service_Provider"
              // ]?.setValue(response[0].personalData[0]?.MATERIAL_SERV_PROVIDER),
              // this.organizationData.controls["revenueLY"]?.setValue(
              //   response[0].personalData[0]?.REVENUE
              // ),
              // this.organizationData.controls["PATLY"]?.setValue(
              //   response[0].personalData[0]?.PAY_LY
              // ),
              // this.organizationData.controls["LYSpend"]?.setValue(
              //   response[0].personalData[0]?.LY_SPEND
              // ),
              // this.organizationData.controls["EmployeeSize"]?.setValue(
              //   response[0].personalData[0]?.NO_OF_EMPLOYEES
              // ),
              // this.organizationData.controls["NameL1"]?.setValue(
              //   response[0].leadershipData[0]?.L1_LEADER_NAME
              // ),
              // this.organizationData.controls["emailIDL1"]?.setValue(
              //   response[0].leadershipData[0]?.L1_LEADER_EMAIL_ID
              // ),
              // this.organizationData.controls["contactNoL1"]?.setValue(
              //   response[0].leadershipData[0]?.L1_LEADER_CONTACT_NO
              // ),
              // this.organizationData.controls["nameL2"]?.setValue(
              //   response[0].leadershipData2[0].L2_LEADER_NAME
              // ),
              // this.organizationData.controls["emailIDL2"]?.setValue(
              //   response[0].leadershipData2[0]?.L2_LEADER_EMAIL_ID
              // ),
              // this.organizationData.controls["contactNoL2"]?.setValue(
              //   response[0].leadershipData2[0]?.L2_LEADER_CONTACT_NO
              // ),
              // this.organizationData.controls["BCCLAssociation"]?.setValue(
              //   response[0].leadershipData2[0]?.L2_LEADER_ASSOCIATED
              // ),
              // this.organizationData.controls["BCCLannualSpend"]?.setValue(
              //   response[0].leadershipData2[0]?.L2_LEADER_BCCL_ANNUAL
              // ),
              // this.organizationData.controls["groupCO"]?.setValue(
              //   response[0].leadershipData2[0]?.L2_LEADER_GROUP_CO
              // ),
              // this.organizationData.controls.marketUpdate?.setValue(
              //   response[0].leadershipData2[0]?.L2_LEADER_MARKET
              // );
            
            this.organizationData.disable();
            // this.organizationData.updateValueAndValidity();
            // this.profileData.disable();
            // this.profileData.updateValueAndValidity();

            // this.bankingData.disable();
            // this.bankingData.updateValueAndValidity();

            // this.businessData.disable();
            // this.businessData.updateValueAndValidity();

            this.vendorCheck=true;
            this.vendorCheckMSG=response[0]?.vendorCheck[0]?.Message
          }
        }
      });
    } catch (Error) {
      console.error("error in getDetails", Error);
    }
  }
  //Save the data
  onSave(type,data) { 
    try {
      debugger
      this.submitted = true;
      // if (this.organizationData.status == 'VALID'){
      this.onButtonDisable = false;
      // console.log("this is fk", this.organizationData)
      this.profileDetails.push(sessionStorage.getItem("Bid"));
      this.profileDetails.push(
        this.organizationData.controls["companyName"].value
      );
      this.profileDetails.push(
        this.organizationData.controls["parentCompany"].value
      );
      this.profileDetails.push(
        this.organizationData.controls["globalHeadOffice"].value
      );
      this.profileDetails.push(
        this.organizationData.controls["IndiaHeadOffice"].value
      );

      this.profileDetails.push(this.organizationData.controls["website"].value);

      this.profileDetails.push(
        this.organizationData.controls["manufacturingSite"].value
      );

      this.profileDetails.push(
        this.organizationData.controls["mfgCapacity"].value
      );

      this.profileDetails.push(
        this.organizationData.controls["yearofEshtablihsment"].value
      );

      this.profileDetails.push(
        this.organizationData.controls["companyDescription"].value
      );

      this.profileDetails.push(
        this.organizationData.controls["BnC_Category"].value
      );

      this.profileDetails.push(
        this.organizationData.controls["Material_Service_Provider"].value
      );

      this.profileDetails.push(
        this.organizationData.controls["revenueLY"].value
      );

      this.profileDetails.push(this.organizationData.controls["PATLY"].value);

      this.profileDetails.push(this.organizationData.controls["LYSpend"].value);

      this.profileDetails.push(
        this.organizationData.controls["EmployeeSize"].value
      );

      this.profileDetails.push(this.organizationData.controls["NameL1"].value);

      this.profileDetails.push(
        this.organizationData.controls["emailIDL1"].value
      );

      this.profileDetails.push(
        Number(this.organizationData.controls["contactNoL1"].value)
      );

      this.profileDetails.push(this.organizationData.controls["nameL2"].value);

      this.profileDetails.push(
        this.organizationData.controls["emailIDL2"].value
      );

      this.profileDetails.push(
        Number(this.organizationData.controls["contactNoL2"].value)
      );

      this.profileDetails.push(
        Number(this.organizationData.controls["BCCLAssociation"].value)
      );

      this.profileDetails.push(
        this.organizationData.controls["BCCLannualSpend"].value
      );

      this.profileDetails.push(
        Number(this.organizationData.controls["groupCO"].value)
      );

      this.profileDetails.push(
        this.organizationData.controls["marketUpdate"].value
      );

      if (
        this.viewAttachmentName != "" &&
        this.viewAttachmentName != null &&
        this.viewAttachmentName != undefined
      ) {
        this.profileDetails.push(this.viewAttachmentName);

        var fileName = this.getFileNameWOExtention(
          this.viewAttachmentName + "_"
        );

        fileName = this.getTimeStampFileName(
          fileName,
          this.getExtensionOfFile(this.viewAttachmentName)
        );
        // var fileName2 = fileName;
        // fileName = "societyaccount_" + fileName;
        // console.log("FileName here" + fileName);
        this.profileService
          .uploadFile(this.viewUploadFile, fileName)
          .subscribe((res) => {
            // console.log(JSON.stringify(res))
          });
      } else {
        this.profileDetails.push("null");
      }
      this.profileDetails.push(
        this.organizationData.controls["top5Clients"].value
      );
      if(this.showbuyerregistrationFields){
        debugger
        this.CallBuyerAmendemnt();
      }else{
        debugger
        this.callApi();
      this.profileService.save(this.profileDetails).subscribe((res) => {
        
        if (res[0].message == "success") {
          // if (this.profileModel != undefined && this.profileModel != null) {
          // this.toastr.success("Success!!")
          // this.dialogBox.popUpOpen2('Successfully Done','success','profiledata');
          // const dialogConfig = new MatDialogConfig();
          // dialogConfig.data = {
          // 	message: 'Successfully Done',
          // 	condition: 'success',
          // 	page: 'profiledata'
          // };
          // const mydata = dialogConfig.data;
          // console.log("PopupComponent", mydata);
          // const dialogRef = this.dialog.open(PopupComponent, {
          // 	panelClass: 'custom-modalbox',
          // 	width: '400px',
          // 	data: { datakey: dialogConfig.data }
          // });
          // dialogRef.afterClosed().subscribe(result => {
          // console.log(`Dialog result1: ${result}`);
          // });
          // this.router.navigate(['/dashboard'])
        } else {
          //this.dialogBox.popUpOpen2('Failed to save!!','error','profiledata');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: "Failed to save!!",
            condition: "error",
            page: "profiledata",
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
          // this.toastr.error("Failed to save!!")
        }
      });
    }
   } catch (Error) {
      console.error("error in getDetails", Error);
    }
  }
  callApi() {
    debugger
      this.amendament.businessPartnerOID = sessionStorage.getItem("Bid")
      this.amendament.purchaseGroup =
        this.profileData.controls["purchGroup"].value;
      this.amendament.plantName = this.profileData.controls["plantCode"].value;
      this.amendament.title = this.profileData.controls["title"].value;
      this.amendament.vendorNameL1 =
        this.profileData.controls["vendorName1"].value;
      this.amendament.vendorNameL2 =
        this.profileData.controls["vendorName2"].value;
      this.amendament.street1 = this.profileData.controls["streetLine1"].value;
      this.amendament.street2 = this.profileData.controls["streetLine2"].value;
      this.amendament.street3 = this.profileData.controls["streetLine3"].value;
      this.amendament.street4 = this.profileData.controls["streetLine4"].value;
      this.amendament.pinCode = this.profileData.controls["postalCode"].value;
      this.amendament.country = this.profileData.controls["countryKey"].value;
      this.amendament.additionalFileName=this.buyerAmendment.addtionalFileName;
      this.amendament.region=this.profileData.controls['region'].value;
      this.amendament.city = this.profileData.controls["city"].value;
      this.amendament.telNo = this.profileData.controls["telephoneNo"].value;
      this.amendament.mobileNo = this.profileData.controls["mobileNo"].value;
      this.amendament.emailId = this.profileData.controls["vendorEmail"].value;
      this.amendament.emailId1 = this.profileData.controls["email1"].value;
      this.amendament.emailId2 = this.profileData.controls["email2"].value;
      this.amendament.emailId3 = this.profileData.controls["email3"].value;
      this.amendament.emailId4 = this.profileData.controls["email4"].value;
      this.amendament.bankName = this.bankingData.controls["bankName"].value;
      this.amendament.branch = this.bankingData.controls["branch"].value;
      this.amendament.bankAccNo =
        this.bankingData.controls["bankAccountNo"].value;
      this.amendament.swiftCode = this.bankingData.controls["swiftCode"].value;
      this.amendament.ifscCode = this.bankingData.controls["ifscNo"].value;
      this.amendament.pfRegistrationNo =
        this.bankingData.controls["pfRegisterationNo"].value;
      this.amendament.esiRegistrationNo =
        this.bankingData.controls["ESICRegisterationNo"].value;
      this.amendament.vatRegistrationNo =
        this.bankingData.controls["VATRegisterationNo"].value;
      this.amendament.panNumber = this.bankingData.controls["panNo"].value;
      this.amendament.serviceTaxRegnNo =
        this.bankingData.controls["serviceTaxRegisterationNo"].value;
      this.amendament.cstNoCstDate = this.bankingData.controls["CSTNo"].value;
      this.amendament.lstNoLstDate=this.bankingData.controls['LSTNo'].value;
      this.amendament.gstRegistrationNo =
        this.bankingData.controls["GSTRegisterationNo"].value;
      this.amendament.taxClassification =
        this.bankingData.controls["taxClassification"].value;
      this.amendament.tdsExemption =
        this.bankingData.controls["TDSExcemptionNo"].value;
      this.amendament.tdsExemptionPercent =
        this.bankingData.controls["excemptionPercentage"].value;
      this.amendament.tdsExemptionFrom =
        this.bankingData.controls["excemptFrom"].value;
      this.amendament.tdsExemptionTo =
        this.bankingData.controls["excemptTo"].value;
      this.amendament.msmeStatus =
        this.bankingData.controls["MSMEStatus"].value;
      this.amendament.msmeNo = this.bankingData.controls["MSMENo"].value;
      this.amendament.typeOfBusiness =
        this.businessData.controls["businessType"].value;
      this.amendament.typeOfIndustry =
        this.businessData.controls["industryType"].value;
      this.amendament.promoters = this.businessData.controls["promoters"].value;
      this.amendament.turnOver = this.businessData.controls["turnOver"].value;
      this.amendament.clientReference =
        this.businessData.controls["clientRef"].value;
      this.amendament.complianceCategory =
        this.businessData.controls["complianceCategory"].value;
      this.amendament.consititutionOfBusiness =
        this.businessData.controls["constitutionBus"].value;
      this.amendmentDetails.push(this.amendament);
      
      this.profileService
        .submitAmendmentDetails(this.amendmentDetails)
        .subscribe((res) => {
          
          this.loaderservice.show();
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: res[0].message,
            condition: "note",
            page: "information2",
            specific: "note",
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);
          const dialogRef = this.dialog.open(PopupComponent, {
            panelClass: "custom-modalbox",
            width: "400px",
            data: { datakey: dialogConfig.data },
          });
          this.loaderservice.hide();
          dialogRef.afterClosed().subscribe((result) => {
            ;
            sessionStorage.removeItem("chequeData");
            this.router.navigate(["/dashboard"]);
          });
        });
      this.amendmentDetails = [];
    }
  validateFileExtension(fileName) {
    if (fileName) {
      let fileExtension: string = this.getExtensionOfFile(fileName);
      for (let i = 0; i < this.AttachmentValidExtension.length; i++) {
        if (this.AttachmentValidExtension[i] == fileExtension.toUpperCase())
          return true;
      }
      return false;
    }
  }
  GetConpany(event,type){
    this.purchaseOrderService.getreccon(event.target.value).subscribe((data)=>{
      
    })

  }

  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
  }

  getTimeStampFileName(fileName, extension) {
    console.log(Date.now().toString());
    return fileName + Date.now().toString() + "." + extension;
  }

  getFileNameWOExtention(name) {
    // return name.split(".") [0];
    var flName = name
      .substr(0, name.lastIndexOf("."))
      .replace(/_/g, "-")
      .replace(/\. /g, "-");
    return flName;
  }

  // for file upload
  onFileSelectEvent(e,type) {
    
    this.viewUploadFile = null;
    this.viewAttachmentName = "";
    console.log(e.target.files[0]);
    if (this.validateFileExtension(e.target.files[0].name)) {
      this.fileAttachmentError = "";
      this.viewUploadFile = e.target.files[0];
      console.log("uploaded file", this.viewUploadFile);
      this.confile = e.target.files[0];
      if(type=="document"){
        this.documentname = this.viewUploadFile.name;
      }else{
        this.viewAttachmentName = this.viewUploadFile.name;
        console.log(this.viewAttachmentName);
      }
    } else {
      this.fileAttachmentError = "this. InvalidAttachmentFileError";
    }

    $(".fileSelectBtn").blur();
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  getConf(event:string){
    debugger
    if(event=="SUPD" || event=="FIXP"|| event=="FINV"||event=="CUVE" ){
      this.dropdownLists.conf = [];
      this.businessData.controls.Conf.setValidators(null)
      this.businessData.controls.Conf.updateValueAndValidity()
      // this.businessData.controls.conf.disable();
      this.businessData.controls["Conf"].disable();
      this.businessData.controls["Conf"].reset();
    }else{
      this.dropdownLists.conf = this.dropdownLists.confTemp;
      this.businessData.controls["Conf"].enable();
      this.businessData.controls.Conf.setValidators([Validators.required]);
      this.businessData.controls.Conf.updateValueAndValidity()
    }
  }
  textOnlywithcomma(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 64 || charCode > 91 || charCode == 44 || charCode == 32) {
      return true;
    }
    return false;
  }
  textOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 64 || charCode > 91 || charCode == 32) {
      return true;
    }
    return false;
  }

  close() {
    this.viewAttachmentName = "";
    this.organizationData.controls["UploadPortfolio"].reset();
  }
   reject(type: string) {
    if (type === 'RJ') {
      const dialogRef = this.dialog.open(PopupComponent, {
        width: '600px',
        data: {
          datakey: {
            condition: 'RJ',
            message: 'Please provide remarks for rejection.'
          }
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result?.return) {
          console.log('Remarks submitted:', result.messageString);
          // Continue your logic here (e.g., submit to backend)
          this.textremark = result.messageString
          this.onSave(this.textremark, type)
        }
      });
    }
  }
  Edit() {
    ;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      condition: "Check",
      page: "information2",
      specific: "Check",
      // 			condition: 'note',
      // page: 'information2',
      // specific: 'note'
    };
    const mydata = dialogConfig.data;
    console.log("PopupComponent", mydata);

    const dialogRef = this.dialog.open(PopupComponent, {
      panelClass: "custom-modalbox",
      width: "600px",
      data: { datakey: dialogConfig.data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result1: ${result}`);
      this.bankingData.controls["swiftCode"].enable();
      this.bankingData.controls["pfRegisterationNo"].enable();
      this.bankingData.controls["ESICRegisterationNo"].enable();
      this.bankingData.controls["VATRegisterationNo"].enable();
      //   this.bankingData.controls["panNo"].enable();
      this.bankingData.controls["serviceTaxRegisterationNo"].enable();
      this.bankingData.controls["CSTNo"].enable();
      this.bankingData.controls["LSTNo"].enable();
      //   this.bankingData.controls["GSTRegisterationNo"].enable();
      this.bankingData.controls["taxClassification"].enable();
      this.bankingData.controls["TDSExcemptionNo"].enable();
      this.bankingData.controls["excemptionPercentage"].enable();
      this.bankingData.controls["excemptFrom"].enable();
      this.bankingData.controls["excemptTo"].enable();
      this.bankingData.controls["MSMEStatus"].enable();
      this.bankingData.controls["MSMENo"].enable();
      this.bankingData.controls["bankName"].enable();
      this.bankingData.controls["branch"].enable();
      this.ngOnInit();
    });
  }
  editField(type) {
    if (type == "businessData") {
      this.businessData.get("businessType").enable();
      this.businessData.get("industryType").enable();
      this.businessData.get("promoters").enable();
      this.businessData.get("turnOver").enable();
      this.businessData.get("clientRef").enable();
      this.businessData.get("complianceCategory").enable();
      this.businessData.get("constitutionBus").enable();
    }
    this.profileData.get("streetLine1").enable();
    this.profileData.get("streetLine2").enable();
    this.profileData.get("streetLine3").enable();
    this.profileData.get("streetLine4").enable();

    this.profileData.get("telephoneNo").enable();
    this.profileData.get("mobileNo").enable();
    this.profileData.get("vendorEmail").enable();
    this.profileData.get("email1").enable();
    this.profileData.get("email2").enable();
    this.profileData.get("email3").enable();
    this.profileData.get("email4").enable();
  }
  // checkDuplicateInvoice(event: Event) {
  //   debugger
  //   const checkbox = event.target as HTMLInputElement;
  //   this.bankingData.patchValue({ DuplicateInvoice: checkbox.checked });
  //   const control = this.bankingData.get('DuplicateInvoice');

  //   if (checkbox.checked) {
  //     control.setValidators([Validators.requiredTrue]); // Checkbox must be checked
  //   } else {
  //     control.setValidators(null); // Remove validation when unchecked
  //   }
  
  //   control.updateValueAndValidity(); // Recalculate validation status
  // }
  
  // GetRegion(event: Event, type: string) {
    
  //   if (type == null) {
  //     this.cCode = this.profileData.get("countryKey").value;
  //   } else {
  //     this.cCode = event;
  //   }if(type=="bank"){
  //     
  //     this.cCode = this.bankingData.get("BankCountry").value;
  //   }
  //   this.purchaseOrderService.GetRigionMAster(this.cCode, type).pipe(
  //     catchError((err) => {
  //       console.error(`Error fetching data for region`, err);
  //       return throwError(err);
  //     })
  //   ).subscribe((response: any) => {
  //     
  //     if(type=="bank"){
  //       
  //       this.bankkey = response[0].BankKeyList.map(key => ({
  //         id: key[0],
  //         value: key[1]
  //       }));
  //     }
  //     // Handle different cases carefully
  //     if (response[0]?.RegionList) {
  //       // Region list handling
  //       this.Region = response[0]?.RegionList.map(region => ({
  //         code: region[0],
  //         id: region[1],
  //         value: region[2]
  //       }));
  //       // this.Region = this.transformResponse(response[0].RegionList);
  //       console.log(this.Region)
  //     } else if (response.paymentMaster[0]?.HouseList) {
  //       
  //       // Payment method house list handling
  //       this.paymentMethodre = response.paymentMaster[0].HouseList.map(key => ({
  //         id: key[0],
  //         value: key[1]
  //       }));
  //       
  //       // this.paymentMethodre = this.transformResponse(response[0].HouseList);
  //       console.log(this.paymentMethodre)
  //     // } else if (response[0].BankKeyList      ) {
  //     //   // Bank key list handling
  //     //   this.bankkey = response[0].BankKeyList.map(key => ({
  //     //     id: key[0],
  //     //     value: key[1]
  //     //   }));
  //     //   // this.bankkey = this.transformResponse(response[0].BankKeyList);
  //     //   console.log(this.bankkey)
  //     }
  //      else {
  //       console.warn("Unexpected response format", response);
  //     }
  //   });
  // }
  // GetRegion(event: Event, type: string) {
  //   if (type == null) {
  //     this.cCode = this.profileData.get("countryKey").value;
  //   } else {
  //     this.cCode = event;
  //   }

  //   if (type === "bank") {
  //     this.cCode = this.bankingData.get("BankCountry").value;
  //   }
  
  //   this.purchaseOrderService.GetRigionMAster(this.cCode, type).pipe(
  //     catchError((err) => {
  //       console.error(`Error fetching data for region`, err);
  //       return throwError(err);
  //     })
  //   ).subscribe((response: any) => {
  //     ;
  //     // Handle bank data
  //     if (type === "bank" && response[0]?.BankKeyList) {
  //       
  //       this.bankkey = response[0].BankKeyList.map(key => ({
  //         id: key[0],
  //         value: key[1]
  //       }));
  //     }
  
  //     // Handle region data
  //     if (response.regionMaster && response.regionMaster[0].RegionList) {
  //       this.Region = response[0].RegionList.map(region => ({
  //         code: region[0],
  //         id: region[1],
  //         value: region[2]
  //       }));
  //       console.log(this.Region);
  //     } 
  
  //     // Handle payment method house list data
  //     else if (response.paymentMaster && response.paymentMaster[0].HouseList) {
  //       this.paymentMethodre = response.paymentMaster[0].HouseList.map(key => ({
  //         id: key[0],
  //         value: key[1]
  //       }));
  //       console.log(this.paymentMethodre);
  //     }
  
  //     // Handle case where no expected data is returned
  //     else {
  //       console.warn("Unexpected response format", response);
  //     }
  //   });
  // }
  checkDuplicateInvoice(event: Event) {
    debugger
    const checkbox = event.target as HTMLInputElement;
    const control = this.bankingData.get('DuplicateInvoice');
  
    // Update the control value and apply the correct validator
    control.setValue(checkbox.checked);
  
    if (checkbox.checked) {
      control.setValidators(null); // No validation when unchecked
    } else {
      control.setValidators(null); // No validation when unchecked
      control.setValidators([Validators.requiredTrue]); // Valid when checked
    }
  
    control.updateValueAndValidity(); // Recalculate validation
  }
  checkLiable(event:Event,i){
    const checkbox = event.target as HTMLInputElement;
    // const control = this.withtax.get('Liable');
    const control = (this.rows.at(i) as FormGroup).get('Liable');
    
    // Update the control value and apply the correct validator
    // control.setValue(checkbox.checked);
  
    if (checkbox.checked) {
      control.setValidators(null); // No validation when unchecked
    } else {
      // control.setValidators(null); // No validation when unchecked
      control.setValidators([Validators.requiredTrue]); // Valid when checked
    }
  
    control.updateValueAndValidity(); // Recalculate validation

  }

  GetRegion(event: Event, type: string,data?: any) {
    debugger
    this.loaderservice.show();
    if (type == null) {
      this.cCode = this.profileData.get("countryKey").value;
    } else {
      this.cCode = event;
    }
    if (type === "bank") {
      this.cCode = this.bankingData.get("BankCountry").value;
    }else{
      if(type == null){
        this.cCode = this.profileData.get("countryKey").value;
        type= null
      }else{
        this.cCode = event
        type="bank"
      }     
    }
  
    this.purchaseOrderService.GetRigionMAster(this.cCode, type).pipe(
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
            this.rows.push(this.createRow(item));
          });
          this.removeRow(0);
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

  createRow(data): FormGroup {
    const rowGroup = new FormGroup({
      WithTType: new FormControl(this.WHTType?.find(x => x.id === data?.WhTaxType) || null, Validators.required),
      withTCode: new FormControl(data?.WhTaxCode || ""),
      Liable: new FormControl(data?.Liable || "", Validators.required),
      RecType: new FormControl(data?.RecType || "", Validators.required),
      ExcepRea: new FormControl(data?.ExemptionReason || "", Validators.required),
      WithDisc: new FormControl({ value: data?.Description || "", disabled: !!data?.Description },Validators.required),
      ExcepNumber: new FormControl(data?.ExemptionNo || "",),
      ExcepPerc: new FormControl(data?.ExemptionPercent || "", Validators.required),
      ExcepFrom: new FormControl(data?.ExemptionFrom ? this.convertStringToDate(data.ExemptionFrom) : null),
      ExcepTo: new FormControl(data?.TdsExemptionTo ? this.convertStringToDate(data.TdsExemptionTo) : null),
    }, { validators: this.validateExcepDates });  // Apply Custom Validator to Entire Group
    rowGroup.valueChanges.subscribe(() => {
      const fromVal = rowGroup.get('ExcepFrom')?.value;
      const toVal = rowGroup.get('ExcepTo')?.value;
      const numVal = rowGroup.get('ExcepNumber')?.value;
  
      // Check if any field has a value
      const anyFilled = !!(fromVal || toVal || numVal);
  
      // Dynamically apply or clear validators
      if (anyFilled) {
        rowGroup.get('ExcepFrom')?.setValidators([Validators.required]);
        rowGroup.get('ExcepTo')?.setValidators([Validators.required]);
        rowGroup.get('ExcepNumber')?.setValidators([Validators.required]);
      } else {
        rowGroup.get('ExcepFrom')?.clearValidators();
        rowGroup.get('ExcepTo')?.clearValidators();
        rowGroup.get('ExcepNumber')?.clearValidators();
      }
  
      // Re-validate the controls
      rowGroup.get('ExcepFrom')?.updateValueAndValidity({ emitEvent: false });
      rowGroup.get('ExcepTo')?.updateValueAndValidity({ emitEvent: false });
      rowGroup.get('ExcepNumber')?.updateValueAndValidity({ emitEvent: false });
    });
  
    return rowGroup;
  }
  convertStringToDate(dateString: string): Date | null {
    if (!dateString) return null;
  
    // Assuming your format is dd-MM-yyyy
    const [day, month, year] = dateString.split("-");
    return new Date(+year, +month - 1, +day); // months are 0-based
  }
  
  
  

  // getReeconAccount(event: string,type:string) {
  //   this.loaderservice.show();
  //   debugger
  //   if(type=="Comcode"){
  //     event=this.profileData.get("companyCode").value
  //   }
  //   this.purchaseOrderService.getreccon(event).subscribe((response: any) => {
  //     debugger
  //     this.loaderservice.hide();
  //     if(response && response.PurchaseOrgMaster[0].SortList && response.PurchaseOrgMaster[0].SortList.length > 0){
  //       debugger
  //       this.purorg=response.PurchaseOrgMaster[0].SortList.map(org => ({
  //         id: org[0],
  //         value: org[1]
  //       }))
  //     }
  //     else{
  //       this.purorg=[{id:"NA",value:"NA"}]
  //     }
  //     if (response && response[0] && response.ReconMAster[0].ReconAcountList && response[0].ReconAcountList.length > 0) {
  //       debugger
  //       // Map the response if data exists
  //       this.reeconAccount = response.ReconMAster[0].ReconAcountList.map(account => ({
  //         id: account[0],
  //         value: account[1],
  //         // value: account[2]
  //       }));
  //     } else {
  //       // Set 'NA' if data is missing
  //       this.reeconAccount = [{ id: "NA", value: "NA" ,desc:"NA"}];
  //     }
      
    
  //     console.log(this.reeconAccount);
  //   });
  // }
  getReeconAccount(event: string, type: string) {
    this.loaderservice.show();
    if (type == "Comcode") {
      event = this.profileData.get("companyCode").value;
    }
    
    this.purchaseOrderService.getreccon(event).subscribe((response: any) => {
      this.loaderservice.hide();
  
      // Populate Purchase Organization List
      if (response && response.PurchaseOrgMaster && response.PurchaseOrgMaster[0]?.SortList?.length > 0) {
        this.purorg = response.PurchaseOrgMaster[0].SortList.map(org => ({
          id: org[0],
          value: org[1]
        }));
      } else {
        this.purorg = [{ id: "NA", value: "NA" }];
      }
  
      // Populate Recon Account List
      if (response && response.ReconMAster && response.ReconMAster[0]?.ReconAcountList?.length > 0) {
        this.reeconAccount = response.ReconMAster[0].ReconAcountList.map(account => ({
          id: account[0],
          value: account[1],
          desc: account[2] || "NA"
        }));
      } else {
        this.reeconAccount = [{ id: "NA", value: "NA", desc: "NA" }];
      }
  
      console.log("Recon Accounts: ", this.reeconAccount);
    });
  }
  
  CallBuyerAmendemnt(){
     debugger
    if (this.showbuyerregistrationFields && this.showEdit) {
      // var data = sessionStorage.getItem("RequestID");
      let requestID = JSON.parse(this.data);
      this.buyerAmendment.partneroId=this.partneroId,
      this.buyerAmendment.requesteroId = requestID.RequestID;
      this.buyerAmendment.panNumber = this.bankingData.controls["panNo"]?.value;
      this.buyerAmendment.title = this.profileData.controls["title"]?.value;

      this.buyerAmendment.vendorNameL1 =
        this.profileData.controls["vendorName1"]?.value;
      this.buyerAmendment.vendorNameL2 =
        this.profileData.controls["vendorName2"]?.value;
      this.buyerAmendment.streetL1 =
        this.profileData.controls["streetLine1"]?.value;
      this.buyerAmendment.streetL2 =
        this.profileData.controls["streetLine2"]?.value;
      this.buyerAmendment.streetL3 =
        this.profileData.controls["streetLine3"]?.value;
      this.buyerAmendment.streetL4 =
        this.profileData.controls["streetLine4"]?.value;
      this.buyerAmendment.pinCode =
        this.profileData.controls["postalCode"]?.value;
      this.buyerAmendment.city=this.profileData.controls["city"]?.value;
      this.buyerAmendment.country=this.profileData.controls["countryKey"]?.value;
      this.buyerAmendment.buyer=this.profileData.controls["sBuyer"]?.value;
      this.buyerAmendment.purchasGroup=this.profileData.controls["purchGroup"]?.value;
      this.buyerAmendment.acGroup=this.profileData.controls["accountgroup"]?.value
      this.buyerAmendment.compCode=this.profileData.controls["companyCode"]?.value
      this.buyerAmendment.region=this.profileData.controls["region"]?.value
      this.buyerAmendment.telePhoneNo=this.profileData.controls["telephoneNo"]?.value
      this.buyerAmendment.mobileNo=this.profileData.controls["mobileNo"]?.value
      this.buyerAmendment.faxNo=this.profileData.controls["faxNo"]?.value 
      this.buyerAmendment.emailId = this.profileData.controls["vendorEmail"].value;
      this.buyerAmendment.emailId1 = this.profileData.controls["email1"].value;
      this.buyerAmendment.emailId2 = this.profileData.controls["email2"].value;
      this.buyerAmendment.emailId3 = this.profileData.controls["email3"].value;
      this.buyerAmendment.emailId4 = this.profileData.controls["email4"].value;
      this.buyerAmendment.purchasOrg=this.profileData.controls["purchasingOrg"]?.value
      this.buyerAmendment.schemaGroup=this.profileData.controls["schGrpVndr"]?.value
      this.buyerAmendment.plantCode=this.profileData.controls["plantCode"]?.value
    this.buyerAmendment.reconAcc= this.bankingData.controls["ReconAcc"]?.value;
    this.buyerAmendment.softKey=this.bankingData.controls["SortKey"]?.value;
    this.buyerAmendment.planningGroup= this.bankingData.controls["PlaningGroup"]?.value;
    this.buyerAmendment.paymentMethod= this.bankingData.controls["PaymentMethods"]?.value;
    this.buyerAmendment.venBankKey= this.bankingData.controls["VendorsBAnkKEy"]?.value;
    this.buyerAmendment.bankCountrykey= this.bankingData.controls["BankCountry"]?.value;
    this.buyerAmendment.checkDuplicateInv= this.bankingData.controls["DuplicateInvoice"]?.value;
    this.buyerAmendment.bankName= this.bankingData.controls["bankName"]?.value;
      this.buyerAmendment.bankAcNo= this.bankingData.controls["bankAccountNo"]?.value;
      this.buyerAmendment.swiftCode= this.bankingData.controls["swiftCode"]?.value;
      this.buyerAmendment.ifscCode= this.bankingData.controls["ifscNo"]?.value;
      this.buyerAmendment.gstNumber= this.bankingData.controls["GSTRegisterationNo"]?.value;
      this.buyerAmendment.msmeStatus= this.bankingData.controls["MSMEStatus"]?.value;
      this.buyerAmendment.msmeNo= this.bankingData.controls["MSMENo"]?.value;
      this.buyerAmendment.tdsExemptionNo= this.bankingData.controls["TDSExcemptionNo"]?.value;
      this.buyerAmendment.tdsExemptionPercentage= this.bankingData.controls["excemptionPercentage"]?.value;
      this.buyerAmendment.tdsExemptionFrom= this.bankingData.controls["excemptFrom"]?.value;
      this.buyerAmendment.tdsExemptionTo= this.bankingData.controls["excemptTo"]?.value;
      this.buyerAmendment.pfRegistrationNo= this.bankingData.controls["pfRegisterationNo"]?.value;
      this.buyerAmendment.esiRegistrationNo= this.bankingData.controls["ESICRegisterationNo"]?.value;
      this.buyerAmendment.orderCurrency= this.bankingData.controls["orderCurrency"]?.value;
      this.buyerAmendment.paymentTerms= this.bankingData.controls["paymentTerms"]?.value;
      this.buyerAmendment.branch= this.bankingData.controls["branch"]?.value;
      this.buyerAmendment.serviceTax= this.bankingData.controls["serviceTaxRegisterationNo"]?.value;
      this.buyerAmendment.taxClass= this.bankingData.controls["taxClassification"]?.value;
      this.buyerAmendment.vatReg= this.bankingData.controls["VATRegisterationNo"]?.value;
      this.buyerAmendment.cstNoDate= this.bankingData.controls["CSTNo"]?.value;
      this.buyerAmendment.lstNoDate= this.bankingData.controls["LSTNo"]?.value;
      this.buyerAmendment.typeOfBusiness= this.businessData.controls["businessType"]?.value;
      this.buyerAmendment.promoters=this.businessData.controls["promoters"]?.value;
      this.buyerAmendment.typeOfIndustory=this.businessData.controls["industryType"]?.value;
      this.buyerAmendment.turnOver=this.businessData.controls["turnOver"]?.value;
      this.buyerAmendment.top5Client=this.businessData.controls["top5Clients"]?.value;
      this.buyerAmendment.top5Client1=this.businessData.controls["top5Clients"]?.value;
      this.buyerAmendment.top5Client2=this.businessData.controls["top5Clients"]?.value;
      this.buyerAmendment.top5Client3=this.businessData.controls["top5Clients"]?.value;
      this.buyerAmendment.top5Client4=this.businessData.controls["top5Clients"]?.value;
      // this.buyerAmendment.top5Client5=this.businessData.controls["promoters"]?.value;  
      this.buyerAmendment.clientsReferences=this.businessData.controls["clientRef"]?.value;
      this.buyerAmendment.compliCate=this.businessData.controls["complianceCategory"]?.value;
      this.buyerAmendment.conasiToBusin=this.businessData.controls["constitutionBus"]?.value;
      this.buyerAmendment.confControl=this.businessData.controls["Conf"]?.value;
      this.buyerAmendment.remarks=this.businessData.controls["remarks"]?.value;
      debugger
      // this.buyerAmendment.addtionalFileName=this.additionalData;
      
      this.processWithTaxData()
      // this.buyerAmendment.whTaxList.push(this.whTaxList);
      this.buyerAmendment.status = 
      requestID.Status === "L0" ? "L2" :
      requestID.Status === "L2" ? "L3" : 
      requestID.Status === "L3" ? "C" :
      "L2";
      this.buyerAmendmentDetails.push(this.buyerAmendment);
      this.purchaseOrderService
          .submitVendorUPdatedData(this.buyerAmendmentDetails)
          .subscribe((res) => {
          if (res[0].StatusCode == 200) {
            if (res[0].message == 'Rejected') {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: "Rejected!",
                condition: 'note',
                page: 'information2',
                specific: 'note'
              };
              const dialogRef = this.dialog.open(PopupComponent, {
                panelClass: 'custom-modalbox',
                width: '500px',
                data: { datakey: dialogConfig.data }

              });
              dialogRef.afterClosed().subscribe((result) => {
                this.router.navigate(['/ViewRegistration']).then(() => {
                  // , { queryParams: { orderNo: this.forinternal } }
                  window.location.reload();
                });
              });
            } else {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: "Approved!",
                condition: 'note',
                page: 'information2',
                specific: 'note'
              };
              const dialogRef = this.dialog.open(PopupComponent, {
                panelClass: 'custom-modalbox',
                width: '500px',
                data: { datakey: dialogConfig.data }
              });
              //   setTimeout(() => {
              //     this.router.navigate(['/internalTrackPO']).then(() => {
              //       // , { queryParams: { orderNo: this.forinternal } }
              //         // window.location.reload();
              //     });
              // }, 3000);
              dialogRef.afterClosed().subscribe((result) => {
                this.router.navigate(['/ViewRegistration']).then(() => {
                  // , { queryParams: { orderNo: this.forinternal } }
                  window.location.reload();
                });
              });
            }

          } else {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: "Some thing went wrong",
              condition: 'note',
              page: 'information2',
              specific: 'note'
            };
            const dialogRef = this.dialog.open(PopupComponent, {
              panelClass: 'custom-modalbox',
              width: '500px',
              data: { datakey: dialogConfig.data }
            });
            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result1: ${result}`);
              // this.router.navigate(['/internaltrackInvoiceList']);
            });
          }
          // this.loaderservice.show();
        });
    }
  }
  onFileChanged(event: any) {
    debugger
    this.data = sessionStorage.getItem("RequestID") 
    ? sessionStorage.getItem("RequestID") 
    : sessionStorage.getItem("Bid"); 
   let requestID = JSON.parse(this.data);
    // let requestID = JSON.parse(this.data);
    let id = requestID?.RequestID ? requestID.RequestID : requestID;

    console.log("this.filecount " + this.filecount);
    var specialChars = "<>@!#$%^&*()+[]{}?:;_|'\"\\,/~`-=";
    var checkForSpecialChar = function (string) {
      for (var j = 0; j < specialChars.length; j++) {
        if (string.indexOf(specialChars[j]) > -1) {
          return true
        }
      }
      return false;
    }
    var _validFileExtensions = [".JPEG", ".JPG", ".PNG", ".DOC", ".DOCX", ".XLS", ".XLSX", ".CSV", ".PDF"];
    var ValidateSingleInput = function (string) {
      for (var j = 0; j < _validFileExtensions.length; j++) {
        if (string.toUpperCase().indexOf(_validFileExtensions[j]) > -1) {
          return false
        }
      }
      return true;
    }
    if (this.filecount == 0) {
      
      this.multiplefilechanged = true;
      this.ArrayOfSelectedFile = Array.from(event.target.files);
      if (this.ArrayOfSelectedFile.length < 11) {
        
        for (var t = 0; t < this.ArrayOfSelectedFilename.length; t++) {
          if (this.ArrayOfSelectedFilename[t] == this.ArrayOfSelectedFile[k].name) {
            // this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Duplicate files are not allowed.',
              condition: 'error',
              page: 'invoicesubmit'
            };
            const mydata = dialogConfig.data;
            console.log("PopupComponent", mydata);

            const dialogRef = this.dialog.open(PopupComponent, {
              panelClass: 'custom-modalbox',

              width: '400px',
              data: { datakey: dialogConfig.data }

            });
            dialogRef.afterClosed().subscribe(result => {
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
              message: 'Filename can have spaces but no special characters',
              condition: 'error',
              page: 'invoicesubmit'
            };
            const mydata = dialogConfig.data;
            console.log("PopupComponent", mydata);

            const dialogRef = this.dialog.open(PopupComponent, {
              panelClass: 'custom-modalbox',

              width: '400px',
              data: { datakey: dialogConfig.data }

            });
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result1: ${result}`);
            });

            // this.filecount -= 1
            // this.filecount = this.filecount - 1;
            return;
          }
        }
        for (var m = 0; m < this.ArrayOfSelectedFile.length; m++) {
          if (ValidateSingleInput(this.ArrayOfSelectedFile[m].name.toUpperCase())) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Only jpeg,jpg,png,doc,docx,xls,xlsx,csv,pdf files are allowed',
              condition: 'error',
              page: 'invoicesubmit'
            };
            const mydata = dialogConfig.data;
            console.log("PopupComponent", mydata);

            const dialogRef = this.dialog.open(PopupComponent, {
              panelClass: 'custom-modalbox',

              width: '400px',
              data: { datakey: dialogConfig.data }

            });
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result1: ${result}`);
            });

            // this.filecount -= 1
            // this.filecount = this.filecount - 1;
            return;
          }
        }
        for (var k = 0; k < this.ArrayOfSelectedFile.length; k++) {

          
          this.ArrayOfSelectedFilename.push(this.ArrayOfSelectedFile[k].name);
          debugger
          // this.ArrayOfSelectedSavedFile.push("_enduserinvoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) + "_" +"." + this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name));
          this.ArrayOfSelectedSavedFile.push(id+"_"+"additional"+"_"+this.ArrayOfSelectedFile[k].name)
          debugger
          // this.addfileNamesArray?.push(
          //   requestID.RequestID + "_" + "additional" + "_" + this.ArrayOfSelectedFile[k].name
          // );
          // console.log(this.addfileNamesArray)
          
          
          console.log(this.ArrayOfSelectedFile[k].name);

          this.multiplactualfilenamearray.push(this.ArrayOfSelectedFile[k].name);
          console.log(this.multiplactualfilenamearray);
        }
        this.filecount = this.ArrayOfSelectedFile.length;
        this.multiplsavedfilenamearray = this.ArrayOfSelectedFilename.length;
      }
      else {
        this.ArrayOfSelectedFile = [];

        // this.dialogBox.popUpOpen2('Maximum 10 files allowed.', 'error', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Maximum 10 files allowed.',
          condition: 'error',
          page: 'invoicesubmit'
        };
        const mydata = dialogConfig.data;
        console.log("PopupComponent", mydata);

        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: 'custom-modalbox',

          width: '400px',
          data: { datakey: dialogConfig.data }

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result1: ${result}`);
          // this.router.navigate(['/internaltrackInvoiceList']);
        });

        return;

      }
      console.log("in");
    }
    else {
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
                message: 'Duplicate files are not allowed.',
                condition: 'error',
                page: 'invoicesubmit'
              };
              const mydata = dialogConfig.data;
              console.log("PopupComponent", mydata);

              const dialogRef = this.dialog.open(PopupComponent, {
                panelClass: 'custom-modalbox',

                width: '400px',
                data: { datakey: dialogConfig.data }

              });
              dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result1: ${result}`);
                // this.router.navigate(['/internaltrackInvoiceList']);
              });

              this.filecount -= 1
              return;
            }
          }
          for (var m = 0; m < this.ArrayOfSelectedFilename.length; m++) {
            console.log("this.ArrayOfSelectedFilename[m].name", file.name);
            if (checkForSpecialChar(file.name)) {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: 'Filename can have spaces but no special characters',
                condition: 'error',
                page: 'invoicesubmit'
              };
              const mydata = dialogConfig.data;
              console.log("PopupComponent", mydata);

              const dialogRef = this.dialog.open(PopupComponent, {
                panelClass: 'custom-modalbox',

                width: '400px',
                data: { datakey: dialogConfig.data }

              });
              dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result1: ${result}`);
              });

              // this.filecount -= 1
              this.filecount = this.filecount - 1;
              return;
            } else if (ValidateSingleInput(file.name.toUpperCase())) {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: 'Only jpeg,jpg,png,doc,docx,xls,xlsx,csv,pdf files are allowed',
                condition: 'error',
                page: 'invoicesubmit'
              };
              const mydata = dialogConfig.data;
              console.log("PopupComponent", mydata);

              const dialogRef = this.dialog.open(PopupComponent, {
                panelClass: 'custom-modalbox',

                width: '400px',
                data: { datakey: dialogConfig.data }

              });
              dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result1: ${result}`);
              });

              // this.filecount -= 1
              // this.filecount = this.filecount - 1;
              return;
            }
          }
          if (this.ArrayOfSelectedFile.includes(file) === false) {
            this.ArrayOfSelectedFile.push(file);
            this.ArrayOfSelectedFilename.push(file.name);
            debugger
            this.ArrayOfSelectedSavedFile.push(id+"_"+"additional_"+ this.getFileNameWOExtention(file.name)+"." + this.getExtensionOfFile(file.name));

            this.multiplactualfilenamearray.push(file.name);
            this.filecount = this.ArrayOfSelectedFilename.length;
            console.log("kjnkj", this.ArrayOfSelectedFilename);
          }
          else {
            console.log("duplicate =================");
          }
        }
      }
      else {
        this.filecount = this.filecount - array.length;
        // this.dialogBox.popUpOpen2('Maximum 11 files allowed.', 'error', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Maximum 10 files allowed.',
          condition: 'error',
          page: 'invoicesubmit'
        };
        const mydata = dialogConfig.data;
        console.log("PopupComponent", mydata);

        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: 'custom-modalbox',

          width: '400px',
          data: { datakey: dialogConfig.data }

        });
        dialogRef.afterClosed().subscribe(result => {
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
    // const fileNamesString = this.ArrayOfSelectedFile.map(file => file.name).join(", ");
    // this.fileNamesString = (this.fileNamesString || "") + fileNamesString;

    // console.log(this.fileNamesString)
    console.log("this.filecount >>" + this.filecount)
    const array = event.target.files;
    // ;
    if (array.length != 0) {
      this.uploadfile();
    }
  }
  uploadfile() {
    debugger
    const formData = new FormData();
    this.data = sessionStorage.getItem("RequestID") 
    ? sessionStorage.getItem("RequestID") 
    : sessionStorage.getItem("Bid"); 
   let requestID = JSON.parse(this.data);
    this.loaderservice.show();
    debugger
    for (var i = 0; i < this.ArrayOfSelectedFile.length; i++) {
      const id = requestID?.RequestID ? requestID.RequestID : requestID;
      const generatedFileName =
      id +
      "_additional_" +
      this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) +
      "_" +
      "." +
      this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name);
  
    console.log("Generated File Name ==> " + generatedFileName);
    debugger
    this.fileNamesString += `,${generatedFileName}`;

      console.log("this.ArrayOfSelectedFile[i].name ==> " + id + "_enduserinvoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_"  + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
      if (this.multipleactualendfilename == null) {
        formData.append("file[]", this.ArrayOfSelectedFile[i], id + "_additional_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_"  + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
      }
      else {
        console.log(this.individualsavedendname[0]);
        var words = this.individualsavedendname[0].split("_");
        var timestamp = words[words.length - 1].substr(0, words[words.length - 1].indexOf('.'));
        console.log("timestamp" + timestamp);
        formData.append("file[]", this.ArrayOfSelectedFile[i], id + "_additional_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" +"." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
      }
    }
    // this.ArrayOfSelectedFile?.forEach(file => {
    //   this.addfileNamesArray?.push(file);
    // });
  
    console.log("this >>" + this.fileNamesString);
    this.buyerAmendment.addtionalFileName=this.fileNamesString;
    // this.amendament.addtionalFileName=this.fileNamesString;

    this.loaderservice.show();
    this.internalportalservice.AddidtinalVendorDoc(formData).subscribe(res => {
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
          condition: 'error',
          page: 'invoicesubmit'
        };
        const mydata = dialogConfig.data;
        console.log("PopupComponent", mydata);

        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: 'custom-modalbox',

          width: '400px',
          data: { datakey: dialogConfig.data }

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result1: ${result}`);
        });
        return;
      }
      this.loaderservice.hide();
    }, err => {
      this.loaderservice.hide();
      console.log(JSON.stringify(err))

    });
  }
  // getTcode(event,i) {
  //   debugger
  //   let selectedId;

  //   console.log(event.value);
  //   const control = (this.rows.at(i) as FormGroup).get('WithTType');

  //   if (event.target?.value == undefined) {
  //     debugger
  //     this.tcode = event
  //     selectedId = event;
  //   }else{
  //     debugger
  //     const control = (this.rows.at(i) as FormGroup).get('WithTType');
  //     this.tcode = control.value.id;      
  //   }
  //   if (control.value && control.value.desc !== undefined) {
  //     (this.rows.at(i) as FormGroup).get('WithDisc').setValue(control.value.desc);
  //     (this.rows.at(i) as FormGroup).get('WithDisc').disable();
  //   } else {
  //     // fallback if desc isn't available
  //     (this.rows.at(i) as FormGroup).get('WithDisc').setValue('');
  //     (this.rows.at(i) as FormGroup).get('WithDisc').disable();
  //   }

  //   // console.log(selectedStatus);

  //   // this.WHTType.map((key) => {
  //   //   if (key.id == selectedId) {
        
  //   //     console.log(key);
  //   //   }
  //   // });
  //   this.purchaseOrderService.getTcode(this.tcode,this.cCode).pipe(
  //     catchError((err) => {
  //       console.error(`Error fetching data for region`, err);
  //       return throwError(err);
  //     })
  //   ).subscribe((response: any) => {
  //     ;
  //     this.Tcode = response[0].WHTList.map(key => ({
  //       id: key?.[0] ?? "NA", // Use optional chaining and nullish coalescing for safety
  //       value: key?.[1] ?? "NA"
  //     }));
  //     // Handle bank data safely  
  // });
  // }
  getTcode(event, i) {
    debugger;
  
    if (i >= this.rows.length) {
      console.error(`Invalid index ${i} — FormArray length is ${this.rows.length}`);
      return;
    }
  
    const formGroup = this.rows.at(i) as FormGroup;
    const control = formGroup.get('WithTType');
  
    let selectedId;
  
    console.log(event.value);
  
    if (event?.target?.value === undefined) {
      this.tcode = event;
      selectedId = event;
    } else {
      this.tcode = control?.value?.id;
    }
  
    if (control?.value && control.value.desc !== undefined) {
      formGroup.get('WithDisc')?.setValue(control.value.desc);
      formGroup.get('WithDisc')?.disable();
    } else {
      formGroup.get('WithDisc')?.setValue('');
      formGroup.get('WithDisc')?.disable();
    }
  
    this.purchaseOrderService.getTcode(this.tcode, this.cCode).pipe(
      catchError((err) => {
        console.error(`Error fetching data for region`, err);
        return throwError(err);
      })
    ).subscribe((response: any) => {
      this.Tcode = response[0].WHTList.map(key => ({
        id: key?.[0] ?? "NA",
        value: key?.[1] ?? "NA"
      }));
    });
  }
  
  removeitem(index) {
    // delete this.ArrayOfSelectedFilename[index];
    var tempname = this.ArrayOfSelectedFilename[index]
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
  processWithTaxData() {
    debugger
    
    // Fetch rows from the form
    // buyerAmendment: any = { whTaxList: [] }; // Ensure whTaxList is initialized as an empty array

    const rowsData = (this.withtax.get('rows') as FormArray).value;
  
    // Transform rows data into whTaxList
    this.arrayoftex = rowsData.map((row: any) => ({
      exemptionPercent: row.ExcepPerc || '', // Map each field
      liable: row.Liable ? 'Y' : 'N',
      exemptionNo: row.ExcepNumber || '',
      description: row.WithTType?.desc|| '',
      whTaxType: row.WithTType?.id || '',
      exemptionFrom: this.datePipe.transform(row.ExcepFrom, 'dd-MM-yyyy') || '',
      partneroId: this.partneroId,
      recType: row.RecType || '',
      exemptionTo: this.datePipe.transform(row.ExcepTo, 'dd-MM-yyyy' ) ||  '',
      exemptionReason: row.ExcepRea || '',
      whTaxCode: row.withTCode || '',
    }));
// return;
  
    // Log the result or pass it to an API
  
  if (!Array.isArray(this.buyerAmendment.whTaxList)) {
    this.buyerAmendment.whTaxList = [];
  }
    this.buyerAmendment.whTaxList.push(...this.arrayoftex); // Use spread operator to avoid nesting arrays
    console.log(this.buyerAmendment);  
    console.log('buyerAmendment.whTaxList:', this.buyerAmendment.whTaxList);


  
    // Optionally, send it to your API
    // this.apiService.postData({ whTaxList }).subscribe(response => {
    //   console.log(response);
    // });
  }
  // onFileClick(fileName: string): void {
  //   
  //   // window.open('https://yourdomain.com/files/' + fileName, '_blank');
  //   window.open("http://localhost:8080/DxProject/api/file/downloadVendorFile?fileName="+fileName, '_blank');
  // }
  downloadfile(savedfilename, actualfilename, type) {
    debugger
    if (savedfilename == "" || savedfilename == null || actualfilename == "" || actualfilename == null
      || savedfilename == undefined || actualfilename == undefined) {
      //this.dialogBox.popUpOpen2("File not present", 'success', 'purchaseorderlist');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'File not present',
        condition: 'success',
        page: 'purchaseorderlist'
      };
      const mydata = dialogConfig.data;
      console.log("PopupComponent", mydata);

      const dialogRef = this.dialog.open(PopupComponent, {
        panelClass: 'custom-modalbox',

        width: '400px',
        data: { datakey: dialogConfig.data }

      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result1: ${result}`);
      });
      return;
    }
    this.loaderservice.show();
    this.trackOrderListService.getfile(actualfilename, type)
      .subscribe(result => {
        console.log(result);
        this.DecodedFile = [];
        console.log("filename===>" + actualfilename);
        this.DecodedFile = result[0].data;
        if (this.DecodedFile) {
          

          var data = this.DecodedFile;
          const agent = window.navigator.userAgent.toLowerCase()
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
             // IE workaround
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: 'application/octet-stream' });
            if (type == 'vendorReg') {
              window.navigator.msSaveOrOpenBlob(blob, actualfilename);
            }
            else if (type == 'VendorReg') {
              debugger
              window.navigator.msSaveOrOpenBlob(blob, "Supporting_Invoice_Document.zip");
            }

          }
          else if (agent.indexOf('firefox') > -1) {
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: "application/octet-stream" });
            if (type == 'vendorReg') {
              debugger
              saveAs(blob, actualfilename);
            }
            else if (type == 'multiplefiledownload') {
              saveAs(blob, "Supporting_Invoice_Document.zip");

            }
          }
          else {
            console.log(data, 'data')
            let FileToDownload = 'data:application/octet-stream;base64,' + data;
            var link = document.createElement("a");
            if (type == 'vendorReg') {
              debugger
              const filename = actualfilename;
              link.href = FileToDownload;
              link.download = filename;
              link.click();
              // this.router.navigate(['/profileGeneralData']);
            }
            else if (type == 'multiplefiledownload') {
              const filename = "Supporting_Invoice_Document.zip";
              link.href = FileToDownload;
              link.download = filename;
              link.click();
            }
          }
        }
        else if (result[0].reason != 'none') {
          debugger
          // this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: result[0].reason,
            condition: 'success',
            page: 'purchaseorderlist'
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);

          const dialogRef = this.dialog.open(PopupComponent, {
            panelClass: 'custom-modalbox',

            width: '400px',
            data: { datakey: dialogConfig.data }

          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result1: ${result}`);
          });
        }
        this.loaderservice.hide();

      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );
  }

  CallPanGSTVALIDATION(){
    this.purchaseOrderService.GetPanGstVal(this.bankingData.controls.panNo?.value,this.bankingData.controls.GSTRegisterationNo?.value).subscribe((result) => {
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
}
