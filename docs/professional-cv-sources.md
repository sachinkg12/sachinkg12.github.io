# Professional CV page

The user supplied the ready-to-use Professional CV PDF and the matching Professional CV 2026 DOCX. All 101 extracted paragraphs matched across the three-page documents. The original documents are not copied into this public repository or deployment.

The user reviewed Superdesign draft `00c03d11-99e6-47fc-903d-38a3dc3a5186`, version 2, and authorized publication. `site/cv.html` preserves that approved layout and content. The production conversion replaces remote preview-host portraits with the matching local portrait, compiles the same utility styles into a local asset, moves runtime behavior into `site/cv.js`, and adds production canonical/social metadata and a skip link. The phone number was excluded from the reviewed web preview and remains excluded.

The CV is a selected record from the supplied document. It includes nine selected papers (seven published, two accepted), 11 presentations including the keynote, poster, and panel, and four separate 2027 reviewer or committee appointments. The portfolio's complete bibliography remains separate.

Preserve these source distinctions:

- The professional headline is Staff Software Engineer, while the actual eBay role is Member of Technical Staff 2.
- The eBay billing-platform transaction count has no stated time interval. Do not append a daily or annual rate. The API workload is approximately 80 million requests per day at a 99.99% success rate. The 93% incident-resolution time reduction retains its scope of approximately 2,200 annual incidents, 291 tools, and 11 teams.
- The 44 completed manuscript reviews across 17 tracks in 2026 exclude GroundLM area-chair work and artifact evaluation. The four 2027 appointments are listed separately. They are not added to the completed-review total.
- The ACSAC acknowledgment does not establish an individual artifact count. CAV is described as two smoke-test evaluations. Do not convert either into a count of manuscript reviews.
- HeapLens downloads are a historical snapshot across the VS Code Marketplace and Open VSX as of August 15, 2026, not current adoption.
- The University of Colorado Boulder degree is expected in September 2027, not completed.
- The supplied CV's talk dates are retained in this document-based page. This publication does not rewrite the separately maintained speaking inventory.
- The Top 10 Mentor (September 2026) and Top 1% Mentor (October 2026) recognitions are retained from the user's earlier public portfolio instructions.

The stylesheet is precompiled from `site/cv.html` using the pinned optional compiler command documented in the README. Normal builds copy the local stylesheet and script under content-hashed URLs. No runtime Tailwind CDN, design service, source-document path, or custom-domain configuration is required for the public page.
