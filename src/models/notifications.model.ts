import mongoose, { Schema, Document } from "mongoose";

// This model is used to store email and information of notified users
export interface ISubscription extends Document {
  email: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    endpoint: {
      type: String,
      required: [true, "Endpoint is required"],
    },
    keys: {
      p256dh: {
        type: String,
        required: [true, "P256dh is required"],
      },
      auth: {
        type: String,
        required: [true, "Auth is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);

export default Subscription;
