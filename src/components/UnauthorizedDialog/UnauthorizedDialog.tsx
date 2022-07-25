import { authorize } from "../../lib/helpers";
import Dialog from "../Dialog/Dialog";

const UnauthorizedDialog = () => {
  return (
    <Dialog
      header="Oops. It Seems you do not have authorization"
      buttonLabel="Authorize"
      handleClick={authorize}
    />
  );
};

export default UnauthorizedDialog;
