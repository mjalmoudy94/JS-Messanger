import './StatusBar.css'

const StatusBar =  ({Status}) => {
    return (
        <div className={'StatusBarComponent'}>
            <h5>{Status} </h5>
        </div>
    );
}

StatusBar.defaultProps = {
    Message : 'Unknown'
}

export default StatusBar;