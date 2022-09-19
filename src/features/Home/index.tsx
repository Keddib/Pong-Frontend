import ModeImg from "assets/images/mode1.png";
import ModeImg2 from "assets/images/mode2.png";
import ModeImg3 from "assets/images/mode3.png";
import Mode from "./Mode";

export default function Home() {
  return (
    <div className="w-full m-auto">
      <Mode
        modeName="Classic"
        className="bg-mode-one mt-8 mb-5"
        player={ModeImg}
      />
      <div className="flex flex-wrap justify-between gap-y-5">
        <Mode modeName="Goalkeeper" className="bg-mode-two" player={ModeImg2} />
        <Mode
          modeName="DoublePaddle"
          className="bg-mode-three"
          player={ModeImg3}
        />
      </div>
      <div className="mt-2 bg-cornFlower rounded-xl p-4">
        <h4>rules</h4>
        <ul>
          <li>
            <p>
              <strong>Rule 1</strong> Hold left mouse button above or below your
              paddle to move it.
            </p>
          </li>
          <li>
            <p>
              <strong>Rule 2</strong> Dont let the ball enter you zone.
            </p>
          </li>
          <li>
            <p>
              <strong>Rule 3</strong> You win if you score N goals before your
              opponent.
            </p>
          </li>
          <li>
            <p></p>
          </li>
          <li>
            <p></p>
          </li>
        </ul>
      </div>
    </div>
  );
}
