import { useAuthStore } from "@/stores/auth";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  type HttpEvent,
  type HttpHandlerFn,
} from "obfetch";
import { Observable, map } from "rxjs";

const apiHost = import.meta.env.VITE_API_HOST;

export const curl = new HttpClient({
  baseURL: apiHost,
});

function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authStore = useAuthStore();
  let token = authStore.token;
  if (token) {
    const reqWithHeader = req.clone({
      headers: req.headers.set("Authorization", token),
    });
    return next(reqWithHeader);
  }

  return next(req);
}

// Defining an interceptor formatting response data

function responseDataFormatInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        return event.clone({ body: event.body?.data });
      }
      return event;
    })
  );
}

// Use interceptor
curl.use([tokenInterceptor]);
