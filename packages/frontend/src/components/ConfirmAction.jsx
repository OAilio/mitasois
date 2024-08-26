/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../css/darkBgModal.scss';

const ConfirmAction = ({ food, onConfirm, onCancel, type }) => {
  return (
    <div className="darkened-background-container">
      <div className="message-container">
				<div className='message-content'>
          {type == "delete" ? (
            <>
            <FontAwesomeIcon icon={faTrash} className='confirmation-icon' />
            <span className='message-text'>
              Are you sure you want to delete <span className='message-text bolder'>{food.name}</span>?
            </span>
            <div className="button-group">
              <button className="secondary-button" onClick={onCancel}>Cancel</button>
              <button className="primary-button delete" onClick={onConfirm}>Delete</button>
            </div>
            </>            
          ) : (
            <>
						<FontAwesomeIcon icon={faTriangleExclamation} className='confirmation-icon' />
						<span className='message-text'>Canceling will discard all unsaved changes. Do you wish to proceed?</span>
            <div className="button-group">
              <button className="secondary-button" onClick={onCancel}>No, go back</button>
              <button className="primary-button" onClick={onConfirm}>Yes, proceed</button>  
            </div>
            </>  
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;