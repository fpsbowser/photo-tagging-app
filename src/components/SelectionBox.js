import React from "react";
import "../styles/selectionbox.css";

const SelectionBox = (props) => {
  const {
    top,
    left,
    coordinates,
    selections,
    setItemSelection,
    onClickHandler,
    setShown,
    shown,
  } = props;
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
              console.log(selection, coordinates[0], coordinates[1]);
              setItemSelection(selection);
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
