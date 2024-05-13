import {Container} from "@chakra-ui/react"
import { EventsCard, EventsNav } from "./eventcard";
import { VideoTextComponent } from "./eventpage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const EventPage = () => {
    return (
        <>
        <Navbar/>
         <VideoTextComponent/>
        <EventsNav/>
        <Footer/>
        </>
    );
  };