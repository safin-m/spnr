import React, { useRef, useEffect, useState } from "react";

interface WheelItem {
  value: number;
  type: string;
  color: string;
  [key: string]: any;
}

interface WheelProps {
  items: WheelItem[];
  onSpinEnd: (discount: WheelItem) => void;
  multiplier: number;

  validateInput: () => boolean;
}

const Wheel: React.FC<WheelProps> = ({
  items,
  onSpinEnd,
  multiplier,
  validateInput,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let rotation = 0;
  let spinTimeout: number | null = null;
  const [isSpinning, setIsSpinning] = useState(false);

  const drawItem = (
    startAngle: number,
    arc: number,
    color: string,
    value: string,
    type: string
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const radius = Math.min(canvas.width, canvas.height) / 2;

    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      radius,
      startAngle,
      startAngle + arc
    );
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = color;
    ctx.fill();

    const textAngle = startAngle + arc / 2;
    const textX = canvas.width / 2 + (radius / 2) * Math.cos(textAngle);
    const textY = canvas.height / 2 + (radius / 2) * Math.sin(textAngle);
    ctx.save();
    ctx.translate(textX, textY);
    ctx.rotate(textAngle + Math.PI / 2);
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(value + " " + type, 0, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const arc = (2 * Math.PI) / items.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    items.forEach((item, index) => {
      drawItem(
        rotation + index * arc,
        arc,
        item.color,
        item.value.toString(),
        item.type
      );
    });

    drawPointer();
  };

  const drawPointer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, canvas.height / 2);
    ctx.lineTo(canvas.width - 10, canvas.height / 2 - 20);
    ctx.lineTo(canvas.width - 30, canvas.height / 2);
    ctx.lineTo(canvas.width - 10, canvas.height / 2 + 20);
    ctx.closePath();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();

    const gradient = ctx.createLinearGradient(
      canvas.width - 10,
      canvas.height / 2,
      canvas.width - 30,
      canvas.height / 2
    );
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1, "blue");
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  const spin = () => {
    if (!validateInput()) {
      alert("Please insert valid input");
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);

    const spinInterval = window.setInterval(() => {
      rotation += Math.floor(Math.random() * 60) + 40;
      drawWheel();
    }, 10);

    if (spinTimeout !== null) {
      window.clearTimeout(spinTimeout);
    }

    const randomSpinTime = multiplier * 1000;

    spinTimeout = window.setTimeout(() => {
      window.clearInterval(spinInterval);
      const winningItemIndex = Math.floor(
        items.length -
          (rotation % (2 * Math.PI)) / ((2 * Math.PI) / items.length)
      );
      onSpinEnd(items[winningItemIndex]);

      setIsSpinning(false);
    }, randomSpinTime);
  };

  useEffect(() => {
    drawWheel();
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} onClick={spin} />;
};

export default Wheel;
