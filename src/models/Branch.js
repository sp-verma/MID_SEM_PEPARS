import { models, Schema, model } from "mongoose";

const BranchSchema = Schema(
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

const Branch = models?.branch || model("branch", BranchSchema);
export default Branch;
