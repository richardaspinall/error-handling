import { Result, ResultSuccess, ResultError, BaseError } from './Result';

class DivideByZeroError extends BaseError {
  constructor() {
    super('DIVIDE_BY_ZERO', `Division by zero is not allowed`);
  }
}

export function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return new ResultError(new DivideByZeroError());
  } else {
    const c = a / b;
    return new ResultSuccess(c);
  }
}

export class Rooms {
  // The second string might be removed later (and a set used instead)
  private static roomMap = new Map<string, string>();

  public static createRoom(roomId: string): Result<string> {
    if (!this.roomMap.has(roomId)) {
      this.roomMap.set(roomId, roomId);
      return new ResultSuccess(roomId);
    }
    return new ResultError(new DivideByZeroError());
  }
}
