import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "./modal-overlay/modal-overlay";

const Modal = ({children, title, onClose}) => {
    useEffect(() => {
        window.addEventListener("keydown", onPressEscape);

        return () =>
            window.removeEventListener("keydown", onPressEscape);
    }, [])

    const onPressEscape = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    return createPortal(
        <div>
            <ModalOverlay onClose={onClose}>
                <div className={`${modalStyles.container} pt-10 pr-10 pb-15 pl-10`}>
                    <div className={modalStyles.header}>
                        {title && (
                            <h3 className="text text_type_main-large">{title}</h3>
                        )}

                        <button className={modalStyles.close} type="button" onClick={onClose}>
                            <CloseIcon type="primary" />
                        </button>
                    </div>

                    { children }
                </div>
            </ModalOverlay>
        </div>,
        document.getElementById('app-modals')
    );
};

Modal.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
    onClose: PropTypes.func,
};

export default Modal;
