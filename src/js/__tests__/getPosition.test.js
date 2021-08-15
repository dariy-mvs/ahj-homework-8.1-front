import getPosition from '../app';

test('getPosition', () => {
  let position = 0;
  let number;
  do {
    number = getPosition();
  } while (number === position);
  position = number;
  expect(position).not.toBe(0);
});
