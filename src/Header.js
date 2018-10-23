import React, { Component } from 'react';
import Image from './logo.svg'
import './App.css';

class Header extends Component {
    render() {
        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <a className='navbar-brand' href='#'>
                            React Inbox
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
