import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css'

const ModalOverlay = ({children, onClose}) => {
    const onCloseOverlay = (e) => {
        if (!e.target.classList.contains(modalOverlayStyles.overlay)) {
            return;
        }

        onClose();
    }
    return (
        <div className={modalOverlayStyles.overlay} onClick={onCloseOverlay}>
            {children}
        </div>
    );
};

ModalOverlay.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func,
};

export default ModalOverlay;
