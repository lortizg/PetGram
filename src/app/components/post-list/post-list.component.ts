import { Component, Input } from '@angular/core';
import { PostManagerService } from 'src/app/services/post-manager.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  posts:Array<any>=[];
  @Input() user:any;
  constructor(private postManager:PostManagerService, private sessionManager:SessionManagerService,private userManager:UserManagerService) {
    

  }

  ngOnInit(): void {
    if(this.user!==undefined){
      this.posts=this.postManager.getPostsFromUser(this.user).sort((a,b)=> <any> new Date(b.date) - <any> new Date(a.date));
    } else{
      this.posts=this.postManager.getPosts().sort((a,b)=> <any> new Date(b.date) - <any> new Date(a.date));
    }
    this.posts.map((x)=>{
      x["user"]=this.userManager.getUserFromId(x.id_user);
    });
    console.log(this.posts);
  }

  like(postId:number){
    let userId=this.sessionManager.getId();
    if(!this.liked(postId)){
      this.postManager.likePost(postId,userId); 
    } else{
      this.postManager.unLikePost(postId,userId);
    }
     
  }
  liked(postId:number){
    return this.postManager.isPostLikedBy(postId,this.sessionManager.getId());
  }
}
