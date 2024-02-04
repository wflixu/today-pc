import { router } from "@/router";
import { useAuthStore } from "@/stores/auth";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  type HttpEvent,
  type HttpHandlerFn,
} from "obfetch";
import { Observable, map } from "rxjs";

export const apiHost = import.meta.env.VITE_API_HOST;

export interface IRes<T = any> {
  code: number;
  msg: string;
  data: T;
}

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
function responseAuthCheck(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.body.code == 401) {
          if (router.currentRoute.value.fullPath) {
            window.localStorage.setItem(
              "back-route",
              router.currentRoute.value.fullPath
            );
          }
          router.push("/passport/login");
        }
      }
      return event;
    })
  );
}

// Use interceptor
curl.use([tokenInterceptor, responseAuthCheck]);

export default curl;
