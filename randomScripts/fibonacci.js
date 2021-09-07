let fibanacciList = [0, 1];
function fibanacciGenerator(number) {
  loopTimes = number - 2;
  for (let i = 0; i != loopTimes; i++) {
    newNumber =
      fibanacciList[[fibanacciList.length - 1]] +
      fibanacciList[[fibanacciList.length - 2]];
  }
  console.log(fibanacciList);
}
