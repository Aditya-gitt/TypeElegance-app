import "./LoginButton.scss";

const LoginButton = ({ text, onClick, icon, icon2 }) => {
  return (
    <>
      <div className="login-button-body" onClick={onClick}>
        <p className="login-button-text">
          {icon ? <div className="logn-button-icon">{icon}</div> : null}
          {text}{" "}
          {icon2 ? <div className="logn-button-icon2">{icon2}</div> : null}
        </p>
      </div>
    </>
  );
};

export default LoginButton;
