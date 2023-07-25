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
      <img alt="Search" src={searchImg.src} width={searchImg.width} />
    </span>
  );

  const [searchInputState, setSearchInputState] = useState<string>("");
  const [showMatchListState, setShowMatchListState] = useState<boolean>(false);

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputState(event.target.value);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchInputState((event.currentTarget[0] as HTMLInputElement).value);
    const person: Person = personList.find(
      (person: Person) =>
        `${person.firstName} ${person.lastName}`?.toUpperCase() ===
        (event.currentTarget[0] as HTMLInputElement).value.toUpperCase()
    );
    person && formSubmit(person);
  };

  const showMatchList = () => {
    setShowMatchListState(true);
  }

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.searchContainer}>
          <input
            autoComplete="off"
            onChange={searchInputHandler}
            onClick={showMatchList}
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
        formSubmit={formSubmit}
        showMatchList={showMatchListState}
        setShowMatchList={setShowMatchListState}
      />
    </div>
  );
};

export default MapSearch;
