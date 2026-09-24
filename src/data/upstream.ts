export interface Upstream {
  name: string
  repo: string
  what: string
}

/** Counts as recorded on 2026-09-23. Work on other people's projects only —
 *  no forks, no repositories maintained here. */
export const counts = { merged: 20, open: 14, projects: 14 }

export const upstream: Upstream[] = [
  { name: 'rclone', repo: 'rclone/rclone', what: 'touch --timestamp now tries the supported layouts instead of guessing from input length' },
  { name: 'raylib', repo: 'raysan5/raylib', what: 'unsigned overflow when centring the window on a display smaller than the window' },
  { name: 'Transmission', repo: 'transmission/transmission', what: 'martian address check folded into is_valid_for_peers(), with a test' },
  { name: 'Lichess', repo: 'lichess-org/lila', what: 'study comments lost their author on PGN round-trip and merged between users' },
  { name: 'lnav', repo: 'tstack/lnav', what: 'restored the double-press behaviour of G and End' },
  { name: 'Cataclysm: BN', repo: 'cataclysmbnteam/Cataclysm-BN', what: 'monster weapon reload with uncounted ammo, and body ageing during activity skip' },
  { name: 'Shelfmark', repo: 'calibrain/shelfmark', what: 'deep links for Search By, and default filters kept out of the URL hash' },
  { name: 'tuicr', repo: 'agavra/tuicr', what: 'help alignment, horizontal scrolling and an opt-in q_quits' },
  { name: 'rdrview', repo: 'eafer/rdrview', what: 'version guard for CURLOPT_PROTOCOLS_STR' },
  { name: 'TorrServer', repo: 'YouROK/TorrServer', what: 'a JSON body when /torrents rejects a request' },
  { name: 'usage', repo: 'jdx/usage', what: 'completion of --flag=value' },
  { name: 'cliamp', repo: 'bjarneo/cliamp', what: 'option to hide the shortcut hint bar' },
]
