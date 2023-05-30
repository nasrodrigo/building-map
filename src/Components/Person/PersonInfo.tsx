import { useRef, useState } from "react";
import { FeedbackMessage } from "../../Interfaces/Login";
import classes from "./Person.module.css";
import { deletePerson } from "../../Servers/PersonServer";
import { getLogedUser } from "../../Commons/Utils";

const PersonInfo = (props: any) => {
  const {
    personInfoState,
    showFormFilled,
    hideModalInfo,
    setPersonListUpdated,
  } = props;

  const [feedbackMessageState, setFeedbackMessageState] =
    useState<FeedbackMessage>({ msg: "", color: "" });

  const feedbackMessage = useRef<HTMLDivElement>(null);

  const user = getLogedUser();

  const removePersonHandler = () => {
    if (!personInfoState.id || !feedbackMessage.current) {
      return;
    }

    deletePerson(personInfoState.id);
    setFeedbackMessageState({ msg: "Removed successfully", color: "blue" });
    feedbackMessage.current.style.display = "block";
    setPersonListUpdated(true);
    setTimeout(() => {
      hideModalInfo();
    }, 1000);
  };

  return (
    <>
      <div ref={feedbackMessage} className={classes.feedbackMessage}>
        <p
          style={{
            color: feedbackMessageState
              ? feedbackMessageState.color
              : undefined,
          }}
        >
          {feedbackMessageState ? feedbackMessageState.msg : undefined}
        </p>
      </div>
      <div className={classes.personInfo}>
        <h3>{personInfoState.firstName + " " + personInfoState.lastName}</h3>
        <p>
          <b>Contact</b>
        </p>
        <p>Email: {personInfoState.contact.email}</p>
        <p>
          {personInfoState.contact.phone.phoneType +
            ": " +
            personInfoState.contact.phone.phoneNumber}
        </p>
        <div className={user.isAdmin ? "" : classes.hideContent}>
          <button onClick={removePersonHandler} type="button">
            Remove
          </button>
          <button onClick={showFormFilled} type="button">
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default PersonInfo;
