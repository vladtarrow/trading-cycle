export type HandlerConfig = {
  name: string;
  inputs: Record<string, string>;
  defaults?: Record<string, unknown>;
};

export type State = Record<string, any>;

export type Values = Record<string, any>;
