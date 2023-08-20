import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { setName, setEmail, clearForm } from "../redux/slicers/formSlicer";

const InputField = () => {
  const {name, email} = useSelector((state) => state.userForm);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setName(event.target.value));
    dispatch(setEmail(event.target.value));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(clearForm());
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleChange} />
        <input type="text" value={email} onChange={handleChange} />
      </form>
    </div>
  );
};

export default InputField;