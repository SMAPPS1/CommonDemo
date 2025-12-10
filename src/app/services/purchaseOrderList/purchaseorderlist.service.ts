import { AppSettings } from '../../models/appsetting';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'assets/configdata/baseURL';
// import { Observable } from 'rxjs';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderListService {
 

  constructor(private http: HttpClient) { }

  Authorization = sessionStorage.getItem('PROFILE_ACCESS');
  Authorizationkey = sessionStorage.getItem('ACCESS_TOKEN');
  LoggedInUser = sessionStorage.getItem('loginUser');
  ReceiverMail = sessionStorage.getItem('receiverMail');

  headers = new HttpHeaders()
    .set('Authorization', this.Authorization)
    .set('Authorizationkey', this.Authorizationkey)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set("Accept", "*/*");

  headers1 = new HttpHeaders()
    .set('Authorization', this.Authorization)
    .set('Authorizationkey', this.Authorizationkey)
    .set('Content-Type', 'application/json')
    .set("Accept", "*/*");

  getPO(pagenumber,status,ponumber,fromdateofduration,todateofduration,fromdateofpo,todateofpo,plant) {

    console.log("session BID", sessionStorage.getItem("Bid"))
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('nPage',pagenumber);
    urlSearchParams = urlSearchParams.append('ponumber',ponumber);
    urlSearchParams = urlSearchParams.append('fromdateofduration',fromdateofduration);
    urlSearchParams = urlSearchParams.append('todateofduration',todateofduration);
    urlSearchParams = urlSearchParams.append('fromdateofpo',fromdateofpo);
    urlSearchParams = urlSearchParams.append('todateofpo',todateofpo);
    urlSearchParams = urlSearchParams.append('plant',plant);
    let jsonData = urlSearchParams.toString();
    console.log("loggedIn User", this.LoggedInUser)
    return this.http.post<any>(AppSettings.PurchaseOrderList, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  getWOPO(pageno,status,ponum,fromdateofduration,todateofduration,fromdateofpo,todateofpo) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('pageno', pageno);
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('ponumber', ponum);
    urlSearchParams = urlSearchParams.append('fromdateofduration', fromdateofduration);
    urlSearchParams = urlSearchParams.append('todateofduration', todateofduration);
    urlSearchParams = urlSearchParams.append('fromdateofpo', fromdateofpo);
    urlSearchParams = urlSearchParams.append('todateofpo', todateofpo);

    let jsonData = urlSearchParams.toString();
    console.log("loggedIn User", this.LoggedInUser)
    return this.http.post<any>(AppSettings.PurchaseOrderListWOPO, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  

  getPODetails(po_num) {

    console.log("session BID", sessionStorage.getItem("Bid"))
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('po_num', po_num);
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.purchaseOrderDetails, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  getPOHistoryDetails(po_num) {

    console.log("session BID", sessionStorage.getItem("Bid"))
    console.log(po_num)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('ponumber', po_num);
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.asnList, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  editASNNumberHistory(asn_num,reqNo,filename,status) {
    debugger
    console.log("session BID", sessionStorage.getItem("Bid"))
    console.log(asn_num)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('asnNumber', asn_num);
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('reqNo', reqNo);
    urlSearchParams = urlSearchParams.append('docName', filename);
    urlSearchParams = urlSearchParams.append('status', status);
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.putASN, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  getgrnbasedonpo(ponumber)
  {
    console.log("session BID", sessionStorage.getItem("Bid"))
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('ponumber', ponumber);
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getgrnonpo, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })

  }

  getgrnonpoandinvoice(ponumber,dcnumber)
  {
   
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('ponumber', ponumber);
    urlSearchParams = urlSearchParams.append('dcnumber', dcnumber);
    dcnumber.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('dcnumber', feedback);
    });
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.Getgrnbasedoninvoiceandpo, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })

  }

  getInvalidInvoiceCount(){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('emailid', sessionStorage.getItem("loginUser"));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.InvalidInvoiceCount, jsonData, { headers: this.headers, withCredentials: true })

  }
  // getInvalidInvoiceData(pageno){
  //   let urlSearchParams: HttpParams = new HttpParams();
  //   urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
  //   urlSearchParams = urlSearchParams.append('page',pageno);
  //   urlSearchParams = urlSearchParams.append('status',"INV")
  //   // urlSearchParams =  urlSearchParams.append('invoicenumber', invno);
  //   // urlSearchParams =  urlSearchParams.append('ponumber', pono);
  //   // urlSearchParams =  urlSearchParams.append('fromdate', fdate);
  //   // urlSearchParams =  urlSearchParams.append('todate', tdate);
  //   // urlSearchParams =  urlSearchParams.append('plant', plant);
  //   let jsonData = urlSearchParams.toString();
  //   return this.http.post<any>(AppSettings.getinvalidinvoicedata,jsonData,{headers:this.headers,withCredentials:true})
  // }

  getInvalidInvoiceSearch(pageno,status,invno,pono,fdate,tdate,plant){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('page',pageno);
    urlSearchParams = urlSearchParams.append('status',"AS")
    urlSearchParams =  urlSearchParams.append('invoicenumber', invno);
    urlSearchParams =  urlSearchParams.append('ponumber', pono);
    urlSearchParams =  urlSearchParams.append('fromdate', fdate);
    urlSearchParams =  urlSearchParams.append('todate', tdate);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinvalidinvoicedata,jsonData,{headers:this.headers,withCredentials:true})
  }

  getgrnonpoandinvoiced(ponumber, dcnumber) {
		console.log("session BID", sessionStorage.getItem("Bid")) 
    let urlSearchParams: HttpParams = new HttpParams();
		urlSearchParams = urlSearchParams.append('ponumber', ponumber); // urlSearchParams = urlSearchParams.append('dcnumber', dcnumber);
		dcnumber.forEach(feedback => { urlSearchParams = urlSearchParams.append('dcnumber', feedback); }); urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
      let jsonData = urlSearchParams.toString(); 
      return this.http.post<any>(AppSettings.getgrnonpoandinvoiced, jsonData, { headers: this.headers, responseType: "json", withCredentials: true }) }

  Getgrnbasedoninvoiceandpo(ponum,array)
  {
    //  console.log("session BID",ponumber)
    // console.log("session BID",dcnumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('basepo', ponum);
    // urlSearchParams = urlSearchParams.append('dcnumber', array);
    // urlSearchParams = urlSearchParams.append('dcnumber', dcnumber);

//     for( var i=0; i< array.length;i+2){
//   let tempList:any =[];
//   tempList.push(array[i]);
//   tempList. push(array[i+1]);

//   urlSearchParams = urlSearchParams.append('dcnumber', tempList);

// }
console.log("urlSearchParams "+urlSearchParams )

 array.forEach(feedback => {
urlSearchParams = urlSearchParams.append('dcnumber', feedback);
// urlSearchParams = urlSearchParams.append('ponumber', ponum);
    });
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.Getgrnbasedoninvoiceandpo, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })

  }
  submitConfirmation(poNumber, status, message, subject, topic) {

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    if (subject == "POconfirmation") {
      urlSearchParams = urlSearchParams.append('po_num', poNumber);
    }
    if (subject == "SubmitQuery") {
      urlSearchParams = urlSearchParams.append('po_num', topic);
    }
    // urlSearchParams = urlSearchParams.append('invoice_num', uniqueInvNumber);
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('message', message);
    urlSearchParams = urlSearchParams.append('subject', subject)
    urlSearchParams = urlSearchParams.append('topic', topic)
    urlSearchParams = urlSearchParams.append('emailid', this.LoggedInUser)
    urlSearchParams = urlSearchParams.append('invoiceNumber', '')
    console.log("loggedIn User", this.LoggedInUser)
    let jsonData = urlSearchParams.toString();

    console.log("type", this.Authorization)

    return this.http.post<any>(AppSettings.confirmPurchaseOrder, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


  submitInvoiceChat(poNumber, uniquePONumber, uniqueInvNumber, status, message, subject, topic) {

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    if (subject == "POconfirmation") {
      urlSearchParams = urlSearchParams.append('po_num', poNumber);
    }
    if (subject == "SubmitQuery") {
      urlSearchParams = urlSearchParams.append('po_num', uniquePONumber);
    }
    urlSearchParams = urlSearchParams.append('invoice_num', uniqueInvNumber);
    // urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('message', message);
    urlSearchParams = urlSearchParams.append('subject', subject)
    urlSearchParams = urlSearchParams.append('topic', topic)
    urlSearchParams = urlSearchParams.append('emailid', this.LoggedInUser)
    // urlSearchParams = urlSearchParams.append('RequsitionerEmail', this.ReceiverMail)
    console.log("loggedIn User", this.LoggedInUser)
    let jsonData = urlSearchParams.toString();

    console.log("type", this.Authorization)

    return this.http.post<any>(AppSettings.invoiceChat, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


  getMessages(poNumber) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num', poNumber);
    let jsonData = urlSearchParams.toString();
    console.log("jsonData", jsonData)

    return this.http.post<any>(AppSettings.getMessagesList, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


  invoicesubmission(irnnumber, irndate, ponumber, invoiceNumber, invoicedate,
    refno, grnnumber, lineitemnumber, ordernumber, quantity, uoM, contactPerson, contactPersonPhone,
    vendorid, company, plant, department, costcenter, category, businessPartnerText, profileid, invoiceDocumentPath,
    invoiceamount, igstamount, cgstamount, sgstamount, totalamount, description, status, actualfilename,
     savedfilename,BalanceQty,rawinvno) {

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num', ponumber);
    urlSearchParams = urlSearchParams.append('irnnumber', irnnumber);
    urlSearchParams = urlSearchParams.append('irndate', irndate);
    urlSearchParams = urlSearchParams.append('invoiceNumber', invoiceNumber);
    urlSearchParams = urlSearchParams.append('invoicedate', invoicedate);
    urlSearchParams = urlSearchParams.append('referenceNumber', refno);
    urlSearchParams = urlSearchParams.append('gRNNumber', grnnumber);
    urlSearchParams = urlSearchParams.append('lineItemNumber', lineitemnumber);
    urlSearchParams = urlSearchParams.append('orderNumber', ordernumber);
    urlSearchParams = urlSearchParams.append('quantity', quantity);
    urlSearchParams = urlSearchParams.append('uOM', uoM);
    urlSearchParams = urlSearchParams.append('contactPerson', contactPerson);
    urlSearchParams = urlSearchParams.append('contactPersonPhone', contactPersonPhone);
    urlSearchParams = urlSearchParams.append('vendorID', vendorid);
    urlSearchParams = urlSearchParams.append('company', company);
    urlSearchParams = urlSearchParams.append('plant', plant);
    urlSearchParams = urlSearchParams.append('department', department);
    urlSearchParams = urlSearchParams.append('costCentre', costcenter);
    urlSearchParams = urlSearchParams.append('category', category);
    urlSearchParams = urlSearchParams.append('businessPartnerText', businessPartnerText);
    urlSearchParams = urlSearchParams.append('profileID', profileid);
    urlSearchParams = urlSearchParams.append('invoiceDocumentPath', invoiceDocumentPath);
    urlSearchParams = urlSearchParams.append('iGSTAmount', igstamount);
    urlSearchParams = urlSearchParams.append('cGSTAmount', cgstamount);
    urlSearchParams = urlSearchParams.append('sgstAmount', sgstamount);
    urlSearchParams = urlSearchParams.append('totalAmount', totalamount);
    urlSearchParams = urlSearchParams.append('description', description)
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('invoiceamount', invoiceamount);
    urlSearchParams = urlSearchParams.append('savedfilename', savedfilename);
    urlSearchParams = urlSearchParams.append('actualfilename', actualfilename);
    urlSearchParams = urlSearchParams.append('buyerId', sessionStorage.getItem('Buyer'));
    urlSearchParams = urlSearchParams.append('endUserId', sessionStorage.getItem("Requisitioner"));
    urlSearchParams = urlSearchParams.append('endUserStatus', 'P');
    urlSearchParams=urlSearchParams.append('created_by', this.LoggedInUser);
    urlSearchParams=urlSearchParams.append('modified_by', this.LoggedInUser);
    
    // var useremail = localStorage.getItem('EMAILIDUSER');
    // if(useremail != '')
    // {
    //   urlSearchParams = urlSearchParams.append('endUserId', useremail);
      
    // }
    // else
    // {
    //   urlSearchParams = urlSearchParams.append('endUserId', sessionStorage.getItem("Requisitioner"));
    // }
    urlSearchParams = urlSearchParams.append('euManager', '');
    urlSearchParams = urlSearchParams.append('stage','1');
    urlSearchParams = urlSearchParams.append('balance_qty',BalanceQty);
    urlSearchParams = urlSearchParams.append('rawinvno', rawinvno);
    
    let jsonData = urlSearchParams.toString();

    console.log("type", this.Authorization)
    // -----------------------testing
    // return this.http.post<any>(AppSettings.downloadPOdetails,jsonData,{headers: this.headers, withCredentials: true})
    // ----------------------------proper
    return this.http.post<any>(AppSettings.submitInvoiceDetails, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


  invoicesubmissionwithoutpo(irnNumber,irnDate,invoiceNumber, invoicedate,invoiceamount, totalamount, description,
    status,useremail,billofladingdate,actualfilename,
    savedfilename,multipleactualfilename,multiplesavedfilename) {

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('irnNumber', irnNumber);
    urlSearchParams = urlSearchParams.append('irnDate', irnDate);
    urlSearchParams = urlSearchParams.append('invoiceNumber', invoiceNumber);
    urlSearchParams = urlSearchParams.append('invoicedate', invoicedate);
    urlSearchParams = urlSearchParams.append('totalAmount', totalamount);
    urlSearchParams = urlSearchParams.append('description', description);
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('invoiceamount', invoiceamount);
    urlSearchParams = urlSearchParams.append('endUserStatus', 'P');
    urlSearchParams = urlSearchParams.append('euManager', "sachin.mehta@timesgroup.com");
    urlSearchParams = urlSearchParams.append('stage','1');
    urlSearchParams = urlSearchParams.append('useremail',useremail);
    urlSearchParams = urlSearchParams.append('billofladingdate',billofladingdate);
    urlSearchParams = urlSearchParams.append('actualfilename',actualfilename);
    urlSearchParams = urlSearchParams.append('savedfilename',savedfilename);
    urlSearchParams = urlSearchParams.append('multipleactualfilename',multipleactualfilename);
    urlSearchParams = urlSearchParams.append('multiplesavedfilename',multiplesavedfilename);

    let jsonData = urlSearchParams.toString();

    console.log("type", this.Authorization)
    // -----------------------testing
    // return this.http.post<any>(AppSettings.downloadPOdetails,jsonData,{headers: this.headers, withCredentials: true})
    // ----------------------------proper
    return this.http.post<any>(AppSettings.submitInvoiceDetailswithoutPO, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  invoicesubmission1(array) {

    return this.http.post<any>(AppSettings.submitInvoiceDetails, array, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  sendEmaildemo(array) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    array.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('feedback', feedback);
    });
    let jsonData = urlSearchParams.toString();
    // let headers2 = new HttpHeaders()
    //   .set('Authorization', this.Authorization)
    //   .set('Authorizationkey', this.Authorizationkey)
    //   .set('Content-Type', 'application/json')
    //   .set("Accept", "*/*");

    let headers2 = new HttpHeaders()
      .append('Authorization', this.Authorization)
      .append('Authorizationkey', this.Authorizationkey)
      .append('Content-Type', 'application/json')
      .append("Accept", "*/*");

    console.log("URL", array)
    return this.http.post<any>(AppSettings.panDetailsdemo, array, { headers: headers2, responseType: "json", withCredentials: true })
  }
  fileupload(file, fileName = "") {
    let headers1 = new HttpHeaders()
      .set('Authorization', this.Authorization)
      .set('Authorizationkey', this.Authorizationkey)
      .set("Accept", "*/*");
    let urlSearchParams: HttpParams = new HttpParams();
    let formData: FormData = new FormData();
    if (fileName == "") {
      formData.append("file", file);
    }
    else {
      formData.append("file", file, fileName);
    }
        // let jsonData = urlSearchParams.toString();
    //  let options = new RequestOptions({ headers: headers1, withCredentials: true });
    return this.http.post<any>(AppSettings.uploadProductPortfolio, formData, { headers: headers1, withCredentials: true })
  }

  // fileupload(file, fileName = "") {
  //   console.log(file,'fileeeeeeeeeeeeee')
  //   // this.loaderService.show();
  //   // this.auth = this.commonservice.gettoken();
  //   // console.log("save service" ,model, this.headers);
  //   // let urlSearchParams: HttpParams = new HttpParams();
  //   const headers= new HttpHeaders()
  //  .set('Authorization',this.Authorization)
  //  .set('Authorizationkey',this.Authorizationkey)
  //  .set("Accept", "*/*");
  //   // const headers = new Headers();

  //   // headers.append('Authorization', this.auth.value);
  //   // headers.append('Authorizationkey', this.auth.keyvalue);
  //   // headers.append("Accept", "*/*");

  //   let urlSearchParams: HttpParams = new HttpParams();

  //   let formData: FormData = new FormData();
  //   if (fileName == "") {
  //     formData.append("file", file);
  //   }
  //   else {
  //     formData.append("file", file, fileName);
  //   }
  //   let jsonData = urlSearchParams.toString();
  //     // for testing purpose
  //   // return this.http.post<any>(AppSettings.downloadPOdetails,formData,{headers: headers, withCredentials: true})
  //   // proper purpose
  //   return this.http.post<any>(AppSettings.submitFile,formData,{headers: headers, withCredentials: true})

  // }

  getpolistfile(model: string,ponumber,fromdateofduration,todateofduration,fromdateofpo,todateofpo) {
    console.log("save service", model, this.headers);
    let urlSearchParams: HttpParams = new HttpParams();
    const headers = new HttpHeaders()
      .set('Authorization', this.Authorization)
      .set('Authorizationkey', this.Authorizationkey)
      .set("Accept", "*/*");
    // model.forEach(res => {
    //   urlSearchParams = urlSearchParams.append('ponumbers', res);
    // });
    urlSearchParams = urlSearchParams.append('mode', model);
    urlSearchParams = urlSearchParams.append('ponumber', ponumber);
    urlSearchParams = urlSearchParams.append('fromdateofduration', fromdateofduration);
    urlSearchParams = urlSearchParams.append('todateofduration', todateofduration);
    urlSearchParams = urlSearchParams.append('fromdateofpo', fromdateofpo);
    urlSearchParams = urlSearchParams.append('todateofpo', todateofpo);
    console.log("data after loop", urlSearchParams)

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.downloadPOdetails, jsonData, { headers: headers, withCredentials: true })

  }

  getinternalpolistfile(emailid,currstatus,
    popaginationnumber,ponum,fromdateofduration,todateofduration,
    fromdateofpo,todateofpo,plant,vendor) {
    // console.log("save service", model, this.headers);
    let urlSearchParams: HttpParams = new HttpParams();
    const headers = new HttpHeaders()
      .set('Authorization', this.Authorization)
      .set('Authorizationkey', this.Authorizationkey)
      .set("Accept", "*/*");
      urlSearchParams = urlSearchParams.append('email', emailid);
      urlSearchParams = urlSearchParams.append('status', currstatus);
      urlSearchParams = urlSearchParams.append('nPage', popaginationnumber);
      urlSearchParams = urlSearchParams.append('ponumber', ponum);
      urlSearchParams = urlSearchParams.append('fromdateofduration', fromdateofduration);
      urlSearchParams = urlSearchParams.append('todateofduration', todateofduration);
      urlSearchParams = urlSearchParams.append('fromdateofpo', fromdateofpo);
      urlSearchParams = urlSearchParams.append('todateofpo', todateofpo);
      urlSearchParams = urlSearchParams.append('plant', plant);
      urlSearchParams = urlSearchParams.append('vendor', vendor);

    console.log("data after loop", urlSearchParams)

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.downloadinternalPOdetails, jsonData, { headers: headers, withCredentials: true })

  }



  getReadStatus() {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('emailid', sessionStorage.getItem("loginUser"));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.messageStatus, jsonData, { headers: this.headers, withCredentials: true })
  }

  getChatStatus(){
      let urlSearchParams: HttpParams = new HttpParams();
      urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
      urlSearchParams=urlSearchParams.append('emailid', sessionStorage.getItem('loginUser'));
  
      let jsonData = urlSearchParams.toString();
  
      return this.http.post<any>(AppSettings.getUnreadMessage, jsonData, { headers: this.headers, withCredentials: true })
  
  
  
    }
  

  getReadStatusUpdate(poNumber) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num', poNumber);

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.messageStatusUpdate, jsonData, { headers: this.headers, withCredentials: true })
    
  }

  getChatStatusUpdate(poNumber, invNumber) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid',sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num',poNumber);
    urlSearchParams=urlSearchParams.append('invoice_num',invNumber);
    urlSearchParams=urlSearchParams.append('emailid',sessionStorage.getItem('loginUser'));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.updateChatStatus, jsonData, { headers: this.headers, withCredentials: true })
  }


  getorderitems(lineitemnumber,poNumber) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid',sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num',poNumber);
    urlSearchParams=urlSearchParams.append('lineitemnumber',lineitemnumber);

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.getorderitems, jsonData, { headers: this.headers, withCredentials: true })
  }
  


  getIRNNumber(actualfilename,savedfilename){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('actualfilename',actualfilename);
    urlSearchParams=urlSearchParams.append('savedfilename',savedfilename);
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.IRNscannerApi,jsonData,{ headers: this.headers, withCredentials: true })
  }

  readbulkuploadfile(savedfilename){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('fileName',savedfilename);
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.readbulkuploadfile,jsonData,{ headers: this.headers, withCredentials: true })
  }
  // getAccountMaster(data: string): Observable<any> {
  
  //   let url = '';
  //   switch (data) {
  //     case 'accountdetails':
  //       url = AppSettings.AccountDetails;
  //       break;
  //     case 'compnay_code':
  //       url = AppSettings.CompanyCode;
  //       break;
  //       case 'Purch-Group':
  //         url = AppSettings.purchaseGroup;
  //         break;
  //         case 'SchemaGrpVndr':
  //       url = AppSettings.SchemaGrpVndr;
  //       break;
  //       case 'Countrykey':
  //       url = AppSettings.ConutryKey;
  //       break;
  //       case 'typeOfindustr':
  //       url = AppSettings.industryMaster;
  //       break;
  //       case 'BusinessType':
  //         url = AppSettings.BuisnesTypeMaster;
  //         break;
  //       // case 'puchaseORG':
  //       //   url = AppSettings.purchaseOrg;
  //       //   break;
  //       // case "PlantCode":
  //       //   url = AppSettings.plantCode;
  //       //   break;
  //       case 'orderCurrency':
  //         url=AppSettings.orderCurr;
  //         break;
  //       case 'paymentTrms':
  //         url=AppSettings.paymnetTErms;
  //         break;
  //       case 'conf':
  //         url=AppSettings.Conf;
  //         break;
  //       case 'planingrp':
  //         url=AppSettings.planingrp;
  //         break
  //       case 'title':
  //         url=AppSettings.gettitleMaster;
  //         break
  //       case 'softkey':
          
  //         url=AppSettings.softkey;
  //         break
  //       case 'WithTCode':
  //         url=AppSettings.WithTCode;
  //         break
  //     // Add more cases here for other types
  //     default:
  //       return throwError('Invalid data type');
  //   }
    
  //   return this.http.post<any>(url, ' ', { withCredentials: true }).pipe(
  //     catchError(err => throwError(console.log(err)) )
  //   );
  // }


  createcustomdeliveryitems(ponumber,podate,lineitemnumbers,quantity){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
    urlSearchParams=urlSearchParams.append('podate',podate);
    lineitemnumbers.forEach(res => {
      urlSearchParams = urlSearchParams.append('lineitemnumbers', res);
    });
    quantity.forEach(res => {
      urlSearchParams = urlSearchParams.append('quantity', res);
    });
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.createcustomdeliveryitems,jsonData,{ headers: this.headers, withCredentials: true })
  }

  createCustomDeliveryItemsForSimpo(model){
    // let urlSearchParams: HttpParams = new HttpParams();
    // let jsonData = urlSearchParams.toString();
    // let headers2 = new HttpHeaders()
    //   .append('Authorization', this.Authorization)
    //   .append('Authorizationkey', this.Authorizationkey)
    //   .append('Content-Type', 'application/json')
    //   .append("Accept", "*/*");

    // console.log("URL", array)


    // console.log("jsonData",jsonData);
    // return this.http.post<any>(AppSettings.createcustomdeliveryitemsforsimpo, array, { headers: headers2, responseType: "json", withCredentials: true })
    let urlSearchParams: HttpParams = new HttpParams();
  
    model.forEach(feedback => {
  
      urlSearchParams = urlSearchParams.append('items', feedback);
    });
    let jsonData = urlSearchParams.toString();
  
  
      return this.http.post<any>(AppSettings.createcustomdeliveryitemsforsimpo1, jsonData, {responseType: "json", withCredentials: true })

  }

  createCustomDeliveryItemForSimpoWithDc(model){
    let urlSearchParams: HttpParams = new HttpParams();
  
    model.forEach(feedback => {
  
      urlSearchParams = urlSearchParams.append('items', feedback);
    });
    let jsonData = urlSearchParams.toString();
  
  
      return this.http.post<any>(AppSettings.createcustomdeliverywithitemforsimpodc, jsonData, {responseType: "json", withCredentials: true })

  }
  getOrderHavingDcnForSimpo(model){
    // let urlSearchParams: HttpParams = new HttpParams();
    // array.forEach(feedback => {

    //   urlSearchParams = urlSearchParams.append('feedback', feedback);
    // });
    // let jsonData = urlSearchParams.toString();
    // let headers2 = new HttpHeaders()
    //   .append('Authorization', this.Authorization)
    //   .append('Authorizationkey', this.Authorizationkey)
    //   .append('Content-Type', 'application/json')
    //   .append("Accept", "*/*");

    // console.log("URL", array)
    // return this.http.post<any>(AppSettings.getorderhavingdcnforsimpo, array, { headers: headers2, responseType: "json", withCredentials: true })
    let urlSearchParams: HttpParams = new HttpParams();
  
    model.forEach(feedback => {
  
      urlSearchParams = urlSearchParams.append('items', feedback);
    });
    let jsonData = urlSearchParams.toString();
      return this.http.post<any>(AppSettings.getorderhavingdcnforsimpo, jsonData, {responseType: "json", withCredentials: true })
  }
  deleteEmptyDeliveriesSimpo(array){
    
    
    // let urlSearchParams: HttpParams = new HttpParams();
    // array.forEach(feedback => {

    //   urlSearchParams = urlSearchParams.append('feedback', feedback);
    // });
    // let jsonData = urlSearchParams.toString();
    // let headers2 = new HttpHeaders()
    //   .append('Authorization', this.Authorization)
    //   .append('Authorizationkey', this.Authorizationkey)
    //   .append('Content-Type', 'application/json')
    //   .append("Accept", "*/*");

    // console.log("URL", array)
    // return this.http.post<any>(AppSettings.deleteemptydeliveriessimpo, array, { headers: headers2, responseType: "json", withCredentials: true })
    let urlSearchParams: HttpParams = new HttpParams();
  
    array.forEach(feedback => {
  
      urlSearchParams = urlSearchParams.append('items', feedback);
    });
    let jsonData = urlSearchParams.toString();
      return this.http.post<any>(AppSettings.deleteemptydeliveriessimpo, jsonData, {responseType: "json", withCredentials: true })
  }  
    simpoSubmitInvoice(array){
      console.log("array",array);
      // console.log("sending Data", PAN)
      let urlSearchParams: HttpParams = new HttpParams();
      array.forEach(feedback => {
  
        urlSearchParams = urlSearchParams.append('feedback', feedback);
      });
      let jsonData = urlSearchParams.toString();
      let headers2 = new HttpHeaders()
        .append('Authorization', this.Authorization)
        .append('Authorizationkey', this.Authorizationkey)
        .append('Content-Type', 'application/json')
        .append("Accept", "*/*");
  
      console.log("URL", array)
      return this.http.post<any>(AppSettings.simposubmitinvoice, array, { headers: headers2, responseType: "json", withCredentials: true })

    }
  simpoEventDetails(po_num_list){
    console.log(po_num_list);
    let URLSearchParams: HttpParams = new HttpParams();
    po_num_list.forEach(res => {
      URLSearchParams = URLSearchParams.append('po_num_list', res);
      console.log("URL", po_num_list)
    });

    let jsonData = URLSearchParams.toString();
    return this.http.post(AppSettings.simPoEventDetails,jsonData,{ headers: this.headers, withCredentials: true })

  }

  simPoProcessedPos(ponumber,plant)
  {
    console.log("session BID", sessionStorage.getItem("Bid"))
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('ponumber', ponumber);
    urlSearchParams = urlSearchParams.append('plantCode', plant);
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.simPoProcessedPos, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }
  GetgrnbaseonPos(ponumber){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('ponumber', ponumber);
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.Getgrnbaseonpo, jsonData, { headers: this.headers, withCredentials: true })

  }
  getorderforfullpo(ponumber){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
   
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.getorderforfullpo,jsonData,{ headers: this.headers, withCredentials: true })
  }

  multiplefileupload(formData:FormData)
  {
    
    let urlSearchParams: HttpParams = new HttpParams();
    let formData1: FormData = new FormData();
    formData.forEach(res => {
      formData1.append("files", res);
      // formData.append("files", res, fileName);
      // urlSearchParams = urlSearchParams.append('files', res.toString());
    });
return this.http.post<any>(AppSettings.multiplefileupload, formData1, { headers: this.headers, withCredentials: true })
  }
  // multiplefileuploadWithASN(formData:FormData){

  //   let urlSearchParams: HttpParams = new HttpParams();
  //   let formData1: FormData = new FormData();
  //   formData.forEach(res => {
  //     formData1.append("files", res);
  //   });
  //   formData1.append('fileType', 'ASN');
  //    return this.http.post<any>(AppSettings.filuploadWithASN, formData1, { headers: this.headers, withCredentials: true })
  // }
  multiplefileuploadWithASN(formData: FormData) {
    const headers = new HttpHeaders();
    // No need to set content type; Angular will set it automatically for multipart/form-data
    return this.http.post<any>(AppSettings.filuploadWithASN, formData, { headers, withCredentials: true });
  }

 


  getwopodetails(invoicenumber){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('invoicenumber',invoicenumber);
   
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.getwopodetails,jsonData,{ headers: this.headers, withCredentials: true })
  }
  
  // fileupload(file, fileName = "") {


  //   let headers1 = new HttpHeaders()
  //     .set('Authorization', this.Authorization)
  //     .set('Authorizationkey', this.Authorizationkey)
  //     .set("Accept", "*/*");

  //   let urlSearchParams: HttpParams = new HttpParams();

  //   let formData: FormData = new FormData();
  //   if (fileName == "") {
  //     formData.append("file", file);
  //   }
  //   else {
  //     formData.append("file", file, fileName);
  //   }
  //   let jsonData = urlSearchParams.toString();
  //   //  let options = new RequestOptions({ headers: headers1, withCredentials: true });
  //   return this.http.post<any>(AppSettings.uploadProductPortfolio, formData, { headers: headers1, withCredentials: true })

  // }
  

  
  setDCNumbers(ponumber, dcn){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
      dcn.forEach(number => {
        urlSearchParams = urlSearchParams.append('dcn', number);
      });
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.senddcn,jsonData,{ headers: this.headers, withCredentials: true })
  }


  readandinsertbulkuploadfile(filename1,username1){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('filename',filename1);
    urlSearchParams=urlSearchParams.append('username',username1);
    
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.readandinsertbulkuploadfile,jsonData,{ headers: this.headers, withCredentials: true })
  }
  poInvoiceSearch(poInvNumber){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('poInvNumber',poInvNumber);
    
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.poInvSearch,jsonData,{ headers: this.headers, withCredentials: true })
  }

  
  getPOformultiple(ponumber,fromdateofduration,todateofduration){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
    urlSearchParams=urlSearchParams.append('fromdateofduration',fromdateofduration);
    urlSearchParams=urlSearchParams.append('todateofduration',todateofduration);
    
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.poInvSearchformultiplpo,jsonData,{ headers: this.headers, withCredentials: true })
  }

  removeEmptyDeliveries(ponumber,DCNumber){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
    DCNumber.forEach(res => {
      urlSearchParams = urlSearchParams.append('dcnumber', res);
    });

    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.deleteemptydeliveries,jsonData,{ headers: this.headers, withCredentials: true })
  
  }

  getinternalpolistdashboardfile(ponumber,status, fromdurationdate, todurationdate, plant, purchasegroup, 
    requisitioneremailid,frompoamount,topoamount, ageingfrom,ageingto, npage,vendor) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('ponumber', ponumber);
    urlSearchParams =  urlSearchParams.append('status', status);
    urlSearchParams =  urlSearchParams.append('fromdurationdate', fromdurationdate);
    urlSearchParams =  urlSearchParams.append('todurationdate', todurationdate);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    urlSearchParams =  urlSearchParams.append('purchasegroup', purchasegroup);
    urlSearchParams =  urlSearchParams.append('requisitioneremailid', requisitioneremailid);
    urlSearchParams =  urlSearchParams.append('frompoamount', frompoamount);
    urlSearchParams =  urlSearchParams.append('topoamount', topoamount);
    urlSearchParams =  urlSearchParams.append('ageingfrom', ageingfrom);
    urlSearchParams =  urlSearchParams.append('ageingto', ageingto);
    urlSearchParams = urlSearchParams.append('vendor', vendor);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.pointernaldashboarddownload, jsonData, { withCredentials: true })
 
  }

  downloadinternalInvoiceData(invnumb,ponum,status,fromduration,toduration,plant,purgroup,reqemailid,frominvoiceamount,toinvoiceamount,
    fromageing,toageing,paginationnumber,vendor){
    let urlSearchParams: HttpParams = new HttpParams();

    urlSearchParams =  urlSearchParams.append('invoicenumber', invnumb);
    urlSearchParams =  urlSearchParams.append('ponumber', ponum);
    urlSearchParams =  urlSearchParams.append('status', status);
    urlSearchParams =  urlSearchParams.append('fromdurationdate', fromduration);
    urlSearchParams =  urlSearchParams.append('todurationdate', toduration);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    urlSearchParams =  urlSearchParams.append('purchasegroup', purgroup);
    urlSearchParams =  urlSearchParams.append('requisitioneremailid', reqemailid);
    urlSearchParams =  urlSearchParams.append('frominvamount', frominvoiceamount);
    urlSearchParams =  urlSearchParams.append('toinvamount', toinvoiceamount);
    urlSearchParams =  urlSearchParams.append('ageingfrom', fromageing);
    urlSearchParams =  urlSearchParams.append('ageingto', toageing);
    urlSearchParams =  urlSearchParams.append('vendor', vendor);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinternaldashboardSearchdata,jsonData,{withCredentials:true})

  } 
  fileupload1(file, fileName = "") {
    let headers3 = new HttpHeaders()
      .set('Authorization', this.Authorization)
      .set('Authorizationkey', this.Authorizationkey)
      .set("Accept", "*/*") 

    let formData: FormData = new FormData();
    if (fileName == "") {
      formData.append("file", file);
    } 
    else {
      formData.append("file", file, fileName);
    }
    return this.http.post<any>(AppSettings.GetDocumentRead, formData, { headers: headers3, withCredentials: true })
  }
  submitDetails(array){
    debugger
    // let urlSearchParams: HttpParams = new HttpParams();
    // array.forEach(feedback => {

    //   urlSearchParams = urlSearchParams.append('feedback', feedback);
    // });
    let headers3 = new HttpHeaders()
      .append('Authorization', this.Authorization)
      .append('Authorizationkey', this.Authorizationkey)
      .append('Content-Type', 'application/json')
      .append("Accept", "application/json");
    console.log("URL", array)
    return this.http.post<any>(AppSettings.submitVendorReg, array, { headers: headers3, withCredentials: true })
  }
  submitAmendmentDetails(array){
    debugger
    // let urlSearchParams: HttpParams = new HttpParams();
    // array.forEach(feedback => {

    //   urlSearchParams = urlSearchParams.append('feedback', feedback);
    // });
    let headers3 = new HttpHeaders()
      .append('Authorization', this.Authorization)
      .append('Authorizationkey', this.Authorizationkey)
      .append('Content-Type', 'application/json')
      .append("Accept", "application/json");
    console.log("URL", array)
    return this.http.post<any>(AppSettings.submitamendment, array, { headers: headers3, withCredentials: true })
  }


  getLocDetails(){
    // let urlSearchParams: HttpParams = new HttpParams();
    // urlSearchParams=urlSearchParams.append('ponumber',ponumber);
    // urlSearchParams=urlSearchParams.append('fromdateofduration',fromdateofduration);
    // urlSearchParams=urlSearchParams.append('todateofduration',todateofduration);
    
    // let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.locDetails,{},{ headers: this.headers, withCredentials: true })
  }


  setAsnDetails(array) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    array.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('feedback', feedback);
    });
    let jsonData = urlSearchParams.toString();
    // let headers2 = new HttpHeaders()
    //   .set('Authorization', this.Authorization)
    //   .set('Authorizationkey', this.Authorizationkey)
    //   .set('Content-Type', 'application/json')
    //   .set("Accept", "*/*");

    let headers2 = new HttpHeaders()
      .append('Authorization', this.Authorization)
      .append('Authorizationkey', this.Authorizationkey)
      .append('Content-Type', 'application/json')
      .append("Accept", "*/*");

    console.log("URL", array)
    return this.http.post<any>(AppSettings.asnDetails, array, { headers: headers2, responseType: "json", withCredentials: true })
  }
  getAccountMaster(data: string): Observable<any> {
  
    let url = '';
    switch (data) {
      case 'accountdetails':
        url = AppSettings.AccountDetails;
        break;
      case 'compnay_code':
        url = AppSettings.CompanyCode;
        break;
        case 'Purch-Group':
          url = AppSettings.purchaseGroup;
          break;
          case 'SchemaGrpVndr':
        url = AppSettings.SchemaGrpVndr;
        break;
        case 'Countrykey':
        url = AppSettings.ConutryKey;
        break;
        case 'typeOfindustr':
        url = AppSettings.industryMaster;
        break;
        case 'BusinessType':
          url = AppSettings.BuisnesTypeMaster;
          break;
        // case 'puchaseORG':
        //   url = AppSettings.purchaseOrg;
        //   break;
        // case "PlantCode":
        //   url = AppSettings.plantCode;
        //   break;
        case 'orderCurrency':
          url=AppSettings.orderCurr;
          break;
        case 'paymentTrms':
          url=AppSettings.paymnetTErms;
          break;
        case 'conf':
          url=AppSettings.Conf;
          break;
        case 'planingrp':
          url=AppSettings.planingrp;
          break
        case 'title':
          url=AppSettings.gettitleMaster;
          break
        case 'softkey':
          
          url=AppSettings.softkey;
          break
        case 'WithTCode':
          url=AppSettings.WithTCode;
          break
      // Add more cases here for other types
      default:
        return throwError('Invalid data type');
    }
    
    return this.http.post<any>(url, ' ', { withCredentials: true }).pipe(
      catchError(err => throwError(console.log(err)) )
    );
  }
  
  GetRigionMAster(data: string, type: string): Observable<any> {
    debugger
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('countryCode',  String(data));
    let jsonData = urlSearchParams.toString();
  
    if (type == null) {
      return forkJoin({
        regionMaster: this.http.post<any>(AppSettings.RegionMaster, jsonData, { withCredentials: true }),
        paymentMaster: this.http.post<any>(AppSettings.paymentMethod, jsonData, { withCredentials: true }),
  
      }).pipe(
        catchError(err => throwError(err))
      );
    }else if(type == 'bank'){
      return forkJoin({
        bankKeyDetails: this.http.post<any>(AppSettings.bankKeyDetails, jsonData, { withCredentials: true }),
        withTtype: this.http.post<any>(AppSettings.WithTtype, jsonData, { withCredentials: true })
      })
      // return this.http.post<any>(AppSettings.bankKeyDetails, jsonData, { withCredentials: true }).pipe(
      //   catchError(err => throwError(err))
      // )
    }
    return forkJoin({
      paymentMaster: this.http.post<any>(AppSettings.paymentMethod, jsonData, { withCredentials: true }),
      // bankKeyDetails: this.http.post<any>(AppSettings.bankKeyDetails, jsonData, { withCredentials: true })
    }).pipe(
      catchError(err => throwError(err))
    );
  }
  getPlantCode (data: string): Observable<any> {
    debugger
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('purchaseCode',  String(data));
    let jsonData = urlSearchParams.toString();
  
    return this.http.post<any>(AppSettings.plantCode, jsonData, { withCredentials: true }).pipe(
            catchError(err => throwError(console.log(err)) )
          );
  }
  getTcode(Tcode: string,cCode:string) {
    debugger
    
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('countryCode',cCode );
    urlSearchParams = urlSearchParams.append('type', Tcode);
    let jsonData = urlSearchParams.toString();
  
    return this.http.post<any>(AppSettings.WithTCode, jsonData, { withCredentials: true }).pipe(catchError(err => throwError(err)));
  
  }
  
  getreccon(data: string): Observable<any> {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('companyCode', data);
    let jsonData = urlSearchParams.toString();
    // return this.http.post<any>(AppSettings.reconAcDetails, jsonData, { withCredentials: true }).pipe( 
    // )
    return forkJoin({
      ReconMAster: this.http.post<any>(AppSettings.reconAcDetails, jsonData, { withCredentials: true }),
      PurchaseOrgMaster: this.http.post<any>(AppSettings.purorgMaster, jsonData, { withCredentials: true }),
    }).pipe(
      catchError(err => throwError(err))
    );
  
  }
  GetPanGstVal(pan,gst){
  
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('panNumber', pan);
    urlSearchParams = urlSearchParams.append('gstNumber', gst);
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.PanGSVal, jsonData , { withCredentials: true }).pipe(
      catchError(err => throwError(console.log(err)) )
    );
  }
  getVendorData(requestID:string): Observable<any> {
    
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('requestId', requestID);
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.GetVendorData, jsonData, { withCredentials: true }).pipe(
      catchError(err => throwError(console.log(err)) )
    );
  }
  submitVendorUPdatedData(array){
    
    // let urlSearchParams: HttpParams = new HttpParams();
    // array.forEach(feedback => {
  
    //   urlSearchParams = urlSearchParams.append('feedback', feedback);
    // });
    let headers3 = new HttpHeaders()
      .append('Authorization', this.Authorization)
      .append('Authorizationkey', this.Authorizationkey)
      .append('Content-Type', 'application/json')
      .append("Accept", "application/json");
    console.log("URL", array)
    return this.http.post<any>(AppSettings.UpdatevendorDataByBuyer, array, { headers: headers3, withCredentials: true })
  }
  
}

