/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import '../css/popUpMessageModal.scss';

const PopUpMessage = ({ message, setMessage, messageHeading, setMessageHeading }) => {
  const [fadeAway, setFadeAway] = useState(false);
  
	useEffect(() => {
    if (message) {
      // Make the message fade away when closing on on null.
      const fadeTimer = setTimeout(() => {
        setFadeAway(true)
      }, 4000);
      
      const timer = setTimeout(() => {
        setMessage(null)
        setMessageHeading(null)
      }, 5000); // 5 seconds

      // Cleanup the timer if the component is unmounted or message changes
      return () => {
        clearTimeout(timer)
        clearTimeout(fadeTimer)
        setFadeAway(false)
      };
    }
  }, [message, setMessage, messageHeading, setMessageHeading]);

	if (!message) {
		return null;
	}

  return (
    <div className={`pop-up-container ${fadeAway ? 'fadeaway' : ''}`} onClick={() => setFadeAway(true)} title="Click to dismiss">
			<FontAwesomeIcon icon={faCircleCheck} className='pop-up-icon' />
      <div className='pop-up-text'>
        <span className='large'>{messageHeading}</span>
        <span className='small'>{message}</span>
      </div>
    </div>
  )
};

export default PopUpMessage