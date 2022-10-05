import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { UserManagerService } from 'src/app/services/user-manager.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  userList:Array<IUser>=[];
  filteredString:string='';
  constructor(private userManager:UserManagerService) {  }

  ngOnInit(): void {
   this.userList=this.userManager.getUsers();
  }
}