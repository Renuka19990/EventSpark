const express = require("express");

const { UserModel } = require("../Model/user.model");
const { eventModel } = require("../Model/event.model");

const adminRoute = express.Router();

//post
adminRoute.post("/events", async (req, res) => {
  try {
    const {
      eventId,
      title,
      description,
      eventDate,
      organizer,
      category,
      imageUrl,
      eventPlanner,
      pinCode,
      location,
      ticketTypes,
    } = req.body;

    const newEvent = new eventModel({
      eventId,
      title,
      description,
      eventDate: new Date(eventDate),
      organizer,
      category,
      imageUrl,
      eventPlanner,
      pinCode,
      location,
      ticketTypes,
    });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



//get
adminRoute.get("/events", async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category; // Filter events based on the category if it's provided in the query string
    }
    const events = await eventModel.find(query); // Find events based on the query, which may or may not include a category filter

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



adminRoute.get("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const events = await eventModel.findById(id);

    if (!events) {
      return res.status(404).json({ message: "events not found" });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



adminRoute.patch("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const update = req.body;

    // Option for findByIdAndUpdate to return the updated document
    const options = { new: true };

    const updateEvent = await eventModel.findByIdAndUpdate(
      eventId,
      update,
      options
    );

    if (!updateEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updateEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



//delete
adminRoute.delete("/events/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const deletedEvent = await eventModel.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({
      message: "Event successfully deleted",
      deletedEventId: eventId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//users
adminRoute.post("/users", async (req, res) => {
  try {
    const {
      userID,
      age,
      username,
      email,
      password,
      dateOfBirth,
      profilePicture,
      role,
      eventsBooked,
    } = req.body;

    const newUser = new UserModel({
      userID,
      age,
      username,
      email,
      password,
      dateOfBirth: new Date(dateOfBirth),
      profilePicture,
      role,
      eventsBooked,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



adminRoute.get("/users", async (req, res) => {
  try {
    const { username } = req.query;
    let query = {};

    if (username) {
      query.username = username;
    }

    const users = await UserModel.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



adminRoute.patch("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const update = req.body;

    // Option for findByIdAndUpdate to return the updated document
    const options = { new: true };

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      update,
      options
    );

    if (!updateUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



adminRoute.get("/users", async (req, res) => {
  try {
    const { username } = req.query;
    let query = {};

    if (username) {
      query.username = username;
    }

    const users = await UserModel.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



adminRoute.delete("/users/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const deletedUser = await UserModel.findOneAndDelete({ userID: userID });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  adminRoute
};
