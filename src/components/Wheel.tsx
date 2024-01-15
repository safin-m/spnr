import React, { useRef, useEffect, useState } from "react";

interface WheelItem {
  value: string;
  type: string;
  color: string;
  [key: string]: string;
}

interface WheelProps {
  items: WheelItem[];
  onSpinEnd: (value: string) => void;
}

const Wheel: React.FC<WheelProps> = ({ items, onSpinEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let rotation = 0;
  let spinTimeout: number | null = null;
  const [isSpinning, setIsSpinning] = useState(false);

  const drawItem = (
    startAngle: number,
    arc: number,
    color: string,
    value: string
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
    ctx.fillText(value, 0, 0);
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
      drawItem(rotation + index * arc, arc, item.color, item.value);
    });

    drawPointer();
  };

  const drawPointer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(canvas.width - 10, canvas.height / 2 - 20);
    ctx.lineTo(canvas.width - 10, canvas.height / 2 + 20);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.closePath();

    ctx.fillStyle = "#000000";
    ctx.fill();
  };

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const spinInterval = window.setInterval(() => {
      rotation += Math.PI / 60;
      drawWheel();
    }, 10);

    if (spinTimeout !== null) {
      window.clearTimeout(spinTimeout);
    }

    const randomSpinTime = Math.floor(Math.random() * 2000) + 3000;

    spinTimeout = window.setTimeout(() => {
      window.clearInterval(spinInterval);
      const winningItemIndex = Math.floor(
        items.length -
          (rotation % (2 * Math.PI)) / ((2 * Math.PI) / items.length)
      );
      onSpinEnd(items[winningItemIndex].value);
      setIsSpinning(false);
    }, randomSpinTime);
  };

  useEffect(() => {
    drawWheel();
    canvasRef.current?.addEventListener("click", spin);
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} />;
};

export default Wheel;
