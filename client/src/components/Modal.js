import ReactDOM from "react-dom";

import '../App.css';

function Modal({ show, children }) {
  return show
    ? ReactDOM.createPortal(
        <>
          <div className="modal" style={{display: show ? 'block': 'none'}} role="dialog">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
              <div className="modal-content">{children}</div>
            </div>
          </div>
          <div className="backdrop"></div>
        </>,
        document.body
      )
    : null;
}

export default Modal;
