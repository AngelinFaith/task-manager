// The form for modal is created in AddTask component, here the functional changes  

import "../CSS/modal.css";

// If we are wrapping elements with an component, thus those elements can be get accessed using a property named Children. 
//custom modal is used to set the css properties.
function Modal({open, modalLable, onClose, children, custom_modal}){

    function handleClose(e){
        if(e.target.className==="modalContainer"){
            onClose()
        }
        return null;
    }

    if(open) {
        return(
            <div className="modalContainer" onClick={handleClose}>
                 <div className={`modal ${custom_modal}`}>
                    <div className="modal__head">
                        <h2>{modalLable}</h2>
                        <span className="modal__close" onClick={onClose}>x</span>
                    </div>
                    {children}
                 </div>
            </div>
        )
    }
    return null;
    
}

export default Modal;