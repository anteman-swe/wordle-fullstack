import "../styles/Rules.scss";

export default function Rules() {
  return (
    <>
      <div className="rules">
        <h1>Wordle regler</h1>
        <ul>
          <li>
            Reglerna är enkla, hitta ett okänt ord av den ordlängd man har valt.
          </li>
          <li>
            Man kan också välja om ordet bara ska ha unika bokstäver eller om
            man tillåter dubletter.
          </li>
          <li>
            Ordlängden bestämmer också det antal försök som man har, t ex om man
            har valt ordlängd 5 bokstäver så har man 6 försök på sig att hitta
            ordet.
          </li>
          <li>
            Ju snabbare man hittar ordet, desto bättre placering i
            Highscore-listan!
          </li>
        </ul>
      </div>
    </>
  );
}
