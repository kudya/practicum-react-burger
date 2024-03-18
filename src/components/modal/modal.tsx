import React, {useEffect, ReactNode} from 'react';
import {createPortal} from 'react-dom';
import modalStyles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "./modal-overlay/modal-overlay";

type IModalProps = {
    children: ReactNode,
    title?: string,
    onClose: () => void,
}


const Modal = ({children, title, onClose}: IModalProps) => {
    useEffect(() => {
        window.addEventListener("keydown", onPressEscape);

        return () =>
            window.removeEventListener("keydown", onPressEscape);
    }, [])

    const onPressEscape = (e: KeyboardEvent): void => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    return createPortal(
        <div data-cy="modal">
            <ModalOverlay onClose={onClose}>
                <div
                    className={`${modalStyles.container} pt-10 pr-10 pb-15 pl-10`}
                    data-cy="modal-container"
                >
                    <div className={modalStyles.header}>
                        {title && (
                            <h3 className="text text_type_main-large">{title}</h3>
                        )}

                        <button
                            className={modalStyles.close}
                            type="button"
                            data-cy="modal-close-button"
                            onClick={onClose}
                        >
                            <CloseIcon type="primary" />
                        </button>
                    </div>

                    { children }
                </div>
            </ModalOverlay>
        </div>,
        document.getElementById('app-modals')!
    );
};

export default Modal;
