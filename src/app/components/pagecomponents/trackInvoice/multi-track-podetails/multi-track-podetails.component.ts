import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import { helpers } from 'chart.js';
import { saveAs } from 'file-saver';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
@Component({
  selector: 'app-multi-track-podetails',
  templateUrl: './multi-track-podetails-new.component.html',
  styleUrls: ['./multi-track-podetails.component.css']
})
export class MultiTrackPODEtailsComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  trackInv: boolean = true;
  data: string;
  invoicedata: any = [];
  DecodedFile: any;
  submitteddate: string;
  ponumber: any;
  invoicenumber: string;
  ponumberfortrack: any;
  status: any;
  invoiceamount: any;
  invoicedate: any;
  paidamount:any;
  user: any;
  totalamount:any;
  description: any;
  actualfilename: any;
  savedfilename: any;
  bussinesspartneroid: any;
  trackinvoicelistdata: any = [];
  pending: boolean = false;
  mpending: boolean = false;
  pendingtime: any;
  mpendingtime: any;
  reopentime:any;
  reopenstatus:any;
  reopen:boolean=false;
  invalidinvoice: any=false;
  invalidinvoiceStatus: any;
  invalidinvoicetime: any;
  corrected:boolean=false;
  correctedtime:any;
  correctedstatus:any
  acceptedtime: any;
  accepted: boolean = false;
  rejected: boolean = false;
  rejectedtime: any;
  pendingstatus: any;
  mpendingstatus: any;
  acceptedstatus: any;
  rejectedstatus: any;
  processed: boolean=false;
  processedstatus: any;
  processedtime: any;
  partialpaid: boolean=false;
  partialpaidstatus: any;
  partialpaidtime: any;
  paid: boolean=false;
  paidstatus: any;
  paidtime: any;
  multipleactualfilename: any;
  multiplesavedfilename: any;
  individualactualname: any = [];
  individualsavedname: any = [];
  billofladingdate: any;
  actionBy:any;
  taxAmount: any;
  amtexcltax: any;
  individualsavedendname: any=[];
  multiplesavedendfilename: any;
  multipleactualendfilename: any;
  creditnote: any;
  pageName: string;
  creditadvice: any;
  creditnote1: any;
  userremark: any;
  vendorremark: any;
  resubmit: boolean = false;
  return: boolean = false;
  returnstatus: any;
  returntime: any;
  resubmittime: any;
  resubmitstatus: any;
  previoustoresubmitinvoicenumber: any;
  irnNumber:any;
  irnDate:any;
  reversed: boolean=false;
  reversedstatus: any;
  reversedtime: any;
  extensionType: any;
  multiPOList: any = [];
  multiPOFinalList: any = [];
  mpodata: string;
  mpoParamdata: string;
  grnList: any = [];
  original: string = "";
  //tooltip code
  isTooltipVisible = false;
  isApproveTooltipVisible = false;
  tooltipData: any = {};
  isCreditNoteMsgVisible:boolean=false;

  constructor(private router: Router, private route: ActivatedRoute,
    private trackOrderListService: TrackOrderListService, private loaderservice: LoaderService) { }

    ngOnInit(): void {

      this.route.queryParams.subscribe(params => {
        console.log(params); // { order: "popular" }
  
        this.data = atob(params.order);
        this.mpoParamdata = params.mpo;
        this.original = atob(params.origin);
        console.log(this.mpoParamdata,'mpoParamdata');
        if(this.mpoParamdata != undefined)
        {
          this.mpodata =  atob(this.mpoParamdata)
          if(this.mpodata != undefined)
          {
            //this.multiPOList.push(this.mpodata);
            console.log(this.multiPOList,'this.multiPOList')
            const myArray = this.mpodata.split(",");
            for(let i=0; i< myArray.length;i++)
            {
              this.multiPOFinalList.push(myArray[i])
            }
            console.log(this.multiPOFinalList,'this.multiPOFinalList')
          }
        }
        else
         {
           this.multiPOFinalList = [];
         }
        this.ponumber = atob(params.po);
        this.creditnote = atob(params.credit);
        if(this.creditnote = null)
        {
          this.creditnote = "";
        }
        console.log(this.data); // popular
      }
      );
      this.invoicedata = [];
      // this.trackOrderListService.getlistitemsforinvoicenumber(this.data, this.ponumber).subscribe(res => {
        if(sessionStorage.getItem("portaltype") == 'vendorportal'){
          this.trackOrderListService.getMultiPoLineItemDetailForVendor(this.data, this.multiPOFinalList).subscribe(res => {
            this.actionBy = res[0].ACTIONBY;
            if (res[0].message == "Success") {
              this.invoicedata = res[0].poData;
              console.log(res[0].poData)
              this.invoicedata = this.invoicedata.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
              // for (let i = 0; i < this.invoicedata.length; i++) {
              //   this.invoicedata[i].INVOICEAMOUNT = Number(this.invoicedata[i].INVOICEAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
              //   this.invoicedata[i].RATEPERQTY = Number(this.invoicedata[i].RATEPERQTY).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
      
                
              // }
              this.grnList = [];
           

              console.log(this.grnList)    
                for (let i = 0; i < this.invoicedata.length; i++) {
                  this.grnList.push(this.invoicedata[i].GRNNUMBER)
                  // this.grnList.push(this.invoicedata[i].GRNNUMBER);
                  console.log(this.grnList)
                  if(this.invoicedata[i].ACCEPTEDQTY == null){
                    this.invoicedata[i].ACCEPTEDQTY = 0.00;
                  }
                  if(this.invoicedata[i].GRNNUMBER != null){
                    this.invoicedata[i].TOTALCALCULATEAMOUNT= Number(parseFloat(this.invoicedata[i].ACCEPTEDQTY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                  }
                  if(this.invoicedata[i].GRNNUMBER == null){
                    this.invoicedata[i].TOTALCALCULATEAMOUNT= Number(parseFloat(this.invoicedata[i].QUANTITY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                  }
                }
             
             
              console.log("this.invoicedata ==>", this.invoicedata);
              this.invoicenumber = this.data;
              this.ponumberfortrack = this.ponumber;
              this.status = this.invoicedata[0].OVERALLSTATUS;
              this.invoicedate = this.invoicedata[0].INVOICEDATE;
              this.invoiceamount = this.invoicedata[0].INVOICEAMOUNT;//to be changed
              this.bussinesspartneroid = this.invoicedata[0].BUSINESSPARTNEROID
              if(this.invoicedata[0].PAYMENTAMOUNT !=null)
              {
                this.paidamount = Number(this.invoicedata[0].PAYMENTAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
             
              }
              this.user = sessionStorage.getItem("Requisitioner");
              this.totalamount = Number(this.invoicedata[0].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
              this.taxAmount = Number(this.invoicedata[0].TAXAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
              this.amtexcltax = (Number(this.invoicedata[0].TOTALAMOUNT) - Number(this.invoicedata[0].TAXAMOUNT)).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
              this.description = this.invoicedata[0].DESCRIPTION;
              this.billofladingdate = this.invoicedata[0].BILLOFLADINGDATE;
              this.actualfilename = this.invoicedata[0].ACTUALFILENAME;
              this.savedfilename = this.invoicedata[0].SAVEDFILENAME;
              this.creditnote1 = this.invoicedata[0].CREDITNOTENO;
              this.creditadvice = this.invoicedata[0].CREDITADVICENO;
              this.userremark = this.invoicedata[0].USERREMARK;
              this.vendorremark = this.invoicedata[0].VENDORREMARKS;
              this.irnNumber = this.invoicedata[0].IRNNUMBER;
              this.irnDate = this.invoicedata[0].IRNDATE;
      
            //  for(var a = 0;a<this.invoicedata.length;a++)
            //  {
            //    if(this.invoicedata[a]. != null)
            //    {
            //     this.creditadvice = "present";
            //    }
            //  }
              if(this.invoicedata[0].MULTIACTUALFILENAME != null){
                this.multipleactualfilename = this.invoicedata[0].MULTIACTUALFILENAME;
                console.log("this.multipleactualfilename"+this.multipleactualfilename);
                this.multiplesavedfilename = this.invoicedata[0].MULTISAVEDFILENAME;
                console.log("this.multiplesavedfilename "+this.multiplesavedfilename);
                var array = this.multiplesavedfilename.split(',');
                console.log("array "+array[0]);
                this.individualsavedname = [];
                for(var k=0;k<array.length;k++)
                {
                  this.individualsavedname.push(array[k]);
                }
              }
              if (this.invoicedata[0].ENDUSERSUPPACTUALFILE != null) {
                this.multipleactualendfilename = this.invoicedata[0].ENDUSERSUPPACTUALFILE;
                console.log("this.multipleactualfilename" + this.multipleactualfilename);
                this.multiplesavedendfilename = this.invoicedata[0].ENDUSERSUPPSAVEDFILE;
                console.log("this.multiplesavedfilename " + this.multiplesavedendfilename);
                var array = this.multiplesavedendfilename.split(',');
                console.log("array " + array[0]);
                this.individualsavedendname = [];
                for (var k = 0; k < array.length; k++) {
                  this.individualsavedendname.push(array[k]);
                }
              }
      
              // this.individualsavedname=this.multiplesavedfilename.split[","];
              // console.log("this.individualsavedname "+this.individualsavedname);
      
              this.submitteddate = this.invoicedata[0].INVOICEDATE;
              console.log("this.invoicenumber ==>" + this.invoicenumber);
              console.log("this.ponumber ==>" + this.ponumber);
              this.trackOrderListService.trackinvoicestatus(this.invoicenumber, this.ponumber,
                this.bussinesspartneroid).subscribe(res => {
      
                  if (res[0].message == "Success") {
                    this.trackinvoicelistdata = res[0].trackstatusListdata;
                    for (var z = 0; z < this.trackinvoicelistdata.length; z++) {
                      console.log(this.trackinvoicelistdata[z].PENDINGMODIFIEDTIME);
                      if (this.trackinvoicelistdata[z].PENDINGSTATUS) {
                        this.pending = true;
                        this.pendingstatus = this.trackinvoicelistdata[z].PENDINGSTATUS;
                        this.pendingtime = this.trackinvoicelistdata[z].PENDINGMODIFIEDTIME;
                      }
                      else if (this.trackinvoicelistdata[z].RESUBMITSTATUS) {
                        console.log("inini");
                        this.resubmit = true;
                        this.resubmitstatus = this.trackinvoicelistdata[z].RESUBMITSTATUS;
                        this.resubmittime = this.trackinvoicelistdata[z].RESUBMITMODIFIEDTIME;
                        this.previoustoresubmitinvoicenumber = this.trackinvoicelistdata[z].RESUBMITTEDINVOICENO;
                      }
                      else if (this.trackinvoicelistdata[z].RETURNSTATUS) {
                        console.log("inini");
                        this.return = true;
                        this.returnstatus = this.trackinvoicelistdata[z].RETURNSTATUS;
                        this.returntime = this.trackinvoicelistdata[z].RETURNMODIFIEDTIME;
                      }
      
                      else if (this.trackinvoicelistdata[z].MPENDINGSTATUS) {
                        console.log("inini");
                        this.mpending = true;
                        this.mpendingstatus = this.trackinvoicelistdata[z].MPENDINGSTATUS;
                        this.mpendingtime = this.trackinvoicelistdata[z].MPENDINGMODIFIEDTIME;
                      }
                      else if (this.trackinvoicelistdata[z].ACCEPTEDSTATUS) {
                        this.accepted = true;
                        this.acceptedstatus = this.trackinvoicelistdata[z].ACCEPTEDSTATUS;
                        this.acceptedtime = this.trackinvoicelistdata[z].ACCEPTEDMODIFIEDTIME;
                      }  
                      else if (this.trackinvoicelistdata[z].REOPENED) {
                        console.log("REOPENSTATUS ==>");
                        this.reopen = true;
                        this.reopenstatus = this.trackinvoicelistdata[z].REOPENED;               
                        this.reopentime = this.trackinvoicelistdata[z].REOPENEDMODIFIEDTIME;
                      }
                      else if (this.trackinvoicelistdata[z].CORRECTEDSTATUS) {
                        console.log("CORRECTEDSTATUS ==>");
                        this.corrected = true;
                        this.correctedstatus = this.trackinvoicelistdata[z].CORRECTEDSTATUS;                  
                        this.correctedtime = this.trackinvoicelistdata[z].CORRECTEDMODIFIEDTIME;
                      }
                      else if (this.trackinvoicelistdata[z].REJECTEDSTATUS) {
                        this.rejected = true;
                        this.rejectedstatus = this.trackinvoicelistdata[z].REJECTEDSTATUS;
                        this.rejectedtime = this.trackinvoicelistdata[z].REJECTEDMODIFIEDTIME;
                      }
                      else if (this.trackinvoicelistdata[z].PROCESSEDSTATUS) {
                        this.processed = true;
                        this.processedstatus = this.trackinvoicelistdata[z].PROCESSEDSTATUS;
                        this.processedtime = this.trackinvoicelistdata[z].PROCESSEDMODIFIEDTIME;
                      }
                      else if (this.trackinvoicelistdata[z].PARTIALLYPAIDSTATUS) {
                        this.partialpaid = true;
                        this.partialpaidstatus = this.trackinvoicelistdata[z].PARTIALLYPAIDSTATUS;
                        this.partialpaidtime = this.trackinvoicelistdata[z].PARTIALLYPAIDMODIFIEDTIME;
                      }
                      else if (this.trackinvoicelistdata[z].FULLYPAIDSTATUS) {
                        this.paid = true;
                        this.paidstatus = this.trackinvoicelistdata[z].FULLYPAIDSTATUS;
                        this.paidtime = this.trackinvoicelistdata[z].FULLYPAIDSTATUSMODIFIEDTIME;
                      }
                      else if (this.trackinvoicelistdata[z].REVERSEDSAPSTATUS) {
                        this.reversed = true;
                        this.reversedstatus = this.trackinvoicelistdata[z].REVERSEDSAPSTATUS;
                        this.reversedtime = this.trackinvoicelistdata[z].REVERSEDSAPMODIFIEDTIME;
                      }
                      else if (this.trackinvoicelistdata[z].INVALIDSTATUS) {
                        console.log("INVALIDSTATUS ==>");
                        this.invalidinvoice = true;
                        this.invalidinvoiceStatus = this.trackinvoicelistdata[z].INVALIDSTATUS;
                        this.invalidinvoicetime = this.trackinvoicelistdata[z].INVALIDMODIFIEDTIME;
                      }
                    }
      
                  }
                });
      
            }
      
          });
        }
      else{
        this.trackOrderListService.getMultiPoLineItemDetail(this.data, this.multiPOFinalList).subscribe(res => {
          this.actionBy = res[0].ACTIONBY;
          if (res[0].message == "Success") {
            this.invoicedata = res[0].poData;
            this.invoicedata = this.invoicedata.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
            // for (let i = 0; i < this.invoicedata.length; i++) {
            //   this.invoicedata[i].INVOICEAMOUNT = Number(this.invoicedata[i].INVOICEAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
            //   this.invoicedata[i].RATEPERQTY = Number(this.invoicedata[i].RATEPERQTY).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
    
              
            // }
            this.grnList=[];
             for (let i = 0; i < this.invoicedata.length; i++) {
              this.grnList.push(this.invoicedata[i].GRNNUMBER);
              if(this.invoicedata[i].ACCEPTEDQTY == null){
                this.invoicedata[i].ACCEPTEDQTY = 0.00;
              }
              if(this.invoicedata[i].GRNNUMBER != null){
                this.invoicedata[i].TOTALCALCULATEAMOUNT= Number(parseFloat(this.invoicedata[i].ACCEPTEDQTY) * parseFloat(this.invoicedata[i].RATEPERQTY));
              }
              if(this.invoicedata[i].GRNNUMBER == null){
                this.invoicedata[i].TOTALCALCULATEAMOUNT= Number(parseFloat(this.invoicedata[i].QUANTITY) * parseFloat(this.invoicedata[i].RATEPERQTY));
              }
            }
            console.log("this.invoicedata ==>", this.invoicedata);
            this.invoicenumber = this.data;
            this.ponumberfortrack = this.ponumber;
            this.status = this.invoicedata[0].OVERALLSTATUS;
            this.invoicedate = this.invoicedata[0].INVOICEDATE;
            this.invoiceamount = this.invoicedata[0].INVOICEAMOUNT;//to be changed
            this.bussinesspartneroid = this.invoicedata[0].BUSINESSPARTNEROID
            if(this.invoicedata[0].PAYMENTAMOUNT !=null)
            {
              this.paidamount = Number(this.invoicedata[0].PAYMENTAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
           
            }
            this.user = sessionStorage.getItem("Requisitioner");
            this.totalamount = Number(this.invoicedata[0].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            this.taxAmount = Number(this.invoicedata[0].TAXAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            this.amtexcltax = (Number(this.invoicedata[0].TOTALAMOUNT) - Number(this.invoicedata[0].TAXAMOUNT)).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            this.description = this.invoicedata[0].DESCRIPTION;
            this.billofladingdate = this.invoicedata[0].BILLOFLADINGDATE;
            this.actualfilename = this.invoicedata[0].ACTUALFILENAME;
            this.savedfilename = this.invoicedata[0].SAVEDFILENAME;
            this.creditnote1 = this.invoicedata[0].CREDITNOTENO;
            this.creditadvice = this.invoicedata[0].CREDITADVICENO;
            this.userremark = this.invoicedata[0].USERREMARK;
            this.vendorremark = this.invoicedata[0].VENDORREMARKS;
            this.irnNumber = this.invoicedata[0].IRNNUMBER;
            this.irnDate = this.invoicedata[0].IRNDATE;
          
          //  for(var a = 0;a<this.invoicedata.length;a++)
          //  {
          //    if(this.invoicedata[a]. != null)
          //    {
          //     this.creditadvice = "present";
          //    }
          //  }
            if(this.invoicedata[0].MULTIACTUALFILENAME != null){
              this.multipleactualfilename = this.invoicedata[0].MULTIACTUALFILENAME;
              console.log("this.multipleactualfilename"+this.multipleactualfilename);
              this.multiplesavedfilename = this.invoicedata[0].MULTISAVEDFILENAME;
              console.log("this.multiplesavedfilename "+this.multiplesavedfilename);
              var array = this.multiplesavedfilename.split(',');
              console.log("array "+array[0]);
              this.individualsavedname = [];
              for(var k=0;k<array.length;k++)
              {
                this.individualsavedname.push(array[k]);
              }
            }
            if (this.invoicedata[0].ENDUSERSUPPACTUALFILE != null) {
              this.multipleactualendfilename = this.invoicedata[0].ENDUSERSUPPACTUALFILE;
              console.log("this.multipleactualfilename" + this.multipleactualfilename);
              this.multiplesavedendfilename = this.invoicedata[0].ENDUSERSUPPSAVEDFILE;
              console.log("this.multiplesavedfilename " + this.multiplesavedendfilename);
              var array = this.multiplesavedendfilename.split(',');
              console.log("array " + array[0]);
              this.individualsavedendname = [];
              for (var k = 0; k < array.length; k++) {
                this.individualsavedendname.push(array[k]);
              }
            }
    
            // this.individualsavedname=this.multiplesavedfilename.split[","];
            // console.log("this.individualsavedname "+this.individualsavedname);
    
            this.submitteddate = this.invoicedata[0].INVOICEDATE;
            console.log("this.invoicenumber ==>" + this.invoicenumber);
            console.log("this.ponumber ==>" + this.ponumber);
            this.trackOrderListService.trackinvoicestatus(this.invoicenumber, this.ponumber,
              this.bussinesspartneroid).subscribe(res => {
    
                if (res[0].message == "Success") {
                  this.trackinvoicelistdata = res[0].trackstatusListdata;
                  for (var z = 0; z < this.trackinvoicelistdata.length; z++) {
                    console.log(this.trackinvoicelistdata[z].PENDINGMODIFIEDTIME);
                    if (this.trackinvoicelistdata[z].PENDINGSTATUS) {
                      this.pending = true;
                      this.pendingstatus = this.trackinvoicelistdata[z].PENDINGSTATUS;
                      this.pendingtime = this.trackinvoicelistdata[z].PENDINGMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].RESUBMITSTATUS) {
                      console.log("inini");
                      this.resubmit = true;
                      this.resubmitstatus = this.trackinvoicelistdata[z].RESUBMITSTATUS;
                      this.resubmittime = this.trackinvoicelistdata[z].RESUBMITMODIFIEDTIME;
                      this.previoustoresubmitinvoicenumber = this.trackinvoicelistdata[z].RESUBMITTEDINVOICENO;
                    }
                    else if (this.trackinvoicelistdata[z].RETURNSTATUS) {
                      console.log("inini");
                      this.return = true;
                      this.returnstatus = this.trackinvoicelistdata[z].RETURNSTATUS;
                      this.returntime = this.trackinvoicelistdata[z].RETURNMODIFIEDTIME;
                    }
    
                    else if (this.trackinvoicelistdata[z].MPENDINGSTATUS) {
                      console.log("inini");
                      this.mpending = true;
                      this.mpendingstatus = this.trackinvoicelistdata[z].MPENDINGSTATUS;
                      this.mpendingtime = this.trackinvoicelistdata[z].MPENDINGMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].ACCEPTEDSTATUS) {
                      this.accepted = true;
                      this.acceptedstatus = this.trackinvoicelistdata[z].ACCEPTEDSTATUS;
                      this.acceptedtime = this.trackinvoicelistdata[z].ACCEPTEDMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].REOPENED) {
                      console.log("REOPENSTATUS ==>");
                      this.reopen = true;
                      this.reopenstatus = this.trackinvoicelistdata[z].REOPENED;                  
                      this.reopentime = this.trackinvoicelistdata[z].REOPENEDMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].CORRECTEDSTATUS) {
                      console.log("CORRECTEDSTATUS ==>");
                      this.corrected = true;
                      this.correctedstatus = this.trackinvoicelistdata[z].CORRECTEDSTATUS;                  
                      this.correctedtime = this.trackinvoicelistdata[z].CORRECTEDMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].REJECTEDSTATUS) {
                      this.rejected = true;
                      this.rejectedstatus = this.trackinvoicelistdata[z].REJECTEDSTATUS;
                      this.rejectedtime = this.trackinvoicelistdata[z].REJECTEDMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].PROCESSEDSTATUS) {
                      this.processed = true;
                      this.processedstatus = this.trackinvoicelistdata[z].PROCESSEDSTATUS;
                      this.processedtime = this.trackinvoicelistdata[z].PROCESSEDMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].PARTIALLYPAIDSTATUS) {
                      this.partialpaid = true;
                      this.partialpaidstatus = this.trackinvoicelistdata[z].PARTIALLYPAIDSTATUS;
                      this.partialpaidtime = this.trackinvoicelistdata[z].PARTIALLYPAIDMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].FULLYPAIDSTATUS) {
                      this.paid = true;
                      this.paidstatus = this.trackinvoicelistdata[z].FULLYPAIDSTATUS;
                      this.paidtime = this.trackinvoicelistdata[z].FULLYPAIDSTATUSMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].REVERSEDSAPSTATUS) {
                      this.reversed = true;
                      this.reversedstatus = this.trackinvoicelistdata[z].REVERSEDSAPSTATUS;
                      this.reversedtime = this.trackinvoicelistdata[z].REVERSEDSAPMODIFIEDTIME;
                    }
                    else if (this.trackinvoicelistdata[z].INVALIDSTATUS) {
                      console.log("INVALIDSTATUS ==>");
                      this.invalidinvoice = true;
                      this.invalidinvoiceStatus = this.trackinvoicelistdata[z].INVALIDSTATUS;
                      this.invalidinvoicetime = this.trackinvoicelistdata[z].INVALIDMODIFIEDTIME;
                    }
    
    
                  }
    
                }
              });
    
          }
    
        });
      }

      // var invoicedetails = JSON.parse(sessionStorage.getItem("InvoiceData"));
      // for (var i = 0; i < invoicedetails.length; i++) {
      //   // console.log(invoicedetails[i]);
      //   if(invoicedetails[i].INVOICENUMBER == this.data)
      //   {
      //   this.invoicedata.push(invoicedetails[i]);
      //   }   
      // }
  
      // this.invoicedata.sort((a, b) => Number(a.INVOICEDATE) - Number(b.INVOICEDATE))
      // console.log("this.invoicedata ==>"+this.invoicedata[0].INVOICEDATE);
  
    }
    trackInvoice() {
      this.trackInv = !this.trackInv
    }
  
  
    downloadfile(savedfilename,actualfilename,type) {
     
      if(savedfilename =="" || savedfilename ==null || actualfilename =="" || actualfilename ==null
      ||savedfilename == undefined ||actualfilename == undefined)
      {
        this.dialogBox.popUpOpen2("File not present" ,'success','purchaseorderlist');
        return;
      }
      this.loaderservice.show();
      this.trackOrderListService.getfile(savedfilename, type)
        .subscribe(result => {
          console.log(result);
          console.log("filename===>" + actualfilename);
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
              if (type == 'listdownload') {
                window.navigator.msSaveOrOpenBlob(blob, actualfilename);
              }
              else if (type == 'multiplefiledownload') {
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
              if (type == 'listdownload') {
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
              if (type == 'listdownload') {
                const filename = actualfilename;
                link.href = FileToDownload;
                link.download = filename;
                link.click();
              }
              else if (type == 'multiplefiledownload') {
                const filename = "Supporting_Invoice_Document.zip";
                link.href = FileToDownload;
                link.download = filename;
                link.click();
              }
            }
            this.loaderservice.hide();    
          }
          else if(result[0].reason != 'none')
          {
            this.dialogBox.popUpOpen2(result[0].reason ,'success','purchaseorderlist');
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
  
    createCreditNote(invoicenumber, ponumber,creditAdviceNo) {
      this.pageName = 'trackInvoice';
      this.router.navigate(['./createCreditNote'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), adviceNo: btoa(creditAdviceNo), showCreditDetails: btoa(this.pageName) } });
    }
    getCreditNoteDetails(invoicenumber, ponumber,creditAdviceNo,creditNoteNo){
      this.pageName = 'trackInvoice';
      this.router.navigate(['./createCreditNote'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), adviceNo: btoa(creditAdviceNo) , showCreditDetails: btoa(this.pageName),creditNoteNo: btoa(creditNoteNo)} });
    }
    
    downloadPo(po_number, singlepodownload) {
      this.loaderservice.show();
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
              var extensionName=filename.substr(filename.lastIndexOf('.') + 1)
              this.getFileType(extensionName);
              this.trackOrderListService.downloadEncryptedFile(data,this.extensionType);
            }
            this.loaderservice.hide();
          }
          else if(result[0].reason != 'none')
          {
            this.dialogBox.popUpOpen2(result[0].reason ,'success','purchaseorderlist');
          }
          // if (result[0].status == "Fail") {
          //   this.dialogBox.popUpOpen2(result[0].message, 'error', 'profiledata');
          // }
        }, err => {
          this.loaderservice.hide();
          console.log(JSON.stringify(err))
        }
        );
  
    }
    getFileType(extensionName){
      if(extensionName == 'jpg' || extensionName== 'png' || extensionName== 'jpeg'){
        this.extensionType = 'image/' + extensionName;
      }else if(extensionName == 'pdf'){
        this.extensionType = 'application/pdf';
      }else if(extensionName == 'doc'){
        this.extensionType = 'application/msword';
      }else if(extensionName == 'docx'){
        this.extensionType = 'application/msword';
      }else if(extensionName == 'xls'){
        this.extensionType = 'application/vnd.ms-excel';
      }else if(extensionName == 'xlsx'){
        this.extensionType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      }else if(extensionName == 'csv'){
        this.extensionType = 'text/csv';
      }
    }
    openapproval(n) {
      console.log(n);
      let approvalBox = document.getElementById("approvalBox" + n);
      let closeArrow = document.getElementById("closeArrow" + n);
      let openArrow = document.getElementById("openArrow" + n);
      if (approvalBox.style.display === "none") {
        approvalBox.style.display = "block";
        closeArrow.style.display = "block";
        openArrow.style.display = "none";
      } else {
        approvalBox.style.display = "none";
        openArrow.style.display = "block";
        closeArrow.style.display = "none";
      }
    }

    toggle1(){
  
      if ($('#showId1').hasClass('showNothing')){
        $('#showId1').removeClass('showNothing');
      }else{
        $('#showId1' ).addClass('showNothing');
      }
      if ($('#messagescrollMore1' ).hasClass('showNothing')){
        $('#messagescrollMore1' ).removeClass('showNothing');
        $('#messagescrollMore1').addClass('showMore');
        $('#messagescrollMore1' ).toggleClass('showMore');
      }else{
        $('#messagescrollMore1' ).removeClass('showMore');
        $('#messagescrollMore1' ).addClass('showNothing');
      }
   
   
    }
  
    toggle2(){
      if ($('#showId2').hasClass('showNothing')){
        $('#showId2').removeClass('showNothing');
      }else{
        $('#showId2' ).addClass('showNothing');
      }
      if ($('#messagescrollMore2' ).hasClass('showNothing')){
        $('#messagescrollMore2' ).removeClass('showNothing');
        $('#messagescrollMore2').addClass('showMore');
        $('#messagescrollMore2' ).toggleClass('showMore');
      }else{
        $('#messagescrollMore2' ).removeClass('showMore');
        $('#messagescrollMore2' ).addClass('showNothing');
      }
    }
  
    toggle3(){
      if ($('#showId3').hasClass('showNothing')){
        $('#showId3').removeClass('showNothing');
      }else{
        $('#showId3' ).addClass('showNothing');
      }
      if ($('#messagescrollMore3' ).hasClass('showNothing')){
        $('#messagescrollMore3' ).removeClass('showNothing');
        $('#messagescrollMore3').addClass('showMore');
        $('#messagescrollMore3' ).toggleClass('showMore');
      }else{
        $('#messagescrollMore3' ).removeClass('showMore');
        $('#messagescrollMore3' ).addClass('showNothing');
      }
    }

    routetooriginal()
    {
      if(this.original == 'vendortrackinvoice')
      {
        this.router.navigate(['./trackInvoiceList']);
      }
      else if(this.original == 'vendordashboard')
      {
        this.router.navigate(['./dashboard']);
      }
      else if(this.original == 'vendorinvalidinvoice')
      {
        this.router.navigate(['./InvalidInvoices']);
        // this.router.navigate(['./InternalInvalidInvoice'])
        this.router.navigate(['/InvalidInvoices'], { queryParams: { productid: true } })
      }
  
    }

    //Tooltip Code
  showEndUserTooltip() {
    // debugger;
    this.trackOrderListService.viewInvoiceTrackerVendor(this.invoicenumber, this.ponumber).subscribe(res => {
      if(res[0].ReturnCode == 200){
        
        if(res[0].PendingTracker[0].hasOwnProperty('EndUser')){
          this.tooltipData = res[0].PendingTracker[0].EndUser;
          // this.tooltipData.replace("\n", "<br>");
          this.tooltipData = this.tooltipData.replace(/,/g, "<br>");
          this.isTooltipVisible = true;
        }
        else{
          this.tooltipData = res[0].PendingTracker[0].Confirmer;
          // this.tooltipData.replace("\n", "<br>");
          this.tooltipData = this.tooltipData.replace(/,/g, "<br>");
          this.isTooltipVisible = true;
        }

        if(this.invoicedata[0].CREDITADVICENO != null && this.invoicedata[0].CREDITNOTENO == null){
          this.isCreditNoteMsgVisible = true;
        }
      }
    });
  }

  hideEndUserTooltip() {
    this.isTooltipVisible = false;
  }

  showApprovalTooltip() {
    //  debugger;
    this.trackOrderListService.viewInvoiceTrackerVendor(this.invoicenumber, this.ponumber).subscribe(res => {
      if(res[0].ReturnCode == 200){
        
        if(res[0].PendingTracker[0].hasOwnProperty('Approver')){
          this.tooltipData = res[0].PendingTracker[0].Approver;
          // this.tooltipData.replace("\n", "<br>");
          this.tooltipData = this.tooltipData.replace(/,/g, "<br>");
          this.isApproveTooltipVisible = true;
        }
      }
    });
  }

  hideApprovalTooltip() {
    this.isApproveTooltipVisible = false;
  }
    
}
