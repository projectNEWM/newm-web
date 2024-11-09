# Feature Flag Naming Conventions for LaunchDarkly

We use LaunchDarkly (LD) as our feature flag solution to manage and control feature releases across different applications in our NX monorepo. To maintain consistency and clarity, all feature flags should adhere to a standard naming convention.

## Naming Format

```
platform + appName + flagName
```

### Naming Rules

- **Format**: Use camelCase.
- **Platform**: For our use case the most common one we will use is `web`, but it applies for other NEWM platforms like `server` or `mobile`.
- **App Names**: At the time of writing our current apps are `studio`, `marketplace`, `wallet`, and `tools`.
- **Flag Name**: Clearly describe the feature being controlled, using camelCase.

## Examples for LaunchDarkly Feature Flags

- `webStudioMaintenanceMode`
- `webMarketplaceRoyaltyClaiming`
- `webWalletMultipleConnections`
- `webToolsInternationalCurrency`

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
- **Use camelCase** for readability and adherence to standard naming conventions.

By following these guidelines, we can ensure effective and scalable feature flag management across our monorepo and different NEWM platforms with LaunchDarkly.
