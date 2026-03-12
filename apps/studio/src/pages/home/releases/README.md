# Releases (Studio) - Phase 2 Notes

This folder contains the updated release flow UI for album and single-track work.
The frontend changes are ahead of backend support, so a few pieces are intentionally
left in a transitional state to keep the app compiling.

## Missing or Pending Work

- **Backend models + endpoints**

  - Await final release/track models, enums, and REST endpoints from the backend.
  - Once shipped, wire them into the Studio API layer and update payload shapes.

- **Release flow property renames**

  - Multiple release properties still use interim names until the final release type
    is confirmed. Update the release details, list, and distribution payload mapping
    once the backend schema is finalized.
  - Primary files: `ReleaseDetails.tsx`, `ReleaseList.tsx`, `Releases.tsx`,
    `release/distribute/*`.

- **Track flow property renames**

  - Track-level fields are pending the final track schema and are still mapped with
    interim names. Update the form types and API mapping once final field names land.
  - Primary files: `release/tracks/*`, `release/tracks/trackFormTypes.ts`.

- **Remove legacy "song" files**

  - Legacy "song" files within this folder will be removed (tracked in Jira).
  - Keep the migration focused inside `release/tracks/**` once backend models land.

- **Create release + track thunks**

  - Implement CRUD thunks for releases and tracks with the new backend endpoints.
  - Replace any placeholder/legacy calls still using "song" thunks.

- **Add delete trigger components**
  - Build `DeleteReleaseTrigger` and `DeleteTrackTrigger` components.
  - Each trigger should render the delete button and open the confirm modal.
  - Requires backend support for a `locked` (or similar) field to determine whether
    a release or track can be deleted.

## Notes for the Next Pass

- Keep property renames scoped to `release/tracks/**` after the backend models land.
- Revisit types and payload mappers once release and track schemas are final.

## Cleanup (Later Pass)

- Remove the entire `library/` directory and its files.
- Remove `releases/MarketplaceTab` once it is replaced by the new flow.
- Remove release-related legacy "song" files under `releases/**`.
- Remove song-related types and thunks outside of `releases/`.
