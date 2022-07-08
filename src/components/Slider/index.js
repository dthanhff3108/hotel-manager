import Slider from 'react-slick';
import React, { useState, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames/bind';

import images from '../../assets/images';
import styles from './Slider.module.scss';
const cx = classNames.bind(styles);
const SimpleSlider = () => {
    const ref = useRef({});
    const PrevBtn = () => {
        return <div className="slick-arrow" style={{display:"inline-block"}} onClick={() => ref.current.slickPrev()}>prev</div>;
    };
    const styles= {
        }
    const NextBtn = () => {
        const styles= {
            }
        return <div className="slick-arrow"  style={{display:"inline-block"}} onClick={() => ref.current.slickNext()}>next</div>;
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        lazyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
    };
    return (
        <Slider ref={ref} {...settings}>
            <div className={cx('slider-item')}>
                <img className={cx('slider-img')} alt="" src={images.slider1} />
            </div>
            <div className={cx('slider-item')}>
                <img className={cx('slider-img')} alt="" src={images.slider2} />
            </div>
            <div className={cx('slider-item')}>
                <img className={cx('slider-img')} alt="" src={images.slider4} />
            </div>
        </Slider>
    );
};

export default SimpleSlider;
