import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();

  private isVendorLogin = new BehaviorSubject<boolean>(false);
  isVendorLogin$ = this.isVendorLogin.asObservable();


  private sidebarFunctionaldirector = new BehaviorSubject<boolean>(false);
  sidebarFunctionaldirector$ = this.sidebarFunctionaldirector.asObservable();

   private payeeState = new BehaviorSubject<boolean>(false);
  payeeState$ = this.payeeState.asObservable();


  constructor() { }

  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }

  CloseSidebar() {
    this.sidebarState.next(false);
  }

  VendorLogin(val: any) {
    this.isVendorLogin.next(val)
  }

  functionaldirector(val: any) {
    this.sidebarFunctionaldirector.next(val)

  }
   setPayeeState(value: boolean) {
    debugger
    this.payeeState.next(value);
  }
}
