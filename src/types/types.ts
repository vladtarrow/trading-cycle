export type HandlerConfig = {
  name: string;
  inputs: Record<string, string>;
  defaults?: Record<string, unknown>;
  handler: string;
};

export type State = Record<string, any>;

export type Values = Record<string, any>;

export interface HandlerInterface {
  execute(values: Values): any;
  readonly v: Values;
  readonly s: Record<string, any>;
}

export type HandlerConstructor = new (state: State, config: HandlerConfig) => HandlerInterface;

export type HandlerClassMap = Record<string, HandlerConstructor>;
