import "./App.css";
import { CartProvider } from "./Context/CartContext";
import Login from "./Pages/LoginPage/LoginPage";
import Routes from "./routes/routes";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <CartProvider>
        <Routes />
      </CartProvider>
    </div>
  );
}

export default App;
