import Destinations from "@/components/Destinations/Destinations";
import { getAllDestinations } from "@/services/api";

export const metadata={
    title:"All destinations | TripTales",
    description:"Explore all travel destinations available on TripTales"
}

export default async function DestinationsPage(){
    const destinations=await getAllDestinations();
    return(
        <Destinations destinations={destinations}/>
    )
}