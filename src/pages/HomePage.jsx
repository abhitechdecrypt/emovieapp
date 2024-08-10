// src/HomePage.js
import React, { useEffect, useRef, useState } from "react";
import avatar from "../assets/images/avtar.jpeg";
import nowayHome from "../assets/images/spider-man.jpeg";
import Interstellar from "../assets/images/Interstellar.jpeg";
import Inception from "../assets/images/Inception.jpeg";
import darkKnight from "../assets/images/darkknight.jpeg";
import BookCard from "../components/BookCard";
import axios from "axios";
import { BASE_URL, SUB_URL_MOVIES } from "../services/API_CONSTANT";

// Hardcoded data for featured movies and other movies
const featuredMovies = [
   {
      id: 1,
      title: "Avatar: The Way of Water",
      description: "The sequel to the 2009 film Avatar.",
      genre: "Sci-Fi",
      posterUrl: avatar,
   },
   {
      id: 2,
      title: "Spider-Man: No Way Home",
      description: "Spider-Man comes across his biggest challenge yet.",
      genre: "Action",
      posterUrl: nowayHome,
   },
   {
      id: 3,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space.",
      genre: "Sci-fication",
      posterUrl: Interstellar,
   },
   {
      id: 4,
      title: "Avatar: The Way of Water",
      description: "The sequel to the 2009 film Avatar.",
      genre: "Sci-Fi",
      posterUrl: avatar,
   },
   {
      id: 5,
      title: "Spider-Man: No Way Home",
      description: "Spider-Man comes across his biggest challenge yet.",
      genre: "Action",
      posterUrl: nowayHome,
   },
   {
      id: 6,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space.",
      genre: "Sci-fication",
      posterUrl: Interstellar,
   },
   {
      id: 7,
      title: "Avatar: The Way of Water",
      description: "The sequel to the 2009 film Avatar.",
      genre: "Sci-Fi",
      posterUrl: avatar,
   },
   {
      id: 8,
      title: "Spider-Man: No Way Home",
      description: "Spider-Man comes across his biggest challenge yet.",
      genre: "Action",
      posterUrl: nowayHome,
   },
   {
      id: 9,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space.",
      genre: "Sci-fication",
      posterUrl: Interstellar,
   },
];

const movies = [
   {
      id: 1,
      title: "Inception",
      description:
         "A thief who enters the dreams of others to steal secrets from their subconscious.",
      genre: "Sci-Fi",
      posterUrl: Inception,
   },
   {
      id: 2,
      title: "The Dark Knight",
      description:
         "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc on Gotham.",
      genre: "Action",
      posterUrl: darkKnight,
   },
   {
      id: 3,
      title: "The Dark Knight",
      description:
         "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc on Gotham.",
      genre: "Action",
      posterUrl: darkKnight,
   },
   {
      id: 4,
      title: "The Dark Knight",
      description:
         "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc on Gotham.",
      genre: "Action",
      posterUrl: darkKnight,
   },
   // Add more movies
];

const HomePage = () => {
   const [flippedCardIndex, setFlippedCardIndex] = useState(null);
   const [showLeftArrow, setShowLeftArrow] = useState(false);
   const [showRightArrow, setShowRightArrow] = useState(true);
   const [movieList, setMovieList] = useState(null);
   const carouselRef = useRef(null);
 
   const handleCardClick = (index) => {
     setFlippedCardIndex(index === flippedCardIndex ? null : index);
   };
 
   const getScrollDistance = () => {
      // Default scroll distance
      let distance = 600;
      
      // Adjust for mobile view
      if (window.innerWidth < 768) { // You can adjust this breakpoint as needed
        distance = 250;
      }
  
      return distance;
    };
   const scrollLeft = () => {
     carouselRef.current.scrollBy({ left: -getScrollDistance(), behavior: "smooth" });
   };
 
   const scrollRight = () => {
     carouselRef.current.scrollBy({ left: getScrollDistance(), behavior: "smooth" });
   };
 
   const checkScrollPosition = () => {
     const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
     setShowLeftArrow(scrollLeft > 0);
     setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
   };
 
   useEffect(() => {
     checkScrollPosition();
     window.addEventListener('resize', checkScrollPosition);
     return () => window.removeEventListener('resize', checkScrollPosition);
   }, []);
 
   useEffect(()=>{
    axios.get(BASE_URL+SUB_URL_MOVIES+"movies").then((res)=>{
      console.log(res?.data);
      setMovieList(res.data.data);
    }).catch((err)=>{
      console.error("Error fetching movies: ",err);

    });
   })

   return (
     <div className="p-6 bg-gray-100 min-h-screen">
       {/* Featured Movies Carousel */}
       <section className="mb-12">
         <h2 className="text-3xl font-bold mb-4 text-gray-800">Newly Arrival</h2>
         <div className="relative">
           {showLeftArrow && (
             <button
               onClick={scrollLeft}
               className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-400 text-white p-2 rounded-e-full z-10 shadow-lg shadow-slate-800"
             >
               &larr;
             </button>
           )}
           {showRightArrow && (
             <button
               onClick={scrollRight}
               className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-400 text-white p-2 rounded-s-full z-10"
             >
               &rarr;
             </button>
           )}
           <div
             ref={carouselRef}
             className="flex overflow-x-hidden no-scrollbar space-x-4 pb-4"
             onScroll={checkScrollPosition}
           >
             {featuredMovies.map((movie, index) => (
               <div
                 key={movie.id}
                 className="flex-none w-64 bg-white rounded-lg transition-transform duration-300 hover:w-80 cursor-pointer"
                 onClick={() => handleCardClick(index)}
               >
                 <BookCard movie={movie} />
               </div>
             ))}
           </div>
         </div>
       </section>
 
       {/* Movies Grid */}
       <section>
         <h2 className="text-3xl font-bold mb-4 text-gray-800">Currently in Cinemas</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {movies.map((movie) => (
             <div key={movie.id} className="bg-white p-4 rounded-lg shadow-lg">
               <img
                 src={movie.posterUrl}
                 alt={movie.title}
                 className="w-full h-64 object-cover rounded-md"
               />
               <h2 className="text-xl font-semibold mt-4">{movie.title}</h2>
               <p className="text-gray-600 mt-2">{movie.description}</p>
               <div className="mt-4">
                 <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                   {movie.genre}
                 </span>
               </div>
             </div>
           ))}
         </div>
       </section>
       {movieList}
     </div>
   );
 };
 
 export default HomePage;