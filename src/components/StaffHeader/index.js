import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless'; // different import path!
import { useContext } from 'react';
import { AppContext } from '../../App';

import Image from '../Image';
import images from '../../assets/images';
import styles from './StaffHeader.module.scss';
import Menu from '../Menu';
import { faBars, faUser, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const menuList = [
    {
        icon: faUser,
        title: 'Profile',
        to: '',
    },
    {
        icon: faGear,
        title: 'Settings',
        to: '/user/settings',
    },
    {
        icon: faArrowRightFromBracket,
        title: 'Logout',
        to: '/',
    },
];
function StaffHeader() {
    const { auth } = useContext(AppContext);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('name-hotel')}>14tHotel</h2>
            <div className={cx('about')}>
                <FontAwesomeIcon icon={faBars} />
                <div className={cx('desc')}>
                    <div className={cx('info')}>
                        <Image src={images.avatarStaff} className={cx('avatar')} />
                        <p className={cx('name')}>{auth ? auth.name : 'username'}</p>
                    </div>
                    <Tippy
                        render={(attrs) => <Menu data={menuList} />}
                        delay={[0, 1000]}
                        duration={300}
                        interactive
                        offset={[-60, 10]}
                    >
                        <div className={cx('settings')}>
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </Tippy>
                </div>
            </div>
        </div>
    );
}

export default StaffHeader;
