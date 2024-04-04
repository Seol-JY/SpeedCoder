export default function LeaderBoard({ s }) {
  return s.rank >= 1 && s.rank <= 3 ? (
    <div className="sidebarsection-rank-items sidebarsection-rank-items-high">
      <ul>
        {s.rank === 1 && (
          <img
            style={{ objectFit: "cover", height: "40px" }}
            src="/img/gold-medal.png"
            alt="Gold Medal"
          />
        )}
        {s.rank === 2 && (
          <img
            style={{ objectFit: "cover", height: "40px" }}
            src="/img/silver-medal.png"
            alt="Silver Medal"
          />
        )}
        {s.rank === 3 && (
          <img
            style={{ objectFit: "cover", height: "40px" }}
            src="/img/bronze-medal.png"
            alt="Bronze Medal"
          />
        )}
        <p>CPM:{s.cpm}</p>
      </ul>
      <ul>
        <p>{s.name}</p>
        <p>{s.message}</p>
        <p>{s.file}</p>
      </ul>
    </div>
  ) : (
    <div className="sidebarsection-rank-items">
      <ul>
        <p>
          <span>#</span>
          {s.rank}
        </p>
        <p>CPM:{s.cpm}</p>
      </ul>
      <ul>
        <p>{s.name}</p>
        <p>{s.message}</p>
        <p>{s.file}</p>
      </ul>
    </div>
  );
}
