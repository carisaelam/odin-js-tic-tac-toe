// Returns instance of player
export default function player(name, symbol) {
  let points = 0;

  function getPoints() {
    return points;
  }

  function addPoint() {
    points++;
  }

  return { name, symbol, getPoints, addPoint };
}
