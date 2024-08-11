import React, { useEffect, useState } from "react";
import { blockUnblockCinema, getCinemaList } from "../services/service";

const ViewCinema = () => {
   const [cinemas, setCinemas] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   // Fetch cinema data from backend
   useEffect(() => {
      const getCinemaData = async () => {
         setLoading(true);
         try {
            const response = await getCinemaList();
            console.log("Cinema Data ::", response);
            setCinemas(response || []); // Ensure cinemas is always an array
         } catch (error) {
            setError("Failed to load cinemas");
            console.error("Error fetching cinemas:", error);
         } finally {
            setLoading(false);
         }
      };

      getCinemaData();
   }, []);

   const handleUnblockAndBlockCinema = async (id) => {
      setLoading(true);
      try {
         const response = await blockUnblockCinema(id);
         console.log("Cinema Data ::", response);
         setCinemas(response || []); 
         window.location.reload();
      } catch (error) {
         setError("Failed to update cinema status");
         console.error("Error updating cinema:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="max-w-4xl mx-auto p-4">
         <h2 className="text-2xl font-bold mb-6">Cinemas</h2>

         {loading && <p className="text-blue-500">Loading...</p>}
         {error && <p className="text-red-500">{error}</p>}

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cinemas.map((cinema) => (
               <div key={cinema.id} className="bg-gray-100 p-4 rounded-lg shadow-lg relative">
                  <h3 className="text-xl font-semibold mb-2">{cinema.name}</h3>
                  <p className="text-gray-700 mb-2">
                     <strong>Address:</strong> {cinema.address}
                  </p>
                  <p className="text-gray-700 mb-2">
                     <strong>Total Screens:</strong> {cinema.totalScreens}
                  </p>
                  <p className="text-gray-700 mb-2">
                     <strong>Total Seats:</strong> {cinema.totalSeats}
                  </p>
                  <p className="text-gray-700 mb-2">
                     <strong>Facilities:</strong> {cinema.facilities}
                  </p>
                  <p
                     className={`text-gray-700 font-semibold ${
                        cinema.blocked ? "text-red-500" : "text-green-500"
                     }`}
                  >
                     {cinema.blocked ? "Blocked" : "Available"}
                  </p>
                  <button
                     className={`absolute p-3 rounded-full right-2 bottom-3 ${
                        cinema.blocked ? "bg-green-600" : "bg-red-600"
                     }`}
                     onClick={() => handleUnblockAndBlockCinema(cinema.id)}
                  >
                     {cinema.blocked ? "Unblock Cinema" : "Block Cinema"}
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ViewCinema;
