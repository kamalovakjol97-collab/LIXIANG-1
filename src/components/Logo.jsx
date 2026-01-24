import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo-container">
        <img 
          src="/assets/c__Users_Notebook_AppData_Roaming_Cursor_User_workspaceStorage_f742ad0ad9fbd53d56a5c50ad748b463_images________________________-c04fa96d-685d-4586-aded-b3ebfcbe163c.png" 
          alt="XGL GROUP" 
          className="logo-image"
        />
      </div>
    </Link>
  )
}

export default Logo
