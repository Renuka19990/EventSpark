
// import Carousel from "../components/Carousels"
import GridBlurredBackdrop from "../components/CustomerReview"
import EventRelatedButtons from "../components/EventRelatedButtons"
import Footer from "../components/Footer"
import MagicBanner from "../components/MagicBanner"
import Navbar from "../components/Navbar"
import TopDestinationsIndia from "../components/TopDestinations"
import TrendingEvents from "../components/TrendingEvents"

const HomePage = () => {
  return (
    <div>
      {/* <Carousel/> */}
      <Navbar/>
      <MagicBanner/>
      <EventRelatedButtons/>
      <TrendingEvents/>
      <TopDestinationsIndia/>
      <GridBlurredBackdrop/>
      <Footer/>
    </div>
  )
}

export default HomePage
