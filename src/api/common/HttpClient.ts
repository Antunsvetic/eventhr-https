import instance from '../../instance';

export abstract class HttpClient {
  abstract endpoint: string;

  readonly client = instance;

  list(..._args: unknown[]): Promise<unknown> {
    throw new Error(`list() not implemented on ${this.constructor.name}`);
  }

  get(..._args: unknown[]): Promise<unknown> {
    throw new Error(`get() not implemented on ${this.constructor.name}`);
  }

  create(..._args: unknown[]): Promise<unknown> {
    throw new Error(`create() not implemented on ${this.constructor.name}`);
  }

  update(..._args: unknown[]): Promise<unknown> {
    throw new Error(`update() not implemented on ${this.constructor.name}`);
  }

  remove(..._args: unknown[]): Promise<unknown> {
    throw new Error(`remove() not implemented on ${this.constructor.name}`);
  }
}
