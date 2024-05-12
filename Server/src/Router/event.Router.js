const express = require('express');
const { getEvents, addEvent, eventData, event, updateEvent, deleteEvent } = require('../Controller/event.controller');
const { auth } = require('../middleware/auth.middleare');
const { access } = require('../middleware/rolebased.middleware');
const eventRoute = express.Router();



// Routes for getting all events and adding a new event
eventRoute.get('/events', getEvents);
eventRoute.post('/addevents',auth,access("user"), addEvent);

// Routes for getting particular user's events and particular event
eventRoute.get('/events/user/:id',auth,access("user","admin"), eventData);
eventRoute.get('/events/:id',auth,access("user"), event);

// Routes for updating and deleting events
eventRoute.patch('/events/:id',auth,access("user"), updateEvent);
eventRoute.delete('/events/:id',auth,access("user"), deleteEvent);

module.exports = {eventRoute};
