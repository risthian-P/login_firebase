import { Component } from '@angular/core';
import { AutheticationService } from '../authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any
  constructor(public authService: AutheticationService, public route: Router) {
    this.user = authService.getProfile()
  }

  async logOut(){
    this.authService.singOut().then(()=>{
      this.route.navigate(['/landing'])
    }).catch((error)=>{console.log(error)})
  }
}
