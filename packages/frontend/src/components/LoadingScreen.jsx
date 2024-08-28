import '../css/loadingScreen.scss';

const LoadingScreen = () => {
  return (
    <div className="loading-bg">
        <span className='loading-heading'>Mitäsöis</span>
        <div className="spinner"></div>
        <span className='loading-text'>Loading...</span>
    </div>
  )
};

export default LoadingScreen
