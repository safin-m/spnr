import { useState, useEffect } from "react";
import Wheel from "./Wheel";
import "./WheelContainer.css";
import { MdStart } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

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

interface WheelContainerProps {
  wheelItems: WheelItem[];
  setWinners: React.Dispatch<React.SetStateAction<Winner[]>>;
  winners: Winner[];
  setWheelActive: (active: boolean) => void;
}

const WheelContainer: React.FC<WheelContainerProps> = ({
  wheelItems,
  setWinners,
  winners = [],
  setWheelActive,
}) => {
  const [spinReady, setSpinReady] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (clicked) {
      const isValid = validateInput();
      if (!isValid) return;
      if (
        winners.some((winner) => {
          return winner.email === email;
        })
      ) {
        alert("You've already won");
        setClicked(false);
        return;
      } else {
        setWinners((prevWinners: Winner[]): Winner[] => [
          ...prevWinners,
          { name, email, discount },
        ]);
      }
      setClicked(false);
    }
  }, [clicked, name, email, discount]);

  const validateInput = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidName = name.trim() !== "";
    const isValidEmail = emailRegex.test(email);
    setIsValid(isValidName && isValidEmail);
    console.log(isValid);
    return isValidName && isValidEmail;
  };

  const spinMenuHandler = () => {
    setSpinReady(true);
  };

  const backHandler = () => {
    setWheelActive(false);
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
          onSpinEnd={(discount: WheelItem) => {
            setDiscount(discount.value + " " + discount.type);
            setClicked(true);
          }}
          multiplier={multiplier}
          validateInput={validateInput}
        />
      </div>
      {spinReady ? (
        <div className="form">
          <IoIosArrowBack className="btn-spin" onClick={backHandler} />
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
          <input
            type="number"
            className="form-input"
            placeholder="Duration in Seconds"
            value={multiplier}
            onChange={(e) => setMultiplier(parseInt(e.target.value))}
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
