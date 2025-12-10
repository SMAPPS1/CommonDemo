// import {
//   ChangeDetectorRef,
//   Component,
//   ElementRef,
//   OnInit,
//   QueryList,
//   ViewChildren,
// } from "@angular/core";
// import { PurchaseOrderListService } from "app/services/purchaseOrderList/purchaseorderlist.service";
// import { Delivery } from "app/models/delivery";
// import { ActivatedRoute, Router } from "@angular/router";
// import { TrackOrderListService } from "app/services/trackOrderList/trackorderlist";
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   Validators,
// } from "@angular/forms";
// import { LoaderService } from "app/services/LoaderService/loader.service";
// import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
// import { PopupComponent } from "app/components/commoncomponents/popup/popup.component";
// import { DatePipe } from "@angular/common";
// import { saveAs } from "file-saver";

// @Component({
//   selector: "app-advance-shipping-notification",
//   templateUrl: "./advance-shipping-notification.component.html",
//   styleUrls: ["./advance-shipping-notification.component.css"],
// })
// export class AdvanceShippingNotificationComponent implements OnInit {
//   cityLocation: any;
//   // TypeNo: string;
//   // vendorid: any;
//   // invNo: any;
//   // ponumber: string = sessionStorage.getItem("poNumber");
//   // previnvdt: Date;
//   // invoicedata: any = [];
//   // podate: string;

//   errormessage: string;
//   disable: boolean = false;
//   // balQuantity: any = sessionStorage.getItem('balQuantity');
//   balQtyList: any = [];
//   deliveryList: any = [];
//   maxdate: Date;
//   podate: string;
//   mindate: Date;
//   errorqty: number;
//   rawinvoicenumber: string;
//   rawinvoicedate: string;
//   invoicealreadypresent: boolean = false;
//   showSingleDelivery: boolean = false;
//   temprawinvoicenumber: string;
//   actualfilename: any;
//   savedfilename: string;
//   value: string = "Invoice";
//   orderitem: string;
//   orderqty: string;
//   showSingleSubmit: boolean = false;
//   showMultipleSubmit: boolean = false;
//   TypeNo: string;
//   actualfilename1: any;
//   savedfilename1: string;
//   multiplactualfilenamearray: any = [];
//   multiplsavedfilenamearray: any = [];
//   withoutpodetails: any = [];
//   actualfilenameofwopo: string;
//   savedfilenameofwopo: string;
//   invoicefilechanged: boolean = false;
//   multiplefilechanged: boolean = false;
//   ArrayOfSelectedFiles: any = [];
//   individualsavedname: any = [];
//   ArrayOfSelectedFilename: any = [];
//   filecount: number = 0;
//   ArrayOfSelectedSavedFile: any = [];
//   individualsavedname1: any = [];
//   timestampnow = Date.now().toString();
//   freshinvoice: boolean = true;
//   part: boolean = false;
//   full: boolean = true;
//   totalBalQty: number = 0;
//   overallAmount: any = 0;
//   inputBalanceQuantity: any = 0;
//   fullpodate: any = sessionStorage.getItem("fullpoDate");
//   lineitemnumberlist: any = [];
//   quantitylist: any = [];
//   balanceExceeded: boolean = false;
//   zeropresent: boolean = false;
//   issubmitcheck: boolean = false;
//   tobeinvoicelist: any = [];
//   grninvoicepresent: boolean = false;
//   grntobeinvoicelist: any = [];
//   grnuniquelineitems: any = [];
//   grnnumber: string;
//   invoicedata: any = [];
//   poNo: any;
//   invNo: any;
//   DecodedFile: any;
//   irnDateforreopen: any;
//   resubmit: boolean = false;
//   reopen: boolean = false;
//   savedfilenameofresubmit: any;
//   individualsavednameofresubmit: any = [];
//   individualmultipleactualnameofresubmit: any[];
//   individualmultiplesavednameofresubmit: any[];
//   actualfilenameofresubmit: any;
//   actualsavedfilenameofwopo: any;
//   actualresubmitfilename: any;
//   savedresubmitfilename: any;
//   suppindividualactualname: any[];
//   checkedList: any = [];
//   suppindividualsavedname: any;
//   fileupload: string;
//   negativeFlag: boolean = false;
//   emailFlag: boolean = false;
//   irnNumber: any;
//   tobeinvoiced: boolean = false;
//   tobelineitems: any;
//   ponumbers: any = [];
//   backButtonValue: string;
//   remainingLinewItems: any = [];
//   nullDCN: any = [];
//   descripionlength: number = 160;
//   remarklength: number = 160;
//   oldirndate: any;
//   previnvdt: Date;
//   exceededSubmitDisable: boolean = false;

//   selectedCities: any[] = [];

//   Lineitem: any = [];
//   valueininr: any = [];
//   invoice: boolean = true;
//   poDetail: any = [];
//   ponumber: string = sessionStorage.getItem("poNumber");
//   uniquelineitems: any = [];
//   quantityvalue: any = [];
//   toinvoiceuniquelineitems: any = [
//     {
//       GRNMAPPNUMBER: "",
//       TOINVOICELINEITEMNUMBER: "",
//       TOINVOICELINEITEMTEXT: "",
//       LINEITEMNUMBER: "",
//       BALANCE_QTY: "",
//       TOINVOICEMATERIAL: "",
//       QUANTITY: "",
//       TOINVOICEUNITOFMEASURE: "",
//       TOINVOICECONTACTPERSONPHONE: "",
//       TOINVOICECOMPANY: "",
//       TOINVOICEPLANT: "",
//       TOINVOICEDEPARTMENT: "",
//       TOINVOICESTORAGELOCATION: "",
//       TOINVOICECOSTCENTRE: "",
//       TOINVOICECATEGORY: "",
//       SERVICENUMBER: "",
//       DCNUMBER: "",
//       GRNQTY: "",
//       INVAMOUNT: "",
//       SAPUNIQUEREFERENCENO: "",
//       SAPLINEITEMNO: "",
//       SRCNUMBER: "",
//       TOTALAMOUNT: "",
//       TOINVOICERATEPERQTY: "",
//     },
//   ];
//   uniquenewlineitems: any = [];
//   orderlineitems: any = [];
//   uniquelineitem: any = [];
//   orderlistoflineitem: any[];
//   lineitemnumber: any = [];
//   lineitemnumberset: any = [];
//   TotalItemAmount: any;
//   calculatedAmount: any = 0;
//   editing: boolean = false;
//   invoicesubmissionarray: Array<any> = [];
//   // invoicesubmissionarray: Array<Delivery> = [];
//   vendorid: any;
//   irndetail: boolean = false;
//   showerror: boolean = false;
//   contactpersonemailid: any;
//   finalAmount: number;
//   viewUploadFile: any = null;
//   invoiceconfile: string;
//   viewAttachmentName: string = "";
//   submitbutton: string = "";
//   successmessage: string;
//   success: boolean = false;
//   error: boolean = false;
//   AttachmentValidExtension: string[] = ["PDF"];
//   ArrayOfSelectedFile: any[] = [];
//   InvalidAttachmentFileError =
//     "Selected file is having Invalid extension. Valid file extensions are pdf, jpg & jpeg.";

//   // delivery = new Delivery();
//   fileAttachmentError: string = "";
//   viewAttachmentNames: { [key: number]: string } = {}; // Store filenames by row index

//   asnHistoryData: any;

//   showAsnHistory: boolean = false;
//   showAsnItem: boolean = true;

//   editHistoryAsn: boolean = false;

//   editingIndex: number | null = null;

//   public invoiceForm = new FormGroup({
//     // irnNo: new FormControl(''),
//     // irnDate: new FormControl(''),
//     // billofladingdate: new FormControl(''),
//     // invoiceNo: new FormControl('', Validators.required),
//     // invoiceDate: new FormControl('', Validators.required),
//     advDate: new FormControl("", Validators.required),
//     advCity: new FormControl("", Validators.required),
//     advDateFormat: new FormControl("", Validators.required),
//     asnNumber: new FormControl("", Validators.required),
//     attachedDocument: new FormControl(""),
//     // taxAmount: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),   //new 15 feb
//     // balanceqty: new FormControl(''),
//     // orderqty: new FormControl(''),
//     // description: new FormControl('', Validators.required),
//     // attachments: new FormControl('', Validators.required),
//     // TotalinctaxAmount: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
//     // remarks: new FormControl('', Validators.required),
//     // overallAmount: new FormControl(0),
//     // totalOrderQty: new FormControl(0),
//     // endUser : new FormControl('', Validators.pattern('^[a-z0-9](\.?[a-z0-9]){0,}@timesgroup\.com$'))
//   });

//   // invoicesubmissionarray: Array<Delivery> = [];

//   delivery = new Delivery();
//   BID: string;
//   ASNfilename: string;
//   extensionType: string;
//   selectedLocation: any;

//   constructor(
//     private purchaseOrderListService: PurchaseOrderListService,
//     private route: ActivatedRoute,
//     private trackOrderListService: TrackOrderListService,
//     private fb: FormBuilder,
//     private loaderservice: LoaderService,
//     public dialog: MatDialog,
//     private router: Router,
//     private cd: ChangeDetectorRef,
//     private datePipe: DatePipe
//   ) {
//     // this.invoiceForm = this.fb.group({
//     //   advDate: ["",],
//     //   advCity0: ["",],
//     //   advDateFormat0: ["",],
//     //   asnNumber: ["",],
//     //   attachedDocument: [""],
//     //   // Initial controls for dynamic form fields
//     //   orderValue0: ["", ],
//     //   calRealtime0: [""],
//     // });
//   }

//   ngOnInit(): void {
//     debugger;

//     this.purchaseOrderListService.getLocDetails().subscribe((data) => {
//       console.log(data, "maccccccccccccccccccc");
//       this.cityLocation = data;
//     });

//     this.route.queryParams.subscribe((params) => {
//       this.TypeNo = atob(params.type);
//       this.vendorid = atob(params.vd);
//       if (this.TypeNo == "resubmit") {
//         debugger;
//         this.invNo = atob(params.invNo);
//         this.ponumber = atob(params.poNo);
//         this.previnvdt = new Date(atob(params.invoiceDate));
//       }
//       if (this.TypeNo == "reopen") {
//         debugger;
//         this.invNo = atob(params.invNo);
//         this.ponumber = atob(params.poNo);
//         this.invoicedata = atob(params.invoicedata);
//       }

//       var x = document.getElementById("showonresubmit");
//       if (this.TypeNo == "resubmit") {
//         debugger;
//         x.style.display = "none";
//       } else if (this.TypeNo == "part") {
//         debugger;
//         // x.style.display = "none";
//       }
//       $("body").on("click", ".inv-wrapper", function () {
//         console.log($(this));
//         $(".inv-wrapper.active").removeClass("active");
//         $(this).addClass("active");
//       });
//       console.log("what are the ?", params); // { order: "popular" }

//       console.log("type=====================>", this.TypeNo);

//       console.log("this.podate ==>" + this.podate);
//     });

//     if (this.TypeNo != "resubmit" && this.TypeNo != "reopen") {
//       debugger;

//       this.purchaseOrderListService
//         .getgrnbasedonpo(this.ponumber)
//         .subscribe((res) => {
//           debugger
//           if (res[0].message == "Success") {
//             this.tobeinvoicelist = res[0].grnbasedonpo;
//             this.grninvoicepresent = true;
//           } else {
//             this.grninvoicepresent = false;
//           }
//           console.log(sessionStorage.getItem("invwopodetails"));

//           if (
//             sessionStorage.getItem("invwopodetails") &&
//             sessionStorage.getItem("invwopodetails") != "undefined"
//           ) {
//             this.freshinvoice = false;
//             this.withoutpodetails = JSON.parse(
//               sessionStorage.getItem("invwopodetails")
//             );
//             if (this.withoutpodetails[0].INVOICENUMBER != null) {
//               console.log("this.withoutpodetails ==> ", this.withoutpodetails);
//               for (var x = 0; x < this.withoutpodetails.length; x++) {
//                 if (
//                   this.withoutpodetails[0].IRNNUMBER != null ||
//                   this.withoutpodetails[0].IRNNUMBER != ""
//                 ) {
//                   this.invoice = false;
//                   this.invoiceForm.controls.irnNo.setValue(
//                     this.withoutpodetails[x].IRNNUMBER
//                   );
//                   this.invoiceForm.controls.irnDate.setValue(
//                     new Date(this.withoutpodetails[x].IRNDATE)
//                   );
//                 } else {
//                   this.invoice = true;
//                   this.invoiceForm.controls.irnNo.setValue(null);
//                   this.invoiceForm.controls.irnDate.setValue(null);
//                 }
//                 this.irnNumber = this.withoutpodetails[0].IRNNUMBER;

