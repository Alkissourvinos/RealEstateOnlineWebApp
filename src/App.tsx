import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./renderer/pages/MainPage";
import CreateAdPage from "./renderer/pages/CreateAdPage";
import Navbar from "./renderer/components/AppBar";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create-ad" element={<CreateAdPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
