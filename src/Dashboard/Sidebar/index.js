import { SM } from "/src/Components/Constants";
import { useState } from "react";
import useMedia from "/src/Components/Media";
import Logo from "/src/Components/Logo";
import Bars from "/src/assets/icons/bars.svg";
import Navbar from "./components/Navbar";



const Nav = () => {

  const [showNav, setShowNav] = useState(false);
  const smDevice = useMedia(SM);

  function hundleClick() {
    setShowNav(!showNav);
  }

  let showIt = showNav;

  // Always show it excep on small device
  // on small device show nav on click
  if (smDevice)
    showIt = true;

  return (
    <header className="navbar ">
      <Logo className={smDevice && "group-hover:animate-bounce"} />
      {showIt && <Navbar veiw={smDevice} showNav={hundleClick} />}
      <button onClick={hundleClick} className="group nav-btn">
        <Bars className="nav-icon" />
      </button>
    </header>
  );
};

export default Nav;
