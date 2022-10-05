import { Component, OnInit } from '@angular/core';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { IUser } from 'src/app/interfaces/iuser';
import { Router } from '@angular/router';
import { IPost } from 'src/app/interfaces/ipost';
import { PostManagerService } from 'src/app/services/post-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;
  posts:Array<IPost>=[];
  constructor(private sessionManager:SessionManagerService,private router:Router, postManager:PostManagerService) {
    this.user=sessionManager.getUser();
    if(this.user instanceof Array){
      this.router.navigateByUrl('/login');
    } else{
      this.posts=postManager.getPosts().sort((a,b)=> <any> new Date(a.date) - <any> new Date(b.date));
    }
  }

  ngOnInit(): void {  }

  public logout():void{
    this.sessionManager.clearSession();
    this.router.navigateByUrl("/login");
  }

}
