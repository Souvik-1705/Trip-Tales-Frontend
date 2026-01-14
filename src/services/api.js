const BASE_URL= `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function getAllDestinations(){
    const response=await fetch(`${BASE_URL}/destinations`,{
        cache:"no-store",
    });
    if(!response.ok){
        throw new Error("Failed to fetch destinations");
    }
    return response.json();
}

export async function getDestinationById(id){
    const response=await fetch(`${BASE_URL}/destinations/${id}`,{
        cache:"no-store",
    });
    if(!response.ok){
        throw new Error("Failed to fetch destination");
    }
    return response.json();
}
