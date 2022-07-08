import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { useState, useContext } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import styles from './Form.module.scss';

const cx = classNames.bind(styles);

function LoginForm() {
    const { auth, setAuth } = useContext(AppContext);
    let navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cardId, setCardId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const handleChange = () => {
        setIsLogin((prev) => !prev);
        setUserName('');
        setPassword('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            const querySnapshot = await getDocs(collection(db, 'auth'));
            querySnapshot.forEach(async (doc) => {
                if (doc.data().userName === userName && doc.data().password === password) {
                    if (doc.data()) {
                        await setAuth({ ...doc.data(), idUser: doc.id });
                    }
                    if (doc.data().role === 'admin') {
                        navigate('/main-staff');
                    } else {
                        navigate('/user');
                    }
                }
            });
        } else {
            await addDoc(collection(db, 'auth'), {
                name,
                phone,
                cardId,
                userName,
                password,
                role: 'user',
            });
            setIsLogin(true);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <form>
                <div className={cx('feild')}>
                    {!isLogin && (
                        <div>
                            <div className={cx('feild')}>
                                <input
                                    type="text"
                                    className={cx('input')}
                                    placeholder="What's your name ?"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <div className={cx('feild')}>
                                <input
                                    type="text"
                                    className={cx('input')}
                                    placeholder="Enter your phone number"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                />
                                <input
                                    type="text"
                                    className={cx('input')}
                                    placeholder="Enter your card ID"
                                    onChange={(e) => setCardId(e.target.value)}
                                    value={cardId}
                                />
                            </div>
                        </div>
                    )}
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Enter your username"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    />
                </div>
                <div className={cx('feild')}>
                    <input
                        type="password"
                        className={cx('input')}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                {!isLogin && (
                    <div className={cx('feild')}>
                        <input
                            type="password"
                            className={cx('input')}
                            placeholder="Confirm your password"
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            value={passwordConfirm}
                        />
                    </div>
                )}
                <button type="submit" className={cx('login-btn')} onClick={(e) => handleSubmit(e)}>
                    {isLogin ? 'Login' : 'Signup'}
                </button>
                <div className={cx('create')}>
                    {isLogin ? (
                        <p>
                            Not yet member ?{' '}
                            <span className={cx('create-link')} href="" onClick={(e) => handleChange(e)}>
                                Signup now
                            </span>
                        </p>
                    ) : (
                        <p>
                            Have an account ?{' '}
                            <span className={cx('create-link')} href="" onClick={(e) => handleChange(e)}>
                                Signin now
                            </span>
                        </p>
                    )}
                </div>
            </form>
            {/* <Alert /> */}
        </div>
    );
}

export default LoginForm;
