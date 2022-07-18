import classNames from 'classnames/bind';
import React, { useState, useContext, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore";


import { AppContext } from '../../App';
import {db} from "../../firebase/config"
import styles from './Staff.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ManagerLayout from '../../components/Layout/ManagerLayout';
const cx = classNames.bind(styles);

function Staff() {
    const [staffList,setStaffList] = useState([]);
    const getStaff = async ()=>{
        const querySnapshot = await getDocs(collection(db, "staff"));
        const arrayStaff = []
        querySnapshot.forEach((doc) => {
            arrayStaff.push({
                id: doc.id,
                ...doc.data()
            })
        });
        setStaffList(arrayStaff);
    }
    getStaff()
    return (
        <ManagerLayout>
            <div className={cx('wrapper')}>
                {
                    staffList.map(staff=>(
                        <div className={cx("staff")} key ={staff.id}>
                            <img className={cx("staff-avt")} src={staff.avt} alt="" />
                            <p>Name : {staff.name}</p>
                            <p>Phone : {staff.phone}</p>
                            <p>Salary : {staff.salary}</p>
                        </div>
                    ))
                }
            </div>
        </ManagerLayout>
    );
}

export default Staff;
