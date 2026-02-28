---
name: "[Todo] Performance optimization with memo"
about: Reduce unnecessary re-renders
title: "[Todo] Performance optimization with memo"
labels: optimization
assignees: ""
---

## Goal
Reduce unnecessary re-renders and keep interaction smooth.

## Tasks
- [ ] Memoize task row component with `memo`
- [ ] Stabilize handlers with `useCallback`
- [ ] Use stable IDs and references where needed

## Acceptance Criteria
- Typing in input does not re-render unchanged rows
- Reorder/delete remains correct
- No regression in UI behavior