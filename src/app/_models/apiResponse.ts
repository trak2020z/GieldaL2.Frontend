/**
 * Response returned by api
 */
export class ApiResponse {
  backendTime: number;
  selectsTime: number;
  selectsCount: number;
  updatesTime: number;
  updatesCount: number;
  insertsTime: number;
  insertsCount: number;
  deletesTime: number;
  deletesCount: number;
  data;
}