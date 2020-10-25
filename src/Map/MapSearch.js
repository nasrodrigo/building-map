import React from 'react';
import classes from './MapSearch.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

const MapSearch = () => {
    return <header>
            <form action="#" method="GET">
                <div className={classes.searchContainer}>
                    <input type="text" name="search-input" />
                    <button className={classes.searchButton}><i className="fas fa-search fa-lg"></i></button>
                </div>
            </form>
        </header>;
}

export default MapSearch;