//                 this.invoiceForm.controls.invoiceNo.setValue(
//                   this.withoutpodetails[x].INVOICENUMBER
//                 );
//                 console.log(
//                   "this.withoutpodetails[x].INVOICENUMBER " +
//                     this.withoutpodetails[x].INVOICENUMBER
//                 );
//                 this.invoiceForm.controls.invoiceDate.setValue(
//                   new Date(this.withoutpodetails[x].INVOICEDATE)
//                 );
//                 var invoicedate = new Date(
//                   this.withoutpodetails[0].INVOICEDATE
//                 );
//                 if (
//                   this.withoutpodetails[0].BILLOFLADINGDATE == undefined ||
//                   this.withoutpodetails[0].BILLOFLADINGDATE == null
//                 ) {
//                   this.invoiceForm.controls.billofladingdate.setValue(null);
//                 } else {
//                   this.invoiceForm.controls.billofladingdate.setValue(
//                     new Date(this.withoutpodetails[x].BILLOFLADINGDATE)
//                   );
//                 }

//                 this.invoiceForm.controls.description.setValue(
//                   this.withoutpodetails[x].DESCRIPTION
//                 );
//                 this.descripionlength =
//                   160 - this.withoutpodetails[x].DESCRIPTION.length;
//                 console.log(
//                   "this.withoutpodetails[x].ACTUALFILENAME ",
//                   this.withoutpodetails[x].ACTUALFILENAME
//                 );
//                 var a = this.withoutpodetails[x].ACTUALFILENAME;
//                 if (a != "") {
//                   this.invoiceForm.get("attachments").setValidators(null);
//                   this.invoiceForm.get("attachments").updateValueAndValidity();
//                 }
//                 if (this.withoutpodetails[x].IRNNUMBER != null) {
//                   this.invoice = false;
//                   this.invoiceForm.controls.irnNo.setValue(
//                     this.withoutpodetails[x].IRNNUMBER
//                   );
//                   this.invoiceForm.controls.irnDate.setValue(
//                     new Date(this.withoutpodetails[x].IRNDATE)
//                   );
//                 } else {
//                   this.invoice = true;
//                   this.invoiceForm.controls.irnNo.setValue(null);
//                   this.invoiceForm.controls.irnDate.setValue(null);
//                 }
//                 this.viewAttachmentName =
//                   this.withoutpodetails[x].ACTUALFILENAME;
//                 this.actualfilenameofwopo =
//                   this.withoutpodetails[x].ACTUALFILENAME;
//                 this.savedfilenameofwopo =
//                   this.withoutpodetails[x].SAVEDFILENAME;

//                 if (this.withoutpodetails[x].SUPPORTACTFILENAME != null) {
//                   var array =
//                     this.withoutpodetails[x].SUPPORTACTFILENAME.split(",");
//                   this.individualsavedname = [];
//                   for (var k = 0; k < array.length; k++) {
//                     this.individualsavedname.push(array[k]);
//                   }
//                   this.ArrayOfSelectedFile = [];
//                   this.ArrayOfSelectedFilename = this.individualsavedname;
//                   this.filecount = this.ArrayOfSelectedFilename.length;
//                   console.log(
//                     "this.ArrayOfSelectedFilename ",
//                     this.ArrayOfSelectedFilename
//                   );
//                   var array1 =
//                     this.withoutpodetails[x].SUPPORTSAVEDFILENAME.split(",");
//                   this.individualsavedname = [];
//                   for (var k = 0; k < array1.length; k++) {
//                     this.individualsavedname1.push(array1[k]);
//                   }
//                   this.ArrayOfSelectedSavedFile = [];
//                   this.ArrayOfSelectedSavedFile = this.individualsavedname1;

//                   console.log(
//                     "this.ArrayOfSelectedFilename ",
//                     this.ArrayOfSelectedSavedFile
//                   );
//                 }
//               }
//             }
//           }

//           this.orderlineitems = JSON.parse(
//             sessionStorage.getItem("invsubmissionorderDetails")
//           );
//           this.uniquelineitems = JSON.parse(
//             sessionStorage.getItem("invsubmissionDetails")
//           );
//           console.log("this.uniquelineitems", this.uniquelineitems);
//           this.maxdate = new Date();
//           this.mindate = new Date(this.podate);
//           if (this.TypeNo == "part") {
//             this.part = true;
//             this.full = false;
//             this.resubmit = true;
//           } else {
//             this.part = false;
//             this.full = true;
//             this.resubmit = false;
//           }
//           this.getPOitems(this.ponumber);
//         });
//     } else if (this.TypeNo == "reopen") {
//       debugger;

//       this.fileupload = "norefileupload";
//       this.part = true;
//       this.full = false;
//       this.resubmit = false;
//       this.reopen = true;
//       this.invoicedata = [];
//       this.uniquelineitems = [];
//       this.uniquelineitem = [];
//       sessionStorage.setItem("poNumber", this.ponumber);
//       console.log("in here");
//       this.purchaseOrderListService
//         .getPODetails(this.ponumber)
//         .subscribe((res) => {
//           this.uniquelineitems = res[0].poData;
//           for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {
//             this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY);
//             this.uniquelineitems[i].QUANTITY = Number(
//               this.uniquelineitems[i].QUANTITY
//             );

//             this.lineitemnumberlist.push(
//               this.uniquelineitems[i].LINEITEMNUMBER
//             );
//             this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
//             if (this.full) {
//               this.uniquelineitems[i].TOTALAMOUNT =
//                 Number(this.uniquelineitems[i].BALANCE_QTY) *
//                 Number(this.uniquelineitems[i].RATEPERQTY);
//               this.overallAmount += parseFloat(
//                 this.uniquelineitems[i].TOTALAMOUNT
//               );
//             }
//             this.invoiceForm.addControl("orderValue" + i, this.fb.control(0));
//             this.invoiceForm.addControl("calRealtime" + i, this.fb.control(0));
//           }
//           if (
//             this.totalBalQty == 0 ||
//             this.totalBalQty == 0.0 ||
//             this.TypeNo != "reopen"
//           ) {
//             console.log("problem here");
//             this.disable = true;
//             this.errormessage =
//               "* Can't submit invoice total balance quantity = 0";
//           } else if (
//             this.totalBalQty == 0 ||
//             this.totalBalQty == 0.0 ||
//             this.TypeNo == "reopen"
//           ) {
//             this.disable = true;
//             this.errormessage = " ";
//           }

//           console.log(
//             "call form Total Balance Quantity==============>",
//             this.totalBalQty
//           );
//           for (var j = 0; j < this.poDetail.length; j++) {
//             if (this.poDetail[j].ORDERNUMBER == null) {
//               this.uniquelineitems.push(this.poDetail[j]);
//               this.balQtyList.push(this.poDetail[j].BALANCE_QTY);
//               console.log("teest", this.poDetail[j].BALANCE_QTY);
//             }
//           }
//           console.log("this.uniquelineitems======>>>", this.uniquelineitems);
//           this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
//             if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
//               return 1;
//             }

//             if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
//               return -1;
//             }

//             return 0;
//           });
//           console.log(
//             "this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems)
//           );
//           sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
//           console.log("Lineitemtext ", this.poDetail);
//           for (var i = 0; i < this.poDetail.length; i++) {
//             this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
//           }
//           console.log("this.lineitemnumber. " + this.lineitemnumber);
//           var mySet = new Set(this.lineitemnumber);
//           mySet.forEach((v) => this.lineitemnumberset.push(v));

//           this.poDetail = res[0].poData.sort(
//             (a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER)
//           );
//           if (this.uniquelineitems.length != 0) {
//             this.trackOrderListService
//               .getlistitemsforinvoicenumber(this.invNo, this.ponumber)
//               .subscribe((res) => {
//                 if (res[0].message == "Success") {
//                   console.log("started");
//                   this.invoicedata = res[0].poData;
//                   this.invoicedata = this.invoicedata.sort(
//                     (a, b) =>
//                       Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER)
//                   );
//                   for (let m = 0; m < this.uniquelineitems.length; m++) {
//                     console.log(
//                       "uniquelineitems which ittrate the value of items =" +
//                         this.uniquelineitems.length
//                     ); //m =4
//                     this.invoiceForm.addControl(
//                       "orderValue" + m,
//                       this.fb.control("")
//                     );
//                     for (let i = 0; i < this.invoicedata.length; i++) {
//                       console.log(
//                         "invoicedata which ittrate the value of items :" +
//                           this.invoicedata.length
//                       );
//                       if (this.invoicedata[i].GRNNUMBER != null) {
//                         console.log(
//                           "this is the invoice AcceptQuantity:" +
//                             this.invoicedata[i].ACCEPTEDQTY
//                         );
//                         console.log(
//                           "this is the invoice Quantity :" +
//                             this.invoicedata[i].QUANTITY
//                         );
//                         this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(
//                           parseFloat(this.invoicedata[i].QUANTITY) *
//                             parseFloat(this.invoicedata[i].RATEPERQTY)
//                         );

//                         this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(
//                           parseFloat(this.invoicedata[i].ACCEPTEDQTY) *
//                             parseFloat(this.invoicedata[i].RATEPERQTY)
//                         );
//                       }
//                       if (this.invoicedata[i].GRNNUMBER == null) {
//                         console.log(
//                           "this is the invoice Quantity :" +
//                             this.invoicedata[i].QUANTITY
//                         );
//                         this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(
//                           parseFloat(this.invoicedata[i].QUANTITY) *
//                             parseFloat(this.invoicedata[i].RATEPERQTY)
//                         );
//                       }
//                       if (
//                         this.uniquelineitems[m].PO_NUMBER ==
//                           this.invoicedata[i].PO_NUMBER &&
//                         this.uniquelineitems[m].LINEITEMNUMBER ==
//                           this.invoicedata[i].LINEITEMNUMBER
//                       ) {
//                         this.invoiceForm.controls["orderValue" + m].setValue(
//                           this.invoicedata[i].QUANTITY
//                         );

//                         console.log(
//                           "Quantity " +
//                             this.invoiceForm.controls[
//                               "orderValue" + m
//                             ].setValue(this.invoicedata[i].QUANTITY)
//                         );

//                         this.calculate(m, this.uniquelineitems[m].RATEPERQTY);
//                       }
//                     }
//                   }
//                   console.log("this.invoicedata  ==>", this.invoicedata);
//                   if (
//                     this.invoicedata[0].IRNNUMBER != null ||
//                     this.invoicedata[0].IRNNUMBER != ""
//                   ) {
//                     this.invoice = false;
//                     this.irnNumber = this.invoicedata[0].IRNNUMBER;
//                   } else {
//                     this.invoice = true;
//                     this.irnNumber = null;
//                   }

//                   var invoicedate = new Date(this.invoicedata[0].INVOICEDATE);
//                   this.invoiceForm.controls.invoiceNo.setValue(this.invNo);
//                   this.invoiceForm.controls.invoiceDate.setValue(
//                     new Date(this.invoicedata[0].INVOICEDATE)
//                   );
//                   if (this.mindate < invoicedate) {
//                     this.disable = true;
//                   } else {
//                     this.disable = false;
//                   }
//                   this.invoiceForm.controls.description.setValue(
//                     this.invoicedata[0].DESCRIPTION
//                   );
//                   this.descripionlength =
//                     160 - this.invoicedata[0].DESCRIPTION.length;
//                   if (this.invoicedata[0].BILLOFLADINGDATE == null) {
//                     this.invoiceForm.controls.billofladingdate.setValue(null);
//                   } else {
//                     this.invoiceForm.controls.billofladingdate.setValue(
//                       new Date(this.invoicedata[0].BILLOFLADINGDATE)
//                     );
//                   }
//                   if (
//                     this.invoicedata[0].ACTUALFILENAME != null ||
//                     this.invoicedata[0].ACTUALFILENAME != ""
//                   ) {
//                     this.invoiceForm.get("attachments").setValidators(null);
//                     this.invoiceForm.controls[
//                       "attachments"
//                     ].updateValueAndValidity();
//                   }
//                   if (this.invoicedata[0].IRNNUMBER != null) {
//                     this.invoice = false;
//                     this.invoiceForm.controls.irnNo.setValue(
//                       this.invoicedata[0].IRNNUMBER
//                     );
//                     this.invoiceForm.controls.irnDate.setValue(
//                       new Date(this.invoicedata[0].IRNDATE)
//                     );
//                   } else {
//                     this.invoice = true;
//                     this.invoiceForm.controls.irnNo.setValue(null);
//                     this.invoiceForm.controls.irnDate.setValue(null);
//                   }

