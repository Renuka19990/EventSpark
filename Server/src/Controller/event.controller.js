const { eventModel } = require("../Model/event.model");
const { UserModel } = require("../Model/user.model");




//for getting All Events
const getEvents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { minPrice, maxPrice, city, sort, search } = req.query;
        const query = {};

        // Price Filtration
        if (minPrice && maxPrice) {
            query.Price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            query.Price = { $gte: minPrice };
        } else if (maxPrice) {
            query.Price = { $lte: maxPrice };
        }

        // City (location) filtration
        if (city) {
            query.location = city;
        }

        // Added search functionality for searching title, category, eventPlanner, organizer
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { eventPlanner: { $regex: search, $options: "i" } },
                { organizer: { $regex: search, $options: "i" } },
            ];
        }

        const totalCount = await eventModel.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        // Adding sorting based on the event date
        const sortCriteria = {};
        if (sort === "desc") {
            sortCriteria.eventDate = -1;
        } else {
            sortCriteria.eventDate = 1;
        }

        // For skipping
        const skip = (page - 1) * limit;

        // Query events with filtering, searching, sorting, and pagination
        const events = await eventModel.find(query)
            .skip(skip)
            .sort(sortCriteria)
            .limit(limit);

        res.status(200).json({ events, totalPages });
    } catch (err) {
        console.error("Error while filtering, searching, and paginating events:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};


//for getting Particular User's all Events
const eventData = async (req, res) => {
    try {
        const userData= await UserModel.find({userID:id});
        if (!userData) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        const eventsArray = userData.eventsBooked;
        if (!eventsArray || eventsArray.length === 0) {
            return res.status(200).json({ error: false, message: "User has no booked events", item: userData });
        }
        const eventData = await eventModel.find({ eventId: { $in: eventsArray } });
        res.status(200).json({ error: false, item: eventData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};



//for getting Particular Event
const event=async(req,res)=>{
    const { id } = req.params;
    try{
    const eventData= await eventModel.findOne({eventId:id});;
    if(!eventData){
        return res.status(404).json({error:true,message:"event  Not Found"});
    }
    res.status(200).json({error:false,item:eventData})
    }catch(error){
        console.log(error);
        res.status(404).json({error:true,message:error});
    }
}


// POST route to add a new event
const addEvent =async (req, res) => {
    try {
        const {title,description,eventDate,category,imageUrl,mode,time,eventPlaner,Price,location,ticketTypes}=req.body;
        const events=await eventModel.find();
        let id=1;
        if(events&&events.length>0){
            events.sort((a, b) => a.eventId - b.eventId)
             id=events[events.length-1].eventId;
             id=id+1;
        }
        const eventId=id;
        const organizer=req.username;
        const newEvent = new eventModel({eventId,title,description,eventDate,mode,time,organizer,category,imageUrl,eventPlaner,Price,location,ticketTypes});
        const savedEvent = await newEvent.save();
        const Planner= await UserModel.findOneAndUpdate({ username: eventPlaner }, { $push: { eventsPlanned: eventId } }, { new: true }); 
        const user = await UserModel.findOneAndUpdate({ userID: req.userID }, { $push: { eventsBooked: eventId } }, { new: true }); 
        res.status(201).json({ success: true, event: savedEvent });    
    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Not able to add Event" });
    }
};

// const addEvent = async (req, res) => {
//     try {
//         const { title, description, eventDate, category, imageUrl, eventPlaner, Price, location, ticketTypes } = req.body;

//         const events = await eventModel.find();
//         let eventId = 1;

//         if (events.length > 0) {
//             events.sort((a, b) => b.eventId - a.eventId);
//             eventId = events[0].eventId + 1;
//         }

//         const organizer = req.username;
//         const newEvent = new eventModel({
//             eventId,
//             title,
//             description,
//             eventDate,
//             organizer,
//             category,
//             imageUrl,
//             eventPlaner,
//             Price,
//             location,
//             ticketTypes
//         });

//         const savedEvent = await newEvent.save();

//         const planner = await UserModel.findOneAndUpdate(
//             { username: eventPlaner },
//             { $push: { eventsPlanned: eventId } },
//             { new: true }
//         );

//         const user = await UserModel.findOneAndUpdate(
//             { userID: req.userID },
//             { $push: { eventsBooked: eventId } },
//             { new: true }
//         );

//         res.status(201).json({ success: true, event: savedEvent });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Unable to add event" });
//     }
// };



//for updating events



const updateEvent = async (req, res) => {
    const { id } = req.params;
    const eventId=id;
    try {
        const updatedEvent = await eventModel.findOneAndUpdate({ eventId: eventId }, req.body, { new: true });        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//for deleting events
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const eventId=id;
    try {
        const usersToUpdate = await UserModel.find({ plannedEvents: { $in: [eventId] } });        
        // Removing  the event ID from the plannedEvents array for each user

        for (const user of usersToUpdate) {
            user.plannedEvents = user.plannedEvents.filter(id => id !== eventId);
            await user.save();
        }

        const deletedEvent = await eventModel.findOneAndDelete({ eventId: eventId });        
        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports={getEvents,eventData,event,addEvent,updateEvent,deleteEvent};


