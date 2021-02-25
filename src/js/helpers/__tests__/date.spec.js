import { formatDate } from '../date';

describe('formatDate', () => {
  it('check format', () => {
    expect(formatDate(1612720783364, 'yyyy')).toBe('2021');
  });
})
