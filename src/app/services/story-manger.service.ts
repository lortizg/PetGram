import { Injectable } from '@angular/core';
import { IStory } from '../interfaces/istory';

@Injectable({
  providedIn: 'root'
})
export class StoryMangerService {

  stories:Array<IStory>;
  constructor() {
    if(localStorage["users"]!==undefined){
      this.stories=this.getStories();
    } else{
      this.stories=[];
    }
  }


  getStories():Array<IStory>{
    return JSON.parse(localStorage.getItem("stories") || "[]");
  }
  getStoriesDistinctUsers(){
    //eliminar historias con users duplicados para hacer la lista del home
    let sortedStoriesByDate=[...this.stories].sort((a,b)=> <any> new Date(b.date) - <any> new Date(a.date));
    return sortedStoriesByDate.filter((v,i,a)=>a.findIndex(x=>x.id_user===v.id_user)===i);
  }
  getStoriesFromUser(id:number):Array<IStory>{
    return [...this.stories].filter(x=>x.id_user=id);
  }

  addStory(userId:number,image:string){
    this.stories.push({
      id:this.stories.length,
      id_user:userId,
      date:new Date(),
      img:image,
      seenBy:[]
    });
    this.updateStories();
  }
  updateStories(){
    localStorage.setItem("stories",JSON.stringify(this.stories));
  }
}
