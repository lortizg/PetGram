import { Component, OnInit } from '@angular/core';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;
  constructor(private sessionManager:SessionManagerService) {
    this.user=sessionManager.getUser();
  }

  ngOnInit(): void {
  }

}
