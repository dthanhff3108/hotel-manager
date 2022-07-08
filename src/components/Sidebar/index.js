import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faBed, faClipboardUser, faUser, faCoins } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';

import Image from '../Image';
import images from '../../assets/images';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const { bookingList,tab,setTab,auth } = useContext(AppContext);
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('info')}
            >
                <Image src={images.avatarStaff} className={cx('avatar')} />
                <div className={cx('status')}>
                    <p>{auth?.name}</p>
                    <p>Online</p>
                </div>
            </div>
            <Link to="/main-staff">
                <div className={cx('tab',tab===1?"active":"")}
                    onClick={()=>{setTab(1)}}
                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faBoxArchive} />
                    <p className={cx('tab-name')}>Booking</p>
                    {bookingList.length > 0 && <span>{bookingList.length}</span>}
                </div>
            </Link>
            <Link to="/room">
                <div className={cx('tab',tab===2?"active":"")}
                    onClick={()=>{setTab(2)}}
                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faBed} />
                    <p className={cx('tab-name')}>Room</p>
                </div>
            </Link>

            <Link to="/customer">
                <div className={cx('tab',tab===3?"active":"")}
                    onClick={()=>{setTab(3)}}
                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faUser} />
                    <p className={cx('tab-name')}>Customer</p>
                </div>
            </Link>

            <Link to="/main-staff">
                <div className={cx('tab',tab===4?"active":"")}
                    onClick={()=>{setTab(4)}}
                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faClipboardUser} />
                    <p className={cx('tab-name')}>Staff</p>
                </div>
            </Link>
            <Link to="/accounting">
                <div className={cx('tab',tab===5?"active":"")}
                    onClick={()=>{setTab(5)}}
                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faCoins} />
                    <p className={cx('tab-name')}>Accounting</p>
                </div>
            </Link>
        </aside>
    );
}

export default Sidebar;
