#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { crowAmsaa, fitExponential, fitWeibull, kaplanMeier, lifeQuantile, missionAssessment, normalizeAcceleratedData, repairableMetrics, reliability, reportMarkdown, validateLifeData } from './index.js';
const args = process.argv.slice(2); const [command, first, second] = args; const option = (name) => { const i = args.indexOf(`--${name}`); return i < 0 ? undefined : args[i + 1]; }; const load = async (path) => JSON.parse(await readFile(path, 'utf8')); const emit = async (value) => { const output = `${JSON.stringify(value, null, 2)}\n`; if (option('output')) await writeFile(option('output'), output); else process.stdout.write(output); };
try { if (!command || command === 'help') process.stdout.write('Usage: reliability-lifetime-analyzer <validate data.json|km data.json|weibull data.json|exponential data.json|reliability model.json hours|quantile model.json level|normalize data.json useC|repairable events.json observationHours|growth failure-times.json|mission models.json architecture.json|report data.json model.json> [--hours N] [--activation-energy N] [--output file]\n');
  else if (command === 'validate' && first) { const result = validateLifeData(await load(first)); await emit(result); if (!result.valid) process.exitCode = 2; }
  else if (command === 'km' && first) await emit(kaplanMeier(await load(first)));
  else if (command === 'weibull' && first) await emit(fitWeibull(await load(first)));
  else if (command === 'exponential' && first) await emit(fitExponential(await load(first)));
  else if (command === 'reliability' && first && second) await emit({ reliability: reliability(await load(first), Number(second)) });
  else if (command === 'quantile' && first && second) await emit({ time: lifeQuantile(await load(first), Number(second)) });
  else if (command === 'normalize' && first && second) await emit(normalizeAcceleratedData(await load(first), Number(second), Number(option('activation-energy') ?? 0.7)));
  else if (command === 'repairable' && first && second) await emit(repairableMetrics(await load(first), Number(second)));
  else if (command === 'growth' && first) await emit(crowAmsaa(await load(first)));
  else if (command === 'mission' && first && second) await emit(missionAssessment(await load(first), Number(option('hours')), await load(second)));
  else if (command === 'report' && first && second) { const output = reportMarkdown(await load(first), await load(second), Number(option('hours') ?? 1000)); if (option('output')) await writeFile(option('output'), output); else process.stdout.write(output); }
  else throw new Error('invalid command or arguments'); } catch (error) { process.stderr.write(`reliability-lifetime-analyzer: ${error.message}\n`); process.exitCode = 1; }
