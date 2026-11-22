# Verification

The final static build contains 14 portfolio pages, seven project case studies, ten distinct papers, and ten talks including the delivered SCIS 2026 keynote. There is also a separate poster record and the preserved Docsify notes archive.

`npm test` checks every generated portfolio page for a single main heading, document language, the GitHub Pages canonical URL, duplicate IDs, nested links, local links and fragments, image assets and alternate text, and citation files. It also verifies that all ten papers appear once on both the home and research pages, all project detail routes exist, the light IntelliJ screenshot and SCIS keynote are present, and the original AI and Docker notes remain byte-identical in both their old raw paths and the notes archive. Private source/design state and CNAME configuration must not appear in deployment output.

Native browser checks in the available 555-pixel preview covered:

- Home and project detail rendering, with no horizontal overflow and all referenced images loaded.
- Publication filters: Preprints returns AgentFaultBench; Accepted returns AgentTrustCI and ToolContractGate.
- Search within publication filters, including the no-results state and a TRACE search returning one record.
- Citation copying, confirmed by the copy result status.
- Mobile menu navigation from Research to Projects.
- SlideSherlock detail scope and labeled concept diagram.
- Original learning-note navigation through the Docsify menu, including the rendered Mermaid diagram.

No source or deployment changes were made to the guptasachinn.com repository. Its articles and activity pages are linked as external resources.
