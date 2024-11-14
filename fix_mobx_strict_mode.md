# Fix for MobX Strict Mode Error

The error occurs because we're trying to modify the observable value `currentGuess` directly within the `submitGuess` method without properly wrapping it in an action. In MobX strict mode, all state modifications must be performed within actions.

To fix this, we need to modify the `PuzzleStore.tsx` file to properly handle the state modification. Here are a few ways to fix this:

1. Use the runInAction utility:
```typescript
import { runInAction } from 'mobx';

// In submitGuess method:
await apiPromise;
runInAction(() => {
    this.currentGuess += 1;
});
```

2. Or mark the entire method as an action (already done with autoBind: true in constructor, but the async nature is causing issues)

3. Or split the async and sync parts:
```typescript
@action
private incrementCurrentGuess() {
    this.currentGuess += 1;
}

async submitGuess() {
    // ... other code ...
    await apiPromise;
    this.incrementCurrentGuess();
}
```

The recommended fix would be to use runInAction since we're dealing with an async method and want to modify state after the await.