import React from 'react';
import './styles.css'
import apple from './apple.png'

export default function NavBar() {
    return (
        <nav className= 'nav'>
            <a href= '/'> <img className={'logo'} src= {apple} alt = 'apple'/></a>
            <ul>
                <a href = './pages/pantry.js'><li>Pantry</li></a>
                <a href= './pages/mealCurator.js'><li>Meal Curator</li></a>
                <a href = './pages/tracking'><li>Health Tracker</li></a>
                <a href = './pages/logIn'><li className= 'logIn'>Log In</li></a>
            </ul>
        </nav>
    );
}
