import { Component, OnInit, ViewChild } from '@angular/core';
import { createDeliveryModel, LineItemOrderModel } from './../../../models/createdelivery.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from 'app/models/delivery';
import * as moment from 'moment/moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { CurrencyPipe } from '@angular/common';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
declare var $: any;
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../../commoncomponents/popup/popup.component';
import { debuglog } from 'util';
import { Console, log } from 'console';
import { customDelivery } from 'app/models/customDelivery.model';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { InternalportalserviceService } from 'app/services/internalportal/internalportalservice.service'
import { sum } from 'chartist';
import { newArray } from '@angular/compiler/src/util';



@Component({

  selector: 'app-invoice-simpo',
  templateUrl: './invoice-simpo-new.component.html',
  styleUrls: ['./invoice-simpo.component.css']
})
export class InvoiceSimpoComponent implements OnInit {
  [x: string]: any;
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  myForm: FormGroup;
  disabled: false;
  showFilter: false;
  // limitSelection:false;
  posimponewList: any = [];
  dropdownList = [];
  podropdownList: any = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings
  Lineitem: any = [];
  valueininr: any = [];
  invoice: boolean = true;
  poDetail: any = [];
  list: any[];
  arr3: any[];
 dcnlistSimpo:any =[];

  tempponpo: any = [];
  multiponumber: any = [];
  multiPOFinalList: any = [];
  multiPOList: any = [];
  mpodata: string;
  ponumber: string = sessionStorage.getItem("poNumber");
  selectedpo: any = [];
  uniquelineitems: any = [];
  uniqueObj: any = [];
  simpleuniquelineitems: any = [];
  result: any = [];
  templist: any = [];
  isQuantityEdited: boolean = false;
  toinvoiceuniquelineitems: any = [{
    'GRNMAPPNUMBER': '', 'TOINVOICELINEITEMNUMBER': '', 'TOINVOICELINEITEMTEXT': '',
    'LINEITEMNUMBER': '', 'BALANCE_QTY': '', 'TOINVOICEMATERIAL': '', 'QUANTITY': '', 'TOINVOICEUNITOFMEASURE': '',
    'TOINVOICECONTACTPERSONPHONE': '', 'TOINVOICECOMPANY': '', 'TOINVOICEPLANT': '', 'TOINVOICEDEPARTMENT': '',
    'TOINVOICESTORAGELOCATION': '', 'TOINVOICECOSTCENTRE': '', 'TOINVOICECATEGORY': '', 'SERVICENUMBER': '',
    'DCNUMBER': '', 'GRNQTY': '', 'INVAMOUNT': '', 'SAPUNIQUEREFERENCENO': '', 'SAPLINEITEMNO': '', 'SRCNUMBER': '',
    'TOTALAMOUNT': '', 'TOINVOICERATEPERQTY': ''
  }];
  uniquenewlineitems: any = [];
  orderlineitems: any = [];
  uniquelineitem: any = [];
  orderlistoflineitem: any[];
  lineitemnumber: any = [];
  lineitemnumberset: any = [];
  TotalItemAmount: any;
  calculatedAmount: any = 0;
  editing: boolean = false;
  // invoicesubmissionarray: Array<Delivery> = [];//
  invoicesubmissionarray: Array<customDelivery> = [];
  invoicesubmissionarraytobe: Array<customDelivery> = [];
  vendorid: any;
  irndetail: boolean = false;
  showerror: boolean = false;
  contactpersonemailid: any;
  finalAmount: number;
  viewUploadFile: any = null;
  invoiceconfile: string;
  viewAttachmentName: string = "";
  submitbutton: string = "";
  successmessage: string;
  success: boolean = false;
  error: boolean = false;
  AttachmentValidExtension: string[] = ["PDF"];
  ArrayOfSelectedFile: any[] = [];
  InvalidAttachmentFileError =
    "Selected file is having Invalid extension. Valid file extensions are pdf, jpg & jpeg.";

  delivery = new Delivery();
  fileAttachmentError: string = "";

