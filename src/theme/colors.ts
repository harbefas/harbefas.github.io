import { dark, light } from './tokens.generated'

export interface ThemeColors {
  name: string
  label: string
  bg: string
  fg: string
  bg1: string
  keyword: string
  string: string
  function: string
  type: string
  comment: string
  number: string
  operator: string
  accent: string
}

/**
 * Yerba Mate / Tererê — the palette is NOT declared here.
 *
 * Values come from mateCreations/ui/tokens (DTCG → Style Dictionary), vendored
 * by `npm run sync:tokens`. This file only maps the site's syntax vocabulary
 * onto semantic tokens; see ./PHILOSOPHY.md and mateCreations/DESIGN.md §2.
 *
 * Syntax roles follow the editor themes (the editor themes' colors.toml): keywords are
 * ocre, functions blue, strings mate green, types rose. Two deliberate
 * divergences, because the site paints UI and not a buffer:
 *  - `comment` is --tx-3, not the editor's moss --border: the site also uses it
 *    as muted UI ink, where --border would fail 1.4.3.
 *  - `accent` is --accent-text (ink), not --accent (fill): it is used as a text
 *    and rule color, and amber fill is 2.83 on Tererê's cream.
 */
const map = (t: typeof dark | typeof light, name: string, label: string): ThemeColors => ({
  name,
  label,
  bg: t['--bg'],
  bg1: t['--bg-2'],
  fg: t['--tx'],
  keyword: t['--yellow'],
  string: t['--green'],
  function: t['--blue'],
  type: t['--purple'],
  comment: t['--tx-3'],
  number: t['--orange'],
  operator: t['--tx-2'],
  accent: t['--accent-text'],
})

export const yerbaMate: ThemeColors = map(dark, 'yerba-mate', 'Yerba Mate')
export const terere: ThemeColors = map(light, 'terere', 'Terere')

export const themes = [yerbaMate, terere]
