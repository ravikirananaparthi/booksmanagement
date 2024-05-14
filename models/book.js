import mongoose from "mongoose";


const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  reviews: {
    type: {},
  },
  author: {
    type: String,
  },
  isbn:{
    type:String,
  }
});

export const Book = mongoose.model("Book", schema);
