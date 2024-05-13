import { useState } from "react";
import mask from "../assets/mask.png";
import "../styles/createEvents.css";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Heading,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import Carousel from "../components/Carousels";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const CreateEvent = () => {
  const toast = useToast();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    eventDate: "",
    organizer: "",
    category: "Music",
    imageUrl: "",
    eventPlanner: "",
    time: "",
    mode: "offline",
    price: 0,
    location: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const validationErrors = {};
    if (!eventData.title.trim()) validationErrors.title = "Title is required";
    if (!eventData.description.trim())
      validationErrors.description = "Description is required";
    if (!eventData.eventDate)
      validationErrors.eventDate = "Event date is required";
    if (!eventData.organizer.trim())
      validationErrors.organizer = "Organizer is required";
    if (!eventData.imageUrl.trim())
      validationErrors.imageUrl = "Image URL is required";
    if (!eventData.eventPlanner.trim())
      validationErrors.eventPlanner = "Event planner is required";
    if (!eventData.time.trim()) validationErrors.time = "Time is required";
    if (!eventData.location.trim())
      validationErrors.location = "Location is required";
    if (eventData.price < 0)
      validationErrors.price = "Price cannot be negative";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await fetch("https://eventspark-ldbp.onrender.com/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        toast({
          title: "Event created successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEventData({
          title: "",
          description: "",
          eventDate: "",
          organizer: "",
          category: "Music",
          imageUrl: "",
          eventPlanner: "",
          time: "",
          mode: "offline",
          price: 0,
          location: "",
        });
      } else {
        toast({
          title: "Error creating event.",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error creating event.",
        description: error.message || "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    <Navbar/>
      <Carousel />
      <div className="container mx-auto mt-12 mb-11 p-4 rounded-lg shadow-md">
        <div
          className="bg-white bg-opacity-70 p-8 rounded-lg relative"
          style={{
            backgroundImage: `url(${mask})`,
            backgroundSize: "cover",
            backdropFilter: "blur(8px)",
            minHeight: "100vh",
          }}
        >
          {/* Create a pseudo-element to hold the background image */}
          <div className="absolute inset-0 z-[-1]">
            <div
              style={{
                backgroundImage: `url(${mask})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                opacity: "0.7",
              }}
            />
          </div>

          <Heading
            as="h1"
            size="3xl"
            mb={12}
            className="text-center "
            style={{
              background:
                "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CREATE A NEW EVENT ✨
          </Heading>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-1 w-full "
          >
            <FormControl isInvalid={!!errors.title} mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={eventData.title}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description} mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.eventDate} mb={4}>
              <FormLabel>Event Date</FormLabel>
              <Input
                type="date"
                name="eventDate"
                value={eventData.eventDate}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.eventDate}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.organizer} mb={4}>
              <FormLabel>Organizer</FormLabel>
              <Input
                name="organizer"
                value={eventData.organizer}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.organizer}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.imageUrl} mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                value={eventData.imageUrl}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.eventPlanner} mb={4}>
              <FormLabel>Event Planner</FormLabel>
              <Input
                name="eventPlanner"
                value={eventData.eventPlanner}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.eventPlanner}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.time} mb={4}>
              <FormLabel>Time</FormLabel>
              <Input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.time}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.location} mb={4}>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={eventData.location}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.location}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.mode} mb={4}>
              <FormLabel>Mode</FormLabel>
              <Select
                name="mode"
                value={eventData.mode}
                onChange={handleChange}
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </Select>
              <FormErrorMessage>{errors.mode}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.price} mb={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={eventData.price}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              mt={4}
              className="w-full transition duration-300 ease-in-out transform hover:scale-105 radial-gradient-bg"
            >
              Create Event
            </Button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CreateEvent;
