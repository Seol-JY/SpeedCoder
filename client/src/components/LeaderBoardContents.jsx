export default function LeaderBoard({ s }) {
  return (
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
