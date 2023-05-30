import React, { useState, useRef, useEffect } from "react";
import Person, { person } from "../../Interfaces/Person";
import classes from "./Person.module.css";
import { addPerson, updatePerson } from "../../Servers/PersonServer";

interface FeedbackMessage {
  msg: string;
  color: string;
}

const PersonForm = (props: any) => {
  const { hidePersonForm, personUpdate, setPersonListUpdated } = props;

  const feedbackMessage = useRef<HTMLDivElement>(null);

  const [personState, setPersonState] = useState<Person>(person);
  const [feedbackMessageState, setFeedbackMessageState] =
    useState<FeedbackMessage>({ msg: "", color: "" });

  useEffect(() => {
    if (personUpdate.id) setPersonState(personUpdate);
  }, [personUpdate]);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    for (let key in personState) {
      if (key === event.target.name) {
        setPersonState({
          ...personState,
          [event.target.name]: event.target.value,
        });
      } else if (event.target.name === "email") {
        personState.contact!.email = event.target.value;
        setPersonState({
          ...personState,
        });
      } else if (event.target.name === "phoneType") {
        personState.contact!.phone!.phoneType = event.target.value;
        setPersonState({
          ...personState,
        });
      } else if (event.target.name === "phoneNumber") {
        personState.contact!.phone!.phoneNumber = event.target.value;
        setPersonState({
          ...personState,
        });
      }
    }
  };

  const validateForm = (person: Person) => {
    if (!person) {
      return;
    }

    if (!personState.firstName || !personState.lastName) {
      setFeedbackMessageState({
        msg: "Fields first and last name must be filled",
        color: "red",
      });
      feedbackMessage.current!.style.display = "block";
      return;
    }

    if (personState.contact ? !personState.contact.email : false) {
      setFeedbackMessageState({
        msg: "Fields email must be filled",
        color: "red",
      });
      feedbackMessage.current!.style.display = "block";
      return;
    }
  };

  const addPersonHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (!personState || !feedbackMessage.current) {
      return;
    }

    event.preventDefault();

    validateForm(personState);

    if (personState.id) {
      updatePerson(personState).then((result) => {
        if (result === "success") {
          setFeedbackMessageState({
            msg: "Updated successfully",
            color: "blue",
          });
          setPersonListUpdated(true);
        } else {
          setFeedbackMessageState({ msg: "Error updating", color: "red" });
        }
      });
      feedbackMessage.current.style.display = "block";
      setTimeout(() => {
        hidePersonForm();
      }, 1000);

      return;
    }

    addPerson(personState).then((result) => {
      if (result === "success") {
        setFeedbackMessageState({ msg: "Saved successfully", color: "blue" });
        setPersonListUpdated(true);
      } else {
        setFeedbackMessageState({ msg: "Error saving", color: "red" });
      }
      
    });
    feedbackMessage.current.style.display = "block";
    setTimeout(() => {
      hidePersonForm();
    }, 1000);
  };

  return (
    <>
      <form className={classes.personForm} onSubmit={addPersonHandler}>
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
        <div>
          <input
            type="text"
            name="firstName"
            value={personState.firstName}
            onChange={inputChangeHandler}
            id="first-name"
            placeholder="First Name *"
            title="Field name"
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={personState.lastName}
            onChange={inputChangeHandler}
            id="last-name"
            placeholder="Last Name *"
            title="Field name"
          />
        </div>
        <div>
          <input
            type="text"
            name="email"
            value={personState.contact?.email}
            onChange={inputChangeHandler}
            id="email"
            placeholder="Email *"
            title="Field email"
          />
        </div>
        <div>
          <select
            name="phoneType"
            value={personState.contact?.phone?.phoneType}
            onChange={inputChangeHandler}
          >
            <option value="phone">Phone</option>
            <option value="cellphone">Cell Phone</option>
          </select>
          <input
            type="phone"
            value={personState.contact?.phone?.phoneNumber}
            onChange={inputChangeHandler}
            name="phoneNumber"
            id="phone"
            placeholder="Phone number"
            title="Field phone"
          />
        </div>
        <div className={classes.formButtonSection}>
          <button
            onClick={hidePersonForm}
            type="reset"
            title="Button cancel submit"
          >
            Cancel
          </button>
          <button type="submit" title="Button submit person">
            {personState.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
