import { useCallback, useEffect, useState } from "react";
import classes from "./Map.module.css";
import Person from "../../Interfaces/Person";

const MapSearchMatch = (props: any) => {
  const {
    searchInput,
    setSearchInput,
    personList,
    formSubmit,
    showMatchList,
    setShowMatchList,
  } = props;

  const MATCH_LIST_ID = "match-list";
  const matchListElement: HTMLElement | null =
    document.getElementById(MATCH_LIST_ID);

  const [matchList, setMatchList] = useState<any[]>([]);

  const matchListHandler = useCallback(() => {
    let matchListArr: any[] = [];

    showMatchList && matchListElement?.classList.remove(classes.hideContent);

    for (let person of personList) {
      if (
        searchInput !== "" &&
        `${person.firstName} ${person.lastName}`
          ?.toUpperCase()
          .includes(searchInput.toUpperCase())
      ) {
        matchListArr.push({
          id: person.id,
          name: `${person.firstName} ${person.lastName}`,
        });
      }
    }
    setMatchList(matchListArr);
  }, [matchListElement?.classList, personList, searchInput, showMatchList]);

  useEffect(() => {
    matchListHandler();
  }, [matchListHandler, searchInput, showMatchList]);

  const hideMatchListElement = () => {
    setShowMatchList(false);
    matchListElement?.classList.add(classes.hideContent);
  };

  const listClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    hideMatchListElement();

    setSearchInput(event.currentTarget.innerText);

    const person: Person = personList.find(
      (person: Person) => person.id === event.currentTarget.id
    );

    person && formSubmit(person);
  };

  return (
    <ul id={MATCH_LIST_ID} className={classes.matchList}>
      {matchList.map((match: any) => {
        return (
          <li
            className={classes.matchRow}
            key={match.id}
            id={match.id}
            onClick={listClickHandler}
          >
            {match.name}
          </li>
        );
      })}
    </ul>
  );
};

export default MapSearchMatch;
