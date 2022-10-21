import ReactDOM from 'react-dom'

function Portal(props: any) {
  return ReactDOM.createPortal(props.children, document.body)
}

export default Portal
