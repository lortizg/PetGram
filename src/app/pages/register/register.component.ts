import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { StorageManagerService } from 'src/app/services/storage-manager.service';

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
  constructor(private formBuilder:FormBuilder,private storageManager:StorageManagerService, private sessionManager:SessionManagerService, private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    let username=this.registerForm.value.username ||"";
    let email=this.registerForm.value.email || "";
    let password=this.registerForm.value.password || "";
    let rPassword=this.registerForm.value.rPassword || "";
    let user=this.storageManager.getUser(username || "");
    if(user.username===""){
      if(!this.storageManager.existsEmail(email || "")){
        if(password===rPassword){
          this.storageManager.newUser(username,email,password);
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
