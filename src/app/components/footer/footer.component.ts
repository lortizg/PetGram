import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { SessionManagerService } from 'src/app/services/session-manager.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentUser:IUser;
  constructor(sessionManager:SessionManagerService) {
    this.currentUser=sessionManager.getUser();
  }

  ngOnInit(): void {
  }

}
