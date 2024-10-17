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
    service: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
      }
    ]
  },
  {
    timestamps: true // Agrega createdAt y updatedAt
  }
);

const User = model("User", userSchema);

module.exports = User;
