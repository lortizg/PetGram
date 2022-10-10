import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import md5 from 'md5';
import { isValidEmail } from 'src/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  error = {
    username: '',
    email:'',
    password: '',
    rPassword:''
  };
  registerForm = {
    username: '',
    email:'',
    password: '',
    rPassword:''
  };
  constructor(private userManager:UserManagerService, private sessionManager:SessionManagerService, private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    if(!this.validate()){
      console.log(this.error);
      return ;
    }
    let username=this.registerForm.username;
    let email=this.registerForm.email;
    let password=md5(this.registerForm.password);

    this.userManager.newUser(username,email,password);
    this.router.navigateByUrl("/login");
  }

  private validate():boolean{
    let valid=true;
    if(this.registerForm.username===""){
      valid=false;
      this.error.username="Required field";
    } else if(this.userManager.existsUser(this.registerForm.username)){
      valid=false;
      this.error.username="This username already exists";
    }
    else{
      this.error.username="";
    }


    if(this.registerForm.email===""){
      valid=false;
      this.error.email="Required field";
    } else if(!isValidEmail(this.registerForm.email)){
      valid=false;
      this.error.email="This doesn't seem like an email :(";
    }
    else if(this.userManager.existsEmail(this.registerForm.email)){
      valid=false;
      this.error.email="Email already in use";
    } 
    else{
      this.error.email="";
    }
  

    if(this.registerForm.password===""){
      valid=false;
      this.error.password="Required field";
    } else if(this.registerForm.password.length<4){
      valid=false;
      this.error.password="Minimum password length is 4!"
    }else{
      this.error.password="";
    }


    if(this.registerForm.rPassword===""){
      valid=false;
      this.error.rPassword="Required field";
    } else if(this.registerForm.password!==this.registerForm.rPassword){
      valid=false;
      this.error.rPassword="Passwords do not match!";
    }
    else{
      this.error.rPassword="";
    }
    return valid;
  }
}
