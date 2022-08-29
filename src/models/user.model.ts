import { formatDate } from "../utils/Date";


export class UserModel{
    _id:string;
    createdAt:string;
    updatedAt:string;
    profile:string;
    fullname:string;
    email:string;
    phone:string;
    phoneVerified:string;
    accountActive:string;
    blocked:boolean;




     constructor(user:any){
       this._id=user._id;
       this.createdAt=formatDate(user.createdAt);
       this.updatedAt=formatDate(user.updatedAt);
       this.profile=user.profile;
       this.fullname=user.fullname;
       this.email=user.email;
       this.phone=user.phone;
       this.phoneVerified=user.phoneVerified;
       this.accountActive=user.account_active;
       this.blocked=user.blocked
     }

}