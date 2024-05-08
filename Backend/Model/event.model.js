const mongoose = require("mongoose");

const categoryEnum = [
  "Music",
  "Tech",
  "Workshop",
  "Sports",
  "Food",
  "Art",
  "Fashion",
  "Education",
  "Health",
  "Business",
  "Science",
  "Travel",
  "Entertainment",
  "Fitness",
  "Culture",
  "Environment",
  "Politics",
  "Religion",
  "History",
];

const EventSchema = new mongoose.Schema(
  {
    EventId: { type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    organizer: { type: Number, required: true },
    category: { type: String, enum: categoryEnum, required: true },
    roles: { type: String, enum: ["user", "admin"], default: "user" },
    imageUrl: { type: String },
    pinCode: { type: Number, required: true },
    location: { type: String, required: true },
    ticketTypes: [{ type: String, enum: ["Gold", "Silver", "Bronze"] }],
  },
  { versionKey: false }
);

const eventModel = mongoose.model("event", EventSchema);

module.exports = { eventModel };
