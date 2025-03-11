import mongoose, {Schema, Document, Model, mongo} from "mongoose";


export interface IUser extends Document {

name : string,
email: string,
password: string,
userType : 'admin' | 'customer'

}

const userSchema: Schema<IUser>= new Schema({

name: {type: String, required : true},
email: {type: String, required : true, unique: true},
password : {type: String, required: true},
userType : {type: String, 
    enum: ['admin', 'customer'],
    default : 'customer'
}
},
{timestamps : true}

);

 const User: Model<IUser>  = mongoose.model<IUser>("User", userSchema)

 export default User
