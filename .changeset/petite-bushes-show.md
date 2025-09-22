---
'@valence-protocol/domain-modal-react': minor
---

### Fixed

- You no longer need to install peer dependencies for domains you are not using. If they are omitted from the config, the modal will not attempt to instantiate them.
- You no longer need to instantiate a `DomainClientsProvider`, the modal provider handles this internally.
