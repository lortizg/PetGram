import { IUser } from "./app/interfaces/iuser";
import { IPost } from "./app/interfaces/ipost";
import { IStory } from "./app/interfaces/istory";

export const defaultUser= (): IUser => {
    return {
        id:-1,
        username:"",
        email:"",
        password:"",
        pic:""
    };
}

export const defaultPost= (): IPost => {
    return {
        id:-1,
        id_user:-1,
        date:new Date(),
        description:"",
        img:"",
        likedBy: []
    };
}

export const defaultStory= (): IStory => {
    return {
        id:-1,
        id_user:-1,
        date:new Date(),
        img:"",
        seenBy:[]
    }
}
