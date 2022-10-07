import { Component, Input } from '@angular/core';
import { PostManagerService } from 'src/app/services/post-manager.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  @Input() posts:any;
  @Input() user:any;
  constructor(private postManager:PostManagerService, private sessionManager:SessionManagerService) {}

  ngOnInit(): void {  }

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
