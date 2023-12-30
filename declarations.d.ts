// declarations.d.ts
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

declare module "*.PNG";
declare module "*.JPG";
declare module "*.JPEG";
declare module "*.SVG";

// Declare the require.context function for Webpack
declare interface RequireContext {
  keys(): string[];
  (id: string): string;
}

declare var require: {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): RequireContext;
};
interface ImportMeta {
  readonly globEager: (
    globPattern: string
  ) => Record<string, { default: string }>;
}
type ImageModule = {
  default: string;
};

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  weddingLocation: string;
  duration: string;
  followUpNeeded: boolean;
};
type ModalProps = {
  checkStatus: boolean;
  currentImg: string;
  onClose: () => void;
};
