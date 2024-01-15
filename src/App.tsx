import { useState } from "react";
import "./App.css";
import WheelMaker from "./components/WheelMaker";
import WinnerList from "./components/WinnerList";
import WheelContainer from "./components/WheelContainer";

interface WheelItem {
  value: string;
  type: string;
  color: string;
  [key: string]: string;
}

const App = () => {
  const [wheelItems, setWheelItems] = useState<WheelItem[]>([]);
  const [wheelActive, setWheelActive] = useState(false);

  return (
    <div className="app">
      {wheelActive ? (
        <WheelContainer wheelItems={wheelItems} />
      ) : (
        <WheelMaker
          setWheelItems={setWheelItems}
          setWheelActive={setWheelActive}
        />
      )}
      <WinnerList />
    </div>
  );
};

export default App;