//                   this.viewAttachmentName = this.invoicedata[0].ACTUALFILENAME;
//                   console.log(
//                     "this.ArrayOfSelectedFilename this.invoicedata[0].TOTALAMOUNT ",
//                     this.invoicedata[0].TOTALAMOUNT
//                   );
//                   this.actualresubmitfilename =
//                     this.invoicedata[0].ACTUALFILENAME;
//                   this.savedresubmitfilename =
//                     this.invoicedata[0].SAVEDFILENAME;
//                   if (this.invoicedata[0].MULTIACTUALFILENAME != null) {
//                     var array =
//                       this.invoicedata[0].MULTIACTUALFILENAME.split(",");
//                     this.suppindividualactualname = [];
//                     for (var k = 0; k < array.length; k++) {
//                       this.suppindividualactualname.push(array[k]);
//                     }
//                     this.ArrayOfSelectedFile = [];
//                     this.ArrayOfSelectedFilename =
//                       this.suppindividualactualname;
//                     this.filecount = this.ArrayOfSelectedFilename.length;
//                     console.log(
//                       "this.ArrayOfSelectedFilename ",
//                       this.ArrayOfSelectedFilename
//                     );
//                     var array1 =
//                       this.invoicedata[0].MULTISAVEDFILENAME.split(",");
//                     this.suppindividualsavedname = [];
//                     for (var k = 0; k < array1.length; k++) {
//                       this.suppindividualsavedname.push(array1[k]);
//                     }
//                     this.ArrayOfSelectedSavedFile = [];
//                     this.ArrayOfSelectedSavedFile =
//                       this.suppindividualsavedname;

//                     console.log(
//                       "this.ArrayOfSelectedSavedFile ",
//                       this.ArrayOfSelectedSavedFile
//                     );
//                   }
//                   this.invoiceForm.controls.remarks.setValue(
//                     this.invoicedata[0].VENDORREMARKS
//                   );
//                   this.remarklength =
//                     160 - this.invoicedata[0].VENDORREMARKS.length;
//                   console.log("this.invoiceForm.controls.attachments");
//                   this.invoiceForm.controls.endUser.setValue(
//                     this.invoicedata[0].NOTIFYENDUSEREMAILID
//                   );
//                 }
//               });
//           }
//         });
//     } else if (this.TypeNo == "resubmit") {
//       this.fileupload = "norefileupload";
//       this.part = true;
//       this.full = false;
//       this.resubmit = true;
//       this.reopen = true;
//       this.invoicedata = [];
//       this.uniquelineitems = [];
//       this.uniquelineitem = [];
//       sessionStorage.setItem("poNumber", this.ponumber);
//       console.log("in here");
//       this.purchaseOrderListService
//         .getPODetails(this.ponumber)
//         .subscribe((res) => {
//           this.uniquelineitems = res[0].poData;
//           for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {
//             this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY);
//             this.uniquelineitems[i].QUANTITY = Number(
//               this.uniquelineitems[i].QUANTITY
//             );

//             this.lineitemnumberlist.push(
//               this.uniquelineitems[i].LINEITEMNUMBER
//             );
//             this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
//             if (this.full) {
//               this.uniquelineitems[i].TOTALAMOUNT =
//                 Number(this.uniquelineitems[i].BALANCE_QTY) *
//                 Number(this.uniquelineitems[i].RATEPERQTY);
//               this.overallAmount += parseFloat(
//                 this.uniquelineitems[i].TOTALAMOUNT
//               );
//             }
//             this.invoiceForm.addControl("orderValue" + i, this.fb.control(0));
//             this.invoiceForm.addControl("calRealtime" + i, this.fb.control(0));
//           }
//           if (
//             this.totalBalQty == 0 ||
//             this.totalBalQty == 0.0 ||
//             this.TypeNo != "reopen"
//           ) {
//             console.log("problem here");
//             this.disable = true;
//             this.errormessage =
//               "* Can't submit invoice total balance quantity = 0";
//           }

//           console.log(
//             "call form Total Balance Quantity==============>",
//             this.totalBalQty
//           );
//           for (var j = 0; j < this.poDetail.length; j++) {
//             if (this.poDetail[j].ORDERNUMBER == null) {
//               this.uniquelineitems.push(this.poDetail[j]);
//               this.balQtyList.push(this.poDetail[j].BALANCE_QTY);
//               console.log("teest", this.poDetail[j].BALANCE_QTY);
//             }
//           }
//           console.log("this.uniquelineitems======>>>", this.uniquelineitems);
//           this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
//             if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
//               return 1;
//             }

//             if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
//               return -1;
//             }

//             return 0;
//           });
//           console.log(
//             "this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems)
//           );
//           sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
//           console.log("Lineitemtext ", this.poDetail);
//           for (var i = 0; i < this.poDetail.length; i++) {
//             this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
//           }
//           console.log("this.lineitemnumber. " + this.lineitemnumber);
//           var mySet = new Set(this.lineitemnumber);
//           mySet.forEach((v) => this.lineitemnumberset.push(v));

//           this.poDetail = res[0].poData.sort(
//             (a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER)
//           );
//           if (this.uniquelineitems.length != 0) {
//             this.trackOrderListService
//               .getlistitemsforinvoicenumber(this.invNo, this.ponumber)
//               .subscribe((res) => {
//                 if (res[0].message == "Success") {
//                   this.invoicedata = res[0].poData;
//                   this.invoicedata = this.invoicedata.sort(
//                     (a, b) =>
//                       Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER)
//                   );
//                   for (let m = 0; m < this.uniquelineitems.length; m++) {
//                     this.invoiceForm.addControl(
//                       "orderValue" + m,
//                       this.fb.control("")
//                     );
//                     for (let i = 0; i < this.invoicedata.length; i++) {
//                       if (this.invoicedata[i].GRNNUMBER != null) {
//                         this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(
//                           parseFloat(this.invoicedata[i].ACCEPTEDQTY) *
//                             parseFloat(this.invoicedata[i].RATEPERQTY)
//                         );
//                       }
//                       if (this.invoicedata[i].GRNNUMBER == null) {
//                         this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(
//                           parseFloat(this.invoicedata[i].QUANTITY) *
//                             parseFloat(this.invoicedata[i].RATEPERQTY)
//                         );
//                       }
//                       if (
//                         this.uniquelineitems[m].PO_NUMBER ==
//                           this.invoicedata[i].PO_NUMBER &&
//                         this.uniquelineitems[m].LINEITEMNUMBER ==
//                           this.invoicedata[i].LINEITEMNUMBER
//                       ) {
//                         if (
//                           this.uniquelineitems[m].FORECLOSESTATUSCHECK == "X"
//                         ) {
//                           this.invoiceForm.controls["orderValue" + m].setValue(
//                             0
//                           );
//                         } else {
//                           this.invoiceForm.controls["orderValue" + m].setValue(
//                             0
//                           );
//                         }
//                         this.calculate(m, this.uniquelineitems[m].RATEPERQTY);
//                       }
//                     }
//                   }
//                   console.log("this.invoicedata ==>", this.invoicedata);
//                   if (
//                     this.invoicedata[0].IRNNUMBER != null ||
//                     this.invoicedata[0].IRNNUMBER != ""
//                   ) {
//                     this.invoice = false;
//                     this.irnNumber = this.invoicedata[0].IRNNUMBER;
//                   } else {
//                     this.invoice = true;
//                     this.irnNumber = null;
//                   }

//                   var invoicedate = new Date(this.invoicedata[0].INVOICEDATE);
//                   this.invoiceForm.controls.invoiceNo.setValue(this.invNo);
//                   this.invoiceForm.controls.invoiceDate.setValue(
//                     new Date(this.invoicedata[0].INVOICEDATE)
//                   );
//                   if (this.mindate < invoicedate) {
//                     this.disable = true;
//                   } else {
//                     this.disable = false;
//                   }
//                   this.invoiceForm.controls.description.setValue(
//                     this.invoicedata[0].DESCRIPTION
//                   );
//                   this.descripionlength =
//                     160 - this.invoicedata[0].DESCRIPTION.length;
//                   if (this.invoicedata[0].BILLOFLADINGDATE == null) {
//                     this.invoiceForm.controls.billofladingdate.setValue(null);
//                   } else {
//                     this.invoiceForm.controls.billofladingdate.setValue(
//                       new Date(this.invoicedata[0].BILLOFLADINGDATE)
//                     );
//                   }
//                   if (
//                     this.invoicedata[0].ACTUALFILENAME != null ||
//                     this.invoicedata[0].ACTUALFILENAME != ""
//                   ) {
//                     this.invoiceForm.get("attachments").setValidators(null);
//                     this.invoiceForm.controls[
//                       "attachments"
//                     ].updateValueAndValidity();
//                   }
//                   if (this.invoicedata[0].IRNNUMBER != null) {
//                     this.invoice = false;
//                     this.invoiceForm.controls.irnNo.setValue(
//                       this.invoicedata[0].IRNNUMBER
//                     );
//                     this.invoiceForm.controls.irnDate.setValue(
//                       new Date(this.invoicedata[0].IRNDATE)
//                     );
//                   } else {
//                     this.invoice = true;
//                     this.invoiceForm.controls.irnNo.setValue(null);
//                     this.invoiceForm.controls.irnDate.setValue(null);
//                   }

//                   this.viewAttachmentName = this.invoicedata[0].ACTUALFILENAME;
//                   console.log(
//                     "this.ArrayOfSelectedFilename this.invoicedata[0].TOTALAMOUNT ",
//                     this.invoicedata[0].TOTALAMOUNT
//                   );
//                   this.actualresubmitfilename =
//                     this.invoicedata[0].ACTUALFILENAME;
//                   this.savedresubmitfilename =
//                     this.invoicedata[0].SAVEDFILENAME;

//                   if (this.invoicedata[0].MULTIACTUALFILENAME != null) {
//                     var array =
//                       this.invoicedata[0].MULTIACTUALFILENAME.split(",");
//                     this.suppindividualactualname = [];
//                     for (var k = 0; k < array.length; k++) {
//                       this.suppindividualactualname.push(array[k]);
//                     }
//                     this.ArrayOfSelectedFile = [];
//                     this.ArrayOfSelectedFilename =
//                       this.suppindividualactualname;
//                     this.filecount = this.ArrayOfSelectedFilename.length;
//                     console.log(
//                       "this.ArrayOfSelectedFilename ",
//                       this.ArrayOfSelectedFilename
//                     );
//                     var array1 =
//                       this.invoicedata[0].MULTISAVEDFILENAME.split(",");
//                     this.suppindividualsavedname = [];
//                     for (var k = 0; k < array1.length; k++) {
//                       this.suppindividualsavedname.push(array1[k]);
//                     }
//                     this.ArrayOfSelectedSavedFile = [];
//                     this.ArrayOfSelectedSavedFile =
//                       this.suppindividualsavedname;

//                     console.log(
//                       "this.ArrayOfSelectedSavedFile ",
//                       this.ArrayOfSelectedSavedFile
//                     );
//                   }
//                   this.invoiceForm.controls.remarks.setValue(
//                     this.invoicedata[0].VENDORREMARKS
//                   );
//                   this.remarklength =
//                     160 - this.invoicedata[0].VENDORREMARKS.length;

//                   this.invoiceForm.controls.attachments.setValue(
//                     this.invoicedata[0].ACTUALFILENAME
//                   );
//                   console.log("this.invoiceForm.controls.attachments");
//                   this.invoiceForm.controls.endUser.setValue(
//                     this.invoicedata[0].NOTIFYENDUSEREMAILID
//                   );
//                 }
//               });
//           }
//         });
//     }

//     console.log("this.vendorid ==> " + this.vendorid);
//   }

