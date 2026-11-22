# Project and asset verification

Reviewed November 21, 2026. Scope: the user-approved separate GitHub Pages portfolio.

## HeapLens light IntelliJ screenshots

The public JetBrains Marketplace record for plugin 35004 exposes the screenshot URLs via https://plugins.jetbrains.com/api/plugins/35004. All three downloaded screenshots were visually inspected. They show the actual native IntelliJ IDEA application in its light theme, not a mockup or a recolored VS Code screenshot.

- Primary: `assets/heaplens-intellij-light.webp`, 1800px wide, about 56 KB. Original: `assets/heaplens-intellij-light.png`. Source: https://plugins.jetbrains.com/files/35004/screenshot_07640c83-85e2-411c-ab30-87870daf826d . Shows heap treemap and retained-size bars.
- Secondary: `assets/heaplens-intellij-secondary.webp`, 1800px wide, about 84 KB. Original: `assets/heaplens-intellij-secondary.png`. Source: https://plugins.jetbrains.com/files/35004/screenshot_5a2c925a-1045-4cc8-a334-128691a80867 . Shows investigation leads and retained-object table.
- Histogram: `assets/heaplens-intellij-histogram.webp`, 1800px wide, about 98 KB. Original: `assets/heaplens-intellij-histogram.png`. Source: https://plugins.jetbrains.com/files/35004/screenshot_a280ca69-ef23-48df-b71e-20aa6895ec5b . Shows class histogram. Mostly neutral white, but includes native blue links and a small native tooltip.

WebP assets are format/size optimizations of the original public screenshots, with no altered UI, data, or recoloring.

## Missing projects

- TRACE source: https://github.com/sachinkg12/trace ; project site: https://sachinkg12.github.io/trace/ ; published paper: https://aclanthology.org/2026.groundlm-1.86/ . README, pyproject and CITATION were checked. Python, Gemini API, Sentence Transformers. Authors: Sachin Gupta and Divya Godara. The public code reproduces full-generation architecture, not the exact official submitted prediction file.
- RouteGuard source: https://github.com/sachinkg12/RouteGuard ; project site: https://sachinkg12.github.io/RouteGuard/ ; artifact: https://doi.org/10.5281/zenodo.22609128 . README and pyproject checked. Python, scikit-learn, optional Transformers. It is selective-prediction evaluation software, not a production ticket-routing service. The explicit README publication status is accepted at IEEE ICTAI 2026; paper DOI/Xplore pending. Artifact publication is distinct from paper publication.

## SlideSherlock and Yukti consistency

No genuine UI screenshots were found in their public source trees. A consistent split-card layout can use labeled concept diagrams instead of inventing a product screen. Suitable plain descriptions:

- SlideSherlock: presentation deck → indexed slide evidence → checked narration → video. Checks are heuristic; do not claim elimination of hallucinations.
- Yukti: spending assumptions and constraints → mathematical optimizer → solver evidence → checked explanation. Do not depict a model making the optimization decision.

Saved source figure candidates:

- `assets/slidesherlock-architecture.png`: https://raw.githubusercontent.com/sachinkg12/SlideSherlock/master/docs/architecture.png . Visually checked; dark blue/purple/magenta, unsuitable for the approved site palette. Do not use it as the final portfolio visual.
- `assets/trace-architecture.svg`: https://raw.githubusercontent.com/sachinkg12/trace/main/docs/assets/trace-architecture.svg . Source architecture figure, not an application screenshot.
