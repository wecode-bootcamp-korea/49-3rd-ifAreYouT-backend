const makeArray = (targetLength, startNumber = 1) => {
  return Array.from({ length: targetLength }, (_, i) => i + startNumber);
};

const makeSeatDummy = (rowLength, colLength, stageLength, gradeLength) => {
  const row = Array.from({ length: rowLength }, (_, i) =>
    String.fromCharCode(65 + i),
  );
  const col = makeArray(colLength);
  const test = [];
  const rowRange = rowLength / gradeLength;

  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      let key = Math.floor(i / rowRange);

      test.push(`('${row[i]}', ${col[j]}, ${stageLength}, ${key + 1} )`);
    }
  }
  return test.join(',');
};

const makeEventSeatDummy = (length) => {
  const seatIds = makeArray(length);
  const result = seatIds.map((d) => `('available', 1, ${d})`);
  return result.join(',');
};

module.exports = { makeSeatDummy, makeEventSeatDummy };
