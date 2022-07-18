import classNames from 'classnames/bind';
import React, { useState, useContext, useRef } from 'react';

import { AppContext } from '../../App';
import styles from './Accounting.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ManagerLayout from '../../components/Layout/ManagerLayout';
const cx = classNames.bind(styles);

function Accounting() {
    const { payList,coin,setCoin } = useContext(AppContext);
    const totalRef = useRef('')
    return (
        <ManagerLayout>
            <div className={cx('wrapper')}>
                <table>
                    <thead>
                        <tr key="title">
                            <th>Name</th>
                            <th>Room</th>
                            <th>Time</th>
                            <th>Price Room</th>
                            <th>Cost Services</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payList?.map((item,index) => {
                            console.log(item);
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.roomName}</td>
                                    <td>{item.time}</td>
                                    <td>{item.priceRoom}</td>
                                    <td>{item.cost}</td>
                                    <td >{item.priceRoom*item.time+item.cost}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
               <p className={cx('total')}> Total Coin : {coin}</p>
            </div>
        </ManagerLayout>
    );
}

export default Accounting;
