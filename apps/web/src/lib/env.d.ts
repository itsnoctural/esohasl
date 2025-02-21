namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API: string;
    NEXT_PUBLIC_CDN: string;

    LOOTLABS_LINK: string;
    LOOTLABS_API_KEY: string;

    AUTH_DOMAIN: string;

    AWS_S3_REGION: string;
    AWS_S3_BUCKET: string;
    AWS_S3_ACCESS_KEY: string;
    AWS_S3_SECRET_ACCESS_KEY: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_REDIRECT_URI: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;

    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;

    HOME_URL: string;
  }
}
