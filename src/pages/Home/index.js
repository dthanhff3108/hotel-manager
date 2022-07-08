import React, { useState, useRef} from 'react';
import classNames from 'classnames/bind';
 
import {LoginForm} from '../../components/Form'
import Header from '../../components/Header'
import styles from './Home.module.scss'
import SlickSlider from '../../components/Slider'

const cx = classNames.bind(styles);
function Home() {
   
    return ( 
        <div className={cx('wrapper')}>
            <Header/>
            <SlickSlider/>
            <div className={cx("login")}>
                <LoginForm/>
            </div>
            <div className={cx("desc")}>
                <h2>14t-Hotel Paradise</h2>
                <p>1 Hùng Vương, Ba Đình, Hà Nội, Việt Nam</p>
                <p>Hotline : +84 123 43452224</p>
                <p>Email : 14thotel@gmail.com</p>
            </div>
        </div>
     );
}

export default Home;