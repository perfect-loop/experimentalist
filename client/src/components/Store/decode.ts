import { pipe } from "fp-ts/lib/pipeable";
import { fold, left } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";
import { throwError, of } from "rxjs";

export class DecodeError extends Error {
  name = "DecodeError";
}

/**
 * Decode data coming from server
 * Borrowed from https://www.puzzle.ch/de/blog/articles/2019/09/25/data-contracts-and-transformations-with-io-ts
 *
 * @param codec
 * @param object
 */
export function decode(codec: any, object: any) {
  const res = codec.decode(object);
  return pipe(
    res,
    fold(
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      error => throwError(new DecodeError(PathReporter.report(left(error)).join("\n"))),
      data => of(data),
    ),
  );
}
