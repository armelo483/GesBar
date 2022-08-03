import { SkipemptyPipe } from './skipempty.pipe';

describe('SkipemptyPipe', () => {
  it('create an instance', () => {
    const pipe = new SkipemptyPipe();
    expect(pipe).toBeTruthy();
  });
});
