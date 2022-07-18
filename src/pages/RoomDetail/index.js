import classNames from 'classnames/bind';
import React, { useState, useContext, useRef } from 'react';
import Tippy from '@tippyjs/react/headless'; // different import path!
import { Link, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { AppContext } from '../../App';
import styles from './RoomDetail.module.scss';
import ManagerLayout from '../../components/Layout/ManagerLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCirclePlus, faPeopleGroup, faWrench } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RoomDetail() {

    const { setCoin, setPayList, services,  } = useContext(AppContext);
    // Get data through Link
    const location = useLocation();
    const { id, name, cost, status, quantity, idCustomer, startTime, endTime } = location.state;
    const [edit, setEdit] = useState(false);
    const [guest, setGuest] = useState('');
    const [statusValue, setStatusValue] = useState(status);
    const [quantityValue, setQuantityValue] = useState(quantity);
    const [servicesQuantity, setServicesQuantity] = useState([]);

    // AppContext
    const { roomList, setRoomList } = useContext(AppContext);
    const nameRef = useRef(null);
    const statusRef = useRef('');
    const quantityRef = useRef('');
    let total = servicesQuantity.reduce((total, ser) => total + ser.value * ser.cost, 0) ;

    const getNameUser = async (idCustomer) => {
        if (idCustomer) {
            const document = await getDoc(doc(db, 'auth', idCustomer));
            if (document.exists()) {
                setGuest(document.data().name);
            }
        } else {
            return;
        }
    };
    getNameUser(idCustomer);

    const handleDel = () => {
        setRoomList((list) => {
            return roomList.filter((room) => room.id !== id);
        });
    };
    const handleEdit = () => {
        setEdit(true);
        nameRef.current.contentEditable = true;
        nameRef.current.focus();
    };
    const handleUpdate = () => {
        nameRef.current.contentEditable = false;
        quantityRef.current.contentEditable = false;
        const statusValue = statusRef.current.value;
        const quantityValue = quantityRef.current.value;
        setRoomList((list) => {
            const newList = list.map((room) => {
                if (room.id === id) {
                    return { ...room, name: nameRef.current.textContent, quantity: quantityValue, status: statusValue };
                } else {
                    return room;
                }
            });
            return newList;
        });
        setEdit(false);
    };
    const handleChangeStatus = (e) => {
        if (e.target.value.trim() === '') {
            return;
        } else {
            setStatusValue(e.target.value);
        }
    };
    const handlePay = () => {
        const end = new Date(endTime);
        const start = new Date(startTime);
        const totalDay = Math.ceil(Math.abs(end - start) / (1000 * 24 * 60 * 60));
        setRoomList((list) => {
            const newList = list.map((room) => {
                if (room.id === id) {
                    return { ...room, startTime: '', endTime: '', guest: '', quantity: '', status: 'Ready' };
                } else {
                    return room;
                }
            });
            return newList;
        });
        setPayList((list) => [
            ...list,
            {
                name: guest,
                roomName: name,
                time: totalDay,
                priceRoom: cost,
                cost: total,
            },
        ]);
        setCoin(prev=>prev + total+totalDay*cost)
    };
    const handleChangeQuantity = (e) => {
        setQuantityValue(e.target.value);
    };
    const changeQuantity = (e, cost) => {
        const value = e.target.value;
        const name = e.target.name;
        setServicesQuantity((prev) => {
            if (prev.length === 0) {
                return [
                    {
                        name: name,
                        value: value,
                        cost: cost,
                    },
                ];
            } else {
                if (prev.some((ser) => ser.name === name)) {
                    return prev.map((ser) => {
                        if (ser.name === name) {
                            return {
                                ...ser,
                                value: value,
                            };
                        } else {
                            return ser;
                        }
                    });
                } else {
                    return [
                        ...prev,
                        {
                            name: name,
                            value: value,
                            cost: cost,
                        },
                    ];
                }
            }
        });
    };
    return (
        <ManagerLayout>
            <div className={cx('wrapper')}>
                <div className={cx('info')}>
                    <h2 ref={nameRef}>{name}</h2>
                    {edit ? (
                        <p>
                            Status:
                            <select
                                ref={statusRef}
                                className={cx('select')}
                                onChange={(e) => handleChangeStatus(e)}
                                value={statusValue}
                            >
                                <option value="">---Choose Status---</option>
                                <option value="Ready">Ready</option>
                                <option value="Full">Full</option>
                                <option value="Fixing">Fixing</option>
                            </select>
                        </p>
                    ) : (
                        <p>
                            Status: <span>{statusValue || status}</span>
                        </p>
                    )}
                    <p>Guest: {guest}</p>
                    {edit ? (
                        <p>
                            Quantity:
                            <select
                                ref={quantityRef}
                                className={cx('select')}
                                onChange={(e) => handleChangeQuantity(e)}
                                value={quantityValue}
                            >
                                <option value="">---Choose Quantity---</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                    ) : (
                        <p>
                            Quantity: <span>{quantityValue}</span>
                        </p>
                    )}

                    <p>Start Time: {startTime ? startTime : ''}</p>
                    <p>End Time: {endTime ? endTime : ''}</p>
                    {edit && (
                        <div className={cx('update')} onClick={handleUpdate}>
                            Update
                        </div>
                    )}
                </div>
                <div className={cx('control')}>
                    <div className={cx('edit', 'btn')} onClick={handleEdit}>
                        Edit Room
                    </div>
                    <Link to="/room">
                        <div className={cx('delete', 'btn')} onClick={handleDel}>
                            Delete Room
                        </div>
                    </Link>

                    <Link to="/room">
                        {guest && (
                            <div className={cx('pay', 'btn')} onClick={handlePay}>
                                Pay
                            </div>
                        )}
                    </Link>
                </div>
                <div className={cx('introduce')}>
                    <p>This room so beautiful</p>
                    <img
                        src="https://saladanangbeach.com/wp-content/uploads/2020/03/85199296_2803066883116526_1104993255881179136_o.jpg"
                        alt=""
                    />
                    <div className={cx('services')}>
                        {services.map((service) => (
                            <div className={cx('service')} key={service.id}>
                                <span>{service.name}: </span>
                                <input
                                    type="number"
                                    min="0"
                                    name={service.name}
                                    onChange={(e, cost) => changeQuantity(e, service.cost)}
                                />
                            </div>
                        ))}
                        <p className={cx('total-price')}> Price Total : {total}</p>
                    </div>
                </div>
            </div>
        </ManagerLayout>
    );
}

export default RoomDetail;
