import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { createContext, useState, useEffect } from 'react';
import { roomData } from './data/index';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';

export const AppContext = createContext();

function App() {
    const [roomList, setRoomList] = useState(JSON.parse(localStorage.getItem('roomData')) || roomData);
    const [bookingList, setBookingList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [auth, setAuth] = useState(null);
    const [listIdCustomer, setListIdCustomer] = useState([]);
    const [listCustomer, setListCustomer] = useState([]);
    const [tab, setTab] = useState(1);
    const [payList, setPayList] = useState([
        {
            name : "t",
            roomName: 4,
            time:4,
            priceRoom: 200,
            cost:"22",
            services : [
                {
                    name:"Water",
                    number : 2,
                    price : 1
                },
                { 
                    name : "Snack",
                    number : 10,
                    price : 2
                }
            ],
        }
    ]);
    const [coin, setCoin] = useState('');
    // useEffect(() => {
    //     localStorage.setItem('roomData', JSON.stringify(roomList));
    // }, [roomList]);
    useEffect(() => {
        listIdCustomer.forEach(async (item) => {
            const document = await getDoc(doc(db, 'auth', item));
            if (document.exists()) {
                const dataUser = document.data();
                if (listCustomer.length === 0) {
                    setListCustomer([dataUser]);
                } else {
                    let isExist = false;
                    listCustomer.forEach((user) => {
                        if (user.userName === dataUser.userName) {
                            isExist = true;
                            return;
                        }
                    });
                    if (!isExist) {
                        setListCustomer((list) => [...list, dataUser]);
                    }
                }
            }
        });
    }, [listIdCustomer]);

    return (
        <AppContext.Provider
            value={{
                roomList,
                setRoomList,
                bookingList,
                setBookingList,
                auth,
                setAuth,
                userList,
                setUserList,
                listIdCustomer,
                setListIdCustomer,
                listCustomer,
                setListCustomer,
                tab,
                setTab,
                payList,
                setPayList,
            }}
        >
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </div>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
