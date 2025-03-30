import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  profile: String,
});

const PlaylistSchema = new Schema({
  name: String,
});

const BookSchema = new Schema({
  title: String,
});

const CareerPathSchema = new Schema({
  path: String,
});

const QuestionSchema = new Schema({
  question: String,
});

const OtherSchema = new Schema({
  data: String,
});

const User = model("User", UserSchema);
const Playlist = model("Playlist", PlaylistSchema);
const Book = model("Book", BookSchema);
const CareerPath = model("CareerPath", CareerPathSchema);
const Question = model("Question", QuestionSchema);
const Other = model("Other", OtherSchema);

export default { User, Playlist, Book, CareerPath, Question, Other };
