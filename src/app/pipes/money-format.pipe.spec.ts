import { MoneyFormatPipe } from './money-format.pipe';

describe('MoneyFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
