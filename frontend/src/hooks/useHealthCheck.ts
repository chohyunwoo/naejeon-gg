import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { healthClient } from '@/lib/api/client';

export interface HealthCheckResponse {
  status: string;
  service: string;
  message: string;
}

async function fetchHealth(): Promise<HealthCheckResponse> {
  const response = await healthClient.get<HealthCheckResponse>('/api/health');
  return response.data;
}

export function useHealthCheck(): UseQueryResult<HealthCheckResponse, Error> {
  return useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    retry: 0,
  });
}
