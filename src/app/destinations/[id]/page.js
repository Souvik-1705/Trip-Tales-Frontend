import { getDestinationById } from "@/services/api";
import "@/styles/destination-details.css";
import Link from "next/link";

export async function generateMetadata({params}){
    const {id}=await params;
    const destination=await getDestinationById(id);

    return{
        title:`${destination.name} Trip | TripTales`,
        description:destination.description,
    };
}


export default async function DestinationDetails({params}){
    const { id }=await params;
    const destination=await getDestinationById(id);

    if(!destination){
        return(
            <p>Destination not found</p>
        )
    }
    return(
        <div className="details-container">
            <div className="details-image">
                <img src={destination.image} alt={destination.name}/>
            </div>
            <div className="details-content">
            <h1>{destination.name}</h1>
            <p className="country">{destination.country}</p>
            <p className="description">{destination.description}</p>
            <p className="price">₹{destination.price}</p>
            <Link href={`/booking/${destination._id}`}><button className="book-btn">Book This Trip</button></Link>
            </div>
        </div>
    )
}