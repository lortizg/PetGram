import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PostManagerService } from 'src/app/services/post-manager.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  newPost={
    description:'',
    image:''
  };
  constructor(private formBuilder:FormBuilder,private fileUploader:UploadFileService,private postManager:PostManagerService,private sessionManager:SessionManagerService,private router:Router) {
    
  }

  ngOnInit(): void {
  }
  public publish(){
    const desc=this.newPost.description || "";
    const image=this.newPost.image || "";
    console.log(desc +": "+image);
    if(image!==""){
      this.postManager.addPost(this.sessionManager.getId(),desc,image);
      this.router.navigateByUrl("");
    }
  }
  async newImage(event:Event){
    let files=(event.target as HTMLInputElement).files;
    if(files!=null){
      let base64=await this.fileUploader.fileToBase64(files[0]) as string;
      this.newPost.image=base64;
    }
  }
}
