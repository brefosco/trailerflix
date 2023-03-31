import { t } from "i18next";
import Button from "./Button";

interface AddFavoriteButtonProps {
  foundFavoriteMedia: boolean;
  handleAdd: () => void;
  handleRemove: () => void;
}

function AddFavoriteButton({
  foundFavoriteMedia,
  handleAdd,
  handleRemove,
}: AddFavoriteButtonProps) {
  return foundFavoriteMedia ? (
    <Button onClick={handleRemove} variant="remove" className="py-1 px-2 my-2">
      {t("REMOVE_FAVORITE")}
    </Button>
  ) : (
    <Button className="py-1 px-2 my-2" onClick={handleAdd}>
      {t("ADD_FAVORITE")}
    </Button>
  );
}

export default AddFavoriteButton;
