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
  
  timePerStory:number=6*100;
  timeLeft: number = this.timePerStory;
  interval:any;
  onPause:boolean=false;

  slideIndex = 0;
  constructor(private storyManager:StoryMangerService,private userManager:UserManagerService,private route: ActivatedRoute, private sessionManager:SessionManagerService) {
    this.user=userManager.getUserFromUsername(route.snapshot.paramMap.get('username')||"");
    this.stories=storyManager.getStoriesFromUser(this.user.id);
    let firstStoryNotSeen=storyManager.getFirstStoryNotSeen(this.stories,sessionManager.getId());
    this.slideIndex=firstStoryNotSeen!==-1?firstStoryNotSeen:0;
    storyManager.seeStory(this.stories[this.slideIndex].id,sessionManager.getId());

    this.startTimer();
  }

  ngOnInit(): void {
  }

// Next/previous controls
changeStory(n:number) {
  this.timeLeft=this.timePerStory;
  if(this.slideIndex+n<this.stories.length && this.slideIndex+n>=0){
    this.slideIndex += n;
    this.storyManager.seeStory(this.stories[this.slideIndex].id,this.sessionManager.getId());
  
  } else if(this.slideIndex+n>=this.stories.length){
    let nextUser=this.storyManager.getNextUser(this.user.id);
    if(nextUser!==-1){
      console.log(this.userManager.getUserFromId(nextUser).username);
      window.location.href="/stories/"+this.userManager.getUserFromId(nextUser).username;
    } else{
      window.location.href="";
    }
  
  } else{
    let nextUser=this.storyManager.getPreviousUser(this.user.id);
    if(nextUser!==-1){
      console.log(this.userManager.getUserFromId(nextUser).username);
      window.location.href="/stories/"+this.userManager.getUserFromId(nextUser).username;
    } else{
      window.location.href="";
    }
  }
}



startTimer() {
  this.onPause=false;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = this.timePerStory;
        this.changeStory(1);
      }
    },10)
  }

  pauseTimer() {
    this.onPause=true;
    clearInterval(this.interval);
  }
  
}
