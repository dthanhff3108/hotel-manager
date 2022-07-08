 import classNames from 'classnames/bind';
import { faBoxArchive, faBed, faClipboardUser, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import App, { AppContext } from '../../App';
import { useContext } from 'react';

import styles from './RegisterCard.module.scss';

const cx = classNames.bind(styles);

function RegisterCard({ bookingItem, setBookingList, setRoomList, roomList,setListIdCustomer }) {
    const findRoom = roomList.find((room) => room.id === bookingItem.idRoom);
    // trả về phòng khách đặt
    // bookingItem : thông tin khách nhập, có IDroom
    const handleAccept = (quantity) => {
        setRoomList((list) => {
            const newRoomList = list.map((room) => {
                if (findRoom.id === room.id) {
                    return {
                        ...room,
                        status: 'Full',
                        quantity: quantity,
                        idCustomer : bookingItem.idCustomer,
                        startTime : bookingItem.startTime,
                        endTime : bookingItem.endTime,
                    };
                } else {
                    return room;
                }
            });
            return newRoomList;
        });
        setListIdCustomer(list=>{
            const newList = [...list]
            if(!list.includes(bookingItem.idCustomer)){
                newList.push(bookingItem.idCustomer);
            }
            return newList;
        })
        setBookingList((list) => list.filter((room) => room.idRoom !== findRoom.id));
    };
    const handleDeny = () => {
        setRoomList((list) => {
            const newRoomList = list.map((room) => {
                if (findRoom.id === room.id) {
                    return {
                        ...room,
                        status: 'Ready',
                    };
                } else {
                    return room;
                }
            });
            return newRoomList;
        });
        setBookingList((list) => list.filter((room) => room.idRoom !== findRoom.id));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <p>Name : {bookingItem.name}</p>
                <p>Room : {findRoom.name}</p>
                <p>Quantity : {bookingItem.quantity}</p>
                <p>Start : {bookingItem.startTime}</p>
                <p>End : {bookingItem.endTime}</p>
            </div>
            <div className={cx('control')}>
                <div className={cx('btn', 'accept')} onClick={()=>handleAccept(bookingItem.quantity,bookingItem.name)}>
                    Accept
                </div>
                <div className={cx('btn', 'deny')} onClick={handleDeny}>
                    Deny
                </div>
            </div>
        </div>
    );
}

export default RegisterCard;
