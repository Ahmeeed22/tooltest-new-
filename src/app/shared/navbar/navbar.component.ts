import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  signedIn= new Observable<boolean>()
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.signedIn= this._authService.signedin$;
  }

  logout() {
    this._authService.logout()
  }

}
