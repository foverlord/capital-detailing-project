<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project decisions

- Use section-level React components for the landing page so each content band stays focused and maintainable.
- Keep Capital Detailing photos as real image binaries in `src/assets/` so Vite and Vercel can serve them. Do not replace those photos with Lovable `*.asset.json` pointers.
