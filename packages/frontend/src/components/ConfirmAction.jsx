/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../css/darkBgModal.scss';

const ConfirmAction = ({ food, primaryAction, secondaryAction, type }) => {
  return (
    <div className="darkened-background-container">
      <div className="message-container">
        <div className='message-content'>
          {type === "delete" ? (
            <>
              <FontAwesomeIcon icon={faTrash} className='confirmation-icon' />
              <span className='message-text'>
                Are you sure you want to delete <span className='message-text bolder'>{food.name}</span>?
              </span>
              <div className="button-group">
                <button className="secondary-button" onClick={secondaryAction}>Cancel</button>
                <button className="primary-button delete" onClick={primaryAction}>Delete</button>
              </div>
            </>
          ) : type === "duplicate" ? (
            <>
              <FontAwesomeIcon icon={faTriangleExclamation} className='confirmation-icon' />
              <span className='message-text'>
                <span className='message-text bolder'>{food.name}</span> already exists.
                Do you wish to view the existing item or create a new one with the same name?
              </span>
              <div className="button-group">
                <button className="secondary-button" onClick={secondaryAction}>Create new</button>
                <button className="primary-button" onClick={primaryAction}>View existing</button>
              </div>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faTriangleExclamation} className='confirmation-icon' />
              <span className='message-text'>
                Canceling will discard all unsaved changes. Do you wish to proceed?
              </span>
              <div className="button-group">
                <button className="secondary-button" onClick={secondaryAction}>No, go back</button>
                <button className="primary-button" onClick={primaryAction}>Yes, proceed</button>  
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;