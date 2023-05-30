import classes from "./Modal.module.css";
import CloseImg from "../../img/close_FILL0_wght400_GRAD0_opsz48.svg";
import { createImage } from "../../Commons/Utils";

const Modal = (props: any) => {
  const { handleClose, show, children } = props;
  const showHideClassName: string = show
    ? `${classes.modal}  ${classes.displayBlock}`
    : `${classes.modal}  ${classes.displayNone}`;

  const closeImg: HTMLImageElement = createImage(CloseImg);

  return (
    <>
      <div className={showHideClassName}>
        <section className={classes.modalMain}>
          <div className={classes.modalButtonSection}>
            <img
              className={classes.modalButton}
              src={closeImg.src}
              alt="Close"
              onClick={handleClose}
            />
          </div>
          {children}
        </section>
      </div>
    </>
  );
};

export default Modal;
