import '../styles/StartPage.scss';
import type { ReactNode } from "react";
import Introtext from "./Introtext";
import StartGameBtn from "./StartGameBtn";

export default function StartPage(): ReactNode {
  return (
    <div className='startpage'>
      <Introtext />
      <StartGameBtn />
    </div>
  );
}