  createDeliverymodel = new createDeliveryModel();
  createDeliveryModel: createDeliveryModel[];
  public invoiceForm = new FormGroup({
    irnNo: new FormControl(''),
    irnDate: new FormControl(''),
    billofladingdate: new FormControl(''),
    invoiceNo: new FormControl('', Validators.required),
    invoiceDate: new FormControl('', Validators.required),
    taxAmount: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),   //new 15 feb
    balanceqty: new FormControl(''),
    orderqty: new FormControl(''),
    description: new FormControl('', Validators.required),
    attachments: new FormControl('', Validators.required),
    TotalinctaxAmount: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    remarks: new FormControl('', Validators.required),
    overallAmount: new FormControl(0),
    totalOrderQty: new FormControl(0),
    endUser : new FormControl('', Validators.pattern('^[a-z0-9](\.?[a-z0-9]){0,}@timesgroup\.com$'))
    // overallsimpoAmount: new FormControl(0),
    // totalsimpoOrderQty: new FormControl(0)

  })
  errormessage: string
  disable: boolean = false;
  balQtyList: any = [];
  deliveryList: any = [];
  maxdate: Date;
  podate: string;
  mindate: Date;
  errorqty: number;
  rawinvoicenumber: string;
  rawinvoicedate: string;
  invoicealreadypresent: boolean = false;
  showSingleDelivery: boolean = false;
  temprawinvoicenumber: string;
  actualfilename: any;
  savedfilename: string;
  value: string = "Invoice";
  orderitem: string;
  orderqty: string;
  showSingleSubmit: boolean = false;
  showMultipleSubmit: boolean = false;
  TypeNo: string;
  poType: string;
  plantType: string;
  actualfilename1: any;
  savedfilename1: string;
  multiplactualfilenamearray: any = [];
  multiplsavedfilenamearray: any = [];
  withoutpodetails: any = [];
  actualfilenameofwopo: string;
  savedfilenameofwopo: string;
  invoicefilechanged: boolean = false;
  multiplefilechanged: boolean = false;
  ArrayOfSelectedFiles: any = [];
  individualsavedname: any = [];
  ArrayOfSelectedFilename: any = [];
  filecount: number = 0;
  ArrayOfSelectedSavedFile: any = [];
  individualsavedname1: any = [];
  timestampnow = Date.now().toString();
  freshinvoice: boolean = true;
  part: boolean = false;
  full: boolean = true;
  totalBalQty: number = 0;
  overallAmount: any = 0;
  overallAmount1: any = 0;
  inputBalanceQuantity: any = 0;
  fullpodate: any = sessionStorage.getItem("fullpoDate");
  lineitemnumberlist: any = [];
  quantitylist: any = [];
  multiquantitylist: any = [];
  balanceExceeded: boolean = false;
  zeropresent: boolean = false;
  issubmitcheck: boolean = false;
  tobeinvoicelist: any = [];
  grninvoicepresent: boolean = false;
  grntobeinvoicelist: any = [];
  grnuniquelineitems: any = [];
  grnnumber: string;
  invoicedata: any = [];
  simpoinvoicedata: any = [];
  poNo: any;
  invNo: any;
  DecodedFile: any;
  resubmit: boolean = false;
  savedfilenameofresubmit: any;
  individualsavednameofresubmit: any = [];
  individualmultipleactualnameofresubmit: any[];
  individualmultiplesavednameofresubmit: any[];
  actualfilenameofresubmit: any;
  actualsavedfilenameofwopo: any;
  actualresubmitfilename: any;
  savedresubmitfilename: any;
  suppindividualactualname: any[];
  checkedList: any = [];

  suppindividualsavedname: any;
  fileupload: string;
  negativeFlag: boolean = false;
  irnNumber: any;
  tobeinvoiced: boolean = false;
  tobelineitems: any;
  ponumbers: any = [];
  backButtonValue: string;
  remainingLinewItems: any = [];
  nullDCN: any = [];
  simpoSelectedPo: any = [];
  finalSimpoItems: any = [];
  http: any;
  selectedDropdownPO: any = [];
  limitSelection = false;
  calculatedAmountsimpo: number;
  overallAmountsimpo: number;
  inputBalanceQuantitysimpo: number;

  customDelivery = new customDelivery();
  simpoinvoicesubmissionarray: Array<customDelivery> = [];
  simpouniquelineitems = [];
  dcNumberList = [];
  finalInvoiceList: any = [];
  nullDcList = [];
  nullQuantityList: any = [];
  multipleactualfilename: string;
  multiplesavedfilename: string;
  showAddPoButton: boolean = true;
  reopen: boolean = false;
  finalTotalAmount: any;
  finalTotalAmountdisplay = 0;
  poSimpoUniquelineitem = [];
  simpoDropDownPoList = [];
  descripionlength: number = 160;
  remarklength: number = 160;
  oldirndate: string | number | Date;
  newdata: string | number | Date;
  acclists: number;
  previnvdt: Date;


  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private loaderservice: LoaderService, private activatedRoute: ActivatedRoute, private purchaseOrderListService: PurchaseOrderListService, private cp: CurrencyPipe, public dialog: MatDialog,
    private trackOrderListService: TrackOrderListService, private internalportalservice: InternalportalserviceService) {
    this.list = []
  }

  ngOnInit(): void {
    // debugger
    this.maxdate = new Date();
    this.finalTotalAmount = 0;
    this.selectedpo.push(this.ponumber)
    this.dropdownSettings = {

      singleSelection: false,
      idField: 'PO_NUMBER',
      textField: 'PO_NUMBER',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 25,
      allowSearchFilter: true,

    };

    this.route.queryParams.subscribe(params => {
      this.TypeNo = atob(params.type);
      this.vendorid = atob(params.vd);

      if (this.TypeNo != 'resubmit' && this.TypeNo != 'reopen') {
        this.poType = atob(params.poType);
        this.plantType = atob(params.planttype);
      }
      console.log(this.TypeNo, 'typeNo')
      console.log(this.poType, 'poType')

      if (this.TypeNo == 'resubmit' || this.TypeNo == 'reopen') {
        // debugger
        this.invNo = atob(params.invNo);
        this.ponumber = atob(params.poNo);
        this.multiponumber = params.mpo;
        console.log(this.ponumber, 'this.ponumber')
        if (this.multiponumber != undefined) {
          this.mpodata = atob(this.multiponumber)
          console.log(this.mpodata, 'this.mpodata')

          if (this.mpodata != 'null') {
            //this.multiPOList.push(this.mpodata);
            console.log(this.multiPOList, 'this.multiPOList')
            const myArray = this.mpodata.split(",");
            for (let i = 0; i < myArray.length; i++) {
              this.simpoSelectedPo.push(myArray[i])
            }
            console.log(this.simpoSelectedPo, 'this.simpoSelectedPo')
          }
          else {
            this.simpoSelectedPo = [];
          }
        }
        else {
          this.simpoSelectedPo = [];
        }
        console.log(this.simpoSelectedPo, 'this.simpoSelectedPo')
        this.poType = atob(params.poType);

        if (this.TypeNo == 'resubmit') {
          this.previnvdt = new Date(atob(params.invoiceDate));
        }
      }

      var x = document.getElementById("showonresubmit");
      if (this.TypeNo == "resubmit") {
        x.style.display = "none";
      } else if (this.TypeNo == "part") {
        // x.style.display = "none";
      }
      $("body").on("click", ".inv-wrapper", function () {
        console.log($(this))
        $('.inv-wrapper.active').removeClass('active');
        $(this).addClass('active');
      });
      console.log("what are the ?", params); // { order: "popular" }
      console.log("type=====================>", this.TypeNo);
      console.log("this.podate ==>" + this.podate);
    });
    $("body").on("click", ".inv-wrapper", function () {
      console.log($(this))
      $('.inv-wrapper.active').removeClass('active');
      $(this).addClass('active');
    });
    // if(this.TypeNo == 'reopen'){
    //   alert();
    // }
    //bhavana tobe invoice code
    //   if (this.TypeNo != 'resubmit' && this.TypeNo  !='reopen') {
    //     this.purchaseOrderListService.GetgrnbaseonPos(this.ponumber).subscribe(res => {
    //       if (res[0].message == "Success") {
    //         this.tobeinvoicelist = res[0].grnbasedonpo;
    //         console.log("tobe invoiced"+this.tobeinvoicelist)
    //         this.grninvoicepresent = true;
    //       }
    //       else {
    //         this.grninvoicepresent = false;
    //       }
    //       console.log(sessionStorage.getItem("invwopodetails"));

    //       if (sessionStorage.getItem("invwopodetails")) {
    //         this.freshinvoice = false;
    //         this.withoutpodetails = JSON.parse(sessionStorage.getItem("invwopodetails"));
    //         if (this.withoutpodetails[0].INVOICENUMBER != null) {

    //           console.log("this.withoutpodetails ==> ", this.withoutpodetails);
    //           for (var x = 0; x < this.withoutpodetails.length; x++) {
    //             if (this.withoutpodetails[0].IRNNUMBER != null || this.withoutpodetails[0].IRNNUMBER != "") {
    //               this.invoice = false;
    //               this.invoiceForm.controls.irnNo.setValue(this.withoutpodetails[x].IRNNUMBER)
    //               this.invoiceForm.controls.irnDate.setValue(new Date(this.withoutpodetails[x].IRNDATE))
    //             }
    //             else {
    //               this.invoice = true;
    //               this.invoiceForm.controls.irnNo.setValue(null)
    //               this.invoiceForm.controls.irnDate.setValue(null)
    //             }
    //             this.irnNumber = this.withoutpodetails[0].IRNNUMBER

    //             this.invoiceForm.controls.invoiceNo.setValue(this.withoutpodetails[x].INVOICENUMBER)
    //             this.invoiceForm.controls.invoiceDate.setValue(new Date(this.withoutpodetails[x].INVOICEDATE));
    //             var invoicedate = new Date(this.withoutpodetails[0].INVOICEDATE)
    //             if (this.withoutpodetails[0].BILLOFLADINGDATE == undefined || this.withoutpodetails[0].BILLOFLADINGDATE == null) {
    //               this.invoiceForm.controls.billofladingdate.setValue(null);
    //             }
    //             else {
    //               this.invoiceForm.controls.billofladingdate.setValue(new Date(this.withoutpodetails[x].BILLOFLADINGDATE));
    //             }
    //             this.invoiceForm.controls.description.setValue(this.withoutpodetails[x].DESCRIPTION);
    //             this.descripionlength = 160-this.withoutpodetails[x].DESCRIPTION.length;
    //             console.log("this.withoutpodetails[x].ACTUALFILENAME ", this.withoutpodetails[x].ACTUALFILENAME);
    //             var a = this.withoutpodetails[x].ACTUALFILENAME;
    //             this.invoiceForm.controls['attachments'].setValue('');
    //             if (this.withoutpodetails[x].IRNNUMBER != null) {
    //               this.invoice = false
    //               this.invoiceForm.controls.irnNo.setValue(this.withoutpodetails[x].IRNNUMBER);
    //               this.invoiceForm.controls.irnDate.setValue(new Date(this.withoutpodetails[x].IRNDATE));
    //             }
    //             else {
    //               this.invoice = true
    //               this.invoiceForm.controls.irnNo.setValue(null);
    //               this.invoiceForm.controls.irnDate.setValue(null);
    //             }
    //             this.viewAttachmentName = this.withoutpodetails[x].ACTUALFILENAME;
    //             this.actualfilenameofwopo = this.withoutpodetails[x].ACTUALFILENAME;
    //             this.savedfilenameofwopo = this.withoutpodetails[x].SAVEDFILENAME;

    //             if (this.withoutpodetails[x].SUPPORTACTFILENAME != null) {
    //               var array = this.withoutpodetails[x].SUPPORTACTFILENAME.split(',');
    //               this.individualsavedname = [];
    //               for (var k = 0; k < array.length; k++) {
    //                 this.individualsavedname.push(array[k]);
    //               }
    //               this.ArrayOfSelectedFile = [];
    //               this.ArrayOfSelectedFilename = this.individualsavedname;
    //               this.filecount = this.ArrayOfSelectedFilename.length;
    //               console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
    //               var array1 = this.withoutpodetails[x].SUPPORTSAVEDFILENAME.split(',');
    //               this.individualsavedname = [];
    //               for (var k = 0; k < array1.length; k++) {
    //                 this.individualsavedname1.push(array1[k]);
    //               }
    //               this.ArrayOfSelectedSavedFile = [];
    //               this.ArrayOfSelectedSavedFile = this.individualsavedname1;

    //               console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
    //             }
    //           }
    //         }
    //       }

    //       this.orderlineitems = JSON.parse(sessionStorage.getItem("invsubmissionorderDetails"));
    //       this.uniquelineitems = JSON.parse(sessionStorage.getItem("invsubmissionDetails"));
    //       console.log("this.uniquelineitems", this.uniquelineitems);
    //       this.maxdate = new Date();
    //       this.mindate = new Date(this.podate);
    //       if (this.TypeNo == 'part' || this.TypeNo !='reopen') {
    //         this.part = true;
    //         this.full = false;
    //         this.resubmit = true;
    //         this.reopen = false;
    //       }
    //       else {
    //         this.part = false;
    //         this.full = true;
    //         this.resubmit = false;
    //         this.reopen = true;

    //       }

    // // debugger;

    //       this.getPOitems(this.ponumber)
    //     });


    //   }
    //end bhavana tobe invoice code
    // debugger
    if (this.TypeNo != 'resubmit' && this.TypeNo != 'reopen') {
      // debugger
      this.purchaseOrderListService.GetgrnbaseonPos(this.ponumber).subscribe(res => {
        if (res[0].message == "Success") {
          this.tobeinvoicelist = res[0].grnbasedonpo;
          this.grninvoicepresent = true;
        }
        else {
          this.grninvoicepresent = false;
        }
        console.log(sessionStorage.getItem("invwopodetails"));

        if (sessionStorage.getItem("invwopodetails")) {
          // debugger
          this.freshinvoice = false;
          this.withoutpodetails = JSON.parse(sessionStorage.getItem("invwopodetails"));
          if (this.withoutpodetails[0].INVOICENUMBER != null) {
          console.log(this.withoutpodetails.IRNNUMBER)
            console.log("this.withoutpodetails ==> ", this.withoutpodetails);
            for (var x = 0; x < this.withoutpodetails.length; x++) {
              if (this.withoutpodetails[0].IRNNUMBER != null || this.withoutpodetails[0].IRNNUMBER != "") {
                this.invoice = false;
                this.invoiceForm.controls.irnNo.setValue(this.withoutpodetails[x].IRNNUMBER)
                this.invoiceForm.controls.irnDate.setValue(new Date(this.withoutpodetails[x].IRNDATE))
              }
              else {
                this.invoice = true;
                this.invoiceForm.controls.irnNo.setValue(null)
                this.invoiceForm.controls.irnDate.setValue(null)
              }
              this.irnNumber = this.withoutpodetails[0].IRNNUMBER

              this.invoiceForm.controls.invoiceNo.setValue(this.withoutpodetails[x].INVOICENUMBER)
              this.invoiceForm.controls.invoiceDate.setValue(new Date(this.withoutpodetails[x].INVOICEDATE));
              var invoicedate = new Date(this.withoutpodetails[0].INVOICEDATE)
              if (this.withoutpodetails[0].BILLOFLADINGDATE == undefined || this.withoutpodetails[0].BILLOFLADINGDATE == null) {
                this.invoiceForm.controls.billofladingdate.setValue(null);
              }
              else {
                this.invoiceForm.controls.billofladingdate.setValue(new Date(this.withoutpodetails[x].BILLOFLADINGDATE));
              }
              this.invoiceForm.controls.description.setValue(this.withoutpodetails[x].DESCRIPTION);
              this.descripionlength = 160 - this.withoutpodetails[x].DESCRIPTION.length;
              console.log("this.withoutpodetails[x].ACTUALFILENAME ", this.withoutpodetails[x].ACTUALFILENAME);
              var a = this.withoutpodetails[x].ACTUALFILENAME;
              this.invoiceForm.controls['attachments'].setValue('');
              if (this.withoutpodetails[x].IRNNUMBER != null) {
                this.invoice = false
                this.invoiceForm.controls.irnNo.setValue(this.withoutpodetails[x].IRNNUMBER);
                this.invoiceForm.controls.irnDate.setValue(new Date(this.withoutpodetails[x].IRNDATE));
              }
              else {
                this.invoice = true
                this.invoiceForm.controls.irnNo.setValue(null);
                this.invoiceForm.controls.irnDate.setValue(null);
              }
              this.viewAttachmentName = this.withoutpodetails[x].ACTUALFILENAME;
              this.actualfilenameofwopo = this.withoutpodetails[x].ACTUALFILENAME;
              this.savedfilenameofwopo = this.withoutpodetails[x].SAVEDFILENAME;

              if (this.withoutpodetails[x].SUPPORTACTFILENAME != null) {
                var array = this.withoutpodetails[x].SUPPORTACTFILENAME.split(',');
                this.individualsavedname = [];
                for (var k = 0; k < array.length; k++) {
                  this.individualsavedname.push(array[k]);
                }
                this.ArrayOfSelectedFile = [];
                this.ArrayOfSelectedFilename = this.individualsavedname;
                this.filecount = this.ArrayOfSelectedFilename.length;
                console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
                var array1 = this.withoutpodetails[x].SUPPORTSAVEDFILENAME.split(',');
                this.individualsavedname = [];
                for (var k = 0; k < array1.length; k++) {
                  this.individualsavedname1.push(array1[k]);
                }
                this.ArrayOfSelectedSavedFile = [];
                this.ArrayOfSelectedSavedFile = this.individualsavedname1;

                console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
              }
            }
          }
        }

        this.orderlineitems = JSON.parse(sessionStorage.getItem("invsubmissionorderDetails"));
        this.uniquelineitems = JSON.parse(sessionStorage.getItem("invsubmissionDetails"));
        console.log("this.uniquelineitems", this.uniquelineitems);
        this.maxdate = new Date();
        this.mindate = new Date(this.podate);
        if (this.TypeNo == 'part' || this.TypeNo != 'reopen') {
          this.part = true;
          this.full = false;
          this.resubmit = true;
          this.reopen = false;
        }
        else {
          this.part = false;
          this.full = true;
          this.resubmit = false;
          this.reopen = true;

        }

        // debugger;

        this.getPOitems(this.ponumber)
      });


    }
    else if (this.TypeNo == "reopen") {

      // debugger
      this.showAddPoButton = false;
      this.fileupload = "norefileupload";
      this.part = true;
      this.full = false;
      this.resubmit = true;
      this.reopen = true;
      this.invoicedata = [];
      this.uniquelineitems = [];
      this.uniquelineitem = [];
      sessionStorage.setItem("poNumber", this.ponumber);
      console.log("in here");
      this.getPoData1();

    }
    else if (this.TypeNo == "resubmit") {


      this.showAddPoButton = false;
      this.fileupload = "norefileupload";
      this.part = true;
      this.full = false;
      this.resubmit = true;
      this.reopen = true;
      this.invoicedata = [];
      this.uniquelineitems = [];
      this.uniquelineitem = [];
      sessionStorage.setItem("poNumber", this.ponumber);
      console.log("in here");
      this.getPOData();

    }
    //   if(this.TypeNo == "reopen"){
    //     this.route.queryParams.subscribe(params => {
    //       this.TypeNo = atob(params.type);
    //       this.vendorid = atob(params.vd);



    //       if ( this.TypeNo =='reopen') {
    //         this.invNo = atob(params.invNo);
    //         this.ponumber = atob(params.poNo);
    //         this.multiponumber = params.mpo;
    //         console.log(this.ponumber,'this.ponumber')
    //         if(this.multiponumber != undefined)
    //         {
    //           this.mpodata =  atob(this.multiponumber)
    //           console.log(this.mpodata,'this.mpodata')

    //           if(this.mpodata != 'null')
    //           {
    //             //this.multiPOList.push(this.mpodata);
    //             console.log(this.multiPOList,'this.multiPOList')
    //             const myArray = this.mpodata.split(",");
    //             for(let i=0; i< myArray.length;i++)
    //             {
    //               this.simpoSelectedPo.push(myArray[i])
    //             }
    //             console.log(this.simpoSelectedPo,'this.simpoSelectedPo')
    //           }
    //           else
    //           {
    //             this.simpoSelectedPo = [];
    //           }
    //         }
    //         else
    //          {
    //            this.simpoSelectedPo = [];
    //          }
    //          console.log(this.simpoSelectedPo,'this.simpoSelectedPo')
    //         //this.poType = atob(params.poType);
    //       }

    //       $("body").on("click", ".inv-wrapper", function () {
    //         console.log($(this))
    //         $('.inv-wrapper.active').removeClass('active');
    //         $(this).addClass('active');
    //       });
    //       console.log("what are the ?", params); // { order: "popular" }
    //       console.log("type=====================>", this.TypeNo);
    //       console.log("this.podate ==>" + this.podate);
    //     });
    //     this.showAddPoButton = false;
    //     this.fileupload = "norefileupload";
    //     this.part = true;
    //     this.full = false;
    //     this.resubmit = false;
    //     this.reopen = true;
    //     this.invoicedata = [];
    //     this.uniquelineitems = [];
    //     this.uniquelineitem = [];
    //     sessionStorage.setItem("poNumber", this.ponumber);
    //     console.log("in here");
    //     this.getPoData1();



    // }



    console.log("this.vendorid ==> " + this.vendorid);
  }
  reset() {

  }
  getPOData() {
    // debugger
    this.purchaseOrderListService.getPODetails(this.ponumber).subscribe(res => {
      // debugger
      this.uniquelineitems = res[0].poData;
      for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {

        this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
        this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)

        this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
        this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
        if (this.full) {
          this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
          this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
        }
        this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
        this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
      }
      if (this.totalBalQty == 0 || this.totalBalQty == 0.0 || this.TypeNo != 'reopen') {
        console.log("problem here");
        this.disable = true;
        this.errormessage = "* Can't submit invoice total balance quantity = 0";
      }

      console.log("call form Total Balance Quantity==============>", this.totalBalQty);
      // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      for (var j = 0; j < this.poDetail.length; j++) {
        console.log("this.poDetail[j]", this.poDetail[j]);
        if (this.poDetail[j].ORDERNUMBER == null) {
          this.uniquelineitems.push(this.poDetail[j]);

          this.balQtyList.push(this.poDetail[j].BALANCE_QTY)
          console.log("teest", this.poDetail[j].BALANCE_QTY);

        }
      }
      console.log("this.uniquelineitems======>>>", this.uniquelineitems); this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
        if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
          return 1;
        }

        if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
          return -1;
        }

        return 0;
      });
      console.log("this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems))
      sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
      console.log("Lineitemtext ", this.poDetail)
      for (var i = 0; i < this.poDetail.length; i++) {
        this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
      }
      console.log("this.lineitemnumber. " + this.lineitemnumber);
      var mySet = new Set(this.lineitemnumber);
      mySet.forEach(v => this.lineitemnumberset.push(v));

      this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      if (this.uniquelineitems.length != 0) {
        // if(this.multiPOFinalList.length == 0)
        // {
        this.trackOrderListService.getlistitemsforinvoicenumber(this.invNo, this.ponumber).subscribe(res => {
          if (res[0].message == "Success") {
            this.invoicedata = res[0].poData;
            this.invoicedata = this.invoicedata.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
            console.log(this.uniquelineitems.length, 'this.uniquelineitems.length')
            for (let m = 0; m < this.uniquelineitems.length - 1; m++) {
              // this.invoiceForm.addControl('orderValue' + m, this.fb.control(''))
              // this.invoiceForm.addControl('overallsimpoAmount' + m, this.fb.control(''))
              // this.invoiceForm.addControl('inputBalanceQuantitysimpo' + m, this.fb.control(''))
              for (let i = 0; i < this.invoicedata.length; i++) {
                if (this.invoicedata[i].GRNNUMBER != null) {
                  this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].ACCEPTEDQTY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                }
                if (this.invoicedata[i].GRNNUMBER == null) {
                  this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].QUANTITY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                }
                console.log(this.uniquelineitems[m].PO_NUMBER, 'this.uniquelineitems[m].PO_NUMBER')
                console.log(this.invoicedata[i].PO_NUMBER, 'this.invoicedata[i].PO_NUMBER')
                if ((this.uniquelineitems[m].PO_NUMBER == this.invoicedata[i].PO_NUMBER)
                  && (this.uniquelineitems[m].LINEITEMNUMBER == this.invoicedata[i].LINEITEMNUMBER)) {
                  this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);
                  // alert("Hi i am simpo");
                  //
                  // this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);

                  if (this.uniquelineitems[m].FORECLOSESTATUSCHECK == 'X') {
                    this.invoiceForm.addControl('orderValuesimpo' + m + i, this.fb.control(''))
                    this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);
                  }
                  else {
                    this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);

                    // this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(this.invoicedata[i].QUANTITY);
                  }

                  this.calculate(m, this.uniquelineitems[m].RATEPERQTY);
                }

              }
            }
            console.log("this.invoicedata ==>", this.invoicedata);
            if (this.invoicedata[0].IRNNUMBER != null || this.invoicedata[0].IRNNUMBER != "") {
              this.invoice = false;
              this.irnNumber = this.invoicedata[0].IRNNUMBER;
            }
            else {
              this.invoice = true
              this.irnNumber = null;
            }

            var invoicedate = new Date(this.invoicedata[0].INVOICEDATE)
            this.invoiceForm.controls.invoiceNo.setValue(this.invNo);
            this.invoiceForm.controls.invoiceDate.setValue(new Date(this.invoicedata[0].INVOICEDATE));
            if (this.mindate < invoicedate) {
              this.disable = true;
            }
            else {
              this.disable = false;
            }
            this.invoiceForm.controls.description.setValue(this.invoicedata[0].DESCRIPTION);
            this.descripionlength = 160 - this.invoicedata[0].DESCRIPTION.length;
            if (this.invoicedata[0].BILLOFLADINGDATE == null) {
              this.invoiceForm.controls.billofladingdate.setValue(null);
            }
            else {
              this.invoiceForm.controls.billofladingdate.setValue(new Date(this.invoicedata[0].BILLOFLADINGDATE));
            }
            // this.invoiceForm.controls.attachments.setValue(this.invoicedata[0].ACTUALFILENAME);
            if (this.invoicedata[0].ACTUALFILENAME != null || this.invoicedata[0].ACTUALFILENAME != '') {
              this.invoiceForm.get('attachments').setValidators(null);
              this.invoiceForm.controls['attachments'].updateValueAndValidity();
            }
            if (this.invoicedata[0].IRNNUMBER != null) {
              this.invoice = false;
              this.invoiceForm.controls.irnNo.setValue(this.invoicedata[0].IRNNUMBER);
              this.invoiceForm.controls.irnDate.setValue(new Date(this.invoicedata[0].IRNDATE));
            }
            else {
              this.invoice = true
              this.invoiceForm.controls.irnNo.setValue(null);
              this.invoiceForm.controls.irnDate.setValue(null);
            }
            this.invoiceForm.controls.endUser.setValue(this.invoicedata[0].NOTIFYENDUSEREMAILID);
            this.viewAttachmentName = this.invoicedata[0].ACTUALFILENAME;
            console.log("this.ArrayOfSelectedFilename this.invoicedata[0].TOTALAMOUNT ", this.invoicedata[0].TOTALAMOUNT);
            // this.viewAttachmentName = this.viewAttachmentName.toString();
            // this.invoiceForm.controls.attachments.reset(
            // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
            this.actualresubmitfilename = this.invoicedata[0].ACTUALFILENAME;
            this.savedresubmitfilename = this.invoicedata[0].SAVEDFILENAME;

            // this.actualfilenameofwopo = this.withoutpodetails[x].MULTIACTUALFILENAME;
            // this.savedfilenameofwopo = this.withoutpodetails[x].MULTISAVEDFILENAME;
            // this.savedfilenameofresubmit = this.invoicedata[0].MULTIACTUALFILENAME;
            if (this.invoicedata[0].MULTIACTUALFILENAME != null) {
              var array = this.invoicedata[0].MULTIACTUALFILENAME.split(',');
              this.suppindividualactualname = [];
              for (var k = 0; k < array.length; k++) {
                this.suppindividualactualname.push(array[k]);
              }
              this.ArrayOfSelectedFile = [];
              this.ArrayOfSelectedFilename = this.suppindividualactualname;
              this.filecount = this.ArrayOfSelectedFilename.length;
              console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
              var array1 = this.invoicedata[0].MULTISAVEDFILENAME.split(',');
              this.suppindividualsavedname = [];
              for (var k = 0; k < array1.length; k++) {
                this.suppindividualsavedname.push(array1[k]);
              }
              this.ArrayOfSelectedSavedFile = [];
              this.ArrayOfSelectedSavedFile = this.suppindividualsavedname;

              console.log("this.ArrayOfSelectedSavedFile ", this.ArrayOfSelectedSavedFile);
            }
            // var array1 = this.invoicedata[x].SUPPORTSAVEDFILENAME.split(',');
            // this.individualsavedname = [];
            // for (var k = 0; k < array1.length; k++) {
            //   this.individualsavedname1.push(array1[k]);
            // }
            // this.ArrayOfSelectedSavedFile = [];
            // this.ArrayOfSelectedSavedFile = this.individualsavedname1;

            // console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
            // this.invoiceForm.controls.remarks.setValue(this.invoicedata[0].VENDORREMARKS);
            // For return 
            this.invoiceForm.controls.remarks.setValue(this.invoicedata[0].VENDORREMARKS);
            this.remarklength = 160 - this.invoicedata[0].VENDORREMARKS.length
            this.invoiceForm.controls.TotalinctaxAmount.setValue(this.invoicedata[0].TOTALAMTINCTAXES);
            this.invoiceForm.controls.taxAmount.setValue(this.invoicedata[0].TAXAMOUNT)

            // this.invoiceForm.controls.attachments.setValue(this.invoicedata[0].ACTUALFILENAME);
            console.log("this.invoiceForm.controls.attachments");
          }
        });
        // }
        if (this.simpoSelectedPo.length > 0) {
          // this.trackOrderListService.getMultiPoLineItemDetailForVendor(this.invNo, this.multiPOFinalList).subscribe(res => {
          this.purchaseOrderListService.simpoEventDetails(this.simpoSelectedPo).subscribe(res => {
            this.posimponewList = res[0].poData;
            // if (this.posimponewList.length > 0) {
            this.posimponewList = this.posimponewList.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
            console.log(this.uniquelineitems.length, 'this.uniquelineitems.length');
            for (let m = 0; m < this.uniquelineitems.length; m++) {
              // this.invoiceForm.addControl('orderValue' + m, this.fb.control(''))
              // this.invoiceForm.addControl('orderValuesimpo' + m, this.fb.control(''))
              for (let a = 0; a < this.simpoSelectedPo.length; a++) {

                for (let i = 0; i < this.posimponewList.length; i++) {

                  if (this.uniquelineitems[m].uniquelineitems != null) {
                    this.uniquelineitems[m].TOTALCALCULATEAMOUNT = Number(parseFloat(this.uniquelineitems[m].ACCEPTEDQTY) * parseFloat(this.uniquelineitems[m].RATEPERQTY));
                  }
                  if (this.uniquelineitems[m].GRNNUMBER == null) {
                    this.uniquelineitems[m].TOTALCALCULATEAMOUNT = Number(parseFloat(this.uniquelineitems[m].QUANTITY) * parseFloat(this.uniquelineitems[m].RATEPERQTY));
                  }
                  this.invoiceForm.addControl('calRealtimesimpo' + a + i, this.fb.control(0))
                  this.invoiceForm.addControl('overallsimpoAmount' + a, this.fb.control(0))
                  this.invoiceForm.addControl('inputBalanceQuantitysimpo' + a, this.fb.control(0))
                  this.invoiceForm.addControl('orderValuesimpo' + a + i, this.fb.control(''))
                  console.log(this.invoiceForm, '(this.invoiceForm');

                  if ((this.uniquelineitems[m].PO_NUMBER == this.posimponewList[i].PO_NUMBER) && (this.uniquelineitems[m].LINEITEMNUMBER == this.posimponewList[i].LINEITEMNUMBER)) {
                    // this.invoiceForm.controls['orderValuesimpo' + m].setValue(0);

                    this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);
                    this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(0);
                    if (this.uniquelineitems[m].FORECLOSESTATUSCHECK == 'X') {
                      this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);
                      this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(0);
                      // alert("HI")
                    }
                    // this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(this.posimponewList[i].QUANTITY);
                    // if (this.uniquelineitems[m].FORECLOSESTATUSCHECK != null) {

                    //   this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(0);
                    // }
                    // else {
                    //   this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(0);

                    //   //this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(this.posimponewList[i].QUANTITY);

                    // }

                    // if (this.uniquelineitems[m].FORECLOSESTATUSCHECK != null) {

                    //   this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(0);
                    // }
                    // else {
                    //   this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(0);
                    //   this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(this.posimponewList[i].QUANTITY);

                    // }
                  }

                  // this.calculatesimpo(a, i, this.uniquelineitems[m].RATEPERQTY);
                }
              }
            }
            this.trackOrderListService.getMultiPoLineItemDetailForVendor(this.invNo, this.simpoSelectedPo).subscribe(res => {
              this.simpoinvoicedata = res[0].poData;

              for (let a = 0; a < this.simpoSelectedPo.length; a++) {

                for (let n = 0; n < this.simpoinvoicedata.length; n++) {

                  for (let k = 0; k < this.posimponewList.length; k++) {

                    console.log(k, 'posimponewList')
                    console.log(this.simpoSelectedPo[a], 'this.simpoSelectedPo[a]');
                    console.log(this.posimponewList[k].PO_NUMBER, 'this.posimponewList[k].PO_NUMBER')
                    if (this.simpoSelectedPo[a] == this.posimponewList[k].PO_NUMBER) {
                      console.log(a, 'simpoSelectedPo')
                      console.log(n, 'simpoinvoicedata')

                      console.log(this.simpoSelectedPo[a], 'this.simpoSelectedPo[a]')
                      console.log(this.simpoinvoicedata[n].PO_NUMBER, 'this.simpoinvoicedata[n].PO_NUMBER')
                      if ((this.simpoinvoicedata[n].PO_NUMBER == this.posimponewList[k].PO_NUMBER)
                        && (this.simpoinvoicedata[n].LINEITEMNUMBER == this.posimponewList[k].LINEITEMNUMBER)) {
                        this.invoiceForm.controls['orderValuesimpo' + a + k].setValue(this.simpoinvoicedata[n].QUANTITY);
                        this.calculatesimpo(a, k, this.posimponewList[k].RATEPERQTY)
                        break;
                      }
                    }

                  }
                }
              }
            });

            // console.log("this.posimponewList ==>", this.posimponewList);
            // if (this.posimponewList[0].IRNNUMBER != null || this.posimponewList[0].IRNNUMBER != "") {
            //   this.invoice = false;
            //   this.irnNumber = this.posimponewList[0].IRNNUMBER;
            // }
            // else {
            //   this.invoice = true
            //   this.irnNumber = null;
            // }

            // var invoicedate = new Date(this.uniquelineitems[0].INVOICEDATE)
            // this.invoiceForm.controls.invoiceNo.setValue(this.invNo);
            // this.invoiceForm.controls.invoiceDate.setValue(new Date(this.uniquelineitems[0].INVOICEDATE));
            // if (this.mindate < invoicedate) {
            //   this.disable = true;
            // }
            // else {
            //   this.disable = false;
            // }
            // this.invoiceForm.controls.description.setValue(this.uniquelineitems[0].DESCRIPTION);
            // if (this.uniquelineitems[0].BILLOFLADINGDATE == null) {
            //   this.invoiceForm.controls.billofladingdate.setValue(null);
            // }
            // else {
            //   this.invoiceForm.controls.billofladingdate.setValue(new Date(this.uniquelineitems[0].BILLOFLADINGDATE));
            // }
            // // this.invoiceForm.controls.attachments.setValue(this.posimponewList[0].ACTUALFILENAME);
            // if (this.uniquelineitems[0].ACTUALFILENAME != null || this.uniquelineitems[0].ACTUALFILENAME != '') {
            //   this.invoiceForm.get('attachments').setValidators(null);
            //   this.invoiceForm.controls['attachments'].updateValueAndValidity();
            // }
            // if (this.uniquelineitems[0].IRNNUMBER != null) {
            //   this.invoice = false;
            //   this.invoiceForm.controls.irnNo.setValue(this.uniquelineitems[0].IRNNUMBER);
            //   this.invoiceForm.controls.irnDate.setValue(new Date(this.uniquelineitems[0].IRNDATE));
            // }
            // else {
            //   this.invoice = true
            //   this.invoiceForm.controls.irnNo.setValue(null);
            //   this.invoiceForm.controls.irnDate.setValue(null);
            // }

            // this.viewAttachmentName = this.uniquelineitems[0].ACTUALFILENAME;
            // console.log("this.ArrayOfSelectedFilename this.uniquelineitems[0].TOTALAMOUNT ", this.uniquelineitems[0].TOTALAMOUNT);
            // // this.viewAttachmentName = this.viewAttachmentName.toString();
            // // this.invoiceForm.controls.attachments.reset(
            // // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
            // this.actualresubmitfilename = this.uniquelineitems[0].ACTUALFILENAME;
            // this.savedresubmitfilename = this.uniquelineitems[0].SAVEDFILENAME;

            // this.actualfilenameofwopo = this.withoutpodetails[x].MULTIACTUALFILENAME;
            // this.savedfilenameofwopo = this.withoutpodetails[x].MULTISAVEDFILENAME;
            // this.savedfilenameofresubmit = this.uniquelineitems[0].MULTIACTUALFILENAME;
            if (this.uniquelineitems[0].MULTIACTUALFILENAME != null) {
              var array = this.uniquelineitems[0].MULTIACTUALFILENAME.split(',');
              this.suppindividualactualname = [];
              for (var k = 0; k < array.length; k++) {
                this.suppindividualactualname.push(array[k]);
              }
              this.ArrayOfSelectedFile = [];
              this.ArrayOfSelectedFilename = this.suppindividualactualname;
              this.filecount = this.ArrayOfSelectedFilename.length;
              console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
              var array1 = this.uniquelineitems[0].MULTISAVEDFILENAME.split(',');
              this.suppindividualsavedname = [];
              for (var k = 0; k < array1.length; k++) {
                this.suppindividualsavedname.push(array1[k]);
              }
              this.ArrayOfSelectedSavedFile = [];
              this.ArrayOfSelectedSavedFile = this.suppindividualsavedname;

              console.log("this.ArrayOfSelectedSavedFile ", this.ArrayOfSelectedSavedFile);
            }
            // var array1 = this.uniquelineitems[x].SUPPORTSAVEDFILENAME.split(',');
            // this.individualsavedname = [];
            // for (var k = 0; k < array1.length; k++) {
            //   this.individualsavedname1.push(array1[k]);
            // }
            // this.ArrayOfSelectedSavedFile = [];
            // this.ArrayOfSelectedSavedFile = this.individualsavedname1;

            // console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
            // this.invoiceForm.controls.remarks.setValue(this.uniquelineitems[0].VENDORREMARKS);
            // For return 
            // this.invoiceForm.controls.remarks.setValue(this.uniquelineitems[0].VENDORREMARKS);

            // this.invoiceForm.controls.attachments.setValue(this.posimponewList[0].ACTUALFILENAME);
            console.log("this.invoiceForm.controls.attachments");
            // }
          });
        }

      }
    });

  }

  getPoData1() {
    // debugger
    this.purchaseOrderListService.getPODetails(this.ponumber).subscribe(res => {
      this.uniquelineitems = res[0].poData;
      for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {

        this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
        this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)

        this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
        this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
        if (this.full) {
          this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
          this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
        }
        this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
        this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
      }
      if (this.totalBalQty == 0 || this.totalBalQty == 0.0 || this.TypeNo != 'reopen') {
        console.log("problem here");
        this.disable = true;
        this.errormessage = "* Can't submit invoice total balance quantity = 0";
      }

      console.log("call form Total Balance Quantity==============>", this.totalBalQty);
      // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      for (var j = 0; j < this.poDetail.length; j++) {
        console.log("this.poDetail[j]", this.poDetail[j]);
        if (this.poDetail[j].ORDERNUMBER == null) {
          this.uniquelineitems.push(this.poDetail[j]);

          this.balQtyList.push(this.poDetail[j].BALANCE_QTY)
          console.log("teest", this.poDetail[j].BALANCE_QTY);

        }
      }
      console.log("this.uniquelineitems======>>>", this.uniquelineitems); this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
        if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
          return 1;
        }

        if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
          return -1;
        }

        return 0;
      });
      console.log("this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems))
      sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
      console.log("Lineitemtext ", this.poDetail)
      for (var i = 0; i < this.poDetail.length; i++) {
        this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
      }
      console.log("this.lineitemnumber. " + this.lineitemnumber);
      var mySet = new Set(this.lineitemnumber);
      mySet.forEach(v => this.lineitemnumberset.push(v));

      this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      if (this.uniquelineitems.length != 0) {
        // if(this.multiPOFinalList.length == 0)
        // {
        this.trackOrderListService.getlistitemsforinvoicenumber(this.invNo, this.ponumber).subscribe(res => {
          if (res[0].message == "Success") {
            this.invoicedata = res[0].poData;
            this.invoicedata = this.invoicedata.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
            console.log(this.uniquelineitems.length, 'this.uniquelineitems.length')
            for (let m = 0; m < this.uniquelineitems.length - 1; m++) {
              // this.invoiceForm.addControl('orderValue' + m, this.fb.control(''))
              // this.invoiceForm.addControl('overallsimpoAmount' + m, this.fb.control(''))
              // this.invoiceForm.addControl('inputBalanceQuantitysimpo' + m, this.fb.control(''))
              for (let i = 0; i < this.invoicedata.length; i++) {
                if (this.invoicedata[i].GRNNUMBER != null) {
                  this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].ACCEPTEDQTY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                }
                if (this.invoicedata[i].GRNNUMBER == null) {
                  this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].QUANTITY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                }
                console.log(this.uniquelineitems[m].PO_NUMBER, 'this.uniquelineitems[m].PO_NUMBER')
                console.log(this.invoicedata[i].PO_NUMBER, 'this.invoicedata[i].PO_NUMBER')
                if ((this.uniquelineitems[m].PO_NUMBER == this.invoicedata[i].PO_NUMBER)
                  && (this.uniquelineitems[m].LINEITEMNUMBER == this.invoicedata[i].LINEITEMNUMBER)) {
                  this.invoiceForm.controls['orderValue' + m].setValue(this.invoicedata[i].QUANTITY);

                  console.log("Quantity " + this.invoiceForm.controls['orderValue' + m].setValue(this.invoicedata[i].QUANTITY))
                  this.invoiceForm.addControl('orderValuesimpo' + m + i, this.fb.control(''))
                  //


                  if (this.uniquelineitems[m].FORECLOSESTATUSCHECK == 'X') {
                    this.invoiceForm.addControl('orderValuesimpo' + m + i, this.fb.control(''))
                    this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);
                  }
                  else {
                    this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);

                    // this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(this.invoicedata[i].QUANTITY);
                  }

                  this.calculate(m, this.uniquelineitems[m].RATEPERQTY);
                }

              }
            }
            console.log("this.invoicedata ==>", this.invoicedata);
            if (this.invoicedata[0].IRNNUMBER != null || this.invoicedata[0].IRNNUMBER != "") {
              this.invoice = false;
              this.irnNumber = this.invoicedata[0].IRNNUMBER;
            }
            else {
              this.invoice = true
              this.irnNumber = null;
            }

            var invoicedate = new Date(this.invoicedata[0].INVOICEDATE)
            this.invoiceForm.controls.invoiceNo.setValue(this.invNo);
            this.invoiceForm.controls.invoiceDate.setValue(new Date(this.invoicedata[0].INVOICEDATE));
            if (this.mindate < invoicedate) {
              this.disable = true;
            }
            else {
              this.disable = false;
            }
            this.invoiceForm.controls.description.setValue(this.invoicedata[0].DESCRIPTION);
            this.descripionlength = 160 - this.invoicedata[0].DESCRIPTION.length;
            if (this.invoicedata[0].BILLOFLADINGDATE == null) {
              this.invoiceForm.controls.billofladingdate.setValue(null);
            }
            else {
              this.invoiceForm.controls.billofladingdate.setValue(new Date(this.invoicedata[0].BILLOFLADINGDATE));
            }
            this.invoiceForm.controls.endUser.setValue(this.invoicedata[0].NOTIFYENDUSEREMAILID);
            // this.invoiceForm.controls.attachments.setValue(this.invoicedata[0].ACTUALFILENAME);
            if (this.invoicedata[0].ACTUALFILENAME != null || this.invoicedata[0].ACTUALFILENAME != '') {
              this.invoiceForm.get('attachments').setValidators(null);
              this.invoiceForm.controls['attachments'].updateValueAndValidity();
            }
            if (this.invoicedata[0].IRNNUMBER != null) {
              this.invoice = false;
              this.invoiceForm.controls.irnNo.setValue(this.invoicedata[0].IRNNUMBER);
              this.invoiceForm.controls.irnDate.setValue(new Date(this.invoicedata[0].IRNDATE));
            }
            else {
              this.invoice = true
              this.invoiceForm.controls.irnNo.setValue(null);
              this.invoiceForm.controls.irnDate.setValue(null);
            }

            this.viewAttachmentName = this.invoicedata[0].ACTUALFILENAME;
            console.log("this.ArrayOfSelectedFilename this.invoicedata[0].TOTALAMOUNT ", this.invoicedata[0].TOTALAMOUNT);
            // this.viewAttachmentName = this.viewAttachmentName.toString();
            // this.invoiceForm.controls.attachments.reset(
            // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
            this.actualresubmitfilename = this.invoicedata[0].ACTUALFILENAME;
            this.savedresubmitfilename = this.invoicedata[0].SAVEDFILENAME;

            // this.actualfilenameofwopo = this.withoutpodetails[x].MULTIACTUALFILENAME;
            // this.savedfilenameofwopo = this.withoutpodetails[x].MULTISAVEDFILENAME;
            // this.savedfilenameofresubmit = this.invoicedata[0].MULTIACTUALFILENAME;
            if (this.invoicedata[0].MULTIACTUALFILENAME != null) {
              var array = this.invoicedata[0].MULTIACTUALFILENAME.split(',');
              this.suppindividualactualname = [];
              for (var k = 0; k < array.length; k++) {
                this.suppindividualactualname.push(array[k]);
              }
              this.ArrayOfSelectedFile = [];
              this.ArrayOfSelectedFilename = this.suppindividualactualname;
              this.filecount = this.ArrayOfSelectedFilename.length;
              console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
              var array1 = this.invoicedata[0].MULTISAVEDFILENAME.split(',');
              this.suppindividualsavedname = [];
              for (var k = 0; k < array1.length; k++) {
                this.suppindividualsavedname.push(array1[k]);
              }
              this.ArrayOfSelectedSavedFile = [];
              this.ArrayOfSelectedSavedFile = this.suppindividualsavedname;

              console.log("this.ArrayOfSelectedSavedFile ", this.ArrayOfSelectedSavedFile);
            }
            // var array1 = this.invoicedata[x].SUPPORTSAVEDFILENAME.split(',');
            // this.individualsavedname = [];
            // for (var k = 0; k < array1.length; k++) {
            //   this.individualsavedname1.push(array1[k]);
            // }
            // this.ArrayOfSelectedSavedFile = [];
            // this.ArrayOfSelectedSavedFile = this.individualsavedname1;

            // console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
            // this.invoiceForm.controls.remarks.setValue(this.invoicedata[0].VENDORREMARKS);
            // For return 
            this.invoiceForm.controls.remarks.setValue(this.invoicedata[0].VENDORREMARKS);
            this.remarklength = 160 - this.invoicedata[0].VENDORREMARKS.length
            this.invoiceForm.controls.TotalinctaxAmount.setValue(this.invoicedata[0].TOTALAMTINCTAXES);
            this.invoiceForm.controls.taxAmount.setValue(this.invoicedata[0].TAXAMOUNT)

            // this.invoiceForm.controls.attachments.setValue(this.invoicedata[0].ACTUALFILENAME);
            console.log("this.invoiceForm.controls.attachments");
          }
        });
        // }
        if (this.simpoSelectedPo.length > 0) {
          // this.trackOrderListService.getMultiPoLineItemDetailForVendor(this.invNo, this.multiPOFinalList).subscribe(res => {
          this.purchaseOrderListService.simpoEventDetails(this.simpoSelectedPo).subscribe(res => {
            this.posimponewList = res[0].poData;
            // if (this.posimponewList.length > 0) {
            this.posimponewList = this.posimponewList.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
            console.log(this.uniquelineitems.length, 'this.uniquelineitems.length');
            for (let m = 0; m < this.uniquelineitems.length; m++) {
              // this.invoiceForm.addControl('orderValue' + m, this.fb.control(''))
              // this.invoiceForm.addControl('orderValuesimpo' + m, this.fb.control(''))
              for (let a = 0; a < this.simpoSelectedPo.length; a++) {

                for (let i = 0; i < this.posimponewList.length; i++) {

                  if (this.uniquelineitems[m].uniquelineitems != null) {
                    this.uniquelineitems[m].TOTALCALCULATEAMOUNT = Number(parseFloat(this.uniquelineitems[m].ACCEPTEDQTY) * parseFloat(this.uniquelineitems[m].RATEPERQTY));
                  }
                  if (this.uniquelineitems[m].GRNNUMBER == null) {
                    this.uniquelineitems[m].TOTALCALCULATEAMOUNT = Number(parseFloat(this.uniquelineitems[m].QUANTITY) * parseFloat(this.uniquelineitems[m].RATEPERQTY));
                  }
                  this.invoiceForm.addControl('calRealtimesimpo' + a + i, this.fb.control(0))
                  this.invoiceForm.addControl('overallsimpoAmount' + a, this.fb.control(0))
                  this.invoiceForm.addControl('inputBalanceQuantitysimpo' + a, this.fb.control(0))
                  this.invoiceForm.addControl('orderValuesimpo' + a + i, this.fb.control(''))
                  console.log(this.invoiceForm, '(this.invoiceForm');

                  if ((this.uniquelineitems[m].PO_NUMBER == this.posimponewList[i].PO_NUMBER) && (this.uniquelineitems[m].LINEITEMNUMBER == this.posimponewList[i].LINEITEMNUMBER)) {
                    if (this.uniquelineitems[m].FORECLOSESTATUSCHECK != null) {

                      this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(0);
                    }
                    else {
                      this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(this.posimponewList[i].QUANTITY);

                    }
                  }

                  //this.calculatesimpo(a, i, this.uniquelineitems[m].RATEPERQTY);
                }
              }
            }
            this.trackOrderListService.getMultiPoLineItemDetailForVendor(this.invNo, this.simpoSelectedPo).subscribe(res => {
              this.simpoinvoicedata = res[0].poData;

              for (let a = 0; a < this.simpoSelectedPo.length; a++) {

                for (let n = 0; n < this.simpoinvoicedata.length; n++) {

                  for (let k = 0; k < this.posimponewList.length; k++) {

                    console.log(k, 'posimponewList')
                    console.log(this.simpoSelectedPo[a], 'this.simpoSelectedPo[a]');
                    console.log(this.posimponewList[k].PO_NUMBER, 'this.posimponewList[k].PO_NUMBER')
                    if (this.simpoSelectedPo[a] == this.posimponewList[k].PO_NUMBER) {
                      console.log(a, 'simpoSelectedPo')
                      console.log(n, 'simpoinvoicedata')

                      console.log(this.simpoSelectedPo[a], 'this.simpoSelectedPo[a]')
                      console.log(this.simpoinvoicedata[n].PO_NUMBER, 'this.simpoinvoicedata[n].PO_NUMBER')
                      if ((this.simpoinvoicedata[n].PO_NUMBER == this.posimponewList[k].PO_NUMBER)
                        && (this.simpoinvoicedata[n].LINEITEMNUMBER == this.posimponewList[k].LINEITEMNUMBER)) {
                        this.invoiceForm.controls['orderValuesimpo' + a + k].setValue(this.simpoinvoicedata[n].QUANTITY);
                        this.calculatesimpo(a, k, this.posimponewList[k].RATEPERQTY)
                        break;
                      }
                    }

                  }
                }
              }
            });

            // console.log("this.posimponewList ==>", this.posimponewList);
            // if (this.posimponewList[0].IRNNUMBER != null || this.posimponewList[0].IRNNUMBER != "") {
            //   this.invoice = false;
            //   this.irnNumber = this.posimponewList[0].IRNNUMBER;
            // }
            // else {
            //   this.invoice = true
            //   this.irnNumber = null;
            // }

            // var invoicedate = new Date(this.uniquelineitems[0].INVOICEDATE)
            // this.invoiceForm.controls.invoiceNo.setValue(this.invNo);
            // this.invoiceForm.controls.invoiceDate.setValue(new Date(this.uniquelineitems[0].INVOICEDATE));
            // if (this.mindate < invoicedate) {
            //   this.disable = true;
            // }
            // else {
            //   this.disable = false;
            // }
            // this.invoiceForm.controls.description.setValue(this.uniquelineitems[0].DESCRIPTION);
            // if (this.uniquelineitems[0].BILLOFLADINGDATE == null) {
            //   this.invoiceForm.controls.billofladingdate.setValue(null);
            // }
            // else {
            //   this.invoiceForm.controls.billofladingdate.setValue(new Date(this.uniquelineitems[0].BILLOFLADINGDATE));
            // }
            // // this.invoiceForm.controls.attachments.setValue(this.posimponewList[0].ACTUALFILENAME);
            // if (this.uniquelineitems[0].ACTUALFILENAME != null || this.uniquelineitems[0].ACTUALFILENAME != '') {
            //   this.invoiceForm.get('attachments').setValidators(null);
            //   this.invoiceForm.controls['attachments'].updateValueAndValidity();
            // }
            // if (this.uniquelineitems[0].IRNNUMBER != null) {
            //   this.invoice = false;
            //   this.invoiceForm.controls.irnNo.setValue(this.uniquelineitems[0].IRNNUMBER);
            //   this.invoiceForm.controls.irnDate.setValue(new Date(this.uniquelineitems[0].IRNDATE));
            // }
            // else {
            //   this.invoice = true
            //   this.invoiceForm.controls.irnNo.setValue(null);
            //   this.invoiceForm.controls.irnDate.setValue(null);
            // }

            // this.viewAttachmentName = this.uniquelineitems[0].ACTUALFILENAME;
            // console.log("this.ArrayOfSelectedFilename this.uniquelineitems[0].TOTALAMOUNT ", this.uniquelineitems[0].TOTALAMOUNT);
            // // this.viewAttachmentName = this.viewAttachmentName.toString();
            // // this.invoiceForm.controls.attachments.reset(
            // // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
            // this.actualresubmitfilename = this.uniquelineitems[0].ACTUALFILENAME;
            // this.savedresubmitfilename = this.uniquelineitems[0].SAVEDFILENAME;

            // this.actualfilenameofwopo = this.withoutpodetails[x].MULTIACTUALFILENAME;
            // this.savedfilenameofwopo = this.withoutpodetails[x].MULTISAVEDFILENAME;
            // this.savedfilenameofresubmit = this.uniquelineitems[0].MULTIACTUALFILENAME;
            if (this.uniquelineitems[0].MULTIACTUALFILENAME != null) {
              var array = this.uniquelineitems[0].MULTIACTUALFILENAME.split(',');
              this.suppindividualactualname = [];
              for (var k = 0; k < array.length; k++) {
                this.suppindividualactualname.push(array[k]);
              }
              this.ArrayOfSelectedFile = [];
              this.ArrayOfSelectedFilename = this.suppindividualactualname;
              this.filecount = this.ArrayOfSelectedFilename.length;
              console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
              var array1 = this.uniquelineitems[0].MULTISAVEDFILENAME.split(',');
              this.suppindividualsavedname = [];
              for (var k = 0; k < array1.length; k++) {
                this.suppindividualsavedname.push(array1[k]);
              }
              this.ArrayOfSelectedSavedFile = [];
              this.ArrayOfSelectedSavedFile = this.suppindividualsavedname;

              console.log("this.ArrayOfSelectedSavedFile ", this.ArrayOfSelectedSavedFile);
            }
            // var array1 = this.uniquelineitems[x].SUPPORTSAVEDFILENAME.split(',');
            // this.individualsavedname = [];
            // for (var k = 0; k < array1.length; k++) {
            //   this.individualsavedname1.push(array1[k]);
            // }
            // this.ArrayOfSelectedSavedFile = [];
            // this.ArrayOfSelectedSavedFile = this.individualsavedname1;

            // console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
            // this.invoiceForm.controls.remarks.setValue(this.uniquelineitems[0].VENDORREMARKS);
            // For return 
            // this.invoiceForm.controls.remarks.setValue(this.uniquelineitems[0].VENDORREMARKS);

            // this.invoiceForm.controls.attachments.setValue(this.posimponewList[0].ACTUALFILENAME);
            console.log("this.invoiceForm.controls.attachments");
            // }
          });
        }

      }
    });

  }

  getPoData2(ponum, dcnumber) {
    this.purchaseOrderListService.Getgrnbasedoninvoiceandpo(ponum, this.checkedList).subscribe(res => {
    });
    this.purchaseOrderListService.getPODetails(this.ponumber).subscribe(res => {
      this.uniquelineitems = res[0].poData;
      for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {

        this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
        this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)

        this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
        this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
        if (this.full) {
          this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
          this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
        }
        this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
        this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
      }
      if (this.totalBalQty == 0 || this.totalBalQty == 0.0 || this.TypeNo != 'reopen') {
        console.log("problem here");
        this.disable = true;
        this.errormessage = "* Can't submit invoice total balance quantity = 0";
      }

      console.log("call form Total Balance Quantity==============>", this.totalBalQty);
      // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      for (var j = 0; j < this.poDetail.length; j++) {
        console.log("this.poDetail[j]", this.poDetail[j]);
        if (this.poDetail[j].ORDERNUMBER == null) {
          this.uniquelineitems.push(this.poDetail[j]);

          this.balQtyList.push(this.poDetail[j].BALANCE_QTY)
          console.log("teest", this.poDetail[j].BALANCE_QTY);

        }
      }
      console.log("this.uniquelineitems======>>>", this.uniquelineitems); this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
        if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
          return 1;
        }

        if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
          return -1;
        }

        return 0;
      });
      console.log("this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems))
      sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
      console.log("Lineitemtext ", this.poDetail)
      for (var i = 0; i < this.poDetail.length; i++) {
        this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
      }
      console.log("this.lineitemnumber. " + this.lineitemnumber);
      var mySet = new Set(this.lineitemnumber);
      mySet.forEach(v => this.lineitemnumberset.push(v));

      this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      if (this.uniquelineitems.length != 0) {
        // if(this.multiPOFinalList.length == 0)
        // {
        this.trackOrderListService.getlistitemsforinvoicenumber(this.invNo, this.ponumber).subscribe(res => {
          if (res[0].message == "Success") {
            this.invoicedata = res[0].poData;
            this.invoicedata = this.invoicedata.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
            console.log(this.uniquelineitems.length, 'this.uniquelineitems.length')
            for (let m = 0; m < this.uniquelineitems.length - 1; m++) {
              // this.invoiceForm.addControl('orderValue' + m, this.fb.control(''))
              // this.invoiceForm.addControl('overallsimpoAmount' + m, this.fb.control(''))
              // this.invoiceForm.addControl('inputBalanceQuantitysimpo' + m, this.fb.control(''))
              for (let i = 0; i < this.invoicedata.length; i++) {
                if (this.invoicedata[i].GRNNUMBER != null) {
                  this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].ACCEPTEDQTY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                }
                if (this.invoicedata[i].GRNNUMBER == null) {
                  this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].QUANTITY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                }
                console.log(this.uniquelineitems[m].PO_NUMBER, 'this.uniquelineitems[m].PO_NUMBER')
                console.log(this.invoicedata[i].PO_NUMBER, 'this.invoicedata[i].PO_NUMBER')
                if ((this.uniquelineitems[m].PO_NUMBER == this.invoicedata[i].PO_NUMBER)
                  && (this.uniquelineitems[m].LINEITEMNUMBER == this.invoicedata[i].LINEITEMNUMBER)) {
                  this.invoiceForm.controls['orderValue' + m].setValue(this.invoicedata[i].QUANTITY);

                  console.log("Quantity " + this.invoiceForm.controls['orderValue' + m].setValue(this.invoicedata[i].QUANTITY))
                  this.invoiceForm.addControl('orderValuesimpo' + m + i, this.fb.control(''))
                  //


                  if (this.uniquelineitems[m].FORECLOSESTATUSCHECK == 'X') {
                    this.invoiceForm.addControl('orderValuesimpo' + m + i, this.fb.control(''))
                    this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);
                  }
                  else {
                    this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(0);

                    // this.invoiceForm.controls['orderValuesimpo' + m + i].setValue(this.invoicedata[i].QUANTITY);
                  }

                  this.calculate(m, this.uniquelineitems[m].RATEPERQTY);
                }

              }
            }
            console.log("this.invoicedata ==>", this.invoicedata);
            if (this.invoicedata[0].IRNNUMBER != null || this.invoicedata[0].IRNNUMBER != "") {
              this.invoice = false;
              this.irnNumber = this.invoicedata[0].IRNNUMBER;
            }
            else {
              this.invoice = true
              this.irnNumber = null;
            }

            var invoicedate = new Date(this.invoicedata[0].INVOICEDATE)
            this.invoiceForm.controls.invoiceNo.setValue(this.invNo);
            this.invoiceForm.controls.invoiceDate.setValue(new Date(this.invoicedata[0].INVOICEDATE));
            if (this.mindate < invoicedate) {
              this.disable = true;
            }
            else {
              this.disable = false;
            }
            this.invoiceForm.controls.description.setValue(this.invoicedata[0].DESCRIPTION);
            this.descripionlength = 160 - this.invoicedata[0].DESCRIPTION.length;
            if (this.invoicedata[0].BILLOFLADINGDATE == null) {
              this.invoiceForm.controls.billofladingdate.setValue(null);
            }
            else {
              this.invoiceForm.controls.billofladingdate.setValue(new Date(this.invoicedata[0].BILLOFLADINGDATE));
            }
            this.invoiceForm.controls.endUser.setValue(this.invoicedata[0].NOTIFYENDUSEREMAILID);
            // this.invoiceForm.controls.attachments.setValue(this.invoicedata[0].ACTUALFILENAME);
            if (this.invoicedata[0].ACTUALFILENAME != null || this.invoicedata[0].ACTUALFILENAME != '') {
              this.invoiceForm.get('attachments').setValidators(null);
              this.invoiceForm.controls['attachments'].updateValueAndValidity();
            }
            if (this.invoicedata[0].IRNNUMBER != null) {
              this.invoice = false;
              this.invoiceForm.controls.irnNo.setValue(this.invoicedata[0].IRNNUMBER);
              this.invoiceForm.controls.irnDate.setValue(new Date(this.invoicedata[0].IRNDATE));
            }
            else {
              this.invoice = true
              this.invoiceForm.controls.irnNo.setValue(null);
              this.invoiceForm.controls.irnDate.setValue(null);
            }

            this.viewAttachmentName = this.invoicedata[0].ACTUALFILENAME;
            console.log("this.ArrayOfSelectedFilename this.invoicedata[0].TOTALAMOUNT ", this.invoicedata[0].TOTALAMOUNT);
            // this.viewAttachmentName = this.viewAttachmentName.toString();
            // this.invoiceForm.controls.attachments.reset(
            // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
            this.actualresubmitfilename = this.invoicedata[0].ACTUALFILENAME;
            this.savedresubmitfilename = this.invoicedata[0].SAVEDFILENAME;

            // this.actualfilenameofwopo = this.withoutpodetails[x].MULTIACTUALFILENAME;
            // this.savedfilenameofwopo = this.withoutpodetails[x].MULTISAVEDFILENAME;
            // this.savedfilenameofresubmit = this.invoicedata[0].MULTIACTUALFILENAME;
            if (this.invoicedata[0].MULTIACTUALFILENAME != null) {
              var array = this.invoicedata[0].MULTIACTUALFILENAME.split(',');
              this.suppindividualactualname = [];
              for (var k = 0; k < array.length; k++) {
                this.suppindividualactualname.push(array[k]);
              }
              this.ArrayOfSelectedFile = [];
              this.ArrayOfSelectedFilename = this.suppindividualactualname;
              this.filecount = this.ArrayOfSelectedFilename.length;
              console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
              var array1 = this.invoicedata[0].MULTISAVEDFILENAME.split(',');
              this.suppindividualsavedname = [];
              for (var k = 0; k < array1.length; k++) {
                this.suppindividualsavedname.push(array1[k]);
              }
              this.ArrayOfSelectedSavedFile = [];
              this.ArrayOfSelectedSavedFile = this.suppindividualsavedname;

              console.log("this.ArrayOfSelectedSavedFile ", this.ArrayOfSelectedSavedFile);
            }
            // var array1 = this.invoicedata[x].SUPPORTSAVEDFILENAME.split(',');
            // this.individualsavedname = [];
            // for (var k = 0; k < array1.length; k++) {
            //   this.individualsavedname1.push(array1[k]);
            // }
            // this.ArrayOfSelectedSavedFile = [];
            // this.ArrayOfSelectedSavedFile = this.individualsavedname1;

            // console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
            // this.invoiceForm.controls.remarks.setValue(this.invoicedata[0].VENDORREMARKS);
            // For return 
            this.invoiceForm.controls.remarks.setValue(this.invoicedata[0].VENDORREMARKS);
            this.remarklength = 160 - this.invoicedata[0].VENDORREMARKS.length
            this.invoiceForm.controls.TotalinctaxAmount.setValue(this.invoicedata[0].TOTALAMTINCTAXES);
            this.invoiceForm.controls.taxAmount.setValue(this.invoicedata[0].TAXAMOUNT)

            // this.invoiceForm.controls.attachments.setValue(this.invoicedata[0].ACTUALFILENAME);
            console.log("this.invoiceForm.controls.attachments");
          }
        });
        // }
        if (this.simpoSelectedPo.length > 0) {
          // this.trackOrderListService.getMultiPoLineItemDetailForVendor(this.invNo, this.multiPOFinalList).subscribe(res => {
          this.purchaseOrderListService.simpoEventDetails(this.simpoSelectedPo).subscribe(res => {
            this.posimponewList = res[0].poData;
            // if (this.posimponewList.length > 0) {
            this.posimponewList = this.posimponewList.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
            console.log(this.uniquelineitems.length, 'this.uniquelineitems.length');
            for (let m = 0; m < this.uniquelineitems.length; m++) {
              // this.invoiceForm.addControl('orderValue' + m, this.fb.control(''))
              // this.invoiceForm.addControl('orderValuesimpo' + m, this.fb.control(''))
              for (let a = 0; a < this.simpoSelectedPo.length; a++) {

                for (let i = 0; i < this.posimponewList.length; i++) {

                  if (this.uniquelineitems[m].uniquelineitems != null) {
                    this.uniquelineitems[m].TOTALCALCULATEAMOUNT = Number(parseFloat(this.uniquelineitems[m].ACCEPTEDQTY) * parseFloat(this.uniquelineitems[m].RATEPERQTY));
                  }
                  if (this.uniquelineitems[m].GRNNUMBER == null) {
                    this.uniquelineitems[m].TOTALCALCULATEAMOUNT = Number(parseFloat(this.uniquelineitems[m].QUANTITY) * parseFloat(this.uniquelineitems[m].RATEPERQTY));
                  }
                  this.invoiceForm.addControl('calRealtimesimpo' + a + i, this.fb.control(0))
                  this.invoiceForm.addControl('overallsimpoAmount' + a, this.fb.control(0))
                  this.invoiceForm.addControl('inputBalanceQuantitysimpo' + a, this.fb.control(0))
                  this.invoiceForm.addControl('orderValuesimpo' + a + i, this.fb.control(''))
                  console.log(this.invoiceForm, '(this.invoiceForm');

                  if ((this.uniquelineitems[m].PO_NUMBER == this.posimponewList[i].PO_NUMBER) && (this.uniquelineitems[m].LINEITEMNUMBER == this.posimponewList[i].LINEITEMNUMBER)) {
                    if (this.uniquelineitems[m].FORECLOSESTATUSCHECK != null) {

                      this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(0);
                    }
                    else {
                      this.invoiceForm.controls['orderValuesimpo' + a + i].setValue(this.posimponewList[i].QUANTITY);

                    }
                  }

                  //this.calculatesimpo(a, i, this.uniquelineitems[m].RATEPERQTY);
                }
              }
            }
            this.trackOrderListService.getMultiPoLineItemDetailForVendor(this.invNo, this.simpoSelectedPo).subscribe(res => {
              this.simpoinvoicedata = res[0].poData;

              for (let a = 0; a < this.simpoSelectedPo.length; a++) {

                for (let n = 0; n < this.simpoinvoicedata.length; n++) {

                  for (let k = 0; k < this.posimponewList.length; k++) {

                    console.log(k, 'posimponewList')
                    console.log(this.simpoSelectedPo[a], 'this.simpoSelectedPo[a]');
                    console.log(this.posimponewList[k].PO_NUMBER, 'this.posimponewList[k].PO_NUMBER')
                    if (this.simpoSelectedPo[a] == this.posimponewList[k].PO_NUMBER) {
                      console.log(a, 'simpoSelectedPo')
                      console.log(n, 'simpoinvoicedata')

                      console.log(this.simpoSelectedPo[a], 'this.simpoSelectedPo[a]')
                      console.log(this.simpoinvoicedata[n].PO_NUMBER, 'this.simpoinvoicedata[n].PO_NUMBER')
                      if ((this.simpoinvoicedata[n].PO_NUMBER == this.posimponewList[k].PO_NUMBER)
                        && (this.simpoinvoicedata[n].LINEITEMNUMBER == this.posimponewList[k].LINEITEMNUMBER)) {
                        this.invoiceForm.controls['orderValuesimpo' + a + k].setValue(this.simpoinvoicedata[n].QUANTITY);
                        this.calculatesimpo(a, k, this.posimponewList[k].RATEPERQTY)
                        break;
                      }
                    }

                  }
                }
              }
            });

            // console.log("this.posimponewList ==>", this.posimponewList);
            // if (this.posimponewList[0].IRNNUMBER != null || this.posimponewList[0].IRNNUMBER != "") {
            //   this.invoice = false;
            //   this.irnNumber = this.posimponewList[0].IRNNUMBER;
            // }
            // else {
            //   this.invoice = true
            //   this.irnNumber = null;
            // }

            // var invoicedate = new Date(this.uniquelineitems[0].INVOICEDATE)
            // this.invoiceForm.controls.invoiceNo.setValue(this.invNo);
            // this.invoiceForm.controls.invoiceDate.setValue(new Date(this.uniquelineitems[0].INVOICEDATE));
            // if (this.mindate < invoicedate) {
            //   this.disable = true;
            // }
            // else {
            //   this.disable = false;
            // }
            // this.invoiceForm.controls.description.setValue(this.uniquelineitems[0].DESCRIPTION);
            // if (this.uniquelineitems[0].BILLOFLADINGDATE == null) {
            //   this.invoiceForm.controls.billofladingdate.setValue(null);
            // }
            // else {
            //   this.invoiceForm.controls.billofladingdate.setValue(new Date(this.uniquelineitems[0].BILLOFLADINGDATE));
            // }
            // // this.invoiceForm.controls.attachments.setValue(this.posimponewList[0].ACTUALFILENAME);
            // if (this.uniquelineitems[0].ACTUALFILENAME != null || this.uniquelineitems[0].ACTUALFILENAME != '') {
            //   this.invoiceForm.get('attachments').setValidators(null);
            //   this.invoiceForm.controls['attachments'].updateValueAndValidity();
            // }
            // if (this.uniquelineitems[0].IRNNUMBER != null) {
            //   this.invoice = false;
            //   this.invoiceForm.controls.irnNo.setValue(this.uniquelineitems[0].IRNNUMBER);
            //   this.invoiceForm.controls.irnDate.setValue(new Date(this.uniquelineitems[0].IRNDATE));
            // }
            // else {
            //   this.invoice = true
            //   this.invoiceForm.controls.irnNo.setValue(null);
            //   this.invoiceForm.controls.irnDate.setValue(null);
            // }

            // this.viewAttachmentName = this.uniquelineitems[0].ACTUALFILENAME;
            // console.log("this.ArrayOfSelectedFilename this.uniquelineitems[0].TOTALAMOUNT ", this.uniquelineitems[0].TOTALAMOUNT);
            // // this.viewAttachmentName = this.viewAttachmentName.toString();
            // // this.invoiceForm.controls.attachments.reset(
            // // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
            // this.actualresubmitfilename = this.uniquelineitems[0].ACTUALFILENAME;
            // this.savedresubmitfilename = this.uniquelineitems[0].SAVEDFILENAME;

            // this.actualfilenameofwopo = this.withoutpodetails[x].MULTIACTUALFILENAME;
            // this.savedfilenameofwopo = this.withoutpodetails[x].MULTISAVEDFILENAME;
            // this.savedfilenameofresubmit = this.uniquelineitems[0].MULTIACTUALFILENAME;
            if (this.uniquelineitems[0].MULTIACTUALFILENAME != null) {
              var array = this.uniquelineitems[0].MULTIACTUALFILENAME.split(',');
              this.suppindividualactualname = [];
              for (var k = 0; k < array.length; k++) {
                this.suppindividualactualname.push(array[k]);
              }
              this.ArrayOfSelectedFile = [];
              this.ArrayOfSelectedFilename = this.suppindividualactualname;
              this.filecount = this.ArrayOfSelectedFilename.length;
              console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
              var array1 = this.uniquelineitems[0].MULTISAVEDFILENAME.split(',');
              this.suppindividualsavedname = [];
              for (var k = 0; k < array1.length; k++) {
                this.suppindividualsavedname.push(array1[k]);
              }
              this.ArrayOfSelectedSavedFile = [];
              this.ArrayOfSelectedSavedFile = this.suppindividualsavedname;

              console.log("this.ArrayOfSelectedSavedFile ", this.ArrayOfSelectedSavedFile);
            }
            // var array1 = this.uniquelineitems[x].SUPPORTSAVEDFILENAME.split(',');
            // this.individualsavedname = [];
            // for (var k = 0; k < array1.length; k++) {
            //   this.individualsavedname1.push(array1[k]);
            // }
            // this.ArrayOfSelectedSavedFile = [];
            // this.ArrayOfSelectedSavedFile = this.individualsavedname1;

            // console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
            // this.invoiceForm.controls.remarks.setValue(this.uniquelineitems[0].VENDORREMARKS);
            // For return 
            // this.invoiceForm.controls.remarks.setValue(this.uniquelineitems[0].VENDORREMARKS);

            // this.invoiceForm.controls.attachments.setValue(this.posimponewList[0].ACTUALFILENAME);
            console.log("this.invoiceForm.controls.attachments");
            // }
          });
        }

      }
    });

  }
  getSubmission() {
    let amount = 0;
    let amt;
    if (sessionStorage.getItem("invsubmissionorderDetails")) {
      this.orderlineitems = JSON.parse(sessionStorage.getItem("invsubmissionorderDetails"));
      this.uniquelineitems = JSON.parse(sessionStorage.getItem("invsubmissionDetails"));
      console.log("this.uniquelineitems ===>", this.uniquelineitems);
      if (this.uniquelineitems.length > 0) {
        this.ponumber = this.uniquelineitems[0].PO_NUMBER;
        this.mindate = new Date(this.uniquelineitems[0].PODATE);
        console.log("this.ponumber =>" + this.ponumber);
        if (this.uniquelineitems[0].lineType == 'LineItemDelivery') {
          this.showSingleDelivery = true;
          for (let i = 0; i < this.orderlineitems.length; i++) {
            amount = amount + Number(Number(this.orderlineitems[i].AMOUNT).toString().replace(/,/g, ''));
            amt = amount.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            amt = amt.toString();
          }
          this.invoiceForm.controls['TotalinctaxAmount'].setValue(amt)
        }
        else if (this.uniquelineitems[0].lineType == 'orderItemfordelivery') {
          this.showSingleSubmit = true;
          for (let i = 0; i < this.orderlineitems.length; i++) {
            amount = amount + Number(Number(this.orderlineitems[i].AMOUNT).toString().replace(/,/g, ''));
            amt = amount.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            amt = amt.toString();
            console.log("this.orderlineitems[i].AMOUNT " + this.orderlineitems[i].AMOUNT);
          }

          this.invoiceForm.controls['TotalinctaxAmount'].setValue(amt)
        }
        else {
          console.log("in multiple");
          this.uniquelineitems = JSON.parse(sessionStorage.getItem("invsubmissionDetails"));
          this.orderlineitems = JSON.parse(sessionStorage.getItem("invallDetails"));
          this.ponumber = this.uniquelineitems[0].PO_NUMBER;
          this.showMultipleSubmit = true;
          for (let i = 0; i < this.orderlineitems.length; i++) {
            amount = amount + Number(Number(this.orderlineitems[i].AMOUNT).toString().replace(/,/g, ''));
            amt = amount.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            amt = amt.toString();
          }
          this.invoiceForm.controls['TotalinctaxAmount'].setValue(amt)
        }
        for (let i = 0; i < this.uniquelineitems.length; i++) {
          this.uniquelineitems[i].AMOUNT = Number(this.uniquelineitems[i].AMOUNT).toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
          this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
          this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
          this.overallAmount += this.uniquelineitems[i].TOTALAMOUNT
          if (this.part) {
            this.invoiceForm.addControl('orderValue' + i, this.fb.control(''))
            this.invoiceForm.addControl('orderValuesimpo' + i, this.fb.control(''))
          }
          console.log("this.uniquelineitems[i].AMOUNT " + this.uniquelineitems[i].AMOUNT);
        }
      }
    }
  }
  getPOitems(POnumber) {

    this.uniquelineitems = [];
    this.uniquelineitem = [];
    sessionStorage.setItem("poNumber", POnumber);
    console.log("in here");
    this.purchaseOrderListService.getPODetails(POnumber).subscribe(res => {
      this.uniquelineitems = res[0].poData;
      this.remainingLinewItems = this.uniquelineitems;
      console.log("remainingLinewItems", this.remainingLinewItems);
      for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {
        this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
        this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)

        this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
        this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
        console.log("this.lineitemnumberlist " + this.lineitemnumberlist);
        console.log(" this.quantitylist " + this.quantitylist);
        if (this.full) {
          this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
          this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
        }
        this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
        // this.invoiceForm.addControl('orderValuesimpo' + i, this.fb.control(0))
        this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
        // this.invoiceForm.addControl('calRealtimesimpo' + i, this.fb.control(0))
      }
      if ((this.totalBalQty == 0 || this.totalBalQty == 0.0) && this.tobeinvoicelist.length == 0 && this.TypeNo != 'reopen') {
        console.log("problem here");
        this.disable = true;
        this.errormessage = "* Can't submit invoice total balance quantity = 0";
      }
      console.log("call form Total Balance Quantity==============>", this.totalBalQty);
      for (var j = 0; j < this.poDetail.length; j++) {
        console.log("this.poDetail[j]", this.poDetail[j]);
        if (this.poDetail[j].ORDERNUMBER == null) {
          this.uniquelineitems.push(this.poDetail[j]);
          this.balQtyList.push(this.poDetail[j].BALANCE_QTY)
          console.log("teest", this.poDetail[j].BALANCE_QTY);

        }
      }

      console.log("this.uniquelineitems======>>>", this.uniquelineitems);
      this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
        if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
          return 1;
        }

        if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
          return -1;
        }

        return 0;
      });
      console.log("this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems))
     
      sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
      console.log("Lineitemtext ", this.poDetail)
      for (var i = 0; i < this.poDetail.length; i++) {
        this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
      }
      console.log("this.lineitemnumber. " + this.lineitemnumber);
      var mySet = new Set(this.lineitemnumber);
      mySet.forEach(v => this.lineitemnumberset.push(v));
      console.log("Set items this.lineitemnumberset ==>" + this.lineitemnumberset);

      console.log(removeDuplicates(res[0].poData, 'LINEITEMNUMBER'));
      localStorage.setItem("PLANTNO",res[0].poData[0].PLANT)
      this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      return true;
    })
    const removeDuplicates = (array, key) => {
      return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
      }, []);
    };
  }


  initAccNested(e, option, lineitemnumber, ponumber) {
    this.showerror = false;
    let elem = '.Basicaccordion';
    option = true;
    console.log("Lineitem", this.Lineitem);

    if (true) {
      console.log("Clicked ____________________================================================================================================================")
      const element = e.target as Element;
      if (!element.matches(elem + ' .Accordionbtnclick')) return;

      else {
        if (!(<HTMLInputElement>e.target).parentElement.parentElement.classList.contains('active')) {
          console.log('*********************** inside 1');
          $(".Basicaccordion-container.active").removeClass("active");
          (<HTMLInputElement>e.target).parentElement.parentElement.classList.add('active');
          console.log('*********************** inside 4');

        } else {
          (<HTMLInputElement>e.target).parentElement.parentElement.classList.remove('active');
          console.log('*********************** inside else ');

        }
      }
    }

    this.Lineitem = [];
    this.valueininr = [];
    console.log("option is here ", option, "++++lineitemnumber+++++", lineitemnumber, "xxxponumberxxxxxxxx", ponumber);
    console.log("this.polist ==> " + this.poDetail);
    for (var k = 0; k < this.poDetail.length; k++) {
      // }
      if (this.poDetail[k].ORDERNUMBER != null &&
        this.poDetail[k].PO_NUMBER == ponumber &&
        this.poDetail[k].LINEITEMNUMBER == lineitemnumber) {
        this.Lineitem.push(this.poDetail[k]);
      }
    }
    this.Lineitem = this.Lineitem.sort((d, e) => {
      if (d.ORDERNUMBER > e.ORDERNUMBER) {
        return 1;
      }

      if (d.ORDERNUMBER < e.ORDERNUMBER) {
        return -1;
      }
      return 0;
    });
    console.log("this.Lineitem" + JSON.stringify(this.Lineitem), 'Lineitem**********************');
    console.log("this.Lineitem count" + JSON.stringify(this.Lineitem.length), 'Lineitem.length**********************');
    for (var j = 0; j < this.Lineitem.length; j++) {
      console.log("nub1", Number(this.Lineitem[j].QUANTITY))
      this.valueininr.push(Number(this.Lineitem[j].QUANTITY) * Number(this.Lineitem[j].RATEPERQTY))
    }
    console.log("this.valueininr ==>" + this.valueininr);
    console.log("this.valueininr.length ==>" + this.valueininr.length);
  }

  calculateItemAmount(indexval, DQty, Rate) {
    this.finalAmount = DQty * Rate;
    let totalAmount = 0
    this.TotalItemAmount = 0;
    let a = 0;
    $('#itemAmount' + indexval).val(this.finalAmount);
    for (var k = 0; k < this.uniquelineitems.length; k++) {
      if ($('#itemAmount' + k).val() > 0) {
        totalAmount = parseFloat(this.TotalItemAmount) + parseFloat($('#itemAmount' + k).val())
      }
      console.log("totalaamount here =>" + totalAmount);

      this.TotalItemAmount = totalAmount
    }
    if (this.TotalItemAmount == 0) {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue(null);
    }
    else {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue(parseFloat(this.TotalItemAmount).toFixed(2));
    }

  }


  submitinvoice() {
    if (this.posimponewList.length != 0) {
      console.log("why ??", this.invoiceForm.status, this.invoiceForm.value);
      if (this.part) {
        if (this.invoiceForm.controls['totalOrderQty'].value == 0) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'Please enter quantity for atleast one line item',
            condition: 'success',
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
            this.router.navigate(['/trackInvoiceList']);
          });
          return false;
        }

      }
      this.loaderservice.show();
      console.log("values here ==>", this.invoiceForm);
      console.log(this.uniquelineitems.length);
      console.log("this.part " + this.part);
      if (this.part || this.TypeNo == 'resubmit') {
        this.quantitylist = [];
        this.lineitemnumberlist = [];
        this.poSimpoUniquelineitem = [];
        console.log("this.posimponewList", this.posimponewList)
        console.log("this.uniquelineitem og", this.uniquelineitems);
        // this.uniquelineitems.push(this.posimponewList);

        for (let r = 0; r < this.uniquelineitems.length; r++) {
          this.uniquelineitems[r].QUANTITY = $('#inputQty' + r).val();
          this.uniquelineitems[r].INVOICEAMOUNT = this.invoiceForm.controls['calRealtime' + r].value
          // else{
          //   this.uniquelineitems[0].QUANTITY = $('#inputQtysimpo' + r).val()
          // }
        }
        for (let u = 0; u < this.uniquelineitems.length; u++) {
          this.poSimpoUniquelineitem.push(this.uniquelineitems[u]);
        }
        console.log(this.uniquelineitems);
        console.log(this.poSimpoUniquelineitem);
        // if(this.multiPOFinalList.length > 0)
        // {
        //   this.simpoSelectedPo = this.multiPOFinalList;
        // }
        for (let p = 0; p < this.simpoSelectedPo.length; p++) {
          for (let q = 0; q < this.posimponewList.length; q++) {
            if (this.posimponewList[q].PO_NUMBER == this.simpoSelectedPo[p]) {
              this.posimponewList[q].QUANTITY = $('#inputQtysimpo' + p + q).val();
              this.posimponewList[q].INVOICEAMOUNT = this.invoiceForm.controls['calRealtimesimpo' + p + q].value;
              this.poSimpoUniquelineitem.push(this.posimponewList[q]);
            }

            // else{
            //   this.uniquelineitems[0].QUANTITY = $('#inputQtysimpo' + r).val()
            // }
          }

        }

        // for(let z= 0; z<this.posimponewList.length ; z++){
        // }
        // this.uniquelineitems = this.uniquelineitems.concat(this.posimponewList);
        console.log("this.uniquelineitem ogg", this.uniquelineitems);


        console.log("this.uniquelineitems.length new", this.uniquelineitems.length)
        // for (let a = 0; a < this.uniquelineitems.length; a++) {
        //   if (this.invoiceForm.controls['orderValue' + a].value == null || this.invoiceForm.controls['orderValue' + a].value == '') {
        //     this.invoiceForm.controls['orderValue' + a].setValue(0);

        //   }

        //   this.quantitylist.push(this.invoiceForm.controls['orderValue' + a].value);
        //   this.lineitemnumberlist.push(this.uniquelineitems[a].LINEITEMNUMBER);
        // }

        // for (let a = 0; a < this.posimponewList.length; a++) {
        //   if (this.invoiceForm.controls['orderValuesimpo' + a].value == null || this.invoiceForm.controls['orderValuesimpo' + a].value == '') {
        //     this.invoiceForm.controls['orderValuesimpo' + a].setValue(0);

        //   }

        //   this.quantitylist.push(this.invoiceForm.controls['orderValuesimpo' + a].value);
        //   this.lineitemnumberlist.push(this.uniquelineitems[a].LINEITEMNUMBER);
        // }
      }
      console.log("is it updating============>", this.quantitylist);
      console.log("this.lineitemnumberlist next", this.lineitemnumberlist);
      console.log("this.uniquelineitems next", this.uniquelineitems);
      this.simpouniquelineitems = [];
      var data = ""
      for (let p = 0; p < this.poSimpoUniquelineitem.length; p++) {
        if (this.poSimpoUniquelineitem[p].QUANTITY == undefined || this.poSimpoUniquelineitem[p].QUANTITY == "") {
          this.poSimpoUniquelineitem[p].QUANTITY = 0;
        }
        data = this.poSimpoUniquelineitem[p].PO_NUMBER + "," + this.poSimpoUniquelineitem[p].LINEITEMNUMBER + ","
          + this.poSimpoUniquelineitem[p].QUANTITY;
        console.log(data);
        this.simpouniquelineitems.push(data);
      }
      console.log(this.simpouniquelineitems);


      if ((this.viewUploadFile != null && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
        (this.withoutpodetails.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
        (this.invoicedata.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "")) {
        console.log("inininin");
        if (this.TypeNo == 'resubmit') {
          // this.trackOrderListService.getVendorReturn(this.ponumber, this.invNo).subscribe(res => {

          // });
          this.trackOrderListService.getVendorReturnforsimpo(this.simpoSelectedPo, this.invNo).subscribe(res => {

          });
        }
        this.purchaseOrderListService.createCustomDeliveryItemsForSimpo(this.simpouniquelineitems).subscribe(res => {

          if (res[0].message == "Success") {

            this.loaderservice.show();
            var dcnlist: any = [];
            this.dcNumberList = [];
            dcnlist = res[0].dcnvalues;
            console.log("dcnlist", dcnlist);
            // res[0].dcnvalues.forEach(element => {
            //   dcnlist.push(element)
            // });
            for (let p = 0; p < dcnlist.length; p++) {
              data = dcnlist[p].PONUMBER + "," + dcnlist[p].DCNNUM;
              console.log(data);
              this.dcNumberList.push(data);
            }
            this.purchaseOrderListService.getOrderHavingDcnForSimpo(this.dcNumberList).subscribe(res1 => {
              console.log("return========>", res1[0].message, res1[0].orderitems);

              this.orderlineitems = res1[0].orderitems;
              this.nullQuantityList = [];
              this.nullDcList = [];
              this.simpoinvoicesubmissionarray = [];
              this.finalInvoiceList = [];
              // console.log(this.uniquelineitems, 'this.uniquelineitems.length');
              // console.log(this.orderlineitems, 'this.orderlineitems.length');
              for (var k = 0; k < this.orderlineitems.length; k++) {
                // if (this.invoiceForm.controls['orderValuesimpo' + k].value > 0)
                //   this.quantitylist.push(this.invoiceForm.controls['orderValuesimpo' + k].value);
                this.poSimpoUniquelineitem[k].ORDERNUMBER = this.orderlineitems[k].DC;
                this.poSimpoUniquelineitem[k].QUANTITY = this.orderlineitems[k].QUANTITY;
                var nullDc = "";
                if (this.orderlineitems[k].QUANTITY == '0' || this.orderlineitems[k].QUANTITY == '0.000') {
                  // .push(this.orderlineitems[k].DC)
                  nullDc = this.orderlineitems[k].PONUMBER + "," + this.orderlineitems[k].DC;
                  this.nullDcList.push(nullDc);
                }
              }
              for (let h = 0; h < this.poSimpoUniquelineitem.length; h++) {
                if (this.poSimpoUniquelineitem[h].QUANTITY != '0') {
                  this.nullQuantityList.push(this.poSimpoUniquelineitem[h])
                }
              }
              console.log("this.nullQuantityList---", this.nullQuantityList)
              console.log("this.nullDCN", this.nullDcList)
              if (this.multiplefilechanged == true) {
                for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                  if (c == 0) {
                    this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
                  } else {
                    this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                  }
                }
                for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                  if (x == 0) {
                    this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
                  } else {
                    this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                  }
                }
                this.multipleactualfilename = this.customDelivery.multipleactualfilename
                this.multiplesavedfilename = this.customDelivery.multiplesavedfilename
                console.log("this.uniquelineitems.multipleactualfilename ", this.multipleactualfilename);
                console.log("this.uniquelineitems.multiplesavedfilename ", this.multiplesavedfilename);
              }
              console.log("this.uniquelineitems >>", this.uniquelineitems);
              console.log("this.customDelivery >>", this.customDelivery);
              this.poSimpoUniquelineitem = [];
              for (let t = 0; t < this.nullQuantityList.length; t++) {
                this.poSimpoUniquelineitem.push(this.nullQuantityList[t]);
              }
              console.log("this.poSimpoUniquelineitem >>", this.poSimpoUniquelineitem);
              for (var l = 0; l < this.poSimpoUniquelineitem.length; l++) {
                this.customDelivery = new customDelivery();
                this.customDelivery.bid = this.poSimpoUniquelineitem[l].BUSINESSPARTNEROID;
                this.customDelivery.po_num = this.poSimpoUniquelineitem[l].PO_NUMBER;
                this.customDelivery.irnNumber = '';
                this.customDelivery.irnDate = null;
                this.customDelivery.invoiceNumber = this.invoiceForm.controls['invoiceNo'].value.trim();
                this.customDelivery.invoiceDate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY");
                this.customDelivery.rateperquantity = this.poSimpoUniquelineitem[l].RATEPERQTY;
                console.log(this.poSimpoUniquelineitem[l].SERVICENUMBER, 'this.poSimpoUniquelineitem[l].SERVICENUMBER-----------------------------')
                this.customDelivery.servicenumber = this.poSimpoUniquelineitem[l].SERVICENUMBER;
                this.customDelivery.lineItemNumber = this.poSimpoUniquelineitem[l].LINEITEMNUMBER;
                this.customDelivery.lineitemtext = this.poSimpoUniquelineitem[l].LINEITEMTEXT;
                this.customDelivery.orderNumber = this.poSimpoUniquelineitem[l].ORDERNUMBER;
                // this.customDelivery.beforesubmissioninvoicenumber = '';
                if (this.TypeNo == 'resubmit') {
                  console.log(this.invoicedata[0].BUYER);
                  console.log(this.invoicedata[0].REQUSITIONER);
                  console.log(this.invoicedata[0].BUSSINESSPARTNERTEXT);
                  this.customDelivery.beforesubmissioninvoicenumber = this.invNo;
                  this.customDelivery.businessPartnerText = this.invoicedata[0].BUSSINESSPARTNERTEXT;
                  this.customDelivery.contactPerson = this.invoicedata[0].REQUSITIONER;
                  this.customDelivery.buyerid = this.invoicedata[0].BUYER;
                } else {
                  this.customDelivery.beforesubmissioninvoicenumber = "";
                  this.customDelivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
                  this.customDelivery.contactPerson = sessionStorage.getItem("Requisitioner");
                  this.customDelivery.buyerid = sessionStorage.getItem("Buyer");
                }
                console.log(this.customDelivery.businessPartnerText, ' this.customDelivery.businessPartnerText')
                this.customDelivery.quantity = this.poSimpoUniquelineitem[l].QUANTITY;
                this.customDelivery.uOM = this.poSimpoUniquelineitem[l].UNITOFMEASURE;
                this.customDelivery.contactPersonPhone = this.poSimpoUniquelineitem[l].CONTACTPERSONPHONE;
                this.customDelivery.vendorID = this.vendorid;
                this.customDelivery.company = this.poSimpoUniquelineitem[l].COMPANY;
                this.customDelivery.plant = this.poSimpoUniquelineitem[l].PLANT;
                this.customDelivery.department = null;
                this.customDelivery.storagelocation = this.poSimpoUniquelineitem[l].STORAGELOCATION;
                // this.customDelivery.storagelocation = null;
                this.customDelivery.costCentre = null;
                this.customDelivery.category = null;
                this.customDelivery.profileID = '';
                this.customDelivery.invoiceDocumentPath = '';
                this.customDelivery.iGSTAmount = '';
                this.customDelivery.cGSTAmount = '';
                this.customDelivery.sgstAmount = '';
                this.customDelivery.grnnumber = '-';
                this.customDelivery.uniquereferencenumber = '-';
                this.customDelivery.saplineitemnumber = '-';
                this.customDelivery.srcnnumber = '-';
                this.customDelivery.totalAmount = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '');
                this.customDelivery.description = this.invoiceForm.controls['description'].value;
                this.customDelivery.remark = this.invoiceForm.controls['remarks'].value;
                this.customDelivery.totalamtinctaxes = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '')
                this.customDelivery.taxamount = (this.invoiceForm.controls['taxAmount'].value).toString().replace(/,/g, '')
                this.customDelivery.status = 'P';
                this.customDelivery.actualfilename = this.actualfilename;
                this.customDelivery.savedfilename = this.savedfilename;
                this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");// this.ArrayOfSelectedFilename.toString().replace(/,/g, "");
                this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
                if (this.multiplefilechanged == false) {
                  for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                    if (c == 0) {
                      this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
                    } else {
                      this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                    }
                  }
                  for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                    if (x == 0) {
                      this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
                    } else {
                      this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                    }
                  }
                  this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");// this.ArrayOfSelectedFilename.toString().replace(/,/g, "");
                  this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");

                  console.log("this.uniquelineitems.multipleactualfilename ", this.multipleactualfilename);
                  console.log("this.uniquelineitems.multiplesavedfilename ", this.multiplesavedfilename);
                }
                this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
                if (this.invoicefilechanged == false) {

                  if (this.TypeNo == 'resubmit') {
                    this.customDelivery.actualfilename = this.actualresubmitfilename;
                    this.customDelivery.savedfilename = this.savedresubmitfilename;
                  }
                  else {
                    this.customDelivery.actualfilename = this.actualfilenameofwopo;
                    this.customDelivery.savedfilename = this.savedfilenameofwopo;
                  }

                }
                else {
                  this.customDelivery.actualfilename = this.actualfilename;
                  this.customDelivery.savedfilename = this.savedfilename;
                }

                this.customDelivery.material = this.poSimpoUniquelineitem[l].MATERIAL;
                this.customDelivery.createdby = sessionStorage.getItem("loginUser");
                this.customDelivery.managerid = "sachin.kale@timesgroup.com";
                if (this.invoiceForm.controls['billofladingdate'].value != null) {
                  this.customDelivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");

                }
                else {

                  this.customDelivery.billofladingdate = "Invalid date";
                }
                this.customDelivery.balance_qty = Number(this.poSimpoUniquelineitem[l].BALANCE_QTY);
                this.customDelivery.invoiceamount = this.poSimpoUniquelineitem[l].INVOICEAMOUNT;
                this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");// this.ArrayOfSelectedFilename.toString().replace(/,/g, "");
                this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");

                this.customDelivery.stage = "1";

                console.log("this.invoice--", this.invoice)
                if (this.invoice != true) {
                  console.log("this.invoiceForm.controls['irnNo'].value;", this.invoiceForm.controls['irnNo'].value)
                  this.customDelivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                  console.log("test date===========>", this.invoiceForm.controls['irnDate'].value);

                  this.customDelivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");

                }
                else {
                  this.customDelivery.irnNumber = "";
                  if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
                    this.customDelivery.irnDate = null;
                  }
                }
                this.customDelivery.notifyenduseremailiD = this.invoiceForm.controls['endUser'].value;
                console.log(this.customDelivery, 'customDelivery')
                this.finalInvoiceList.push(this.customDelivery);
                console.log(this.finalInvoiceList, 'finalInvoiceList')
              }
              this.simpoinvoicesubmissionarray = this.finalInvoiceList;
              console.log(this.poSimpoUniquelineitem);
              this.purchaseOrderListService.simpoSubmitInvoice(this.simpoinvoicesubmissionarray).subscribe(res => {
                sessionStorage.removeItem("invwopodetails");
                console.log("res[0].Uniquemessage--", res[0].Uniquemessage)
                if (res[0].message == "Success") {

                  this.purchaseOrderListService.deleteEmptyDeliveriesSimpo(this.nullDcList).subscribe(res => {

                    if (this.customDelivery.irnDate == null) {
                      if (res[0].message == "Success") {
                        this.loaderservice.hide();
                        const dialogConfig = new MatDialogConfig();

                        dialogConfig.data = {
                          message: 'Invoice has been submitted successfully.Please send the physical invoice as per process ',
                          condition: 'success',
                          page: 'invoicesubmit',
                          specific: 'confirmation'
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
                          this.router.navigate(['/trackInvoiceList']);
                        });
                      }
                    }
                    else if (res[0].message == "Success") {
                      this.loaderservice.hide();
                      const dialogConfig = new MatDialogConfig();

                      dialogConfig.data = {
                        message: 'Invoice has been submitted successfully.',
                        condition: 'success',
                        page: 'invoicesubmit',
                        specific: 'confirmation'
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
                        this.router.navigate(['/trackInvoiceList']);
                      });
                    }
                  });
                  console.log("Inin");
                  this.invoiceForm.reset();
                  this.viewAttachmentName = "";
                  if (this.invoiceForm.controls['irnDate'].value != null) {
                    this.successmessage = "Invoice has been submitted successfully. ";
                    this.success = true;
                  }
                  else {
                    this.successmessage = "Invoice has been submitted successfully Please send the physical invoice as per process";
                    this.success = true;
                  }
                }
                else {
                  this.loaderservice.hide();
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: res[0].Uniquemessage,
                    condition: 'error',
                    page: 'invoicesubmit',
                    specific: 'confirmation'
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
                  this.successmessage = res[0].Uniquemessage;
                  this.error = true;
                  console.log(this.uniquelineitems)
                  // this.invoiceForm.reset();
                  // this.viewAttachmentName = "";
                  // this.router.navigate(['/purchaseOrdersList']);

                }
                this.loaderservice.hide();
              });
            })
          }



        });
      }
      else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Please upload the File',
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


        this.loaderservice.hide();
        return false;
      }
    }
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'Please add atleast one PO',
        condition: 'success',
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
        // this.router.navigate(['/trackInvoiceList']);
      });
      return false;
    }
  }
  submitReopen() {

    if (this.posimponewList.length != 0) {
      console.log("why ??", this.invoiceForm.status, this.invoiceForm.value);
      if (this.part) {
        if (this.invoiceForm.controls['totalOrderQty'].value == 0) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'Please enter quantity for atleast one line item',
            condition: 'success',
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
            this.router.navigate(['/trackInvoiceList']);
          });
          return false;
        }

      }
      this.loaderservice.show();
      console.log("values here ==>", this.invoiceForm);
      console.log(this.uniquelineitems.length);
      console.log("this.part " + this.part);
      if (this.part || this.TypeNo == 'resubmit') {
        this.quantitylist = [];
        this.lineitemnumberlist = [];
        this.poSimpoUniquelineitem = [];
        console.log("this.posimponewList", this.posimponewList)
        console.log("this.uniquelineitem og", this.uniquelineitems);
        // this.uniquelineitems.push(this.posimponewList);

        for (let r = 0; r < this.uniquelineitems.length; r++) {
          this.uniquelineitems[r].QUANTITY = $('#inputQty' + r).val();
          this.uniquelineitems[r].INVOICEAMOUNT = this.invoiceForm.controls['calRealtime' + r].value
          // else{
          //   this.uniquelineitems[0].QUANTITY = $('#inputQtysimpo' + r).val()
          // }
        }
        for (let u = 0; u < this.uniquelineitems.length; u++) {
          this.poSimpoUniquelineitem.push(this.uniquelineitems[u]);
        }
        console.log(this.uniquelineitems);
        console.log(this.poSimpoUniquelineitem);
        // if(this.multiPOFinalList.length > 0)
        // {
        //   this.simpoSelectedPo = this.multiPOFinalList;
        // }
        for (let p = 0; p < this.simpoSelectedPo.length; p++) {
          for (let q = 0; q < this.posimponewList.length; q++) {
            if (this.posimponewList[q].PO_NUMBER == this.simpoSelectedPo[p]) {
              this.posimponewList[q].QUANTITY = $('#inputQtysimpo' + p + q).val();
              this.posimponewList[q].INVOICEAMOUNT = this.invoiceForm.controls['calRealtimesimpo' + p + q].value;
              this.poSimpoUniquelineitem.push(this.posimponewList[q]);
            }

            // else{
            //   this.uniquelineitems[0].QUANTITY = $('#inputQtysimpo' + r).val()
            // }
          }

        }

        // for(let z= 0; z<this.posimponewList.length ; z++){
        // }
        // this.uniquelineitems = this.uniquelineitems.concat(this.posimponewList);
        console.log("this.uniquelineitem ogg", this.uniquelineitems);


        console.log("this.uniquelineitems.length new", this.uniquelineitems.length)
        // for (let a = 0; a < this.uniquelineitems.length; a++) {
        //   if (this.invoiceForm.controls['orderValue' + a].value == null || this.invoiceForm.controls['orderValue' + a].value == '') {
        //     this.invoiceForm.controls['orderValue' + a].setValue(0);

        //   }

        //   this.quantitylist.push(this.invoiceForm.controls['orderValue' + a].value);
        //   this.lineitemnumberlist.push(this.uniquelineitems[a].LINEITEMNUMBER);
        // }

        // for (let a = 0; a < this.posimponewList.length; a++) {
        //   if (this.invoiceForm.controls['orderValuesimpo' + a].value == null || this.invoiceForm.controls['orderValuesimpo' + a].value == '') {
        //     this.invoiceForm.controls['orderValuesimpo' + a].setValue(0);

        //   }

        //   this.quantitylist.push(this.invoiceForm.controls['orderValuesimpo' + a].value);
        //   this.lineitemnumberlist.push(this.uniquelineitems[a].LINEITEMNUMBER);
        // }
      }
      console.log("is it updating============>", this.quantitylist);
      console.log("this.lineitemnumberlist next", this.lineitemnumberlist);
      console.log("this.uniquelineitems next", this.uniquelineitems);
      this.simpouniquelineitems = [];
      var data = ""
      for (let p = 0; p < this.poSimpoUniquelineitem.length; p++) {
        if (this.poSimpoUniquelineitem[p].QUANTITY == undefined || this.poSimpoUniquelineitem[p].QUANTITY == "") {
          this.poSimpoUniquelineitem[p].QUANTITY = 0;
        }
        data = this.poSimpoUniquelineitem[p].PO_NUMBER + "," + this.poSimpoUniquelineitem[p].LINEITEMNUMBER + ","
          + this.poSimpoUniquelineitem[p].QUANTITY;
        console.log(data);
        this.simpouniquelineitems.push(data);
      }
      console.log(this.simpouniquelineitems);


      if ((this.viewUploadFile != null && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
        (this.withoutpodetails.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
        (this.invoicedata.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "")) {
        console.log("inininin");
        if (this.TypeNo == 'reopen') {
          // this.trackOrderListService.getVendorReturn(this.ponumber, this.invNo).subscribe(res => {

          // });
          this.trackOrderListService.getVendorReturnforsimpo(this.simpoSelectedPo, this.invNo).subscribe(res => {

          });
        }
        this.purchaseOrderListService.createCustomDeliveryItemsForSimpo(this.simpouniquelineitems).subscribe(res => {

          if (res[0].message == "Success") {

            this.loaderservice.show();
            var dcnlist: any = [];
            this.dcNumberList = [];
            dcnlist = res[0].dcnvalues;
            console.log("dcnlist", dcnlist);
            // res[0].dcnvalues.forEach(element => {
            //   dcnlist.push(element)
            // });
            for (let p = 0; p < dcnlist.length; p++) {
              data = dcnlist[p].PONUMBER + "," + dcnlist[p].DCNNUM;
              console.log(data);
              this.dcNumberList.push(data);
            }
            this.purchaseOrderListService.getOrderHavingDcnForSimpo(this.dcNumberList).subscribe(res1 => {
              console.log("return========>", res1[0].message, res1[0].orderitems);

              this.orderlineitems = res1[0].orderitems;
              this.nullQuantityList = [];
              this.nullDcList = [];
              this.simpoinvoicesubmissionarray = [];
              this.finalInvoiceList = [];
              for (var k = 0; k < this.orderlineitems.length; k++) {
                this.poSimpoUniquelineitem[k].ORDERNUMBER = this.orderlineitems[k].DC;
                this.poSimpoUniquelineitem[k].QUANTITY = this.orderlineitems[k].QUANTITY;
                var nullDc = "";
                if (this.orderlineitems[k].QUANTITY == '0' || this.orderlineitems[k].QUANTITY == '0.000') {
                  // .push(this.orderlineitems[k].DC)
                  nullDc = this.orderlineitems[k].PONUMBER + "," + this.orderlineitems[k].DC;
                  this.nullDcList.push(nullDc);
                }
              }
              for (let h = 0; h < this.poSimpoUniquelineitem.length; h++) {
                if (this.poSimpoUniquelineitem[h].QUANTITY != '0') {
                  this.nullQuantityList.push(this.poSimpoUniquelineitem[h])
                }
              }
              console.log("this.nullQuantityList---", this.nullQuantityList)
              console.log("this.nullDCN", this.nullDcList)
              if (this.multiplefilechanged == true) {
                for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                  if (c == 0) {
                    this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
                  } else {
                    this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                  }
                }
                for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                  if (x == 0) {
                    this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
                  } else {
                    this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                  }
                }
                this.multipleactualfilename = this.customDelivery.multipleactualfilename.slice(0, -1);
                this.multiplesavedfilename = this.customDelivery.multiplesavedfilename.slice(0, -1);
                console.log("this.uniquelineitems.multipleactualfilename ", this.multipleactualfilename);
                console.log("this.uniquelineitems.multiplesavedfilename ", this.multiplesavedfilename);
              }
              console.log("this.uniquelineitems >>", this.uniquelineitems);
              console.log("this.customDelivery >>", this.customDelivery);
              this.poSimpoUniquelineitem = [];
              for (let t = 0; t < this.nullQuantityList.length; t++) {
                this.poSimpoUniquelineitem.push(this.nullQuantityList[t]);
              }
              console.log("this.poSimpoUniquelineitem >>", this.poSimpoUniquelineitem);
              for (var l = 0; l < this.poSimpoUniquelineitem.length; l++) {
                this.customDelivery = new customDelivery();
                this.customDelivery.bid = this.poSimpoUniquelineitem[l].BUSINESSPARTNEROID;
                this.customDelivery.po_num = this.poSimpoUniquelineitem[l].PO_NUMBER;
                this.customDelivery.irnNumber = '';
                this.customDelivery.irnDate = null;
                this.customDelivery.invoiceNumber = this.invoiceForm.controls['invoiceNo'].value.trim();
                this.customDelivery.invoiceDate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY");
                this.customDelivery.rateperquantity = this.poSimpoUniquelineitem[l].RATEPERQTY;
                console.log(this.poSimpoUniquelineitem[l].SERVICENUMBER, 'this.poSimpoUniquelineitem[l].SERVICENUMBER-----------------------------')
                this.customDelivery.servicenumber = this.poSimpoUniquelineitem[l].SERVICENUMBER;
                this.customDelivery.lineItemNumber = this.poSimpoUniquelineitem[l].LINEITEMNUMBER;
                this.customDelivery.lineitemtext = this.poSimpoUniquelineitem[l].LINEITEMTEXT;
                this.customDelivery.orderNumber = this.poSimpoUniquelineitem[l].ORDERNUMBER;
                // this.customDelivery.beforesubmissioninvoicenumber = '';
                if (this.TypeNo == 'resubmit') {
                  console.log(this.invoicedata[0].BUYER);
                  console.log(this.invoicedata[0].REQUSITIONER);
                  console.log(this.invoicedata[0].BUSSINESSPARTNERTEXT);
                  this.customDelivery.beforesubmissioninvoicenumber = this.invNo;
                  this.customDelivery.businessPartnerText = this.invoicedata[0].BUSSINESSPARTNERTEXT;
                  this.customDelivery.contactPerson = this.invoicedata[0].REQUSITIONER;
                  this.customDelivery.buyerid = this.invoicedata[0].BUYER;
                } else {
                  this.customDelivery.beforesubmissioninvoicenumber = "";
                  this.customDelivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
                  this.customDelivery.contactPerson = sessionStorage.getItem("Requisitioner");
                  this.customDelivery.buyerid = sessionStorage.getItem("Buyer");
                }


                // return;

                // this.customDelivery.businessPartnerText =this.poSimpoUniquelineitem[l].BUSINESSPARTNERTEXT;
                // this.customDelivery.businessPartnerText =sessionStorage.getItem('Bussinesspartnertext');
                console.log(this.customDelivery.businessPartnerText, ' this.customDelivery.businessPartnerText')
                // this.customDelivery.contactPerson = sessionStorage.getItem("Requisitioner");
                // this.customDelivery.buyerid = sessionStorage.getItem("Buyer");
                this.customDelivery.quantity = this.poSimpoUniquelineitem[l].QUANTITY;
                this.customDelivery.uOM = this.poSimpoUniquelineitem[l].UNITOFMEASURE;
                this.customDelivery.contactPersonPhone = this.poSimpoUniquelineitem[l].CONTACTPERSONPHONE;
                this.customDelivery.vendorID = this.vendorid;
                this.customDelivery.company = this.poSimpoUniquelineitem[l].COMPANY;
                this.customDelivery.plant = this.poSimpoUniquelineitem[l].PLANT;
                this.customDelivery.department = null;
                this.customDelivery.storagelocation = this.poSimpoUniquelineitem[l].STORAGELOCATION;
                // this.customDelivery.storagelocation = null;
                this.customDelivery.costCentre = null;
                this.customDelivery.category = null;
                this.customDelivery.profileID = '';
                this.customDelivery.invoiceDocumentPath = '';
                this.customDelivery.iGSTAmount = '';
                this.customDelivery.cGSTAmount = '';
                this.customDelivery.sgstAmount = '';
                this.customDelivery.grnnumber = '-';
                this.customDelivery.uniquereferencenumber = '-';
                this.customDelivery.saplineitemnumber = '-';
                this.customDelivery.srcnnumber = '-';
                this.customDelivery.totalAmount = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '');
                this.customDelivery.description = this.invoiceForm.controls['description'].value;
                this.customDelivery.remark = this.invoiceForm.controls['remarks'].value;
                this.customDelivery.totalamtinctaxes = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '')
                this.customDelivery.taxamount = (this.invoiceForm.controls['taxAmount'].value).toString().replace(/,/g, '')
                this.customDelivery.status = 'P';
                // this.customDelivery.actualfilename = this.actualfilename;
                // this.customDelivery.savedfilename = this.savedfilename;

                if (this.invoicefilechanged == false) {

                  if (this.TypeNo == 'resubmit') {
                    this.customDelivery.actualfilename = this.actualresubmitfilename;
                    this.customDelivery.savedfilename = this.savedresubmitfilename;
                  }
                  else {
                    this.customDelivery.actualfilename = this.actualfilenameofwopo;
                    this.customDelivery.savedfilename = this.savedfilenameofwopo;
                  }

                }
                else {
                  this.customDelivery.actualfilename = this.actualfilename;
                  this.customDelivery.savedfilename = this.savedfilename;
                }



                this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename.slice(0, -1);

                if (this.multiplefilechanged == true) {
                  for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                    if (c == 0) {
                      this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
                    } else {
                      this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                    }
                  }
                  for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                    if (x == 0) {
                      this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
                    } else {
                      this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                    }
                  }
                  this.multipleactualfilename = this.customDelivery.multipleactualfilename.slice(0, -1);
                  //.slice(0, -1);
                  this.multiplesavedfilename = this.customDelivery.multiplesavedfilename.slice(0, -1);
                  // .slice(0, -1);
                  console.log("this.uniquelineitems.multipleactualfilename ", this.multipleactualfilename);
                  console.log("this.uniquelineitems.multiplesavedfilename ", this.multiplesavedfilename);
                }
                this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
                // if (this.invoicefilechanged == false) {

                //   if (this.TypeNo == 'reopen') {
                //     this.customDelivery.actualfilename = this.actualresubmitfilename;
                //     this.customDelivery.savedfilename = this.savedresubmitfilename;
                //   }
                //   else {
                //     this.customDelivery.actualfilename = this.actualfilenameofwopo;
                //     this.customDelivery.savedfilename = this.savedfilenameofwopo;
                //   }

                // }
                // else {
                //   this.customDelivery.actualfilename = this.actualfilename;
                //   this.customDelivery.savedfilename = this.savedfilename;
                // }

                this.customDelivery.material = this.poSimpoUniquelineitem[l].MATERIAL;
                this.customDelivery.createdby = sessionStorage.getItem("loginUser");
                this.customDelivery.managerid = "sachin.kale@timesgroup.com";
                if (this.invoiceForm.controls['billofladingdate'].value != null) {
                  this.customDelivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");

                }
                else {
                  this.customDelivery.billofladingdate = "Invalid date";
                }
                this.customDelivery.balance_qty = Number(this.poSimpoUniquelineitem[l].BALANCE_QTY);
                this.customDelivery.invoiceamount = this.poSimpoUniquelineitem[l].INVOICEAMOUNT;
                this.customDelivery.multiplesavedfilename = this.multiplesavedfilename.slice(0, -1);
                this.customDelivery.multipleactualfilename = this.multipleactualfilename.slice(0, -1);
                this.customDelivery.stage = "1";

                console.log("this.invoice--", this.invoice)
                if (this.invoice != true) {
                  console.log("this.invoiceForm.controls['irnNo'].value;", this.invoiceForm.controls['irnNo'].value)
                  this.customDelivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                  console.log("test date===========>", this.invoiceForm.controls['irnDate'].value);

                  this.customDelivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");

                }
                else {
                  this.customDelivery.irnNumber = "";
                  if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
                    this.customDelivery.irnDate = null;
                  }
                }
                this.customDelivery.notifyenduseremailiD = this.invoiceForm.controls['endUser'].value;
                console.log(this.customDelivery, 'customDelivery')
                this.finalInvoiceList.push(this.customDelivery);
                console.log(this.finalInvoiceList, 'finalInvoiceList')
              }
              this.simpoinvoicesubmissionarray = this.finalInvoiceList;
              console.log(this.poSimpoUniquelineitem);
              this.purchaseOrderListService.simpoSubmitInvoice(this.simpoinvoicesubmissionarray).subscribe(res => {
                sessionStorage.removeItem("invwopodetails");
                console.log("res[0].Uniquemessage--", res[0].Uniquemessage)
                if (res[0].message == "Success") {

                  this.purchaseOrderListService.deleteEmptyDeliveriesSimpo(this.nullDcList).subscribe(res => {
                    if (res[0].message == "Success") {
                      this.loaderservice.hide();
                      const dialogConfig = new MatDialogConfig();
                      dialogConfig.data = {
                        message: 'Invoice has been submitted successfully',
                        condition: 'success',
                        page: 'invoicesubmit',
                        specific: 'confirmation'
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
                        this.router.navigate(['/trackInvoiceList']);
                      });
                    }
                  });
                  console.log("Inin");
                  // this.invoiceForm.reset();
                  this.viewAttachmentName = "";
                  this.successmessage = "Invoice has been submitted successfully";
                  this.success = true;
                }
                else {
                  this.loaderservice.hide();
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: res[0].Uniquemessage,
                    condition: 'error',
                    page: 'invoicesubmit',
                    specific: 'confirmation'
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
                  this.successmessage = res[0].Uniquemessage;
                  this.error = true;
                  console.log(this.uniquelineitems)
                  // this.invoiceForm.reset();
                  // this.viewAttachmentName = "";
                  // this.router.navigate(['/purchaseOrdersList']);

                }
                this.loaderservice.hide();
              });
            })
          }
        });
      }
      else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Please upload the File',
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


        this.loaderservice.hide();
        return false;
      }
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'Please add atleast one PO',
        condition: 'success',
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
        // this.router.navigate(['/trackInvoiceList']);
      });
      return false;
    }
  }

  submittobeinvoice() {
    this.poSimpoUniquelineitem = [];
    console.log("this.posimponewList", this.posimponewList)
    console.log("function start")
    this.loaderservice.show();
    console.log("values here ==>", this.invoiceForm);
    console.log(this.uniquelineitems.length);
    console.log("this.part " + this.part);
    if (this.part || this.full) {
      this.quantitylist = [];
      this.lineitemnumberlist = [];
      this.poSimpoUniquelineitem = [];
      console.log("this.posimponewList", this.posimponewList)
      console.log("this.uniquelineitem og", this.uniquelineitems);
      // this.uniquelineitems.push(this.posimponewList);

      for (let r = 0; r < this.uniquelineitems.length; r++) {
        this.uniquelineitems[r].QUANTITY = $('#inputQty' + r).val();
        this.uniquelineitems[r].INVOICEAMOUNT = this.invoiceForm.controls['calRealtime' + r].value
        // else{
        //   this.uniquelineitems[0].QUANTITY = $('#inputQtysimpo' + r).val()
        // }
      }
      for (let u = 0; u < this.uniquelineitems.length; u++) {
        this.poSimpoUniquelineitem.push(this.uniquelineitems[u]);
      }
      console.log(this.uniquelineitems);
      console.log(this.poSimpoUniquelineitem);
      // if(this.multiPOFinalList.length > 0)
      // {
      //   this.simpoSelectedPo = this.multiPOFinalList;
      // }
      for (let p = 0; p < this.simpoSelectedPo.length; p++) {
        for (let q = 0; q < this.posimponewList.length; q++) {
          if (this.posimponewList[q].PO_NUMBER == this.simpoSelectedPo[p]) {
            this.posimponewList[q].QUANTITY = $('#inputQtysimpo' + p + q).val();
            this.posimponewList[q].INVOICEAMOUNT = this.invoiceForm.controls['calRealtimesimpo' + p + q].value;
            this.poSimpoUniquelineitem.push(this.posimponewList[q]);
          }

          // else{
          //   this.uniquelineitems[0].QUANTITY = $('#inputQtysimpo' + r).val()
          // }
        }

      }

      // for(let z= 0; z<this.posimponewList.length ; z++){
      // }
      // this.uniquelineitems = this.uniquelineitems.concat(this.posimponewList);
      console.log("this.uniquelineitem ogg", this.uniquelineitems);


      console.log("this.uniquelineitems.length new", this.uniquelineitems.length)

    }
    console.log("is it updating============>", this.quantitylist);
    console.log("this.lineitemnumberlist next", this.lineitemnumberlist);
    console.log("this.uniquelineitems next", this.uniquelineitems);
    this.simpouniquelineitems = [];
    var data: any = [];
    console.log(this.tobeinvoicelist, this.grntobeinvoicelist);

    for (let index = 0; index < this.grntobeinvoicelist.length; index++) {
      for (let z = 0; z < this.grntobeinvoicelist[index].LINEITEMS.length; z++) {
        if (this.grntobeinvoicelist[index].PONUMBER) {

          if (this.grntobeinvoicelist[index].GRNQTY == undefined || this.grntobeinvoicelist[index].GRNQTY == "") {
            this.grntobeinvoicelist[index].GRNQTY = 0;
            data = this.grntobeinvoicelist[index].PONUMBER + "," + this.grntobeinvoicelist[index].LINEITEMS[z].LINEITEMNO + ","
              + this.grntobeinvoicelist[index].LINEITEMS[z].GRNQTY + "," + this.grntobeinvoicelist[index].LINEITEMS[z].DCNUMBER;
            console.log(data);
            this.simpouniquelineitems.push(data);
          }
        }
      }
    }
    console.log(this.simpouniquelineitems);


    if ((this.viewUploadFile != null && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
      (this.withoutpodetails.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
      (this.invoicedata.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "")) {
      console.log("inininin");
      if (this.TypeNo == 'resubmit') {
        // this.trackOrderListService.getVendorReturn(this.ponumber, this.invNo).subscribe(res => {

        // });
        this.trackOrderListService.getVendorReturnforsimpo(this.simpoSelectedPo, this.invNo).subscribe(res => {

        });
      }
      
    this.purchaseOrderListService.createCustomDeliveryItemForSimpoWithDc(this.simpouniquelineitems).subscribe(res =>{
      if (res[0].message == "Success") {
    
       this. dcnlistSimpo = res[0].dcnvalues;
          console.log("dcnlistSimpo", this.dcnlistSimpo);
      }

      
    // })
      this.purchaseOrderListService.createCustomDeliveryItemsForSimpo(this.simpouniquelineitems).subscribe(res => {
        if (res[0].message == "Success") {
          this.loaderservice.show();
          var dcnlist: any = [];
          this.dcNumberList = [];
          dcnlist = res[0].dcnvalues;
          console.log("dcnlist", dcnlist);
          // res[0].dcnvalues.forEach(element => {
          //   dcnlist.push(element)
          // });


          for (let p = 0; p < dcnlist.length; p++) {
            data = dcnlist[p].PONUMBER + "," + dcnlist[p].DCNNUM;
            console.log(data);
            this.dcNumberList.push(data);

          }
        }
        this.purchaseOrderListService.getOrderHavingDcnForSimpo(this.dcNumberList).subscribe(res1 => {

          console.log("return========>", res1[0].message, res1[0].orderitems);
          this.simpoinvoicesubmissionarray = [];
          this.finalInvoiceList = [];
          this.orderlineitems = res1[0].orderitems;
          // console.clear();
          console.log('OrderLive Items',this.orderlineitems);
          console.log('GRN To Be InvoiceList',this.grntobeinvoicelist); 
          var count =0;
          for(let i =0; i<this.dcnlistSimpo.length; i++){
            for(let index =0; index<this.grntobeinvoicelist.length; index++){
          
             for (let z = 0; z < this.grntobeinvoicelist[index].LINEITEMS.length; z++) {
              this.customDelivery = new customDelivery();
              this.customDelivery.bid = sessionStorage.getItem("Bid");
              this.customDelivery.po_num = this.grntobeinvoicelist[index].LINEITEMS[z].PONUMBER;
              this.customDelivery.orderNumber = this.dcnlistSimpo[i].DCNNUM
              console.log(this.customDelivery.orderNumber)
              console.log(this.customDelivery.po_num)

              if (this.invoiceForm.controls['irnDate'].value != null) {
                this.customDelivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
                this.customDelivery.invoicetype = "E-invoice";
              }
              else {
                this.customDelivery.irnDate = null;
              }
              if (this.invoiceForm.controls['billofladingdate'].value != null) {
                this.customDelivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");
                this.customDelivery.invoicetype = "invoice";
              }
              this.customDelivery.irnNumber = "";
              if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
                this.customDelivery.irnDate = null;
              }

              this.customDelivery.dcnumber = this.grntobeinvoicelist[index].LINEITEMS[z].DCNUMBER;
              this.customDelivery.lineItemNumber = this.grntobeinvoicelist[index].LINEITEMS[z].LINEITEMNO;
              this.customDelivery.lineitemtext = this.grntobeinvoicelist[index].LINEITEMS[z].lineitemtext;
              this.customDelivery.quantity = this.grntobeinvoicelist[index].LINEITEMS[z].GRNQTY;
              this.customDelivery.grnnumber =this.grntobeinvoicelist[index].LINEITEMS[z].GRNNUMBER;
              this.customDelivery.rateperquantity = this.grntobeinvoicelist[index].LINEITEMS[z].RATEPERQTY;
              this.customDelivery.uniquereferencenumber = "-";
              this.customDelivery.balance_qty = Number(this.grntobeinvoicelist[index].LINEITEMS[z].balance_qty);
              this.customDelivery.invoiceamount = Number(this.grntobeinvoicelist[index].LINEITEMS[z].AMOUNT);
              this.customDelivery.saplineitemnumber = this.grntobeinvoicelist[index].LINEITEMS[z].SAPLINEITEMNO;
              this.customDelivery.plant = localStorage.getItem("PLANTNO");
              this.customDelivery.contactPerson = sessionStorage.getItem("Requisitioner");
              this.customDelivery.vendorID = this.vendorid;
              this.customDelivery.costCentre = null;
              this.customDelivery.category = null;
              this.customDelivery.company = null;
              this.customDelivery.department = null;
              this.customDelivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
              this.customDelivery.profileID = "";
              this.customDelivery.invoiceDocumentPath = "";
              this.customDelivery.iGSTAmount = "";
              this.customDelivery.cGSTAmount = "";
              this.customDelivery.sgstAmount = "";
              this.customDelivery.uOM = "L";
              // this.customDelivery.contactPerson = "sachin.mehta@timesgroup.com" //  sessionStorage.getItem("Requisitioner");
              this.customDelivery.contactPersonPhone = null;
              this.customDelivery.invoiceNumber = this.invoiceForm.controls["invoiceNo"].value.trim();
              this.customDelivery.totalAmount = this.invoiceForm.controls["TotalinctaxAmount"].value.toString().replace(/,/g, "");
              this.customDelivery.description = this.invoiceForm.controls['description'].value;
              this.customDelivery.remark = this.invoiceForm.controls['remarks'].value;
              this.customDelivery.status = "P";
              this.customDelivery.actualfilename = this.viewAttachmentName;
              if (this.invoicefilechanged == false) {
                this.customDelivery.actualfilename = this.actualfilenameofwopo;
                this.customDelivery.savedfilename = this.savedfilenameofwopo;


              }
              else {
                this.customDelivery.actualfilename = this.actualfilename;
                this.customDelivery.savedfilename = this.savedfilename;
              }
              this.customDelivery.createdby = sessionStorage.getItem("loginUser");
              this.customDelivery.managerid = "sachin.kale@timesgroup.com";

              this.customDelivery.buyerid = sessionStorage.getItem("Buyer");
              this.customDelivery.stage = "1";
              this.customDelivery.material = "INK";
              this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");
              this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
              if (this.multiplefilechanged == true) {
                for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                  if (c == 0) {
                    this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
                  } else {
                    this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                  }
                }
                for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                  if (x == 0) {
                    this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
                  } else {
                    this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                  }
                }
                this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename.slice(0, -1);
                this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename.slice(0, -1);
                console.log("this.uniquelineitems.multipleactualfilename ", this.customDelivery.multipleactualfilename);
                console.log("this.uniquelineitems.multiplesavedfilename ", this.customDelivery.multiplesavedfilename);
              }

              this.customDelivery.invoiceDate = moment(
                new Date(
                  this.invoiceForm.controls["invoiceDate"].value
                )
              ).format("DD/MM/YYYY");
              this.customDelivery.totalamtinctaxes = this.customDelivery.totalamtinctaxes =
                this.invoiceForm.controls[
                  "TotalinctaxAmount"
                ].value
                  .toString()
                  .replace(/,/g, "");
              this.customDelivery.taxamount =
                this.invoiceForm.controls["taxAmount"].value
                  .toString()
                  .replace(/,/g, "");

              this.customDelivery.storagelocation = this.grntobeinvoicelist[index].LINEITEMS[z].TOINVOICESTORAGELOCATION;
              this.customDelivery.uniquereferencenumber = this.grntobeinvoicelist[index].LINEITEMS[z].SAPUNIQUEREFERENCENO;
              this.customDelivery.saplineitemnumber = this.grntobeinvoicelist[index].LINEITEMS[z].SAPLINEITEMNO;
              this.customDelivery.servicenumber = this.grntobeinvoicelist[index].LINEITEMS[z].SERVICENUMBER;
              // this.customDelivery.beforesubmissioninvoicenumber = this.grntobeinvoicelist[index].LINEITEMS[z].SAPLINEITEMNO;

              if (this.grntobeinvoicelist[index].LINEITEMS[z].SRCNUMBER) {
                this.customDelivery.srcnnumber = this.grntobeinvoicelist[index].LINEITEMS[z].SRCNUMBER;
              }else {
                this.customDelivery.srcnnumber = "-";
              }
              // this.customDelivery.previnvno = "";
              // this.customDelivery.previnvdate ="";
              // this.customDelivery.prevponos = "";
              this.customDelivery.type = "tobeinovice";
              this.customDelivery.notifyenduseremailiD = this.invoiceForm.controls['endUser'].value;

              this.finalInvoiceList.push(this.customDelivery);
              console.log(this.customDelivery) 
            
             }
            }
           
          }
   

    var arrayout =[];
    var count=0;
    var strat = false;
    console.log(Object.keys(this.finalInvoiceList));
    console.log(this.finalInvoiceList);
    console.log(this.dcnlistSimpo);
  	for(let i = 0; i < this.finalInvoiceList.length; i++) {
			for(let j = 0; j < this.dcnlistSimpo.length; j++) {
        if( this.finalInvoiceList[i].dcnumber == this.dcnlistSimpo[j].OLDDC
          && this.finalInvoiceList[i].po_num == this.dcnlistSimpo[j].PONUMBER
          && this.finalInvoiceList[i].lineItemNumber == this.dcnlistSimpo[j].LINEITEMNUMBER
          && this.finalInvoiceList[i].orderNumber == this.dcnlistSimpo[j].DCNNUM) {
          strat = true;
				arrayout.push(this.finalInvoiceList[i])
				}
      }
      count ++;
    }
    console.log(arrayout)
    this.simpoinvoicesubmissionarray = arrayout;
          console.log(this.simpoinvoicesubmissionarray)
		
      //  this.arr3 =this.orderlineitems.map(item =>{
      //   let foundItems = this.finalInvoiceList.find(e => e.po_num == item.PONUMBER && e.OLDDC == item.dcnumber && e.DCNNUM == item.ordernumber)
      //   console.log("find", foundItems)
      // })
          // this.arr3 = this.grntobeinvoicelist.map(item => {
          //   let foundItems = this.orderlineitems.filter(e =>e.PONUMBER == item.PONUMBER &&  e.DCNUMBER == item.OLDDCNUMBER &&  e.LINEITEMNO == item.LINEITEMNUMBER);
          //  console.log(foundItems)
          //   if(foundItems != undefined) {
          //      for (const key in foundItems) {
          //       let NewOtem = foundItems[key];
          //       for (const lineItemKey in item.LINEITEMS) {
                 
          //        if( item.LINEITEMS[lineItemKey].LINEITEMNO == NewOtem.LINEITEMNUMBER )  { 
          //         if(NewOtem.DC == item.LINEITEMS[lineItemKey].DC){
          //           alert();
          //           for (const key_NewOtem in NewOtem) {
          //             if (!item.LINEITEMS[lineItemKey].hasOwnProperty(key_NewOtem)) {
          //                   item.LINEITEMS[lineItemKey][key_NewOtem] = NewOtem[key_NewOtem];
                            
          //               }
                  
          //               }
          //         }
                
          //         // item.LINEITEMS[lineItemKey]=  Object.assign(item.LINEITEMS[lineItemKey], NewOtem);
          //        }
          //       }
          //     }
          //   };
          //   return item;
          // });
          // this.arr3 = this.orderlineitems.map((item, i) => Object.assign({}, item, this.grntobeinvoicelist[i]));
          // console.log(this.arr3)
          // for (let index = 0; index < this.arr3.length; index++) {
          //   // console.log(this.arr3[index].LINEITEMS.length)
          //   for (let z = 0; z < this.arr3[index]?.LINEITEMS?.length; z++) {
          //     this.customDelivery = new customDelivery();
          //     this.customDelivery.bid = sessionStorage.getItem("Bid");
          //     this.customDelivery.po_num = this.arr3[index].LINEITEMS[z].PONUMBER;
          //     this.customDelivery.orderNumber = this.arr3[index].LINEITEMS[z].DC
          //     console.log(this.customDelivery.orderNumber)
          //     console.log(this.customDelivery.po_num)

          //     if (this.invoiceForm.controls['irnDate'].value != null) {
          //       this.customDelivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
          //       this.customDelivery.invoicetype = "E-invoice";
          //     }
          //     else {
          //       this.customDelivery.irnDate = null;
          //     }
          //     if (this.invoiceForm.controls['billofladingdate'].value != null) {
          //       this.customDelivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");
          //       this.customDelivery.invoicetype = "invoice";
          //     }
          //     this.customDelivery.irnNumber = "";
          //     if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
          //       this.customDelivery.irnDate = null;
          //     }

          //     this.customDelivery.dcnumber = this.arr3[index].LINEITEMS[z].DCNUMBER;
          //     this.customDelivery.lineItemNumber = this.arr3[index].LINEITEMS[z].LINEITEMNO;
          //     this.customDelivery.lineitemtext = this.arr3[index].LINEITEMS[z].lineitemtext;
          //     this.customDelivery.quantity = this.arr3[index].LINEITEMS[z].GRNQTY;
          //     this.customDelivery.grnnumber =this.arr3[index].LINEITEMS[z].GRNNUMBER;
          //     this.customDelivery.rateperquantity = this.arr3[index].LINEITEMS[z].RATEPERQTY;
          //     this.customDelivery.uniquereferencenumber = "-";
          //     this.customDelivery.balance_qty = Number(this.arr3[index].LINEITEMS[z].balance_qty);
          //     this.customDelivery.invoiceamount = Number(this.arr3[index].LINEITEMS[z].AMOUNT);
          //     this.customDelivery.saplineitemnumber = this.arr3[index].LINEITEMS[z].SAPLINEITEMNO;
          //     this.customDelivery.plant = localStorage.getItem("PLANTNO");
          //     this.customDelivery.contactPerson = sessionStorage.getItem("Requisitioner");
          //     this.customDelivery.vendorID = this.vendorid;
          //     this.customDelivery.costCentre = null;
          //     this.customDelivery.category = null;
          //     this.customDelivery.company = null;
          //     this.customDelivery.department = null;
          //     this.customDelivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
          //     this.customDelivery.profileID = "";
          //     this.customDelivery.invoiceDocumentPath = "";
          //     this.customDelivery.iGSTAmount = "";
          //     this.customDelivery.cGSTAmount = "";
          //     this.customDelivery.sgstAmount = "";
          //     this.customDelivery.uOM = "L";
          //     this.customDelivery.contactPerson = "sachin.mehta@timesgroup.com" //  sessionStorage.getItem("Requisitioner");
          //     this.customDelivery.contactPersonPhone = null;
          //     this.customDelivery.invoiceNumber = this.invoiceForm.controls["invoiceNo"].value.trim();
          //     this.customDelivery.totalAmount = this.invoiceForm.controls["TotalinctaxAmount"].value.toString().replace(/,/g, "");
          //     this.customDelivery.description = this.invoiceForm.controls['description'].value;
          //     this.customDelivery.remark = this.invoiceForm.controls['remarks'].value;
          //     this.customDelivery.status = "P";
          //     this.customDelivery.actualfilename = this.viewAttachmentName;
          //     if (this.invoicefilechanged == false) {
          //       this.customDelivery.actualfilename = this.actualfilenameofwopo;
          //       this.customDelivery.savedfilename = this.savedfilenameofwopo;


          //     }
          //     else {
          //       this.customDelivery.actualfilename = this.actualfilename;
          //       this.customDelivery.savedfilename = this.savedfilename;
          //     }
          //     this.customDelivery.createdby = sessionStorage.getItem("loginUser");
          //     this.customDelivery.managerid = "sachin.kale@timesgroup.com";

          //     this.customDelivery.buyerid = sessionStorage.getItem("Buyer");
          //     this.customDelivery.stage = "1";
          //     this.customDelivery.material = "INK";
          //     this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");
          //     this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
          //     if (this.multiplefilechanged == true) {
          //       for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
          //         if (c == 0) {
          //           this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
          //         } else {
          //           this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
          //         }
          //       }
          //       for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
          //         if (x == 0) {
          //           this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
          //         } else {
          //           this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
          //         }
          //       }
          //       this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename.slice(0, -1);
          //       this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename.slice(0, -1);
          //       console.log("this.uniquelineitems.multipleactualfilename ", this.customDelivery.multipleactualfilename);
          //       console.log("this.uniquelineitems.multiplesavedfilename ", this.customDelivery.multiplesavedfilename);
          //     }

          //     this.customDelivery.invoiceDate = moment(
          //       new Date(
          //         this.invoiceForm.controls["invoiceDate"].value
          //       )
          //     ).format("DD/MM/YYYY");
          //     this.customDelivery.totalamtinctaxes = this.customDelivery.totalamtinctaxes =
          //       this.invoiceForm.controls[
          //         "TotalinctaxAmount"
          //       ].value
          //         .toString()
          //         .replace(/,/g, "");
          //     this.customDelivery.taxamount =
          //       this.invoiceForm.controls["taxAmount"].value
          //         .toString()
          //         .replace(/,/g, "");
          //     this.customDelivery.storagelocation =null;
          //     this.customDelivery.uniquereferencenumber = "-";
          //     this.customDelivery.saplineitemnumber = "-";
          //     this.customDelivery.servicenumber = null;
          //     this.customDelivery.beforesubmissioninvoicenumber = "";
          //     this.customDelivery.srcnnumber = "-";
          //     // this.customDelivery.previnvno = "";
          //     // this.customDelivery.previnvdate ="";
          //     // this.customDelivery.prevponos = "";
          //     this.customDelivery.type = "tobeinovice";
          //     console.log(this.customDelivery)
          //     this.finalInvoiceList.push(this.customDelivery);



          //   }
          // }
          // this.simpoinvoicesubmissionarray = this.arr3;
          // console.log(this.simpoinvoicesubmissionarray)
          // }

          //  grn for loop\\


        // }
      

          this.purchaseOrderListService.simpoSubmitInvoice(this.simpoinvoicesubmissionarray).subscribe(res => {

            sessionStorage.removeItem("invwopodetails");
            if (this.customDelivery.irnDate == null) {
              if (res[0].message == "Success") {
                this.loaderservice.hide();
                this.purchaseOrderListService.deleteEmptyDeliveriesSimpo(this.nullDcList).subscribe(res => {

                  if (this.customDelivery.irnDate == null) {
                    if (res[0].message == "Success") {
                      this.loaderservice.hide();
                      const dialogConfig = new MatDialogConfig();

                      dialogConfig.data = {
                        message: 'Invoice has been submitted successfully.Please send the physical invoice as per process ',
                        condition: 'success',
                        page: 'invoicesubmit',
                        specific: 'confirmation'
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
                        this.router.navigate(['/trackInvoiceList']);
                      });
                    }
                  }
                  else if (res[0].message == "Success") {
                    this.loaderservice.hide();
                    const dialogConfig = new MatDialogConfig();

                    dialogConfig.data = {
                      message: 'Invoice has been submitted successfully.',
                      condition: 'success',
                      page: 'invoicesubmit',
                      specific: 'confirmation'
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
                      this.router.navigate(['/trackInvoiceList']);
                    });
                  }
                });


                // this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
                // const dialogConfig = new MatDialogConfig();
                // dialogConfig.data = {
                //   message:
                //     "Invoice has been submitted successfully. Please send the physical invoice as per process ",
                //   condition: "success",
                //   page: "invoicesubmit",
                // };
                // const mydata = dialogConfig.data;
                // console.log("PopupComponent", mydata);

                // const dialogRef = this.dialog.open(
                //   PopupComponent,
                //   {
                //     panelClass: "custom-modalbox",

                //     width: "400px",
                //     data: { datakey: dialogConfig.data },
                //   }
                // );
                // dialogRef
                //   .afterClosed()
                //   .subscribe((result) => {
                //     console.log(
                //       `Dialog result1: ${result}`
                //     );
                //     this.router.navigate([
                //       "/trackInvoiceList",
                //     ]);
                //   });
                // });
              }

            }

            else if (res[0].message == "Success") {
              this.loaderservice.hide();
              // this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message:
                  "Invoice has been submitted successfully",
                condition: "success",
                page: "invoicesubmit",
              };
              const mydata = dialogConfig.data;
              console.log("PopupComponent", mydata);

              const dialogRef = this.dialog.open(
                PopupComponent,
                {
                  panelClass: "custom-modalbox",

                  width: "400px",
                  data: { datakey: dialogConfig.data },
                }
              );
              dialogRef
                .afterClosed()
                .subscribe((result) => {
                  console.log(
                    `Dialog result1: ${result}`
                  );
                  this.router.navigate([
                    "/trackInvoiceList",
                  ]);
                });
            }

            else {
              // this.loaderservice.hide();
              // this.dialogBox.popUpOpen2('Invoice Number Already Exist.', 'error', 'invoicesubmit');
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: res[0].Uniquemessage,
                // message: 'Invoice Number Already Exist.',
                condition: "error",
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
              dialogRef.afterClosed().subscribe((result) => {
                console.log(`Dialog result1: ${result}`);
              });
              // this.toastr.error(res[0].message)
              // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
              this.successmessage = res[0].Uniquemessage;
              this.error = true;
              // this.showPopup();
            }
          });

        })//get order dcn




      })//summarye end
    })
    }


  }

  reopenSimpoSubmitInvoice() {

    this.customDelivery.bid = sessionStorage.getItem("Bid");

    let abc = localStorage.getItem('simpoSelectedPolocal');
    // alert(abc);

    if (abc == 'null') {
      this.customDelivery.po_num = this.ponumber;
    }
    else {
      this.customDelivery.po_num = this.ponumber;
    }
    this.customDelivery.irnNumber = this.invoiceForm.controls['irnNo'].value;//this.invoiceForm.controls["irnNo"].value;

    if (this.invoiceForm.controls['irnDate'].value != null) {

      this.customDelivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
      this.customDelivery.invoicetype = "E-Invoice";
    }
    else {

      this.customDelivery.irnDate = "Invalid date";
      this.customDelivery.invoicetype = "Invoice";
    }

    // this.customDelivery.referenceNumber = "";
    this.customDelivery.grnnumber = "";
    this.customDelivery.lineItemNumber = "";
    this.customDelivery.orderNumber = "";
    this.customDelivery.quantity = "";
    this.customDelivery.uOM = "";
    this.customDelivery.contactPerson = "sachin.mehta@timesgroup.com" // sessionStorage.getItem('Requisitioner');
    this.customDelivery.contactPersonPhone = "";
    this.customDelivery.invoiceNumber = this.invoiceForm.controls["invoiceNo"].value.trim();
    this.customDelivery.vendorID = "";
    this.customDelivery.company = "";
    this.customDelivery.plant = "";
    this.customDelivery.department = "";
    this.customDelivery.costCentre = "";
    this.customDelivery.category = "";
    this.customDelivery.businessPartnerText = "";
    this.customDelivery.profileID = "";
    this.customDelivery.invoiceDocumentPath = "";
    this.customDelivery.iGSTAmount = "";
    this.customDelivery.cGSTAmount = "";
    this.customDelivery.sgstAmount = "";
    this.customDelivery.totalAmount = this.invoiceForm.controls["TotalinctaxAmount"].value.toString().replace(/,/g, "");
    this.customDelivery.description = "";
    this.customDelivery.status = "";
    this.customDelivery.invoiceamount = "";
    this.customDelivery.actualfilename = this.viewAttachmentName;
    if (this.invoicefilechanged == false) {

      if (this.TypeNo == 'reopen') {
        this.customDelivery.actualfilename = this.actualresubmitfilename
        this.customDelivery.savedfilename = this.savedresubmitfilename
      }
      else {
        this.customDelivery.actualfilename = this.actualfilenameofwopo;
        this.customDelivery.savedfilename = this.savedfilenameofwopo;
      }

    }
    else {
      this.customDelivery.actualfilename = this.actualfilename;
      this.customDelivery.savedfilename = this.savedfilename;
    }
    // if(sessionStorage.getItem('SAVEDFILENAME')!=null){
    //   this.customDelivery.savedfilename = this.savedresubmitfilename;
    // }else{
    // this.customDelivery.savedfilename = sessionStorage.getItem('SAVEDFILENAME');
    // }
    this.customDelivery.createdby = "";
    this.customDelivery.managerid = "";
    this.customDelivery.buyerid = "";
    this.customDelivery.stage = "";
    this.customDelivery.balance_qty = "";
    // this.customDelivery.rawinvno = "";
    // this.customDelivery.modified_by = "";
    this.customDelivery.material = "INK";
    this.customDelivery.rateperquantity = "";
    this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");

    if (this.multiplefilechanged == true) {
      for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
        if (c == 0) {
          this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
        } else {
          this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
        }
      }
      for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
        if (x == 0) {
          this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
        } else {
          this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
        }
      }
      this.multipleactualfilename = this.customDelivery.multipleactualfilename.slice(0, -1);
      this.multiplesavedfilename = this.customDelivery.multiplesavedfilename.slice(0, -1);
      console.log("this.uniquelineitems.multipleactualfilename ", this.multipleactualfilename);
      console.log("this.uniquelineitems.multiplesavedfilename ", this.multiplesavedfilename);
    }
    this.multipleactualfilename = this.customDelivery.multipleactualfilename.slice(0, -1);
    this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
    // this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name));

    if (this.invoiceForm.controls['billofladingdate'].value != null) {
      this.customDelivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");
    }
    else {
      this.customDelivery.billofladingdate = "Invalid date";
    }
    // this.customDelivery.billofladingdate = "";
    // this.delivery.ordervalue = "67567";
    this.customDelivery.invoiceDate = moment(
      new Date(
        this.invoiceForm.controls["invoiceDate"].value
      )
    ).format("DD/MM/YYYY");
    this.customDelivery.remark = this.invoiceForm.controls['remarks'].value;
    this.customDelivery.totalamtinctaxes = this.invoiceForm.controls['TotalinctaxAmount'].value.toString().replace(/,/g, '')
    this.customDelivery.taxamount =
      this.invoiceForm.controls["taxAmount"].value
        .toString()
        .replace(/,/g, "");
    this.customDelivery.storagelocation = null;
    this.customDelivery.company = null;
    this.customDelivery.department = null;
    this.customDelivery.lineitemtext = "";
    this.customDelivery.uniquereferencenumber = "";
    this.customDelivery.saplineitemnumber = "";
    this.customDelivery.servicenumber = "";
    this.customDelivery.beforesubmissioninvoicenumber = this.invNo;
    this.customDelivery.srcnnumber = "";
    //this.customDelivery.dcnumber = "";
    this.customDelivery.previnvno = sessionStorage.getItem("previousinvno");



    // alert(this.delivery.previnvno)
    this.customDelivery.previnvdate = localStorage.getItem("previousdate")
    // alert(  this.customDelivery.previnvdate)
    // moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format('DD/MM/YYYY');
    this.customDelivery.prevponos = (this.simpoSelectedPo.toString());

    //"2100694942" //=localStorage.getItem("previouspono");
    // alert(this.delivery.prevponos)
    this.customDelivery.type = "reopen";

    this.invoicesubmissionarray.push(this.customDelivery);

    this.purchaseOrderListService.simpoSubmitInvoice(this.invoicesubmissionarray).subscribe(res => {

      sessionStorage.removeItem("invwopodetails");
      if (this.customDelivery.irnDate == null) {
        if (res[0].message == "Success") {
          this.loaderservice.hide();
          // this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message:
              "Invoice has been submitted successfully. Please send the physical invoice as per process ",
            condition: "success",
            page: "invoicesubmit",
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);

          const dialogRef = this.dialog.open(
            PopupComponent,
            {
              panelClass: "custom-modalbox",

              width: "400px",
              data: { datakey: dialogConfig.data },
            }
          );
          dialogRef
            .afterClosed()
            .subscribe((result) => {
              console.log(
                `Dialog result1: ${result}`
              );
              this.router.navigate([
                "/trackInvoiceList",
              ]);
            });
        }

      }
      else if (res[0].message == "Success") {
        this.loaderservice.hide();
        // this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message:
            "Invoice has been submitted successfully",
          condition: "success",
          page: "invoicesubmit",
        };
        const mydata = dialogConfig.data;
        console.log("PopupComponent", mydata);

        const dialogRef = this.dialog.open(
          PopupComponent,
          {
            panelClass: "custom-modalbox",

            width: "400px",
            data: { datakey: dialogConfig.data },
          }
        );
        dialogRef
          .afterClosed()
          .subscribe((result) => {
            console.log(
              `Dialog result1: ${result}`
            );
            this.router.navigate([
              "/trackInvoiceList",
            ]);
          });
      }
      else {
        // this.loaderservice.hide();
        // this.dialogBox.popUpOpen2('Invoice Number Already Exist.', 'error', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: res[0].Uniquemessage,
          // message: 'Invoice Number Already Exist.',
          condition: "error",
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
        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result1: ${result}`);
        });
        // this.toastr.error(res[0].message)
        // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
        this.successmessage = res[0].Uniquemessage;
        this.error = true;
        // this.showPopup();
      }
    });



  }

  close() {
    this.viewAttachmentName = '';
    this.viewAttachmentName = null;
    this.viewUploadFile = null;
    this.viewUploadFile = '';
    this.fileupload = 'refileupload';
    if ($("#cpEinvoice").is(":checked")) {
      this.invoiceForm.controls.irnNo.setValue(null);
      this.invoiceForm.controls.irnDate.setValue(null);
      this.invoiceForm.controls['irnNo'].setValidators([Validators.required]);
      this.invoiceForm.get('irnNo').updateValueAndValidity();
      this.invoiceForm.controls['irnDate'].setValidators([Validators.required]);
      this.invoiceForm.get('irnDate').updateValueAndValidity();
    }
    else if ($("#cpinvoice").is(":checked")) {
      this.invoiceForm.controls['irnNo'].setValidators(null);
      this.invoiceForm.get('irnNo').updateValueAndValidity();
      this.invoiceForm.controls['irnDate'].setValidators(null);
      this.invoiceForm.get('irnDate').updateValueAndValidity();
    }

    this.invoiceForm.controls['attachments'].setValue("");
    this.invoiceForm.controls['attachments'].setValidators([Validators.required]);
    this.invoiceForm.get('attachments').updateValueAndValidity();
  }

  checkInvoice(event,) {
    this.value = event.target.value
    console.log("value is here ==>" + this.value, event.target);
    if (this.grnnumber == null) {
      this.invoiceForm.reset();
    }
    $('.exceededMsg').hide();
    this.close();
    if (!this.full) {
      // this.overallAmount = 0;
    }
    this.inputBalanceQuantity = 0;
    if (!this.full) {
      // this.overallAmount = 0;
    }
    this.balanceExceeded = false;
    this.ArrayOfSelectedFile = [];
    this.ArrayOfSelectedFilename = [];
    if (this.value == "Invoice") {
      this.irnNumber = null;
      this.invoiceForm.get('irnDate').clearValidators();
      this.invoiceForm.get('irnNo').clearValidators();
      this.invoiceForm.get('irnNo').updateValueAndValidity();
      this.invoiceForm.get('irnDate').updateValueAndValidity();
      this.irndetail = false;
      this.invoice = true;
    }
    else {
      this.invoiceForm.get('irnNo').setValidators(Validators.required);
      this.invoiceForm.get('irnDate').setValidators(Validators.required);
      this.invoiceForm.get('irnNo').updateValueAndValidity();
      this.invoiceForm.get('irnDate').updateValueAndValidity();
      this.irndetail = true;
      this.invoice = false;
    }
  }

  getFileNameWOExtention(name) {
    var flName = name.substr(0, name.lastIndexOf(".")).replace(/_/g, "-").replace(/\./g, "-");
    return flName;
  }

  validateFileExtension(fileName) {
    let fileExtension: string = this.getExtensionOfFile(fileName);
    for (let i = 0; i < this.AttachmentValidExtension.length; i++) {
      if (this.AttachmentValidExtension[i] == fileExtension.toUpperCase())
        return true;
    }
    return false;
  }

  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
  }

  getTimeStampFileName(fileName, extension) {
    console.log(Date.now().toString());
    return fileName + Date.now().toString() + "." + extension;
  }
  onFileSelectEvent(e, type) {
    var specialChars = "<>@!#$%^&*()+[]{}?:;_|'\"\\,/~`-=";
    var checkForSpecialChar = function (string) {
      for (var j = 0; j < specialChars.length; j++) {
        if (string.indexOf(specialChars[j]) > -1) {
          return true
        }
      }
      return false;
    }
    var _validFileExtensions = [".PDF"];
    var ValidateSingleInput = function (string) {
      for (var j = 0; j < _validFileExtensions.length; j++) {
        if (string.toUpperCase().indexOf(_validFileExtensions[j]) > -1) {
          return false
        }
      }
      return true;
    }
    if (checkForSpecialChar(e.target.files[0].name)) {
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
    else if (ValidateSingleInput(e.target.files[0].name.toUpperCase())) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'Only pdf file is allowed',
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
    else {
      this.viewUploadFile = null;
      this.viewAttachmentName = "";
      console.log(e.target.files[0]);
      if (this.validateFileExtension(e.target.files[0].name)) {
        this.invoicefilechanged = true;
        this.fileAttachmentError = "";
        this.viewUploadFile = e.target.files[0];
        if (type == "invoice") {
          this.invoiceconfile = e.target.files[0];
          this.viewAttachmentName = this.viewUploadFile.name;
          console.log("this.viewAttachmentName " + this.viewAttachmentName);
          // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
          // this.invoiceForm.controls['attachments'].setValue(this.viewAttachmentName);
        }
        this.actualfilename = this.viewUploadFile.name;
        console.log("this.invoiceconfile " + this.invoiceconfile);
        console.log("this.viewAttachmentName ==> " + this.viewAttachmentName);
        var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
        fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
        var fileName2 = fileName;
        fileName = this.ponumber + "_invoice_" + fileName;
        this.savedfilename = fileName;
        console.log("savedfilename ==>" + this.savedfilename);
        this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
          console.log(JSON.stringify(res))
          res[0].data = true;
          if (res.length == 0) {
            // this.toastr.error(res[0].message)
            // this.successmessage = "Data has been submitted successfully";

            //=--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
            return false;
          }
          else if (res[0].status == "Success") {

            // this.getIRNNumber();
            // if (this.value == "Einvoice") {
            if ($("#cpEinvoice").is(":checked")) {
              this.loaderservice.show();
              this.purchaseOrderListService.getIRNNumber(this.actualfilename, this.savedfilename).subscribe(res => {
                console.log("response of IrnDAta", res[0].message);
                this.loaderservice.hide();
                if (res[0].message == "Success") {
                  var datestring = res[0].invoiceData[0].IR_DocDt;
                  var formatdate = moment(datestring, "DD/MM/YYYY")
                  var dateobj = formatdate.toDate();
                  console.log("transformed date ===>", new Date(res[0].invoiceData[0].IR_DocDt), dateobj);

                  this.invoiceForm.controls.irnNo.setValue(res[0].invoiceData[0].IRN_Number);
                  this.invoiceForm.controls.irnDate.setValue(dateobj);
                  console.log("this.invoiceForm.controls['invoiceNo'].value " + this.invoiceForm.controls['invoiceNo'].value);
                  console.log("res[0].invoiceData[0].Invoice_Number " + res[0].invoiceData[0].Invoice_Number);
                  console.log("moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format('DD/MM/YYYY') " + moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY"));
                  console.log("dateobj " + dateobj);
                  if (this.grnnumber != null) {
                    if (this.invoiceForm.controls['invoiceNo'].value != res[0].invoiceData[0].Invoice_Number
                      || moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY") != moment(new Date(dateobj)).format("DD/MM/YYYY")) {
                      this.viewUploadFile = null;
                      this.viewUploadFile = '';
                      this.viewAttachmentName = "";
                      this.invoiceForm.controls['irnNo'].setValue(null);
                      this.invoiceForm.controls['irnDate'].setValue(null);
                      const dialogConfig = new MatDialogConfig();
                      dialogConfig.data = {
                        message: 'Invoice number/Invoice date mismatch. Please upload correct invoice',
                        condition: 'error',
                        page: 'Einvoice'
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
                    else {
                      this.invoiceForm.controls.invoiceNo.setValue(res[0].invoiceData[0].Invoice_Number);
                      this.invoiceForm.controls.invoiceDate.setValue(dateobj);
                    }
                  }
                  else {
                    this.invoiceForm.controls.invoiceNo.setValue(res[0].invoiceData[0].Invoice_Number);
                    this.invoiceForm.controls.invoiceDate.setValue(dateobj);
                  }

                  // moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY")
                  // this.invoiceForm.controls.invoiceNo.setValue(res[0].invoiceData[0].Invoice_Number);
                  // this.invoiceForm.controls.invoiceDate.setValue(dateobj);

                  // this.dialogBox.popUpOpen2('E-Invoice has been uploaded successfully', 'success', 'Einvoice');
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: 'E-Invoice has been uploaded successfully.',
                    condition: 'success',
                    page: 'Einvoice'
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
                else {
                  // this.dialogBox.popUpOpen2('Unable to find IRN number and Date', 'error', 'Einvoice')
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: 'Unable to find IRN number and Date',
                    condition: 'error',
                    page: 'Einvoice'
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

              })
            }
            else if ($("#cpinvoice").is(":checked")) {
              this.invoiceForm.controls['irnNo'].setValidators(null);
              this.invoiceForm.get('irnNo').updateValueAndValidity();
              this.invoiceForm.controls['irnDate'].setValidators(null);
              this.invoiceForm.get('irnDate').updateValueAndValidity();
            }

            // this.RevisedbalQuantity = Number(this.balQuantity) - Number(this.invoiceForm.controls.Quantity.value);
            // console.log("Quantity revise ",this.RevisedbalQuantity,"balance", this.balQuantity,"total", this.totQuantity, "input" );

            // totalamount = this.invoiceForm.controls['invoiceamount'].value;
            // this.purchaseOrderListService.invoicesubmission(irnnumber, irndate, ponumber, invoiceNumber, invoicedate,
            //   refno, grnnumber, lineitemnumber, ordernumber, quantity, uoM, contactPerson, contactPersonPhone,
            //   vendorid, company, plant, department, costcenter, category, businessPartnerText, profileid, invoiceDocumentPath,
            //   invoiceamount, igstamount, cgstamount, sgstamount, totalamount, description, status, actualfilename, savedfilename, this.RevisedbalQuantity
            //   ,rawinvno).subscribe(res => {

            //     if (res[0].message == "Success") {
            //       this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
            //       // this.dialogBox.popUpOpen2('Invoice has been submitted successfully','success','invoicesubmit');
            //       // this.toastr.success("Invoice Has Been Submitted Successfully")
            //       console.log("Inin");
            //       this.invoiceForm.reset();
            //       // this.invoiceconfile = null;
            //       this.viewAttachmentName = "";
            //       this.successmessage = "Invoice Has Been Submitted Successfully";
            //       this.success = true;
            //       // this.showPopup();
            //     }
            //     else {
            //       this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
            //       // this.toastr.error(res[0].message)
            //       // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
            //       this.successmessage = "Error while submitting. Please try again";
            //       this.error = true;
            //       // this.showPopup();
            //     }
            //   })
          }
          else {
            // this.toastr.error(res[0].message)
            // this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Error while submitting. Please try again',
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
            this.successmessage = "Error while submitting. Please try again";
            this.error = true;
            this.showPopup();
            //=-- this.dialogBox.popUpOpen2('Maximum file size (10 MB) exceeded.', 'donate', 'error2');
            return false;
          }

        });
        err => {
          // this.toastr.error(err)
          this.successmessage = err;
          this.error = true;
          this.showPopup();
          // this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'error', 'invoicesubmit');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'There was an error while uploading the file. Please try again!',
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
          // =--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
          return false;
        }
        // console.log(this.viewAttachmentName);
        // this.neftgroup.confile.name=this.viewAttachmentName;
      }
      else {
        //Assign error message to class.
        this.fileAttachmentError = this.InvalidAttachmentFileError;
      }
    }
    $(".fileSelectBtn").blur();
  }

  showPopup() {
    this.podropdownList = [];

    var newlist = [];
    console.log("this.selectedItems---01", this.selectedItems);
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
    this.purchaseOrderListService.simPoProcessedPos(this.ponumber, this.plantType).subscribe(res => {
      console.log(res, 'res')
      this.dropdownList = res[0].poData;
      console.log(this.dropdownList, 'this.dropdownList')
      console.log(this.poType, 'this.poType')
      for (let j = 0; j < this.dropdownList.length; j++) {
        // for (let i = 0; i < this.selectedpo.length; i++) {
        // if (this.dropdownList[j].PO_NUMBER != this.selectedpo[i]) {
        if (this.dropdownList[j].PO_NUMBER != this.ponumber) {
          if (this.poType == this.dropdownList[j].POTYPE) {
            newlist.push(this.dropdownList[j]);
          }
        }
      }
      console.log("newlist-=====>", newlist);
      this.dropdownList = newlist;
      console.log("this.dropdownList", this.dropdownList)
      for (let i = 0; i < this.dropdownList.length; i++) {
        this.podropdownList.push(this.dropdownList[i].PO_NUMBER);
        console.log("this.podropdownList", this.podropdownList);
      }
    }
    );


  }

  closePopup() {
    console.log("this.selectedItems---02", this.selectedItems);
    $("#popup2").css("visibility", "hidden");
    $("#popup2").css("opacity", "0");
  }

  // keyPressAlphanumeric(event): Boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
  //     || (charCode >= 48 && charCode <= 57) || charCode == 32 ||
  //     charCode == 45 || charCode == 47 || charCode == 92) {
  //     return true;
  //   }
  //   return false;
  // }

  keyPressAlphanumeric(event): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if((charCode == 45 || charCode == 47 || (charCode >= 48 && charCode <= 57)
    || (charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) )){
    return true;
     }
    return false;
    }

    keyPressAlphanumericWOSChar(event): Boolean {
  
      const charCode = (event.which) ? event.which : event.keyCode;
        
      if(((charCode >= 48 && charCode <= 57)
        
      || (charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) )){
        
      return true;
      
       }
      return false;
        
      }

  onFileChanged(event: any) {
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
            });

            this.filecount = this.filecount - 1;
            return;
          }

        }
        for (var m = 0; m < this.ArrayOfSelectedFile.length; m++) {
          if (checkForSpecialChar(this.ArrayOfSelectedFile[m].name)) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Special Characters/Space are not allowed in the file name!',
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
          if (ValidateSingleInput(this.ArrayOfSelectedFile[m].name)) {
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
            this.filecount = this.filecount - 1;
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
          this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name));

          this.multiplactualfilenamearray.push(this.ArrayOfSelectedFile[k].name);
        }
        this.filecount = this.ArrayOfSelectedFile.length;
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
              //   this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
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
              });

              // this.filecount -= 1
              this.filecount = this.filecount - 1;
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
            }
            else if (ValidateSingleInput(file.name.toUpperCase())) {
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
            this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(file.name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(file.name));

            this.multiplactualfilenamearray.push(file.name);
            this.filecount = this.ArrayOfSelectedFilename.length;
          }
          else {
            console.log("duplicate =================");

          }
        }
      }
      else {
        this.filecount = this.filecount - array.length;
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
    console.log("this.filecount >>" + this.filecount)
    const array = event.target.files;
    if (array.length != 0) {
      this.uploadfile();
    }
  }

  uploadfile() {
    const formData = new FormData();
    this.loaderservice.show();

    for (var i = 0; i < this.ArrayOfSelectedFile.length; i++) {

      console.log("this.ArrayOfSelectedFile[i].name ==> " + this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
      formData.append("file[]", this.ArrayOfSelectedFile[i], this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
    }
    this.purchaseOrderListService.multiplefileupload(formData).subscribe(res => {
      console.log(res.toString);
      this.loaderservice.hide();
      if (res[0].status == "Fail") {
        this.ArrayOfSelectedFilename = [];
        // var tempname = this.ArrayOfSelectedFilename[index]
        // this.ArrayOfSelectedFilename.splice(index, 1);
        // this.multiplsavedfilenamearray.splice(index, 1);
        this.ArrayOfSelectedSavedFile = [];
        // this.filecount = this.filecount - 1;
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
      }
    });
  }
  removeitem(index) {
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
    console.log("this.ArrayOfSelectedFilename" + this.ArrayOfSelectedFilename.length);
  }


  calculate(i, rate) {
    // console.log(" Values================>", i, rate);
    this.calculatedAmount = 0;
    this.inputBalanceQuantity = 0;
    if (this.invoiceForm.controls['orderValue' + i].value == 0 || this.invoiceForm.controls['orderValue' + i].value == "") {
      // console.log("entered");
      this.calculatedAmount = 0 * parseFloat(rate)
    }
    else {
      this.calculatedAmount = parseFloat(this.invoiceForm.controls['orderValue' + i].value) * parseFloat(rate)
    }
    this.overallAmount = 0;
    //console.log("total===========>", this.calculatedAmount);
    this.invoiceForm.controls['calRealtime' + i].setValue(Math.round(Number(this.calculatedAmount) * 100) / 100);
    for (let a = 0; a < this.uniquelineitems.length; a++) {
      if (this.invoiceForm.controls['orderValue' + a].value == 0 || this.invoiceForm.controls['orderValue' + a].value == "") {
        //console.log("entered");
      }
      this.overallAmount += this.invoiceForm.controls['calRealtime' + a].value;
      this.inputBalanceQuantity = this.inputBalanceQuantity + Number(this.invoiceForm.controls['orderValue' + a].value);
      //console.log("==============>", this.inputBalanceQuantity);
      console.log(this.overallAmount);
      if (isNaN(this.overallAmount) || isNaN(this.inputBalanceQuantity)) {
      }
    }
    this.invoiceForm.controls['overallAmount'].setValue(this.overallAmount);
    this.invoiceForm.controls['totalOrderQty'].setValue(this.inputBalanceQuantity);
    // this.finalTotalAmount = this.overallAmount;
    this.finalTotalAmount = 0;
    for (let a = 0; a < this.simpoSelectedPo.length; a++) {
      for (let b = 0; b < this.posimponewList.length; b++) {
        if (this.posimponewList[b].PO_NUMBER == this.simpoSelectedPo[a]) {
          this.finalTotalAmount = this.finalTotalAmount + this.invoiceForm.controls['calRealtimesimpo' + a + b].value;
        }
      }
    }
    this.finalTotalAmount += this.overallAmount;
    console.log("this.finalTotalAmount--", this.finalTotalAmount);

  }

  // calculatesimpo(i,j, rate) {
  //   //console.log(" Values================>",i, j, rate,$('#inputQtysimpo' + i + j).val());
  //   this.calculatedAmountsimpo = 0;
  //   this.inputBalanceQuantitysimpo = 0;
  //   if ($('#inputQtysimpo' + i + j).val() == 0 || $('#inputQtysimpo' + i + j).val() == "") {
  //     //console.log("entered");
  //     this.calculatedAmountsimpo = 0 * parseFloat(rate)
  //   }
  //   else {
  //     this.calculatedAmountsimpo = parseFloat($('#inputQtysimpo' + i + j).val()) * parseFloat(rate)
  //   }
  //   // this.overallAmountsimpo = 0;
  //   //this.finalTotalAmount = 0;
  //   console.log("total===========>", this.calculatedAmountsimpo);
  //   this.invoiceForm.controls['calRealtimesimpo' + i + j].setValue(Math.round(Number(this.calculatedAmountsimpo) * 100) / 100);
  //   // for (let a = 0; a < this.uniquelineitems.length; a++) {
  //   //   if (this.invoiceForm.controls['orderValuesimpo' + a].value == 0 || this.invoiceForm.controls['orderValuesimpo' + a].value == "") {
  //   //     console.log("entered");
  //   //   }
  //   //   this.overallAmountsimpo += this.invoiceForm.controls['calRealtimesimpo' + a].value;
  //   //   this.inputBalanceQuantitysimpo = this.inputBalanceQuantitysimpo + Number(this.invoiceForm.controls['orderValuesimpo' + a].value);
  //   //   console.log("==============>", this.inputBalanceQuantitysimpo);
  //   //   console.log(this.overallAmountsimpo);
  //   //   if (isNaN(this.overallAmountsimpo) || isNaN(this.inputBalanceQuantitysimpo)) {
  //   //   }
  //   // }
  //   console.log(this.simpoSelectedPo)
  //   // if(this.multiPOFinalList.length == 0)
  //   // {
  //   //   this.multiPOFinalList = [];
  //   //   this.multiPOFinalList = this.simpoSelectedPo;
  //   //   console.log(this.simpoSelectedPo,'PO-----------------')
  //   // }
  //   for(let a=0; a< this.simpoSelectedPo.length; a++){
  //     this.overallAmountsimpo = 0;
  //     this.inputBalanceQuantitysimpo = 0;
  //     for(let b=0; b<= this.posimponewList.length - 1; b++){
  //       console.log(b);
  //       if(this.posimponewList[b].PO_NUMBER == this.simpoSelectedPo[a]){
  //         console.log("true");
  //       if (this.invoiceForm.controls['orderValuesimpo' + a + b].value == 0 || this.invoiceForm.controls['orderValuesimpo' + a + b].value == "") {
  //         //console.log("entered");
  //       }
  //       console.log("this.overallAmountsimpo--",this.overallAmountsimpo);
  //       this.overallAmountsimpo +=  this.invoiceForm.controls['calRealtimesimpo' + a + b].value;
  //       console.log(this.overallAmount);
  //       this.finalTotalAmount += this.invoiceForm.controls['calRealtimesimpo' + a + b].value;
  //       console.log(this.overallAmountsimpo);
  //       this.inputBalanceQuantitysimpo = this.inputBalanceQuantitysimpo + Number(this.invoiceForm.controls['orderValuesimpo' + a + b].value);
  //       //console.log("==============>", this.inputBalanceQuantitysimpo);
  //       if (isNaN(this.overallAmountsimpo) || isNaN(this.inputBalanceQuantitysimpo)) {
  //       }
  //       this.invoiceForm.addControl('overallsimpoAmount' + a, this.fb.control(0))
  //       this.invoiceForm.addControl('inputBalanceQuantitysimpo' + a, this.fb.control(0))

  //       this.invoiceForm.controls['totalOrderQty'].setValue(this.inputBalanceQuantitysimpo);

  //       this.invoiceForm.controls['overallsimpoAmount' + a].setValue(this.overallAmountsimpo);
  //       $("#overallsimpoAmount" + a).val(this.overallAmountsimpo)
  //       console.log(this.invoiceForm.value.overallsimpoAmount0,'===============')
  //       this.invoiceForm.controls['inputBalanceQuantitysimpo' + a].setValue(this.inputBalanceQuantitysimpo);
  //       $("#inputBalanceQuantitysimpo" + a).val(this.inputBalanceQuantitysimpo)
  //   }

  //   }

  //   }

  //   //this.finalTotalAmount +=this.overallAmountsimpo;
  // }


  calculatesimpo(i, j, rate) {
    console.log(" Values================>", i, j, rate, $('#inputQtysimpo' + i + j).val());
    this.calculatedAmountsimpo = 0;
    this.inputBalanceQuantitysimpo = 0;
    if ($('#inputQtysimpo' + i + j).val() == 0 || $('#inputQtysimpo' + i + j).val() == "") {
      console.log("entered");
      this.calculatedAmountsimpo = 0 * parseFloat(rate)
    }
    else {
      this.calculatedAmountsimpo = parseFloat($('#inputQtysimpo' + i + j).val()) * parseFloat(rate)
    }
    // this.overallAmountsimpo = 0;
    this.finalTotalAmount = 0;
    console.log("total===========>", this.calculatedAmountsimpo);
    this.invoiceForm.controls['calRealtimesimpo' + i + j].setValue(Math.round(Number(this.calculatedAmountsimpo) * 100) / 100);
    // for (let a = 0; a < this.uniquelineitems.length; a++) {
    //   if (this.invoiceForm.controls['orderValuesimpo' + a].value == 0 || this.invoiceForm.controls['orderValuesimpo' + a].value == "") {
    //     console.log("entered");
    //   }
    //   this.overallAmountsimpo += this.invoiceForm.controls['calRealtimesimpo' + a].value;
    //   this.inputBalanceQuantitysimpo = this.inputBalanceQuantitysimpo + Number(this.invoiceForm.controls['orderValuesimpo' + a].value);
    //   console.log("==============>", this.inputBalanceQuantitysimpo);
    //   console.log(this.overallAmountsimpo);
    //   if (isNaN(this.overallAmountsimpo) || isNaN(this.inputBalanceQuantitysimpo)) {
    //   }
    // }
    console.log(this.simpoSelectedPo)
    for (let a = 0; a < this.simpoSelectedPo.length; a++) {
      this.overallAmountsimpo = 0;
      this.inputBalanceQuantitysimpo = 0;
      for (let b = 0; b < this.posimponewList.length; b++) {
        console.log(b);
        if (this.posimponewList[b].PO_NUMBER == this.simpoSelectedPo[a]) {
          console.log("true");
          if (this.invoiceForm.controls['orderValuesimpo' + a + b].value == 0 || this.invoiceForm.controls['orderValuesimpo' + a + b].value == "") {
            console.log("entered");
          }
          console.log("this.overallAmountsimpo--", this.overallAmountsimpo);
          this.overallAmountsimpo += this.invoiceForm.controls['calRealtimesimpo' + a + b].value;
          this.finalTotalAmount += this.invoiceForm.controls['calRealtimesimpo' + a + b].value;
          console.log(this.overallAmountsimpo);
          this.inputBalanceQuantitysimpo = this.inputBalanceQuantitysimpo + Number(this.invoiceForm.controls['orderValuesimpo' + a + b].value);
          console.log("==============>", this.inputBalanceQuantitysimpo);
          if (isNaN(this.overallAmountsimpo) || isNaN(this.inputBalanceQuantitysimpo)) {
          }
        }

      }
      this.invoiceForm.controls['overallsimpoAmount' + a].setValue(this.overallAmountsimpo);
      this.invoiceForm.controls['inputBalanceQuantitysimpo' + a].setValue(this.inputBalanceQuantitysimpo);
      this.invoiceForm.controls['totalOrderQty'].setValue(this.inputBalanceQuantitysimpo);
      $("#overallsimpAmount" + a).val(this.overallAmountsimpo)
    }
    this.finalTotalAmount += this.overallAmount;
  }



  calculateTax() {
    if (this.invoiceForm.get('TotalinctaxAmount').value) {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue("");
    }
    if (this.part) {
      this.invoiceForm.controls['taxAmount'].setValue(0);
      let tax = parseFloat(this.invoiceForm.controls['TotalinctaxAmount'].value) - parseFloat(this.invoiceForm.controls['overallAmount'].value)
      Math.round(tax * 100) / 100
      if (isNaN(tax)) {
        tax = this.invoiceForm.controls['TotalinctaxAmount'].value
      }
      // let taxAmt=tax.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
      let taxAmt = Math.round(tax * 100) / 100
      console.log("taxAmt " + taxAmt);
      if (taxAmt < 0) {
        this.negativeFlag = true;
        this.disable = true
      }
      else {
        this.negativeFlag = false;
        this.disable = false;
      }

      this.invoiceForm.controls.taxAmount.setValue(taxAmt);
    }
    else if (this.full) {
      this.invoiceForm.controls['taxAmount'].setValue(0);
      let tax = parseFloat(this.invoiceForm.controls['TotalinctaxAmount'].value) - parseFloat(this.overallAmount);
      if (isNaN(tax)) {
        tax = this.invoiceForm.controls['TotalinctaxAmount'].value
      }
      tax = Math.round(tax * 100) / 100
      this.invoiceForm.controls.taxAmount.setValue(tax);
    }

  }
  calculateTaxSimpo() {
    if (this.part) {
      this.invoiceForm.controls['taxAmount'].setValue(0);
      let tax = parseFloat(this.invoiceForm.controls['TotalinctaxAmount'].value) - parseFloat(this.finalTotalAmount)
      Math.round(tax * 100) / 100
      if (isNaN(tax)) {
        tax = this.invoiceForm.controls['TotalinctaxAmount'].value
      }
      // let taxAmt=tax.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
      let taxAmt = Math.round(tax * 100) / 100
      console.log("taxAmt " + taxAmt);
      if (taxAmt < 0) {
        this.negativeFlag = true;
        this.disable = true
      }
      else {
        this.negativeFlag = false;
        this.disable = false;
      }

      this.invoiceForm.controls.taxAmount.setValue(taxAmt);
    }
    else if (this.full) {
      this.invoiceForm.controls['taxAmount'].setValue(0);
      let tax = parseFloat(this.invoiceForm.controls['TotalinctaxAmount'].value) - parseFloat(this.overallAmount);
      if (isNaN(tax)) {
        tax = this.invoiceForm.controls['TotalinctaxAmount'].value
      }
      tax = Math.round(tax * 100) / 100
      this.invoiceForm.controls.taxAmount.setValue(tax);
    }

  }


  calculateAmount() {
    if (this.part) {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue(0);
      let totalincAmount = parseFloat(this.invoiceForm.controls['taxAmount'].value) + parseFloat(this.invoiceForm.controls['overallAmount'].value)
      Math.round(totalincAmount * 100) / 100;
      if (isNaN(totalincAmount)) {
        totalincAmount = this.invoiceForm.controls['taxAmount'].value
      }
      // let taxAmt=tax.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
      let taxAmtinc = Math.round(totalincAmount * 100) / 100;
      this.invoiceForm.controls.TotalinctaxAmount.setValue(taxAmtinc);
    }
    else if (this.full) {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue(0);
      let tax = parseFloat(this.invoiceForm.controls['taxAmount'].value) + parseFloat(this.overallAmount);
      if (isNaN(tax)) {
        tax = this.invoiceForm.controls['taxAmount'].value
      }
      tax = Math.round(tax * 100) / 100;
      this.invoiceForm.controls.taxAmount.setValue(tax);
    }

  }

  checked() {
    this.editing = !this.editing
    console.log(this.editing);

  }


  numberOnly(event, i): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log($('#total').get(0).id, "IDDDDD");

    console.log($('#inputQty' + i).val());

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#inputQty' + i).val().split('.').length === 2) || ($('#total').val().split('.').length === 2) || ($('#taxAmount').val().split('.').length === 2))) {

      console.log("working")
      return false;

    }


    if (this.hasDecimalPlace(event.target.value, 3)) {
      return false
    }

    console.log(" No working")

    return true;
  }
  hasDecimalPlace(value, x) {
    var pointIndex = value.indexOf('.');
    return pointIndex >= 0 && pointIndex < value.length - x;
  }

  checkBalanceQty(event, balance, val1) {
    var inputValue = event.target.value;
    console.log(inputValue);
    if (parseFloat(inputValue) > parseFloat(balance)) {
      // this.balanceExceeded = true;
      console.log("in");
      this.disable = true;
      this.zeropresent = false;
      $('#inputQty' + val1).addClass('redborder');
      $('#exceeded' + val1).show();


      $('#zero' + val1).hide();
      // $('#isshowDelivery'+ val1).prop('disabled',true);
      this.issubmitcheck = true
      this.balanceExceeded = true;
    }
    else if (Number(inputValue) < 0) {

      this.zeropresent = true;
      this.issubmitcheck = true;
      $('#inputQty' + val1).addClass('redborder');
      $('#zero' + val1).show();
      $('#exceeded' + val1).hide();

    }
    else {
      $('#inputQty' + val1).removeClass('redborder');
      $('#exceeded' + val1).hide();

      $('#zero' + val1).hide();
      // $('#isshowDelivery'+ val1).prop('disabled',false);
      this.issubmitcheck = false
      this.balanceExceeded = false;
      this.disable = false;
      this.zeropresent = false;
    }


  }
  checkBalanceQtysimpo(event, balance, val, val1) {
    var inputValue = event.target.value;
    console.log(inputValue);
    if (parseFloat(inputValue) > parseFloat(balance)) {
      // this.balanceExceeded = true;
      console.log("in");
      this.disable = true;
      this.zeropresent = false;
      $('#inputQtysimpo' + val + val1).addClass('redborder');
      $('#exceededmsgSimpo' + val + val1).show();


      $('#zero' + val + val1).hide();
      // $('#isshowDelivery'+ val1).prop('disabled',true);
      this.issubmitcheck = true
      this.balanceExceeded = true;
    }
    else if (Number(inputValue) < 0) {

      this.zeropresent = true;
      this.issubmitcheck = true;
      $('#inputQtysimpo' + val + val1).addClass('redborder');
      $('#zero' + val + val1).show();
      $('#exceededmsgSimpo' + val + val1).hide();

    }
    else {
      $('#inputQtysimpo' + val + val1).removeClass('redborder');
      $('#exceededmsgSimpo' + val + val1).hide();

      $('#zero' + val + val1).hide();
      // $('#isshowDelivery'+ val1).prop('disabled',false);
      this.issubmitcheck = false
      this.balanceExceeded = false;
      this.disable = false;
      this.zeropresent = false;
    }


  }
  focus() {
    let value = (this.invoiceForm.controls.taxAmount.value)
    value = value.toString().replace(/,/g, '')
    console.log("value==============", value)
    this.invoiceForm.controls.taxAmount.setValue(value)

  }

  focus2() {
    let value = (this.invoiceForm.controls.TotalinctaxAmount.value)
    value = value.toString().replace(/,/g, '')
    console.log("value==============", value)
    this.invoiceForm.controls.TotalinctaxAmount.setValue(value)

  }


  numberOnlytax(event, i): boolean {
    // this.editing=false;
    const charCode = (event.which) ? event.which : event.keyCode;

    console.log($('#total').get(0).id, "IDDDDD");

    console.log($('#inputQty' + i).val());

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#taxAmount').val().split('.').length === 2))) {

      console.log("working")

      // this.dotpresent=false;

      return false;

    }


    if (this.hasDecimalPlace(event.target.value, 2)) {
      return false
    }

    console.log(" No working")

    return true;
  }

  numberOnlyAmount(event, i): boolean {
    // this.editing=false;
    const charCode = (event.which) ? event.which : event.keyCode;

    console.log($('#total').get(0).id, "IDDDDD");

    console.log($('#inputQty' + i).val());

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#total').val().split('.').length === 2))) {

      console.log("working")

      // this.dotpresent=false;

      return false;

    }


    if (this.hasDecimalPlace(event.target.value, 2)) {
      return false
    }

    console.log(" No working")

    // this.balanceQuantity()

    // this.dotpresent=false;

    return true;
  }
  numberOnlyQuantity(event, i): boolean {
    // this.editing=false;
    const charCode = (event.which) ? event.which : event.keyCode;

    console.log($('#inputQty' + i).val());

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#inputQty' + i).val().split('.').length === 2))) {

      console.log("working")

      // this.dotpresent=false;

      return false;

    }


    if (this.hasDecimalPlace(event.target.value, 3)) {
      return false
    }

    console.log(" No working")

    // this.balanceQuantity()

    // this.dotpresent=false;

    return true;
  }

  pos(event) {
    console.log("event.target.value " + event.target.value);
    this.ponumbers.push(event.target.value);
    console.log("this.ponumbers " + this.ponumbers);
  }

  // removeuncheck(index){
  //   alert();
  //   for(index= 0;index<this.checkedList.length;index++){
  //     let tempsplice =  this.checkedList.splice(index, 1);
  //     this.checkedList.push(tempsplice)
  //   }


  // }

  onCheckboxChange(ponumber, option, event) {
    localStorage.setItem("option", ponumber)

    if (event.target.checked) {

      let templist: any = [];
      templist.push(ponumber, option)
      localStorage.setItem('user', JSON.stringify(templist));
      this.checkedList.push(templist);

    }

    else {
      let index = this.checkedList.findIndex(e => e[0] == ponumber && e[1] == option);
      if (index >= 0) {
        this.checkedList.splice(index, 1);
      }
    }
    console.log(this.checkedList);
  }

  isbasepopresent() {
    localStorage.setItem("basepo", this.ponumber)
    let basepo = localStorage.getItem("basepo");
    console.log(basepo)
    //  var basepo = this.ponumber
    //  console.log(basepo)
    let isFoundBasePO = this.checkedList.map(e => e[0]).find(e => e == basepo);
    console.log(isFoundBasePO);
    return isFoundBasePO != undefined;
    for (let i = 0; i < this.checkedList.length; i++) {

      if (basepo == this.checkedList[i][0]) {
        console.log(basepo)
        return true;
      }
      return false;

    }
  }
  countDistinct() {
    let res = 1;
    // Pick all elements one by one
    for (let i = 1; i < this.checkedList.length; i++) {
      let j = 0;
      for (j = 0; j < i; j++)
        if (this.checkedList[i][0] === this.checkedList[j][0])
          break;
      if (i === j)
        res++;
    }
    return res;
  }



  toinvoice(ponum, dcnumber, type) {
    // let hasUniqueValue = this.checkedList.map(e => e[0]);
    // hasUniqueValue = hasUniqueValue.length == new Set(hasUniqueValue).size;



    // console.log('has Uniqiue Value', hasUniqueValue);
    console.log(ponum)
    console.log(this.ponumber)
    localStorage.setItem("basepo", this.ponumber);
    let basedpo = localStorage.getItem("basepo");
    let option = localStorage.getItem("option");

    this.backButtonValue = type;
    if (type == 'special') {
      if (!this.isbasepopresent()) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Please select Base PO - DC number',
          condition: 'success',
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
          this.router.navigate(['/invoicesimpo']);
        });
        return false;
      }
      if (this.countDistinct() < 2) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Please select atleast 2 distinct POs. Base PO is mandatory',
          condition: 'success',
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
          this.router.navigate(['/invoicesimpo']);
        });
        return false;
      }
      let counter = 0;
      for (let i = 0; i < this.checkedList.length; i++) {
        if (+this.checkedList[i] > +this.checkedList[i]) {
          counter++;

        }
        console.log(counter)
      }
      this.tobeinvoiced = true;
      this.lineitemnumberlist = [];
      this.grntobeinvoicelist = []
      this.quantitylist = [];
      var obj = [];
      // this.toinvoiceuniquelineitems = [];
      //this.purchaseOrderListService.getgrnonpoandinvoice(ponum, this.checkedList).subscribe(res => {


      this.purchaseOrderListService.Getgrnbasedoninvoiceandpo(ponum, this.checkedList).subscribe(res => {

        if (res[0].message == "Success") {
          var selectedotn = localStorage.getItem("option");
          var listtemp = localStorage.getItem("templist");
          console.log(this.checkedList)
          var tempos = this.ponumber;

          this.showAddPoButton = false;
          console.log(" res[0].grnbasedonpoandinvoice", res[0].grnbasedonpoandinvoice);
          this.grntobeinvoicelist = res[0].grnbasedonpoandinvoice;
          console.log(this.grntobeinvoicelist)
          this.grninvoicepresent = false;
          this.grnuniquelineitems = [];
          this.finalTotalAmountdisplay = 0;
          this.totalBalQty = 0;
          this.overallAmount = 0;
          this.finalAmount = 0;
          this.inputBalanceQuantity = 0;
          let count = 0;

          for (let index = 0; index < this.grntobeinvoicelist.length; index++) {
            this.inputBalanceQuantity = 0;
            this.finalTotalAmountdisplay = 0;
            for (let z = 0; z < this.grntobeinvoicelist[index].LINEITEMS.length; z++) {
              this.inputBalanceQuantity += parseInt(this.grntobeinvoicelist[index].LINEITEMS[z].GRNQTY);
              this.finalTotalAmountdisplay += parseFloat(this.grntobeinvoicelist[index].LINEITEMS[z].AMOUNT);
            }
            this.grntobeinvoicelist[index].TotalQtyOfItems = this.inputBalanceQuantity;
            this.grntobeinvoicelist[index].TotalQtyAmountitem = this.finalTotalAmountdisplay
            this.overallAmount += this.finalTotalAmountdisplay;
            this.finalTotalAmount += this.finalTotalAmountdisplay;
          }
        }
        //no use start
        else if (type == 'usual') {
          this.grninvoicepresent = false;
          this.tobeinvoiced = false;
        }
        //no use end
      });
    }
    else if (type == 'usual') {
      this.invoiceForm.reset();
      this.grntobeinvoicelist = [];
      this.tobeinvoiced = false;
      this.uniquelineitems = [];
      this.quantitylist = [];
      this.lineitemnumber = [];
      this.lineitemnumberlist = [];
      this.balQtyList = [];
      this.overallAmount = 0;
      if (this.totalBalQty == 0 || this.totalBalQty == 0.0 || this.TypeNo != 'reopen') {
        this.disable = true;
        this.errormessage = "* Can't submit invoice total balance quantity = 0"; //dont show in special
      }
      else if (this.totalBalQty == 0 || this.totalBalQty == 0.0 || this.TypeNo == 'reopen') {
        this.disable = true;
        this.errormessage = " ";
      }

      this.grninvoicepresent = false;
      this.purchaseOrderListService.getPODetails(ponum).subscribe(res => {
        this.uniquelineitems = res[0].poData;
        this.remainingLinewItems = this.uniquelineitems;
        console.log("remainingLinewItems", this.remainingLinewItems);
        for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {
          // console.log("this.uniquelineitems[i].LINEITEMNUMBER "+this.uniquelineitems[i].LINEITEMNUMBER+
          // "this.uniquelineitems[i].BALANCE_QTY "+this.uniquelineitems[i].BALANCE_QTY+" this.uniquelineitems[i] "+this.uniquelineitems[i] +
          // " this.uniquelineitems[i].QUANTITY "+this.uniquelineitems[i].QUANTITY);

          this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
          this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)

          this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
          this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
          console.log("this.lineitemnumberlist " + this.lineitemnumberlist);
          console.log(" this.quantitylist " + this.quantitylist);
          if (this.full) {
            this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
            this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
          }
          this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
          this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
          this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
          this.invoiceForm.addControl('calRealtimesimpo' + i, this.fb.control(0))
        }
        if ((this.totalBalQty == 0 || this.totalBalQty == 0.0) && this.tobeinvoicelist.length == 0 && this.TypeNo != 'reopen') {
          console.log("problem here");
          this.disable = true;
          this.errormessage = "* Can't submit invoice total balance quantity = 0";
        }

        console.log("call form Total Balance Quantity==============>", this.totalBalQty);
        console.log("this.poDetail.length", this.poDetail.length)

        console.log("this.uniquelineitems======>>>", this.uniquelineitems);
        this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
          if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
            return 1;
          }
          if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
            return -1;
          }

          return 0;
        });
        console.log("this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems))
     
        sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
        console.log("Lineitemtext ", this.poDetail)
        for (var i = 0; i < this.poDetail.length; i++) {
          this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
        }
        console.log("this.lineitemnumber. " + this.lineitemnumber);
        var mySet = new Set(this.lineitemnumber);
        mySet.forEach(v => this.lineitemnumberset.push(v));
        console.log("Set items this.lineitemnumberset ==>" + this.lineitemnumberset);

        console.log(removeDuplicates(res[0].poData, 'LINEITEMNUMBER'));
        this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
        return true;
      });
    }
    const removeDuplicates = (array, key) => {
      return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
      }, []);
    };
  }

  backButtonForPart() {
    this.errormessage = '';
    console.log("this.backButtonValue", this.backButtonValue)

    if (this.backButtonValue == "special" || this.backButtonValue == "usual") {
      $(this).addClass(".submissionForm");
      $(this).removeClass(".partInvWrapper");
      this.grninvoicepresent = true;
      this.checkedList = [];
      this.tobeinvoiced = false;
      this.full = false;
      this.part = true;
      this.uniquelineitems = [];
      this.lineitemnumber = [];
      this.grntobeinvoicelist = [];
      this.lineitemnumberlist = [];
      this.quantitylist = [];
      this.finalTotalAmount = 0;
      this.TotalQtyAmountitem = 0;
      this.finalTotalAmountdisplay = 0;
      this.inputBalanceQuantity = 0;
      this.showAddPoButton = true;
      this.poDetail = [];
      this.purchaseOrderListService.getPODetails(this.ponumber).subscribe(res => {
        this.uniquelineitems = res[0].poData;
        for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {
          this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
          this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)

          this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
          this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
          console.log("this.lineitemnumberlist " + this.lineitemnumberlist);
          console.log(" this.quantitylist " + this.quantitylist);
          if (this.full) {
            this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
            this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
          }
          this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
          this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
          // this.invoiceForm.addControl('calRealtimesimpo' + i, this.fb.control(0))
        }
        if ((this.totalBalQty == 0 || this.totalBalQty == 0.0) && this.tobeinvoicelist.length == 0 && this.TypeNo != 'reopen') {

          console.log("problem here");
          this.disable = true;
          this.errormessage = "* Can't submit invoice total balance quantity = 0";
        }

        console.log("call form Total Balance Quantity==============>", this.totalBalQty);
        for (var j = 0; j < this.poDetail.length; j++) {
          if (this.poDetail[j].ORDERNUMBER == null) {
            this.uniquelineitems.push(this.poDetail[j]);
            this.balQtyList.push(this.poDetail[j].BALANCE_QTY)
            console.log("teest", this.poDetail[j].BALANCE_QTY);

          }
        }
        console.log("this.uniquelineitems======>>>", this.uniquelineitems);
        this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
          if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
            return 1;
          }

          if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
            return -1;
          }

          return 0;
        });
        console.log("this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems))

        for(let i=0;i<this.uniquelineitems.length;i++){
          localStorage.setItem("plant",this.uniquelineitems.PLANT)
          console.log(this.uniquelineitems.PLANT)
        }
        sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
        console.log("Lineitemtext ", this.poDetail)
        for (var i = 0; i < this.poDetail.length; i++) {
          this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
        }
        console.log("this.lineitemnumber. " + this.lineitemnumber);
        var mySet = new Set(this.lineitemnumber);
        mySet.forEach(v => this.lineitemnumberset.push(v));
        this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
        return true;
      })
    } else {
      this.router.navigate(['/purchaseOrdersList']);
    }
    this.backButtonValue = '';
  }



  submitpono() {
    // this.tobeinvoiced=false;

    console.log(this.selectedDropdownPO);

    $("#popup2").css("visibility", "hidden");
    $("#popup2").css("opacity", "0");


    this.simpoSelectedPo = [];

    console.log("this.podropdownList.podropdownList----", this.podropdownList);
    // // console.log("this.dropdownList",this.dropdownList);
    // for (let i = 0; i < this.podropdownList.length; i++) {

    //   this.simpoSelectedPo.push(this.podropdownList[i].PO_NUMBER);
    // }
    // console.log("this.simpoSelectedPo---", this.simpoSelectedPo);


    this.selectedDropdownPO.forEach(element => {
      this.simpoSelectedPo.push(element.PO_NUMBER);
      console.log(element.PO_NUMBER);
    });

    console.log(this.simpoSelectedPo);

    this.purchaseOrderListService.simpoEventDetails(this.simpoSelectedPo).subscribe(res => {

      console.log(res);

      this.simpleuniquelineitems.push(res[0].poData)
      this.finalSimpoItems = [];
      // this.finalSimpoItems = this.simpleuniquelineitems[0]
      console.log(" this.finalSimpoItems 01---", this.finalSimpoItems);
      //  console.log(" this.finalSimpoItems 02---", this.finalSimpoItems.length);

      //  this.uniquelineitems.push(res[0].poData);
      this.finalSimpoItems = res[0].poData
      console.log("this.finalSimpoItems", this.finalSimpoItems)
      for (let i = 0; i < this.finalSimpoItems.length; i++) {
        this.posimponewList.push(this.finalSimpoItems[i])
        this.posimponewList[i].TOTALAMOUNT = Number(this.posimponewList[i].BALANCE_QTY) * Number(this.posimponewList[i].RATEPERQTY)
        //  /this.uniquelineitems.push(this.finalSimpoItems[i])/
      }
      console.log(" this.posimponewList---", this.posimponewList);
      for (let a = 0; a < this.simpoSelectedPo.length; a++) {
        for (let b = 0; b < this.posimponewList.length; b++) {
          this.invoiceForm.addControl('orderValuesimpo' + a + b, this.fb.control(0))
          this.invoiceForm.addControl('calRealtimesimpo' + a + b, this.fb.control(0))
          this.invoiceForm.addControl('overallsimpoAmount' + a, this.fb.control(0))
          this.invoiceForm.addControl('inputBalanceQuantitysimpo' + a, this.fb.control(0))
        }
      }
      if (this.posimponewList.length > 0) {
        this.showAddPoButton = false;
      } else {
        this.showAddPoButton = true;
      }
      console.log("this.uniquelineitems", this.uniquelineitems)
    }
    );
    this.selectedItems = [];

  }

  openapproval(n) {
    console.log(n);
    let approvalBox = document.getElementById("approvalBox" + n);
    let closeArrow = document.getElementById("closeArrow" + n);
    let openArrow = document.getElementById("openArrow" + n);
    if (approvalBox.style.display === "block") {
      approvalBox.style.display = "none";
      closeArrow.style.display = "block";
      openArrow.style.display = "none";
    } else {
      approvalBox.style.display = "block";
      openArrow.style.display = "block";
      closeArrow.style.display = "none";
    }
  }

  checklength(type) {
    if (type == 'description') {
      this.descripionlength = 160 - this.invoiceForm.controls['description'].value.length;
    }
    if (type == 'remark') {
      this.remarklength = 160 - this.invoiceForm.controls['remarks'].value.length;
    }
  }

  onchangeresubmit(event) {
    if (event.target.value) {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue("");
      this.invoiceForm.controls['taxAmount'].setValue("");
    }
  }

  openapprovalAddPo(n,panelOpen) {
    console.log("kkk",n);
    console.log(panelOpen);
    let button = document.getElementById("button" + n);
    //let approvalBoxAddPo = document.getElementById("approvalBoxAddPo" + n);
    let closeArrowAddPo = document.getElementById("closeArrowAddPo" + n);
    let openArrowAddPo = document.getElementById("openArrowAddPo" + n);
    if (panelOpen === true) {
      //approvalBoxAddPo.style.display = "block";
      closeArrowAddPo.style.display = "none";
      openArrowAddPo.style.display = "block";
      console.log("openArrowAddPo" + n);
    } else {
      console.log("openArrowAddPo" + n);
      //approvalBoxAddPo.style.display = "none";
      openArrowAddPo.style.display = "none";
      closeArrowAddPo.style.display = "block";
    }

  }

  openapprovalTobeInvoice(n,panel) {
    console.log("kkk",n);
    console.log(panel);
    // let button = document.getElementById("button" + n);
    //let approvalBoxAddPo = document.getElementById("approvalBoxAddPo" + n);
    let closeArrowAddPo = document.getElementById("closeArrowAddPo" + n);
    let openArrowAddPo = document.getElementById("openArrowAddPo" + n);
    if (panel === true) {
      //approvalBoxAddPo.style.display = "block";
      closeArrowAddPo.style.display = "none";
      openArrowAddPo.style.display = "block";
      console.log("openArrowAddPo" + n);
    } else {
      console.log("openArrowAddPo" + n);
      //approvalBoxAddPo.style.display = "none";
      openArrowAddPo.style.display = "none";
      closeArrowAddPo.style.display = "block";
    }

  }



  newsubmitinvoice() {

    if (this.posimponewList.length != 0) {
      console.log("NEW INVOICE SUBMISSION : ", this.invoiceForm.status, this.invoiceForm.value);

      if (this.part) {
        if (this.invoiceForm.controls['totalOrderQty'].value == 0) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'Please enter quantity for atleast one line item',
            condition: 'success',
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
            this.router.navigate(['/trackInvoiceList']);
          });
          return false;
        }

      }

      this.loaderservice.show();
      console.log("INVOICE FORM ==>", this.invoiceForm);
      console.log(this.uniquelineitems.length);
      console.log("this.part " + this.part);

      if (this.part || this.TypeNo == 'resubmit') {
        this.quantitylist = [];
        this.lineitemnumberlist = [];
        this.poSimpoUniquelineitem = [];
        console.log("this.posimponewList", this.posimponewList)
        console.log("this.uniquelineitem og", this.uniquelineitems);

        for (let r = 0; r < this.uniquelineitems.length; r++) {
          this.uniquelineitems[r].QUANTITY = $('#inputQty' + r).val();
          this.uniquelineitems[r].INVOICEAMOUNT = this.invoiceForm.controls['calRealtime' + r].value
        }

        for (let u = 0; u < this.uniquelineitems.length; u++) {
          this.poSimpoUniquelineitem.push(this.uniquelineitems[u]);
        }

        console.log(this.uniquelineitems);
        console.log(this.poSimpoUniquelineitem);

        for (let p = 0; p < this.simpoSelectedPo.length; p++) {
          for (let q = 0; q < this.posimponewList.length; q++) {
            if (this.posimponewList[q].PO_NUMBER == this.simpoSelectedPo[p]) {
              this.posimponewList[q].QUANTITY = $('#inputQtysimpo' + p + q).val();
              this.posimponewList[q].INVOICEAMOUNT = this.invoiceForm.controls['calRealtimesimpo' + p + q].value;
              this.poSimpoUniquelineitem.push(this.posimponewList[q]);
            }
          }
        }

        console.log("this.uniquelineitem ogg", this.uniquelineitems);
        console.log("this.uniquelineitems.length new", this.uniquelineitems.length)

      }

      console.log("is it updating============>", this.quantitylist);
      console.log("this.lineitemnumberlist next", this.lineitemnumberlist);
      console.log("this.uniquelineitems next", this.uniquelineitems);
      this.nullQuantityList = [];
      this.nullDcList = [];
      this.simpoinvoicesubmissionarray = [];
      this.finalInvoiceList = [];
      this.simpouniquelineitems = [];
      var data = ""

      for (let p = 0; p < this.poSimpoUniquelineitem.length; p++) {
        if (this.poSimpoUniquelineitem[p].QUANTITY == undefined || this.poSimpoUniquelineitem[p].QUANTITY == "") {
          this.poSimpoUniquelineitem[p].QUANTITY = 0;
        }
        data = this.poSimpoUniquelineitem[p].PO_NUMBER + "," + this.poSimpoUniquelineitem[p].LINEITEMNUMBER + "," + this.poSimpoUniquelineitem[p].QUANTITY;
        console.log(data);
        this.simpouniquelineitems.push(data);
      }
      console.log(this.simpouniquelineitems);


      if ((this.viewUploadFile != null && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
        (this.withoutpodetails.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
        (this.invoicedata.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "")) {

        console.log("inininin");
        /**
        if (this.TypeNo == 'resubmit') {
          // this.trackOrderListService.getVendorReturn(this.ponumber, this.invNo).subscribe(res => {

          // });
          this.trackOrderListService.getVendorReturnforsimpo(this.simpoSelectedPo, this.invNo).subscribe(res => {

          });
        }
        this.purchaseOrderListService.createCustomDeliveryItemsForSimpo(this.simpouniquelineitems).subscribe(res => {

          if (res[0].message == "Success") {

            this.loaderservice.show();
            var dcnlist: any = [];
            this.dcNumberList = [];
            dcnlist = res[0].dcnvalues;
            console.log("dcnlist", dcnlist);
            // res[0].dcnvalues.forEach(element => {
            //   dcnlist.push(element)
            // });
            for (let p = 0; p < dcnlist.length; p++) {
              data = dcnlist[p].PONUMBER + "," + dcnlist[p].DCNNUM;
              console.log(data);
              this.dcNumberList.push(data);
            }
            this.purchaseOrderListService.getOrderHavingDcnForSimpo(this.dcNumberList).subscribe(res1 => {
              console.log("return========>", res1[0].message, res1[0].orderitems);

              this.orderlineitems = res1[0].orderitems;
              this.nullQuantityList = [];
              this.nullDcList = [];
              this.simpoinvoicesubmissionarray = [];
              this.finalInvoiceList = [];
              // console.log(this.uniquelineitems, 'this.uniquelineitems.length');
              // console.log(this.orderlineitems, 'this.orderlineitems.length');
              for (var k = 0; k < this.orderlineitems.length; k++) {
                // if (this.invoiceForm.controls['orderValuesimpo' + k].value > 0)
                //   this.quantitylist.push(this.invoiceForm.controls['orderValuesimpo' + k].value);
                this.poSimpoUniquelineitem[k].ORDERNUMBER = this.orderlineitems[k].DC;
                this.poSimpoUniquelineitem[k].QUANTITY = this.orderlineitems[k].QUANTITY;
                var nullDc = "";
                if (this.orderlineitems[k].QUANTITY == '0' || this.orderlineitems[k].QUANTITY == '0.000') {
                  // .push(this.orderlineitems[k].DC)
                  nullDc = this.orderlineitems[k].PONUMBER + "," + this.orderlineitems[k].DC;
                  this.nullDcList.push(nullDc);
                }
              }
              for (let h = 0; h < this.poSimpoUniquelineitem.length; h++) {
                if (this.poSimpoUniquelineitem[h].QUANTITY != '0') {
                  this.nullQuantityList.push(this.poSimpoUniquelineitem[h])
                }
              }
              console.log("this.nullQuantityList---", this.nullQuantityList)
              console.log("this.nullDCN", this.nullDcList)
              if (this.multiplefilechanged == true) {
                for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                  if (c == 0) {
                    this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
                  } else {
                    this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                  }
                }
                for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                  if (x == 0) {
                    this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
                  } else {
                    this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                  }
                }
                this.multipleactualfilename = this.customDelivery.multipleactualfilename
                this.multiplesavedfilename = this.customDelivery.multiplesavedfilename
                console.log("this.uniquelineitems.multipleactualfilename ", this.multipleactualfilename);
                console.log("this.uniquelineitems.multiplesavedfilename ", this.multiplesavedfilename);
              }
              console.log("this.uniquelineitems >>", this.uniquelineitems);
              console.log("this.customDelivery >>", this.customDelivery);
              this.poSimpoUniquelineitem = [];
              for (let t = 0; t < this.nullQuantityList.length; t++) {
                this.poSimpoUniquelineitem.push(this.nullQuantityList[t]);
              }
              console.log("this.poSimpoUniquelineitem >>", this.poSimpoUniquelineitem);
              for (var l = 0; l < this.poSimpoUniquelineitem.length; l++) {
                this.customDelivery = new customDelivery();
                this.customDelivery.bid = this.poSimpoUniquelineitem[l].BUSINESSPARTNEROID;
                this.customDelivery.po_num = this.poSimpoUniquelineitem[l].PO_NUMBER;
                this.customDelivery.irnNumber = '';
                this.customDelivery.irnDate = null;
                this.customDelivery.invoiceNumber = this.invoiceForm.controls['invoiceNo'].value.trim();
                this.customDelivery.invoiceDate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY");
                this.customDelivery.rateperquantity = this.poSimpoUniquelineitem[l].RATEPERQTY;
                console.log(this.poSimpoUniquelineitem[l].SERVICENUMBER, 'this.poSimpoUniquelineitem[l].SERVICENUMBER-----------------------------')
                this.customDelivery.servicenumber = this.poSimpoUniquelineitem[l].SERVICENUMBER;
                this.customDelivery.lineItemNumber = this.poSimpoUniquelineitem[l].LINEITEMNUMBER;
                this.customDelivery.lineitemtext = this.poSimpoUniquelineitem[l].LINEITEMTEXT;
                this.customDelivery.orderNumber = this.poSimpoUniquelineitem[l].ORDERNUMBER;
                // this.customDelivery.beforesubmissioninvoicenumber = '';
                if (this.TypeNo == 'resubmit') {
                  console.log(this.invoicedata[0].BUYER);
                  console.log(this.invoicedata[0].REQUSITIONER);
                  console.log(this.invoicedata[0].BUSSINESSPARTNERTEXT);
                  this.customDelivery.beforesubmissioninvoicenumber = this.invNo;
                  this.customDelivery.businessPartnerText = this.invoicedata[0].BUSSINESSPARTNERTEXT;
                  this.customDelivery.contactPerson = this.invoicedata[0].REQUSITIONER;
                  this.customDelivery.buyerid = this.invoicedata[0].BUYER;
                } else {
                  this.customDelivery.beforesubmissioninvoicenumber = "";
                  this.customDelivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
                  this.customDelivery.contactPerson = sessionStorage.getItem("Requisitioner");
                  this.customDelivery.buyerid = sessionStorage.getItem("Buyer");
                }
                console.log(this.customDelivery.businessPartnerText, ' this.customDelivery.businessPartnerText')
                this.customDelivery.quantity = this.poSimpoUniquelineitem[l].QUANTITY;
                this.customDelivery.uOM = this.poSimpoUniquelineitem[l].UNITOFMEASURE;
                this.customDelivery.contactPersonPhone = this.poSimpoUniquelineitem[l].CONTACTPERSONPHONE;
                this.customDelivery.vendorID = this.vendorid;
                this.customDelivery.company = this.poSimpoUniquelineitem[l].COMPANY;
                this.customDelivery.plant = this.poSimpoUniquelineitem[l].PLANT;
                this.customDelivery.department = null;
                this.customDelivery.storagelocation = this.poSimpoUniquelineitem[l].STORAGELOCATION;
                // this.customDelivery.storagelocation = null;
                this.customDelivery.costCentre = null;
                this.customDelivery.category = null;
                this.customDelivery.profileID = '';
                this.customDelivery.invoiceDocumentPath = '';
                this.customDelivery.iGSTAmount = '';
                this.customDelivery.cGSTAmount = '';
                this.customDelivery.sgstAmount = '';
                this.customDelivery.grnnumber = '-';
                this.customDelivery.uniquereferencenumber = '-';
                this.customDelivery.saplineitemnumber = '-';
                this.customDelivery.srcnnumber = '-';
                this.customDelivery.totalAmount = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '');
                this.customDelivery.description = this.invoiceForm.controls['description'].value;
                this.customDelivery.remark = this.invoiceForm.controls['remarks'].value;
                this.customDelivery.totalamtinctaxes = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '')
                this.customDelivery.taxamount = (this.invoiceForm.controls['taxAmount'].value).toString().replace(/,/g, '')
                this.customDelivery.status = 'P';
                this.customDelivery.actualfilename = this.actualfilename;
                this.customDelivery.savedfilename = this.savedfilename;
                this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");// this.ArrayOfSelectedFilename.toString().replace(/,/g, "");
                this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
                if (this.multiplefilechanged == false) {
                  for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                    if (c == 0) {
                      this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
                    } else {
                      this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                    }
                  }
                  for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                    if (x == 0) {
                      this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
                    } else {
                      this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                    }
                  }
                  this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");// this.ArrayOfSelectedFilename.toString().replace(/,/g, "");
                  this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");

                  console.log("this.uniquelineitems.multipleactualfilename ", this.multipleactualfilename);
                  console.log("this.uniquelineitems.multiplesavedfilename ", this.multiplesavedfilename);
                }
                this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
                if (this.invoicefilechanged == false) {

                  if (this.TypeNo == 'resubmit') {
                    this.customDelivery.actualfilename = this.actualresubmitfilename;
                    this.customDelivery.savedfilename = this.savedresubmitfilename;
                  }
                  else {
                    this.customDelivery.actualfilename = this.actualfilenameofwopo;
                    this.customDelivery.savedfilename = this.savedfilenameofwopo;
                  }

                }
                else {
                  this.customDelivery.actualfilename = this.actualfilename;
                  this.customDelivery.savedfilename = this.savedfilename;
                }

                this.customDelivery.material = this.poSimpoUniquelineitem[l].MATERIAL;
                this.customDelivery.createdby = sessionStorage.getItem("loginUser");
                this.customDelivery.managerid = "sachin.kale@timesgroup.com";
                if (this.invoiceForm.controls['billofladingdate'].value != null) {
                  this.customDelivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");

                }
                else {

                  this.customDelivery.billofladingdate = "Invalid date";
                }
                this.customDelivery.balance_qty = Number(this.poSimpoUniquelineitem[l].BALANCE_QTY);
                this.customDelivery.invoiceamount = this.poSimpoUniquelineitem[l].INVOICEAMOUNT;
                this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");// this.ArrayOfSelectedFilename.toString().replace(/,/g, "");
                this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");

                this.customDelivery.stage = "1";

                console.log("this.invoice--", this.invoice)
                if (this.invoice != true) {
                  console.log("this.invoiceForm.controls['irnNo'].value;", this.invoiceForm.controls['irnNo'].value)
                  this.customDelivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                  console.log("test date===========>", this.invoiceForm.controls['irnDate'].value);

                  this.customDelivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");

                }
                else {
                  this.customDelivery.irnNumber = "";
                  if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
                    this.customDelivery.irnDate = null;
                  }
                }
                console.log(this.customDelivery, 'customDelivery')
                this.finalInvoiceList.push(this.customDelivery);
                console.log(this.finalInvoiceList, 'finalInvoiceList')
              }
              this.simpoinvoicesubmissionarray = this.finalInvoiceList;
              console.log(this.poSimpoUniquelineitem);
              this.purchaseOrderListService.simpoSubmitInvoice(this.simpoinvoicesubmissionarray).subscribe(res => {
                sessionStorage.removeItem("invwopodetails");
                console.log("res[0].Uniquemessage--", res[0].Uniquemessage)
                if (res[0].message == "Success") {

                  this.purchaseOrderListService.deleteEmptyDeliveriesSimpo(this.nullDcList).subscribe(res => {

                    if (this.customDelivery.irnDate == null) {
                      if (res[0].message == "Success") {
                        this.loaderservice.hide();
                        const dialogConfig = new MatDialogConfig();

                        dialogConfig.data = {
                          message: 'Invoice has been submitted successfully.Please send the physical invoice as per process ',
                          condition: 'success',
                          page: 'invoicesubmit',
                          specific: 'confirmation'
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
                          this.router.navigate(['/trackInvoiceList']);
                        });
                      }
                    }
                    else if (res[0].message == "Success") {
                      this.loaderservice.hide();
                      const dialogConfig = new MatDialogConfig();

                      dialogConfig.data = {
                        message: 'Invoice has been submitted successfully.',
                        condition: 'success',
                        page: 'invoicesubmit',
                        specific: 'confirmation'
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
                        this.router.navigate(['/trackInvoiceList']);
                      });
                    }
                  });
                  console.log("Inin");
                  this.invoiceForm.reset();
                  this.viewAttachmentName = "";
                  if (this.invoiceForm.controls['irnDate'].value != null) {
                    this.successmessage = "Invoice has been submitted successfully. ";
                    this.success = true;
                  }
                  else {
                    this.successmessage = "Invoice has been submitted successfully Please send the physical invoice as per process";
                    this.success = true;
                  }
                }
                else {
                  this.loaderservice.hide();
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: res[0].Uniquemessage,
                    condition: 'error',
                    page: 'invoicesubmit',
                    specific: 'confirmation'
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
                  this.successmessage = res[0].Uniquemessage;
                  this.error = true;
                  console.log(this.uniquelineitems)
                  // this.invoiceForm.reset();
                  // this.viewAttachmentName = "";
                  // this.router.navigate(['/purchaseOrdersList']);

                }
                this.loaderservice.hide();
              });



            })


          }



        });

        **/


        for (let h = 0; h < this.poSimpoUniquelineitem.length; h++) {
          if (this.poSimpoUniquelineitem[h].QUANTITY != '0') {
            this.nullQuantityList.push(this.poSimpoUniquelineitem[h])
          }
        }

        console.log("==>this.nullQuantityList : ", this.nullQuantityList)

        this.poSimpoUniquelineitem = [];
        for (let t = 0; t < this.nullQuantityList.length; t++) {
          this.poSimpoUniquelineitem.push(this.nullQuantityList[t]);
        }

        console.log("==>this.poSimpoUniquelineitem : ", this.poSimpoUniquelineitem);

        for (var l = 0; l < this.poSimpoUniquelineitem.length; l++) {
          this.customDelivery = new customDelivery();
          this.customDelivery.bid = this.poSimpoUniquelineitem[l].BUSINESSPARTNEROID;
          this.customDelivery.po_num = this.poSimpoUniquelineitem[l].PO_NUMBER;
          this.customDelivery.irnNumber = '';
          this.customDelivery.irnDate = null;
          this.customDelivery.invoiceNumber = this.invoiceForm.controls['invoiceNo'].value.trim();
          this.customDelivery.invoiceDate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY");
          this.customDelivery.rateperquantity = this.poSimpoUniquelineitem[l].RATEPERQTY;
          console.log(this.poSimpoUniquelineitem[l].SERVICENUMBER, 'this.poSimpoUniquelineitem[l].SERVICENUMBER-----------------------------')
          this.customDelivery.servicenumber = this.poSimpoUniquelineitem[l].SERVICENUMBER;
          this.customDelivery.lineItemNumber = this.poSimpoUniquelineitem[l].LINEITEMNUMBER;
          this.customDelivery.lineitemtext = this.poSimpoUniquelineitem[l].LINEITEMTEXT;
          this.customDelivery.orderNumber = this.poSimpoUniquelineitem[l].ORDERNUMBER;
          // this.customDelivery.beforesubmissioninvoicenumber = '';
          if (this.TypeNo == 'resubmit') {
            console.log(this.invoicedata[0].BUYER);
            console.log(this.invoicedata[0].REQUSITIONER);
            console.log(this.invoicedata[0].BUSSINESSPARTNERTEXT);
            this.customDelivery.beforesubmissioninvoicenumber = this.invNo;
            this.customDelivery.businessPartnerText = this.invoicedata[0].BUSSINESSPARTNERTEXT;
            this.customDelivery.contactPerson = this.invoicedata[0].REQUSITIONER;
            this.customDelivery.buyerid = this.invoicedata[0].BUYER;
          } else {
            this.customDelivery.beforesubmissioninvoicenumber = "";
            this.customDelivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
            this.customDelivery.contactPerson = sessionStorage.getItem("Requisitioner");
            this.customDelivery.buyerid = sessionStorage.getItem("Buyer");
          }

          console.log(this.customDelivery.businessPartnerText, ' this.customDelivery.businessPartnerText')

          this.customDelivery.quantity = this.poSimpoUniquelineitem[l].QUANTITY;
          this.customDelivery.uOM = this.poSimpoUniquelineitem[l].UNITOFMEASURE;
          this.customDelivery.contactPersonPhone = this.poSimpoUniquelineitem[l].CONTACTPERSONPHONE;
          this.customDelivery.vendorID = this.vendorid;
          this.customDelivery.company = this.poSimpoUniquelineitem[l].COMPANY;
          this.customDelivery.plant = this.poSimpoUniquelineitem[l].PLANT;
          this.customDelivery.department = null;
          this.customDelivery.storagelocation = this.poSimpoUniquelineitem[l].STORAGELOCATION;
          // this.customDelivery.storagelocation = null;
          this.customDelivery.costCentre = null;
          this.customDelivery.category = null;
          this.customDelivery.profileID = '';
          this.customDelivery.invoiceDocumentPath = '';
          this.customDelivery.iGSTAmount = '';
          this.customDelivery.cGSTAmount = '';
          this.customDelivery.sgstAmount = '';
          this.customDelivery.grnnumber = '-';
          this.customDelivery.uniquereferencenumber = '-';
          this.customDelivery.saplineitemnumber = '-';
          this.customDelivery.srcnnumber = '-';
          this.customDelivery.totalAmount = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '');;
          this.customDelivery.description = this.invoiceForm.controls['description'].value;
          this.customDelivery.remark = this.invoiceForm.controls['remarks'].value;
          this.customDelivery.totalamtinctaxes = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '')
          this.customDelivery.taxamount = (this.invoiceForm.controls['taxAmount'].value).toString().replace(/,/g, '')
          this.customDelivery.status = 'P';

          this.customDelivery.actualfilename = this.actualfilename;
          this.customDelivery.savedfilename = this.savedfilename;
          this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");// this.ArrayOfSelectedFilename.toString().replace(/,/g, "");
          this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");

          if (this.multiplefilechanged == false) {
            for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
              if (c == 0) {
                this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
              } else {
                this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
              }
            }
            for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
              if (x == 0) {
                this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
              } else {
                this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
              }
            }
            this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");// this.ArrayOfSelectedFilename.toString().replace(/,/g, "");
            this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");

            console.log("this.uniquelineitems.multipleactualfilename ", this.multipleactualfilename);
            console.log("this.uniquelineitems.multiplesavedfilename ", this.multiplesavedfilename);
          }
          this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");

          if (this.invoicefilechanged == false) {

            if (this.TypeNo == 'resubmit') {
              this.customDelivery.actualfilename = this.actualresubmitfilename;
              this.customDelivery.savedfilename = this.savedresubmitfilename;
            }
            else {
              this.customDelivery.actualfilename = this.actualfilenameofwopo;
              this.customDelivery.savedfilename = this.savedfilenameofwopo;
            }

          }
          else {
            this.customDelivery.actualfilename = this.actualfilename;
            this.customDelivery.savedfilename = this.savedfilename;
          }

          this.customDelivery.material = this.poSimpoUniquelineitem[l].MATERIAL;
          this.customDelivery.createdby = sessionStorage.getItem("loginUser");
          this.customDelivery.managerid = "sachin.kale@timesgroup.com";
          if (this.invoiceForm.controls['billofladingdate'].value != null) {
            this.customDelivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");

          }
          else {
            this.customDelivery.billofladingdate = "Invalid date";
          }
          this.customDelivery.balance_qty = Number(this.poSimpoUniquelineitem[l].BALANCE_QTY);
          this.customDelivery.invoiceamount = this.poSimpoUniquelineitem[l].INVOICEAMOUNT;
          this.customDelivery.multiplesavedfilename = this.multiplesavedfilename;
          this.customDelivery.multipleactualfilename = this.multipleactualfilename;
          this.customDelivery.stage = "1";

          console.log("this.invoice--", this.invoice)
          if (this.invoice != true) {
            console.log("this.invoiceForm.controls['irnNo'].value;", this.invoiceForm.controls['irnNo'].value)
            this.customDelivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
            console.log("test date===========>", this.invoiceForm.controls['irnDate'].value);

            this.customDelivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
            this.customDelivery.invoicetype = "E-Invoice";
          }
          else {
            this.customDelivery.irnNumber = "";
            if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
              this.customDelivery.irnDate = null;
            }
            this.customDelivery.invoicetype = "Invoice";
          }
          this.customDelivery.type = this.TypeNo;

          console.log("Previous Invoice number: ", this.invNo);
          console.log("Previous PO number: ", this.simpoPreviouslySelectedPo);
          if (this.invNo != null && this.invNo != undefined && this.invNo != '') {
            this.customDelivery.previnvno = this.invNo;
          } else {
            this.customDelivery.previnvno = "";
          }
          this.customDelivery.prevponos = "";
          /**
          if (this.simpoPreviouslySelectedPo != null) {
            for (var i = 0; i < this.simpoPreviouslySelectedPo.length; i++) {
              this.customDelivery.prevponos = this.customDelivery.prevponos + this.simpoPreviouslySelectedPo[i] + ",";
            }
            console.log("BF POS - " + this.customDelivery.prevponos);
            this.customDelivery.prevponos = this.customDelivery.prevponos.substring(0, this.customDelivery.prevponos.length - 1);
            console.log("AF POS - " + this.customDelivery.prevponos);
          }
          */

          // this.customDelivery.previnvno = sessionStorage.getItem("previousinvno");
          if (this.previnvdt != null && this.previnvdt != undefined) {
            this.delivery.previnvdate = moment(new Date(this.previnvdt)).format("DD/MM/YYYY");;
          } else {
            this.delivery.previnvdate = "";
          }
          this.customDelivery.prevponos = (this.simpoSelectedPo.toString());
          this.customDelivery.notifyenduseremailiD = this.invoiceForm.controls['endUser'].value;

          console.log(this.customDelivery, 'customDelivery')
          this.finalInvoiceList.push(this.customDelivery);
          console.log(this.finalInvoiceList, 'finalInvoiceList')
        }
        this.simpoinvoicesubmissionarray = this.finalInvoiceList;
        console.log(this.poSimpoUniquelineitem);


        this.purchaseOrderListService.simpoSubmitInvoice(this.simpoinvoicesubmissionarray).subscribe(res => {
          sessionStorage.removeItem("invwopodetails");

          console.log("res[0].Uniquemessage--", res[0].Uniquemessage)

          if (res[0].message == "Success") {

            this.loaderservice.hide();
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Invoice has been submitted successfully',
              condition: 'success',
              page: 'invoicesubmit',
              specific: 'confirmation'
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
              this.router.navigate(['/trackInvoiceList']);
            });


            console.log("Inin");
            this.invoiceForm.reset();
            this.viewAttachmentName = "";
            this.successmessage = "Invoice has been submitted successfully";
            this.success = true;
          } else {
            this.loaderservice.hide();
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: res[0].Uniquemessage,
              condition: 'error',
              page: 'invoicesubmit',
              specific: 'confirmation'
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
            this.successmessage = res[0].Uniquemessage;
            this.error = true;
            console.log(this.uniquelineitems)
            // this.invoiceForm.reset();
            // this.viewAttachmentName = "";
            // this.router.navigate(['/purchaseOrdersList']);

          }
          this.loaderservice.hide();
        });

      }
      else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Please upload the File',
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


        this.loaderservice.hide();
        return false;
      }
    }
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'Please add atleast one PO',
        condition: 'success',
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
        // this.router.navigate(['/trackInvoiceList']);
      });
      return false;
    }
  }


  newsubmittobeinvoice() {

    this.poSimpoUniquelineitem = [];
    console.log("this.posimponewList", this.posimponewList)
    console.log("NEW TO BE INVOICE SUBMISSION")
    this.loaderservice.show();

    console.log("values here ==>", this.invoiceForm);
    console.log(this.uniquelineitems.length);
    console.log("this.part " + this.part);

    this.quantitylist = [];
    this.lineitemnumberlist = [];
    this.poSimpoUniquelineitem = [];

    if (this.part || this.full) {
      
      console.log("this.posimponewList", this.posimponewList)
      console.log("this.uniquelineitem og", this.uniquelineitems);
      // this.uniquelineitems.push(this.posimponewList);

      for (let r = 0; r < this.uniquelineitems.length; r++) {
        this.uniquelineitems[r].QUANTITY = $('#inputQty' + r).val();
        this.uniquelineitems[r].INVOICEAMOUNT = this.invoiceForm.controls['calRealtime' + r].value
        // else{
        //   this.uniquelineitems[0].QUANTITY = $('#inputQtysimpo' + r).val()
        // }
      }
      for (let u = 0; u < this.uniquelineitems.length; u++) {
        this.poSimpoUniquelineitem.push(this.uniquelineitems[u]);
      }
      console.log(this.uniquelineitems);
      console.log(this.poSimpoUniquelineitem);
      // if(this.multiPOFinalList.length > 0)
      // {
      //   this.simpoSelectedPo = this.multiPOFinalList;
      // }
      for (let p = 0; p < this.simpoSelectedPo.length; p++) {
        for (let q = 0; q < this.posimponewList.length; q++) {
          if (this.posimponewList[q].PO_NUMBER == this.simpoSelectedPo[p]) {
            this.posimponewList[q].QUANTITY = $('#inputQtysimpo' + p + q).val();
            this.posimponewList[q].INVOICEAMOUNT = this.invoiceForm.controls['calRealtimesimpo' + p + q].value;
            this.poSimpoUniquelineitem.push(this.posimponewList[q]);
          }

          // else{
          //   this.uniquelineitems[0].QUANTITY = $('#inputQtysimpo' + r).val()
          // }
        }

      }
      // for(let z= 0; z<this.posimponewList.length ; z++){
      // }
      // this.uniquelineitems = this.uniquelineitems.concat(this.posimponewList);
      console.log("this.uniquelineitem ogg", this.uniquelineitems);


      console.log("this.uniquelineitems.length new", this.uniquelineitems.length)

    }

    console.log("is it updating============>", this.quantitylist);
    console.log("this.lineitemnumberlist next", this.lineitemnumberlist);
    console.log("this.uniquelineitems next", this.uniquelineitems);

    this.simpouniquelineitems = [];
    this.simpoinvoicesubmissionarray = [];
    this.finalInvoiceList = [];
    var data: any = [];
    console.log(this.tobeinvoicelist, this.grntobeinvoicelist);

    for (let index = 0; index < this.grntobeinvoicelist.length; index++) {
      for (let z = 0; z < this.grntobeinvoicelist[index].LINEITEMS.length; z++) {
        if (this.grntobeinvoicelist[index].PONUMBER) {

          if (this.grntobeinvoicelist[index].GRNQTY == undefined || this.grntobeinvoicelist[index].GRNQTY == "") {
            this.grntobeinvoicelist[index].GRNQTY = 0;
            data = this.grntobeinvoicelist[index].PONUMBER + "," + this.grntobeinvoicelist[index].LINEITEMS[z].LINEITEMNO + ","
              + this.grntobeinvoicelist[index].LINEITEMS[z].GRNQTY + "," + this.grntobeinvoicelist[index].LINEITEMS[z].DCNUMBER;
            console.log(data);
            this.simpouniquelineitems.push(data);
          }
        }
      }
    }
    console.log(this.simpouniquelineitems);


    if ((this.viewUploadFile != null && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
      (this.withoutpodetails.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "") ||
      (this.invoicedata.length != 0 && this.viewAttachmentName != null && this.viewAttachmentName != "")) {
      console.log("inininin");
     /**      
     if (this.TypeNo == 'resubmit') {
        // this.trackOrderListService.getVendorReturn(this.ponumber, this.invNo).subscribe(res => {

        // });
        this.trackOrderListService.getVendorReturnforsimpo(this.simpoSelectedPo, this.invNo).subscribe(res => {

        });
      }

      this.purchaseOrderListService.createCustomDeliveryItemForSimpoWithDc(this.simpouniquelineitems).subscribe(res => {
        if (res[0].message == "Success") {

          this.dcnlistSimpo = res[0].dcnvalues;
          console.log("dcnlistSimpo", this.dcnlistSimpo);
        }


        // })
        this.purchaseOrderListService.createCustomDeliveryItemsForSimpo(this.simpouniquelineitems).subscribe(res => {
         
          if (res[0].message == "Success") {
            this.loaderservice.show();
            var dcnlist: any = [];
            this.dcNumberList = [];
            dcnlist = res[0].dcnvalues;
            console.log("dcnlist", dcnlist);
            // res[0].dcnvalues.forEach(element => {
            //   dcnlist.push(element)
            // });


            for (let p = 0; p < dcnlist.length; p++) {
              data = dcnlist[p].PONUMBER + "," + dcnlist[p].DCNNUM;
              console.log(data);
              this.dcNumberList.push(data);

            }
          }

          this.purchaseOrderListService.getOrderHavingDcnForSimpo(this.dcNumberList).subscribe(res1 => {

            console.log("return========>", res1[0].message, res1[0].orderitems);
            this.simpoinvoicesubmissionarray = [];
            this.finalInvoiceList = [];
            this.orderlineitems = res1[0].orderitems;
            // console.clear();
            console.log('OrderLive Items', this.orderlineitems);
            console.log('GRN To Be InvoiceList', this.grntobeinvoicelist);
            var count = 0;

            for (let i = 0; i < this.dcnlistSimpo.length; i++) {

              **/

              for (let index = 0; index < this.grntobeinvoicelist.length; index++) {

                for (let z = 0; z < this.grntobeinvoicelist[index].LINEITEMS.length; z++) {
                  this.customDelivery = new customDelivery();
                  this.customDelivery.bid = sessionStorage.getItem("Bid");
                  this.customDelivery.po_num = this.grntobeinvoicelist[index].LINEITEMS[z].PONUMBER;

                  /**
                   * DCN number will be mapped at the time of invoice submission
                   */
                  // this.customDelivery.orderNumber = this.dcnlistSimpo[i].DCNNUM

                  console.log(this.customDelivery.orderNumber)
                  console.log(this.customDelivery.po_num)


                  if (this.invoiceForm.controls['irnDate'].value != null) {
                    this.customDelivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
                    this.customDelivery.invoicetype = "E-invoice";
                  }
                  else {
                    this.customDelivery.irnDate = null;
                  }
                  if (this.invoiceForm.controls['billofladingdate'].value != null) {
                    this.customDelivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");
                    this.customDelivery.invoicetype = "invoice";
                  }
                  this.customDelivery.irnNumber = "";
                  if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
                    this.customDelivery.irnDate = null;
                  }

                  this.customDelivery.dcnumber = this.grntobeinvoicelist[index].LINEITEMS[z].DCNUMBER;
                  this.customDelivery.lineItemNumber = this.grntobeinvoicelist[index].LINEITEMS[z].LINEITEMNO;
                  this.customDelivery.lineitemtext = this.grntobeinvoicelist[index].LINEITEMS[z].lineitemtext;
                  this.customDelivery.quantity = this.grntobeinvoicelist[index].LINEITEMS[z].GRNQTY;
                  this.customDelivery.grnnumber = this.grntobeinvoicelist[index].LINEITEMS[z].GRNNUMBER;
                  this.customDelivery.rateperquantity = this.grntobeinvoicelist[index].LINEITEMS[z].RATEPERQTY;
                  this.customDelivery.uniquereferencenumber = "-";
                  this.customDelivery.balance_qty = Number(this.grntobeinvoicelist[index].LINEITEMS[z].balance_qty);
                  this.customDelivery.invoiceamount = Number(this.grntobeinvoicelist[index].LINEITEMS[z].AMOUNT);
                  this.customDelivery.saplineitemnumber = this.grntobeinvoicelist[index].LINEITEMS[z].SAPLINEITEMNO;
                  this.customDelivery.plant = localStorage.getItem("PLANTNO");
                  this.customDelivery.contactPerson = sessionStorage.getItem("Requisitioner");
                  this.customDelivery.vendorID = this.vendorid;
                  this.customDelivery.costCentre = null;
                  this.customDelivery.category = null;
                  this.customDelivery.company = null;
                  this.customDelivery.department = null;
                  this.customDelivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
                  this.customDelivery.profileID = "";
                  this.customDelivery.invoiceDocumentPath = "";
                  this.customDelivery.iGSTAmount = "";
                  this.customDelivery.cGSTAmount = "";
                  this.customDelivery.sgstAmount = "";
                  this.customDelivery.uOM = "L";
                  // this.customDelivery.contactPerson = "sachin.mehta@timesgroup.com" //  sessionStorage.getItem("Requisitioner");
                  this.customDelivery.contactPersonPhone = null;
                  this.customDelivery.invoiceNumber = this.invoiceForm.controls["invoiceNo"].value.trim();
                  this.customDelivery.totalAmount = this.invoiceForm.controls["TotalinctaxAmount"].value.toString().replace(/,/g, "");
                  this.customDelivery.description = this.invoiceForm.controls['description'].value;
                  this.customDelivery.remark = this.invoiceForm.controls['remarks'].value;
                  this.customDelivery.status = "P";
                  this.customDelivery.actualfilename = this.viewAttachmentName;
                  if (this.invoicefilechanged == false) {
                    this.customDelivery.actualfilename = this.actualfilenameofwopo;
                    this.customDelivery.savedfilename = this.savedfilenameofwopo;


                  }
                  else {
                    this.customDelivery.actualfilename = this.actualfilename;
                    this.customDelivery.savedfilename = this.savedfilename;
                  }
                  this.customDelivery.createdby = sessionStorage.getItem("loginUser");
                  this.customDelivery.managerid = "sachin.kale@timesgroup.com";

                  this.customDelivery.buyerid = sessionStorage.getItem("Buyer");
                  this.customDelivery.stage = "1";
                  this.customDelivery.material = "INK";
                  this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");
                  this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
                  if (this.multiplefilechanged == true) {
                    for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                      if (c == 0) {
                        this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
                      } else {
                        this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                      }
                    }
                    for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                      if (x == 0) {
                        this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
                      } else {
                        this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                      }
                    }
                    this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename.slice(0, -1);
                    this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename.slice(0, -1);
                    console.log("this.uniquelineitems.multipleactualfilename ", this.customDelivery.multipleactualfilename);
                    console.log("this.uniquelineitems.multiplesavedfilename ", this.customDelivery.multiplesavedfilename);
                  }

                  this.customDelivery.invoiceDate = moment(
                    new Date(
                      this.invoiceForm.controls["invoiceDate"].value
                    )
                  ).format("DD/MM/YYYY");
                  this.customDelivery.totalamtinctaxes = this.customDelivery.totalamtinctaxes =
                    this.invoiceForm.controls[
                      "TotalinctaxAmount"
                    ].value
                      .toString()
                      .replace(/,/g, "");
                  this.customDelivery.taxamount =
                    this.invoiceForm.controls["taxAmount"].value
                      .toString()
                      .replace(/,/g, "");

                 this.customDelivery.storagelocation = this.grntobeinvoicelist[index].LINEITEMS[z].TOINVOICESTORAGELOCATION;
              this.customDelivery.uniquereferencenumber = this.grntobeinvoicelist[index].LINEITEMS[z].SAPUNIQUEREFERENCENO;
              this.customDelivery.saplineitemnumber = this.grntobeinvoicelist[index].LINEITEMS[z].SAPLINEITEMNO;
              this.customDelivery.servicenumber = this.grntobeinvoicelist[index].LINEITEMS[z].SERVICENUMBER;
              // this.customDelivery.beforesubmissioninvoicenumber = this.grntobeinvoicelist[index].LINEITEMS[z].SAPLINEITEMNO;

              if (this.grntobeinvoicelist[index].LINEITEMS[z].SRCNUMBER) {
                this.customDelivery.srcnnumber = this.grntobeinvoicelist[index].LINEITEMS[z].SRCNUMBER;
              }else {
                this.customDelivery.srcnnumber = "-";
              }
                  // this.customDelivery.previnvno = "";
                  // this.customDelivery.previnvdate ="";
                  // this.customDelivery.prevponos = "";
                  this.customDelivery.type = "tobeinovice";
                  this.customDelivery.notifyenduseremailiD = this.invoiceForm.controls['endUser'].value;

                  this.finalInvoiceList.push(this.customDelivery);
                  console.log(this.customDelivery)

                }
              }


            // } // dcn loop need to be commented

              /**
            var arrayout = [];
            var count = 0;
            var strat = false;
            console.log(Object.keys(this.finalInvoiceList));
            console.log(this.finalInvoiceList);
            console.log(this.dcnlistSimpo);
            for (let i = 0; i < this.finalInvoiceList.length; i++) {
              for (let j = 0; j < this.dcnlistSimpo.length; j++) {
                if (this.finalInvoiceList[i].dcnumber == this.dcnlistSimpo[j].OLDDC
                  && this.finalInvoiceList[i].po_num == this.dcnlistSimpo[j].PONUMBER
                  && this.finalInvoiceList[i].lineItemNumber == this.dcnlistSimpo[j].LINEITEMNUMBER
                  && this.finalInvoiceList[i].orderNumber == this.dcnlistSimpo[j].DCNNUM) {
                  strat = true;
                  arrayout.push(this.finalInvoiceList[i])
                }
              }
              count++;
            }
            console.log(arrayout)
 */

            this.simpoinvoicesubmissionarray = this.finalInvoiceList;
            console.log(this.simpoinvoicesubmissionarray)

            //  this.arr3 =this.orderlineitems.map(item =>{
            //   let foundItems = this.finalInvoiceList.find(e => e.po_num == item.PONUMBER && e.OLDDC == item.dcnumber && e.DCNNUM == item.ordernumber)
            //   console.log("find", foundItems)
            // })
            // this.arr3 = this.grntobeinvoicelist.map(item => {
            //   let foundItems = this.orderlineitems.filter(e =>e.PONUMBER == item.PONUMBER &&  e.DCNUMBER == item.OLDDCNUMBER &&  e.LINEITEMNO == item.LINEITEMNUMBER);
            //  console.log(foundItems)
            //   if(foundItems != undefined) {
            //      for (const key in foundItems) {
            //       let NewOtem = foundItems[key];
            //       for (const lineItemKey in item.LINEITEMS) {

            //        if( item.LINEITEMS[lineItemKey].LINEITEMNO == NewOtem.LINEITEMNUMBER )  { 
            //         if(NewOtem.DC == item.LINEITEMS[lineItemKey].DC){
            //           alert();
            //           for (const key_NewOtem in NewOtem) {
            //             if (!item.LINEITEMS[lineItemKey].hasOwnProperty(key_NewOtem)) {
            //                   item.LINEITEMS[lineItemKey][key_NewOtem] = NewOtem[key_NewOtem];

            //               }

            //               }
            //         }

            //         // item.LINEITEMS[lineItemKey]=  Object.assign(item.LINEITEMS[lineItemKey], NewOtem);
            //        }
            //       }
            //     }
            //   };
            //   return item;
            // });
            // this.arr3 = this.orderlineitems.map((item, i) => Object.assign({}, item, this.grntobeinvoicelist[i]));
            // console.log(this.arr3)
            // for (let index = 0; index < this.arr3.length; index++) {
            //   // console.log(this.arr3[index].LINEITEMS.length)
            //   for (let z = 0; z < this.arr3[index]?.LINEITEMS?.length; z++) {
            //     this.customDelivery = new customDelivery();
            //     this.customDelivery.bid = sessionStorage.getItem("Bid");
            //     this.customDelivery.po_num = this.arr3[index].LINEITEMS[z].PONUMBER;
            //     this.customDelivery.orderNumber = this.arr3[index].LINEITEMS[z].DC
            //     console.log(this.customDelivery.orderNumber)
            //     console.log(this.customDelivery.po_num)

            //     if (this.invoiceForm.controls['irnDate'].value != null) {
            //       this.customDelivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
            //       this.customDelivery.invoicetype = "E-invoice";
            //     }
            //     else {
            //       this.customDelivery.irnDate = null;
            //     }
            //     if (this.invoiceForm.controls['billofladingdate'].value != null) {
            //       this.customDelivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");
            //       this.customDelivery.invoicetype = "invoice";
            //     }
            //     this.customDelivery.irnNumber = "";
            //     if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
            //       this.customDelivery.irnDate = null;
            //     }

            //     this.customDelivery.dcnumber = this.arr3[index].LINEITEMS[z].DCNUMBER;
            //     this.customDelivery.lineItemNumber = this.arr3[index].LINEITEMS[z].LINEITEMNO;
            //     this.customDelivery.lineitemtext = this.arr3[index].LINEITEMS[z].lineitemtext;
            //     this.customDelivery.quantity = this.arr3[index].LINEITEMS[z].GRNQTY;
            //     this.customDelivery.grnnumber =this.arr3[index].LINEITEMS[z].GRNNUMBER;
            //     this.customDelivery.rateperquantity = this.arr3[index].LINEITEMS[z].RATEPERQTY;
            //     this.customDelivery.uniquereferencenumber = "-";
            //     this.customDelivery.balance_qty = Number(this.arr3[index].LINEITEMS[z].balance_qty);
            //     this.customDelivery.invoiceamount = Number(this.arr3[index].LINEITEMS[z].AMOUNT);
            //     this.customDelivery.saplineitemnumber = this.arr3[index].LINEITEMS[z].SAPLINEITEMNO;
            //     this.customDelivery.plant = localStorage.getItem("PLANTNO");
            //     this.customDelivery.contactPerson = sessionStorage.getItem("Requisitioner");
            //     this.customDelivery.vendorID = this.vendorid;
            //     this.customDelivery.costCentre = null;
            //     this.customDelivery.category = null;
            //     this.customDelivery.company = null;
            //     this.customDelivery.department = null;
            //     this.customDelivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
            //     this.customDelivery.profileID = "";
            //     this.customDelivery.invoiceDocumentPath = "";
            //     this.customDelivery.iGSTAmount = "";
            //     this.customDelivery.cGSTAmount = "";
            //     this.customDelivery.sgstAmount = "";
            //     this.customDelivery.uOM = "L";
            //     this.customDelivery.contactPerson = "sachin.mehta@timesgroup.com" //  sessionStorage.getItem("Requisitioner");
            //     this.customDelivery.contactPersonPhone = null;
            //     this.customDelivery.invoiceNumber = this.invoiceForm.controls["invoiceNo"].value.trim();
            //     this.customDelivery.totalAmount = this.invoiceForm.controls["TotalinctaxAmount"].value.toString().replace(/,/g, "");
            //     this.customDelivery.description = this.invoiceForm.controls['description'].value;
            //     this.customDelivery.remark = this.invoiceForm.controls['remarks'].value;
            //     this.customDelivery.status = "P";
            //     this.customDelivery.actualfilename = this.viewAttachmentName;
            //     if (this.invoicefilechanged == false) {
            //       this.customDelivery.actualfilename = this.actualfilenameofwopo;
            //       this.customDelivery.savedfilename = this.savedfilenameofwopo;


            //     }
            //     else {
            //       this.customDelivery.actualfilename = this.actualfilename;
            //       this.customDelivery.savedfilename = this.savedfilename;
            //     }
            //     this.customDelivery.createdby = sessionStorage.getItem("loginUser");
            //     this.customDelivery.managerid = "sachin.kale@timesgroup.com";

            //     this.customDelivery.buyerid = sessionStorage.getItem("Buyer");
            //     this.customDelivery.stage = "1";
            //     this.customDelivery.material = "INK";
            //     this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename + ",".replace(/,/g, "");
            //     this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile + ",".replace(/,/g, "");
            //     if (this.multiplefilechanged == true) {
            //       for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
            //         if (c == 0) {
            //           this.customDelivery.multipleactualfilename = this.ArrayOfSelectedFilename[c] + ",";
            //         } else {
            //           this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
            //         }
            //       }
            //       for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
            //         if (x == 0) {
            //           this.customDelivery.multiplesavedfilename = this.ArrayOfSelectedSavedFile[x] + ",";
            //         } else {
            //           this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
            //         }
            //       }
            //       this.customDelivery.multipleactualfilename = this.customDelivery.multipleactualfilename.slice(0, -1);
            //       this.customDelivery.multiplesavedfilename = this.customDelivery.multiplesavedfilename.slice(0, -1);
            //       console.log("this.uniquelineitems.multipleactualfilename ", this.customDelivery.multipleactualfilename);
            //       console.log("this.uniquelineitems.multiplesavedfilename ", this.customDelivery.multiplesavedfilename);
            //     }

            //     this.customDelivery.invoiceDate = moment(
            //       new Date(
            //         this.invoiceForm.controls["invoiceDate"].value
            //       )
            //     ).format("DD/MM/YYYY");
            //     this.customDelivery.totalamtinctaxes = this.customDelivery.totalamtinctaxes =
            //       this.invoiceForm.controls[
            //         "TotalinctaxAmount"
            //       ].value
            //         .toString()
            //         .replace(/,/g, "");
            //     this.customDelivery.taxamount =
            //       this.invoiceForm.controls["taxAmount"].value
            //         .toString()
            //         .replace(/,/g, "");
            //     this.customDelivery.storagelocation =null;
            //     this.customDelivery.uniquereferencenumber = "-";
            //     this.customDelivery.saplineitemnumber = "-";
            //     this.customDelivery.servicenumber = null;
            //     this.customDelivery.beforesubmissioninvoicenumber = "";
            //     this.customDelivery.srcnnumber = "-";
            //     // this.customDelivery.previnvno = "";
            //     // this.customDelivery.previnvdate ="";
            //     // this.customDelivery.prevponos = "";
            //     this.customDelivery.type = "tobeinovice";
            //     console.log(this.customDelivery)
            //     this.finalInvoiceList.push(this.customDelivery);



            //   }
            // }
            // this.simpoinvoicesubmissionarray = this.arr3;
            // console.log(this.simpoinvoicesubmissionarray)
            // }

            //  grn for loop\\


            // }


            this.purchaseOrderListService.simpoSubmitInvoice(this.simpoinvoicesubmissionarray).subscribe(res => {

              sessionStorage.removeItem("invwopodetails");
              if (this.customDelivery.irnDate == null && res[0].message == "Success") {
                // if (res[0].message == "Success") {
                  this.loaderservice.hide();

                  const dialogConfig = new MatDialogConfig();

                  dialogConfig.data = {
                    message: 'Invoice has been submitted successfully.Please send the physical invoice as per process ',
                    condition: 'success',
                    page: 'invoicesubmit',
                    specific: 'confirmation'
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
                    this.router.navigate(['/trackInvoiceList']);
                  });

                  /**

                  this.purchaseOrderListService.deleteEmptyDeliveriesSimpo(this.nullDcList).subscribe(res => {

                    if (this.customDelivery.irnDate == null) {
                      if (res[0].message == "Success") {
                        this.loaderservice.hide();
                        const dialogConfig = new MatDialogConfig();

                        dialogConfig.data = {
                          message: 'Invoice has been submitted successfully.Please send the physical invoice as per process ',
                          condition: 'success',
                          page: 'invoicesubmit',
                          specific: 'confirmation'
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
                          this.router.navigate(['/trackInvoiceList']);
                        });
                      } // Success close
                    } // if cond close
                    else if (res[0].message == "Success") {
                      this.loaderservice.hide();
                      const dialogConfig = new MatDialogConfig();

                      dialogConfig.data = {
                        message: 'Invoice has been submitted successfully.',
                        condition: 'success',
                        page: 'invoicesubmit',
                        specific: 'confirmation'
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
                        this.router.navigate(['/trackInvoiceList']);
                      });
                    }
                  }); // Delete emply delivery end

                  */

                  // this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
                  // const dialogConfig = new MatDialogConfig();
                  // dialogConfig.data = {
                  //   message:
                  //     "Invoice has been submitted successfully. Please send the physical invoice as per process ",
                  //   condition: "success",
                  //   page: "invoicesubmit",
                  // };
                  // const mydata = dialogConfig.data;
                  // console.log("PopupComponent", mydata);

                  // const dialogRef = this.dialog.open(
                  //   PopupComponent,
                  //   {
                  //     panelClass: "custom-modalbox",

                  //     width: "400px",
                  //     data: { datakey: dialogConfig.data },
                  //   }
                  // );
                  // dialogRef
                  //   .afterClosed()
                  //   .subscribe((result) => {
                  //     console.log(
                  //       `Dialog result1: ${result}`
                  //     );
                  //     this.router.navigate([
                  //       "/trackInvoiceList",
                  //     ]);
                  //   });
                  // });

                // }

              }

              else if (res[0].message == "Success") {
                this.loaderservice.hide();
                // this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = {
                  message:
                    "Invoice has been submitted successfully",
                  condition: "success",
                  page: "invoicesubmit",
                };
                const mydata = dialogConfig.data;
                console.log("PopupComponent", mydata);

                const dialogRef = this.dialog.open(
                  PopupComponent,
                  {
                    panelClass: "custom-modalbox",

                    width: "400px",
                    data: { datakey: dialogConfig.data },
                  }
                );
                dialogRef
                  .afterClosed()
                  .subscribe((result) => {
                    console.log(
                      `Dialog result1: ${result}`
                    );
                    this.router.navigate([
                      "/trackInvoiceList",
                    ]);
                  });
              }

              else {
                // this.loaderservice.hide();
                // this.dialogBox.popUpOpen2('Invoice Number Already Exist.', 'error', 'invoicesubmit');
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = {
                  message: res[0].Uniquemessage,
                  // message: 'Invoice Number Already Exist.',
                  condition: "error",
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
                dialogRef.afterClosed().subscribe((result) => {
                  console.log(`Dialog result1: ${result}`);
                });
                // this.toastr.error(res[0].message)
                // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
                this.successmessage = res[0].Uniquemessage;
                this.error = true;
                // this.showPopup();
              }
            });

         
         
          // }) ////order having dcn need to be commented




        // })//create delivery summery need to be commented
      
      
      // }) //create delivery summery need to be commented with DC

    }


  }

}

function shareCheckedList(item: any, arg1: any) {
  throw new Error('Function not implemented.');
}

function shareIndividualCheckedList(item: any, arg1: {}) {
  throw new Error('Function not implemented.');
}

function item(item: any, arg1: any) {
  throw new Error('Function not implemented.');
}

function onItemSelect(item: (item: any, arg1: any) => void, any: any) {
  throw new Error('Function not implemented.');
}

