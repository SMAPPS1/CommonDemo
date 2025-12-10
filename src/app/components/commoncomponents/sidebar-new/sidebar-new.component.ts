import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { AuthService } from 'app/services/auth/auth.service';
import { LoginService } from 'app/services/login/login.service';
import { SidebarService } from 'app/services/sidebarService/sidebar.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';


import  { dashboardURL } from '../../../../assets/configdata/appconfig.json';
@Component({
  selector: 'app-sidebar-new',
  templateUrl: './sidebar-new.component.html',
  styleUrls: ['./sidebar-new.component.css'],
  animations: [
    trigger('slideInOut', [
      state('open', style({
        // transform: 'translateX(0)',
        opacity: 1,
        display: 'block'
      })),
      state('closed', style({
        // transform: 'translateX(0)',
        opacity: 0,
        display: 'none'
      })),
      transition('open => closed', [
        animate('0.3s ease')
      ]),
      transition('closed => open', [
        animate('0.3s ease')
      ])
    ])
  ]
})
export class SidebarNewComponent implements OnInit,OnDestroy {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;

  isSidebarOpen = false;
  sidebarVendor = false;
  functionaldirector = false;
  isLoggedin: boolean = false;
  isLoggedIn$: Observable<boolean>;

  ispayee: boolean = false;
  hideNavbar: boolean = false;
  internalbcclportal: boolean = false;

  username: any;
  type: string;


  private sideBarSubscription: Subscription;
  private sideBarMenu: Subscription;
  private sidebarFunctionaldirector: Subscription;


  constructor(private sidebarService: SidebarService, private authService: AuthService, private loginService: LoginService,  private titleService:Title ,private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.sideBarSubscription = this.sidebarService.sidebarState$.subscribe(state => {
      this.isSidebarOpen = state;
    });

    this.sideBarMenu = this.sidebarService.isVendorLogin$.subscribe(state => {
      this.sidebarVendor = state;
    });

    this.sidebarFunctionaldirector = this.sidebarService.sidebarFunctionaldirector$.subscribe(state => {
      this.functionaldirector = state;
    });
   }

  ngOnInit(): void {
debugger
    this.isLoggedIn$ = this.authService.isLoggedin;
    const isPayeeString = sessionStorage.getItem('ispayee');
    const hideNavbarString = sessionStorage.getItem('ispayee');
    const internalbcclportalString = sessionStorage.getItem('internalbcclportal');

    this.ispayee = (isPayeeString === 'true');
    this.hideNavbar = (hideNavbarString === 'true');
    this.internalbcclportal = (internalbcclportalString === 'true');
    if(sessionStorage.getItem('portaltype')=='innerportal' ){
      debugger
      this.internalbcclportal=true
            this.hideNavbar=false

    }else if(sessionStorage.getItem('portaltype')=='payerportal'){
      this.internalbcclportal=false
      this.hideNavbar=true
    }
    this.type = sessionStorage.getItem("portaltype");
    this.username = sessionStorage.getItem('username')
    console.log(this.internalbcclportal,"nav", this.hideNavbar)

  }

  hideseachbox(){
    document.getElementById("searchdiv") && (document.getElementById("searchdiv").style.display = "none")
  }

  hideseachbox1(){
    document.getElementById("searchdiv") && (document.getElementById("searchdiv").style.display = "none")
  }

  hideseachbox2(){
    document.getElementById("searchdiv") && (document.getElementById("searchdiv").style.display = "none")
  }

  submitInvoicePopup(){
    console.log('clicked')
    this.dialogBox.submitInvoicepopUp();
    $("#withPo").prop('checked', false);
    $("#withoutPo").prop('checked', false);
    $("#bulkinvoice").prop('checked',false);
}

closeSidebar(){
  this.isSidebarOpen = false;
  this.sidebarService.CloseSidebar();
}

goToUrl() {
  var urldata = btoa(this.username);
  this.document.location.href = dashboardURL+'/#/dashboard?key='+urldata;
}

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

logOut() {
  this.loginService.logout().subscribe(res => {
      if (res[0].data == 'true') {
          // this.titleService.setTitle("K12 BusinessConnect");
                    this.titleService.setTitle("VIMA");

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

ngOnDestroy() {
  // Unsubscribe to prevent memory leaks
  if (this.sideBarSubscription) {
    this.sideBarSubscription.unsubscribe();
  }
}

}
