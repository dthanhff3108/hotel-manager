import { forwardRef } from 'react';
import classNames from 'classnames'

import styles from './Image.module.scss';

function Image({ src, alt,className, ...props }, ref) {

    return (
        <img ref={ref} 
            className={classNames(styles.wrapper,className)}
            src={src} 
            alt={alt} {...props} 
        />
    )
}

export default forwardRef(Image);
