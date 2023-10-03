import { useDispatch, useSelector } from "react-redux";
import "./PopUp.scss";
import { useEffect } from "react";
import { HIDE_POP_UP } from "../../states/popUpSlice";

const PopUp = () => {
  const popUp = useSelector((state) => state.popUp);
  const dispatch = useDispatch();

  useEffect(() => {
    if (popUp.pop == true)
      setTimeout(() => {
        dispatch(HIDE_POP_UP());
      }, 9000);
  }, [popUp]);

  return (
    <>
      {popUp.pop ? (
        <div className="pop-up-cover">
          <p>{popUp.message}</p>
        </div>
      ) : null}
    </>
  );
};

export default PopUp;
