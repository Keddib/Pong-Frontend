import ModeImg from "/src/assets/images/mode1.png"
import ModeImg2 from "/src/assets/images/mode2.png"
import ModeImg3 from "/src/assets/images/mode3.png"
import Mode from "./components/Mode";
export default function Home() {
  return (
    <div className="home-layout ">
      <div className="sm:absolute sm:top-1/4 sm:left-0 main-child w-full">
        <Mode modeName='Test' className='bg-mode-one my-5' player={ModeImg} />
        <div className="flex flex-wrap justify-between gap-y-4">
          <Mode modeName='Test' className='bg-mode-two' player={ModeImg2} />
          <Mode modeName='Test' className='bg-mode-three' player={ModeImg3} />
        </div>
      </div>
    </div>
  );
}
