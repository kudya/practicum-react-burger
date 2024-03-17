import React, {ReactNode, SyntheticEvent} from 'react';
import modalOverlayStyles from './modal-overlay.module.css'

type TModalOverlayProps = {
    children: ReactNode,
    onClose: () => void,
}

const ModalOverlay = ({children, onClose}: TModalOverlayProps): React.JSX.Element => {
    const onCloseOverlay = (e: SyntheticEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement
            && !e.target.classList.contains(modalOverlayStyles.overlay)) {
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

export default ModalOverlay;
