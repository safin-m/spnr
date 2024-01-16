import { useState, useEffect } from "react";
import Wheel from "./Wheel";
import "./WheelContainer.css";
import { MdStart } from "react-icons/md";

interface WheelItem {
  value: string;
  type: string;
  color: string;
  [key: string]: string;
}
interface Winner {
  name: string;
  email: string;
  discount: string;
}

interface WheelContainerProps {
  wheelItems: WheelItem[];
  setWinners: React.Dispatch<React.SetStateAction<Winner[]>>;
}

const WheelContainer: React.FC<WheelContainerProps> = ({
  wheelItems,
  setWinners,
}) => {
  const [spinReady, setSpinReady] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    if (clicked) {
      setWinners((prevWinners: Winner[]): Winner[] => [
        ...prevWinners,
        { name, email, discount },
      ]);
      setClicked(false);
    }
  }, [clicked, name, email, discount]);

  const spinMenuHandler = () => {
    setSpinReady(true);
  };

  //const winnerHandler = () => {};

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
          onSpinEnd={(discount: WheelItem) => {
            setDiscount(discount.value + " " + discount.type);
            setClicked(true);
          }}
        />
      </div>
      {spinReady ? (
        <div className="form">
          <h4 style={{ color: "blanchedalmond" }}>
            Try Your Luck! Click On The Wheel
          </h4>
          <input
            type="text"
            className="form-input"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <VscDebugStart className="btn-spin" onClick={winnerHandler} />*/}
        </div>
      ) : (
        <MdStart className="btn-spin" onClick={spinMenuHandler} />
      )}
    </div>
  );
};

export default WheelContainer;
