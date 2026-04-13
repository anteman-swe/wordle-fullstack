import "../styles/GameExplanation.scss";

const GameExplanation = () => {
  return (
    <div className="exp-cont">
      <div className="green-cont">
        <div className="green"></div>
        <span className="green-txt">Rätt bokstav på rätt plats</span>
      </div>
      <div className="yellow-cont">
        <div className="yellow"></div>
        <span className="yellow-txt">Rätt bokstav men på fel plats</span>
      </div>
      <div className="red-cont">
        <div className="red"></div>
        <span className="red-txt">Bokstav som inte finns i ordet</span>
      </div>
    </div>
  );
};

export default GameExplanation;
