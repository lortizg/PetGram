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
  getStoriesDistinctUsers(storiesList:Array<any>=[-1]){
    //eliminar historias con users duplicados para hacer la lista del home
    let list;
    if(storiesList[0]===-1){
      list=this.stories;
    } else {
      list=storiesList;
    }
    let sortedStoriesByDate=[...list].sort((a,b)=> <any> new Date(b.date) - <any> new Date(a.date));
    let result=[...sortedStoriesByDate].filter((v,i,a)=>a.findIndex(x=>x.id_user===v.id_user)===i);
    result=result.map(x=>{return x.id_user});
    return result;
  }
  getStoriesFromUser(id:number):Array<IStory>{
    let result=[...this.stories].filter(x=>x.id_user===id);
    return result;
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
  seeStory(idStory:number,user:number){
    if(!this.alreadySeen(idStory,user)){
      this.getStoryFromId(idStory).seenBy.push(user);
      this.updateStories();
    }
  }
  getStoryFromId(idStory:number):IStory{
    return this.stories.filter(x=>x.id===idStory)[0];
  }
  alreadySeen(idStory:number,user:number){
    return this.getStoryFromId(idStory).seenBy.indexOf(user) !==-1;
  }
  getStoriesSeenByUser(user:number):Array<IStory>{
    return this.stories.filter(x=>this.alreadySeen(x.id,user));
  }
  getFirstStoryNotSeen(stories: IStory[], userId: number): number {
    return stories.findIndex(x=>x.seenBy.indexOf(userId)===-1);
  }

}
