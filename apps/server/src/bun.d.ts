declare module "bun" {
  interface Env {
    AUTH_DOMAIN: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_REDIRECT_URI: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;

    BUNNYNET_STORAGE: string;
    BUNNYNET_ACCESSKEY: string;

    HOME_URL: string;
  }
}
