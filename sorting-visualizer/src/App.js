import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <HamburgerMenu /> */}
        <main>
          <Routes>
            <Route path="/" element={<SortingVisualizer />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
