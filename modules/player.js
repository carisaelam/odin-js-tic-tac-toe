// Returns instance of player
export default function player(name, symbol) {
  let points = 0;

  function getPoints() {
    return points;
  }

  function addPoint() {
    points++;
  }

  function getSymbol() {
    return symbol;
  }

  function collectInput() {
    const input = prompt('Select a cell');
    const coord = [parseInt(input[0]), parseInt(input[1])];
    console.log('You selected', coord);
    return coord;
  }

  return { name, getSymbol, getPoints, addPoint, collectInput };
}
