import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface AddWatchedButtonProps {
  foundWatchedMedia: boolean;
  handleAdd: () => void;
  handleRemove: () => void;
}

function AddWatchedButton({
  foundWatchedMedia,
  handleAdd,
  handleRemove,
}: AddWatchedButtonProps) {
  return foundWatchedMedia ? (
    <AiFillEye size="35" onClick={handleRemove} />
  ) : (
    <AiFillEyeInvisible size="35" onClick={handleAdd} />
  );
}

export default AddWatchedButton;
