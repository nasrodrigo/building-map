import React from 'react';
import classes from './MapSearch.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faSearch } from '@fortawesome/free-solid-svg-icons';

const MapSearch = () => {
    const searchIcon = <FontAwesomeIcon icon={faSearch} className="fas fa-lg" />
    return <header>
            <form action="#" method="GET">
                <div className={classes.searchContainer}>
                    <input type="text" name="search-input" />
                    <button className={classes.searchButton}>{searchIcon}</button>
                </div>
            </form>
        </header>;
}

export default MapSearch;