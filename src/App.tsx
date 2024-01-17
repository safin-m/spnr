import { useState } from "react";
import "./App.css";
import WheelMaker from "./components/WheelMaker";
import WinnerList from "./components/WinnerList";
import WheelContainer from "./components/WheelContainer";

interface WheelItem {
  value: number;
  type: string;
  color: string;
  [key: string]: any;
}

interface Winner {
  name: string;
  email: string;
  discount: string;
}

const App = () => {
  const [wheelItems, setWheelItems] = useState<WheelItem[]>([]);
  const [wheelActive, setWheelActive] = useState(false);
  const [winners, setWinners] = useState<Winner[]>([]);

  return (
    <div className="app">
      {wheelActive ? (
        <WheelContainer
          wheelItems={wheelItems}
          setWinners={setWinners}
          winners={winners}
          setWheelActive={setWheelActive}
        />
      ) : (
        <WheelMaker
          setWheelItems={setWheelItems}
          setWheelActive={setWheelActive}
        />
      )}
      <WinnerList winners={winners} />
    </div>
  );
};

export default App;
