import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  regForm : FormGroup


    constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService:AutheticationService, public router: Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname :['', [Validators.required]],
      email :['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password :['', [
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}")
      ]]
      
    })
  }
  get errorControl(){
    return this.regForm?.controls;
  }
  async singUp(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm?.valid){
      // evalua si esta o no el email pero esto se realiza despues del login, antes hay que comentar para que no de problemas
      const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password).catch((error)=>{
        console.log(error);
        loading.dismiss()
      })
      if(user){
        loading.dismiss()
        this.router.navigate(['/home'])
      }else{
        console.log("provide correct value")
      }
    }
  }

}
