import React from "react";
import "../styles/selectionbox.css";

const SelectionBox = (props) => {
  const { top, left, selections } = props;
  // console.log("selection box");
  const boxStyle = {
    display: "grid",
    position: `absolute`,
    top: `${top}px`,
    left: `${left}px`,
    border: "2px solid black",
    // width: `100px`,
    // height: `100px`,
    background: `black`,
  };

  return (
    <div style={boxStyle}>
      {selections.map((selection) => {
        return (
          <button
            id={"selection-btn"}
            // style={{ display: "flex" }}
            key={selection}
            onClick={() => {
              console.log(selection, top, left);
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
