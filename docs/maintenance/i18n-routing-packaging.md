# Packaging i18n routing changes

Use this note when the primary checkout has uncommitted i18n or default-localized
routing changes that need to be isolated for review. The primary checkout is:

```bash
/home/tankztz/workspace/repo/claudefun
```

This maintenance worktree is intentionally separate:

```bash
/home/tankztz/workspace/repo/.maintenance-worktrees/claudefun-issue-1
```

Do not reset, clean, checkout, stash, or apply patches in the primary checkout
unless the owner explicitly asks for that. Treat the primary checkout as
read-only while packaging its routing changes.

## Routing files

The current i18n routing surface is small. Review these paths when isolating a
routing change:

- `src/i18n/routing.ts`
- `src/i18n/request.ts`
- `src/app/page.tsx`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx`
- `messages/en.json`
- `messages/zh.json`
- `next.config.ts`

If a future change adds middleware, generated route helpers, or extra locale
message files, include those paths explicitly in the same review.

## Create a read-only patch from the primary checkout

From this maintenance worktree, first confirm the worktree layout and that this
worktree is clean enough for packaging notes:

```bash
git worktree list --porcelain
git status --short
```

Then generate a scoped patch from the primary checkout without changing it:

```bash
cd /home/tankztz/workspace/repo/claudefun

git status --short -- \
  src/i18n \
  src/app/page.tsx \
  'src/app/[locale]' \
  messages \
  next.config.ts

git diff --binary -- \
  src/i18n \
  src/app/page.tsx \
  'src/app/[locale]' \
  messages \
  next.config.ts \
  > /tmp/claudefun-i18n-routing.patch
```

The commands above only read repository content and write the patch artifact to
`/tmp`. Do not use broad pathspecs like `git diff > patch` unless unrelated
dirty work has already been ruled out.

## Verify the package before applying it

Back in this clean worktree, inspect and validate the patch before applying it
anywhere:

```bash
cd /home/tankztz/workspace/repo/.maintenance-worktrees/claudefun-issue-1

git apply --check --whitespace=error /tmp/claudefun-i18n-routing.patch
git apply --check /tmp/claudefun-i18n-routing.patch
git apply --stat /tmp/claudefun-i18n-routing.patch
```

Use `git apply --check` as the gate. It verifies that the patch can apply
without modifying the worktree.

## Apply in a disposable worktree

When the patch is ready to test or turn into a PR, apply it in a separate
worktree and branch:

```bash
cd /home/tankztz/workspace/repo/claudefun

git worktree add \
  /home/tankztz/workspace/repo/.maintenance-worktrees/claudefun-i18n-routing \
  -b chore/default-localized-routing

cd /home/tankztz/workspace/repo/.maintenance-worktrees/claudefun-i18n-routing
git apply --index /tmp/claudefun-i18n-routing.patch
```

Keep this step out of the dirty primary checkout. If `git apply --index` fails,
leave the primary checkout untouched and inspect the disposable worktree.

## Routing review checklist

Before opening a PR for default-localized routing, verify the behavior is
intentional:

- The default locale route is clear. For example, `/` either redirects to the
  default locale or renders it directly.
- Non-default locale routes still work, such as `/zh`.
- Invalid locale segments return a 404 instead of silently rendering the wrong
  locale.
- `src/i18n/routing.ts` matches the intended URL policy. For unprefixed default
  locale URLs, `localePrefix` is usually `as-needed`; for always-prefixed URLs,
  keep `always`.
- `messages/*.json` files contain the same message keys for every locale.
- Any metadata, canonical URLs, or Open Graph URLs still point at the intended
  public route.

## Verification commands

Run these after applying the patch in the disposable worktree:

```bash
bun install --frozen-lockfile
bunx tsc --noEmit
bun run build
```

For a manual route check, start the app and confirm the default and non-default
locale paths:

```bash
bun run dev
```

Then visit:

- `http://localhost:3000/`
- `http://localhost:3000/en`
- `http://localhost:3000/zh`
- `http://localhost:3000/not-a-locale`

Record the expected behavior in the PR description so reviewers can distinguish
an intentional default-locale URL change from a routing regression.
