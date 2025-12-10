import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Component} from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>; 
  showicons:boolean=false;
  isinternaluser:boolean =false;
constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showicons = false;
    this.isLoggedIn$=this.authService.isLoggedin;
    console.log("in here "+this.router.url);
    if (this.router.url === '/dashboard'){
      console.log("in here "+this.router.url);
      this.showicons = true;
      // return null
    }
    if (this.router.url === '/login'){
      sessionStorage.removeItem("PROFILE_ACCESS")
      return null
    }
    var type = sessionStorage.getItem("portaltype");
        if(type == 'innerbuyerportal' || type == 'innerportal' || type == 'payerportal' || type == 'internalbcclportal')
        {
            this.isinternaluser=true;
        }
  }
}
