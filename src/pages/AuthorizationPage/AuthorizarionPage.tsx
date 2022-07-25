import Button from "../../components/Button/Button";
import { ButtonStyles } from "../../lib/enums";
import { authorize, signup } from "../../lib/helpers";
import "./authorization-page.scss";

const AuthorizationPage = () => {
  return (
    <main className="authorization-page">
      <h1 className="authorization-page__title">
        To use this app you need user authorization.
      </h1>
      <Button
        label="Authorize"
        style={ButtonStyles.Primary}
        handleClick={() => authorize()}
      />
      <Button
        label="Sign up for Spotify"
        style={ButtonStyles.Secondary}
        handleClick={() => signup()}
      />
      <em className="authorization-page__important-message">
        You need a Spotify accunt to authorize. Don't have an
        account? Sign up for free. We'll be waiting for you right
        here.
      </em>
    </main>
  );
};

export default AuthorizationPage;
