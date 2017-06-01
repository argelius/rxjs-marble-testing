/* eslint-disable no-multi-spaces */
import test from 'ava';
import { TestScheduler } from 'rxjs';
import model from './model';

const COUNTRIES = [
  'Japan',
  'China',
  'Sweden',
  'Switzerland',
  'United States',
  'Germany',
  'Egypt',
];

test('model', (t) => {
  const scheduler = new TestScheduler(t.deepEqual.bind(t));

  const values = {
    a: '',
    b: 'hoge',
    c: 's',
    d: 'sw',
    e: 'ja',
    f: { countries: [] },
    g: { countries: ['Sweden', 'Switzerland'] },
    h: { countries: ['Japan'] },
  };

  const e1 = scheduler.createHotObservable('--a--b-c--d--e--|', values);
  const expected =                         'f-f--f-f--g--h--|';

  scheduler.expectObservable(model(e1, COUNTRIES)).toBe(expected, values);
  scheduler.flush();
});
