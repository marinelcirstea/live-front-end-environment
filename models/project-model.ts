import { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema<IProjectModel>(
  {
    author: { type: String, required: true },
    name: { type: String, trim: true, default: "untitled" },
    css: { type: String, trim: true },
    javascript: { type: String, trim: true },
    html: { type: String, trim: true },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Project || model<IProjectModel>("Project", ProjectSchema);
