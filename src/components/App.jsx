import StartScreen from "./StartScreen";
import FinishScreen from "./FinishScreen";

import { HashRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Quiz from "./Quiz";
import Ranking from "./Ranking";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<StartScreen />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/resultado" element={<FinishScreen />} />
          <Route path="/ranking" element={<Ranking />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
