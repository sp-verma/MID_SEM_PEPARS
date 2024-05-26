import { models, Schema, model } from "mongoose";

const SubjectSchema = Schema(
  {
    name: {
      type: String,
    },
    sem: {
      type: Number,
      min: 1,
      max: 8,
    },
    branch: {
      type: String,
    },
  },
  { timestamps: true }
);

const Subject = models?.subject || model("subject", SubjectSchema);
export default Subject;