//   getPOitems(POnumber) {
//     debugger;
//     this.uniquelineitems = [];
//     this.uniquelineitem = [];
//     sessionStorage.setItem("poNumber", POnumber);
//     console.log("in here");
//     this.purchaseOrderListService.getPODetails(POnumber).subscribe((res) => {
//       debugger;
//       this.uniquelineitems = res[0].poData;
//       this.remainingLinewItems = this.uniquelineitems;
//       console.log("remainingLinewItems", this.remainingLinewItems);
//       for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {
//         this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY);
//         this.uniquelineitems[i].QUANTITY = Number(
//           this.uniquelineitems[i].QUANTITY
//         );

//         this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
//         this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
//         console.log("this.lineitemnumberlist " + this.lineitemnumberlist);
//         console.log(" this.quantitylist " + this.quantitylist);
//         if (this.full) {
//           this.uniquelineitems[i].TOTALAMOUNT =
//             Number(this.uniquelineitems[i].BALANCE_QTY) *
//             Number(this.uniquelineitems[i].RATEPERQTY);
//           this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT);
//         }
//         this.invoiceForm.addControl("orderValue" + i, this.fb.control(0));
//         this.invoiceForm.addControl("calRealtime" + i, this.fb.control(0));
//       }
//       if (
//         (this.totalBalQty == 0 || this.totalBalQty == 0.0) &&
//         this.tobeinvoicelist.length == 0 &&
//         this.TypeNo != "reopen"
//       ) {
//         console.log("problem here");
//         this.disable = true;
//         this.errormessage = "* Can't submit invoice total balance quantity = 0";
//       }

//       console.log(
//         "call form Total Balance Quantity==============>",
//         this.totalBalQty
//       );
//       for (var j = 0; j < this.poDetail.length; j++) {
//         if (this.poDetail[j].ORDERNUMBER == null) {
//           this.uniquelineitems.push(this.poDetail[j]);
//           this.balQtyList.push(this.poDetail[j].BALANCE_QTY);
//           console.log("teest", this.poDetail[j].BALANCE_QTY);
//         }
//       }

//       console.log("this.uniquelineitems======>>>", this.uniquelineitems);
//       this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
//         if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
//           return 1;
//         }

//         if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
//           return -1;
//         }

//         return 0;
//       });
//       console.log(
//         "this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems)
//       );
//       sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
//       console.log("Lineitemtext ", this.poDetail);
//       for (var i = 0; i < this.poDetail.length; i++) {
//         this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
//       }
//       console.log("this.lineitemnumber. " + this.lineitemnumber);
//       var mySet = new Set(this.lineitemnumber);
//       mySet.forEach((v) => this.lineitemnumberset.push(v));
//       console.log(
//         "Set items this.lineitemnumberset ==>" + this.lineitemnumberset
//       );

//       console.log(removeDuplicates(res[0].poData, "LINEITEMNUMBER"));
//       this.poDetail = res[0].poData.sort(
//         (a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER)
//       );
//       return true;
//     });
//     const removeDuplicates = (array, key) => {
//       return array.reduce((arr, item) => {
//         const removed = arr.filter((i) => i[key] !== item[key]);
//         return [...removed, item];
//       }, []);
//     };
//   }

//   checkBalanceQty(event, balance: number, val1: number) {
//     debugger;
//     const controlName = "orderValue" + val1;
//     const inputValue = event.target.value;
  
//     // Set the new value in the form control
//     this.invoiceForm.get(controlName)?.setValue(inputValue);
  
//     // Retrieve the form control
//     const formControl = this.invoiceForm.get(controlName);
  
//     if (formControl) {
//       const numericInputValue = parseFloat(formControl.value ? formControl.value.toString() : "0");
  
//       console.log(`Control Name: ${controlName}, Value: ${numericInputValue}`);
  
//       // Calculate the sum of all orderValue controls
//       let totalOrderValue = 0;
  
//       for (let i = 0; i < this.uniquelineitems.length; i++) {
//         const control = this.invoiceForm.get('orderValue' + i);
//         if (control && control.value) {
//           totalOrderValue += parseFloat(control.value);
//         }
//       }
  
//       console.log("Total Order Value:", totalOrderValue);
//       if (totalOrderValue > balance) {
//         this.disable = true;
//         this.zeropresent = false;
//         this.exceededSubmitDisable = true;
//         this.issubmitcheck = true;
//         this.balanceExceeded = true;
  
//         // Update DOM with jQuery
//         $("#inputQty" + val1).addClass("redborder");
//         $("#exceeded" + val1).show();
//         $("#zero" + val1).hide();
//       }
//       // If the value is less than 0
//       else if (numericInputValue < 0) {
//         this.zeropresent = true;
//         this.issubmitcheck = true;

//         // Update DOM with jQuery
//         $("#inputQty" + val1).addClass("redborder");
//         $("#zero" + val1).show();
//         $("#exceeded" + val1).hide();
//         this.exceededSubmitDisable = false;
//       }
//       // If the value is valid
//       else {
//         this.exceededSubmitDisable = false;
//         this.issubmitcheck = false;
//         this.balanceExceeded = false;
//         this.disable = false;
//         this.zeropresent = false;

//         // Update DOM with jQuery
//         $("#inputQty" + val1).removeClass("redborder");
//         $("#exceeded" + val1).hide();
//         $("#zero" + val1).hide();
//       }

//       // Trigger change detection if needed
//       this.cd.detectChanges();
//     } else {
//       console.error(`Form control with name ${controlName} not found.`);
//     }
//   }

//   calculate(i, rate) {
//     debugger;
//     // let inputValue = event.target.value;
//     console.log(" Values================>", i, rate);
//     this.calculatedAmount = 0;
//     this.inputBalanceQuantity = 0;
//     if (
//       this.invoiceForm.controls["orderValue" + i].value == 0 ||
//       this.invoiceForm.controls["orderValue" + i].value == ""
//     ) {
//       console.log("entered");
//       // this.invoiceForm.controls['calRealtime' + i].setValue(0)
//       // this.invoiceForm.controls['orderValue' + i].setValue(0)
//       this.calculatedAmount = 0 * parseFloat(rate);
//     } else {
//       this.calculatedAmount =
//         parseFloat(this.invoiceForm.controls["orderValue" + i].value) *
//         parseFloat(rate);
//     }
//     // if (isNaN(this.calculatedAmount)) {
//     //   this.calculatedAmount = this.invoiceForm.controls['orderValue' + i].value;
//     // }
//     this.overallAmount = 0;
//     // debugger;
//     console.log("total===========>", this.calculatedAmount);
//     this.invoiceForm.controls["calRealtime" + i].setValue(
//       Math.round(Number(this.calculatedAmount) * 100) / 100
//     );
//     for (let a = 0; a < this.uniquelineitems.length; a++) {
//       if (
//         this.invoiceForm.controls["orderValue" + a].value == 0 ||
//         this.invoiceForm.controls["orderValue" + a].value == ""
//       ) {
//         console.log("entered");
//         // this.invoiceForm.controls['calRealtime' + i].setValue(0)
//         // this.invoiceForm.controls['orderValue' + a].setValue(0)
//       }
//       this.overallAmount += this.invoiceForm.controls["calRealtime" + a].value;
//       this.inputBalanceQuantity += Number(
//         this.invoiceForm.controls["orderValue" + a].value
//       );
//       console.log("==============>", this.inputBalanceQuantity);

//       // debugger;
//       console.log(this.overallAmount);
//       if (isNaN(this.overallAmount) || isNaN(this.inputBalanceQuantity)) {
//         // this.overallAmount = this.invoiceForm.controls['calRealtime' + (a-1)].value;
//         // this.inputBalanceQuantity=this.invoiceForm.controls['orderValue' + (a-1)].value;
//       }
//     }
//     this.invoiceForm.controls["overallAmount"]?.setValue(this.overallAmount);
//     this.invoiceForm.controls["totalOrderQty"]?.setValue(
//       this.inputBalanceQuantity
//     );
//   }

//   calculateTax() {
//     if (this.full) {
//       this.invoiceForm.controls["taxAmount"].setValue(0);
//       let tax =
//         parseFloat(this.invoiceForm.controls["TotalinctaxAmount"].value) -
//         parseFloat(this.overallAmount);
//       if (isNaN(tax)) {
//         tax = this.invoiceForm.controls["TotalinctaxAmount"].value;
//       }
//       tax = Math.round(tax * 100) / 100;
//       let taxAmt = Math.round(tax * 100) / 100;
//       console.log("taxAmt " + taxAmt);
//       if (taxAmt < 0) {
//         this.negativeFlag = true;
//         this.disable = true;
//       } else {
//         this.negativeFlag = false;
//         this.disable = false;
//       }

//       this.invoiceForm.controls.taxAmount.setValue(tax);
//     }

//     if (this.part) {
//       // this.invoiceForm.controls['taxAmount'].setValue(0);
//       let tax =
//         parseFloat(this.invoiceForm.controls["TotalinctaxAmount"].value) -
//         parseFloat(this.invoiceForm.controls["overallAmount"]?.value);
//       Math.round(tax * 100) / 100;
//       if (isNaN(tax)) {
//         tax = this.invoiceForm.controls["TotalinctaxAmount"].value;
//       }
//       // let taxAmt=tax.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
//       let taxAmt = Math.round(tax * 100) / 100;
//       console.log("taxAmt " + taxAmt);
//       if (taxAmt < 0) {
//         this.negativeFlag = true;
//         this.disable = true;
//       } else {
//         this.negativeFlag = false;
//         this.disable = false;
//       }

//       this.invoiceForm.controls.taxAmount.setValue(taxAmt);
//     }
//     if (this.full) {
//       this.invoiceForm.controls["taxAmount"].setValue(0);
//       let tax =
//         parseFloat(this.invoiceForm.controls["TotalinctaxAmount"].value) -
//         parseFloat(this.overallAmount);
//       if (isNaN(tax)) {
//         tax = this.invoiceForm.controls["TotalinctaxAmount"].value;
//       }
//       tax = Math.round(tax * 100) / 100;
//       this.invoiceForm.controls.taxAmount.setValue(tax);
//     }
//   }

//   @ViewChildren("citySelect") citySelects: QueryList<ElementRef>;

//   advDateFormat: any[] = [];
//   asnNumber: any[] = [];

//   asnNumberHistory: any[] = [];

//   asnRowCount: number = 0;

//   advSubmit() {
//     debugger;
//    console.log(this.invoiceForm) 
//     this.asnRowCount = 0;
//     this.invoicesubmissionarray = [];
//     this.loaderservice.show();
//     let advDate: any;
//     let advQuantity: any;
//     // var advFormatDate: any;

//     this.delivery.bid = sessionStorage.getItem("Bid");
//     this.delivery.po_num = this.ponumber;

//     this.citySelects.forEach((citySelect, index) => {
//       debugger;
//       const advCity = citySelect.nativeElement.value; // Get the value (city[0])
//       const advQuantity = Number($("#inputQty" + index).val());

//       //this.mintodate = new Date(this.invalidinvoice.controls['fromDate'].value);

//       // advDate = $('#advDate' + index).val();

//       // advFormatDate = $('#advDate' + index).val();
//       advDate = this.datePipe.transform(
//         this.advDateFormat[index],
//         "dd/MM/yyyy"
//       );

//       // Create a new delivery object for each line item
//       let newDelivery = {
//         bid: this.delivery.bid,
//         po_num: this.delivery.po_num,
//         lineItemNumber: this.uniquelineitems[index].LINEITEMNUMBER,
//         lineItemText: this.uniquelineitems[index].LINEITEMTEXT,
//         balancQTY: this.uniquelineitems[index].BALANCE_QTY,
//         asnQuantity: advQuantity,
//         asnDate: advDate,
//         asnLocation: advCity, // Use the value (city[0])
//         asnNumber: this.asnNumber[index],
//         supportingDocName: " ",
//       };

//       if (newDelivery.asnQuantity > 0) {
//         debugger;
//         this.invoicesubmissionarray.push(newDelivery);
//       }
//     });

//     if (this.invoicesubmissionarray.length > 0) {
//       debugger;
//       this.invoicesubmissionarray.forEach((val) => {
//         if (val.asnDate && val.asnLocation) {
//           this.asnRowCount = this.asnRowCount + 1;
//         } else {
//           this.asnRowCount = this.asnRowCount - 1;
//         }
//       });

//       if (this.invoicesubmissionarray.length == this.asnRowCount) {
//         debugger;
//         this.purchaseOrderListService
//           .setAsnDetails(this.invoicesubmissionarray)
//           .subscribe((res) => {
//             if (res[0].message == "Success") {
//               debugger;
//               this.loaderservice.hide();
//               const dialogConfig = new MatDialogConfig();
//               dialogConfig.data = {
//                 message: "Delivery schedule has been submitted successfully.",
//                 condition: "success",
//                 page: "advanceShipping",
//               };

