import React, { useState, useRef, useContext} from 'react';
import classNames from 'classnames/bind';
 
import ManagerLayout from '../../components/Layout/ManagerLayout';
import RegisterCard from '../../components/RegisterCard'
import styles from './MainStaff.module.scss'
import { AppContext } from '../../App';


const cx = classNames.bind(styles);

function MainStaff() {
    const {bookingList,...rest} = useContext(AppContext)
    return (     
       <ManagerLayout>
            <div className={cx("wrapper")}>
                <h1>List booking:</h1>
                {bookingList.map(bookingItem=>(
                    <RegisterCard  {...rest} bookingItem={bookingItem} key={bookingItem.idRoom}/>
                ))}
            </div>
       </ManagerLayout>
     );
}

export default MainStaff;