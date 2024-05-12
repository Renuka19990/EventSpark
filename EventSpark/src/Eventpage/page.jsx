import {Container} from "@chakra-ui/react"
import { EventsCard, EventsNav } from "./eventcard";
import { VideoTextComponent } from "./eventpage";
import Navbar from "../components/Navbar";

export const EventPage = () => {
    return (
        <>
      <Container maxW={'7xl'}>
         <VideoTextComponent/>
        <EventsNav/>
      </Container>
        </>
    );
  };