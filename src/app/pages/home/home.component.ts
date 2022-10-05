import { Component, OnInit } from '@angular/core';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { IUser } from 'src/app/interfaces/iuser';
import { Router } from '@angular/router';
import { IPost } from 'src/app/interfaces/ipost';
import { PostManagerService } from 'src/app/services/post-manager.service';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;
  posts:Array<any>=[];
  constructor(private sessionManager:SessionManagerService,private router:Router, postManager:PostManagerService,userManager:UserManagerService) {
    this.user=sessionManager.getUser();
    if(this.user instanceof Array){
      this.router.navigateByUrl('/login');
    } else{
      this.posts=postManager.getPosts().sort((a,b)=> <any> new Date(b.date) - <any> new Date(a.date));
      this.posts.map((x)=>{
        x["user"]=userManager.getUserFromId(x.id_user);
      });
    }
  }

  ngOnInit(): void {  }

  public logout():void{
    this.sessionManager.clearSession();
    this.router.navigateByUrl("/login");
  }

}
