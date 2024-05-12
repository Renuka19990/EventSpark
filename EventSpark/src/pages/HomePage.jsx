
// import Carousel from "../components/Carousels"
import GridBlurredBackdrop from "../components/CustomerReview"
import EventRelatedButtons from "../components/EventRelatedButtons"
import MagicBanner from "../components/MagicBanner"
import TopDestinationsIndia from "../components/TopDestinations"
import TrendingEvents from "../components/TrendingEvents"

const HomePage = () => {
  return (
    <div>
      {/* <Carousel/> */}
      <MagicBanner/>
      <EventRelatedButtons/>
      <TrendingEvents/>
      <TopDestinationsIndia/>
      <GridBlurredBackdrop/>
    </div>
  )
}

export default HomePage
