import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import axiosInstance from "../services/AxiosInstance";
import { addMovies, getCinemaList } from "../services/service";

// Validation Schema
const validationSchema = Yup.object({
   title: Yup.string().required("Title is required"),
   director: Yup.string().required("Director is required"),
   image: Yup.string().url("Invalid URL").required("Image URL is required"),
   ratings: Yup.string().required("Ratings are required"),
   genre: Yup.string().required("Genre is required"),
   length: Yup.string().required("Length is required"),
   releasedDate: Yup.date().required("Released date is required"),
   language: Yup.string().required("Language is required"),
   cinemas: Yup.array().min(1, "At least one cinema must be selected"),
});

const AddMovies = () => {
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

   const formik = useFormik({
      initialValues: {
         title: "",
         director: "",
         image: "",
         ratings: "",
         genre: "",
         length: "",
         releasedDate: "",
         language: "",
         cinemas: [], // List of selected cinema IDs
      },
      validationSchema,
      onSubmit: async (values) => {
         try {
            // Transform cinemas array to the desired format
            const formattedValues = {
               ...values,
               cinemas: values.cinemas.map((id) => ({ id })), // Transform IDs to the format { id: ... }
            };

            await addMovies(formattedValues);
            alert("Movie added successfully!");
         } catch (error) {
            console.error("Error adding movie:", error);
            alert("Failed to add movie");
         }
      },
   });

   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;

   return (
      <div className="p-6 m-4 max-w-lg mx-auto bg-slate-200 rounded-lg shadow-md">
         <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
         <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
               <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
               </label>
               <input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                     formik.touched.title && formik.errors.title
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
               />
               {formik.touched.title && formik.errors.title ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
               ) : null}
            </div>

            <div className="mb-6">
               <label htmlFor="director" className="block text-sm font-medium text-gray-700">
                  Director
               </label>
               <input
                  type="text"
                  id="director"
                  name="director"
                  value={formik.values.director}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                     formik.touched.director && formik.errors.director
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
               />
               {formik.touched.director && formik.errors.director ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.director}</p>
               ) : null}
            </div>

            <div className="mb-6">
               <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
               </label>
               <input
                  type="text"
                  id="image"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                     formik.touched.image && formik.errors.image
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
               />
               {formik.touched.image && formik.errors.image ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.image}</p>
               ) : null}
            </div>

            <div className="mb-6">
               <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">
                  Ratings
               </label>
               <input
                  type="text"
                  id="ratings"
                  name="ratings"
                  value={formik.values.ratings}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                     formik.touched.ratings && formik.errors.ratings
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
               />
               {formik.touched.ratings && formik.errors.ratings ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.ratings}</p>
               ) : null}
            </div>

            <div className="mb-6">
               <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                  Genre
               </label>
               <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={formik.values.genre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                     formik.touched.genre && formik.errors.genre
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
               />
               {formik.touched.genre && formik.errors.genre ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.genre}</p>
               ) : null}
            </div>

            <div className="mb-6">
               <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                  Length
               </label>
               <input
                  type="text"
                  id="length"
                  name="length"
                  value={formik.values.length}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                     formik.touched.length && formik.errors.length
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
               />
               {formik.touched.length && formik.errors.length ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.length}</p>
               ) : null}
            </div>

            <div className="mb-6">
               <label htmlFor="releasedDate" className="block text-sm font-medium text-gray-700">
                  Released Date
               </label>
               <input
                  type="date"
                  id="releasedDate"
                  name="releasedDate"
                  value={formik.values.releasedDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                     formik.touched.releasedDate && formik.errors.releasedDate
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
               />
               {formik.touched.releasedDate && formik.errors.releasedDate ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.releasedDate}</p>
               ) : null}
            </div>

            <div className="mb-6">
               <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Language
               </label>
               <input
                  type="text"
                  id="language"
                  name="language"
                  value={formik.values.language}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                     formik.touched.language && formik.errors.language
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
               />
               {formik.touched.language && formik.errors.language ? (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.language}</p>
               ) : null}
            </div>

            <div className="mb-6">
               <label htmlFor="cinemas" className="block text-sm font-medium text-gray-700">
                  Cinemas
               </label>
               <div className="relative">
                  <select
                     id="cinemas"
                     name="cinemas"
                     multiple
                     value={formik.values.cinemas}
                     onChange={(event) => {
                        const options = event.target.options;
                        const selectedValues = Array.from(options)
                           .filter((option) => option.selected)
                           .map((option) => option.value);

                        formik.setFieldValue("cinemas", selectedValues);
                     }}
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                     {cinemas
                        .filter((cinema) => !cinema.blocked) // Filter out blocked cinemas
                        .map((cinema) => (
                           <option key={cinema.id} value={cinema.id}>
                              {cinema.name}
                           </option>
                        ))}
                  </select>
                  {formik.touched.cinemas && formik.errors.cinemas ? (
                     <p className="text-red-500 text-xs mt-1">{formik.errors.cinemas}</p>
                  ) : null}
               </div>
            </div>

            <button
               type="submit"
               className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
               Add Movie
            </button>
         </form>
      </div>
   );
};

export default AddMovies;
