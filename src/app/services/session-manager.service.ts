import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  users:Array<IUser>=[];
  constructor() {   }
  setUser(user:IUser):void{
    sessionStorage.setItem("user",JSON.stringify(user));
  }
  getUser():IUser{
    return JSON.parse(sessionStorage.getItem("user") || "[]");
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
  clearSession(){
    sessionStorage.clear();
  }
}
