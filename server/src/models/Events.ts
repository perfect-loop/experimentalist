import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

EventSchema.add({
  startTime: Date,
  endTime: Date,
  active: Boolean
});

export default mongoose.model("events", EventSchema);
