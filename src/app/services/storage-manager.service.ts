import { Injectable } from '@angular/core';
import { defaultUser } from 'src/utils';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {

  users:Array<IUser>;
  constructor() {
    if(localStorage["users"]!==undefined){
      this.users=this.getUsers();
    } else{
      this.users=[];
    }
  }

  public getUsers():Array<IUser>{
    return JSON.parse(localStorage.getItem("users") || "[]");
  }
  public updateUsers(newUsers:Array<IUser>):void{
    localStorage.setItem("users",JSON.stringify(newUsers));
  }
  public getUser(username:string):IUser{
    let currentList=this.getUsers();
    let user=currentList.filter((x)=>x.username===username);
    if(user.length!==0){
      return user[0];
    } else{
      return defaultUser();
    }
  }
}
