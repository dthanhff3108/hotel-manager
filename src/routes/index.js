import Home from '../pages/Home';
import MainStaff from '../pages/MainStaff';
import About from '../pages/About';
import RoomManager from '../pages/RoomManager';
import RoomDetail from '../pages/RoomDetail'
import User from '../pages/User'
import Customer from '../pages/Customer'
import Accounting from '../pages/Accounting';
import Profile from '../pages/Profile'

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/main-staff', component: MainStaff },
    { path: '/room', component: RoomManager },
    { path: '/room/@:room_id', component: RoomDetail },
    { path: '/user', component: User },
    { path: '/user/profile', component: Profile },
    { path: '/customer', component: Customer },
    { path: '/accounting', component: Accounting },
];


export { publicRoutes };
