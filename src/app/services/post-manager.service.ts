import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { UserManagerService } from './user-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PostManagerService {

  posts:Array<IPost>;
  constructor(private userManager:UserManagerService) {
    if(localStorage["posts"]!==undefined){
      this.posts=this.getPosts();
    } else{
      this.posts=[];
    }
  }

  private getNumberOfPosts(){
    return this.posts.length;
  }
  private getIdPostFromId(id:number){
    return this.posts.findIndex((x)=>x.id===id);
  }
  public getPosts():Array<IPost>{
    return JSON.parse(localStorage.getItem("posts") || "[]");
  }
  public getPostsFromUser(id:number){
    return this.posts.filter((x)=>x.id_user===id);
  }
  public updatePosts():void{
    localStorage.setItem("posts",JSON.stringify(this.posts));
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
    this.updatePosts();
  }
  removePost(id:number){
    let index = this.posts.findIndex(x=>x.id===id);
    this.posts.splice(index,1);
    this.updatePosts();
  }

  public likePost(postId:number,userId:number){
    let index=this.getIdPostFromId(postId);
    if(index!==-1){
      this.posts[index].likedBy.push(userId);
      this.updatePosts();
    }
  }
  public unLikePost(postId:number,userId:number){
    let index=this.getIdPostFromId(postId);
    if(index!==-1){
      let likedIndex=this.posts[index].likedBy.indexOf(userId);
      if(likedIndex!==-1){
        this.posts[index].likedBy.splice(likedIndex,1);
        this.updatePosts();
      }
    }
  }
  public getPostsLikedBy(id:number){
    let postsLiked=[...this.posts].filter(x=>x.likedBy.indexOf(id)!==-1);
    return [...postsLiked].map(x=>{return x.id});
  }
  public getLikesFromPost(id:number){
    let index=this.getIdPostFromId(id);
    return this.posts[index].likedBy;
  }
  public isPostLikedBy(idPost:number,idUser:number){
    return this.getPostsLikedBy(idUser).indexOf(idPost)!==-1;
  }
  // public getPublisher(post:IPost){
  //   let users=this.userManager.getUsers();
  // }
}
