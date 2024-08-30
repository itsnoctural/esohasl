namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API: string;
    NEXT_PUBLIC_CDN: string;
    NEXT_PUBLIC_CDN_EXP: string;

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
