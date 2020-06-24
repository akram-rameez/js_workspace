import React from "react";

export function DataInput(props) {
  const {
    setText = () => {},
    setWidth = () => {},
    setHeight = () => {}
  } = props;

  const setHeightCallback = React.useCallback(
    e => {
      const height = e.target.value;
      setHeight(+height);
    },
    [setHeight]
  );

  const setWidthCallback = React.useCallback(
    e => {
      const width = e.target.value;
      setWidth(+width);
    },
    [setWidth]
  );

  const setTextCallback = React.useCallback(
    e => {
      const text = e.target.value;
      setText(text);
    },
    [setText]
  );

  return (
    <div>
      <input
        placeholder="Enter Width"
        type="number"
        onChange={setWidthCallback}
      />
      <input
        placeholder="Enter Height"
        type="number"
        onChange={setHeightCallback}
      />
      <input placeholder="Enter Text" onChange={setTextCallback} />
    </div>
  );
}

const path = {
  oval: {
    shape:
      "M 100 50 C 100 77 77 100 50 100 C 22 100 0 77 0 50 C 0 22 22 0 50 0 C 77 0 100 22 100 50 Z",
    textProps: {
      width: 70,
      x: 15,
      y: 15
    }
  },
  rectangle: {
    shape: "M 0 0 L 100 0 L 100 100 L 0 100 Z"
  },
  star: {
    shape:
      "M50,2.66954e-12L38.2851,33.8758L2.44718,34.5491L31.0449,56.1589L20.6107,90.4508L50,69.9306L79.3892,90.4509L68.9551,56.1589L97.5528,34.5492L61.7149,33.8759L50,2.66954e-12 Z",
    textProps: {
      width: 15,
      x: 17,
      y: 35
    }
  }
};

function getPath(shape, { height, width }) {
  const parsedPath = shape.split(" ");
  let d = "";
  while (parsedPath.length) {
    let x, y, inst;
    [x, y] = parsedPath.splice(0, 2);
    if (isNaN(x)) {
      inst = x;
      x = y;
      [y] = parsedPath.splice(0, 1);
    }

    if (x) {
      x = (parseFloat(x) / 100) * width;
    }
    if (y) {
      y = (parseFloat(y) / 100) * height;
    }

    d = d + [inst, x, y].filter(x => x != null).join(" ") + " ";
  }
  d = d.trim();

  return d;
}

export function Shape(props) {
  const {
    width,
    height,
    text = "some text provided by component",
    type = "oval"
  } = props;

  if (!path[type]) {
    console.warn(`shape: ${type} not found`);
    return null;
  }

  const { shape, textProps = {} } = path[type];

  const d = getPath(shape, { width, height });

  const extraProps = {};
  const { width: textWidth, x, y } = textProps;
  if (width) {
    extraProps.width = (textWidth / 100) * width;
  }
  if (x) {
    extraProps.left = (x / 100) * width;
  }
  if (y) {
    extraProps.top = (y / 100) * height;
  }

  console.log(extraProps);

  return (
    <div style={{ display: "inline-block", marginRight: 10 }}>
      <svg height={`${height}`} width={`${width}`}>
        <defs>
          <clipPath id={`clip-${type}`}>
            <path d={d} />
          </clipPath>
        </defs>
        <path d={d} stroke="#333" fill="#eee" />
        <foreignObject
          clipPath={`url(#clip-${type})`}
          height={`${height}`}
          width={`${width}`}
        >
          <p
            style={{
              fontSize: 12,
              margin: 0,
              position: "relative",
              ...extraProps
            }}
          >
            {text}
          </p>
        </foreignObject>
      </svg>
    </div>
  );
}
