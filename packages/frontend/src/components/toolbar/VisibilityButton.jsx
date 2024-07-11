/* eslint-disable react/prop-types */
const VisibilityButton = ({ visibility, setVisibility, icon}) => {
  function toggleVisibility(){
    setVisibility(!visibility)
  }
  
  return (
    <div>
      <button onClick={toggleVisibility}>{icon}</button>
    </div>
  )
};

export default VisibilityButton
