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

  const upadtePersonList = useCallback(() => {
    getPersonList().then((data) => setPersonListState(data));
    setPersonListUpdated(false);
  }, [setPersonListUpdated]);

  useEffect(() => {
    upadtePersonList();
  }, [personListUpdated, upadtePersonList]);

  const showFormFilled = () => {
    hideModalInfo();
    showModalPersonForm();
  };

  const drawSearchResult = (person: Person) => {
    setPersonInfoState(person);
    showModalInfo();
  };

  const [showAndHideModalPersonForm, setShowAndHideModalPersonForm] =
    useState(false);

  const showModalPersonForm = () => {
    setShowAndHideModalPersonForm(true);
  };

  const hideModalPersonForm = () => {
    setShowAndHideModalPersonForm(false);
  };

  const [showAndHideModalInfo, setShowModalInfo] = useState(false);

  const showModalInfo = () => {
    setShowModalInfo(true);
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
        show={showAndHideModalPersonForm}
        handleClose={hideModalPersonForm}
      >
        <PersonForm
          hidePersonForm={hideModalPersonForm}
          setPersonListState={setPersonListState}
          setPersonListUpdated={setPersonListUpdated}
          personUpdate={personInfoState}
        />
      </Modal>
      <Modal show={showAndHideModalInfo} handleClose={hideModalInfo}>
        <PersonInfo
          personInfoState={personInfoState}
          setPersonInfoState={setPersonInfoState}
          hideModalInfo={hideModalInfo}
          setPersonListUpdated={setPersonListUpdated}
          showPersonForm={showModalPersonForm}
          showFormFilled={showFormFilled}
        />
      </Modal>

      <MapCanvas actions={{ showPersonForm: showModalPersonForm }} />
    </>
  );
};

Map.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Map;
