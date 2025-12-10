import { AppSettings } from './../../models/appsetting';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders()
     .set('Accept', 'application/json')

  sendPAN(PAN) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('pan', PAN);
    let jsonData = urlSearchParams?.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.panDetails, jsonData, {withCredentials:true })
  }

  sendOTP(pan,email){
    // console.log("userdata", pan, email)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    urlSearchParams = urlSearchParams.append('pan' , pan)
    let jsonData = urlSearchParams?.toString();
    // console.log("json", jsonData)

    return this.http.post<any>(AppSettings.sendOTP, jsonData, { withCredentials:true})
  }

  signin(email, OTP, bid) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    urlSearchParams = urlSearchParams.append('otp', OTP);
    urlSearchParams = urlSearchParams.append('Bid' , bid)
    let jsonData = urlSearchParams?.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.signIn, jsonData, { observe:'response', withCredentials:true})   
  }
  signininternal(email,otp){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    urlSearchParams = urlSearchParams.append('otp', otp);
    // urlSearchParams = urlSearchParams.append('Bid' , bid)
    let jsonData = urlSearchParams?.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.signininternal, jsonData, { observe:'response', withCredentials:true})

  }

  signonhistory(bid) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('bid', bid);
    urlSearchParams =  urlSearchParams.append('companyCode',sessionStorage.getItem('companyCode'));
    let jsonData = urlSearchParams?.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.signonhistory, jsonData, { observe:'response', withCredentials:true})  
    
  }


  getpgrpclist(email){
    let urlSearchParams: HttpParams = new HttpParams();
    // urlSearchParams = urlSearchParams.append('Bid' ,bid);
    urlSearchParams =  urlSearchParams.append('email', email);
    // urlSearchParams = urlSearchParams.append('Bid',Bid)
    let jsonData = urlSearchParams?.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getpgrpclist, jsonData, { observe:'response', withCredentials:true})  
  }
  
  submitpartnergroup(companycode){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('companyCode', companycode);
    let jsonData = urlSearchParams?.toString();
    return this.http.post<any>(AppSettings.submitpartnergrp, jsonData, { observe:'response', withCredentials:true})  
   }
 

  // getpincodegst(email) {
  //   let urlSearchParams: HttpParams = new HttpParams();
  //   urlSearchParams =  urlSearchParams.append('email', email);
  //   let jsonData = urlSearchParams?.toString();
  //   // console.log("json", jsonData)
  //   return this.http.post<any>(AppSettings.getgstpincode, jsonData, { observe:'response', withCredentials:true})  
    
  // }

  getgst(email,companycode) {
    console.log(companycode);
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('email', email);
    urlSearchParams =  urlSearchParams.append('companyCode', companycode);
    let jsonData = urlSearchParams?.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getgst, jsonData, { observe:'response', withCredentials:true})  
    
  }
  getpincode(gst)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('gst', gst);
    // urlSearchParams =  urlSearchParams.append('companyCode', companycode);
    let jsonData = urlSearchParams?.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getpincode, jsonData, { observe:'response', withCredentials:true})  
   
  }
  
  sendEmail(Email) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('email', Email);
    let jsonData = urlSearchParams?.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.panDetails, jsonData, {withCredentials:true })
  }

  sendEmaildemo(array) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    array.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('feedback', feedback);
    });
    let jsonData = urlSearchParams?.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.panDetailsdemo, array, {withCredentials:true })
  }

  checkemailforinternalportal(email)
  {
    debugger
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    let jsonData = urlSearchParams?.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.verifyinternalportal, jsonData, { observe:'response', withCredentials:true})  
 
  }
  
  checkinternallogin(email)
  {
    debugger
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    let jsonData = urlSearchParams?.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.internalportalLogin, jsonData, { observe:'response', withCredentials:true})  
  }

  getportalType(email)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    let jsonData = '';
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getportalTypeonemail, jsonData, { observe:'response', withCredentials:true})
  }
 vendorlogin(email,type:string,filter){
    debugger
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('emailID', email);
    urlSearchParams =  urlSearchParams.append('status', filter);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    // console.log(AppSettings.VendorLogin)
    if(type=="VendorList"){
      debugger
      return this.http.post<any>(AppSettings.getVendorDetails, jsonData, {withCredentials:true})
    }else{
      return this.http.post<any>(AppSettings.VendorLogin, jsonData, {withCredentials:true})

    }
  }

  internalvendorlogin(email,type:string,filter){
    debugger
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('emailID', email);
    urlSearchParams =  urlSearchParams.append('status', filter);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    // console.log(AppSettings.VendorLogin)
    if(type=="VendorList"){
      debugger
      return this.http.post<any>(AppSettings.getVendorDetails, jsonData, {withCredentials:true})
    }else{
      return this.http.post<any>(AppSettings.VendorLogin, jsonData, {withCredentials:true})

    }
  }

  VendorRegistration(buyerEmail,email,Mob){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('buyerEmailID', buyerEmail);
    urlSearchParams =  urlSearchParams.append('emailID', email);
    urlSearchParams =  urlSearchParams.append('mobileNo', Mob);
    let jsonData = urlSearchParams?.toString();
    return this.http.post<any>(AppSettings.VendorRegistration, jsonData, {withCredentials: true,})
  }

  VendorOTPCheck(email,otp){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('emailID', email);
    urlSearchParams =  urlSearchParams.append('otp', otp);
    let jsonData = urlSearchParams?.toString();
    return this.http.post<any>(AppSettings.VendorOTPCheck, jsonData, {observe: 'response', withCredentials: true,})
  }
   getBigFiveResponse() {
    let urlSearchParams: HttpParams = new HttpParams();
    let jsonData = '';
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getBigFiveResponseData, jsonData, { observe:'response', withCredentials:true})
  }
 getDeptDetails(email) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    let jsonData = '';
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getDeptDetailsData, jsonData, { observe:'response', withCredentials:true})
  } getInvoiceAgeingResponse(deptVal,fromDate,toDate,status) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('deptcode', "All");
    urlSearchParams = urlSearchParams.append('fromDate', fromDate);
    urlSearchParams = urlSearchParams.append('toDate', toDate);
    urlSearchParams = urlSearchParams.append('status', status);
    let jsonData = urlSearchParams.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getInvoiceAgeingResponseData, jsonData, { observe:'response', withCredentials:true})
  }
   getInvoiceSummeryFunctionWise(deptVal,fromDate,toDate) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('deptcode', "All");
    urlSearchParams = urlSearchParams.append('fromDate', fromDate);
    urlSearchParams = urlSearchParams.append('toDate', toDate);
    let jsonData = urlSearchParams.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getInvoiceSummeryFunctionWiseData, jsonData, { observe:'response', withCredentials:true})
  }


  logout()
  { 
    return this.http.post<any>(AppSettings.logout, '', {withCredentials: true})
  }
}
