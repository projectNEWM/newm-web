# Setting Up Environment Variables

This guide will walk you through adding an environment variable in an Nx monorepo that supports both React and Next.js apps.

## 1. Adding the Environment Variable

For this example, we will set up `LAUNCHDARKLY_CLIENT_ID_STAGING` as the environment variable.

### Step 1: Add the Variable to GitHub Secrets

Ensure someone with access adds `LAUNCHDARKLY_CLIENT_ID_STAGING` to GitHub secrets so the repository can use it. This ensures secure access during workflows.

### Step 2: Update `.env.template`

Add the variable to the shared `.env.template` file to maintain consistency across environments:

```env
# For React apps
VITE_LAUNCHDARKLY_CLIENT_ID_STAGING=

# For Next.js apps
NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING=
```

Share the actual values securely (e.g., through an encrypted method).

## 2. Using the Variable in GitHub Workflows

Update the required GitHub workflows to ensure the environment variable is available:

- Review and modify workflows located in `.github/workflows`.

Access the variable using:

```yaml
NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING: ${{ secrets.LAUNCHDARKLY_CLIENT_ID_STAGING }}
```

## 3. Update CDK Deploy and Preview Scripts

Ensure the environment variable is accessible in deploy and preview workflows:

- Modify `.github/workflows/cdk/bin/deploy.ts` and `.github/workflows/cdk/bin/preview.ts` as needed to include the new variable.

## 4. Add the Variable to Dockerfiles

For applications deployed using Docker (e.g., `marketplace`, `tools`, `wallet`):

- Add the variable as an `ARG` in the app’s Dockerfile. For example, in `apps/marketplace/Dockerfile`:

```Dockerfile
ARG NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING
```

## 5. Update the Shared Environment Package

To use the variable across applications, update `packages/env/src/lib/env.ts`:

### Step 1: Add a Case to `getAppEnvVar`

```typescript
case "LAUNCHDARKLY_CLIENT_ID_STAGING":
  return typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID_STAGING
    : import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID_STAGING;
```

### Step 2: Create a Constant

Define the variable for easy import:

```typescript
export const LAUNCHDARKLY_CLIENT_ID = getAppEnvVar(
  "LAUNCHDARKLY_CLIENT_ID_STAGING"
);
```

## 6. Use the Variable in Your App

Finally, import and use the variable in your application:

```typescript
import { LAUNCHDARKLY_CLIENT_ID } from "@newm-web/env";

// Use LAUNCHDARKLY_CLIENT_ID as needed
```
