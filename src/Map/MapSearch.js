import React, { useState } from 'react';

const mapSearch = () => {
    
    return <header>
            <form action="#" method="GET">
                <div className="search-container">
                    <input type="text" name="search-input" />
                    <button className="search-button"><i className="fas fa-search fa-lg"></i></button>
                </div>
            </form>
        </header>;
    
}

export default mapSearch;