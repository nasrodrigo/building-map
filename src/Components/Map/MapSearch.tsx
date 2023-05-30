import React, { useState } from "react";
import classes from "./Map.module.css";
import MapSearchMatch from "./MapSearchMatch";
import Person from "../../Interfaces/Person";
import SearchImg from "../../img/search_FILL0_wght400_GRAD0_opsz48.svg";
import { createImage } from "../../Commons/Utils";

const MapSearch = (props: any) => {
  const { formSubmit, personList } = props;

  const searchImg: HTMLImageElement = createImage(SearchImg);
  searchImg.width = 24;

  const searchIcon = (
    <span className={classes.icon}>
      <img alt="Search" src={searchImg.src} width={searchImg.width}/>
    </span>
  );

  const [personState, setPersonState] = useState<Person | null>(null);
  const [searchInputState, setSearchInputState] = useState<string>("");

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputState(event.target.value);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (personState === null) {
      return;
    }
    event.preventDefault();
    formSubmit(personState);
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.searchContainer}>
          <input
            autoComplete="off"
            onChange={searchInputHandler}
            value={searchInputState}
            type="text"
            name="search-input"
          />
          <button type="submit" className={classes.searchButton}>
            {searchIcon}
          </button>
        </div>
      </form>
      <MapSearchMatch
        personList={personList}
        searchInput={searchInputState}
        setSearchInput={setSearchInputState}
        setPersonState={setPersonState}
      />
    </div>
  );
};

export default MapSearch;
