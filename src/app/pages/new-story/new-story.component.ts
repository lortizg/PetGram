import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { StoryMangerService } from 'src/app/services/story-manger.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.scss']
})
export class NewStoryComponent implements OnInit {

  newStory=this.formBuilder.group({
    image:''
  });
  constructor(private formBuilder:FormBuilder,private fileUploader:UploadFileService,private storyManager:StoryMangerService,private sessionManager:SessionManagerService,private router:Router) { }

  ngOnInit(): void {
  }
  public publish(){
    const image=this.newStory.value.image || "";
    if(image!=""){
      this.storyManager.addStory(this.sessionManager.getId(),image);
      this.router.navigateByUrl("");
    }
  }
  async newImage(event:Event){
    let files=(event.target as HTMLInputElement).files;
    if(files!=null){
      let base64=await this.fileUploader.fileToBase64(files[0]) as string;
      this.newStory.value.image=base64;
    }
  }

}
