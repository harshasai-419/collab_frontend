import {Link} from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { SiTask } from "react-icons/si";
import { IoMoon, IoSunny } from "react-icons/io5"; // Added icons
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import SelectContext from '../../context/SelectContext';
import './dashHeaderIndex.css';

const DashboardHeader = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <SelectContext.Consumer>
            {value => {
                const { toggleTask } = value;
                return (
                    <nav className='nav-con'>
                        <div className='nav-left'>
                            <p className='nav-left-para-icon'><SiTask className="dash-icon" /></p>
                            <p className='nav-left-para'>TaskMe</p>
                        </div>
                        <div className='dash-input-con'>
                            <FaSearch className='search-icon' />
                            {/* FIX: Changed class="dash-input" to className="dash-input" */}
                            <input type="search" placeholder="Search" className="dash-input" />
                        </div>
                        <div className='nav-right'>
                            <Link className='link-item' to="/" onClick={() => toggleTask('dashboard')}>Home</Link>
                            <Link className='link-item' to="/about">About</Link>
                            <Link className='link-item' to="/Logout">Logout</Link>
                            
                            {/* New Theme Toggle Button */}
                            <button 
                                className='theme-toggle-btn' 
                                onClick={toggleTheme}
                                aria-label="Toggle Dark/Light Mode"
                            >
                                {theme === 'light' ? <IoMoon /> : <IoSunny />}
                            </button>
                        </div>
                    </nav>
                )
            }}
        </SelectContext.Consumer>
    )
}

export default DashboardHeader