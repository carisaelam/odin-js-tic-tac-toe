// Returns instance of player
export default function player(name, symbol) {
  let lastInput = null;

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

  function handleClick(e) {
    lastInput = e.target.id;
    e.target.removeEventListener('click', handleClick);
  }

  function collectInput() {
    console.log('collectInput running');
    console.log('lastInput', lastInput);

    if (lastInput === null) return null;

    const coord = lastInput
      ? [parseInt(lastInput[0]), parseInt(lastInput[1])]
      : null;
    console.log('You selected', coord);

    return coord;
  }

  return { name, getSymbol, getPoints, addPoint, collectInput, handleClick };
}
