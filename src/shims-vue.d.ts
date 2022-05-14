declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
