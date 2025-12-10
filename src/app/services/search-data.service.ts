import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PurchaseOrderListService } from './purchaseOrderList/purchaseorderlist.service';
import { LoaderService } from './LoaderService/loader.service';
import { DatePipe } from '@angular/common';
import { TrackOrderListService } from "app/services/trackOrderList/trackorderlist";


@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  getSearchData = [];
  getInvSearchData =[];
  poDetail: any = [];
  poDataList: any = [];
  invoiceDataList: any = [];
  searchList: any = [];
  searchInvList: any = [];
  searchPO: any = [];
  showicons: boolean = false;
  searchINV: any = [];
  poItemCount: number = 0;
  invItemCount: any;
  searchvalue = "";
  allPOlist: any;
  acceptedPOList: any;
  inProgressPOList: any;
  completedPOList: any;
  shippedPOList: any;
  DecodedFile: any;
  statusList: any;
  recipientEmail: any;
  topic: any;
  messageList: any;
  filterpodatalist: any;
  totalItems: any;
  searchKey: any;
  pgNolist: any[];
  message: string;
  onholdinvList: any[];
  submittedinvList: any[];
  partiallypaidinvList: any[];
  paidinvList: any[];
  processedinvList: any[];
  acceptedinvList: any[];
  validate: boolean = true;
  uniquePONumber: any;
  uniqueInvNumber: any;
  poReadstatusList: any = [];
  invoiceData1: any = [];
  equalfound: boolean = false;
  extensionType: any;
  remarklength: number = 160;

  constructor(private http: HttpClient,private purchaseOrderListService: PurchaseOrderListService,
    private loaderservice: LoaderService,public datepipe: DatePipe,private TrackOrderListService: TrackOrderListService) {}

  setSearchData(data: any) {
    console.log(data);
    
    this.getSearchData = data;
  }

  setInvSearchData(data: any) { 
    this.getInvSearchData = data;
  }

  getPOmessageStatus() {
    this.purchaseOrderListService.getReadStatus().subscribe((res) => {
      console.log("response", res[0].poQueryList);
      // this.purchaseOrderListService.getChatStatus().subscribe(res => {
      if (res[0].message != "No Data Found for given Vendor Id") {
        console.log("is Data Coming??", res[0].poQueryList);
        this.poReadstatusList = res[0].poQueryList;
      } else {
        this.poReadstatusList = [];
      }
    });
  }

    getmessageStatus() {
    this.purchaseOrderListService.getChatStatus().subscribe((res) => {
      if (res[0].message != "No Data Found for given Vendor Id") {
        console.log("is Data Coming????", res[0].poQueryList);
        this.statusList = res[0].poQueryList;
      } else {
        this.statusList = [];
      }
    });
  }

  getPurChaseOrderList() {
    this.loaderservice.show();
    this.poItemCount = 0;
    this.poDataList = [];
    this.allPOlist = [];
    this.acceptedPOList = [];
    this.inProgressPOList = [];
    this.completedPOList = [];
    this.shippedPOList = [];
    this.searchList = [];
    this.getPOmessageStatus();

    this.purchaseOrderListService
      .getPO("1", "ALL", "NA", "NA", "NA", "NA", "NA", "NA")
      .subscribe(
        (res) => {
          if (res[0].message != "No Data Found for given Vendor Id") {
            console.log("Data", res[0].poData);
            this.poDataList = res[0].poData;
            // for (let i = 0; i < this.poDataList.length; i++) {
            //   this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            // }
            for (var i = 0; i < this.poDataList.length; i++) {
              if (this.poDataList[i]["STATUS"] == "N") {
                this.poItemCount = this.poItemCount + 1;
              }
              var poFormatDate = this.poDataList[i].DATE;
              poFormatDate.replace(" ", "T");
              this.poDataList[i].DATE = poFormatDate;
              this.poDataList[i].DATE = this.datepipe.transform(
                this.poDataList[i].DATE,
                "dd-MMM-yyyy"
              );
            }
            this.filterpodatalist = res[0].poData;
            this.totalItems = this.poDataList.length;
            this.loaderservice.hide();
            setTimeout(() => {
              this.loaderservice.show();
              for (var k = 0; k < this.poDataList.length; k++) {
                console.log("this.statusList.length " + this.poReadstatusList);
                if (this.poReadstatusList.length != 0) {
                  for (var j = 0; j < this.poReadstatusList.length; j++) {
                    if (
                      this.poReadstatusList[j]["STATUS"] == "A" &&
                      this.poReadstatusList[j]["PONUMBER"] ==
                        this.poDataList[k]["PO_NUMBER"]
                    ) {
                      $("#msg1ID" + k).addClass("displayBlock");
                      $("#msgID" + k).addClass("displayNone");
                    } else {
                      //$("#msg1ID" + k).addClass('displayNone');
                      $("#msgID" + k).addClass("displayBlock");
                    }
                  }
                } else {
                  $("#msgID" + k).addClass("displayBlock");
                }
              }
              this.loaderservice.hide();
            }, 800);
          }
        },
        (err) => {
          this.loaderservice.hide();
        }
      );
    // this.loaderservice.hide();
    console.log("PO Data List API called here---");
    console.log(this.poDataList);
  }

  getalldata(searchKey) {
    if (searchKey == "") {
      this.getPurChaseOrderList();
      this.getinvoiceDataList();
    }
  }

  
  getinvoiceDataList() {
    this.loaderservice.show();
    // this.TrackOrderListService.getInvoiceData().subscribe(res => {
    //   // console.log("Data",res[0].poData)
    //   if (res[0].message != "No Data Found for given Vendor Id") {
    //     this.invoiceDataList = res[0].invoiceData;
    //     console.log("Ststsu", this.invoiceDataList);

    //     this.searchInvList = res[0].invoiceData;
    //     this.loaderservice.hide();
    //   }
    //   else {
    //     this.loaderservice.hide();
    //   }
    // }, err => {
    //   this.loaderservice.hide();
    // });
    this.TrackOrderListService.getInvoiceData(
      "1",
      "P",
      "NA",
      "NA",
      "NA",
      "NA",
      "NA"
    ).subscribe(
      (res) => {
        if (res[0].message == "Sucessinvlist") {
          this.loaderservice.show();
          // }
          this.invoiceDataList = res[0].invoiceData;

          //used Currency pipe
          // for (let i = 0; i < this.invoiceDataList.length; i++) {
          //   this.invoiceDataList[i].TOTALAMOUNT = Number(this.invoiceDataList[i].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          // }
          // this.invoiceDatawopo = res[0].invoiceDataWOPO;
          this.searchInvList = res[0].invoiceData;
          console.log("response====>", res);
          console.log("th list ==>" + JSON.stringify(this.processedinvList));
          this.invoiceData1 = res[0].invoiceData;
          // this.invoiceDatawopo = res[0].invoiceDataWOPO;
          console.log("this.invoiceData1.length" + this.invoiceData1.length);
          this.invoiceDataList = [];
          this.getuniqueinvoice(this.invoiceData1);
          if (this.invoiceDataList.length > 0) {
            this.getmessageColor();
          }

          this.loaderservice.hide();
        } else {
          this.loaderservice.hide();
        }
      },
      (err) => {
        this.loaderservice.hide();
      }
    );
    // setTimeout(() => {
    // this.loaderservice.show();

    // }, 50); err => {
    // console.log("error here",err);

    this.loaderservice.hide();
    // }
    this.loaderservice.hide();
  }

  getmessageColor() {
    setTimeout(() => {
      if (this.invoiceDataList.length != 0) {
        for (var k = 0; k < 5; k++) {
          console.log("this.statusList.length " + this.statusList.length);
          if (this.statusList.length != 0) {
            for (var j = 0; j < this.statusList.length; j++) {
              if (
                this.statusList[j]["STATUS"] == "A" &&
                this.statusList[j]["INVOICENUMBER"] ==
                  this.invoiceDataList[k]["INVOICENUMBER"] &&
                this.statusList[j]["PONUMBER"] ==
                  this.invoiceDataList[k]["PO_NUMBER"]
              ) {
                $("#msg12ID" + k).addClass("displayBlock");
                $("#msgID11" + k).addClass("displayNone");
              } else {
                // $("#msg12ID" + k).addClass('displayNone');
                $("#msgID11" + k).addClass("displayBlock");
              }
            }
          } else {
            $("#msgID11" + k).addClass("displayBlock");
          }
        }
        this.loaderservice.hide();

        if (this.invoiceDataList == "") {
          $("#shdata").addClass("displayBlock");
        } else {
          $("#shdata").addClass("displayNone");
        }
      } else {
        this.loaderservice.hide();
      }
    }, 500);
  }

  getuniqueinvoice(array) {
    for (var i = 0; i < this.invoiceData1.length; i++) {
      this.equalfound = false;
      var tempo = this.invoiceData1[i].PO_NUMBER;
      var tempinvo = this.invoiceData1[i].INVOICENUMBER;
      if (i + 1 != this.invoiceData1.length) {
        for (var j = i + 1; j < this.invoiceData1.length; j++) {
          if (
            tempo == this.invoiceData1[j].PO_NUMBER &&
            tempinvo == this.invoiceData1[j].INVOICENUMBER
          ) {
            console.log("innini if");
            this.equalfound = true;
          }
        }
      }
      if (this.equalfound == false) {
        console.log("innini push");
        this.invoiceDataList.push(this.invoiceData1[i]);
      }
    }
    return this.invoiceDataList;
  }
}
