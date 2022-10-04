export interface IPost {
    id:number,
    id_user:number,
    date:Date,
    description:string,
    img:string,
    likedBy: Array<number>
}
