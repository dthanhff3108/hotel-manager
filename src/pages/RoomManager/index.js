import classNames from 'classnames/bind';
import React, { useState,useContext } from 'react';
import IsoTopeGrid from 'react-isotope';
import Tippy from '@tippyjs/react/headless'; // different import path!
import {Link } from 'react-router-dom'

import { AppContext } from '../../App';
import styles from './RoomManager.module.scss';
import ManagerLayout from '../../components/Layout/ManagerLayout';
import { AddForm } from '../../components/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCirclePlus, faFilter, faPeopleGroup, faWrench,faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);


const filterList = [
    { label: 'all', name : "All rooms" , isChecked: true },
    { label: 'marvelous', name : "Marvelous" , isChecked: false },
    { label: 'grand', name : "Grand Sea" , isChecked: false },
    { label: 'paradise', name : "Paradise Room" , isChecked: false },
];

function RoomManager() {
    const {roomList, setRoomList} = useContext(AppContext);
    const [filters, updateFilters] = useState(filterList);
    const [show,setShow] = useState(false)
    const onFilter = (event) => {
        const {
            target: { value},
        } = event;
        updateFilters((state) =>
            state.map((f) => {
                if (f.label === value) {
                    return {
                        ...f,
                        isChecked: !f.isChecked,
                    };
                }
                return f;
            }),
        );
    };
    return (
        <ManagerLayout>
            <div className={cx('wrapper')}>
                <div className={cx("filter-list")}>
                    <FontAwesomeIcon className={cx("filter-icon")} icon={faFilter} />
                    {filters.map((f) => (
                        <div
                            className={cx('filter-item')}
                            key={`${f.label}_key`}
                        >
                            <input
                                id={f.label}
                                type="checkbox"
                                value={f.label}
                                onChange={onFilter}
                                checked={f.isChecked}
                                className={cx('checkbox')}
                            />
                            <label className={cx("label",f.isChecked?"check":'')} htmlFor={f.label}>{f.name}</label>
                        </div>
                    ))}
                </div>
                <div className="room-list">
                    <IsoTopeGrid
                        gridLayout={roomList} // gridlayout of cards
                        noOfCols={6} // number of columns show in one row
                        unitWidth={200} // card width of 1 unit
                        unitHeight={200} // card height of 1 unit
                        filters={filters} // list of selected filters
                    >
                        {roomList.map((room) => {
                            let statusClass;
                            let statusIcon;
                            switch (room.status.trim()) {
                                case 'Ready':
                                    statusIcon = faCircleCheck;
                                    statusClass = "ready";
                                    break;
                                case 'Full':
                                    statusIcon = faPeopleGroup;
                                    statusClass = "full";
                                    break;
                                case 'Fixing':
                                    statusIcon = faWrench;
                                    statusClass = "fixing";
                                    break;
                                case 'Pending':
                                statusIcon = faSpinner;
                                statusClass = "pending";
                                break;
                                default:
                                    statusIcon = faCircleCheck;
                                    break;
                            }
                            return (
                                    <div key={room.id} className={cx('room-item',statusClass)}>
                                        <Link to ={`/room/@${room.id}`} state={room}>
                                            <div className={cx('room-item',statusClass)}>
                                                <h2>{room.name}</h2>
                                                <p>Status: {room.status || 'Ready'}</p>
                                                <FontAwesomeIcon className={cx('status-icon')} icon={statusIcon} />
                                                <div>
                                                    Capacity: {room.quantity}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                            )
                        })}
                    </IsoTopeGrid>
                </div>
                <Tippy
                    visible={show}
                    interactive
                    offset={[-180,0]}
                    onClickOutside={()=>setShow(false)}
                    render = {()=> 
                        <AddForm option="Name" 
                                option1="Quantity"
                                roomList = {roomList}
                                setRoomList = {setRoomList}
                                setShow = {setShow}
                        />
                    }
                >
                    <div className={cx('add-btn')}
                        onClick={()=>setShow(prev=>!prev)}
                    >
                        <FontAwesomeIcon className={cx('add-icon')} icon={faCirclePlus}/>
                    </div>
                </Tippy>
            </div>
        </ManagerLayout>
    );
}

export default RoomManager;
