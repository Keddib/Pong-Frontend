import Player1 from "../../../../public/assets/images/mode1.png";
import Player2 from "../../../../public/assets/images/mode2.png";
import Player3 from "../../../../public/assets/images/mode3.png";

import Mode from "./components/Mode";
const Index = () => {
  return (
    <div className="Dash-main-home">
      <Mode modeName="No limit" player={Player1} className="bg-mode-one" />
      <Mode modeName="goal keeper" player={Player2} className="bg-mode-two" />
      <Mode
        modeName="king of hell"
        player={Player3}
        className="bg-mode-three "
      />
    </div>
  );
};

export default Index;
