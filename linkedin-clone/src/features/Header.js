import React from "react"
import "./header.css"
import SearchIcon from '@material-ui/icons/Search';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HeaderOption from "./HeaderOption"
import HomeIcon from '@material-ui/icons/Home';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const Header = () => {
    return (
        <div className="header">
            <div className="header__left">
                <div className="img">
                    <LinkedInIcon style={{ color: "blue", height: "50px", width: "50px" }} />
                </div>
                <div className="header__search">
                    <SearchIcon style={{ height: "25px", width: "25px" }} />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="header__right">
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOption Icon={ChatIcon} title="Messaging" />
                <HeaderOption Icon={NotificationsIcon} title="Notifications" />
                <HeaderOption Avatar={AccountCircleIcon} title="Me" />
            </div>
        </div>
    )
}

export default Header
