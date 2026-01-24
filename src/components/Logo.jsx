import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo-container">
        <img 
          src="/assets/c__Users_Notebook_AppData_Roaming_Cursor_User_workspaceStorage_f742ad0ad9fbd53d56a5c50ad748b463_images_image-ec89e48e-a479-4a1e-a0f9-955d14d2addc.png" 
          alt="XGL Dragon" 
          className="logo-image dragon-logo"
        />
      </div>
    </Link>
  )
}

export default Logo
