// Starting copy for the Paper Weight Chart page, from the Figma design (node 799:2).
// Editors change it in Content > Paper weight chart. The photos are placeholders until uploaded there.
import type { PaperWeightPage } from '../lib/types.ts'
import { ph } from './helpers.ts'

const stops = [
  ['80 GSM', 'Inserts'],
  ['250 GSM', 'Folding cartons'],
  ['350 GSM', 'Premium cartons'],
  ['600 GSM', 'Rigid board'],
  ['1200 GSM', 'Heavy rigid'],
].map(([gsm, label]) => ({ gsm, label }))

export const paperWeight: PaperWeightPage = {
  hero: {
    heading: 'Paper weight chart',
    text: 'GSM, points, and pounds, in one place. Find the right board weight for your box, then check it in seconds.',
    converterLabel: 'Try the converter',
    chartLabel: 'See the chart',
    image: ph('Stack of white, kraft and grey boards beside a ruler'),
    scale: stops,
  },
  measures: {
    heading: 'Three ways to measure',
    text: 'Paper weight confuses buyers because the packaging world uses three systems side by side. They all describe the same sheet.',
    cards: [
      { code: 'GSM', title: 'Grams per square metre', text: 'The weight of one square metre of the sheet. The most universal unit in packaging, and the one most suppliers quote.' },
      { code: 'PT', title: 'Points, or caliper', text: 'The thickness of the sheet. One point is a thousandth of an inch, 0.0254 mm. Used for US-style cover boards.' },
      { code: 'LB', title: 'Pounds, or basis weight', text: "The weight in pounds of a ream, usually 500 sheets, at the paper's standard size. A US trade unit." },
    ],
  },
  converter: {
    eyebrow: 'Converter',
    heading: 'Check a weight',
    text: 'Convert points or pounds to GSM. Results are approximate, exact weight varies by mill and grade.',
    image: ph('Board samples being measured'),
    note: 'Approximate, exact weight varies by mill and grade.',
  },
  chart: {
    eyebrow: 'Conversion tables',
    heading: 'The chart',
    text: 'Points to GSM, by stock type. Read across the row for your board. C1S is coated on one side, C2S on both sides.',
    rows: [8, 10, 12, 14, 16, 18, 20, 22, 24].map((pt) => ({
      pt: `${pt} pt`,
      text: `~${pt * 6} GSM`,
      uncoated: `~${pt * 14} GSM`,
      c1s: `~${pt * 15} GSM`,
      c2s: `~${Math.round(pt * 16.5)} GSM`,
      thickness: `${(pt * 0.0254).toFixed(2)} mm`,
    })),
    note: 'All values are approximate and vary by mill and grade.',
    poundsHeading: 'Pounds to GSM',
    poundsText: 'Text stock: GSM is about pounds x 1.48. Cover stock: GSM is about pounds x 2.71.',
    poundsRows: [
      ['54', '80', '146'],
      ['61', '90', '165'],
      ['68', '100', '184'],
      ['82', '121', '222'],
      ['101', '150', '274'],
      ['122', '180', '331'],
      ['135', '200', '367'],
    ].map(([lb, text, cover]) => ({ lb: `${lb} lb`, text: `~${text} GSM`, cover: `~${cover} GSM` })),
  },
  glance: {
    eyebrow: 'At a glance',
    heading: 'From light to heavy',
    text: 'Heavier board means a stiffer, more protective box. The jump from carton to rigid board is the biggest one.',
    bars: stops.map((s, i) => (i === 0 ? { ...s, label: 'Inserts, tissue, labels' } : s)),
    note: 'Inserts and labels sit at the light end. Heavy rigid board sits at the far end.',
  },
  boxes: {
    eyebrow: 'Pick your box',
    heading: 'Which weight for which box?',
    text: 'Typical ranges for the boxes Region makes. Tell us your product weight and how it ships, and we confirm the board before printing.',
    photos: ['White corrugated board', 'Kraft corrugated board', 'Double-wall corrugated board', 'Rigid greyboard'].map((label) => ({ label, image: ph(label) })),
    fluteHeading: 'Corrugated board is measured by flute, not just GSM',
    flutes: [
      { title: 'F flute', text: '0.8 mm, small premium boxes' },
      { title: 'E flute', text: '1.6 mm, mailer boxes' },
      { title: 'B flute', text: '3.2 mm, shipping boxes' },
      { title: 'C flute', text: '4.0 mm, heavy shipping' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Questions, answered.',
    text: 'Quick answers about board weight.',
    items: [
      { question: 'What is GSM?', answer: 'Grams per square metre: the weight of one square metre of the sheet. The higher the number, the heavier and usually stiffer the board.' },
      {
        question: 'PT or GSM, which should I use?',
        answer: 'GSM for comparing papers, PT for thickness. In packaging, GSM is the number most suppliers quote. PT tells you how thick the board feels. This chart converts between the two.',
      },
      {
        question: 'Which weight should my mailer box be?',
        answer:
          'Mailer boxes are corrugated, so they are chosen by flute rather than GSM. E flute suits most mailer boxes; heavier products move up to B flute. Tell us what goes inside and we will suggest the board.',
      },
      {
        question: 'Can Region confirm the right weight for my product?',
        answer: 'Yes. Tell us your product, its weight and how it ships, and we confirm the board before printing.',
      },
    ],
  },
  seoTitle: 'Paper Weight Chart: GSM, Points and Pounds | Region Packaging',
  seoDescription: 'Convert paper and board weights between GSM, points (PT) and pounds (LB), with charts by stock type and a guide to which board weight suits which box.',
}
