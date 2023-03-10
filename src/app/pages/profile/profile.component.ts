import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { PostManagerService } from 'src/app/services/post-manager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:IUser;
  posts;
  constructor(private userManager:UserManagerService, private postManager:PostManagerService, private route:ActivatedRoute,private fileUploader:UploadFileService,private sessionManager:SessionManagerService,private router:Router) {
    this.user=userManager.getUserFromUsername(this.route.snapshot.paramMap.get('username')||"");
    this.posts=postManager.getPostsFromUser(this.user.id);
  }

  ngOnInit(): void {
  }

  async changeProfilePic(event:Event){
    let files=(event.target as HTMLInputElement).files;
    if(files!=null){
      let base64=await this.fileUploader.fileToBase64(files[0]) as string;
      this.user.pic=base64;
      this.userManager.editPic(this.user.id,base64);
      this.sessionManager.setUser(this.user); 
    }
  }
  
  public logout():void{
    this.sessionManager.clearSession();
    this.router.navigateByUrl("/login");
  }
  isMyProfile():boolean{
    return this.user.id===this.sessionManager.getId();
  }

}
