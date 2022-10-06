import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { ActivatedRoute } from '@angular/router';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:IUser;
  constructor(private userManager:UserManagerService, private route:ActivatedRoute,private fileUploader:UploadFileService,private sessionManager:SessionManagerService) {
    this.user=userManager.getUserFromUsername(this.route.snapshot.paramMap.get('username')||"");
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
}
