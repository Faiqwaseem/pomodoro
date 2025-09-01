import React from 'react'
import { useState, useEffect } from 'react'


const Header = () => {
const [theme, setTheme] = useState(()=>{
const savedTheme = localStorage.getItem("theme");
return savedTheme ? savedTheme : "Dark";
});



useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme.toLowerCase())
    localStorage.setItem("theme", theme)
},[theme])

// console.log(theme)
    return (
        <div>
            <header className="appbar" role="banner">
                <div className="brand">
                    <div aria-hidden="true" className="brand-logo"></div>
                    <h1 aria-label="Pomofocus UI"><span>Pomo</span>focus</h1>
                </div>
                <nav className="actions" aria-label="Top actions">
                    <label htmlFor="Theme" className="pill-btn secondary" aria-label="Toggle theme">
                        Theme
                        <select value={theme} 
                        className="pill-btn secondary" 
                        aria-label="Toggle theme" 
                        name="Theme"
                        onChange={(e) => setTheme(e.target.value)}
                        >
                        {/* <option value="" disabled selected hidden>Theme</option> */}
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>

                    </label>
                    {/* <button className="pill-btn secondary" aria-label="Toggle theme">Theme</button> */}
                    {/* <button className="pill-btn" aria-label="Export data">Export</button> */}
                </nav>
            </header>

        </div>
    )
}

export default Header
