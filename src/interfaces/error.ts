
export interface ErrorInterface {
  [key: string]: string;
}

export interface BackendError {
  status: boolean;
  message: string;
  errors: ErrorInterface[]
}
