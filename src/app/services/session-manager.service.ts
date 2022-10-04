import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  users:Array<IUser>=[];
  currentUser:IUser;
  constructor() { 
    this.users.push({
      id:1,
      username:"prueba",
      email:"prueba@prueba.es",
      password:"1234",
      pic:"hola"
    });
    localStorage.setItem("users",JSON.stringify(this.users));

    this.currentUser=this.users[0];
    sessionStorage.setItem("user",JSON.stringify(this.currentUser));
  }

  getUser():IUser{
    return JSON.parse(sessionStorage.getItem("user") || "");
  }

  getUsername():string{
    return this.getUser().username;
  }
  getEmail():string{
    return this.getUser().email;
  }
  getId():number{
    return this.getUser().id;
  }
  getPic():string{
    return this.getUser().pic;
  }
}
