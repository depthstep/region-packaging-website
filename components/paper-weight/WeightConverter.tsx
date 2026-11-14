'use client'

import { useState } from 'react'

// Standard approximations, the same ones the chart on this page uses.
const MM_PER_POINT = 0.0254
const STOCKS = {
  pt: [
    { label: 'Text stock', perUnit: 6 },
    { label: 'Uncoated board', perUnit: 14 },
    { label: 'C1S board', perUnit: 15 },
    { label: 'C2S board', perUnit: 16.5 },
  ],
  lb: [
    { label: 'Text stock', perUnit: 1.48 },
    { label: 'Cover stock', perUnit: 2.71 },
  ],
} as const
type Unit = keyof typeof STOCKS

type Result = { gsm: number; mm?: number } | null

function convert(unit: Unit, stock: number, value: number): Result {
  if (!Number.isFinite(value) || value <= 0) return null
  const gsm = Math.round(value * STOCKS[unit][stock].perUnit)
  return { gsm, mm: unit === 'pt' ? value * MM_PER_POINT : undefined }
}

/** Points or pounds to GSM. Starts on 12 pt uncoated board, as in the design. */
export function WeightConverter({ note }: { note?: string }) {
  const [unit, setUnit] = useState<Unit>('pt')
  const [stock, setStock] = useState(1)
  const [value, setValue] = useState('12')
  const [result, setResult] = useState<Result>(() => convert('pt', 1, 12))

  return (
    <form
      className="pw-conv__form"
      onSubmit={(e) => {
        e.preventDefault()
        setResult(convert(unit, stock, Number(value)))
      }}
    >
      <label className="field field--wide">
        <span className="field__label">I have</span>
        <span className="select">
          <select
            value={unit}
            onChange={(e) => {
              const u = e.target.value as Unit
              setUnit(u)
              setStock(u === 'pt' ? 1 : 0)
              setValue(u === 'pt' ? '12' : '80')
              setResult(null)
            }}
          >
            <option value="pt">Points (PT)</option>
            <option value="lb">Pounds (LB)</option>
          </select>
        </span>
      </label>
      <div className="pw-conv__row">
        <label className="field">
          <span className="field__label">Stock type</span>
          <span className="select">
            <select value={stock} onChange={(e) => setStock(Number(e.target.value))}>
              {STOCKS[unit].map((s, i) => (
                <option key={s.label} value={i}>
                  {s.label}
                </option>
              ))}
            </select>
          </span>
        </label>
        <label className="field">
          <span className="field__label">Value</span>
          <input className="input pw-conv__value" type="number" inputMode="decimal" min="0.1" step="any" value={value} onChange={(e) => setValue(e.target.value)} required />
        </label>
      </div>
      <button type="submit" className="btn btn--primary btn--sm pw-conv__button">
        Convert
      </button>
      <div className="pw-conv__result" aria-live="polite">
        {result ? (
          <>
            <p className="pw-conv__gsm">About {result.gsm} GSM</p>
            <p>
              {result.mm !== undefined && `That is about ${result.mm.toFixed(2)} mm thick. `}
              {note}
            </p>
          </>
        ) : (
          <p>Enter a value and press Convert.</p>
        )}
      </div>
    </form>
  )
}
