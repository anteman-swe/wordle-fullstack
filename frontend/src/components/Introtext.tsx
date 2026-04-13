import '../styles/Introtext.scss';

export default function Introtext() {
  return (
    <>
      <h1>Spela Wordle!</h1>
      <div className="intro">
        <ul>
          <li>Välj ordlängd och om du vill ha ord med dubletter av samma bokstav i spel-menyn ovan.</li>
          <li>Ju kortare tid desto bättre bättre placering i highscore-listan.</li>
          <li>När du är redo klicka på start!</li>
        </ul>
      </div>
    </>
  );
}
