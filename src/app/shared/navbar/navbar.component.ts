import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user={name:'samy'}
  constructor(private _AuthService:AuthService) {
    this._AuthService.userName.subscribe(()=>{
      console.log(this._AuthService.userName.getValue());
      this.user.name=this._AuthService.userName.getValue()
    })
    
   }

  ngOnInit(): void {
  }


}
