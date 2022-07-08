import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);
function Header() {
    const [active, setActive] = useState(false);
    useEffect(() => {
        const toogle = setInterval(() => {
            setActive((prev) => !prev);
        }, 1000);
        return () => clearInterval(toogle);
    });
    return (
        <div className={cx('header')}>
            <Link to="/">
                <div className={cx('text-head', { active: active })}>
                    <i></i>
                    <h2 className={cx('name')}>14t-Hotel Paradise</h2>
                    <h4 className={cx('desc')}>Live your life !</h4>
                </div>
            </Link>
            <div className={cx('nav')}>
                <Link to="/">
                    <div className={cx('nav-item')}>Home</div>
                </Link>
                <Link to="/about">
                    <div className={cx('nav-item')}>About </div>
                </Link>
                <Link to="/about">
                    <div className={cx('nav-item')}>Contact</div>
                </Link>
            </div>
        </div>
    );
}

export default Header;
