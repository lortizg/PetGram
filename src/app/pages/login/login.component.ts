import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });
  constructor(private formBuilder:FormBuilder,private userManager:UserManagerService, private sessionManager:SessionManagerService, private router:Router) { }

  ngOnInit(): void {
    if(!(this.sessionManager.getUser() instanceof Array)){
      this.router.navigateByUrl('');
    }
  }
  login(){
    let user=this.userManager.getUser(this.loginForm.value.username || "");
    if(user!==this.userManager.defaultUser() && this.loginForm.value.password===user.password){
      this.sessionManager.setUser(user);
      console.log("sesion iniciada correctamente");
      this.router.navigateByUrl('');
    } else{
      console.error("Invalid login");
    }
  }
}
