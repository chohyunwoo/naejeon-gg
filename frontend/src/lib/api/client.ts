import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { ApiError, type ApiResponse, type ErrorResponse } from './types';

/**
 * 표준 API 클라이언트.
 *
 * - baseURL은 VITE_API_URL. 빈 문자열이면 동일 origin → 개발 환경에서 Vite proxy 통해 /api 포워딩.
 * - withCredentials: true — Refresh Token이 HttpOnly Cookie에 저장될 예정 (Phase 4).
 * - 요청 인터셉터: 메모리의 Access Token을 Authorization 헤더에 부착 (Phase 4에서 토큰 저장소 연결).
 * - 응답 인터셉터:
 *   - 200 + success:true  → response.data.data 만 반환 (unwrap)
 *   - 200 + success:false → ApiError throw
 *   - 4xx/5xx              → ApiError throw
 *
 * 헬스체크처럼 ApiResponse 래퍼가 없는 raw 엔드포인트는 별도 healthClient 사용.
 */
const baseURL = import.meta.env.VITE_API_URL || '';

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessTokenProvider: () => string | null = () => null;

/**
 * Phase 4에서 authStore와 연결될 토큰 제공자.
 * Step 1에서는 항상 null 반환.
 */
export function setAccessTokenProvider(provider: () => string | null): void {
  accessTokenProvider = provider;
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = accessTokenProvider();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse<unknown>;
    if (body && typeof body === 'object' && 'success' in body) {
      if (body.success) {
        return { ...response, data: body.data };
      }
      throw toApiError(body.error, response.status);
    }
    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    const responseBody = error.response?.data;
    if (
      responseBody &&
      typeof responseBody === 'object' &&
      'error' in responseBody &&
      responseBody.error
    ) {
      throw toApiError(responseBody.error, error.response?.status);
    }
    throw new ApiError(
      'NETWORK_ERROR',
      error.message || '네트워크 오류가 발생했습니다.',
      error.response?.status
    );
  }
);

function toApiError(error: ErrorResponse, status: number | undefined): ApiError {
  return new ApiError(error.code, error.message, status, error.fieldErrors);
}

/**
 * 헬스체크 등 ApiResponse 래퍼가 없는 엔드포인트용 클라이언트.
 * 인터셉터 미적용 → 백엔드 응답을 그대로 전달.
 */
export const healthClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 5_000,
});
