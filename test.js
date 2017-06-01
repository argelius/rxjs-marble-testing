/**
 * Some simple tests
 */

import test from 'ava';
import { TestScheduler } from 'rxjs';

test('merge', (t) => {
	const scheduler = new TestScheduler(t.deepEqual.bind(t));
	const e1 = scheduler.createHotObservable('----a--^--b-------c--|');
	const e2 = scheduler.createHotObservable(  '---d-^--e---------f-----|');
	const expected =                                '---(be)----c-f-----|';

	scheduler.expectObservable(e1.merge(e2)).toBe(expected);
	scheduler.flush();
});
