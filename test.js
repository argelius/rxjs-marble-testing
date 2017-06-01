/* eslint-disable no-multi-spaces */
/**
 * Some simple tests
 */

import test from 'ava';
import { TestScheduler } from 'rxjs';

test('merge', (t) => {
  const scheduler = new TestScheduler(t.deepEqual.bind(t));
  const e1 = scheduler.createHotObservable('-a----b|');
  const e2 = scheduler.createHotObservable('-c-----d|');
  const expected =                         '-(ac)-bd|';

  scheduler.expectObservable(e1.merge(e2)).toBe(expected);
  scheduler.flush();
});

test('map', (t) => {
  const scheduler = new TestScheduler(t.deepEqual.bind(t));
  const values = {
    a: { userId: 'a' },
    b: { userId: 'b' },
    c: { userId: 'c' },
    x: 'a',
    y: 'b',
    z: 'c',
  };
  const e1 = scheduler.createHotObservable('-a--b--c|', values);
  const expected =                         '-x--y--z|';

  scheduler.expectObservable(e1.map(v => v.userId)).toBe(expected, values);
  scheduler.flush();
});

test('filter', (t) => {
  const scheduler = new TestScheduler(t.deepEqual.bind(t));
  const e1 = scheduler.createHotObservable('-a--b--aa-b|');
  const expected =                         '----b-----b|';

  scheduler.expectObservable(e1.filter(v => v !== 'a')).toBe(expected);
  scheduler.flush();
});
