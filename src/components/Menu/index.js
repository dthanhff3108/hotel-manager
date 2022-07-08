import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);


function Menu({data}) {
    return (
        <div className={cx('wrapper')}>
            {data.map((item,index) => (
                <Link to={item.to}  key={index}>
                    <div className={cx('item')}>
                        <FontAwesomeIcon icon={item.icon} className={cx('icon')}/>
                        <p>{item.title}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Menu;
