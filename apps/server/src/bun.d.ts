declare module "bun" {
  interface Env {
    AUTH_DOMAIN: string;

    AWS_S3_REGION: string;
    AWS_S3_BUCKET: string;
    AWS_S3_ACCESS_KEY: string;
    AWS_S3_SECRET_ACCESS_KEY: string;

    REDIS_URL: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_REDIRECT_URI: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;

    HOME_URL: string;
  }
}
