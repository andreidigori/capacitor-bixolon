export class BixolonError extends Error {
  constructor(
    message: string,
    public readonly errorCode: number,
    public readonly errorCodeExtended: number,
  ) {
    super(message);
  }
}
