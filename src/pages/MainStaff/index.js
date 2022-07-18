import React, { useState, useRef, useContext} from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
 
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
                {bookingList.length ? <h1>List booking:</h1> : <h1>Opps !!, It looks like there are no reservations at all <FontAwesomeIcon style={{marginLeft:"10px"}} icon={faFaceSadTear}/> </h1>}
                {bookingList.map(bookingItem=>(
                    <RegisterCard  {...rest} bookingItem={bookingItem} key={bookingItem.idRoom}/>
                ))}
            </div>
       </ManagerLayout>
     );
}

export default MainStaff;