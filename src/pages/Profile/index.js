import classNames from 'classnames/bind';
import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../App';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless'; // different import path!

const cx = classNames.bind(styles);

function Profile() {
    const {auth} = useContext(AppContext);
    const handleUpload = (e) => {
        const avtImg = URL.createObjectURL(e.target.files[0]);
          
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <span>Name: {auth.name}</span>
                <span>Phone: {auth.phone}</span>
                <span>ID: {auth.cardId}</span>
            </div>
            <div className={cx('image')}>
                <div className={cx('avt')}>
                    <img src={auth.img} alt="" />
                </div>
                <div className={cx('btn-change')}>
                    <label htmlFor="file">Upload Avatar</label>
                    <input
                        id="file"
                        type="file"
                        className={cx('input-file')}
                        accept=".jpg,.img,.png"
                        onChange={(e) => handleUpload(e)}
                    />
                </div>
            </div>
            <Link to="/user">
                <div className={cx('back-btn')}>
                    <FontAwesomeIcon icon={faAngleLeft} className={cx('icon')} />
                    <span>Back</span>
                </div>
            </Link>
        </div>
    );
}

export default Profile;
