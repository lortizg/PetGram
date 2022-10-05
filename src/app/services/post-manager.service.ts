import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/ipost';

@Injectable({
  providedIn: 'root'
})
export class PostManagerService {

  posts:Array<IPost>;
  constructor() {
    if(localStorage["posts"]!==undefined){
      this.posts=this.getPosts();
    } else{
      this.posts=[];
    }
  }

  private getNumberOfPosts(){
    return this.getPosts().length;
  }
  public getPosts():Array<IPost>{
    return JSON.parse(localStorage.getItem("posts") || "[]");
  }
  public getPostsFromUser(id:number){
    let posts=this.getPosts();
    return posts.filter((x)=>x.id_user===id);
  }
  public updatePosts(newPosts:Array<IPost>):void{
    localStorage.setItem("posts",JSON.stringify(newPosts));
  }
  public addPost(userId:number,desc:string,img:string){
    const newPost:IPost={
      id:this.getNumberOfPosts(),
      id_user:userId,
      date:new Date(),
      description:desc,
      img:img,
      likedBy:[]
    }
    this.posts.push(newPost);
    this.updatePosts(this.posts);
  }
}
