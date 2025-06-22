import { Header } from "./components";
import { Analytics, Generator, History } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route index element={<Analytics />} />
          <Route path="generator" element={<Generator />} />
          <Route path="history" element={<History />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
