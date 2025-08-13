import { toast, ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./Login/AuthProvider";
import { use, useEffect } from "react";

function App() {
   useEffect(() => {
      toast.info("Welcome to the application! Please log in to continue.", {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   },[])
   
   return (
      <AuthProvider>
         <ToastContainer
                style={{ zIndex: '10000' }}
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