//               const mydata = dialogConfig.data;
//               console.log("PopupComponent", mydata);

//               const dialogRef = this.dialog.open(PopupComponent, {
//                 panelClass: "custom-modalbox",

//                 width: "400px",
//                 data: { datakey: dialogConfig.data },
//               });
//               dialogRef.afterClosed().subscribe((result) => {
//                 console.log(`Dialog result1: ${result}`);
//                 // this.router.navigate(['/purchaseOrdersList']);
//                 this.showAsnHistory = true;
//                 this.showAsnItem = false;

//                 $("#asnHistory").click();
//               });
//             } else {
//               this.loaderservice.hide();
//               const dialogConfig = new MatDialogConfig();
//               dialogConfig.data = {
//                 message: res[0]?.Uniquemessage,
//                 condition: "error",
//                 page: "advanceShipping",
//                 specific: "note",
//               };
//               const mydata = dialogConfig.data;
//               console.log("PopupComponent", mydata);

//               const dialogRef = this.dialog.open(PopupComponent, {
//                 panelClass: "custom-modalbox",

//                 width: "400px",
//                 data: { datakey: dialogConfig.data },
//               });
//               dialogRef.afterClosed().subscribe((result) => {
//                 console.log(`Dialog result1: ${result}`);
//               });
//               this.successmessage = res[0]?.Uniquemessage;
//               this.error = true;
//             }
//             this.loaderservice.hide();
//           });
//       } else {
//         debugger
//         this.loaderservice.hide();
//         const dialogConfig = new MatDialogConfig();
//         dialogConfig.data = {
//           message: "Please fill remaining fields",
//           condition: "error",
//           page: "advanceShipping",
//           specific: "note",
//         };
//         const mydata = dialogConfig.data;
//         console.log("PopupComponent", mydata);

//         const dialogRef = this.dialog.open(PopupComponent, {
//           panelClass: "custom-modalbox",

//           width: "400px",
//           data: { datakey: dialogConfig.data },
//         });
//         dialogRef.afterClosed().subscribe((result) => {
//           console.log(`Dialog result1: ${result}`);
//         });
//         this.error = true;
//       }
//     } else {
//       debugger
//       this.loaderservice.hide();
//       const dialogConfig = new MatDialogConfig();
//       dialogConfig.data = {
//         message: "Please fill remaining fields",
//         condition: "error",
//         page: "advanceShipping",
//         specific: "note",
//       };
//       const mydata = dialogConfig.data;
//       console.log("PopupComponent", mydata);

//       const dialogRef = this.dialog.open(PopupComponent, {
//         panelClass: "custom-modalbox",

//         width: "400px",
//         data: { datakey: dialogConfig.data },
//       });
//       dialogRef.afterClosed().subscribe((result) => {
//         console.log(`Dialog result1: ${result}`);
//       });
//       this.error = true;
//     }
//   }

//   checkItem(event) {
//     debugger;
//     let value = event.target.value;
//     if (value == "Item") {
//       this.showAsnHistory = false;
//       this.showAsnItem = true;

//       this.asnNumber = this.asnNumber.map(() => "");

//       this.advDateFormat = this.advDateFormat.map(() => "");
//     } else {
//       // this.InvoiceForm.get['IRNNo'].setValidators()

//       this.showAsnHistory = true;
//       this.showAsnItem = false;

//       this.purchaseOrderListService
//         .getPOHistoryDetails(this.ponumber)
//         .subscribe((res) => {
//           console.log(res);

//           if (res[0].StatusCode == "200") {
//             this.asnHistoryData = res[0].ASNlist;
//           }
//         });

//       this.editHistoryAsn = false;
//       this.editingIndex = null;
//       this.validationMessage = null;
//     }
//   }

//   keyPressAlphanumeric(event): Boolean {
//     this.validationMessage = null;
//     const charCode = event.which ? event.which : event.keyCode;
//     if (
//       charCode == 45 ||
//       charCode == 47 ||
//       (charCode >= 48 && charCode <= 57) ||
//       (charCode >= 97 && charCode <= 122) ||
//       (charCode >= 65 && charCode <= 90)
//     ) {
//       return true;
//     }
//     return false;
//   }

//   validationMessage: string | null = null;

//   editAsnNumber(index) {
//     //this.editHistoryAsn = !this.editHistoryAsn;

//     if (this.editHistoryAsn && this.editingIndex === index) {
//       if (
//         !this.asnNumberHistory[index] ||
//         this.asnNumberHistory[index].trim() === ""
//       ) {
//         this.validationMessage = "ASN Number cannot be blank";
//         return;
//       }
//       console.log(
//         "Submitting ASN Number for row",
//         index,
//         this.asnNumberHistory[index]
//       );
//       debugger;
//       //this.asnHistoryData[index].ASNNUMBER = this.asnNumberHistory[index];

//       if (
//         this.asnNumberHistory[index] != this.asnHistoryData[index].ASNNUMBER
//       ) {
//         debugger;
//         this.purchaseOrderListService
//           .editASNNumberHistory(
//             this.asnNumberHistory[index],
//             this.asnHistoryData[index].REQUESTNO,
//             this.ASNfilename
//           )
//           .subscribe((data) => {
//             console.log(data, "maccccccccccccc");

//             if (data[0].StatusCode == "200") {
//               this.purchaseOrderListService
//                 .getPOHistoryDetails(this.ponumber)
//                 .subscribe((res) => {
//                   console.log(res);

//                   if (res[0].StatusCode == "200") {
//                     this.asnHistoryData = res[0].ASNlist;

//                     this.editHistoryAsn = false;
//                     this.editingIndex = null;
//                     this.validationMessage = null;
//                     this.viewAttachmentNames[index] = "";
//                   }
//                 });
//             }
//           });
//       } else {
//         debugger;
//         this.editHistoryAsn = false;
//         this.editingIndex = null;
//       }

//       // this.editHistoryAsn = false;
//       // this.editingIndex = null;
//       this.validationMessage = null;
//     } else {
//       this.editingIndex = index;
//       this.asnNumberHistory[index] = this.asnHistoryData[index].ASNNUMBER;
//       this.editHistoryAsn = true;
//       this.validationMessage = null;
//     }
//   }
//   testPoitem(poitem: any) {
//     console.log("Testing poitem:", poitem);
//   }
//   onFileChanged(event: any, poitem: any) {
//     debugger;
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       this.viewAttachmentNames[poitem] = file.name; // Store the file name for the specific row
//       console.log(`Uploaded file for row ${poitem}: ${file.name}`);
//     }
//     this.BID = sessionStorage.getItem("Bid");

//     console.log("this.filecount " + this.filecount);
//     var specialChars = "<>@!#$%^&*()+[]{}?:;_|'\"\\,/~`-=";
//     var checkForSpecialChar = function (string) {
//       for (var j = 0; j < specialChars.length; j++) {
//         if (string.indexOf(specialChars[j]) > -1) {
//           return true;
//         }
//       }
//       return false;
//     };
//     var _validFileExtensions = [
//       ".JPEG",
//       ".JPG",
//       ".PNG",
//       ".DOC",
//       ".DOCX",
//       ".XLS",
//       ".XLSX",
//       ".CSV",
//       ".PDF",
//     ];
//     var ValidateSingleInput = function (string) {
//       for (var j = 0; j < _validFileExtensions.length; j++) {
//         if (string.toUpperCase().indexOf(_validFileExtensions[j]) > -1) {
//           return false;
//         }
//       }
//       return true;
//     };
//     if (this.filecount == 0) {
//       this.multiplefilechanged = true;
//       this.ArrayOfSelectedFile = Array.from(event.target.files);
//       if (this.ArrayOfSelectedFile.length < 11) {
//         for (var t = 0; t < this.ArrayOfSelectedFilename.length; t++) {
//           if (
//             this.ArrayOfSelectedFilename[t] == this.ArrayOfSelectedFile[k].name
//           ) {
//             // this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
//             const dialogConfig = new MatDialogConfig();
//             dialogConfig.data = {
//               message: "Duplicate files are not allowed.",
//               condition: "error",
//               page: "invoicesubmit",
//             };
//             const mydata = dialogConfig.data;
//             console.log("PopupComponent", mydata);

//             const dialogRef = this.dialog.open(PopupComponent, {
//               panelClass: "custom-modalbox",

//               width: "400px",
//               data: { datakey: dialogConfig.data },
//             });
//             dialogRef.afterClosed().subscribe((result) => {
//               console.log(`Dialog result1: ${result}`);
//             });

//             this.filecount = this.filecount - 1;
//             return;
//           }
//         }
//         for (var m = 0; m < this.ArrayOfSelectedFile.length; m++) {
//           if (checkForSpecialChar(this.ArrayOfSelectedFile[m].name)) {
//             const dialogConfig = new MatDialogConfig();
//             dialogConfig.data = {
//               message: "Filename can have spaces but no special characters",
//               condition: "error",
//               page: "invoicesubmit",
//             };
//             const mydata = dialogConfig.data;
//             console.log("PopupComponent", mydata);

//             const dialogRef = this.dialog.open(PopupComponent, {
//               panelClass: "custom-modalbox",

//               width: "400px",
//               data: { datakey: dialogConfig.data },
//             });
//             dialogRef.afterClosed().subscribe((result) => {
//               console.log(`Dialog result1: ${result}`);
//             });

//             // this.filecount -= 1
//             // this.filecount = this.filecount - 1;
//             return;
//           }
//         }
//         for (var m = 0; m < this.ArrayOfSelectedFile.length; m++) {
//           if (
//             ValidateSingleInput(this.ArrayOfSelectedFile[m].name.toUpperCase())
//           ) {
//             const dialogConfig = new MatDialogConfig();
//             dialogConfig.data = {
//               message:
//                 "Only jpeg,jpg,png,doc,docx,xls,xlsx,csv,pdf files are allowed",
//               condition: "error",
//               page: "invoicesubmit",
//             };
//             const mydata = dialogConfig.data;
//             console.log("PopupComponent", mydata);

//             const dialogRef = this.dialog.open(PopupComponent, {
//               panelClass: "custom-modalbox",

//               width: "400px",
//               data: { datakey: dialogConfig.data },
//             });
//             dialogRef.afterClosed().subscribe((result) => {
//               console.log(`Dialog result1: ${result}`);
//             });

//             // this.filecount -= 1
//             // this.filecount = this.filecount - 1;
//             return;
//           }
//         }
//         for (var k = 0; k < this.ArrayOfSelectedFile.length; k++) {
//           debugger;
//           this.ArrayOfSelectedFilename.push(this.ArrayOfSelectedFile[k].name);
//           this.ArrayOfSelectedSavedFile.push(
//             this.BID +
//               +this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) +
//               "_" +
//               this.timestampnow +
//               "." +
//               this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name)
//           );

//           this.multiplactualfilenamearray.push(
//             this.ArrayOfSelectedFile[k].name
//           );
//         }
//         this.filecount = this.ArrayOfSelectedFile.length;
//       } else {
//         this.ArrayOfSelectedFile = [];

//         // this.dialogBox.popUpOpen2('Maximum 10 files allowed.', 'error', 'invoicesubmit');
//         const dialogConfig = new MatDialogConfig();
//         dialogConfig.data = {
//           message: "Maximum 10 files allowed.",
//           condition: "error",
//           page: "invoicesubmit",
//         };
//         const mydata = dialogConfig.data;
//         console.log("PopupComponent", mydata);

//         const dialogRef = this.dialog.open(PopupComponent, {
//           panelClass: "custom-modalbox",

//           width: "400px",
//           data: { datakey: dialogConfig.data },
//         });
//         dialogRef.afterClosed().subscribe((result) => {
//           console.log(`Dialog result1: ${result}`);
//         });
//         return;
//       }
//       console.log("in");
//     } else {
//       const array = event.target.files;
//       console.log("array length" + array.length);
//       this.filecount = this.filecount + array.length;
//       if (this.filecount < 11) {
//         for (let file of array) {
//           this.multiplefilechanged = true;
//           for (var t = 0; t < this.ArrayOfSelectedFilename.length; t++) {
//             if (this.ArrayOfSelectedFilename[t] == file.name) {
//               //   this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
//               const dialogConfig = new MatDialogConfig();
//               dialogConfig.data = {
//                 message: "Duplicate files are not allowed.",
//                 condition: "error",
//                 page: "invoicesubmit",
//               };
//               const mydata = dialogConfig.data;
//               console.log("PopupComponent", mydata);

