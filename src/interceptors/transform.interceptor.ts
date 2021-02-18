import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppResponse } from 'src/app.response.model';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, AppResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<AppResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: 'SUCCESS',
        response: data.response ? data.response : data,
        errors: [],
      })),
    );
  }
}
