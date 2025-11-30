import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    oldText: {
      type: String,
      default: "",
    },
    newText: {
      type: String,
      required: true,
    },
    addedWords: {
      type: [String],
      default: [],
    },
    removedWords: {
      type: [String],
      default: [],
    },
    oldLength: {
      type: Number,
      default: 0,
    },
    newLength: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // important
);

const DataModel = mongoose.model("VersionHistory", dataSchema);
export default DataModel;