//               const dialogRef = this.dialog.open(PopupComponent, {
//                 panelClass: "custom-modalbox",

//                 width: "400px",
//                 data: { datakey: dialogConfig.data },
//               });
//               dialogRef.afterClosed().subscribe((result) => {
//                 console.log(`Dialog result1: ${result}`);
//               });

//               // this.filecount -= 1
//               this.filecount = this.filecount - 1;
//               return;
//             }
//           }
//           for (var m = 0; m < this.ArrayOfSelectedFilename.length; m++) {
//             console.log("this.ArrayOfSelectedFilename[m].name", file.name);
//             if (checkForSpecialChar(file.name)) {
//               const dialogConfig = new MatDialogConfig();
//               dialogConfig.data = {
//                 message: "Filename can have spaces but no special characters",
//                 condition: "error",
//                 page: "invoicesubmit",
//               };
//               const mydata = dialogConfig.data;
//               console.log("PopupComponent", mydata);

//               const dialogRef = this.dialog.open(PopupComponent, {
//                 panelClass: "custom-modalbox",

//                 width: "400px",
//                 data: { datakey: dialogConfig.data },
//               });
//               dialogRef.afterClosed().subscribe((result) => {
//                 console.log(`Dialog result1: ${result}`);
//               });

//               // this.filecount -= 1
//               this.filecount = this.filecount - 1;
//               return;
//             } else if (ValidateSingleInput(file.name.toUpperCase())) {
//               const dialogConfig = new MatDialogConfig();
//               dialogConfig.data = {
//                 message:
//                   "Only jpeg,jpg,png,doc,docx,xls,xlsx,csv,pdf files are allowed",
//                 condition: "error",
//                 page: "invoicesubmit",
//               };
//               const mydata = dialogConfig.data;
//               console.log("PopupComponent", mydata);

//               const dialogRef = this.dialog.open(PopupComponent, {
//                 panelClass: "custom-modalbox",

//                 width: "400px",
//                 data: { datakey: dialogConfig.data },
//               });
//               dialogRef.afterClosed().subscribe((result) => {
//                 console.log(`Dialog result1: ${result}`);
//               });

//               // this.filecount -= 1
//               // this.filecount = this.filecount - 1;
//               return;
//             }
//           }
//           if (this.ArrayOfSelectedFile.includes(file) === false) {
//             this.ArrayOfSelectedFile.push(file);
//             this.ArrayOfSelectedFilename.push(file.name);
//             this.ArrayOfSelectedSavedFile.push(
//               this.BID +
//                 +this.getFileNameWOExtention(file.name) +
//                 "_" +
//                 this.timestampnow +
//                 "." +
//                 this.getExtensionOfFile(file.name)
//             );

//             this.multiplactualfilenamearray.push(file.name);
//             this.filecount = this.ArrayOfSelectedFilename.length;
//           } else {
//             console.log("duplicate =================");
//           }
//         }
//       } else {
//         this.filecount = this.filecount - array.length;
//         // this.dialogBox.popUpOpen2('Maximum 10 files allowed.', 'error', 'invoicesubmit');
//         const dialogConfig = new MatDialogConfig();
//         dialogConfig.data = {
//           message: "Maximum 10 files allowed.",
//           condition: "error",
//           page: "invoicesubmit",
//         };
//         const mydata = dialogConfig.data;
//         console.log("PopupComponent", mydata);

//         const dialogRef = this.dialog.open(PopupComponent, {
//           panelClass: "custom-modalbox",

//           width: "400px",
//           data: { datakey: dialogConfig.data },
//         });
//         dialogRef.afterClosed().subscribe((result) => {
//           console.log(`Dialog result1: ${result}`);
//         });
//         return;
//       }
//     }
//     // if (this.ArrayOfSelectedFile.length == 0) {

//     // }
//     // else {

//     // }
//     // this.ArrayOfSelectedFile = Array.from(event.target.files);
//     console.log(this.ArrayOfSelectedFile);
//     console.log("this.filecount >>" + this.filecount);
//     const array = event.target.files;
//     if (array.length != 0) {
//       this.uploadfile();
//     }
//   }

//   uploadfile() {
//     debugger;
//     const formData = new FormData();
//     this.loaderservice.show(); // Show loader while uploading

//     // Loop through each selected file
//     for (let i = 0; i < this.ArrayOfSelectedFile.length; i++) {
//       const fileName =
//         this.BID +
//         +this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) +
//         "_" +
//         this.timestampnow +
//         "." +
//         this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name);

//       console.log("Uploading File: " + fileName);
//       this.ASNfilename = fileName;

//       // Append file to the FormData with the new name
//       formData.append(
//         "files", // This matches what your backend expects ("files")
//         this.ArrayOfSelectedFile[i], // The file itself
//         fileName // The custom file name
//       );
//     }

//     // Append the 'fileType' parameter to the FormData
//     // formData.append('fileType', 'ASN'); // Make sure this matches your backend

//     // Call the service to upload files
//     this.purchaseOrderListService.multiplefileuploadWithASN(formData).subscribe(
//       (res) => {
//         debugger;
//         this.loaderservice.hide(); // Hide loader when done

//         if (res[0].status === "Fail") {
//           this.handleFileUploadFailure(res[0].message);
//         } else {
//           this.handleFileUploadSuccess(res); // Assuming success case
//         }
//       },
//       (error) => {
//         this.loaderservice.hide();
//         console.error("File upload error:", error);
//       }
//     );
//   }

//   // Helper method to handle file upload failure
//   handleFileUploadFailure(message: string) {
//     this.ArrayOfSelectedFilename = [];
//     this.ArrayOfSelectedSavedFile = [];
//     this.ArrayOfSelectedFile = [];

//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.data = {
//       message: message,
//       condition: "error",
//       page: "invoicesubmit",
//     };

//     this.dialog.open(PopupComponent, {
//       panelClass: "custom-modalbox",
//       width: "400px",
//       data: { datakey: dialogConfig.data },
//     });
//   }

//   // Helper method to handle file upload success (can be customized further)
//   handleFileUploadSuccess(response: any) {
//     console.log("Files uploaded successfully:", response);
//     // Implement success behavior here
//   }

//   getFileNameWOExtention(name: string) {
//     return name
//       .substr(0, name.lastIndexOf("."))
//       .replace(/_/g, "-")
//       .replace(/\./g, "-");
//   }

//   getExtensionOfFile(name: string) {
//     return name.split(".").pop();
//   }

//   download(savedfilename, singlepodownload, actualfilename) {
//     debugger;
//     if (
//       savedfilename == "" ||
//       savedfilename == null ||
//       actualfilename == "" ||
//       actualfilename == null ||
//       savedfilename == undefined ||
//       actualfilename == undefined
//     ) {
//       this.loaderservice.hide();
//       // this.dialogBox.popUpOpen2("File not present" ,'success','purchaseorderlist');
//       const dialogConfig = new MatDialogConfig();
//       dialogConfig.data = {
//         message: "File not present",
//         condition: "success",
//         page: "purchaseorderlist",
//       };
//       const mydata = dialogConfig.data;
//       console.log("PopupComponent", mydata);

//       const dialogRef = this.dialog.open(PopupComponent, {
//         panelClass: "custom-modalbox",

//         width: "400px",
//         data: { datakey: dialogConfig.data },
//       });
//       dialogRef.afterClosed().subscribe((result) => {
//         console.log(`Dialog result1: ${result}`);
//       });
//       this.loaderservice.hide();
//       return;
//     }
//     this.loaderservice.show();
//     console.log(savedfilename);
//     this.DecodedFile = [];
//     this.trackOrderListService
//       .getfile2(savedfilename, singlepodownload)
//       .subscribe(
//         (result) => {
//           debugger;
//           console.log(result);
//           console.log("filename===>" + result[0].filename);
//           debugger;
//           this.DecodedFile = result[0].data;
//           if (this.DecodedFile) {
//             var data = this.DecodedFile;
//             const agent = window.navigator.userAgent.toLowerCase();
//             if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//               // IE workaround
//               var byteCharacters = atob(data);
//               var byteNumbers = new Array(byteCharacters.length);
//               for (var i = 0; i < byteCharacters.length; i++) {
//                 byteNumbers[i] = byteCharacters.charCodeAt(i);
//               }
//               var byteArray = new Uint8Array(byteNumbers);
//               var blob = new Blob([byteArray], {
//                 type: "application/octet-stream",
//               });
//               window.navigator.msSaveOrOpenBlob(blob, actualfilename);
//             } else if (agent.indexOf("firefox") > -1) {
//               var byteCharacters = atob(data);
//               var byteNumbers = new Array(byteCharacters.length);
//               for (var i = 0; i < byteCharacters.length; i++) {
//                 byteNumbers[i] = byteCharacters.charCodeAt(i);
//               }
//               var byteArray = new Uint8Array(byteNumbers);
//               var blob = new Blob([byteArray], {
//                 type: "application/octet-stream",
//               });
//               saveAs(blob, actualfilename);
//             } else {
//               console.log(data, "data");
//               let FileToDownload =
//                 "data:application/octet-stream;base64," + data;
//               var link = document.createElement("a");
//               const filename = actualfilename;
//               link.href = FileToDownload;
//               link.download = filename;
//               // link.click();
//               var extensionName = filename.substr(
//                 filename.lastIndexOf(".") + 1
//               );
//               this.getFileType(extensionName);
//               this.trackOrderListService.downloadEncryptedFile(
//                 data,
//                 this.extensionType
//               );
//             }
//             this.loaderservice.hide();
//           } else if (result[0].reason != "none") {
//             // this.dialogBox.popUpOpen2(result[0].reason ,'success','purchaseorderlist');
//             const dialogConfig = new MatDialogConfig();
//             dialogConfig.data = {
//               message: result[0].reason,
//               condition: "success",
//               page: "purchaseorderlist",
//             };
//             const mydata = dialogConfig.data;
//             console.log("PopupComponent", mydata);

//             const dialogRef = this.dialog.open(PopupComponent, {
//               panelClass: "custom-modalbox",

//               width: "400px",
//               data: { datakey: dialogConfig.data },
//             });
//             dialogRef.afterClosed().subscribe((result) => {
//               console.log(`Dialog result1: ${result}`);
//             });
//           }
//           // else if (result[0].status == "Fail") {
//           // 	this.dialogBox.popUpOpen2(result[0].message ,'success','purchaseorderlist');
//           // }
//         },
//         (err) => {
//           this.loaderservice.hide();
//           console.log(JSON.stringify(err));
//         }
//       );
//   }
//   getFileType(extensionName) {
//     console.log("extensionName" + extensionName);
//     if (
//       extensionName.toLowerCase() === "jpg" ||
//       extensionName.toLowerCase() === "png" ||
//       extensionName.toLowerCase() === "jpeg"
//     ) {
//       this.extensionType = "image/" + extensionName;
//     } else if (extensionName.toLowerCase() === "pdf") {
//       this.extensionType = "application/pdf";
//     } else if (extensionName.toLowerCase() === "doc") {
//       this.extensionType = "application/msword";
//     } else if (extensionName.toLowerCase() === "docx") {
//       this.extensionType = "application/msword";
//     } else if (extensionName.toLowerCase() === "xls") {
//       this.extensionType = "application/vnd.ms-excel";
//     } else if (extensionName.toLowerCase() === "xlsx") {
//       this.extensionType =
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//     } else if (extensionName.toLowerCase() === "csv") {
//       this.extensionType = "text/csv";
//     }
//   }
//   close(index: number): void {
//     this.viewAttachmentNames[index] = ""; // Clear the file name for the specific row
//   }
// //   addRow(poitem: any, index: number) {
// //     debugger;
// //     const newItem = {
// //       ...poitem,
// //       isAdded: true, // Mark this new row as "added"
// //       inputQuantity: 0, // Reset quantity field
// //       awbCarrier: "",
// //       deliveryDate: "",
// //       location: this.selectedLocation,
// //     };
    
// //     // Add new form controls for the new row
// //     const newIndex = index + 1; // Calculate new index for the next row
// //     const orderControlName = "orderValue" + newIndex;
// //     const calRealtimeControlName = "calRealtime" + newIndex;
// //     const advCityControlName = "advCity" + newIndex;
// //     const advDateFormatControlName = "advDateFormat" + newIndex;

