import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    username: '',
    email:'',
    password: '',
    rPassword:''
  });
  constructor(private formBuilder:FormBuilder,private userManager:UserManagerService, private sessionManager:SessionManagerService, private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    let username=this.registerForm.value.username ||"";
    let email=this.registerForm.value.email || "";
    let password=this.registerForm.value.password || "";
    let rPassword=this.registerForm.value.rPassword || "";
    let user=this.userManager.getUserFromUsername(username || "");
    if(user.username===""){
      if(!this.userManager.existsEmail(email || "")){
        if(password===rPassword){
          this.userManager.newUser(username,email,password);
          this.router.navigateByUrl("/login");
        } else{
          console.error("Las contraseñas no coinciden");
        }
      } else{
        console.error("Email ya en uso");
      }
    } else{
      console.error("el usuario ya existe");
    }
  }
}
