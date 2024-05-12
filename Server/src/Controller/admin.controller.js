const { eventModel } = require("../Model/event.model");
const { UserModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
//for getting All USers User
const getUsers=async(req,res)=>{
    try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { minAge, maxAge, sort, search } = req.query;
    const query = {};
    
    //Age Filtration
    if (minAge && maxAge) {
        query.age = { $gte: minAge, $lte: maxAge };
      } else if (minAge) {
        query.age = { $lte: minAge };
      } else if (maxAge) {
        query.age = { $gte: maxAge };
      }

      // Added search functionality for searching name and Users
      if (search) {
        query.$or = [
          { username: { $regex: search, $options: "i" } }, // Case-insensitive search by product name
          { email: { $regex: search, $options: "i" } }, // Case-insensitive search by product description
        ];
      }


      const totalCount = await UserModel.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limit);

      // Adding sorting Based On the Enrolled Events
      const sortCriteria = {};
      if (sort === "desc") {
        sortCriteria.username = -1;
      }else if (sort === 'asc') {
        sortCriteria.username = 1;
      }
     
      //for skipping
      const skip = (page - 1) * limit;
      
      // Query products with filtering, searching, sorting, and pagination
      const users = await UserModel.find(query)
        .skip(skip)
        .sort(sortCriteria)
        .limit(limit);
 
      res.status(200).json({users,totalPages});
    }catch(err){
        console.error("Error While filtering, searching, and paginating products:",err );      
        res.status(500).json({ error: "Internal Server Error , Failed To get User's Details" });
    }
}

//for getting Particular User Based On userID
const userData=async(req,res)=>{
    const { id } = req.params;
    try{
    const userData= await UserModel.find({userID:id});
    if(!userData){
        return res.status(404).json({error:true,message:"User  Not Found"});
    }
    res.status(200).json({error:false,item:userData})
    }catch(error){
        console.log(error);
        res.status(404).json({error:true,message:error});
    }
}


//For Updating the User
const updateUser=async(req,res)=>{
    const { id } = req.params;
    const getUserData = req.body;
    try{
    const userData= await UserModel.find({userID:id});
    if(!userData){
        return res.status(404).json({error:true,msg:"User  Not Found So We Can't Update it"});
    }
    await UserModel.findOneAndUpdate({userID:id},getUserData);
    return res.status(200).json({ error: false});
    }catch(error){
    console.log(error);
    res.status(400).json({ error: true, msg:"user Not updated" });
    }
}


//for Deleting the User
const deleteUser=async(req,res)=>{
    const { id } = req.params;
    try{
    const userData= await UserModel.find({userID:id});
    if(!userData){
        return res.status(404).json({error:true,msg:"User  Not Found So We Can't Update it"});
    }
    await eventModel.deleteMany({ organizer: id });
    await UserModel.findOneAndDelete({userID:id});
    return res.status(200).json({ error: false,msg:"user Deleted Successfully"});
    }catch(error){
    console.log(error);
    res.status(400).json({ error: true, msg:"user Not Deleted" });
    }
}


//For Adding users in db by admin
const AddUser = async (req, res) => {
    const {
      userID,
      username,
      email,
      role,
      password,
      dateOfBirth,
      profilePicture,
      eventsBooked,
    } = req.body;
    try {
      // Checking if user already exists
      const user = await UserModel.findOne({ email });
      if (user) {
        return res
          .status(401)
          .json({ msg: "User is already registered. Please try to login." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const dob = new Date(dateOfBirth);
      const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));
      const newUserFields = {
        userID,
        username,
        email,
        role,
        password: hashedPassword,
        dateOfBirth: dob,
        profilePicture,
        age,
      };
      if (role) {
        newUserFields.role = role;
      }
      if (eventsBooked && eventsBooked.length > 0) {
        newUserFields.eventsBooked = eventsBooked;
      }
      const newUser = new UserModel(newUserFields);
      // Saving the new user
      await newUser.save();
      return res.status(201).json({ msg: "User registered successfully." });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        msg: "Failed to register user. Please provide correct details.",
      });
    }
  };


module.exports={deleteUser,updateUser,userData,getUsers,AddUser};