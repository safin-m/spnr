// Wheel.tsx
import React, { useState, useEffect } from "react";
import "./Wheel.css";

interface WheelItem {
  name: string;
  color: string;
}

interface WheelProps {
  items: WheelItem[];
}

const Wheel: React.FC<WheelProps> = ({ items }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    spinWheel();
  }, []);

  const spinWheel = () => {
    const newRotation = Math.floor(Math.random() * 360);
    setRotation(newRotation);
  };

  return (
    <div className="wheel-container" onClick={spinWheel}>
      {items.map((item, index) => (
        <div
          key={index}
          className="wheel-item"
          style={{
            backgroundColor: item.color,
            transform: `rotate(${
              index * (360 / items.length)
            }deg) translateY(-50%)`,
          }}
        >
          <span
            style={{ transform: `rotate(-${index * (360 / items.length)}deg)` }}
          >
            {item.name}
          </span>
        </div>
      ))}
      <div
        className="wheel-pointer"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
};

export default Wheel;
