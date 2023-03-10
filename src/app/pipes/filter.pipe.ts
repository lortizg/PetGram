import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any,filteredString:string) {
    if(value.length===0 || filteredString===''){
      return value;
    }

    const users=[];
    for(let user of value){
      if( (user.username.toLowerCase()).includes(filteredString.toLowerCase())){
              users.push(user);
      }
    }
    return users;
  }
}