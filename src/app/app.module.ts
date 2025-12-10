import { AuthService } from './services/auth/auth.service';
import { RequestInterceptorInterceptor } from './interceptors/request-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { DialogModelComponent } from 'app/components/commoncomponents/dialog-model/dialog-model.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/commoncomponents/components.module';
import { InternalportaltrackinvoicelistComponent } from 'app/components/pagecomponents/internalportal/internalportaltrackinvoicelist/internalportaltrackinvoicelist.component';
import { AppComponent } from './app.component';
// import { NpnSliderModule } from "npn-slider";
// import { CarouselModule } from 'ngx-owl-carousel-o';



import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { InvoiceComponent } from './components/pagecomponents/purchaseorder/invoice/invoice.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { MatNativeDateModule,MAT_DATE_LOCALE } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { InvoiceListComponent } from './components/pagecomponents/trackInvoice/invoicelist/invoicelist.component';
import { PurchaseOrdersListComponent } from './components/pagecomponents/purchaseorder/purchaseorderslist/purchaseorderslist.component';
import { TrackInvoiceComponent } from './components/pagecomponents/trackInvoice/trackinvoice/trackinvoice.component';
import { LoginComponent } from './components/pagecomponents/login/login.component';
import { TrackInvoiceListComponent } from './components/pagecomponents/trackInvoice/trackinvoicelist/trackinvoicelist.component';
import { InvoiceDetailsComponent } from './components/pagecomponents/trackInvoice/invoicedetails/invoicedetails.component';
import { NgxCaptchaModule} from 'ngx-captcha';
import { FourZeroFourComponent } from './components/commoncomponents/fourzerofour/fourzerofour.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileGeneralDataComponent } from './components/pagecomponents/profiledata/profiledata.component';
import { ToastrService,ToastrModule } from 'ngx-toastr';
import { InvoiceListService } from './services/invoiceList/invoice-list.service';
import { InvoiceService } from './services/invoice/invoice.service';
import { LoginService } from './services/login/login.service';
import { ProfileDataService } from './services/profileData/profileData.service';
import { PurchaseOrderListService } from './services/purchaseOrderList/purchaseorderlist.service';
import { AuthGuard } from './guard/auth.guard';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DatePipe , CurrencyPipe} from '@angular/common';
import { SubmitInvoiceComponent } from './components/pagecomponents/trackInvoice/submitinvoice/submitinvoice.component';
import { CreateDeliveryComponent } from './components/pagecomponents/purchaseorder/createdelivery/createdelivery.component';
import { PoOrderDispachedComponent } from './components/pagecomponents/purchaseorder/poorderdispached/purchaseorderdispached.component';
import { PoOrderViewComponent } from './components/pagecomponents/purchaseorder/purchaseorderview/purchaseorderview.component';
import { SortStatusPipe } from './sortstatus.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TwoDigitDecimalNumberDirectiveDirectiveDirective } from './two-digit-decimal-number-directive-directive.directive';
import {ThreeDigitDecimalNumberDirectiveDirectiveDirective} from './three-digit-decimal-number-directive-directive.directive'
import {NumberDirective,CurrencyPipe1} from './Directive/OnlyNumber.directive';
import { TrackOrderListService } from './services/track-order-list.service';
import { LoaderService } from './services/LoaderService/loader.service';
import { LoaderComponent } from './components/commoncomponents/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { DialogModelComponent } from './components/dialogcomponent/dialog-model/dialog-model.component';
import { DialogsModule } from './components/dialogcomponent/dialog-model/dialog.module';
// import { InternalportaldashboardComponent } from 'app/components/pagecomponents/internalportal/internalportaldashboard/internalportaldashboard.component';
import { InvoiceSubmissionComponent } from './components/pagecomponents/invoice-submission/invoice-submission.component';
import { TrackinvoiceWithPOComponent } from './components/pagecomponents/internalportal/trackinvoice-with-po/trackinvoice-with-po.component';
import { InternalTrackInvoiceWithoutPOComponent } from './components/pagecomponents/internalportal/internal-track-invoice-without-po/internal-track-invoice-without-po.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InternalportalTrackPOComponent } from './components/pagecomponents/internalportal/internalportal-track-po/internalportal-track-po.component';
import { InternalportalViewPurchaseorderComponent } from './components/pagecomponents/internalportal/internalportal-view-purchaseorder/internalportal-view-purchaseorder.component';
import { InternalbuyerportaldashboardComponent } from './components/pagecomponents/internalBuyerportal/internalbuyerportaldashboard/internalbuyerportaldashboard.component';
import { VendorListComponent } from './components/pagecomponents/internalBuyerportal/buyerportalvendorlist/vendor-list.component';
import { BuyerpurchaseorderlistComponent } from './components/pagecomponents/internalBuyerportal/buyerPOList/buyerpurchaseorderlist.component';
import { BuyertrackinvoicelistComponent } from './components/pagecomponents/internalBuyerportal/buyertrackinvoicelist/buyertrackinvoicelist.component';
import { InternaltrackinvoicedetailsComponent } from './components/pagecomponents/internalBuyerportal/internaltrackinvoicedetails/internaltrackinvoicedetails.component';
import { InternalpayerportalComponent } from './components/pagecomponents/internalBuyerportal/internalpayerportal/internalpayerportal.component';
import { DashboardComponent } from './components/pagecomponents/dashboard/dashboard.component';
import { NavbarComponent } from './components/commoncomponents/navbar/navbar.component';
import { createCreditNoteComponent } from './components/pagecomponents/trackInvoice/createCreditNote/createCreditNote.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MultiplepoinvoicesubmissionComponent } from './components/pagecomponents/multiplepoinvoicesubmission/multiplepoinvoicesubmission.component';
import { MultiplepoinvoicepurchaseorderslistComponent } from './components/pagecomponents/purchaseorder/multiplepoinvoicepurchaseorderslist/multiplepoinvoicepurchaseorderslist.component';
import { InvalidsessionComponent } from './invalidsession/invalidsession.component';
import { InternalportaldashboardComponent } from './components/pagecomponents/internalportal/internalportaldashboard/internalportaldashboard.component';
import { InvoiceSimpoComponent } from './components/pagecomponents/invoice-simpo/invoice-simpo.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TrackMultiPoComponent } from './components/pagecomponents/track-multi-po/track-multi-po.component';
import { MultiTrackPODEtailsComponent} from './components/pagecomponents/trackInvoice/multi-track-podetails/multi-track-podetails.component'
import { InternalTrackinvoicewithMultiPOComponent } from './components/pagecomponents/internalportal/internal-trackinvoicewith-multi-po/internal-trackinvoicewith-multi-po.component'
import { InternalmultitrackinvoicedetailsComponent } from './components/pagecomponents/internalBuyerportal/internalmultitrackinvoicedetails/internalmultitrackinvoicedetails.component';
import { InvalidinvoiceComponent } from './components/pagecomponents/invalidinvoice/invalidinvoice.component';
import{InternalInvalidInvoiceComponent} from './components/pagecomponents/internalportal/internal-invalid-invoice/internal-invalid-invoice.component';
import { UploadDocumentComponent } from './components/pagecomponents/VendorRegistraion/upload-document/upload-document.component';
import { NewRegistarionComponentComponent } from './components/pagecomponents/VendorRegistraion/new-registarion-component/new-registarion-component.component';
import { VendorLoginComponent } from './components/pagecomponents/VendorRegistraion/vendor-login/vendor-login.component';

