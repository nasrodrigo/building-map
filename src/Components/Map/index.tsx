import { useCallback, useEffect, useState } from "react";
import Person, { person } from "../../Interfaces/Person";
import PersonForm from "../Person/PersonForm";
import MapSearch from "./MapSearch";
import MapSignout from "./MapSignout";
import MapCanvas from "./MapCanvas";
import PersonInfo from "../Person/PersonInfo";
import Modal from "../Modal/Modal";
import { getPersonList } from "../Person/PersonList";

const Map = () => {
  const [personListState, setPersonListState] = useState<Person[]>([]);
  const [personListUpdated, setPersonListUpdated] = useState<boolean>(false);
  const [personInfoState, setPersonInfoState] = useState<Person>(person);
  const [showModalPersonForm, setShowModalPersonForm] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const updatePersonList = useCallback(() => {
    getPersonList().then((data) => setPersonListState(data));
    setPersonListUpdated(false);
  }, [setPersonListUpdated]);

  useEffect(() => {
    updatePersonList();
  }, [personListUpdated, updatePersonList]);

  const showFormFilled = () => {
    setShowModalInfo(false);
    setShowModalPersonForm(true);
  };

  const showFormEmpty = () => {
    setPersonInfoState(person);
    setShowModalPersonForm(true);
  };

  const drawSearchResult = (person: Person) => {
    setPersonInfoState(person);
    setShowModalInfo(true);
  };

  const hideModalPersonForm = () => {
    setShowModalPersonForm(false);
  };

  const hideModalInfo = () => {
    setShowModalInfo(false);
  };

  return (
    <>
      <header>
        <MapSearch formSubmit={drawSearchResult} personList={personListState} />
        <MapSignout />
      </header>
      <Modal
        show={showModalPersonForm}
        handleClose={hideModalPersonForm}
      >
        <PersonForm
          hidePersonForm={hideModalPersonForm}
          setPersonListState={setPersonListState}
          setPersonListUpdated={setPersonListUpdated}
          personUpdate={personInfoState}
        />
      </Modal>
      <Modal show={showModalInfo} handleClose={hideModalInfo}>
        <PersonInfo
          personInfoState={personInfoState}
          setPersonInfoState={setPersonInfoState}
          hideModalInfo={hideModalInfo}
          setPersonListUpdated={setPersonListUpdated}
          showFormFilled={showFormFilled}
        />
      </Modal>

      <MapCanvas showPersonForm={showFormEmpty} />
    </>
  );
};

Map.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Map;
