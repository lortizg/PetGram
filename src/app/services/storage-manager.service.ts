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
  public existsUser(username:string):boolean{
    return this.getUser(username)===defaultUser();
  }
  public existsEmail(email:string):boolean{
    let currentList=this.getUsers();
    let emails=currentList.filter((x)=>x.email===email);
    return emails.length!==0;
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
  public newUser(username:string,email:string,password:string){
    if(username!=="" && email!=="" && password!==""){
      let currentList=this.getUsers();
      let newUser:IUser={
        id:currentList.length-1,
        username:username,
        email:email,
        password:password,
        pic:""
      }
      currentList.push(newUser);
      this.updateUsers(currentList);
    }
  }
}
