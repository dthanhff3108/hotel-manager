import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faBed, faClipboardUser, faUser, faCoins } from '@fortawesome/free-solid-svg-icons';
import { NavLink,Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';

import Image from '../Image';
import images from '../../assets/images';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const { bookingList,tab,setTab,auth } = useContext(AppContext);
    let activeStyle = {
        backgroundColor: '#fff',
      };
      const navLinkClass = ({ isActive }) => {
        return isActive ? cx('tab','active') : cx('tab')
      }
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('info')}>
                <Image src={images.avatarStaff} className={cx('avatar')} />
                <div className={cx('status')}>
                    <p>{auth?.name}</p>
                    <p>Online</p>
                </div>
            </div>
            <NavLink to="/main-staff"
                className={navLinkClass}
                >
            <div className={cx('tab-item')}
                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faBoxArchive} />
                    <p className={cx('tab-name')}>Booking</p>
                    {bookingList.length > 0 && <span>{bookingList.length}</span>}
                </div>
            </NavLink>
            <NavLink to="/room"
                className={navLinkClass}
            >
                <div className={cx('tab-item')}                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faBed} />
                    <p className={cx('tab-name')}>Room</p>
                </div>
            </NavLink>

            <NavLink to="/customer"
                className={navLinkClass}
            >
                <div className={cx('tab-item')}                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faUser} />
                    <p className={cx('tab-name')}>Customer</p>
                </div>
            </NavLink>

            <NavLink to="/staff"
                className={navLinkClass}
            >
                <div className={cx('tab-item')}                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faClipboardUser} />
                    <p className={cx('tab-name')}>Staff</p>
                </div>
            </NavLink>
            <NavLink to="/accounting"
                className={navLinkClass}
            >
                <div className={cx('tab-item')}                >
                    <FontAwesomeIcon className={cx('tab-icon')} icon={faCoins} />
                    <p className={cx('tab-name')}>Accounting</p>
                </div>
            </NavLink>
        </aside>
    );
}

export default Sidebar;
