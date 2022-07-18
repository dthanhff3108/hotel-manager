import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { createContext, useState, useEffect } from 'react';
import { roomData, servicesData } from './data/index';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/config';

export const AppContext = createContext();

function App() {
    const [roomList, setRoomList] = useState(JSON.parse(localStorage.getItem('roomData')) || roomData);
    const [services, setServices] = useState(JSON.parse(localStorage.getItem('servicesData')) || servicesData);
    const [payList, setPayList] = useState([]);
    const [bookingList, setBookingList] = useState(JSON.parse(localStorage.getItem('bookingList')) || []);
    const [userList, setUserList] = useState([]);
    const [auth, setAuth] = useState(null);
    const [listIdCustomer, setListIdCustomer] = useState([]);
    const [listCustomer, setListCustomer] = useState([]);
    const [tab, setTab] = useState(1);
    const [coin, setCoin] = useState(0);
    useEffect(() => {
        localStorage.setItem('roomData', JSON.stringify(roomList));
        localStorage.setItem('servicesData', JSON.stringify(services));
        localStorage.setItem('bookingList', JSON.stringify(bookingList));
    }, [roomList, services,bookingList]);

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
                services,
                setServices,
                coin,
                setCoin,
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
