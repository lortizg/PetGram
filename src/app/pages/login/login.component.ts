import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import md5 from 'md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = {
    username: '',
    password: ''
  };
  error='';
  constructor(private formBuilder:FormBuilder,private userManager:UserManagerService, private sessionManager:SessionManagerService, private router:Router) { }

  ngOnInit(): void {
    if(!(this.sessionManager.getUser() instanceof Array)){
      this.router.navigateByUrl('');
    }
  }
  login(){
    if(!this.validate()){
      return ;
    }
    this.sessionManager.setUser(this.userManager.getUserFromUsername(this.loginForm.username));
    console.log("sesion iniciada correctamente");
    this.router.navigateByUrl('');
  }

  private validate():boolean{
    let valid=true;
    if(this.loginForm.username ==="" || this.loginForm.password ===""){
      valid=false;
    } else{
      let user=this.userManager.getUserFromUsername(this.loginForm.username || "");
      if(JSON.stringify(user)===JSON.stringify(this.userManager.defaultUser()) || md5(this.loginForm.password)!==user.password){
        valid=false;
      }
    }
    if(!valid) this.error="Invalid login";
    return valid;
  }
}
