import classNames from 'classnames/bind';
import React, { useState, useContext, useEffect } from 'react';


import { AppContext } from '../../App';
import styles from './Customer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ManagerLayout from '../../components/Layout/ManagerLayout';
const cx = classNames.bind(styles);

function Customer() {
   const {listCustomer, setListCustomer} = useContext(AppContext);

    return (
        <ManagerLayout>
            <div className={cx('wrapper')}>
                <h1>List customer: </h1>
                <div className={cx('list-customer')}>
                    {
                        listCustomer.map((item,index)=>{
                            return(
                                <div className={cx('customer')} key={index}>
                                    <div className={cx('info-user')}>
                                        <p>Name : {item.name}</p>
                                        <p>ID : {item.cardId}</p>
                                        <p>Phone : {item.phone}</p>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className={cx('del-icon')} icon={faTrash} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </ManagerLayout>
    );
}

export default Customer;
