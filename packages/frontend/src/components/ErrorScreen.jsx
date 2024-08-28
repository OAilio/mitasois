/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import '../css/errorScreen.scss';

const ErrorScreen = ({ error }) => {
	return (
		<div className="error-bg">
			<FontAwesomeIcon icon={faTriangleExclamation} className='error-icon' />
				<span className='error-heading'>Something went wrong!</span>
				<span className='error-text'>Try refreshing the page or contant the app creator!</span>
				<span className='error-text bold'>Error: {error} </span>
		</div>
	)
};

export default ErrorScreen
