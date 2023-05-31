import { FaSpinner } from 'react-icons/fa';
import './Details.css';
import PropTypes from 'prop-types';
import usePolling from '../../hooks/usePolling';

export default function Details({ info }) {
    const { data: details, isLoading, error } = usePolling(`${process.env.REACT_APP_DETAILS_URL}${info.id}.json`, []);

    return (
        <div className='details-wrapper' data-id={details.id}>
            <h4 className='details-title'>Details</h4>
            {isLoading ? (
                    <div className='loader'>
                        <FaSpinner className='spin' />
                    </div>
                )  : (
                <>
                    <img src={details.avatar} alt={details.name} className='avatar' />
                    <div className='name'>{details.name}</div>
                    <div className='details-item'>
                        <span className='details-label'>City:</span> {details.details && details.details.city}
                    </div>
                    <div className='details-item'>
                        <span className='details-label'>Company:</span> {details.details && details.details.company}
                    </div>
                    <div className='details-item'>
                        <span className='details-label'>Position:</span> {details.details && details.details.position}
                    </div>
                </>
            )}
            {error && <p className='error'>{error}</p>}
        </div>
    );
}

Details.propTypes = {
    info: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};