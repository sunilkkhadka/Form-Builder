import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../app/store";
import {
  ItemPayload,
  removeField,
  updateText,
  saveText,
  cancelEdit,
} from "../features/form/formSlice";

const RightBar = () => {
  const items = useSelector((state: RootState) => state.form.items);
  const selectedItemId = useSelector(
    (state: RootState) => state.form.selectedItemId
  );

  const dispatch = useDispatch();

  let selectedItem: ItemPayload = {
    id: "",
    text: "",
    draftText: "",
    isDropped: false,
  };

  if (items.length > 0) {
    selectedItem = items.find((item) => item.id === selectedItemId) || {
      id: "",
      text: "",
      draftText: "",
      isDropped: false,
    };
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateText({ id: selectedItemId || "", draftText: e.target.value })
    );
  };

  const handleCancel = () => {
    dispatch(cancelEdit({ id: selectedItem.id }));
  };

  const handleFinalizeSelection = () => {
    dispatch(saveText({ id: selectedItem.id }));
  };

  const handleRemoveField = () => {
    dispatch(removeField({ id: selectedItem.id }));
  };

  return (
    <div className="form">
      <h2>Form</h2>
      {selectedItem.isDropped ? (
        <>
          <input
            type="text"
            value={selectedItem.draftText}
            onChange={handleTextChange}
          />
          <div>
            <button onClick={handleFinalizeSelection}>Ok</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleRemoveField}>Remove</button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default RightBar;
