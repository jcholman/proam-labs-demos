# Apple Touch icon reference

![proAM Labs Apple Touch icon](./proam-labs-apple-touch-icon-180x180.png)

[Download PNG](https://raw.githubusercontent.com/jcholman/proam-labs-demos/main/showcase/assets/icons/proam-labs-apple-touch-icon-180x180.png)

- Exact dimensions: 180 × 180 pixels.
- Format: RGB PNG, opaque background.
- Background: website parchment / sunflower-tan (#F4EDDD), continuous behind emblem and lettering.
- Lettering: navy (#112D3C), proAM over Labs.
- Existing emblem preserved; only the surrounding white background removed for compositing.
- Square corners and inset artwork allow Apple to apply its Home Screen mask.

## Implementation

Add this to the head of each page intended for Home Screen saving (adjust path for the relevant repository):

```html
<link rel="apple-touch-icon" sizes="180x180" href="/proam-labs-demos/showcase/assets/icons/proam-labs-apple-touch-icon-180x180.png">
```

Apple Touch icon tags and concise Home Screen names are enabled on all four showcase pages, Front Porch, Find Your Thread, the Value Explorer, Enhanced library, and POS-Lite. A version query on the icon reference refreshes the former reference asset. The prior white-and-navy version remains in Git history. Existing iPhone shortcuts may need to be removed and added again; adding a new shortcut is the device-level verification step.
