import classNames from 'classnames/bind';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import uniqid from 'uniqid';
import styles from './Form.module.scss'


const cx = classNames.bind(styles);

function AddForm({option,option1,setShow,setRoomList}) {
    const [name,setName] = useState("")
    const [quantity,setQuantity] = useState(1)
    const handleAddRoom = (e)=>{
        e.preventDefault()
        let type ="";
        if(name.includes("grand")){
            type = 'grand'
        }
        else if(name.includes("paradise")){
            type = 'paradise'
        }
        else if(name.includes("marvelous")){
            type = 'marvelous'
        }
        const newRoom = {
            id: uniqid(),
            name ,
            row: 1,
            col: 2,
            w: 1,
            h: 1,
            status: 'Ready',
            quantity,
            filter: [type],
        }
        setRoomList((prev)=>(
            [...prev,newRoom]
        ))
        setShow(false)
    }
    return ( 
        <div className={cx('wrapper')}>
            <form>
                <div className={cx('feild')}>
                    <label className={cx('label')}>{option}</label>
                    <input type="text" 
                            className={cx('input')} 
                            placeholder="Enter room name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className={cx('feild')}>
                    <label className={cx('label')}>{option1}</label>
                    <input type="number" 
                            min ='1' max='5' 
                            className={cx('input')} 
                            placeholder="Choose capacity"
                            value={quantity}
                            onChange={(e)=>setQuantity(e.target.value)}
                    />
                </div>
                <button className={cx('btn-add')}
                        onClick = {handleAddRoom}
                >
                    Add Room
                </button>
            </form>
        </div>
    );
}

export default AddForm;