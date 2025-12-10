import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup.component';
import { SidebarNewComponent } from './sidebar-new/sidebar-new.component';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
// import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    FooterComponent,
    // NavbarComponent,
    SidebarComponent,
    PopupComponent,
    //SidebarNewComponent,
    DashboardTableComponent,
    // LoaderComponent
  ],
  exports: [
    FooterComponent,
    // NavbarComponent,
    SidebarComponent,
    //SidebarNewComponent,
    DashboardTableComponent
  ]
})
export class ComponentsModule { }
