# Rustwood Vocals — Signal Lab One-Page Site

Premium one-page **Custom Songs-first** website in a cinematic artefact signal-lab style.

## Live structure
Sections are in this exact order:
1. Hero (two-column)
2. Proof strip
3. What you get (3 cards)
4. Examples (audio tiles)
5. Process (4 steps)
6. Pricing (AUD)
7. Creative Brief Console (embedded form)
8. FAQ (accordion)
9. Final CTA

## Form submissions: where they go
Current embedded form action:

```html
<form action="https://formsubmit.co/rustwood.agent@gmail.com" method="POST">
```

So submissions route to **rustwood.agent@gmail.com** via FormSubmit.

### Notes
- First-time FormSubmit setup may require email confirmation.
- `_captcha=false` is included to keep flow simple.
- Estimated total is calculated on-page and sent as `selected_total`.

## Files
- `index.html` — full page copy + structure
- `assets/styles.css` — cinematic signal-lab styling
- `assets/app.js` — scroll actions, pricing calculator, accordion behaviour

## GitHub Pages
This repo is configured to publish from `main` branch root (`/`).
