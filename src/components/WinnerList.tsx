import "./WinnerList.css";

interface Winner {
  name: string;
  email: string;
  discount: string;
}

interface WinnerListProps {
  winners: Winner[];
}

const Winnerlist: React.FC<WinnerListProps> = ({ winners }) => {
  return (
    <div className="winner-list">
      <div className="winner-list-nameplate">
        <h5 style={{ color: "blanchedalmond" }}>Email</h5>
        <h5 style={{ color: "blanchedalmond" }}>Name</h5>
        <h5 style={{ color: "blanchedalmond" }}>Discount</h5>
      </div>

      <div className="winner-list-items-container">
        {winners.map((winner, index) => (
          <div key={index} className="winner-list-item">
            <div>{winner.email}</div>
            <div>{winner.name}</div>
            <div style={{ marginLeft: "20%" }}>{winner.discount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Winnerlist;
