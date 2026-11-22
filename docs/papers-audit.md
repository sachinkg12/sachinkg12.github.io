# Public bibliography audit

Checked November 21, 2026. The current inventory contains **10 distinct works: 7 published, 2 accepted, and 1 standalone preprint**. The source data is in `content/papers-discovery.json`.

## Sources and status decisions

- The [public GitHub profile](https://github.com/sachinkg12/sachinkg12) lists nine accepted works: six entries already in this portfolio, RouteGuard, AgentTrustCI, and ToolContractGate. Its status badges distinguish seven published records from two accepted manuscripts.
- The [live arXiv author Atom feed](https://arxiv.org/a/gupta_s_12.atom) adds **AgentFaultBench**, posted November 16, 2026. Cached author HTML was incomplete, so it was insufficient as a complete bibliography. AgentFaultBench says **submitted** to NAACL 2027 Industry Track; it belongs under **Preprints**, not Accepted.
- ACL Anthology confirms publication, titles, author order, proceedings names, and pages for VERITYGATE, TRACE, slide narration, the Indian financial SMS audit, and EVICALC. These proceedings are dated October 2026. Workshop scope remains explicit; workshop papers must not be presented as main-track EMNLP papers.
- [Crossref](https://api.crossref.org/works/10.1145/3837729.3840479) confirms HeapLens publication on October 3, 2026, pp. 80–84, by Sachin Gupta, in the SPLASH companion proceedings.
- [Public ORCID works](https://pub.orcid.org/v3.0/0009-0009-7422-4967/works) corroborate the ACM/ACL works and distinguish software archives from papers. ORCID is not yet complete enough to serve as the sole inventory.
- [AgentTrustCI](https://arxiv.org/abs/2611.06674) and [ToolContractGate](https://arxiv.org/abs/2610.33108) explicitly state ICCA 2026 acceptance in their public arXiv comments. No publisher Version of Record was verified.

## RouteGuard publication caveat

The [official ICTAI conference program](https://ictai.computer.org/2026/wp-content/uploads/sites/7/2026/10/ICTAI-Conference-Program.pdf) lists paper **552**, the exact title and **Gupta Sachin**, as a full paper in Session 12B on November 2, 2026. The [official SCIS keynote biography](https://www.scrs.in/conference/scis2026/speaker/talk/23367) states that this author’s research has been published at IEEE ICTAI 2026. The latest public author profile identifies RouteGuard as **published at IEEE ICTAI 2026**, links to an [official IEEE Computer Society proceedings PDF](https://conferences.computer.org/ictaipub26/pdfs/4880-1wRFtuxgVBHgn8UZdUtTn4/488001a271/488001a271.pdf), and the user supplied a keynote biography reporting ICTAI publication. The publisher PDF returned HTTP 401 in this audit, so its exact final DOI, pages, and publication date were not independently read. A Crossref title query found no matching final paper DOI. The profile README was last updated **November 8, 2026** ([commit](https://github.com/sachinkg12/sachinkg12/commit/667b2bae41968379c81f38c70ec1a5cdfa8cf604)), while the RouteGuard README was last updated **September 10, 2026** ([commit](https://github.com/sachinkg12/RouteGuard/commit/22a2c3988281bc7b2249fa8ce985678442ff1af3)). The older project README and arXiv comments still say accepted; the more recent profile reports publication. Use [arXiv](https://arxiv.org/abs/2610.31657) as an accessible alternate and do not guess a publisher DOI or use the Zenodo artifact DOI as the paper DOI.

## One work, multiple versions

VERITYGATE, TRACE, EVICALC, RouteGuard, AgentTrustCI, and ToolContractGate have arXiv versions. They remain single bibliography entries with alternate links. Do not inflate the preprint count by listing the same work twice.

## Project additions

- [TRACE](https://github.com/sachinkg12/trace) is a public Python scientific-QA implementation with a [project page](https://sachinkg12.github.io/trace/). The public release contains the general architecture, not the exact composed official-test prediction file. Hosted inference can drift.
- [RouteGuard](https://github.com/sachinkg12/RouteGuard) is an offline classification/abstention evaluation framework with a [project page](https://sachinkg12.github.io/RouteGuard/). It does not provide a production routing service. Its [Zenodo artifact](https://doi.org/10.5281/zenodo.22609128) is a separate evidence archive.

## Exclusions and remaining uncertainty

The public AKBC repository cites *The Selection Wall in Closed-Book Knowledge Base Construction: Elicit, Screen, and Freeze*, by Sachin Gupta and Divya Godara. The cited OpenReview forum could not be retrieved publicly (HTTP 403), and no public full manuscript or acceptance record was verified. It was not added to the display inventory; do not imply acceptance. Author confirmation and an accessible public manuscript would resolve whether to display it as a preprint.

Broad name searches return unrelated papers by other people named Sachin Gupta. Only work linked to this user's established profiles, ORCID, collaborator records, or public repositories was included. No private draft prose, reviews, or credentials were inspected.
