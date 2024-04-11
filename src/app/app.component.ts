import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from './services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Cafe Vista';

  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn  = UserStorageService.isAdminLoggedIn();
      }
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

}


