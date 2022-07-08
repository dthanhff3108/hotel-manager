import classNames from 'classnames/bind';
 
import StaffHeader from '../../StaffHeader'
import Sidebar from '../../Sidebar'
import styles from './ManagerLayout.module.scss'


const cx = classNames.bind(styles);

function ManagerLayout({children}) {
    return ( 
        <div className={cx("wrapper")}>
            <StaffHeader/>
            <div className={cx('body')}>
                <Sidebar/>
                {children}
            </div>
        </div>
     );
}

export default ManagerLayout;