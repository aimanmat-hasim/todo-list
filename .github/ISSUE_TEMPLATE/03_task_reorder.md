---
name: "[Todo] Task reorder logic"
about: Support moving tasks up/down in the list
title: "[Todo] Task reorder logic"
labels: feature
assignees: ""
---

## Goal
Support moving tasks up/down in the list.

## Tasks
- [ ] Implement move up/down handlers
- [ ] Disable `Up` on first task
- [ ] Disable `Down` on last task

## Acceptance Criteria
- Order changes correctly
- No index errors at boundaries
- State remains consistent after multiple moves