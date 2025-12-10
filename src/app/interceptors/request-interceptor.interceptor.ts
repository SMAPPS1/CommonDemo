import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {
  Authorization: string;
  Authorizationkey: string;
  counter=0;

  constructor(private router: Router,private authService: AuthService,
    private loaderservice:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    ;
    this.Authorization = sessionStorage.getItem('PROFILE_ACCESS')
    this.Authorizationkey = sessionStorage.getItem('ACCESS_TOKEN')
    console.log("request.url"+request.url);
    if (!request.url.includes("chklogin")  && !request.url.includes("productProfile")
    && !request.url.includes("multiplefileuploads") && !request.url.includes("vendorRegCheck")
  &&!request.url.includes("addtionalfilesUploads") 
    && !request.url.includes("pOSubmitInvoice1") && !request.url.includes("updateacceptedquantity")
    && !request.url.includes("addMultipleManager") &&!request.url.includes("submitVendorReg") 
    && !request.url.includes("submitVendorAmendment") && !request.url.includes("getAccDetails") && !request.url.includes("getcomDetails")&& !request.url.includes("getPurchDetails") && !request.url.includes("getSchemaDetails") && !request.url.includes("getCountryDetails") && !request.url.includes("regCountrydata") && !request.url.includes("vendorRegData") &&!request.url.includes("updateVenData") && !request.url.includes("getTypeBusDetails") && !request.url.includes("getIndustryDetails")
    && !request.url.includes("chkemail") && !request.url.includes("pOCreateDeliverynew")
    && !request.url.includes("vendorOTPCheck") && !request.url.includes("vendorProfile") && !request.url.includes("getVenReqData")
    && !request.url.includes("buyerponinvoicesummery") && !request.url.includes("shortfallcreditadvice") && !request.url.includes("getEnderUserReturn")
    && !request.url.includes("simpoSubmitInvoice") && !request.url.includes("downloadVenfile") && !request.url.includes("faqDetails")) {
    const authReq = request.clone({
      headers: new HttpHeaders()
      .set('Authorization',this.Authorization)
      .set('Authorizationkey',this.Authorizationkey)
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
    // console.log(authReq)
    // return next.handle(authReq);
    // -------------Changed 10-10-2021-------------------------------
    
    return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
  }
  else if ((request.url.includes("pOSubmitInvoice1")) || (request.url.includes("submitVendorReg"))|| (request.url.includes("getAccDetails")) || (request.url.includes("getcomDetails")) || (request.url.includes("getPurchDetails")) ||(request.url.includes("vendorRegData")) || (request.url.includes("updateVenData")) || (request.url.includes("getSchemaDetails")) || (request.url.includes("getCountryDetails")) || (request.url.includes("regCountrydata")) || (request.url.includes("submitVendorAmendment"))|| (request.url.includes("getTypeBusDetails"))|| (request.url.includes("getIndustryDetails")) ||(request.url.includes("getVenReqData")) || 
  (request.url.includes("addMultipleManager") || (request.url.includes("pOCreateDeliverynew")) || (request.url.includes("downloadVenfile"))
  || (request.url.includes("buyerponinvoicesummery")) || (request.url.includes("updateacceptedquantity"))) || (request.url.includes("shortfallcreditadvice")) || (request.url.includes("getEnderUserReturn"))
  || (request.url.includes("simpoSubmitInvoice")) ) {
    
    const authReq = request.clone({
      headers: new HttpHeaders()
      .set('Authorization',this.Authorization)
      .set('Authorizationkey',this.Authorizationkey)
      .set('Content-Type', 'application/json')
    });
    
    return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
  }
  else if(request.url.includes("productProfile") ||  request.url.includes("multiplefileuploads") ||request.url.includes("addtionalfilesUploads") || request.url.includes("vendorProfile") ){
    console.log("in here ==>");
    const authReq = request.clone({
      headers: new HttpHeaders()
      .set('Authorization',this.Authorization)
      .set('Authorizationkey',this.Authorizationkey)
      .set("Accept", "*/*")
    });
    console.log(this.Authorization+","+this.Authorizationkey);
    // return next.handle(authReq);
    // -------------Changed 10-10-2021-------------------------------
    
    return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
    
  }
  else{
    console.log(request)
    return next.handle(request);
  }
  
  }
  

  // Added 10-10-2021------------------
//   private handleAuthError(err: HttpErrorResponse): Observable<any> {
//     
//     //handle your auth error or rethrow
//     console.log("in");
//     if (err.url?.includes("downloadVenfile")) {
//       console.log("Skipping redirection for downloadVenfile API");
//       return throwError(err); // Re-throw the error to let the component handle it
//     }
    
//     if (err.status === 406 || err.status === 401 || err.status === 408) {
//       this.loaderservice.hide();
//       // this.loggedIn.next(false);

//       if(this.counter<1)
//       {
     
//       var sessiontimeout = true;
//       let message = ""
//       var typeOfuser=sessionStorage.getItem('portaltype')
//       if(typeOfuser == 'innerportal' || typeOfuser == 'internalbcclportal' ||
//       typeOfuser == 'innerbuyerportal' || typeOfuser == 'payerportal'){
//       this.router.navigate(['/invalidsession'],{ queryParams: { order: sessiontimeout, errorstatus:  err.status}});
//       this.authService.logout();
//       sessionStorage.removeItem('loginUser');
//       }
//       else{
//         this.router.navigate(['/login'],{ queryParams: { order: sessiontimeout, errorstatus:  err.status}});
//         this.authService.logout();
//         sessionStorage.removeItem('loginUser');
//       }
//         this.counter=1;
//         // this.router.navigate(['./login']);
//         // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
//         return of(err.message); // or EMPTY may be appropriate here
//     }
//     return throwError(err);
//   }
// }
private handleAuthError(err: HttpErrorResponse): Observable<any> {
  
  // Log the error for debugging
  console.log("Error caught in interceptor:", err);

  // Exclude specific APIs like `downloadVenfile` from redirection
  if (err.url?.includes("downloadVenfile")) {
    
    console.log("Skipping redirection for downloadVenfile API");
    return throwError(err); // Re-throw the error to let the component handle it
  }

  // Handle specific error statuses
  if (err.status === 406 || err.status === 401 || err.status === 408) {
    this.loaderservice.hide();

    if (this.counter < 1) {
      
      const sessiontimeout = true;
      const typeOfuser = sessionStorage.getItem('portaltype');
      
      // Redirect based on user type
      if (
        typeOfuser === 'innerportal' ||
        typeOfuser === 'internalbcclportal' ||
        typeOfuser === 'innerbuyerportal' ||
        typeOfuser === 'payerportal'
      ) {
        this.router.navigate(['/invalidsession'], { 
          queryParams: { order: sessiontimeout, errorstatus: err.status } 
        });
        this.authService.logout();
        sessionStorage.removeItem('loginUser');
      } else {
        this.router.navigate(['/login'], { 
          queryParams: { order: sessiontimeout, errorstatus: err.status } 
        });
        this.authService.logout();
        sessionStorage.removeItem('loginUser');
      }

      this.counter = 1;
      return of(err.message); // Stop further error propagation
    }
  }

  // Re-throw the error for other cases
  return throwError(err);
}

}

