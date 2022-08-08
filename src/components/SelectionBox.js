import React from "react";
import "../styles/selectionbox.css";

const SelectionBox = (props) => {
  const {
    top,
    left,
    coordinates,
    selections,
    onClickHandler,
    setShown,
    shown,
  } = props;
  const boxStyle = {
    display: "grid",
    position: `absolute`,
    top: `${top}px`,
    left: `${left}px`,
    border: "2px solid black",
    background: `black`,
  };

  return (
    <div style={boxStyle}>
      {selections.map((selection) => {
        return (
          <button
            id={"selection-btn"}
            key={selection}
            onClick={() => {
              console.log(selection, coordinates[0], coordinates[1]);
              onClickHandler(selection);
              setShown(!shown);
            }}
          >
            {selection}
          </button>
        );
      })}
    </div>
  );
};

export default SelectionBox;
