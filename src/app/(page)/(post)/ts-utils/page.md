# Typescript Utils

**Result:**

```typescript
// from https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

export function unwrap<T, E = Error>(result: Result<T, E>): T {
  if (!result.data) {
    throw result.error;
  }
  return result.data;
}

export async function wrap<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
```

**Retry:**

```typescript
export async function retry<R, A>(
  fn: (args: A) => Promise<Result<R>>,
  onFailure: (error: Error | null) => Promise<A>,
  args: A,
  retriesLeft: number = 2,
): Promise<Result<R>> {
  try {
    return await fn(args);
  } catch (error) {
    if (retriesLeft <= 0) throw error;

    const safeError = error instanceof Error ? error : null;
    const newArgs = await onFailure(safeError);

    return retry(fn, onFailure, newArgs, retriesLeft - 1);
  }
}

// example: if you don't know if token is still valid

const result = await retry(
  (token) => someCall(token),
  async () => getNewToken(refreshToken),
  currentToken,
);
```

**Truthy:**

```typescript
export function Truthy<T>(value: T): value is Exclude<T, undefined | null> {
  return !!value;
}

// example:

const raw = [1, 2, 3, null, undefined, 4, 5, 6];
const result1: number[] = raw.map(Truthy);
const result2: (number | null | undefined)[] = raw.map(Boolean); // doesn't type guard
```

**Setter:**

```typescript
import type { Dispatch, SetStateAction } from 'react';

export type Setter<T> = Dispatch<SetStateAction<T>>;

// example:

function ComponentA() {
  const [value, setValue] = useState(0);
  return <ComponentB value={value} setValue={setValue} />;
}

function ComponentB({ value, setValue }: { value: number; setValue: Setter<number> }) {
  return <button onClick={() => setValue((prev) => prev + 1)}>Click me</button>;
}
```

**Format Time:**

```typescript
import { format, isToday, isYesterday, subDays } from 'date-fns';

export function formatDateTime(date: Date, short: boolean = false) {
  if (isToday(date)) {
    return `${!short ? 'Today' : ''} ${format(date, 'HH:mm')}`;
  } else if (isYesterday(date)) {
    return `Yesterday ${!short ? format(date, 'HH:mm') : ''}`.trim();
  } else if (subDays(new Date(), 6) < date) {
    return `${format(date, 'EEEE')} ${!short ? format(date, 'HH:mm') : ''}`.trim();
  }
  return `${format(date, 'yyyy/MM/dd')} ${!short ? format(date, 'HH:mm') : ''}`.trim();
}

console.log(formatDateTime(new Date())); // Today 13:00
console.log(formatDateTime(subDays(new Date(), 1), true)); // Yesterday
console.log(formatDateTime(subDays(new Date(), 2))); // Friday 13:00
console.log(formatDateTime(subDays(new Date(), 10)), true); // 2025/12/18
```

**Log Wrapper:**

```typescript
export function logWrapper<A extends unknown[], R>(
  fn: (...args: A) => Promise<R>,
  name?: string,
): (...args: A) => Promise<R>;
export function logWrapper<A extends unknown[], R>(
  fn: (...args: A) => R,
  name?: string,
): (...args: A) => R;
export function logWrapper<A extends unknown[], R>(
  fn: (...args: A) => R | Promise<R>,
  name?: string,
): (...args: A) => R | Promise<R> {
  return (...args: A): R | Promise<R> => {
    console.log(`[CALL] ${name || fn.name} ${fmtObject(args)}`);
    try {
      const result = fn(...args);

      if (isPromise<R>(result)) {
        return result
          .then((value) => {
            console.log(`[RESULT] ${name || fn.name} ${fmtObject(value)}`);
            return value;
          })
          .catch((error) => {
            console.error(`[ERROR] ${name || fn.name}`, error);
            throw new Error(`${name || fn.name}:\n${error}`);
          });
      }

      console.log(
        `[RESULT] ${name || fn.name}`,
        typeof result === 'object' ? JSON.stringify(result) : result,
      );
      return result;
    } catch (error) {
      console.error(`[ERROR] ${name || fn.name}`, error);
      throw new Error(`${name || fn.name}:\n${error}`);
    }
  };
}

// example:

const someApiCall = logWrapper(async (id: string) => {
  return await fetch(`https://api.example.com/items/${id}`);
}, 'someApiCall');
```
