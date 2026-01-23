# Contributing to Cocoflix

Thank you for contributing! Please adhere to the following guidelines to ensure code quality, maintainability, and performance.

## TypeScript Best Practices

- **Strict Typing**: Use strict type checking. Avoid `any`; use `unknown` when the type is uncertain.
- **Inference**: Prefer type inference when the type is obvious.

## Angular Best Practices

- **Standalone Components**: Always use standalone components over NgModules for new features.
- **Decorators**: Do NOT set `standalone: true` inside Angular decorators (it is the default in v19+).
- **State Management**: Use Signals for local component state.
- **Lazy Loading**: Implement lazy loading for feature routes.
- **Host Bindings**: Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator. Do NOT use `@HostBinding` or `@HostListener`.
- **Images**: Use `NgOptimizedImage` for all static images (except inline base64).

## Accessibility Requirements

- **Compliance**: Must pass all AXE checks.
- **Standards**: Follow WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Component Guidelines

- **Responsibility**: Keep components small and focused on a single responsibility.
- **Inputs/Outputs**: Use `input()` and `output()` functions instead of decorators.
- **Derived State**: Use `computed()` for derived state.
- **Change Detection**: Set `changeDetection: ChangeDetectionStrategy.OnPush` in the `@Component` decorator.
- **Templates**: Prefer inline templates for small components.
- **Forms**: Prefer Reactive forms instead of Template-driven ones.
- **Styling**:
  - Do NOT use `ngClass`; use `class` bindings instead.
  - Do NOT use `ngStyle`; use `style` bindings instead.
  - Use paths relative to the component TS file for external styles.

## State Management

- **Signals**: Use signals for local component state.
- **Derived State**: Use `computed()` for derived state.
- **Purity**: Keep state transformations pure and predictable.
- **Updates**: Do NOT use `mutate` on signals; use `update` or `set` instead.

## Templates

- **Control Flow**: Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
- **Async**: Use the `async` pipe to handle observables.
- **Logic**: Keep templates simple. Avoid complex logic.
- **Restrictions**:
  - Do not assume globals like `new Date()` are available.
  - Do not write arrow functions in templates.

## Services

- **Responsibility**: Design services around a single responsibility.
- **Singleton**: Use the `providedIn: 'root'` option for singleton services.
- **Injection**: Use the `inject()` function instead of constructor injection.

---
