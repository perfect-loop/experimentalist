/* eslint-disable */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    strict: false
  },
);

export interface IUserSchema extends Document {
  _id: string;
}

// export default mongoose.model("users", UserSchema);
export const User = mongoose.model("users_profiles", UserSchema);
