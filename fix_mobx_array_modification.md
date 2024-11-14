## MobX Array Modification Fix

The current error occurs because we're trying to directly modify a MobX observable array outside of an action. Specifically, in `index.tsx`:

```typescript
if (!store.guesses[0]) {
  store.guesses.splice(0, 1, '');  // Direct array modification
}
```

### The Problem
MobX strict mode requires all state modifications to happen within actions. The current code tries to modify the observable array directly, which violates this requirement.

### The Solution
We need to:

1. Move the array modification into a proper action in the PuzzleStore
2. Call that action instead of modifying the array directly

### Implementation Plan
1. Add a new action in PuzzleStore: `initializeFirstGuess()`
2. Update index.tsx to call this method instead of modifying the array directly
3. Ensure all array modifications use proper MobX actions