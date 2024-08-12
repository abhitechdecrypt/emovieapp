import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookMovies, getMoviesById } from '../services/service'; // Ensure you have the bookMovie service
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function BookMovies() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cinemas, setCinemas] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState('');
    const [seats, setSeats] = useState(1); // Default to 1 seat
    const [selectedDate, setSelectedDate] = useState(''); // New state for selected date
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const movieData = await getMoviesById(id);
                setMovie(movieData);
                setCinemas(movieData.cinemas.filter(cinema => !cinema.blocked));
            } catch (e) {
                console.error('Error fetching movie:', e);
            }
        };
        const getUserData = Cookies.get('token');
        const userInfo = jwtDecode(getUserData);
        console.log(userInfo);
        setUserData(userInfo?.userData || {});

        fetchMovieData();
    }, [id]);

    const handleBooking = async (event) => {
        event.preventDefault();
        if (!selectedCinema || !selectedDate) {
            Swal.fire({
                title: 'Incomplete Information',
                text: 'Please select a cinema and a booking date to proceed.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay'
            });
            return;
        }

        try {
            const bookingDetails = {
                movieId: movie.id,
                cinemaId: parseInt(selectedCinema),
                bookingDate: new Date(selectedDate).toISOString(), // Use selected date
                seats: seats,
                name: userData?.username,
                email: userData?.email,
                bookingStatus: 'Pending'
            };

            const response = await bookMovies(bookingDetails);

            Swal.fire({
                title: 'Booking Confirmed',
                text: `Your booking for "${movie.title}" at the selected cinema on ${new Date(selectedDate).toLocaleDateString()} has been confirmed.`,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay'
            });

            // Reset form or redirect user as needed
        } catch (e) {
            console.error('Error booking movie:', e);
            Swal.fire({
                title: 'Booking Failed',
                text: 'There was an issue with your booking. Please try again later.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay'
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-slate-300 rounded-lg shadow-md m-20">
            {movie ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Book Movie</h2>
                    <div className="mb-4">
                        <img src={movie.image} alt={movie.title} className="w-full h-96 mb-4 rounded-md" />
                        <p className="text-lg font-semibold">{movie.title}</p>
                        <p className="text-lg">Director: {movie.director.trim()}</p>
                        <p className="text-lg">Genre: {movie.genre}</p>
                        <p className="text-lg">Duration: {movie.length} mins</p>
                        <p className="text-lg">Language: {movie.language}</p>
                    </div>

                    <form onSubmit={handleBooking}>
                        <div className="mb-4">
                            <label htmlFor="cinema" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Cinema
                            </label>
                            <select
                                id="cinema"
                                value={selectedCinema}
                                onChange={(e) => setSelectedCinema(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Select a Cinema</option>
                                {cinemas.map(cinema => (
                                    <option key={cinema.id} value={cinema.id}>
                                        {cinema.name} - {cinema.address}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Seats
                            </label>
                            <input
                                type="number"
                                id="seats"
                                value={seats}
                                onChange={(e) => setSeats(Number(e.target.value))}
                                min="1"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Booking Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Book Now
                        </button>
                    </form>
                </div>
            ) : (
                <p>Loading movie details...</p>
            )}
        </div>
    );
}
