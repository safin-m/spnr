import { useState } from "react";
import "./WheelMaker.css";
import { MdAdd } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

interface WheelItem {
  value: number;
  type: string;
  color: string;
  [key: string]: any;
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
    { value: 5, type: "Fixed", color: "#000000" },
  ]);

  const addNewItemFieldHandler = () => {
    setItemFields((prevItems) => [
      ...prevItems,
      { value: 5, type: "Fixed", color: "#000000" },
    ]);
  };
  const setWheelItemsHandler = () => {
    if (
      itemFields.every((item) => {
        return item.value < 1;
      })
    ) {
      alert("Please insert value above 0");
      return;
    }
    setWheelItems(itemFields);
    setWheelActive(true);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const values = [...itemFields];
    if (
      event.target.name === "value" &&
      event.target instanceof HTMLInputElement &&
      event.target.valueAsNumber <= 0
    ) {
      alert("Value must be greater than zero");

      return;
    }
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
              type="number"
              name="value"
              min="1"
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
