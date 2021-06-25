import React from "react";
import "./Welcome.css";

const Welcome = ({ setWelcome }) => {
  const [anime, setAnime] = React.useState(false);

  const welcomeBoard = () => {
    setAnime(true);
    const timeout = setTimeout(() => {
      setWelcome(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return (
    <main
      className={`welcome-component ${
        anime ? "click-welcome-component" : "welcome-component"
      }`}
      onClick={() => welcomeBoard()}
    >
      <h2>To-Do List</h2>
    </main>
  );
};
export default Welcome;
