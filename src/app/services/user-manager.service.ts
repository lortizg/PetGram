import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  users:Array<IUser>;
  constructor() {
    if(localStorage["users"]!==undefined){
      this.users=this.getUsers();
    } else{
      this.users=[];
    }
  }

/*********** Private methods *********** */
  private getPositionFromId(id:number){
    const list=this.getUsers();
    return list.findIndex((x)=>x.id===id);
  }

/************* Public methods *********** */
  public defaultUser(): IUser{
    return {
        id:-1,
        username:"",
        email:"",
        password:"",
        pic:this.defaultIcon()
    };
  }
  public defaultIcon():string{
    return 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png';
  }
  public getUsers():Array<IUser>{
    return JSON.parse(localStorage.getItem("users") || "[]");
  }
  public existsUser(username:string):boolean{
    return JSON.stringify(this.getUserFromUsername(username))!==JSON.stringify(this.defaultUser());
  }
  public existsEmail(email:string):boolean{
    let currentList=this.getUsers();
    let emails=currentList.filter((x)=>x.email===email);
    return emails.length!==0;
  }
  public updateUsers(newUsers:Array<IUser>):void{
    localStorage.setItem("users",JSON.stringify(newUsers));
  }
  public getUserFromUsername(username:string):IUser{
    let user=this.users.filter((x)=>x.username===username);
    if(user.length!==0){
      return user[0];
    } else{
      return this.defaultUser();
    }
  }
  public getUserFromId(id:number):IUser{
    let user=this.users.filter((x)=>x.id===id);
    if(user.length!==0){
      return user[0];
    } else{
      return this.defaultUser();
    }
  }

  public newUser(username:string,email:string,password:string){
    if(username!=="" && email!=="" && password!==""){
      //let currentList=this.getUsers();
      let newUser:IUser={
        id:this.users.length,
        username:username,
        email:email,
        password:password,
        pic:this.defaultIcon()
      }
      this.users.push(newUser);
      this.updateUsers(this.users);
    }
  }

  public editPic(id:number,pic:string){
    this.users[this.getPositionFromId(id)].pic=pic;
    this.updateUsers(this.users);
  }
}
