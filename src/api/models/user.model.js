const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    userName: { 
        type: String, 
        require: true, 
        trim: true
    },
    email: {
        type: String,
         require: true,
          trim: true
    },
    password: { 
        type: String, 
        require: true, 
        trim: true
    },
    img: {
        type: String, 
        require: false, 
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams"
    }]
},
{
    timestamps: true,
});

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
})

const User = mongoose.model("users", userSchema, "users");
module.exports = User;