// //     // Add new controls to the form
// //     this.invoiceForm.addControl(orderControlName, new FormControl(""));
// //     this.invoiceForm.addControl(calRealtimeControlName, new FormControl(""));
// //     this.invoiceForm.addControl(advCityControlName, new FormControl(this.selectedLocation || ""));
// //     this.invoiceForm.addControl(advDateFormatControlName, new FormControl(""));

// //     // Insert the new item into the list
// //     this.uniquelineitems.splice(newIndex, 0, newItem);

// //     // Reindex form controls to ensure consistency after adding
// //     debugger
// //     this.reIndexFormControls();

// //     console.log("New Item Added:", newItem);
// //     console.log("Updated Form Group After Add:", this.invoiceForm.controls);

// //     // Trigger change detection
// //     this.cd.detectChanges();
// // }


  
  
//   // removeRow(index: number) {
//   //   debugger;
  
//   //   // Remove the form controls for the current row
//   //   const controlName = 'orderValue' + index;
//   //   const calRealtimeControlName = 'calRealtime' + index;
//   //   const advCityControlName = 'advCity' + index;
//   //   const advDateFormatControlName = 'advDateFormat' + index;
  
//   //   // Remove the controls from the form group
//   //   if (this.invoiceForm.contains(controlName)) {
//   //     this.invoiceForm.removeControl(controlName);
//   //   }
//   //   if (this.invoiceForm.contains(calRealtimeControlName)) {
//   //     this.invoiceForm.removeControl(calRealtimeControlName);
//   //   }
//   //   if (this.invoiceForm.contains(advCityControlName)) {
//   //     this.invoiceForm.removeControl(advCityControlName);
//   //   }
//   //   if (this.invoiceForm.contains(advDateFormatControlName)) {
//   //     this.invoiceForm.removeControl(advDateFormatControlName);
//   //   }
  
//   //   // Remove the item from the `uniquelineitems` array
//   //   this.uniquelineitems.splice(index, 1);
  
//   //   // Reindex the form controls to reflect the new order
//   //   this.reIndexFormControls();
  
//   //   console.log("Updated Form Group After Remove:", this.invoiceForm.controls);
  
//   //   // Trigger change detection to update the view
//   //   this.cd.detectChanges();
//   // }
//   addRow(poitem: any, index: number) {
//     debugger;
//     const newItem = {
//         ...poitem,
//         isAdded: true,
//         inputQuantity: 0,
//         awbCarrier: "",
//         deliveryDate: "",
//         location: this.selectedLocation,
//     };

//     const newIndex = index + 1;
//     const orderControlName = "orderValue" + newIndex;
//     const calRealtimeControlName = "calRealtime" + newIndex;
//     const advCityControlName = "advCity" + newIndex;
//     const advDateFormatControlName = "advDateFormat" + newIndex;

//     this.invoiceForm.addControl(orderControlName, new FormControl("", Validators.required));
//     this.invoiceForm.addControl(calRealtimeControlName, new FormControl(""));
//     this.invoiceForm.addControl(advCityControlName, new FormControl(this.selectedLocation || "", Validators.required));
//     this.invoiceForm.addControl(advDateFormatControlName, new FormControl(""));

//     this.uniquelineitems.splice(newIndex, 0, newItem);

//     this.reIndexFormControls();
//     console.log("New Item Added:", newItem);
//     debugger
//     console.log("Updated Form Group After Add:", this.invoiceForm.controls);
//     this.cd.detectChanges();
//     this.invoiceForm.updateValueAndValidity();


// }

// removeRow(index: number) {
//   debugger  
//     const controlName = 'orderValue' + index;
//     const calRealtimeControlName = 'calRealtime' + index;
//     const advCityControlName = 'advCity' + index;
//     const advDateFormatControlName = 'advDateFormat' + index;

//     this.invoiceForm.removeControl(controlName);
//     this.invoiceForm.removeControl(calRealtimeControlName);
//     this.invoiceForm.removeControl(advCityControlName);
//     this.invoiceForm.removeControl(advDateFormatControlName);

//     this.uniquelineitems.splice(index, 1);

//     this.reIndexFormControls();
//     console.log("Updated Form Group After Remove:", this.invoiceForm.controls);
//     this.cd.detectChanges();
//     this.invoiceForm.updateValueAndValidity();

// }

  

//   reIndexFormControls() {
//     debugger;

//     const controls = this.invoiceForm.controls;
//     const controlNames = Object.keys(controls);

//     // Loop through the current controls and remove those that are not needed anymore
//     controlNames.forEach(controlName => {
//         const indexMatch = controlName.match(/\d+/);
//         const index = indexMatch ? parseInt(indexMatch[0]) : null;

//         if (index !== null && index >= this.uniquelineitems.length) {
//             this.invoiceForm.removeControl(controlName);
//         }
//     });

//     // Now add or update controls for each item
//     this.uniquelineitems.forEach((item, index) => {
//         const orderControlName = 'orderValue' + index;
//         const calRealtimeControlName = 'calRealtime' + index;
//         const advCityControlName = 'advCity' + index;
//         const advDateFormatControlName = 'advDateFormat' + index;

//         // Add or update form controls
//         this.invoiceForm.setControl(orderControlName, this.fb.control(item.inputQuantity || '', Validators.required));
//         this.invoiceForm.setControl(calRealtimeControlName, this.fb.control(''));
//         this.invoiceForm.setControl(advCityControlName, this.fb.control(item.location || '', Validators.required));
//         this.invoiceForm.setControl(advDateFormatControlName, this.fb.control(item.advDateFormat || ''));
//     });
//     console.log("Updated Form Group After Remove:", this.invoiceForm.controls);

//     this.invoiceForm.updateValueAndValidity();
//     this.cd.detectChanges();
// }
 
//   onLocationSelect(event: any) {
//     this.selectedLocation = event.target.value;  // Get the selected location value
//   } 
// }




// <div class="main-content my-4">
//     <div class="container dashboardpt" style="padding: 0 !important;">
//         <div class="submitTopHeader">
//             <img src="./assets/img/left-arrow-button.png" style="cursor: pointer;" alt="" [routerLink]="['/purchaseOrdersList']">
//             <div class="submitTopHeaderText">PO No : {{ponumber}} - Advance Shipping Notification</div>
//         </div>

      
//             <div class="col-md-12" style="padding: 0 !important;">
//                 <div class="mainInvoiceTable" style="margin-top: 20px !important;">
//                     <div class="tableTopHeader">
//                         <div class="tableTopHeaderTitle">Item List</div>
//                         <div class="submitRadioButtons" (change)="checkItem($event)">
//                             <div style="margin-right: 34px;">
//                                 <input type="radio" id="asnItem" value="Item" name="itrfield" checked=""/>
//                                 <label for="asnItem" class="inv-wrapper active">Item</label>
//                             </div>
//                             <div style="margin-right: 34px;">
//                                 <input type="radio" id="asnHistory" value="History" name="itrfield" />
//                                 <label for="asnHistory" class="inv-wrapper">History</label>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="mainTable">
//                         <table class="table">
//                                 <thead class="invoiceTableHead">
//                                     <th scope="col" class="text-left invoiceTableHeading">
//                                         <div style="padding: 8px 0;">
//                                           Split Quantity
//                                         </div>
//                                       </th>
//                                     <th scope="col" class=" text-left invoiceTableHeading">
//                                         <div style="padding: 8px 0;">
//                                             Items
//                                         </div>
//                                     </th>
//                                     <th scope="col" class="text-left invoiceTableHeading">
//                                         <div style="padding: 8px 0;">
//                                             Bal Qty / PO Qty
//                                         </div>
//                                     </th>
//                                     <th scope="col" class="text-left invoiceTableHeading">
//                                         <div style="padding: 8px 0;">
//                                             Quantity
//                                         </div>
//                                     </th>
//                                     <th scope="col" class="text-left invoiceTableHeading">
//                                         <div style="padding: 8px 0;">
//                                             AWB / Carrier
//                                         </div>
//                                     </th>
//                                     <th scope="col" style="min-width: 40px;" class="text-left invoiceTableHeading">
//                                         <div style="padding: 8px 0;">
//                                             Delivery Date
//                                         </div>
//                                     </th>
//                                     <th scope="col" class="text-left invoiceTableHeading">
//                                         <div style="padding: 8px 0;">
//                                             Location
//                                         </div>
//                                     </th>
//                                     <th *ngIf="asnHistoryData && showAsnHistory" scope="col" class="text-left invoiceTableHeading">
//                                         <div style="padding: 8px 0;">
//                                          Attach AWB / Carrier 
//                                         </div>
//                                     </th>
//                                         <th *ngIf="asnHistoryData && showAsnHistory" scope="col" class="text-left invoiceTableHeading">
//                                         <div style="padding: 8px 0;">
//                                             Action
//                                         </div>
//                                     </th>    
//                                 </thead>
                                
//                                 <tbody *ngIf="uniquelineitems && showAsnItem">
//                                     <tr *ngFor="let poitem of uniquelineitems; let i=index">
//                                         <td>
//                                             <div class="text-left tableBodyText">
//                                               <!-- Render + button for all rows -->
//                                               <button *ngIf="!poitem.isAdded"type="button" class="btn btn-primary" (click)="addRow(poitem, i)">
//                                                 +
//                                               </button>
//                                               <!-- Render - button only for newly added rows -->
//                                               <button *ngIf="poitem.isAdded" type="button" class="btn btn-danger" (click)="removeRow(i)">
//                                                 -
//                                               </button>
//                                             </div>
//                                           </td>
                                          
//                                         <td>
//                                             <div>
//                                                 <a style="cursor: pointer; margin-left: 16px; color: var(--Bg-Primary);
//                                                     font-size: 16px;
//                                                     font-weight: 600;">
//                                                     {{poitem.LINEITEMNUMBER}} - {{poitem.LINEITEMTEXT}}
//                                                 </a>
//                                             </div>
//                                         </td>

//                                         <td>
//                                             <div class="text-left tableBodyText">
//                                                 {{poitem.BALANCE_QTY | number:'1.3-3'}}/{{poitem.QUANTITY | number:'1.3-3'}}
//                                             </div>
//                                         </td>

//                                         <td *ngIf="part && TypeNo != 'reopen'">
//                                             <div class="text-left tableBodyText">
//                                               <input type="text" class="tableInputBox" 
                                                
//                                                 maxlength="10" 
//                                                 autocomplete="off"
//                                                 id="inputQty{{i}}"
//                                                 [formControlName]="'orderValue' + i"
//            (input)="checkBalanceQty($event, poitem.BALANCE_QTY, i); calculate(i, poitem.RATEPERQTY)"
//                                                 [readOnly]="poitem.FORECLOSESTATUSCHECK == 'X'"
//                                                 valThreeDecimal
//                                               >
//                                               <p class="exceededMsg" id="exceeded{{i}}" style="display: none;">
//                                                 Delivery Quantity exceeded.
//                                               </p>
//                                             </div>
//                                           </td>
                                          

//                                         <td *ngIf="TypeNo == 'reopen'">
//                                             <div class="text-left tableBodyText">
//                                                 <input type="text" class="tableInputBox" 
//                                                 placeholder="0"
//                                                 value="0" disabled readonly
//                                                 maxlength="10" 
//                                                 id="inputQty{{i}}"
//                                                 autocomplete="off"
//                                                 formControlName="orderValue{{i}}"
//                                                 (input)="checkBalanceQty($event, poitem.BALANCE_QTY,i) ; calculate(i,poitem.RATEPERQTY);calculateTax()"
//                                                 [readOnly]="poitem.FORECLOSESTATUSCHECK == 'X'"
//                                                 valThreeDecimal>

//                                                 <p class="exceededMsg" id="exceeded{{i}}"
//                                                     style="display: none;">
//                                                     Delivery Quantity exceeded.
//                                                 </p>
//                                             </div>
//                                         </td>

//                                         <td>
//                                             <div class="text-left tableBodyText">
//                                                 <input type="text" class="tableInputBox"
//                                                 maxlength="40" 
//                                                 id="asnNumber{{i}}"
//                                                 (keypress)="keyPressAlphanumeric($event)"
//                                                 [(ngModel)]="asnNumber[i]"
//                                                 autocomplete="off"
//                                                 >
//                                             </div>
//                                         </td>

