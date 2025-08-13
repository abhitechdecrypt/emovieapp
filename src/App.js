import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./Login/AuthProvider";
import { useEffect } from "react";
import Swal from "sweetalert2";

function App() {
  useEffect(() => {
    Swal.fire({
      title: "Welcome to eMovieApp!",
      text: "Dive into a world of movies. Discover, rate, and share your favorites!",
      icon: "info",
      confirmButtonText: "Let's Go!",
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  }, []);

  return (
    <AuthProvider>
      <ToastContainer
        style={{ zIndex: "10000" }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="App">
        <header className="App-header">
          <AppRoutes />
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
