# Feature Flag Naming Conventions and Usage for LaunchDarkly

We use LaunchDarkly (LD) as our feature flag solution to manage and control feature releases across different applications in our NX monorepo. To maintain consistency and clarity, all feature flags should adhere to a standard naming convention.

## Naming Format

```
platform + app-name + flag-name
```

### Naming Rules

- **Format**: Use kebab-case.
- **Platform**: For our use case the most common one we will use is `web`, but it applies for other NEWM platforms like `server` or `mobile`.
- **App Names**: At the time of writing our current apps are `studio`, `marketplace`, `wallet`, and `tools`.
- **Flag Name**: Clearly describe the feature being controlled, using kebab-case.

## Examples for LaunchDarkly Feature Flags

- `web-studio-maintenance-mode`
- `web-marketplace-royalty-claiming`
- `web-wallet-multiple-connections`
- `web-tools-international-currency`

## Why Use This Convention?

- **Integration with LaunchDarkly**: Ensures consistent flag identification across all LD projects and environments.
- **Clarity**: Makes it easy to identify the platform, app, and purpose of the flag at a glance.
- **Consistency**: Maintains a uniform naming approach for easier flag management.
- **Scalability**: Facilitates adding new flags for different platforms and apps without confusion.

## Best Practices for LaunchDarkly Flags

- **Create descriptive flag names** to quickly convey the feature they control.
- **Keep the flag name concise but meaningful**, avoiding ambiguity.
- **Avoid using the word `new`** as this is relative.
- **Avoid prefixes like `is` or `has`** unless necessary: Although common in coding, they can add unnecessary length to flag names.
- **Use kebab-case** for readability and adherence to standard naming conventions.

By following these guidelines, we can ensure effective and scalable feature flag management across our monorepo and different NEWM platforms with LaunchDarkly.

## Usage

To access a feature flag in your React app using the `useFlags` hook:

**LD Flag Name**: `web-marketplace-launch-banner`

```javascript
import { useFlags } from "launchdarkly-react-client-sdk";

const MyComponent = () => {
  const { webMarketplaceLaunchBanner } = useFlags();

  return (
    <div>
      {webMarketplaceLaunchBanner ? (
        <p>The launch banner feature is enabled!</p>
      ) : (
        <p>The launch banner feature is disabled.</p>
      )}
    </div>
  );
};

export default MyComponent;
```

Note that even though the flag name in LD is `kebab-case`, we are able to access it `camelCase` in our app.
