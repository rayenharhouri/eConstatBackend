import mongoose, {mongo, Schema} from 'mongoose'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type:String,
            required : true,
        },
        adress: {
            type : String,
            required : true,
        },
        driverLicense: {
            type: String,
            required: true,
        },
        delevredOn: {
            type: Date,
            required : true,
        },
        number : {
            type: Number,
            required: true
        },
    }, 
        {
            timestamps : true
        }    
)

export default model("user",userSchema)