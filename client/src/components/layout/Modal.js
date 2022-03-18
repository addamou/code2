import React from "react";

const ModalBG = {
  position: "fixed",
  zModal: 1,
  left: 0,
  top: 0,
  height: " 100%",
  width: "100%",
  backgroundColor: "#000000ec",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ModalCont = {
  display: "flex !important",
  flex: "0 1 70% !important",
  boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17)",
  flexDirection: "column !important",
  padding: 0,
};

const Modal = ({
  ouvrir,
  children,
  titre,
  fermer,
  bouton,
  bg,
  css,
  css1,
  click,
  option,
  click2,
  bouton2,
  css2,
}) => {
  return (
    ouvrir && (
      <div style={ModalBG}>
        <div className={`${css}`} style={ModalCont}>
          <div
            className='modal-header border-0'
            style={{ background: `${bg}` }}
          >
            <h5 className='modal-title text-light'>{titre}</h5>
            <button
              type='button'
              onClick={fermer}
              className='btn-close'
              data-dismiss='modal'
              aria-label='Close'
            />
          </div>
          {children}
          <div
            className='modal-footer border-0'
            style={{ background: `${bg}` }}
          >
            <button
              type='button'
              onClick={fermer}
              className='btn btn-secondary'
            >
              Fermer
            </button>
            {option !== false && (
              <div type='button' onClick={click2} className={`${css2}`}>
                {bouton2}
              </div>
            )}
            <button type='button' onClick={click} className={`${css1}`}>
              {bouton}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
