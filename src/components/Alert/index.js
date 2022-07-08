import classNames from 'classnames/bind';
import React, { useState, useContext, useRef, useEffect } from 'react';

import { AppContext } from '../../App';
import styles from './Alert.module.scss';

const cx = classNames.bind(styles);

function Alert({msg,removeAlert,type}) {
    const {bookingList} = useContext(AppContext)
    useEffect(()=>{
        const timeOut = setTimeout(()=> {
            removeAlert()
        },3000)
        return ()=>clearTimeout(timeOut)
    },[bookingList]);
    return ( 
        <div className={cx("alert",type)}>
            {msg}
        </div>
     );
}

export default Alert;