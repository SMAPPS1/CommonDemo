import { AuthService } from './../../../services/auth/auth.service';
import { AuthGuard } from './../../../guard/auth.guard';
import { ProfileDataService } from '../../../services/profileData/profileData.service';
import { Component, OnInit, ElementRef, ViewChild,Inject, OnDestroy } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay  } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { LoginService } from 'app/services/login/login.service';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileGeneralDataComponent } from 'app/components/pagecomponents/profiledata/profiledata.component';
import * as data from 'assets/configdata/appconfig.json'
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import {Title} from "@angular/platform-browser";
import { PurchaseOrderListService } from "../../../services/purchaseOrderList/purchaseorderlist.service";
import { TrackOrderListService } from "app/services/trackOrderList/trackorderlist";
import { InternalportalserviceService } from 'app/services/internalportal/internalportalservice.service';
import { SearchDataService } from 'app/services/search-data.service';
import { DatePipe } from "@angular/common";
import { DOCUMENT } from '@angular/common';
import  { dashboardURL } from '../../../../assets/configdata/appconfig.json';
import { log } from 'console';
import { SidebarService } from 'app/services/sidebarService/sidebar.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar-new.component.html',
    styleUrls: ['./navbar-new.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
    @ViewChild(ProfileGeneralDataComponent) profilegeneraldata: ProfileGeneralDataComponent;
    @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
    // headerDisplay = require('assets/configdata/appconfig.json').headerDisplay;
    headerDisplay=data.headerDisplay
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    isLoggedin: boolean = false;
    isLoggedIn$: Observable<boolean>;
    url: string;
    showStatus: boolean = true;
    email: string;
    userName: string;
    gstpincodevalues: any = [];
    gstarr: any = [];
    gstpinlist: any = [];
    commonfilter: any = {};
    isbuyer: boolean = false;
    isenduser: boolean = false;
    ispayee: boolean = false;
    InvoiceItemCount :number=0;
    InvoiceItemCountinvalid :number =0;

    currentDate = new Date();

    dropdownVisible: boolean = false;

    isSidebarOpen = false;
    // public myProfileForm = new FormGroup({
    //     gst: new FormControl(''),
    //     pin: new FormControl('')

    // });
    public loginForm = new FormGroup({
        // PAN: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
        // OTP: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]),
        Email: new FormControl(''),
        // recaptcha: new FormControl('', Validators.required)
    
      })

    public POOrderList = new FormGroup({
        gst: new FormControl('', [Validators.required]),
        pincode: new FormControl('', [Validators.required]),
        companyCode :new FormControl('',[Validators.required])

    });
    poDataList: any = [];
    pinlist: any;
    changed: boolean = false;
    differentbid: boolean = false;
    pinlist1: any;
    switched: boolean = false;
    bussinesspartnertext: string;
    innerportal: boolean=false;
    innerbuyerportal: boolean = false;
    forinternal: string;
    username: any;
    vendorPortal: boolean = false;
    internalbcclportal: boolean =false;
    functionaldirector: boolean =false;
    ftype: string;
    todaysDate=new Date();
    type: string;
    sessiontimeout: boolean;
    poReadstatusList: any = [];
    searchInvList: any = [];
    invoiceData1: any = [];
    processedinvList: any = [];
    poItemCount: number = 0;
    allPOlist: any;
    acceptedPOList: any;
    inProgressPOList: any;
    completedPOList: any;
    shippedPOList: any;
    searchList: any[];
    totalItems: any;
    filterpodatalist: any;
    statusList: any;
    equalfound: boolean = false;
    // poDataList: any = [];
    invoiceDataList: any = [];
    searchKey: string = "";
    access_key:any;
    profile_access:any;
    hideNavbar:boolean = false;
    poItemCount1: number = 0;
    currcity: string;
    partnergroup:any;
    // companyCode:string;
    // gst: string;
    // pincode: string;
    tempCompanyName:string;
    tempCompanyCode:string;
    tempGST:string;
    tempPincode: string;
    bid: string;
    currgst:string;
    currpincode:string;
    companyApiRes: any;
    gstApiRes: any;
    pincodeApiRes: any;
    enableGo: boolean=false;
    disableBtn: boolean=false;
    private sideBarSubscription: Subscription;
    isMobile: boolean = false;



    constructor(location: Location, private element: ElementRef, private router: Router,
        private loginService: LoginService,    private TrackOrderListService: TrackOrderListService,
        private purchaseOrderListService: PurchaseOrderListService,
        private loaderservice: LoaderService, private profileService: ProfileDataService, private authService: AuthService, private InternalportalserviceService :InternalportalserviceService,
        private titleService:Title,  public datepipe: DatePipe,
        private SearchDataService: SearchDataService,@Inject(DOCUMENT) private document: Document,
        private sidebarService: SidebarService ) {
        this.location = location;
        this.sidebarVisible = false;

        this.sideBarSubscription =  this.sidebarService.sidebarState$.subscribe(state => {
            this.isSidebarOpen = state;
          });

    }

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
        this.sidebarService.toggleSidebar();
    }

    hideseachbox(){
      document.getElementById("searchdiv").style.display = "none"
    }

    hideseachbox1(){
      document.getElementById("searchdiv").style.display = "none"
    }

    hideseachbox2(){
      document.getElementById("searchdiv").style.display = "none"
    }

    ngOnInit() {
         // const userAgent = navigator.userAgent || navigator.vendor;

  const userAgent = navigator.userAgent.toLowerCase();

// --- Device type detection ---
const isAndroid = /android/.test(userAgent);
const isIPhone = /iphone/.test(userAgent);
const isIPad = /ipad/.test(userAgent) || 
               (/macintosh/.test(userAgent) && 'ontouchend' in document); // handles iPadOS (which reports as Mac)
const isTablet = (isAndroid && !/mobile/.test(userAgent)) || isIPad;

// ✅ True only for mobile phones (not tablets or iPads)
const isMobile = ((isAndroid && /mobile/.test(userAgent)) || isIPhone) && window.innerWidth < 768;

console.log('Device info =>', { isMobile, isTablet, width: window.innerWidth });

this.isMobile = isMobile;

        debugger
        this.username = sessionStorage.getItem('username')
        this.type = sessionStorage.getItem("portaltype");
        var ftype = sessionStorage.getItem('portalAccessType');

        if(this.type == 'innerbuyerportal')
        {   
            debugger
            this.getinternalinvalid();
            this.POcountforInternal();
            this.isenduser=true;
        }
        else if(this.type == 'innerportal')
        { 
            debugger
            this.getinternalinvalid();
            this.POcountforInternal();
            this.isenduser=false;
        }
        else if(this.type == 'payerportal')
        {
            debugger
            this.getinternalinvalid();
            this.POcountforInternal();
            this.ispayee=true;
            sessionStorage.setItem('ispayee', this.ispayee?.toString())
        }

        else if(this.type == 'vendorportal')
        {   
            debugger 
            this.getinvalid();
            this.POcount();
            this.tempCompanyName = sessionStorage.getItem('companyName');
            this.tempCompanyCode = sessionStorage.getItem('companyCode');
            this.refresh();
            this.vendorPortal=true;
            this.sidebarService.VendorLogin(this.vendorPortal);
        }
        else if(this.type =='internalbcclportal')
        {
            debugger
            this.getinternalinvalid();
            this.POcountforInternal();
            this.internalbcclportal=true;
            sessionStorage.setItem('internalbcclportal', this.internalbcclportal?.toString())
        }
        // else if(this.type =='vendorportal')
        // {  
        //      this.getinvalid();
        //     this.POcount();
        //     this.getlistpatnergrpcompnydetails();
        //     // this.getGrpCompany();
        //     this.getpincode();
        //     this.getgst();
        //     this.currcompanyName = sessionStorage.getItem('companyName');
            

        //     this.vendorPortal=true;
        //     console.log(this.vendorPortal,'this.vendorPortal vendorPortal')
        //     this.purchaseOrderListService.getPO('1','ALL',"NA","NA","NA","NA","NA","NA").subscribe(res => {

        //         if(res[0].message != "No Data Found for given Vendor Id" ){
        //             console.log("Data", res[0].poData);
        //             this.poDataList = res[0].poData;
        //         }
        //         for(var i=0; i < this.poDataList.length;i++)
        //         { if(this.poDataList[i]['STATUS']=='N')
        //         {
        //           this.poItemCount = this.poItemCount + 1;
        //         }
        //         var poFormatDate =  this.poDataList[i].DATE;
        //               poFormatDate.replace(' ', 'T')
        //               this.poDataList[i].DATE = poFormatDate;
        //               this.poDataList[i].DATE = this.datepipe.transform(this.poDataList[i].DATE, "dd-MMM-yyyy");
                 
        
        //     }
        //     });
        // }
        
        if(ftype == 'functional')
         {
            this.functionaldirector = true;
            this.sidebarService.functionaldirector(this.functionaldirector);
            this.hideNavbar = true;
            sessionStorage.setItem('hideNavbar', this.hideNavbar?.toString())
            sessionStorage.setItem('portalAccessType','functional');
        }

        this.url = this.router.url;
        this.authService.getNotifier().subscribe(res => {
            //console.log("Notifier response", res)
            this.showStatus = res.inlogin
        })

        this.getloggedinUser();
        if(sessionStorage.getItem("loginUser") != null){  
            //this.refresh();    
        }

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });

        //Hide Navbar elements if not logged in 
        this.isLoggedIn$ = this.authService.isLoggedin;
       
        //  console.log(this.isLoggedIn$)
        window.addEventListener('popstate', function (event) {
            if (window.location.href.includes('/login')) {
                // Log the state data to the console
                sessionStorage.clear();
                window.location.reload();
            }
            //console.log(event.state);
        });
    }

    refresh() {
        this.currcity = sessionStorage.getItem('city');
        this.bid = sessionStorage.getItem('tmpBid');
        debugger
        this.bussinesspartnertext = sessionStorage.getItem('Bussinesspartnertext');

        this.tempCompanyName = sessionStorage.getItem('companyName');
        this.tempCompanyCode = sessionStorage.getItem('companyCode');
        sessionStorage.setItem('tempCompanyName',this.tempCompanyName);
        sessionStorage.setItem('tempCompanyCode',this.tempCompanyCode);
        sessionStorage.setItem('tmpBid',sessionStorage.getItem('Bid'));
        this.currgst = sessionStorage.getItem('currgst');
        

        var email = sessionStorage.getItem('loginUser');
        setTimeout(() => {
            this.setCompanyCode(this.tempCompanyName, this.tempCompanyCode);
            this.setGST();
        },100)

        setTimeout(() => {
            this.setPincode();
            this.enableGo=true
        },1000)  

    }
    
    setCompanyCode(cmpName,cmpCode) {
        var email = sessionStorage.getItem('loginUser');
        
        this.loginService.getpgrpclist(email).subscribe(res => {
            this.partnergroup = res.body[0].partnerGroups;
            
            if( this.tempCompanyName == null || this.tempCompanyCode == null ){    
                sessionStorage.setItem('tempCompanyName',this.tempCompanyName);
                sessionStorage.setItem('tempCompanyCode',this.tempCompanyCode);
                this.tempCompanyName = sessionStorage.getItem('tempCompanyName');
                this.tempCompanyCode = sessionStorage.getItem('tempCompanyCode');
            }else{
                sessionStorage.setItem('companyName',cmpName);
                sessionStorage.setItem('companyCode',cmpCode);
            }
        })
      
    }

    setGST() {       
        var email = sessionStorage.getItem('loginUser');
        this.tempCompanyCode = sessionStorage.getItem('tempCompanyCode');
        this.currgst = sessionStorage.getItem('tempGST');
        
        this.loginService.getgst(email,this.tempCompanyCode).subscribe(res => {
            if (res.body[0].message == "Success") {
                this.gstpinlist = res.body[0].poData;
                
                if( this.currgst == null ){
                    this.currgst = this.gstpinlist[0].ATTRIBUTEVALUE;
                    sessionStorage.setItem('currgst',this.currgst);
                    this.tempGST = this.currgst;
                    sessionStorage.setItem('tempGST',this.currgst);
                }else{
                    //this.currgst = sessionStorage.getItem('tempGST');
                    this.tempGST = sessionStorage.getItem('tempGST');
                    sessionStorage.setItem('tempGST',this.tempGST);
                }
            }
        });
        
    }

    setPincode() { 
        this.tempGST = sessionStorage.getItem('tempGST');
        this.currpincode = sessionStorage.getItem('tempPincode');

        this.loginService.getpincode(this.tempGST).subscribe(res => {
            if (res.body[0].message == "Success") {
                this.pinlist1 = res.body[0].poData;

                if (this.currpincode == null) {
                    this.currpincode = this.pinlist1[0].PINCODE;
                    sessionStorage.setItem('currpincode',this.currpincode);
                    this.tempPincode = this.currpincode;
                    sessionStorage.setItem('tempPincode',this.currpincode);
                    this.currcity = this.pinlist1[0].CITY;
                    sessionStorage.setItem('tmpBid',this.pinlist1[0].BUSINESSPARTNEROID);
                    this.bid = this.pinlist1[0].BUSINESSPARTNEROID;
                }else {
                    this.currpincode = sessionStorage.getItem('tempPincode');
                    sessionStorage.setItem('currpincode',this.currpincode);
                    this.tempPincode = sessionStorage.getItem('currpincode');
                }
            }

        });

    }

    OnSelChangeCompanyCode(event: any){
        this.disableBtn=false
        this.tempCompanyCode = this.POOrderList.controls['companyCode'].value;
        this.tempCompanyName = event.target['options'][event.target['options'].selectedIndex].text;
        sessionStorage.setItem('tempCompanyName',this.tempCompanyName);
        sessionStorage.setItem('tempCompanyCode',this.tempCompanyCode);

        setTimeout(() => {
            this.setTempGST();
        },10)

        setTimeout(() => {
            this.setTempPincode();
            this.disableBtn=true
        },1000) 
    }
    
    OnSelChangeGST(){
        this.disableBtn=false
        this.tempGST = this.POOrderList.controls['gst'].value;
        sessionStorage.setItem('tempGST',this.tempGST);

        setTimeout(() => {
            this.setTempPincode();
            this.disableBtn=true
        },1000) 
    }

    OnSelChangePincode(event: any){
        this.bid = this.POOrderList.controls['pincode'].value;
        sessionStorage.setItem('tmpBid',this.bid);
        this.tempPincode = event.target['options'][event.target['options'].selectedIndex].text;
        sessionStorage.setItem('tempPincode',this.tempPincode);
        this.disableBtn=true
    }

    getGSTVal(arrlist,Val) {
        var res;
        for (var a = 0; a < arrlist.length; a++) {
            if (arrlist[a].ATTRIBUTEVALUE == Val) {
                res = arrlist[a].ATTRIBUTEVALUE;
            }
        }
        return res;
    }

    getPincodeVal(arrlist,Val) {
        var res;
        for (var a = 0; a < arrlist.length; a++) {
            if (arrlist[a].PINCODE == Val) {
                res = arrlist[a].PINCODE;
            }
        }
        return res;
    }

    setTempGST(){
        var email = sessionStorage.getItem('loginUser');
        this.tempCompanyCode = sessionStorage.getItem('tempCompanyCode');
        this.currgst = sessionStorage.getItem('currgst');

        this.loginService.getgst(email,this.tempCompanyCode).subscribe(res => {
            if (res.body[0].message == "Success") {
                this.gstpinlist = res.body[0].poData;

                var val = this.getGSTVal(this.gstpinlist,this.currgst);
                if( val == undefined ){
                    this.tempGST = this.gstpinlist[0].ATTRIBUTEVALUE;
                    sessionStorage.setItem('tempGST',this.tempGST);
                }else {
                    this.currgst = sessionStorage.getItem('currgst');
                    this.tempGST = this.currgst;
                    sessionStorage.setItem('tempGST',this.currgst);
                }
            }
        });

    }

    setTempPincode(){
        this.tempGST = sessionStorage.getItem('tempGST');
        this.currpincode = sessionStorage.getItem('currpincode');
        
        this.loginService.getpincode(this.tempGST).subscribe(res => {
            if (res.body[0].message == "Success") {
                this.pinlist1 = res.body[0].poData;

                var val = this.getPincodeVal(this.pinlist1,this.currpincode);

                if( val == undefined ){
                    this.tempPincode = this.pinlist1[0].PINCODE;
                    sessionStorage.setItem('tempPincode',this.tempPincode);
                    this.currcity = this.pinlist1[0].CITY;
                    sessionStorage.setItem("city", this.currcity);
                    sessionStorage.setItem('tmpBid',this.pinlist1[0].BUSINESSPARTNEROID);
                    this.bid = this.pinlist1[0].BUSINESSPARTNEROID;
                }else {
                   this.currpincode = sessionStorage.getItem('currpincode');
                    this.tempPincode = this.currpincode;
                    sessionStorage.setItem('tempPincode',this.currpincode);
                    this.currcity = this.pinlist1[0].CITY;
                    sessionStorage.setItem("city", this.currcity);
                    sessionStorage.setItem('tmpBid',this.pinlist1[0].BUSINESSPARTNEROID);
                    this.bid = this.pinlist1[0].BUSINESSPARTNEROID;
                }


            }
        });
        
    }

    getAllOtherPageData() {
        this.tempCompanyName = sessionStorage.getItem('tempCompanyName');
        this.tempCompanyCode = sessionStorage.getItem('tempCompanyCode');
        this.currcity = sessionStorage.getItem('city');
        sessionStorage.setItem('companyName',this.tempCompanyName);
        sessionStorage.setItem('companyCode',this.tempCompanyCode);
        sessionStorage.setItem("city", this.currcity);
        sessionStorage.setItem('tmpBid',this.POOrderList.controls['pincode'].value);
        sessionStorage.setItem("Bid", this.POOrderList.controls['pincode'].value);
        sessionStorage.setItem("currgst", sessionStorage.getItem('tempGST'));
        sessionStorage.setItem("currpincode",sessionStorage.getItem('tempPincode'));
		
        this.loginService.signonhistory(this.bid).subscribe(res => {
			if(res.body[0].message == "Success"){
				const accessKey = res.headers.get('Authorizationkey');
				const profileAccesKey = res.headers.get('Authorization');
                debugger
				sessionStorage.setItem("Bussinesspartnertext", res.body[0].Bussinesspartnertext);

				if (res.body[0].message == "Success") {

					if (res != null || res != undefined) {

						if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
							sessionStorage.setItem('ACCESS_TOKEN', accessKey);
							sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);

							this.authService.login()
							this.loaderservice.show();

							setTimeout(() => {
								this.router.navigate(['/dashboard']).then(() => {
									window.location.reload();
								});
							}, 200);

							this.loaderservice.hide();
					 
						}
					}
				}

			}


			let c = sessionStorage.getItem('companyCode')

			for(var i =0; i<this.partnergroup.length;i++){
			  if(c == this.partnergroup[i].COMPANYCODE){
				sessionStorage.setItem('companyName',this.partnergroup[i].COMPANYNAME);
			  }
			}
			
			this.loginService.submitpartnergroup(sessionStorage.getItem('companyCode')).subscribe(res => {
			  if(res.body[0].message == "Success"){
				this.loaderservice.show()
				setTimeout(() => {
					this.router.navigate(['/dashboard']).then(() => {
					  window.location.reload();
					});
				}, 200);
	  
				this.loaderservice.hide()
			  }
			})
        });
    }


    POcount(){
        this.purchaseOrderListService.getPO('1','ALL',"NA","NA","NA","NA","NA","NA").subscribe(res => {
            if(res[0].message != "No Data Found for given Vendor Id" ){
                console.log("Data", res[0].poData);
                this.poDataList = res[0].poData;
                this.poItemCount = res[0].poCountAsPerStatus.N;         
            }  
        }); 
    }

    POcountforInternal(){
        let a = sessionStorage.getItem("username");
        this.email = a;
        // alert(this.email)
        console.log(this.vendorPortal,'this.vendorPortal vendorPortal')
        this.InternalportalserviceService.getInternalPoData(this.email,'ALL','1',"NA","NA","NA","NA","NA","NA","NA").subscribe(res => {

            if(res[0].message != "No Data Found for given Vendor Id" ){
                console.log("Data", res[0].poData);
                this.poDataList = res[0].poData;
                this.poItemCount1 = res[0].poCountAsPerStatus.N;         
            }
            
        }); 

    }
        
    goToUrl() {
        var urldata = btoa(this.username);
        this.document.location.href = dashboardURL+'/#/dashboard?key='+urldata;
    }

    onSearchChange(searchValue: string): void {
        //console.log(searchValue);
        this.searchKey = searchValue;
        this.SearchDataService.searchKey = searchValue;
        //console.log(this.searchKey);
    }

    getinvalid(){
        this.purchaseOrderListService.getInvalidInvoiceCount().subscribe(res =>{        
        this.InvoiceItemCount =res[0].invalidInvoiceCount.INV;
        console.log(this.InvoiceItemCount)
        // this.InvaliinvoiceData = res[0].InvalidInvoiceCount.R; 
        })
    }
      
    getinternalinvalid(){
        debugger
        this.InternalportalserviceService.getinternalinvalidcount().subscribe(res =>{
        this.InvoiceItemCountinvalid =res[0].invalidInvoiceCount.INV;
        console.log(res[0].invalidInvoiceCount.INV)
        })
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            // toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');
        this.sidebarVisible = true;
    };
    
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        // this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return '';
    }
            
    //   searchData(searchvalue) {
    //     console.log(">>>>>>>>>>>>>>>> searchData", searchvalue);
    //     this.poDataList = [];
    //     this.invoiceDataList = [];
    //     this.loaderservice.show();
    //     console.log("########### searchvalue #######", searchvalue);
    //     if (searchvalue == "") {
    //       this.SearchDataService.getPurChaseOrderList();
    //       this.SearchDataService.getinvoiceDataList();
    //     }

    
    //     if (searchvalue != undefined || searchvalue == "") {
    //       console.log(">>>>>>>>>> something in value", searchvalue);
    //       this.purchaseOrderListService
    //         .poInvoiceSearch(searchvalue.trim())
    //         .subscribe((res) => {
    //           console.log("$$$$$ res", res);
            
            
    
    //           if (res[0].poData.length > 0) {
    //             this.poDataList = res[0].poData;
    //             console.log("gaurav",this.poDataList);
    //             this.SearchDataService.setSearchData(this.poDataList);
        
    //           }
    //           if (res[0].invData.length > 0) {
    //             this.invoiceDataList = res[0].invData;
    //             console.log("invData",this.invoiceDataList);
    //             this.SearchDataService.setInvSearchData(this.invoiceDataList);
    //           }
    //         });
    //       this.loaderservice.hide();
    //       setTimeout(() => {
    //         this.loaderservice.show();
    //         for (var k = 0; k < this.poDataList.length; k++) {
    //           console.log("this.statusList.length " + this.poReadstatusList);
    //           if (this.poReadstatusList.length != 0) {
    //             for (var j = 0; j < this.poReadstatusList.length; j++) {
    //               if (
    //                 this.poReadstatusList[j]["STATUS"] == "A" &&
    //                 this.poReadstatusList[j]["PONUMBER"] ==
    //                   this.poDataList[k]["PO_NUMBER"]
    //               ) {
    //                 $("#msg1ID" + k).addClass("displayBlock");
    //                 $("#msgID" + k).addClass("displayNone");
    //               } else {
    //                 //$("#msg1ID" + k).addClass('displayNone');
    //                 $("#msgID" + k).addClass("displayBlock");
    //               }
    //             }
    //           } else {
    //             $("#msgID" + k).addClass("displayBlock");
    //           }
    //         }
            
    //         if(this.invoiceDataList == "" ){
    //           $("#shdata").addClass("displayBlock");
    //         } else {
    //           $("#shdata").addClass("displayNone");
    //         }
        
    //         this.loaderservice.hide();
    //       }, 1000);
    //       this.loaderservice.show();
    
        
    //     } else if (searchvalue == " " || searchvalue == undefined) {
    //       this.SearchDataService.getPurChaseOrderList();
    //       this.SearchDataService.getinvoiceDataList();
    //     }
    //   }
    
    //   getalldata(searchKey) {
    //     console.log("getalldata searchKey", searchKey);
    //     this.searchKey = searchKey;
    //     this.SearchDataService.searchKey = searchKey;
    //     if (searchKey == "") {
    //       this.SearchDataService.getPurChaseOrderList();
    //       this.SearchDataService.getinvoiceDataList();
    //     }
    //   }

    logOut() {
        this.loginService.logout().subscribe(res => {
            if (res[0].data == 'true') {
                // this.titleService.setTitle("K12 BusinessConnect");
this.titleService.setTitle(" VIMA ");
                var typeOfuser=sessionStorage.getItem('portaltype')
                if(typeOfuser == 'innerportal' || typeOfuser == 'internalbcclportal' ||
                typeOfuser == 'innerbuyerportal' || typeOfuser == 'payerportal'){
                this.router.navigate(['/invalidsession'], { queryParams: { order: btoa("true") } }).then(()=>{
                this.authService.logout();
                sessionStorage.removeItem('loginUser');
                // window.location.reload();
            });
            }
            else{
                this.router.navigate(['/login']).then(()=>{
                this.authService.logout();
                sessionStorage.removeItem('loginUser');
                // window.location.reload();
            });
            }
                
            }

        });
        
    }

    UploadDocument(){
        // debugger

 
        this.router.navigate(['/NewRegistration'])
    }
        
    editProfile() {
        // let LoginUser= sessionStorage.getItem("PAN")
        // location.reload();
        this.router.navigate(['/profileGeneralData']);
    }

    getloggedinUser() {
        console.log(sessionStorage.getItem("loginUser"));
        if(sessionStorage.getItem("loginUser") !=null)
        {
            this.email = sessionStorage.getItem("loginUser");
            this.userName = this.email.substring(0, this.email.lastIndexOf("@"));
    
            console.log("LoginUser", this.userName);   // john.doe
        }
        
    }

    // getgstpincodevalues() {
    //     this.gstpincodevalues = [
    //         { bid: '1', value: '421202' },
    //         { bid: '1', value: '421201' }
    //     ]
    // }

    // getuserProfile() {
    //     try {
    //         this.profileService.getProfile().subscribe(response => {
    //             console.log("profileDetails", response[0])
    //             if (response) {
    //                 sessionStorage.setItem('GST', response[0].bankingData[0].GST_REGN);
    //                 sessionStorage.setItem('PINCODE', response[0].generalData[0].POSTAL_CODE);

    //                 this.gst = response[0].bankingData[0].GST_REGN;
    //                 this.pincode = response[0].generalData[0].POSTAL_CODE;
    //             }


    //         })
    //     } catch (Error) {
    //         console.error("error in getDetails", Error);
    //     }

    // }

    getvalues(event) {
        this.changed = true;
    }

    // navigatetointernalportal() {
    //     debugger
    //     this.loginService.logout().subscribe(res => {
    //         console.log("response is here ==> " + res);
    //         if (res[0].data == 'true') {
    //             this.authService.logout();
    //             this.loginService.checkemailforinternalportal(this.loginForm.controls['Email'].value).subscribe(res => {
    //                 if (res.body[0].status == "Success") {
    //                     const accessKey = res.headers.get('Authorizationkey');
    //                     const profileAccesKey = res.headers.get('Authorization');

    //                     console.log("this.loginForm.controls['Email'].value" + this.loginForm.controls['Email'].value);
    //                     this.forinternal = this.loginForm.controls['Email'].value;
    //                     this.username = this.loginForm.controls['Email'].value;
                       
    //                     if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
    //                         sessionStorage.setItem('ACCESS_TOKEN', accessKey);
    //                         sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
    //                         sessionStorage.setItem('username', this.username);
    
    //                         this.authService.login();
    //                         // this.getPortalTypebasedonemail(this.username);
    //                         this.loaderservice.show()
    //                         this.loaderservice.hide();
    //                     }
    //                 }

    //             });

    //         }

    //     });

    // }

    getPortalTypebasedonemail(userName) {
        debugger
        this.loginService.getportalType(userName).subscribe(res => {
        if (res.body.length>0) {
        
            if(res.body[0].mode == 'buyer'){
                this.isbuyer=true;
                this.isenduser=true;
                sessionStorage.setItem("portaltype","innerbuyerportal");
                this.innerbuyerportal = true;
                this.vendorPortal=false;
                this.sidebarService.VendorLogin(this.vendorPortal);
                this.innerportal=false;
                this.ispayee=false
                sessionStorage.setItem('ispayee', this.ispayee?.toString())
                if(res.body[0].functionalDirector == 'PRESENT') {
                    this.functionaldirector=true;
                    this.sidebarService.functionaldirector(this.functionaldirector);
                    this.hideNavbar = true;
                    sessionStorage.setItem('hideNavbar', this.hideNavbar?.toString())
                    sessionStorage.setItem('portalAccessType','functional');
                }
                setTimeout(() => {
                    this.router.navigate(['/internalTrackPO'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                        // window.location.reload();
                    });
                }, 200);
                // this.router.navigate(['/internalportal']);
                console.log(this.innerbuyerportal,'this.innerbuyerportal isbuyer' )
                console.log(this.vendorPortal,'this.vendorPortal isbuyer')
                console.log(this.innerportal,'this.innerportal isbuyer')
            }
            else if((res.body[0].mode == 'enduser') || (res.body[0].mode == 'internalbcclportal'))
            {   
                if(res.body[0].functionalDirector == 'PRESENT') {
                    this.functionaldirector=true;
                    this.sidebarService.functionaldirector(this.functionaldirector);
                    this.hideNavbar = true;
                    sessionStorage.setItem('hideNavbar', this.hideNavbar?.toString())
                    sessionStorage.setItem('portalAccessType','functional');
                }
                if(res.body[0].mode == 'internalbcclportal'){
                    this.internalbcclportal=true;
                    sessionStorage.setItem('internalbcclportal', this.internalbcclportal?.toString())
                    sessionStorage.setItem("portaltype","internalbcclportal");
                }
                else{
                    this.internalbcclportal=false;
                    sessionStorage.setItem('internalbcclportal', this.internalbcclportal?.toString())
                    sessionStorage.setItem("portaltype","innerportal");
                }
                this.isenduser=false;
            debugger
                this.innerportal=true;
                this.vendorPortal=false;
                this.sidebarService.VendorLogin(this.vendorPortal);
                this.innerbuyerportal = false;
                this.ispayee=false
                sessionStorage.setItem('ispayee', this.ispayee?.toString())
                setTimeout(() => {
                    if(res.body[0].functionalDirector == 'PRESENT') {
                        this.functionaldirector=true;
                        this.sidebarService.functionaldirector(this.functionaldirector);
                        this.hideNavbar = true;
                        sessionStorage.setItem('hideNavbar', this.hideNavbar?.toString())
                        sessionStorage.setItem('portalAccessType','functional');
                    }
                    if((res.body[0].mode == 'enduser'))
                    {
                        debugger
                        this.router.navigate(['/internalTrackPO'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                            // window.location.reload();
                        });
                    }
                    else if(res.body[0].mode == 'internalbcclportal'){
                        this.router.navigate(['/internaltrackInvoiceList'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                            // window.location.reload();
                        });
                    }
                
                    
                }, 200);
                // this.router.navigate(['/internalBuyerportal']);
                console.log(this.innerbuyerportal,'this.innerbuyerportal isenduser')
                console.log(this.vendorPortal,'this.vendorPortal isenduser')
                console.log(this.innerportal,'this.innerportal isenduser')
            }
            else if(res.body[0].mode == 'payer')
            {
                sessionStorage.setItem("portaltype","payerportal");
                this.isenduser=false;
                this.innerportal=false;
                this.vendorPortal=false;
                this.sidebarService.VendorLogin(this.vendorPortal);
                this.ispayee=true;
                sessionStorage.setItem('ispayee', this.ispayee?.toString())
                if(res.body[0].functionalDirector == 'PRESENT') {
                    this.functionaldirector=true;
                    this.sidebarService.functionaldirector(this.functionaldirector);
                    this.hideNavbar = true;
                    sessionStorage.setItem('hideNavbar', this.hideNavbar?.toString())
                    sessionStorage.setItem('portalAccessType','functional');
                }
                setTimeout(() => {
                    this.router.navigate(['/internalTrackPO'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                        // window.location.reload();
                    });
                }, 200);
                
            }
        
        }
        });
    }
    
    // dashboard()
    // {
    //     var typeOfuser=sessionStorage.getItem('portaltype')
    //     if( typeOfuser == 'payerportal')
    //     {
    //         this.router.navigate(['/internalportal']);
    //     }    
    // }

    TrackPO(){
        var typeOfuser=sessionStorage.getItem('portaltype')
        if(typeOfuser == 'innerportal' || typeOfuser == 'internalbcclportal' ||
        typeOfuser == 'innerbuyerportal' || typeOfuser == 'payerportal')
        {
            this.router.navigate(['/internalTrackPO']);
        }
        // else if(typeOfuser == 'innerbuyerportal' || typeOfuser == 'payerportal')
        // {
        //     this.router.navigate(['/internalTrackPO']);
        // }
    }

    ViewDashBoard(){
        var typeOfuser=sessionStorage.getItem('portaltype')
        if(typeOfuser == 'innerportal')
        {
            this.router.navigate(['/internalportal']);
        }
        else if(typeOfuser == 'innerbuyerportal')
        {
            this.router.navigate(['/internalBuyerportal']);
        }
        else if(typeOfuser == 'payerportal')
        {
            this.router.navigate(['/internalPayerportal']);
        }
        else if(typeOfuser == 'internalbcclportal')
        {
            this.router.navigate(['/internaltrackInvoiceList']);
        }
        else if(typeOfuser == 'internalbcclportal')
        {
            this.router.navigate(['/internaltrackInvoiceList']);
        }
     
    }

    navigatetobuyerinternalportal(){
        debugger
        this.loginService.logout().subscribe(res => {
            console.log("response is here ==> " + res);
            if (res[0].data == 'true') {
                this.authService.logout();
                debugger
                this.loginService.checkemailforinternalportal(this.loginForm.controls['Email'].value).subscribe(res => {
                    if (res.body[0].status == "Success") {
                        const accessKey = res.headers.get('Authorizationkey');
                        const profileAccesKey = res.headers.get('Authorization');

                        console.log("this.loginForm.controls['Email'].value" + this.loginForm.controls['Email'].value);
                        this.forinternal = this.loginForm.controls['Email'].value;
                        this.username = this.loginForm.controls['Email'].value;
                        if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
                            sessionStorage.setItem('ACCESS_TOKEN', accessKey);
                            sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
                            sessionStorage.setItem('username', this.username);
                            this.authService.login()
              
                            this.loaderservice.show()
                            setTimeout(() => {
                                this.router.navigate(['/internalTrackPO'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                                    window.location.reload();
                                });
                            }, 200);
                            this.loaderservice.hide();
                          }
                    }

                });
            }
        });
    }

    submitInvoicePopup(){
        this.dialogBox.submitInvoicepopUp();
        $("#withPo").prop('checked', false);
        $("#withoutPo").prop('checked', false);
        $("#bulkinvoice").prop('checked',false);
    }

    ngOnDestroy() {
        // Unsubscribe to prevent memory leaks
        if (this.sideBarSubscription) {
          this.sideBarSubscription.unsubscribe();
        }
      }
}


