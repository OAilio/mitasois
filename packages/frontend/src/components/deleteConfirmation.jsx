/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/darkBgModal.scss';

const DeleteConfirmation = ({ food, onConfirm, onCancel }) => {
  return (
    <div className="darkened-background-container">
      <div className="message-container">
				<div className='message-content'>
					<FontAwesomeIcon icon={faTrash} className='large-trash-icon'/>
					<span className='message-text'>Are you sure you want to delete <span className='message-text bolder'>{food.name}</span>?</span>
				</div>
        <div className="button-group">
					<button className="secondary-button" onClick={onCancel}>Cancel</button>
          <button className="primary-button delete" onClick={onConfirm}>Delete</button>        
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;