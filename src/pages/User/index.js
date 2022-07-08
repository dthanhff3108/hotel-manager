import classNames from 'classnames/bind';
import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';


import { AppContext } from '../../App';
import styles from './User.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faUser, faGear,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../components/Alert';
import Tippy from '@tippyjs/react/headless'; // different import path!
import Menu from '../../components/Menu';


const cx = classNames.bind(styles);
const menuList = [
    {
        icon: faUser,
        title: 'Profile',
        to: '/user/profile',
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
function User() {
    const { roomList,setBookingList,auth,setRoomList } = useContext(AppContext);
    const [show, setShow] = useState(false)
    const [idRoom,setIdRoom] = useState("")
    const [quantity,setQuantity] = useState("")
    const [startTime,setStartTime] = useState("")
    const [endTime,setEndTime] = useState("")
    const [alert,setAlert] = useState({show:false,msg:"",type:""})
    const modalEle = useRef(null)
    const checkTime = (e,value)=>{
        if(value<startTime){
            showAlert(true,"End Time must be greater Start Time","error")
        }
        else{
            setEndTime(value)
        }
    }
    const handleBooking = (event,id) => {
        setIdRoom(id)
        setShow(true)
    }
    const handleSubmit  = (e) => {
        e.preventDefault()
        const bookingItem = {
            idCustomer : auth.idUser,
            name: auth.name,
            quantity,
            startTime,
            endTime,
            idRoom,
        }
        if(quantity.trim()==="" ||startTime===""||endTime===""){
            showAlert(true,"Please fill all information !","error")
        }
        else{
            setQuantity("")
            showAlert(true,"Booking succesfully !","success")
            setShow(false)
            setBookingList(list=>[bookingItem,...list])
            setRoomList(list=>{
                const newList = list.map(room=>{
                    if(room.id===idRoom){
                        return {
                            ...room,
                            status : "Pending"
                        }
                    }
                    else{
                        return room
                    }
                })
                return newList
                }
            )
        }
    }
    const handleToggleModal = (e) => {
        if(e.target===modalEle.current){
            setShow(false)
        }
    }
    const showAlert =(show=true,msg="",type="") =>{
        setAlert({show,msg,type})
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Welcome, {auth!==null?auth.name:'Guest'}</h2>
                <div className={cx('info')}>
                    <img src={auth?.img} alt="" />
                    <p>{auth!==null?auth.name:'Guest'}</p>
                    <Tippy render={attrs=>(
                            <Menu data={menuList}/>
                        )}
                        delay={[0, 1000]}
                        duration={300}
                        interactive
                        offset={[-45,10]}>
                        <div><FontAwesomeIcon className={cx('menu-icon')} icon={faBars} /></div>
                    </Tippy>
                </div>
            </div>
            <div className={cx('body')}>
                <h1>List room available</h1>
                <div className={cx('room-list')}>
                    {roomList.map(room => {
                        if(room.status === 'Ready'){
                        return  (<div className={cx('room')} 
                                        key={room.id} 
                                        style={{backgroundImage:`url(${room.img})`}}
                                        onClick ={ (e,id=room.id) => handleBooking(e,id)}
                                    >
                                    <div className={cx('room-info')}>
                                        <p>{room.name}</p>
                                        <p>Capacity: {room.quantity}</p>
                                        <p>Cost: {room.cost}$/day</p>
                                    </div>
                                </div>)
                        }
                        
                    })}
                </div>
            </div>
            { show && 
                <div ref={modalEle} className={cx('modal')}
                    onClick={(e)=>handleToggleModal(e)}
                >
                    <form className={cx('content')}>
                        
                        <label>Number of person:</label>
                        <input type="text" 
                                value={quantity}
                                onChange={(e)=>setQuantity(e.target.value)}
                        />
                        <label>Start Time:</label>
                        <input type="date" 
                                value={startTime}
                                onChange={e=>setStartTime(e.target.value)}
                        />
                        <label>End Time:</label>
                        <input type="date" 
                                value={endTime}
                                onChange={e=>checkTime(e,e.target.value)}
                        />
                        <button className={cx('btn')}   
                                onClick ={(e)=>handleSubmit(e)}
                        >   
                            Booking now
                        </button>
                    </form>
                </div>            
            }
            {alert.show && 
               <Alert {...alert} removeAlert={showAlert}/>
            }
        </div>
    );
}

export default User;
