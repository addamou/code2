import React from "react";
import "./style.css";

const Modale = ({ children, close }) => {
  return (
    <section>
      <div id='blur' />
      <div id='modal' style={{ position: "absolute", top: 0, zIndex: 190 }}>
        <button
          className='btn btn-danger fs-5'
          onClick={close}
          style={{ position: "absolute", top: 50, zIndex: 190 }}
        >
          Fermer
        </button>
        <div className=''> {children} </div>
      </div>
    </section>
  );
};

export default Modale;
