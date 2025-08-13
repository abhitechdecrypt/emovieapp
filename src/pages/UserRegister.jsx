import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { registerUser } from "../services/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    userRole: "USER", // Default role
    accountStatus: "ACTIVE",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("User Name is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
      .required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    userRole: Yup.string()
      .oneOf(["USER", "ADMIN"], "Invalid Role")
      .required("Role is required"),
  });

  const handleSubmit = async (values) => {
    console.log("Form Data Submitted:", values);
    try {
      await registerUser(values);
      toast.success("User Registered successfully", {
        onClose: () => {
          navigate("/user-login");
        },
      });
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-[90vh] relative overflow-hidden"
      style={{
        background: "linear-gradient(120deg, #2563eb 0%, #60a5fa 100%)",
      }}
    >
      {/* Decorative clipped background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          background: "linear-gradient(120deg, #2563eb 60%, #60a5fa 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 65%, 70% 100%, 80% 85%)", // updated for more dynamic effect
          filter: "blur(4px)",
          opacity: 0.7,
        }}
      />
      {/* Register Card */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-2xl z-10">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-700 drop-shadow">
          Register
        </h2>
        <h3 className="text-3xl text-center text-blue-600">Welcome</h3>
        <h5 className="text-2xl text-center text-blue-400 mb-4">
          Please register to the enjoy the some internal features of the eMovies
          Booking Applications
        </h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    User Name
                  </label>
                  <Field
                    type="text"
                    id="userName"
                    name="userName"
                    className={`mt-1 block w-full px-3 py-3 border border-blue-300 rounded-lg shadow-sm ${
                      errors.userName && touched.userName
                        ? "border-red-500"
                        : "focus:outline-none focus:ring-2 focus:ring-blue-400"
                    } sm:text-sm`}
                  />
                  {errors.userName && touched.userName && (
                    <div className="text-red-500 text-sm">
                      {errors.userName}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={`mt-1 block w-full px-3 py-3 border border-blue-300 rounded-lg shadow-sm ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "focus:outline-none focus:ring-2 focus:ring-blue-400"
                    } sm:text-sm`}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`mt-1 block w-full px-3 py-3 border border-blue-300 rounded-lg shadow-sm ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "focus:outline-none focus:ring-2 focus:ring-blue-400"
                    } sm:text-sm`}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className={`mt-1 block w-full px-3 py-3 border border-blue-300 rounded-lg shadow-sm ${
                      errors.phoneNumber && touched.phoneNumber
                        ? "border-red-500"
                        : "focus:outline-none focus:ring-2 focus:ring-blue-400"
                    } sm:text-sm`}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="text-red-500 text-sm">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className={`mt-1 block w-full px-3 py-3 border border-blue-300 rounded-lg shadow-sm ${
                      errors.address && touched.address
                        ? "border-red-500"
                        : "focus:outline-none focus:ring-2 focus:ring-blue-400"
                    } sm:text-sm`}
                  />
                  {errors.address && touched.address && (
                    <div className="text-red-500 text-sm">{errors.address}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="userRole"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <Field
                    as="select"
                    id="userRole"
                    name="userRole"
                    className="mt-1 block w-full px-3 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-sm"
                  >
                    <option
                      value="USER"
                      className="rounded-full bg-blue-100 text-blue-700 font-semibold"
                    >
                      User
                    </option>
                    <option value="ADMIN">Admin</option>
                  </Field>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
