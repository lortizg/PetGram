import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { StorageManagerService } from 'src/app/services/storage-manager.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  userList:Array<IUser>=[];
  filteredString:string='';
  constructor(private storageManager:StorageManagerService) {  }

  ngOnInit(): void {
   this.userList=this.storageManager.getUsers();
  }
}