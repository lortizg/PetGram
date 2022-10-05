import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { StorageManagerService } from 'src/app/services/storage-manager.service';
import { defaultUser } from 'src/utils';

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
  constructor(private formBuilder:FormBuilder,private storageManager:StorageManagerService, private sessionManager:SessionManagerService) { }

  ngOnInit(): void {
    if(this.sessionManager.getUser()!==undefined){
      window.location.href="";
    }
  }
  login(){
    let user=this.storageManager.getUser(this.loginForm.value.username || "");
    if(user!==defaultUser() && this.loginForm.value.password===user.password){
      this.sessionManager.setUser(user);
      console.log("sesion iniciada correctamente");
      window.location.href="";
    } else{
      console.error("Invalid login");
    }
  }
}
