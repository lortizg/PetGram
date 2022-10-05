import { Component, OnInit } from '@angular/core';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { IUser } from 'src/app/interfaces/iuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;
  constructor(private sessionManager:SessionManagerService,private router:Router) {
    this.user=sessionManager.getUser();
    if(this.user instanceof Array){
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {  }

}
