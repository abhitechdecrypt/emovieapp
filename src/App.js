import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./Login/AuthProvider";

function App() {
   return (
      <AuthProvider>
         <div className="App">
            <header className="App-header">
               <AppRoutes />
            </header>
         </div>
      </AuthProvider>
   );
}

export default App;
