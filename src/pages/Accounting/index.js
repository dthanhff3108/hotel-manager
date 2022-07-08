import classNames from 'classnames/bind';
import React, { useState, useContext, useEffect } from 'react';

import { AppContext } from '../../App';
import styles from './Accounting.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ManagerLayout from '../../components/Layout/ManagerLayout';
const cx = classNames.bind(styles);

function Accounting() {
    const { payList, setPayList } = useContext(AppContext);
    return (
        <ManagerLayout>
            <div className={cx('wrapper')}>
                <table>
                    <thead>
                        <tr key="title">
                            <th>Name</th>
                            <th>Room</th>
                            <th>Time</th>
                            <th>Services</th>
                            <th>Price Room</th>
                            <th>Cost Services</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payList.map((item) => {
                            console.log(item);
                            return (
                                <tr key="">
                                    <td>{item.name}</td>
                                    <td>{item.roomName}</td>
                                    <td>{item.time}</td>
                                    <td className={cx('services-list')}>
                                        {item.services.map((item, index) => (
                                            <span key={index}>
                                                {item['name']} x {item['number']}
                                            </span>
                                        ))}
                                    </td>
                                    <td>{item.priceRoom}</td>
                                    <td>4000</td>
                                    <td>6000</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </ManagerLayout>
    );
}

export default Accounting;
