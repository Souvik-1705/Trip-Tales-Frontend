import Destinations from "@/components/Destinations/Destinations";
import Hero from "@/components/Hero/Hero";
import { getAllDestinations } from "@/services/api";

export default async function HomePage(){
  const destinations=await getAllDestinations();
  const homeDestinations=destinations.slice(0,6);
  return(
    <>
      <Hero/>
      <Destinations destinations={homeDestinations}/>
    </>
  )
}