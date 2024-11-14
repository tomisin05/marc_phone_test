# MobX Strict Mode Error Analysis

## Issue
The error occurs in `index.tsx` line 26 when trying to directly modify the observable array `store.guesses`:
```typescript
if (!store.guesses[0]) {
  store.guesses[0] = '';  // This line causes the error
}
```

This modification is not allowed in MobX strict mode because state changes must be performed within actions.

## Why This Happens
MobX strict mode enforces that all state modifications happen within actions to ensure predictable state management. Direct modifications to observable state outside of actions are prohibited.

## Solution
There are two ways to fix this:

1. Create an action method in PuzzleStore to handle initialization:
```typescript
// In PuzzleStore.tsx
@action
initializeFirstGuess() {
  if (!this.guesses[0]) {
    this.guesses.splice(0, 1, '');
  }
}
```

Then call it from the effect:
```typescript
useEffect(() => {
  store.init();
  store.initializeFirstGuess();
  // ... rest of the effect
}, []);
```

2. Use the existing array modification methods that are already wrapped in actions:
```typescript
if (!store.guesses[0]) {
  store.guesses.splice(0, 1, '');
}
```

The second approach is preferable since PuzzleStore already uses splice for array modifications in other places (see handleInput and handleKeyup methods).

## Best Practices
- Always modify MobX observables within actions
- Use built-in array methods like splice that are already action-wrapped
- Consider using runInAction for one-off state modifications if needed
- Keep state modifications centralized in the store