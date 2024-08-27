/* eslint-disable react/prop-types */
import '../../css/visibilityButton.scss'

const VisibilityButton = ({ visibility, setVisibility, closeOther, icon, text, classname, tooltip}) => {
  function toggleVisibility(){
    setVisibility(!visibility)
    closeOther(false) // Hopefully this doesn't bug horribly lol
  }
  
  return (
    <button className={classname} onClick={toggleVisibility} title={tooltip}>
      <div className='icon'>{icon}</div>
      <span>{text}</span>
    </button>
  )
};

export default VisibilityButton
