/**
 * 백엔드 com.naejeon.common.response.ApiResponse 와 매칭되는 타입.
 * { success: true,  data: T,    error: null }
 * { success: false, data: null, error: ErrorResponse }
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
  error: null;
}

export interface ApiFailure {
  success: false;
  data: null;
  error: ErrorResponse;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface ErrorResponse {
  code: string;
  message: string;
  fieldErrors?: FieldError[];
}

export interface FieldError {
  field: string;
  message: string;
}

/**
 * 응답 인터셉터에서 표준화된 에러로 throw 되는 클래스.
 * 컴포넌트에서 instanceof 로 분기하여 error.code 별 처리 가능.
 */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number | undefined;
  readonly fieldErrors: FieldError[] | undefined;

  constructor(code: string, message: string, status?: number, fieldErrors?: FieldError[]) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}
