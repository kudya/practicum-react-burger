import React from 'react';
import PropTypes from 'prop-types';
import constructorPlaceholderStyles from './constructor-placeholder.module.css';

const ConstructorPlaceholder = ({text, type}) => {

    const topStyles = {borderRadius: '88px 88px 40px 40px'};
    const bottomStyles = {borderRadius: '40px 40px 88px 88px'};

    const styles = type && (type === 'top' ? topStyles  : bottomStyles);

    return (
        <div style={styles} className={constructorPlaceholderStyles.container}>
            <p className="text text_type_main-default">{text}</p>
        </div>
    );
};

ConstructorPlaceholder.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
};

export default ConstructorPlaceholder;
