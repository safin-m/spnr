import { useState } from "react";
import Wheel from "./Wheel";
import "./WheelContainer.css";
import { VscDebugStart } from "react-icons/vsc";
import { MdStart } from "react-icons/md";

interface WheelItem {
  value: string;
  type: string;
  color: string;
  [key: string]: string;
}

interface WheelContainerProps {
  wheelItems: WheelItem[];
}

const WheelContainer: React.FC<WheelContainerProps> = ({ wheelItems }) => {
  const [spinReady, setSpinReady] = useState(false);

  const spinMenuHandler = () => {
    setSpinReady(true);
  };

  return (
    <div
      style={{
        width: spinReady ? "60%" : "40%",
      }}
      className="wheel-container"
    >
      <div className="wheel">
        <Wheel
          items={wheelItems}
          onSpinEnd={(value: string) => console.log(value)}
        />
      </div>
      {spinReady ? (
        <div className="form">
          <h4 style={{ color: "blanchedalmond" }}>Try Your Luck!</h4>
          <input type="text" className="form-input" placeholder="Your Name" />
          <input type="text" className="form-input" placeholder="Your Email" />
          <VscDebugStart className="btn-spin" />
        </div>
      ) : (
        <MdStart className="btn-spin" onClick={spinMenuHandler} />
      )}
    </div>
  );
};

export default WheelContainer;
