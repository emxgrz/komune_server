const { Schema, model, mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    dateOfBirth: {
      type: Date
    },
    location: {
      city: {
        type: String,
        trim: true 
      },
      country: {
        type: String,
        trim: true
      }
    },
    image: {
      type: String,
      default: "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"
    },
    description: {
      type: String, 
      trim: true
    },
    followersCount: {
      type: Number,
      default: 0
    },
    followingCount: {
      type: Number,
      default: 0
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    work: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Work"
      }
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
      }
    ],
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
      }
    ]
  },
  {
    timestamps: true
  }
);


const User = model("User", userSchema);

module.exports = User;
