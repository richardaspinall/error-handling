export interface IBaseError {
  code: string;
  message?: string;
  errorDetails?: any;
}

export class BaseError implements IBaseError {
  constructor(public code: string, public message?: string, public errorDetails?: any) {}
}

/**
 * Result class to handle success and error cases in a consistent way
 */
export class Result<T> {
  constructor(public ok: boolean, public value: T | undefined = undefined, public error?: BaseError) {}

  public getValue(): T | undefined {
    if (this.error) throw new Error(this.error.code);
    if (!this.value) throw new Error('Value is undefined');
    return this.value;
  }

  static success(): Result<void> {
    return new Result(true);
  }

  static error(error: BaseError): Result<string> {
    return new Result(false, error.code, error);
  }
}

/**
 * ResultError class to handle error cases
 */

export class ResultError extends Result<undefined> {
  constructor(public error: BaseError, public errorDetails?: any) {
    super(false, undefined, { ...error, errorDetails });
  }
}

/**
 * ResultSuccess class to handle error cases
 */
export class ResultSuccess<T> extends Result<T> {
  constructor(public value: T) {
    super(true, value);
  }
}

// interface IUseCaseError {
//   message: string;
// }

// export abstract class UseCaseError implements IUseCaseError {
//   public readonly message: string;

//   constructor(message: string) {
//     this.message = message;
//   }
// }

// export class UserDoesntExistError extends ResultError<UseCaseError> {
//   constructor(baseUserId: string) {
//     super(false, {
//       message: `A user for user id ${baseUserId} doesn't exist or was deleted.`,
//     } as UseCaseError);
//   }
// }
