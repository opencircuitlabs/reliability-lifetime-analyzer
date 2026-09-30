# Reliability Lifetime Analyzer

`reliability-lifetime-analyzer` provides transparent lifetime and mission-reliability calculations for electronics qualification, field-return, and repair data, including right-censored observations.

## Capabilities

- Lifetime data validation with failures, right censoring, and exposure totals
- Kaplan–Meier survival curves and median lifetime
- Weibull probability-plot fit with shape, characteristic life, and R²
- Exponential maximum-likelihood failure rate and MTBF using censored exposure
- Reliability, life quantiles, and hazard functions
- Arrhenius acceleration and use-temperature normalization
- Exact series, parallel, and heterogeneous k-of-n system reliability
- Repairable-system MTBF, MTTR, inherent availability, and operational availability
- Crow–AMSAA reliability-growth trend estimation
- Component-to-system mission assessments
- Markdown reports containing the survival evidence
- Dependency-free Node.js 18+ library and CLI

## Quick start

```bash
npm install
npm test
node src/cli.js validate examples/life-data.json
node src/cli.js km examples/life-data.json
node src/cli.js weibull examples/life-data.json
node src/cli.js exponential examples/life-data.json
node src/cli.js reliability examples/exponential-model.json 1000
node src/cli.js report examples/life-data.json examples/exponential-model.json --hours 1000 --output report.md
```

## Library API

```js
import { kaplanMeier, fitWeibull, reliability, missionAssessment } from '@opencircuitlabs/reliability-lifetime-analyzer';

const survival = kaplanMeier(records);
const model = fitWeibull(records);
const r1000 = reliability(model, 1000);
```

The Weibull fitter uses Bernard median ranks and linear probability plotting, which is inspectable and useful for exploratory engineering work. Formal release claims may require maximum-likelihood models, interval estimates, competing-risk treatment, test-design review, and domain validation by a qualified reliability engineer.

## License

MIT. See [LICENSE](LICENSE).
