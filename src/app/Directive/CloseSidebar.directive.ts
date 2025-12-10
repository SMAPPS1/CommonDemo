import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { SidebarService } from 'app/services/sidebarService/sidebar.service';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef,private sidebarService: SidebarService) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    const isNavbar = document.querySelector('app-navbar').contains(targetElement);
    const isSidebar = document.querySelector('app-sidebar-new').contains(targetElement);
  
    if (clickedInside && !isNavbar && !isSidebar) {
      this.sidebarService.CloseSidebar();
    }
  }
}
