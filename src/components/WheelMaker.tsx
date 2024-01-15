import React from "react";
import "./WheelMaker.css";
import { MdAdd } from "react-icons/md";

interface WheelItem {
  value: string;
  type: string;
  color: string;
}

interface WheelMakerProps {
  setWheelItems: (items: WheelItem[]) => void;
}

const WheelMaker: React.FC<WheelMakerProps> = ({ setWheelItems }) => {
  return (
    <div className="wheel-maker">
      <div className="wheel-maker-nameplate">
        <h5 style={{ color: "blanchedalmond" }}>Value</h5>
        <h5 style={{ color: "blanchedalmond" }}>Type</h5>
        <h5 style={{ color: "blanchedalmond" }}>Color</h5>
      </div>
      <div className="wheel-maker-items-container">
        <MdAdd className="btn" />
        <div className="wheel-maker-item">
          <input></input>
          <select>
            <option value="%">%</option>
            <option value="Fixed">Fixed</option>
          </select>
          <input type="color" />
        </div>
      </div>
    </div>
  );
};

export default WheelMaker;
