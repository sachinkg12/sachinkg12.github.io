# Public content sources

Reviewed November 21, 2026. The portfolio summarizes public work; guptasachinn.com remains the article and activity archive.

## Projects

### HeapLens

Investigate Java and Android heap dumps with a native Rust engine, interactive views, a query language, and source navigation. Available in VS Code, IntelliJ IDEA, and the terminal.

- https://github.com/sachinkg12/heaplens
- https://doi.org/10.1145/3837729.3840479

Scope: Heap analysis runs locally. Optional AI features send selected context to the configured provider unless a local model is used. Large retained sets are investigation leads, not proof of a memory leak.

### AgentTrustCI

JUnit tests for allowed tools, evidence-supported answers, and the order of tool calls. Run the checks beside ordinary application tests.

- https://github.com/sachinkg12/agenttrustci
- https://www.guptasachinn.com/activities/wearedevelopers

Scope: The authored traces test validator conformance. They do not establish a production safety rate or guarantee the behavior of a live model.

### ToolContractGate

A Java gateway checks agent tool calls against approved, versioned API contracts and returns explicit reasons for blocked calls.

- https://github.com/sachinkg12/toolcontractgate
- https://www.guptasachinn.com/activities/platformcon-2026

Scope: The demonstration uses stub tool responses. Connecting the checks to a real tool boundary remains an integration task. Passing a contract check does not establish the overall correctness or safety of a workflow.

### SlideSherlock

Convert presentation decks into narrated video using indexed slide evidence, heuristic checks, and template fallback.

- https://github.com/sachinkg12/SlideSherlock
- https://aclanthology.org/2026.groundlm-1.78/

Scope: The checks are proxies for selected errors. They do not establish that every narrated statement is correct or eliminate hallucination.

### Yukti

A credit-card portfolio research application that separates mathematical optimization from explanations tied to solver output.

- https://github.com/sachinkg12/yukti
- https://aclanthology.org/2026.groundlm-1.5/

Scope: Results depend on the catalog, valuations, constraints, and input assumptions. The explanation checks cover a fixed schema rather than all possible claims.

## Publications

Publisher records take precedence over activity dates. EMNLP workshop papers are labeled as workshops. The HeapLens paper is a tool demonstration in companion proceedings.

- HeapLens: An IDE-Integrated Tool for Heap Dump Analysis with In-Editor Source Bridging and LLM-Assisted Diagnosis — Sachin Gupta. Companion Proceedings of the 2026 ACM SIGPLAN International Conference on Systems, Programming, Languages, and Applications: Software for Humanity. https://doi.org/10.1145/3837729.3840479
- VERITYGATE: A Four-Gate Schema-Level Faithfulness Framework and Paired Benchmark for Grounded LLM Narrations over Structured Evidence — Sachin Gupta. Proceedings of the First Workshop on Grounding Language Models: Learning Faithfully and Efficiently. https://aclanthology.org/2026.groundlm-1.5/
- TRACE: Target-Aware Retrieval, Attributed Evidence, and Contract-Constrained Extraction for LitTraceQA — Sachin Gupta and Divya Godara. Proceedings of the First Workshop on Grounding Language Models: Learning Faithfully and Efficiently. https://aclanthology.org/2026.groundlm-1.86/
- Evidence-Indexed Slide Narration With Heuristic Checks and Template Fallback — Sachin Gupta. Proceedings of the First Workshop on Grounding Language Models: Learning Faithfully and Efficiently. https://aclanthology.org/2026.groundlm-1.78/
- Default Zero-Shot LLM APIs Over-Flag Indian Financial SMS: A Policy-Aligned Benchmark and Template-Level Pre-Deployment Audit — Sachin Gupta. Proceedings of the First Workshop on Grounding Language Models: Learning Faithfully and Efficiently. https://aclanthology.org/2026.groundlm-1.79/
- Evidence First, Arithmetic Second: A System Report and Failure Analysis for DOCSEM — Divya Godara and Sachin Gupta. The Proceedings of Workshop on Document Intelligence and Understanding. https://aclanthology.org/2026.docinsights-1.32/

## Talks

- ReviewDebt: a practical framework for scoring every pull request — AI Engineer World’s Fair (2026-06-29). https://ai.engineer/talks/TJPInBjhE4Q-reviewdebt-practical-framework-scoring-every-pull; writeup: https://www.guptasachinn.com/activities/ai-engineer-2026
- Agents Need Feature Flags — AI Engineer World’s Fair (2026-06-29). https://www.youtube.com/watch?v=zU4EagB311U; writeup: https://www.guptasachinn.com/activities/ai-engineer-feature-flags
- Tool Contracts for AI Agents — PlatformCon (2026-06-23). https://www.youtube.com/watch?v=kMnz8bRUMZY; writeup: https://www.guptasachinn.com/activities/platformcon-2026
- Test before release. Enforce at runtime. — WeAreDevelopers (2026-09-23). https://www.youtube.com/live/NprWZp3fHb4; writeup: https://www.guptasachinn.com/activities/wearedevelopers
- Prompt Drift Kills: How to Make Prompts Stable — Conf42 Prompt Engineering (2026-10-29). https://www.conf42.com/Prompt_Engineering_2026_Sachin_Gupta_drift_prompts_stable; writeup: https://www.guptasachinn.com/activities/conf42-prompt-2026
- From OpenAPI to MCP, in 90 seconds — DeveloperWeek New York (2026-06-09). https://www.developerweek.com/newyork/sessions/; writeup: https://www.guptasachinn.com/activities/developerweek-2026

## Career and service

Career details: https://www.guptasachinn.com/about. Selected service records link to public activity pages. No private records, unpublished drafts, employer confidential material, download counts, or estimated human review hours are used.

## Original notes

Original Docsify entry, README and sidebar are preserved in `legacy/`. Original `ai/` and `docker/` content remains unchanged. Old hash links will forward to `/notes/`.

## Asset provenance

- Public portrait: https://avatars.githubusercontent.com/u/61034758?v=4
- HeapLens screenshots: https://github.com/sachinkg12/heaplens/tree/main/media/screenshots
- Original personal illustration: built-in ImageGen, based on the public portrait; prompt in `docs/illustration-prompt.txt`. This is an illustration, not a photograph of a real workspace.
- Tanay Arora portfolio: layout inspiration only, https://www.tanayarora.com/. No identity, project artwork, copy or result statistics are reused.

## Maintenance

Update curated facts in `content/portfolio.json`. Check title, author order, venue and publication status against the publisher. Keep full articles on guptasachinn.com.

## Expanded bibliography and project inventory

The build now includes TRACE and RouteGuard in addition to the initial five tools. See `docs/project-asset-sources.md` for their sources and the selected light IntelliJ screenshots. The complete ten-work bibliography and publication-status evidence are in `docs/papers-audit.md` and `content/papers-discovery.json`. The site’s maintained source of truth is `content/portfolio.json`.

The delivered SCIS keynote is supported by the user’s completion statement and the public conference talk record: https://www.scrs.in/conference/scis2026/speaker/talk/23367 . The conference dates are November 21–22, 2026; the portfolio does not invent a recording link.
