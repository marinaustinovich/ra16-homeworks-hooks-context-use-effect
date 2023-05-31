import './List.css';
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Details from '../Details/Details';
import usePolling from '../../hooks/usePolling';

export default function List() {
    const [selectedItem, setSelectedItem] = useState(null);
    const { data: list, isLoading, error } = usePolling(process.env.REACT_APP_LIST_URL, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className='list-wrapper'>
            <div className='list'>
                <h3>List</h3>
                {isLoading ? (
                    <div className='loader'>
                        <FaSpinner className='spin' />
                    </div>
                ) : (
                    <ul className='list-items'>
                        {list.map(item => (
                            <li
                                key={item.id}
                                className={`list-item${item === selectedItem ? ' selected' : ''}`}
                                onClick={() => handleItemClick(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            {error && <p className='error'>{error}</p>}
            {selectedItem && (
                <Details info={selectedItem} />
            )}
        </div>
    );
}
