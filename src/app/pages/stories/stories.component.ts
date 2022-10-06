import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { StoryMangerService } from 'src/app/services/story-manger.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  user;
  stories;
  
  slideIndex = 0;
  constructor(private storyManager:StoryMangerService,private userManager:UserManagerService,private route: ActivatedRoute, sessionManager:SessionManagerService) {
    this.user=userManager.getUserFromUsername(route.snapshot.paramMap.get('username')||"");
    this.stories=storyManager.getStoriesFromUser(this.user.id);
    storyManager.seeStory(this.stories[this.slideIndex].id,sessionManager.getId());
  }

  ngOnInit(): void {
  }

// Next/previous controls
changeStory(n:number) {
  //console.log(this.slideIndex);
  if(this.slideIndex+n<this.stories.length && this.slideIndex+n>=0){
   
    this.slideIndex += n;
  }
}

}