import { ViewRegistrationComponent } from './components/pagecomponents/VendorRegistraion/view-registration/view-registration.component';

import { SidebarNewComponent } from './components/commoncomponents/sidebar-new/sidebar-new.component';
import { ClickOutsideDirective } from './Directive/CloseSidebar.directive';
import { AdvanceShippingNotificationComponent } from './components/pagecomponents/advance-shipping-notification/advance-shipping-notification.component';
import { InertnalLoginComponent } from './components/pagecomponents/internalportal/inertnal-login/inertnal-login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdmindashboardComponent } from './components/pagecomponents/admindashboard/admindashboard.component';


@NgModule({
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,	
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatExpansionModule,
    NgxCaptchaModule,
    ChartsModule,
    NgxChartsModule, 
    DialogsModule,
    MatCheckboxModule,
    // CarouselModule ,    
    MatIconModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    Ng2SearchPipeModule,
    NgbModule,
    TooltipModule,
    NgMultiSelectDropDownModule,
    NgSelectModule,
    // NpnSliderModule,
    // NgxDaterangepickerMd.forRoot()
  ],
  declarations: [
    // DialogModelComponent,
    AppComponent,
    AdminLayoutComponent,
    InvoiceComponent,
    InvoiceListComponent,
    PurchaseOrdersListComponent,
    TrackInvoiceComponent,
    LoginComponent,
    TrackInvoiceListComponent,
    InvoiceDetailsComponent,
    FourZeroFourComponent,
    ProfileGeneralDataComponent,
    SubmitInvoiceComponent,
    CreateDeliveryComponent,
    PoOrderDispachedComponent,
    PoOrderViewComponent,
    SortStatusPipe,
    TwoDigitDecimalNumberDirectiveDirectiveDirective,
    ThreeDigitDecimalNumberDirectiveDirectiveDirective,
    NumberDirective,
    CurrencyPipe1,
    LoaderComponent,
    InternalportaldashboardComponent,
    InvoiceSubmissionComponent,
    InternalportaltrackinvoicelistComponent,
    TrackinvoiceWithPOComponent,
    InternalTrackInvoiceWithoutPOComponent,
    InternalportalTrackPOComponent,
    InternalportalViewPurchaseorderComponent,
    InternalbuyerportaldashboardComponent,
    VendorListComponent,
    BuyerpurchaseorderlistComponent,
    BuyertrackinvoicelistComponent,
    InternaltrackinvoicedetailsComponent,
    InternalpayerportalComponent,
    DashboardComponent,
    NavbarComponent,
    createCreditNoteComponent,
    MultiplepoinvoicesubmissionComponent,
    MultiplepoinvoicepurchaseorderslistComponent,
    InvalidsessionComponent,
    InvoiceSimpoComponent,
    TrackMultiPoComponent,
    MultiTrackPODEtailsComponent,
    InternalTrackinvoicewithMultiPOComponent,
    InternalmultitrackinvoicedetailsComponent,
    InvalidinvoiceComponent,
    InternalInvalidInvoiceComponent,
    UploadDocumentComponent,
    NewRegistarionComponentComponent,
    ViewRegistrationComponent,

    VendorLoginComponent,
    SidebarNewComponent,
    ClickOutsideDirective,
    AdvanceShippingNotificationComponent,
    InertnalLoginComponent,
    AdmindashboardComponent
    
  ],
  exports:[
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    NavbarComponent,
    SidebarNewComponent
  ],
  providers: [
    AuthGuard,
    ChartsModule,
    MatDatepickerModule,
    {provide:HTTP_INTERCEPTORS , useClass:RequestInterceptorInterceptor, multi:true},
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    ToastrService,
    PurchaseOrderListService,
    ProfileDataService,
    LoginService,
    InvoiceListService,
    InvoiceService,
    TrackOrderListService,
    AuthService,
    LoaderService,
    DatePipe,
    CurrencyPipe
  ],
  bootstrap: [AppComponent],
  // entryComponents: [DialogModelComponent]
 
})
export class AppModule { }
