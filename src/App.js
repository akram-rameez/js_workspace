import React, { useState } from "react";
import { DataInput, Shape } from "./main";

export default function App() {
  const [text, setText] = useState("Hello rameez");
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  return (
    <div>
      <DataInput setText={setText} setWidth={setWidth} setHeight={setHeight} />
      <div style={{ padding: 10 }}>
        <Shape type="oval" text={text} width={width} height={height} />
        <Shape type="rectangle" text={text} width={width} height={height} />
        {/* <Shape type="star" text={text} width={width} height={height} /> */}
      </div>
    </div>
  );
}
