import mongoose from "mongoose";
import { Marked } from "marked";
import slugify from "slugify";
import createdompurify from "dompurify";
import { JSDOM } from "jsdom";
const dompurify = createdompurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizeHTML: {
    type: String,
    required: true,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.markdown) {
    this.sanitizeHTML = dompurify.sanitize(this.markdown);
  }
  next();
});

export default mongoose.model("articles", articleSchema);
