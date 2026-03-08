
# Electron Forge + PGlite in the backed minimal example

The repo originally represented a problematic case where PGlite was preventing a fresh app created from the `electron-vite` Electron Forge template from building and launching. It's a minimal reproducible example of the accompanying bug ticket in Electron: https://github.com/electron/forge/issues/4149.

The fix provided by @UmbrellaCrow612 explains a solution which is to ditch Vite on the backend. The pull request fixes the problem and allows using PGlite on the backend.

# Steps that generated the initial project

The initial project was just a fresh instantiation of the `electron-vite` template like so:
```sh
npx create-electron-app@latest my-app --template=vite-typescript
```
with some code for a simple example of using PGlite in `main.ts`.