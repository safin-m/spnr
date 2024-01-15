import { useState } from "react";
import "./App.css";
import WheelMaker from "./components/WheelMaker";
import WinnerList from "./components/WinnerList";

interface WheelItem {
  value: string;
  type: string;
  color: string;
}

const App = () => {
  const [wheelItems, setWheelItems] = useState<WheelItem[]>([]);

  return (
    <div className="app">
      <WheelMaker setWheelItems={setWheelItems} />
      <WinnerList />
    </div>
  );
};

export default App;
