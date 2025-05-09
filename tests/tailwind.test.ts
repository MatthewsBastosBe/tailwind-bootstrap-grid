import { it } from 'vitest';

import run from './run-test';

// eslint-disable-next-line vitest/expect-expect
it('should handle defaults', () => run(__filename));
