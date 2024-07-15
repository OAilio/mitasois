/* eslint-disable react/prop-types */
import '../../css/visibilityButton.scss'

const VisibilityButton = ({ visibility, setVisibility, icon, text, classname}) => {
  function toggleVisibility(){
    setVisibility(!visibility)
  }
  
  return (
    <button className={classname} onClick={toggleVisibility}>
      <div className='icon'>{icon}</div>
      <span>{text}</span>
    </button>
  )
};

export default VisibilityButton
