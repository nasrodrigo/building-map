import Person from "../../Interfaces/Person";
import classes from "./Map.module.css";

const MapSearchMatch = (props: any) => {
  const { searchInput, setSearchInput, setPersonState, personList } = props;
  
  let matchList: any[] = [];

  for (let person of personList) {
    if (
      searchInput !== "" &&
      `${person.firstName?.toUpperCase()} ${person.lastName?.toUpperCase()}`.includes(
        searchInput.toUpperCase()
      )
    ) {
      matchList.push({
        id: person.id,
        name: `${person.firstName} ${person.lastName}`,
      });
    }
  }

  const matchClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    setSearchInput(event.currentTarget.innerText);
    setPersonState(
      personList.find((person: Person) => person.id === event.currentTarget.id)
    );
  };

  return (
    <ul className={classes.matchRow}>
      {matchList.map((match: any) => {
        return (
          <li
            className={classes.matchList}
            key={match.id}
            id={match.id}
            onClick={matchClickHandler}
          >
            {match.name}
          </li>
        );
      })}
    </ul>
  );
};

export default MapSearchMatch;
