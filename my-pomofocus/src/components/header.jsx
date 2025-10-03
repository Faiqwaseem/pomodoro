import React from 'react'
import { useState, useEffect } from 'react'
import { Settings, UserPlus } from "lucide-react"; 

const Header = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "Dark";
    });



    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme.toLowerCase())
        localStorage.setItem("theme", theme)
    }, [theme])

    // console.log(theme)
    return (
        <div>
            <header className="appbar" role="banner">
                <div className="brand">
                    <div aria-hidden="true" className="brand-logo"></div>
                    <h1 aria-label="Pomofocus UI"><span>Pomo</span>focus</h1>
                </div>

                <nav className="actions" aria-label="Top actions">
                    {/* Theme Toggle */}
                    <label htmlFor="Theme" className="pill-btn secondary" aria-label="Toggle theme">
                        Theme
                        <select
                            value={theme}
                            className="pill-btn secondary"
                            aria-label="Toggle theme"
                            name="Theme"
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="Light">Light</option>
                            <option value="Dark">Dark</option>
                        </select>
                    </label>

                    {/* Settings Button */}
                    <button className="pill-btn secondary" aria-label="Settings">
                        <Settings size={18} style={{ marginRight: "6px" }} />
                        Settings
                    </button>

                    {/* Sign Up Button */}
                    <button className="pill-btn" aria-label="Sign up">
                        <UserPlus size={18} style={{ marginRight: "6px" }} />
                        Sign Up
                    </button>
                </nav>
            </header>

        </div>
    )
}

export default Header
