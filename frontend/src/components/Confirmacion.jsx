import Modal from 'react-modal';

const ConfirmDialog = ({ show, handleClose, handleConfirm, title, message }) => {
  return (
    <Modal show={show} onHide={handleClose}>
          <div>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleConfirm}>Aceptar</button>
            </div>
        </div>
    </Modal>
  );
};

export default ConfirmDialog;