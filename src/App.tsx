import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./renderer/pages/MainPage";
import CreateAdPage from "./renderer/pages/CreateAdPage";
import Navbar from "./renderer/components/AppBar";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    // Provide Redux store to the app
    <Provider store={store}>
      {/* Set up routing */}
      <BrowserRouter>
        {/* Navigation bar shown on all pages */}
        <Navbar />

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create-ad" element={<CreateAdPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
