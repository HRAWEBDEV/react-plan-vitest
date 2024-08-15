describe('test vitest lib', () => {
 function add(a: number, b: number) {
  return a + b;
 }
 it('should return 4', () => {
  const result = add(2, 2);
  expect(result).toBe(4);
 });
});