//                                         <td>
//                                             <div class="text-left tableBodyText">
//                                                 <mat-form-field appearance="none">
//                                                     <input placeholder="Select Date" matInput [matDatepicker]="picker" [(ngModel)]="advDateFormat[i]" id="advDateFormat{{i}}"
//                                                         class="submitInputBox" autocomplete="off" readonly>
//                                                     <mat-datepicker-toggle matSuffix [for]="picker">
//                                                     </mat-datepicker-toggle>
//                                                     <mat-datepicker #picker></mat-datepicker>
//                                                 </mat-form-field>
//                                             </div>
//                                         </td>
                                        

//                                         <td>
//                                             <div *ngIf="cityLocation" class="text-left tableBodyText">
//                                               <div class="formOptions">
//                                                 <select class="form-control form-select formSelect" id="advCity{{i}}"(change)="onCityChange(citySelect.value, i)" aria-label="Default select example">
//                                                   <option selected disabled value="">Select City</option>
//                                                   <option *ngFor="let city of cityLocation[0]?.locationlist" [value]="city[0]">
//                                                     {{city[1]}}
//                                                   </option>
//                                                 </select>
//                                               </div>
//                                             </div>
//                                           </td>
                                          
                                          
                                          
//                                     </tr>
                                    
                                    
//                                 </tbody>
//                                 <tbody *ngIf="asnHistoryData && showAsnHistory">
//                                     <tr *ngFor="let poitem of asnHistoryData; let i=index">
//                                         <td>
//                                             <div>
//                                                 <a style="cursor: pointer; margin-left: 16px; color: var(--Bg-Primary);
//                                                     font-size: 16px;
//                                                     font-weight: 600;">
//                                                     {{poitem.LINEITEMNUMBER}} - {{poitem.LINEITEMTEXT}}
//                                                 </a>
//                                             </div>
//                                         </td>

//                                         <td>
//                                             <div class="text-left tableBodyText">
//                                                 {{poitem.BALANCEQTY | number:'1.3-3'}}
//                                             </div>
//                                         </td>

//                                         <td>
//                                             <div class="text-left tableBodyText">
//                                                 {{poitem.ASNQUANTITY | number:'1.3-3'}}
//                                             </div>
//                                         </td>

//                                         <td>
//                                             <div *ngIf="editingIndex !== i" class="text-left tableBodyText">
//                                                 {{poitem.ASNNUMBER}}
//                                               </div>
                                        
//                                               <div *ngIf="editingIndex === i" class="text-left tableBodyText">
//                                                 <input type="text" class="tableInputBox"
//                                                   maxlength="40"
//                                                   id="asnNumberHistory{{i}}"
//                                                   [placeholder]="poitem.ASNNUMBER ? poitem.ASNNUMBER : 'Enter ASN Number'"
//                                                   (keypress)="keyPressAlphanumeric($event)"
//                                                   [(ngModel)]="asnNumberHistory[i]"
//                                                   autocomplete="off">
//                                               </div>

//                                               <div *ngIf="validationMessage && editingIndex === i" class="exceededMsg">
//                                                 {{ validationMessage }}
//                                               </div>
//                                         </td>

//                                         <td>
//                                             <div class="text-left tableBodyText">
//                                                 {{poitem.ASNDATE}}
//                                             </div>
//                                         </td>

//                                         <td>
//                                             <div class="text-left tableBodyText">
//                                                 {{poitem.LOCATIONNAME}}
//                                             </div>
//                                         </td>
//                                         <td>
//                                             <div *ngIf="!poitem.ASNSUPPORTINGDOCNAME" class="text-left tableBodyText">
//                                               <label for="input-file{{i}}" class="file-input submitUploadCardContent">
//                                                 <div style="display: flex; gap: 10px;">
//                                                   <img src="./assets/img/cloud-upload.png" class="submitUploadImage" />
//                                                 </div>
//                                               </label>
//                                               <input type="file" id="input-file{{i}}" class="d-none" multiple (change)="onFileChanged($event, i)"
//                                               [disabled]="poitem.ASNNUMBER"
//                                               (click)="value = null">
//                                             </div>
                                      
//                                             <!-- Uploaded file name for the current row -->
//                                             <div class="uploadedFiles" *ngIf="viewAttachmentNames[i]">
//                                               <div class="uploadedFiles__name">{{ viewAttachmentNames[i] }}</div>
//                                               <div class="fileCrossIcon">
//                                                 <i class="fa fa-close fileCrossIcon" aria-hidden="true" (click)="close(i)"></i>
//                                               </div>
//                                             </div>
                                      
//                                             <!-- Show the attached document if ASNSUPPORTINGDOCNAME has a value -->
//                                             <div *ngIf="poitem.ASNSUPPORTINGDOCNAME" class="text-left tableBodyText" style="cursor: pointer;">
//                                               <p (click)="download(poitem.ASNSUPPORTINGDOCNAME, 'singlepodownload', poitem.ASNSUPPORTINGDOCNAME)">
//                                                 {{ poitem.ASNSUPPORTINGDOCNAME }}
//                                               </p>
//                                             </div>
//                                           </td>
//                                         <td>
//                                             <div class="text-left tableBodyText">
//                                                 <button (click)="editAsnNumber(i)" class="btn submitButton" [disabled]="poitem.ASNNUMBER">{{ editingIndex === i ? 'Submit' : 'Shipping Details' }}</button>
//                                             </div>
//                                         </td>
                                    
                                       
                                          
//                                     </tr>
//                                 </tbody>
                                
//                         </table>
//                         <div *ngIf="asnHistoryData?.length <= 0 && showAsnHistory"
//                                 style="color: #777; font-size: 18px; font-weight: 600; text-align: center;" class="my-4">
//                                 <p>No Data Found</p>
//                         </div>
//                         <div *ngIf="uniquelineitems?.length <= 0 && showAsnItem"
//                                 style="color: #777; font-size: 18px; font-weight: 600; text-align: center;" class="my-4">
//                                 <p>No Data Found</p>
//                         </div>
//                     </div>

//                     <div class="w-100 text-center" *ngIf="showAsnItem">
//                         <button type="submit" [disabled]="exceededSubmitDisable" class="btn submitButton submitButtonCustom" (click)="advSubmit()">
//                             Shipping Details
//                         </button>
//                     </div>

//                     <!-- <div class="w-100 text-right" *ngIf="TypeNo !='reopen'">
//                         <button type="submit" class="btn submitButton"
//                             (click)="newsubmitinvoice()"
//                             [disabled]="invoiceForm.invalid || disable? true : null || overallAmount == 0">
//                             Submit
//                         </button>
//                     </div>

//                     <div class="w-100 text-right" *ngIf="TypeNo =='reopen'">
//                         <button type="submit" class="btn submitButton"
//                             (click)="submitreopen()"
//                             [disabled]="invoiceForm.invalid || disable? true : null || overallAmount == 0">
//                             Submit
//                         </button>
//                     </div> -->
//                 </div>
//             </div>

//     </div>
// </div>


// <app-dialog-model></app-dialog-model>
// let totalAsnQuantity = 0;
// let totalBalanceQTY = 0;

// // Use a Set to track processed line item numbers
// const processedLineItems = new Set<string>();

// // Loop through each element in invoicesubmissionarray
// this.invoicesubmissionarray.forEach((item) => {
//   // Ensure asnQuantity is numeric before summing
//   totalAsnQuantity += parseFloat(item.asnQuantity || 0);

//   // Check if the lineItemNumber has been processed
//   const lineItemNumber = item.lineItemNumber;
//   if (!processedLineItems.has(lineItemNumber)) {
//     // Add the balance quantity to the total for unique lineItemNumber
//     totalBalanceQTY += parseFloat(item.balancQTY || 0);

//     // Mark this lineItemNumber as processed
//     processedLineItems.add(lineItemNumber);
//   }
// });
// console.log("Total ASN Quantity:", totalAsnQuantity);
// console.log("Total Unique Balance QTY based on unique lineItemNumber:", totalBalanceQTY);
// if(totalAsnQuantity != totalBalanceQTY){
//   debugger
//   const dialogConfig = new MatDialogConfig();
//   this.loaderservice.hide();
//       dialogConfig.data = {
//         message: "qunatity should be equal to balance qty",
//         condition: "error",
//         page: "advanceShipping",
//         specific: "note",
//       };
//       const mydata = dialogConfig.data;
//       console.log("PopupComponent", mydata);

//       const dialogRef = this.dialog.open(PopupComponent, {
//         panelClass: "custom-modalbox",

//         width: "400px",
//         data: { datakey: dialogConfig.data },
//       });
//       dialogRef.afterClosed().subscribe((result) => {
//         console.log(`Dialog result1: ${result}`);
//       });
//       this.error = true;
  
// }else{
//   if (
//     this.invoicesubmissionarray.length > 0 &&
//     this.invoicesubmissionarray.length >= advCityCount - 1
//   ) {
//     debugger;
//     this.invoicesubmissionarray.forEach((val) => {
//       if (val.asnDate && val.asnLocation) {
//         this.asnRowCount = this.asnRowCount + 1;
//       } else {
//         this.asnRowCount = this.asnRowCount - 1;
//       }
//     });

//     if (this.invoicesubmissionarray.length == this.asnRowCount) {
//       debugger;
//       this.purchaseOrderListService
//         .setAsnDetails(this.invoicesubmissionarray)
//         .subscribe((res) => {
//           if (res[0].message == "Success") {
//             debugger;
//             this.loaderservice.hide();
//             this.invoicesubmissionarray =  [];
//             const dialogConfig = new MatDialogConfig();
//             dialogConfig.data = {
//               message: "Delivery schedule has been submitted successfully.",
//               condition: "success",
//               page: "advanceShipping",
//             };

//             const mydata = dialogConfig.data;
//             console.log("PopupComponent", mydata);

//             const dialogRef = this.dialog.open(PopupComponent, {
//               panelClass: "custom-modalbox",

//               width: "400px",
//               data: { datakey: dialogConfig.data },
//             });
//             dialogRef.afterClosed().subscribe((result) => {
//               console.log(`Dialog result1: ${result}`);
//               // this.router.navigate(['/purchaseOrdersList']);
//               this.showAsnHistory = true;
//               this.showAsnItem = false;
//               $("#asnHistory").click();
//             });
//           } else {
//             this.loaderservice.hide();
//             const dialogConfig = new MatDialogConfig();
//             dialogConfig.data = {
//               message: res[0]?.Uniquemessage,
//               condition: "error",
//               page: "advanceShipping",
//               specific: "note",
//             };
//             const mydata = dialogConfig.data;
//             console.log("PopupComponent", mydata);

//             const dialogRef = this.dialog.open(PopupComponent, {
//               panelClass: "custom-modalbox",

//               width: "400px",
//               data: { datakey: dialogConfig.data },
//             });
//             dialogRef.afterClosed().subscribe((result) => {
//               console.log(`Dialog result1: ${result}`);
//             });
//             this.successmessage = res[0]?.Uniquemessage;
//             this.error = true;
//           }
//           this.loaderservice.hide();
//         });
//     } else {
//       debugger;
//       this.loaderservice.hide();
//       const dialogConfig = new MatDialogConfig();
//       dialogConfig.data = {
//         message: "Please fill remaining fields",
//         condition: "error",
//         page: "advanceShipping",
//         specific: "note",
//       };
//       const mydata = dialogConfig.data;
//       console.log("PopupComponent", mydata);

//       const dialogRef = this.dialog.open(PopupComponent, {
//         panelClass: "custom-modalbox",

//         width: "400px",
//         data: { datakey: dialogConfig.data },
//       });
//       dialogRef.afterClosed().subscribe((result) => {
//         console.log(`Dialog result1: ${result}`);
//       });
//       this.error = true;
//     }
//   } else {
//     debugger;
//     this.loaderservice.hide();
//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.data = {
//       message: "Please fill remaining fields",
//       condition: "error",
//       page: "advanceShipping",
//       specific: "note",
//     };
//     const mydata = dialogConfig.data;
//     console.log("PopupComponent", mydata);

//     const dialogRef = this.dialog.open(PopupComponent, {
//       panelClass: "custom-modalbox",

//       width: "400px",
//       data: { datakey: dialogConfig.data },
//     });
//     dialogRef.afterClosed().subscribe((result) => {
//       console.log(`Dialog result1: ${result}`);
//     });
//     this.error = true;
//   }
// }
// }      