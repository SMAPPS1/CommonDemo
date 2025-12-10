import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import { saveAs } from 'file-saver';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { InternalportalserviceService } from 'app/services/internalportal/internalportalservice.service';

import { LoaderService } from 'app/services/LoaderService/loader.service';
import * as moment from 'moment/moment';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PopupComponent } from '../../../commoncomponents/popup/popup.component';

// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';
declare var $: any;
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-internal-invalid-invoice',
  templateUrl: './internal-invalid-invoice-new.component.html',
  styleUrls: ['./internal-invalid-invoice.component.css']
})
export class InternalInvalidInvoiceComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  public invalidinvoice = new FormGroup({
    POrealNumber: new FormControl(''),
    InvoiceNumber: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    POOrderNumber: new FormControl(''),
    POlineitemNumber: new FormControl(''),
    Plant: new FormControl(''),
    withoutpo: new FormControl(false),
    Vendor :new FormControl('')
    // searchtype: new FormControl('')
    // paymentMethod: new FormControl('', Validators.required),
    // paymentStatus: new FormControl('', Validators.required),
    // Topicker: new FormControl('', Validators.required)
  })
  // constructor() { }

  // ngOnInit(): void {
  // }
  historic: string = 'false';
  currstatus: any = 'INV';
  innum: string = 'NA';
  ponum: string = 'NA';
  fd: string = 'NA';
  td: string = 'NA';
  plant: any = "NA";
  vendor:any="NA";
  totalItems: any;
  pendingPo :any = 0;
  pageSize: number = 50;
  paginationpagenumber:number =1;
  endpagenumber: number = 1;
  mindate: any;
  maxdate: any;
  uniqueBid: any;
  extensionType: any;

  topic: any;
  uniquePONumber: any;
  uniqueInvNumber: any;
  recipientEmail: any;
  statusList: any[];
  DecodedFile: any;
  message: any;
  forinternal: any;
  emailid: any;
  remarklength: number = 160;
  mintodate: Date;
  invoiceDataList = [];
  invoicenumber: any[];
  ponumber: any[];
  allinvlist: any[];
  invoiceData1: any = [];
  searchList: any = [];
  invoiceData: any = [];
  invoiceDatawopo: any = []
  invoiceCountAsPerStatus:any=[];
  messageList: any = [];
  test: any = [];
  vendorList:any = [];
  PlantList: any = [];
  tempPlantList: any = []; 
   filteredinvoiceData: any = [];
  filteredponumberData: any = [];
  filtereddate: any = [];
  pgNolist: any[];
  filteredlineitemnumber: any[];
  filteredordernumber: any[];
  vendorpresent: boolean = false;
  disableoff: boolean = false;
  disablenext: boolean = false; 
  disable: boolean = false;
  disableprevious: boolean = false;
  equalfound: boolean = false;
  headdisableoff: boolean = false;
  todateerror: boolean = false;
  fromdateerror: boolean = false;
  plantpresent: boolean = false;
   approximatecheck: boolean = false;
   invoicenumberpresent: boolean = false;
   ponumberpresent: boolean = false;
   fromtodatepresent: boolean = false;
   validate: boolean = true;
   statusTemplate2: boolean = true;
   checkboxvalue: string;
  pageno=1;
  pageName: string;
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2,
    private purchaseOrderListService: PurchaseOrderListService,
    private trackOrderListService: TrackOrderListService, private toastr: ToastrService, private InternalportalserviceService: InternalportalserviceService,
    private loaderservice: LoaderService, private internalportalservice: InternalportalserviceService,) { }
    @ViewChild('message') messagesTextarea: any;
  ngOnInit(): void {
// this. getInvoiceData(this.pageno);
    this.getmessageStatus(); 
    this.getInvalidInvoice();
    //this.getmessageStatus();
  }
  onMouseEnter() {
    this.statusTemplate2 = true;
  }
  onClick() {
    this.statusTemplate2 = false; 
  }
  getVendorData(e) {
    this.vendorList = [];
    this.InternalportalserviceService.getVendorData(e.target.value.toUpperCase()).subscribe(res => {
      this.vendorList = res[0].vendordetail;
      console.log(this.vendorList, 'vendorList')
    });
  }
  getInvalidInvoice(){
    
    this.disableprevious = true;
    this.pageno = 1;

    this.InternalportalserviceService.getInternalInvalidinvoice(this.pageno,'NA','NA','NA','NA','NA','NA').subscribe(res => {
    this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages) / this.pageSize))

    this.invoiceData1 =  res[0].invoiceData;
    console.log(this.invoiceData1)
    if (this.invoiceData1?.length > 0) {

        this.getmessageColor();

    }
   
    })
  }

  getmessageStatus() {
    // this.loaderservice.show();
    this.internalportalservice.getInternalInvoiceReadStatus().subscribe(res => {
      console.log("response", res[0].poQueryList)
      // this.purchaseOrderListService.getChatStatus().subscribe(res => {
      if (res[0].message != "No Data Found for given Vendor Id") {
        console.log("is Data Coming??", res[0].poQueryList);
        this.statusList = res[0].poQueryList
        console.log("statuslist is ", this.statusList)
      }
      else {
        this.statusList = [];
      }
      this.loaderservice.hide()

    }); err => {

      this.loaderservice.hide();
    }
  }

  getmessageColor() {
    setTimeout(() => {
      
      // this.loaderservice.show();
      for (var k = 0; k < this.invoiceData1.length; k++) {
        console.log("this.statusList.length " + this.statusList.length);
        if (this.statusList.length != 0) {

         // alert("status list != 0")
          for (var j = 0; j < this.statusList.length; j++) {
           
            // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
            if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceData1[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceData1[k]['PONUMBER']) {
              console.log("insise A--------------------------==============", this.invoiceData1[k]['INVOICENUMBER'])
              $("#green" + k).addClass('displayBlock');
              $("#white" + k).addClass('displayNone');
              $("#white" + k).removeClass('displayBlock');
            }
            else {
              //$("#green" + k).addClass('displayNone');
              $("#white" + k).addClass('displayBlock');
            }
          }
        }
        else {
          $("#white" + k).addClass('displayBlock');
        }

      }
      this.loaderservice.hide();
    }, 2000);
    //  err => {
    //   alert(err);

    //   this.loaderservice.hide();
    // }
  }

  openAdavnceSearch() {
    let advanceSearcBox = document.getElementById("advanceSearcBox");
    let closeArrow = document.getElementById("closeArrow");
    let openArrow = document.getElementById("openArrow");
    if (advanceSearcBox.style.display === "none") {
      advanceSearcBox.style.display = "block";
      closeArrow.style.display = "block";
      openArrow.style.display = "none";
    } else {
      advanceSearcBox.style.display = "none";
      openArrow.style.display = "block";
      closeArrow.style.display = "none";
    }
  }
  checkbox(){
    var story = '';
    var negstory = '';
    $(".chb").change(function() {
      var status = $(this).prop("checked");
      var negstatus = $(this).prop("unchecked");
     
      $(".chb").prop('checked', false);
      $(this).prop('checked', true);
      if (status === false) {
        $(this).prop('checked', false);
        // this.headdisableoff = true;
      } 
      else{
        // this.headdisableoff = false;
      }
     
      story = $('input[type=checkbox]:checked').val();
      negstory =$("input:checkbox:not(:checked)").val()
      // negstory = $('input[type=checkbox]:checked').val();
      console.log("checked value",story) ;
      console.log("Unchecked value",negstory) ;
      console.log("status is here ==> "+status);
      console.log("status is here uncheck ==> "+negstatus);
     });  
      
     setTimeout(() => {
      this.checkboxvalue = story;
      console.log("checked value..........",this.checkboxvalue) ;
       if(this.checkboxvalue == "ASWP"){
         this.currstatus = "ASWP";
      this.headdisableoff = true;

    }else if(this.checkboxvalue == "ASSQ" || negstory == 'ASWP'){
      this.headdisableoff = false;
      this.currstatus = "ASSQ";
    }
     }, 50);
     
     
    

    }


    trackPayment(searchponumber, searchlineitemnumber, searchordernumber) {
      this.historic = "false";
      this.paginationpagenumber = 1;
      this.disableprevious = true;
      
      if(this.checkboxvalue == "ASWP"){
        this.currstatus = 'ASWP';
        this.disableoff = true;
  
      }else if(this.checkboxvalue == "ASSQ"){
        this.disableoff = false;
        this.currstatus = 'ASSQ';
      }
      else if(this.currstatus == 'C'){
        this.currstatus = 'C'
      }
      else{
        this.currstatus = 'AS';
      }
     
  
      this.invoiceData1 = [];
      this.approximatecheck = true;
      console.log("this.searchordernumber ==>" + searchordernumber);
      // this.loaderservice.show();
      this.invoiceData = [];
      this.filteredinvoiceData = [];
      this.filteredponumberData = [];
      this.filtereddate = [];
      this.filteredlineitemnumber = [];
      this.filteredordernumber = [];
      this.invoicenumberpresent = false;
      this.plantpresent = false;
      this.ponumberpresent = false;
      this.fromtodatepresent = false;
      console.log(searchponumber, 'searchponumber');
      if (searchponumber != '') {
        this.invalidinvoice.controls.POrealNumber.setValue(searchponumber);
      }
      if (searchlineitemnumber != '') {
        this.invalidinvoice.controls.POlineitemNumber.setValue(searchlineitemnumber);
      }
      if (searchordernumber != '') {
        this.invalidinvoice.controls.POOrderNumber.setValue(searchordernumber);
      }
      
      if (this.invalidinvoice.controls['Plant'].value) {
        console.log("this.invalidinvoice.controls['Plant'].value "+this.invalidinvoice.controls['Plant'].value);
        for(var b =0;b<this.tempPlantList.length;b++)
      {
        console.log("this.tempPlantList[b].PLANTNAME "+this.tempPlantList[b].PLANTCODE);
        if(this.tempPlantList[b].PLANTCODE == this.invalidinvoice.controls['Plant'].value.trim())
        {
          this.plant = this.tempPlantList[b].PLANTCODE;
        }
      }
        this.plantpresent = true;
        // this.plant = this.invoiceList.controls['Plant'].value.trim();
      }
      else {
        this.plant = 'NA';
      }
      if (this.invalidinvoice.controls['InvoiceNumber'].value) {
        this.invoicenumberpresent = true;
        this.innum = this.invalidinvoice.controls['InvoiceNumber'].value.trim();
      }
      else {
        this.innum = 'NA';
      }

      if (this.invalidinvoice.controls['Vendor'].value) {
        //   for(var b =0;b<this.vendorList.length;b++)
        // {
        //   console.log("this.tempPlantList[b].PLANTNAME "+this.invoiceList.controls['Vendor'].value);
        //   if(this.vendorList[b].BUSINESSPARTNERTEXT == this.invoiceList.controls['Vendor'].value.trim())
        //   {
        //     this.vendor = this.vendorList[b].VENDORID;
        //   }
        // }
          this.vendorpresent = true;
          this.vendor = this.invalidinvoice.controls['Vendor'].value.trim();
        }
        else {
          this.vendor = 'NA';
        }
      if (this.invalidinvoice.controls['POrealNumber'].value) {
        this.ponumberpresent = true;
        this.ponum = this.invalidinvoice.controls['POrealNumber'].value.trim();
      }
      else {
        this.ponum = 'NA';
      }
      if (this.invalidinvoice.controls['fromDate'].value) {
        this.fromtodatepresent = true;
        this.fd = moment(new Date(this.invalidinvoice.controls['fromDate'].value)).format("DD/MM/YYYY").trim();
        this.td = moment(new Date(this.invalidinvoice.controls['toDate'].value)).format("DD/MM/YYYY").trim();
      }
      else {
        this.fd = 'NA';
        this.td = 'NA';
      }
      // this.loaderservice.show()
      this.InternalportalserviceService.getInternalInvalidinvoiceSearch(this.paginationpagenumber, this.currstatus, 
            this.innum,this.ponum, this.fd, this.td,this.plant,this.vendor).subscribe(res => {   this.loaderservice.hide();
          let advanceSearcBox = document.getElementById("advanceSearcBox");
          let closeArrow = document.getElementById("closeArrow");
          let openArrow = document.getElementById("openArrow");
          advanceSearcBox.style.display = "none";
          openArrow.style.display = "block";
          closeArrow.style.display = "none";
          // this.invoiceList.reset();
          if (this.disableoff == true) {
           
            if(res[0].invoiceCountAsPerStatus)
            {
              this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
              if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
                this.pendingPo = this.invoiceCountAsPerStatus.M;
              }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
                this.pendingPo = this.invoiceCountAsPerStatus.P;
              }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
                this.pendingPo = 0;
              }else{
                this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
              }
            }
            if (res[0].message1 == "Sucessinvlist1") {
              this.invoiceData1 = res[0].invoicelistpages;
              // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
              // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
              //   this.pendingPo = this.invoiceCountAsPerStatus.M;
              // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
              //   this.pendingPo = this.invoiceCountAsPerStatus.P;
              // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
              //   this.pendingPo = 0;
              // }else{
              //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
              // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
              this.totalItems = res[0].invoicelistpages;
              this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages)/this.pageSize))
              if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
              {
                this.disablenext = true;
              }
              else
              {
                this.disablenext = false;
              }
            }
            else {
              this.invoiceData1 = res[0].invoiceData;
              // this.invoiceData1 = [];
              this.totalItems = 0;
            }
          }
          else {
            if (res[0].message == "Sucessinvlist") {
              if(res[0].invoiceCountAsPerStatus)
              {
                this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
                if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
                  this.pendingPo = this.invoiceCountAsPerStatus.M;
                }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
                  this.pendingPo = this.invoiceCountAsPerStatus.P;
                }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
                  this.pendingPo = 0;
                }else{
                  this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
                }
              }
              this.invoiceData1 = res[0].invoiceData;
              // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
              // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
              //   this.pendingPo = this.invoiceCountAsPerStatus.M;
              // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
              //   this.pendingPo = this.invoiceCountAsPerStatus.P;
              // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
              //   this.pendingPo = 0;
              // }else{
              //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
              // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
              this.totalItems = res[0].invoicelistpages;
              this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages)/this.pageSize))
              if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
              {
                this.disablenext = true;
              }
              else
              {
                this.disablenext = false;
              }
            }
            else {
              this.invoiceData1 = res[0].invoiceData;
              this.totalItems = 0;
            }
          }
         
        });
        this.internalportalservice.getInternalInvoiceReadStatus().subscribe(res => {
          console.log("response", res[0].poQueryList)
          // this.purchaseOrderListService.getChatStatus().subscribe(res => {
          if (res[0].message != "No Data Found for given Vendor Id") {
            console.log("is Data Coming??", res[0].poQueryList);
            this.statusList = res[0].poQueryList
            console.log("StatusList",this.statusList.length);
          }
          else {
            this.statusList = [];
          }
          this.loaderservice.hide()
    
        });
        setTimeout(() => {
          console.log("this.invoicedetailsList.length  " + this.invoiceData1.length);
          console.log("this.statusList.length ", this.statusList);
          for (var k = 0; k < this.invoiceData1.length; k++) {
            for (var j = 0; j < this.statusList.length; j++) {
              if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceData1[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceData1[k]['PONUMBER']) {

                $("#green" + k).addClass('displayBlock');
                $("#white" + k).addClass('displayNone');
              }
              else {
                //$("#green" + k).addClass('displayNone');
                $("#white" + k).addClass('displayBlock');
              }
            }
          }
        }, 500);
        this.loaderservice.hide();
     
    }

    downloadinvoicelist() {
      this.invoicenumber = [];
      this.ponumber = [];
      this.loaderservice.show();
      // console.log("this.invoiceDataList.length", this.invoiceDataList);
      for (var k = 0; k < this.invoiceDataList.length; k++) {
        this.invoicenumber.push(this.invoiceDataList[k].INVOICENUMBER);
        this.ponumber.push(this.invoiceDataList[k].PONUMBER);
      }
      
      this.trackOrderListService.downloadinternalinvalid( 
        this.currstatus,this.paginationpagenumber, this.innum,
        this.ponum, this.fd, this.td,this.plant,this.vendor).subscribe(res => {
  
        // this.purchaseOrderListService.getpolistfile(this.downloaddatalist).subscribe(res => {
        // console.log(res[0].message)
  
        if (res[0].message == "Success") {
          // if (this.profileModel != undefined && this.profileModel != null) {
          // this.toastr.success("Sucess!!")
          // this.router.navigate(['/dashboard'])
          var nameoffile = "invoicedownload.csv";
          console.log("filename===>" + nameoffile);
          this.DecodedFile = res[0].data;
  
          if (this.DecodedFile) {
            var data = this.DecodedFile;
            const agent = window.navigator.userAgent.toLowerCase()
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
              var byteCharacters = atob(data);
              var byteNumbers = new Array(byteCharacters.length);
              for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              var byteArray = new Uint8Array(byteNumbers);
              var blob = new Blob([byteArray], { type: 'application/octet-stream' });
              window.navigator.msSaveOrOpenBlob(blob, nameoffile);
            }
            else if (agent.indexOf('firefox') > -1) {
              var byteCharacters = atob(data);
              var byteNumbers = new Array(byteCharacters.length);
              for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              var byteArray = new Uint8Array(byteNumbers);
              var blob = new Blob([byteArray], { type: "application/octet-stream" });
              saveAs(blob, nameoffile);
            }
            else {
              console.log(data, 'data')
              let FileToDownload = 'data:application/octet-stream;base64,' + data;
              var link = document.createElement("a");
              const filename = nameoffile;
              link.href = FileToDownload;
              link.download = filename;
              link.click();
  
  
            }
          }
          this.loaderservice.hide();
        }
        else if (res[0].message != "Success") {
          // this.dialogBox.popUpOpen2(res[0].message ,'error','purchaseorderlist'); 
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: res[0].message,
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
          //this.loaderservice.hide();
          // this.dialogBox.popUpOpen2('Failed to download !!', 'error', 'trackinvoicelist');
          // this.toastr.error("Failed to download !!")
        }
        // });
  
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      })
    }
    // trackPayment(searchponumber, searchlineitemnumber, searchordernumber) {
    //   this.historic = "false";
    //   this.paginationpagenumber = 1;
    //   this.disableprevious = true;
    //   // this.mPageNo = 1;
     
    //   if(this.checkboxvalue == "ASWP"){
    //     this.currstatus = 'ASWP';
    //     this.disableoff = true;
  
    //   }else if(this.checkboxvalue == "ASSQ"){
    //     this.disableoff = false;
    //     this.currstatus = 'ASSQ';
    //   }else{
    //     this.currstatus = 'AS';
    //   }
     
  
    //   this.invoiceData1 = [];
    //   this.approximatecheck = true;
    //   console.log("this.searchordernumber ==>" + searchordernumber);
    //   // this.loaderservice.show();
    //   this.invoiceData= [];
    //   this.filteredinvoiceData = [];
    //   this.filteredponumberData = [];
    //   this.filtereddate = [];
    //   this.filteredlineitemnumber = [];
    //   this.filteredordernumber = [];
    //   this.invoicenumberpresent = false;
    //   this.plantpresent = false;
    //   this.ponumberpresent = false;
    //   this.fromtodatepresent = false;
    //   console.log(searchponumber, 'searchponumber');
    //   if (searchponumber != '') {
    //     this.invalidinvoice.controls.POrealNumber.setValue(searchponumber);
    //   }
    //   if (searchlineitemnumber != '') {
    //     this.invalidinvoice.controls.POlineitemNumber.setValue(searchlineitemnumber);
    //   }
    //   if (searchordernumber != '') {
    //     this.invalidinvoice.controls.POOrderNumber.setValue(searchordernumber);
    //   }
      
    //   if (this.invalidinvoice.controls['Plant'].value) {
    //     console.log("this.invalidinvoice.controls['Plant'].value "+this.invalidinvoice.controls['Plant'].value);
    //     for(var b =0;b<this.tempPlantList.length;b++)
    //   {
    //     console.log("this.tempPlantList[b].PLANTNAME "+this.tempPlantList[b].PLANTNAME);
    //     if(this.tempPlantList[b].PLANTNAME == this.invalidinvoice.controls['Plant'].value.trim())
    //     {
    //       this.plant = this.tempPlantList[b].PLANTCODE;
    //     }
    //   }
    //     this.plantpresent = true;
    //     // this.plant = this.invoiceList.controls['Plant'].value.trim();
    //   }
    //   else {
    //     this.plant = 'NA';
    //   }
    //   if (this.invalidinvoice.controls['InvoiceNumber'].value) {
    //     this.invoicenumberpresent = true;
    //     this.innum = this.invalidinvoice.controls['InvoiceNumber'].value.trim();
    //   }
    //   else {
    //     this.innum = 'NA';
    //   }
    //   if (this.invalidinvoice.controls['POrealNumber'].value) {
    //     this.ponumberpresent = true;
    //     this.ponum = this.invalidinvoice.controls['POrealNumber'].value.trim();
    //   }
    //   else {
    //     this.ponum = 'NA';
    //   }
    //   if (this.invalidinvoice.controls['fromDate'].value) {
    //     this.fromtodatepresent = true;
    //     this.fd = moment(new Date(this.invalidinvoice.controls['fromDate'].value)).format("DD/MM/YYYY").trim();
    //     this.td = moment(new Date(this.invalidinvoice.controls['toDate'].value)).format("DD/MM/YYYY").trim();
    //   }
    //   else {
    //     this.fd = 'NA';
    //     this.td = 'NA';
    //   }
  
    //   this.InternalportalserviceService.getInternalInvalidinvoiceSearch(this.paginationpagenumber, this.currstatus, 
    //     this.innum,this.ponum, this.fd, this.td,this.plant,this.vendor).subscribe(res => {
    //       let advanceSearcBox = document.getElementById("advanceSearcBox");
    //       let closeArrow = document.getElementById("closeArrow");
    //       let openArrow = document.getElementById("openArrow");
    //       advanceSearcBox.style.display = "none";
    //       openArrow.style.display = "block";
    //       closeArrow.style.display = "none";
    //       // this.invoiceList.reset();
    //       if (this.disableoff == true) {
    //         if(res[0].invoiceCountAsPerStatus)
    //         {
    //           this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
    //           if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
    //             this.pendingPo = this.invoiceCountAsPerStatus.M;
    //           }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
    //             this.pendingPo = this.invoiceCountAsPerStatus.P;
    //           }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
    //             this.pendingPo = 0;
    //           }else{
    //             this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
    //           }
    //         }
    //         if (res[0].message1 == "Sucessinvlist1") {
    //           this.invoiceData1 = res[0].invoiceDataWOPO;
    //           // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
    //           // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
    //           //   this.pendingPo = this.invoiceCountAsPerStatus.M;
    //           // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
    //           //   this.pendingPo = this.invoiceCountAsPerStatus.P;
    //           // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
    //           //   this.pendingPo = 0;
    //           // }else{
    //           //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
    //           // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
    //           this.totalItems = res[0].invoicewopopages;
    //           this.endpagenumber = Math.ceil((Number(res[0].invoicewopopages)/this.pageSize))
    //           if(Number(res[0].invoicewopopages)/this.paginationpagenumber <= this.pageSize)
    //           {
    //             this.disablenext = true;
    //           }
    //           else
    //           {
    //             this.disablenext = false;
    //           }
    //         }
    //         else {
    //           this.invoiceData1 = [];
    //           this.totalItems = 0;
    //         }
    //       }
    //       else {
    //         if (res[0].message == "Sucessinvlist") {
    //           if(res[0].invoiceCountAsPerStatus)
    //           {
    //             this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
    //             if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
    //               this.pendingPo = this.invoiceCountAsPerStatus.M;
    //             }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
    //               this.pendingPo = this.invoiceCountAsPerStatus.P;
    //             }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
    //               this.pendingPo = 0;
    //             }else{
    //               this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
    //             }
    //           }
    //           this.invoiceData1 = res[0].invoiceData;
    //           console.log(this.invoiceData1)
    //           // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
    //           // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
    //           //   this.pendingPo = this.invoiceCountAsPerStatus.M;
    //           // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
    //           //   this.pendingPo = this.invoiceCountAsPerStatus.P;
    //           // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
    //           //   this.pendingPo = 0;
    //           // }else{
    //           //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
    //           // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
    //           this.totalItems = res[0].invoicelistpages;
    //           this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages)/this.pageSize))
    //           if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
    //           {
    //             this.disablenext = true;
    //           }
    //           else
    //           {
    //             this.disablenext = false;
    //           }
    //         }
    //         else {
    //           this.invoiceData= [];
    //           this.totalItems = 0;
    //         }
    //       }
         
    //     });
     
    // }

  keyPressAlphanumeric(event): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
      || (charCode >= 48 && charCode <= 57) || charCode == 32 ||
      charCode == 45 || charCode == 47 || charCode == 92) {
      return true;
    }
    return false;
  }
  getuniqueinvoice(array) {
    for (var i = 0; i < this.invoiceData1.length; i++) {
      this.equalfound = false;
      var tempo = this.invoiceData1[i].PO_NUMBER;
      var tempinvo = this.invoiceData1[i].INVOICENUMBER;
      if (i + 1 != this.invoiceData1.length) {
        for (var j = i + 1; j < this.invoiceData1.length; j++) {

          if (tempo == this.invoiceData1[j].PO_NUMBER &&
            tempinvo == this.invoiceData1[j].INVOICENUMBER) {
            console.log("innini if");
            this.equalfound = true;
            break;
          }
        }

      }
      if (this.equalfound == false) {
        console.log("innini push");
        this.invoiceData.push(this.invoiceData1[i])
      }
    }
    return this.invoiceData;
  }
  onDateChange() {
    if (this.invalidinvoice.controls['fromDate'].value) {
      if (this.invalidinvoice.controls['toDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.todateerror = true;
        this.fromdateerror = false;
        this.disable = true;
      }
      this.mintodate = new Date(this.invalidinvoice.controls['fromDate'].value);
    }
    else if (this.invalidinvoice.controls['toDate'].value) {
      if (this.invalidinvoice.controls['fromDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.fromdateerror = true;
        this.todateerror = false;
        this.disable = true;
      }
    }
    this.maxdate = new Date(this.invalidinvoice.controls['toDate'].value);
  
   
  }
  ResetData() {
    this.invalidinvoice.reset();
    this.invalidinvoice.controls.InvoiceNumber.setValue("");
    this.invalidinvoice.controls.POrealNumber.setValue("");
    // this.invoiceList.controls.duration.setValue("");
    this.invalidinvoice.controls.fromDate.setValue("");
    this.invalidinvoice.controls.toDate.setValue("");
    this.invalidinvoice.controls.Plant.setValue("");
    this.invalidinvoice.controls.Vendor.setValue("");


    this.todateerror = false;
    this.disable = false;
  }

  getPlantData(e) {
    this.PlantList = [];
    this.internalportalservice.getPlanCode(e.target.value.toUpperCase()).subscribe(res => {
      this.tempPlantList = res[0].grnbasedonpo;
      console.log(this.PlantList, 'PlantList')
    });
  }
  

  


  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  
  getInvoiceQuerry(ponumber, invoicenumber, contactpersonemailid) {
    console.log("inside", invoicenumber);
    this.uniquePONumber = ponumber;
    this.uniqueInvNumber = invoicenumber;

    this.recipientEmail = contactpersonemailid;
    sessionStorage.setItem("receiverMail", contactpersonemailid)
    // this.purchaseOrderListService.getMessages(invoicenumber).subscribe(res => {
    this.internalportalservice.getInternalInvMessages(ponumber, invoicenumber).subscribe(res => {
      console.log("resposne", res[0].message)
      this.messageList = [];
      this.topic = this.uniqueInvNumber
      if (res[0].poQueryList[0] != undefined) {
        this.messageList = res[0].poQueryList
      }
      // else {
      //   this.messageList = res[0].message
      // }
      console.log(this.messageList)


    })
  }

  getStatusUpdate(bid, poNumber, invNumber, index) {
    this.uniqueBid = bid
    this.uniquePONumber = poNumber;
    this.uniqueInvNumber = invNumber;
    this.InternalportalserviceService.getChatStatusUpdate(bid, poNumber, invNumber).subscribe(res => {
      // this.purchaseOrderListService.getReadStatusUpdate(poNumber).subscribe(res => {
      console.log("is it Updating ??", res);
      if (res[0].message == "Success") {
        $("#green" + index).addClass('displayNone');
        $("#green" + index).removeClass('displayBlock');
        $("#white" + index).addClass('displayBlock');
        $("#white" + index).removeClass('displayNone');
      }
    }); err => { }
  }
  
  getFileType(extensionName) {
    console.log("extensionName" +extensionName);
    if (extensionName.toLowerCase() === 'jpg' || extensionName.toLowerCase() === 'png' || extensionName.toLowerCase() === 'jpeg') {
      this.extensionType = 'image/' + extensionName;
    } else if (extensionName.toLowerCase() === 'pdf') {
      this.extensionType = 'application/pdf';
    } else if (extensionName.toLowerCase() === 'doc') {
      this.extensionType = 'application/msword';
    } else if (extensionName.toLowerCase() === 'docx') {
      this.extensionType = 'application/msword';
    } else if (extensionName.toLowerCase() === 'xls') {
      this.extensionType = 'application/vnd.ms-excel';
    } else if (extensionName.toLowerCase() === 'xlsx') {
      this.extensionType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (extensionName.toLowerCase() === 'csv') {
      this.extensionType = 'text/csv';
    }
  }
  download(savedfilename, singlepodownload, actualfilename) {
    if (savedfilename == "" || savedfilename == null || actualfilename == "" || actualfilename == null
      || savedfilename == undefined || actualfilename == undefined) {
      // this.dialogBox.popUpOpen2("File not present", 'success', 'purchaseorderlist');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'File not present',
        condition: 'success',
        page: 'InternalInvalidInvoice'
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
        this.router.navigate(['/InternalInvalidInvoice']);
      });
      return;
    }
    this.loaderservice.show();
    console.log(savedfilename);
    this.DecodedFile = [];
    this.trackOrderListService.getinternalfile(savedfilename, singlepodownload)
      .subscribe(result => {
        this.loaderservice.hide();
        console.log(result);
        console.log("filename===>" + result[0].filename);
        this.DecodedFile = result[0].data;
        if (this.DecodedFile) {
          var data = this.DecodedFile;
          const agent = window.navigator.userAgent.toLowerCase()
          if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: 'application/octet-stream' });
            window.navigator.msSaveOrOpenBlob(blob, result[0].filename);
          }
          else if (agent.indexOf('firefox') > -1) {
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: "application/octet-stream" });
            saveAs(blob, result[0].filename);
          }
          else {
            console.log(data, 'data')
            let FileToDownload = 'data:application/octet-stream;base64,' + data;
            var link = document.createElement("a");
            const filename = result[0].filename;
            link.href = FileToDownload;
            link.download = filename;
            // link.click();
            var extensionName = filename.substr(filename.lastIndexOf('.') + 1)
            this.getFileType(extensionName);
            this.trackOrderListService.downloadEncryptedFile(data, this.extensionType);

          }
          this.loaderservice.hide();
        }
        else if (result[0].reason != 'none') {
          // this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: result[0].reason,
            condition: 'success',
            page: 'InternalInvalidInvoice'
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
            this.router.navigate(['/InternalInvalidInvoice']);
          });
        }
        // else if (result[0].status == "Fail") {
        // 	this.dialogBox.popUpOpen2(result[0].message ,'success','purchaseorderlist');
        // }
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }

  downloadPo(po_number, singlepodownload) {
    // this.loaderservice.show();
    console.log(po_number);
    this.DecodedFile = [];
    this.trackOrderListService.getfile(po_number, singlepodownload)
      .subscribe(result => {
        console.log(result);
        console.log("filename===>" + result[0].filename);
        this.DecodedFile = result[0].data;
        if (this.DecodedFile) {
          var data = this.DecodedFile;
          const agent = window.navigator.userAgent.toLowerCase()
          if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: 'application/octet-stream' });
            window.navigator.msSaveOrOpenBlob(blob, result[0].filename);
          }
          else if (agent.indexOf('firefox') > -1) {
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: "application/octet-stream" });
            saveAs(blob, result[0].filename);
          }
          else {
            console.log(data, 'data')
            let FileToDownload = 'data:application/octet-stream;base64,' + data;
            var link = document.createElement("a");
            const filename = result[0].filename;
            link.href = FileToDownload;
            link.download = filename;
            // link.click();
            var extensionName = filename.substr(filename.lastIndexOf('.') + 1)
            this.getFileType(extensionName);
            this.trackOrderListService.downloadEncryptedFile(data, this.extensionType);
          }
          this.loaderservice.hide();
        }
        else if (result[0].reason != 'none') {
          // this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: result[0].reason,
            condition: 'success',
            page: 'purchseorderlist'
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
            this.router.navigate(['/InternalInvalidInvoice']);
          });
        }
        // this.loaderservice.hide();
        // if (result[0].status == "Fail") {
        //   this.dialogBox.popUpOpen2(result[0].message ,'error','profiledata');
        //  }
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }

  gettrackInvList(action) {
    // this.loaderservice.show();
    // if(this.paginationpagenumber == 1)
    //     {
    //       this.disableprevious = false;
    //     }
     this.invoiceData1 = [];
     if(action == 'PREV')
    {
      if(this.paginationpagenumber !=1)
      {
        this.paginationpagenumber = this.paginationpagenumber -1;
        if(this.paginationpagenumber == 1)
        {
          this.disableprevious = true;
        }
        else
        {
          this.disableprevious = false;
        }
      }
      else{
        return;
      }
      
    }
    else if(action == 'NEXT')
    {
      this.paginationpagenumber = this.paginationpagenumber +1;
      this.disableprevious = false;
      window.scrollTo(0, 0);      
    }
      else if(action == 'HOME')
      {
        this.paginationpagenumber = 1;
        this.disableprevious = true;
        window.scrollTo(0, 0);

      }
      else if(action == 'END')
      {
        window.scrollTo(0, 0);
      // alert("Actual page number =  "+this.paginationpagenumber);
      // alert("End page number =  "+this.endpagenumber);
      this.paginationpagenumber = this.endpagenumber;
      if(this.paginationpagenumber == 1)
      {
        this.disableprevious = true;
      }
      else
      {
        this.disableprevious = false;
      }
      }
    console.log("this.disableoff " + this.disableoff);
    console.log("this.ponum " + this.ponum);
    console.log("this.innum " + this.innum);
    if (this.currstatus == "AS") {
      this.InternalportalserviceService.getInternalInvalidinvoice(this.paginationpagenumber, this.currstatus, this.innum, this.ponum, this.fd, this.td,this.plant).subscribe(res => {

       
        if (this.disableoff == true) {
          if(res[0].invoiceCountAsPerStatus)
          {
            this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
              this.pendingPo = this.invoiceCountAsPerStatus.M;
            }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = this.invoiceCountAsPerStatus.P;
            }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = 0;
            }else{
              this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            }
          }
          if (res[0].message == 'Success') {
            this.invoiceData1 = res[0].invoiceDataWOPO;
            if (this.invoiceData1.length > 0) {
              for (let i = 0; i < this.invoiceData1.length; i++) {
                this.invoiceData1[i].TOTALAMOUNT = Number(this.invoiceData1[i].TOTALAMOUNT)
                this.invoiceData1[i].STATUS = "WP";
              }
              this.totalItems = res[0].invoicewopopages;
              if(Number(res[0].invoicewopopages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
              // this.loaderservice.hide();
            }
            else {
              // this.loaderservice.hide();
              this.invoiceData1 = res[0].invoiceData;
              this.totalItems = 0;
            }

          }
        }
        else {
          if(res[0].invoiceCountAsPerStatus)
          {
            this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
              this.pendingPo = this.invoiceCountAsPerStatus.M;
            }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = this.invoiceCountAsPerStatus.P;
            }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = 0;
            }else{
              this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            }
          }
          if (res[0].message == 'Success') {
            window.scrollTo(0, 0);
            this.invoiceData1 = res[0].invoiceData;
          
            console.log("th list ==>" + JSON.stringify(this.invoiceData));
            // this.totalItems = this.invoiceData.length;
            this.totalItems = res[0].invoicelistpages;
            // this.loaderservice.hide();
            console.log("res[0].invoicelistpages "+res[0].invoicelistpages);
            console.log("this.paginationpagenumber "+this.paginationpagenumber);
            console.log("this.pageSize "+this.pageSize);
            if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
          }
          else {
            // this.loaderservice.hide();
            this.invoiceData1 = res[0].invoiceData;
            this.totalItems = 0;
          }

        }
        this.loaderservice.hide();
      });

    }
    else {
      this.InternalportalserviceService.getInternalInvalidinvoice(this.paginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA',this.plant).subscribe(res => {
        if (this.disableoff == true) {
          if(res[0].invoiceCountAsPerStatus)
          {
            this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
              this.pendingPo = this.invoiceCountAsPerStatus.M;
            }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = this.invoiceCountAsPerStatus.P;
            }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = 0;
            }else{
              this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            }
          }
          if (res[0].message == 'Success') {
            window.scrollTo(0, 0);
            this.invoiceData1 = res[0].invoiceDataWOPO;
            
            if (this.invoiceData1.length > 0) {
              for (let i = 0; i < this.invoiceData1.length; i++) {
                this.invoiceData1[i].TOTALAMOUNT = Number(this.invoiceData1[i].TOTALAMOUNT)
                // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
                this.invoiceData1[i].STATUS = "WP";
              }
              this.totalItems = res[0].invoicewopopages;
              if(Number(res[0].invoicewopopages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
              this.loaderservice.hide();
            }
            else {
              this.invoiceData1 = res[0].invoiceData;
              // this.invoiceData = [];
              this.totalItems = 0;
              this.loaderservice.hide();
            }

          }

        }
        else {
          if(res[0].invoiceCountAsPerStatus)
          {
            this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
              this.pendingPo = this.invoiceCountAsPerStatus.M;
            }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = this.invoiceCountAsPerStatus.P;
            }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = 0;
            }else{
              this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            }
          }
          if (res[0].message == 'Success') {
            window.scrollTo(0, 0);
            this.invoiceData1 = res[0].invoiceData;
            // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
           
            console.log("th list ==>" + JSON.stringify(this.invoiceData1));
            // this.totalItems = this.invoiceData.length;
            this.totalItems = res[0].invoicelistpages;
            // this.loaderservice.hide();
            if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
          }
          else {
            // this.loaderservice.hide();
            this.invoiceData1 = res[0].invoiceData;
            this.totalItems = 0;
          }

        }
        window.scrollTo(0, 0);
        this.loaderservice.hide();
      });

    }
  }

  ShowpopupMessage(ev) {
    $("#popupMessage").css("visibility", "visible");
    $("#popupMessage").css("opacity", "1");
    (<any>$("#popupComment").modal('show'));
    console.log(this.messagesTextarea)
    setTimeout(() => {
      this.setFocus();
    }, 500);
    //     setTimeout(() => {
    //   $(".messageChatWrapper").stop().animate({ scrollTop: $(".messageChatWrapper")[0].scrollHeight}, 10);
    // },500);
  }
  private setFocus() {
    this.renderer.selectRootElement(this.messagesTextarea.nativeElement).focus();
  }
  ClosepopupMessage(ev) {
    $("#popupMessage").css("visibility", "hidden");
    $("#popupMessage").css("opacity", "0");
     this.getmessageStatus();
    // this.getInvoiceData();
  }
  checklength(type)
  {
    // console.log("in", $('#messagetext').val().length);
    if(type =='remark')
    {
      let count_elements = $('#messagetext').val().length;
      this.remarklength = 160-count_elements; 
    }
    
  }
  Check(message) {
    this.validate = true
    if (message.value != "" && message.value != " " && message.value != null && message.value.trim().length != 0) {
      this.validate = false;
    }


  }
  sendConfirmation(status, message, subject, topic) {
    this.InternalportalserviceService.submitInternalInvoiceChat("", this.uniquePONumber, this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {
      // alert(this.uniqueInvNumber)
      // this.purchaseOrderListService.submitConfirmation("", status, message, subject, this.topic).subscribe(res => {
      // console.log("what is the response?" , res[0].message)
      if (res[0].message == "Success") {
        //  this.getQuerry(topic,'')
        message = '';
        this.validate = false;
        this.messageList = [];
        this.InternalportalserviceService.getInternalInvMessages(this.uniquePONumber, this.uniqueInvNumber).subscribe(res => {
          console.log("resposne", res[0].poQueryList)
          this.topic = topic
          if (res[0].poQueryList[0] != undefined) {
            this.messageList = res[0].poQueryList
          }
          else {
            this.messageList = res[0].message
          }
          console.log(this.messageList)
        })
      }
    })
  }

  multiPOData(invoicenumber, ponumber,multiponumber) {
    if(multiponumber == undefined)
    {
      localStorage.setItem('internalinvalidinvoice','1');
      multiponumber = ponumber;
      this.router.navigate(['./internaltrackinvoicedetails'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber),origin:btoa('internalinvalid') } });
    }
    else
    {
      
      this.router.navigate(['./Internalmultitrackinvoicedetails'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), mpo: btoa(multiponumber),origin:btoa('internalinvalid')  } });
    }
  }

  getCreditNoteDetails(invoicenumber, ponumber, creditAdviceNo, creditNoteNo) {
    this.pageName = 'InvalidInvoice';
    console.log("creditAdviceNo " + creditAdviceNo);
    this.router.navigate(['./createCreditNote'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), adviceNo: btoa(creditAdviceNo), showCreditDetails: btoa(this.pageName), creditNoteNo: btoa(creditNoteNo) } });
  }

}
