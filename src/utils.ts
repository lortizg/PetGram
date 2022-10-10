import { IPost } from "./app/interfaces/ipost";
import { IStory } from "./app/interfaces/istory";

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

export const isValidEmail = (email: string) => {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);

}