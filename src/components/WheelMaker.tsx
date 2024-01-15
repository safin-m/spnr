import { useState } from "react";
import "./WheelMaker.css";
import { MdAdd } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

interface WheelItem {
  value: string;
  type: string;
  color: string;
  [key: string]: string;
}

interface WheelMakerProps {
  setWheelItems: (items: WheelItem[]) => void;
  setWheelActive: (active: boolean) => void;
}

const WheelMaker: React.FC<WheelMakerProps> = ({
  setWheelItems,
  setWheelActive,
}) => {
  const [itemFields, setItemFields] = useState<WheelItem[]>([
    { value: "default value", type: "Fixed", color: "#000000" },
  ]);

  const addNewItemFieldHandler = () => {
    setItemFields((prevItems) => [
      ...prevItems,
      { value: "default value", type: "Fixed", color: "#000000" },
    ]);
  };
  const setWheelItemsHandler = () => {
    setWheelItems(itemFields);
    console.log(itemFields);
    setWheelActive(true);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const values = [...itemFields];
    values[index][event.target.name] = event.target.value;
    setItemFields(values);
  };

  return (
    <div className="wheel-maker">
      <div className="wheel-maker-nameplate">
        <h5 style={{ color: "blanchedalmond" }}>Value</h5>
        <h5 style={{ color: "blanchedalmond" }}>Type</h5>
        <h5 style={{ color: "blanchedalmond" }}>Color</h5>
      </div>
      <div style={{ gridRow: 2 }}>
        <MdAdd className="btn" onClick={addNewItemFieldHandler} />
        <IoMdDoneAll className="btn" onClick={setWheelItemsHandler} />
      </div>
      <div className="wheel-maker-items-container">
        {itemFields.map((item, index) => (
          <div key={index} className="wheel-maker-item">
            <input
              name="value"
              onChange={(event) => handleInputChange(index, event)}
            ></input>
            <select
              name="type"
              value={item.type || "Fixed"}
              onChange={(event) => handleInputChange(index, event)}
            >
              <option value="%">%</option>
              <option value="Fixed">Fixed</option>
            </select>
            <input
              name="color"
              type="color"
              value={item.color || "#000000"}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WheelMaker;
