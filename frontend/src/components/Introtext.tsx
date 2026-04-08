import '../styles/Introtext.scss';

export default function Introtext() {
  return (
    <>
      <h1>Spela Wordle!</h1>
      <div className="intro">
        <ul>
          <li>Välj ordlängd och antal försök under spel.</li>
          <li>Ju svårare ord, kortare tid och färre försök, desto bättre bättre placering i highscore-listan.</li>
          <li>När du är redo klicka på start!</li>
        </ul>
      </div>
    </>
  );
}
