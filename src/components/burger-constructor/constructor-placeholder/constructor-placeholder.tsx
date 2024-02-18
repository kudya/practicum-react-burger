import React from 'react';
import constructorPlaceholderStyles from './constructor-placeholder.module.css';

type IConstructorPlaceholderProps = {
    text: string,
    type?: string,
}

const ConstructorPlaceholder = ({text, type}: IConstructorPlaceholderProps): React.JSX.Element => {

    const topStyles = {borderRadius: '88px 88px 40px 40px'};
    const bottomStyles = {borderRadius: '40px 40px 88px 88px'};
    const defaultStyles = {borderRadius: '40px'};

    const styles = type ? (type === 'top' ? topStyles  : bottomStyles) : defaultStyles;

    return (
        <div style={styles} className={constructorPlaceholderStyles.container}>
            <p className="text text_type_main-default">{text}</p>
        </div>
    );
};

export default ConstructorPlaceholder;
