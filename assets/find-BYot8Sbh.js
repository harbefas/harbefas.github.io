import{a as e,c as t,i as n,l as r,n as i,r as a,t as o}from"./Footer-DY57I5J0.js";var s=r(),c=t(),l={generated:`2026-09-23T23:55:21-03:00`,issues:[{body:`Disclosure first: I develop a large-file text viewer myself (UwView / UwView Pro), and lnav appears in pages I have already published — a comparison page and a companion article about lnav and PilotEdit:

- https://uvp.y42u.net/en/benchmarks-en/
- https://uvp.y42u.net/en/blog/uvp-pilotedit-lnav-48gb-en/

I would rather have the right result on those pages than the one I have now, which is why I am reporting this properly instead of leaving a mark on a page.

**lnav version**

0.14.1

**Describe the bug**

lnav dies with SIGSEGV while building the index, on a file with 892,239,125 lines. Reproduced three times (2026-09-08, 2026-09-11, 2026-09-12).

In all three crash logs, the last thing the LOG view reports before the crash is the same number:

\`\`\`
vc_title=LOG; vc_y=2; lv_top=133999860; lv_left=0; lv_height=-9; lv_selection=-1; inner_height=134217728
\`\`\`

134,217,728 is 2^27 exactly, and the index had just reached 134,999,869 lines. It is the same value in all three logs, and the crash follows immediately.

That suggests the boundary is the line count, not the file size — which also explains why a 10 GB file of the same kind completes without trouble: it has about 100 million lines, under 2^27. The 48 GB file has 892 million, 6.6x over.

I am not claiming to know which limit this is; I only know the number that appears right before every crash.

Backtrace:

\`\`\`
Received signal: 11
0   lnav                       _ZL7sigabrtiP9__siginfoPv + 256
1   lnav                       fatal_handler + 312
2   libsystem_platform.dylib   _sigtramp + 56
3   lnav                       logfile_sub_source::rebuild_index(...) + 5068
4   lnav                       rebuild_indexes(...) + 2756
5   lnav                       looper() + 16284
6   lnav                       main + 26168
\`\`\`

**To Reproduce**

Steps to reproduce the behavior:

1. Produce a single text file with more than 134,217,728 lines. Mine is the OpenStreetMap Japan extract expanded to XML: \`osmium cat japan-latest.osm.pbf -o japan-latest.osm\` — 51,254,526,392 bytes, 892,239,125 lines, one tag per line, short and uniform, UTF-8, no timestamps.
2. \`lnav japan-latest.osm\`
3. First paint appears in about 1.4 s. Leave it indexing.
4. At around 2 minutes (09:00:25 -> 09:02:43 on the last run, 2 min 18 s), lnav crashes. The GURU MEDITATION handler fires and writes a crash log.

**Expected behavior**

Either index the file, or stop with an error saying the file is too large. A SIGSEGV is the part I think is worth fixing, whatever the answer is about supported sizes.

**Environment**

\`\`\`
lnav 0.14.1
MacBook Air, Apple M4, 32 GB RAM
Darwin 25.3.0, arm64 (T8132)
LANG=ja_JP.UTF-8
file on an external USB SSD
\`\`\`

**Two things I should say plainly**

1. This file is not a log. An OSM XML dump is outside what lnav is for, and if the answer is "that is not supported", that is fair and I will say so on my page. But a SIGSEGV is different from a refusal, which is why I am filing it.
2. While indexing, lnav reports roughly 950,000 "out-of-time-order lines" on every pass. The file has no timestamps at all, so lnav may be doing a great deal of work that has no meaning for this input. That may be a separate issue, or it may be related.

Also worth saying: the first paint was 1.4 s, the fastest of every tool I measured. lnav shows you something almost immediately.

**What I can do**

I have the file and the machine, and it reproduces every time. I am happy to run an instrumented build, attach a debugger, or send the full crash logs (about 325 KB each, three of them). I have also sent one via \`lnav -m crash upload\`.

Thanks for lnav.
`,comments:1,createdAt:`2026-09-12T00:21:27Z`,labels:[`bug`],number:1750,repo:`tstack/lnav`,title:`SIGSEGV in logfile_sub_source::rebuild_index right after a file passes 134,217,728 (2^27) lines`,url:`https://github.com/tstack/lnav/issues/1750`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:2,repoStars:10698,repoSizeKb:66457,merges90d:3,medianMergeDays:0,outsiderPct:92,issueResponsePct:48,score:{value:9,band:`high`,classe:{n:3,why:[`text: 'SIGSEGV'`]},alcance:{n:3,why:[`default path: 'every'`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:3,why:[`sounds localised: 'instead of'`]},acceptance:{n:2,why:[`3 merges in 90d`,`median merge 0d`,`92% of merges from occasional authors`]},notes:[],estimated:!0}},{body:`### Describe the bug

After a LazyGit process had been running for about three days in tmux, switching between changed files took about 1.5 seconds per selection. Restarting LazyGit in the same pane brought this down to about 53 ms, with the same repo state and config, including Delta.

The delay was noticeable when files had both staged and unstaged changes. We measured repeated switches between one partially staged file and an adjacent file with only staged changes. Both directions were slow.

### To reproduce

We do not yet know what triggers the slow state from a fresh process. This is the observed workflow:

1. Run LazyGit in a persistent tmux session. A popup attaches to that session; closing the popup detaches without stopping LazyGit.
2. Continue normal work with the process alive. The affected process had roughly three days of uptime.
3. In the Files panel, switch between a partially staged file and a file with only staged changes using the arrow keys.
4. Once the process is affected, each selection takes about 1.5 seconds to show the new diff.
5. Restart LazyGit in the same pane with the same config. The same navigation takes about 53 ms.

Process age is an observation, not a confirmed trigger. We have reproduced navigation delays in the affected process, but have not reproduced the transition into that state.

### Expected behavior

File selection and diff display should remain as responsive as in a fresh instance.

### Measurements

We sent arrow keys with \`tmux send-keys\` and polled \`tmux capture-pane\` until both the expected file path and a known line from its diff appeared. Times include command and polling overhead.

| Test | Time per file switch |
| --- | --- |
| Affected process, six initial switches | 1.460 to 1.591 s |
| Fresh instance with raw Git renderer | 34 to 36 ms |
| Fresh instance with original config and Delta | 50 to 53 ms |
| Restarted original pane, six switches | 52 to 54 ms |

The affected process remained slow while a fresh instance was fast. We also selected the fresh instance's tmux window to verify that it remained fast when visible. The final comparison used the original config, including default auto-fetch behavior. The restart preserved the original PATH, LG_CONFIG_FILE, TERM and COLORTERM settings.

Standalone commands in the same working tree were fast:

- \`git status --porcelain\`: about 17 ms.
- Per-file staged and unstaged \`git diff\`: about 8 to 15 ms.
- Delta processing those diffs with output redirected: about 15 to 38 ms.

We did not test the raw Git renderer in the affected process before restarting, so a state-dependent interaction with Delta remains possible.

### Version info

\`\`\`text
commit=, build date=, build source=Homebrew, version=0.65.1, os=darwin, arch=arm64, git version=2.55.0
delta 0.19.2
macOS 27.0, build 26A428
\`\`\`

LazyGit 0.65.1 was the latest published release when checked on 2026-09-18. We have not tested a build from master.

### Terminal info

- Ghostty 1.3.1
- tmux 3.7c
- \`TERM=tmux-256color\`
- \`COLORTERM=truecolor\`
- Persistent LazyGit session accessed through a tmux popup

### Relevant config

\`\`\`yaml
git:
  diffRenderers:
    - colorArg: always
      command: delta --dark --paging=never --line-numbers
  overrideGpg: true
\`\`\`

### Additional context

Restart cleared the symptom. We do not have a Go profile or debug log from the affected state. CPU and memory usage were not recorded, so we cannot attribute this to a CPU spike or memory leak.

Related reports checked:

- #5628 reports tmux sessions becoming unresponsive with 100% CPU. We have not established that this is the same issue.
- #2460 and #3497 report memory growth in long-running sessions. We have not established memory growth here.
- #3405 and #3473 describe Delta's background-detection delay. Our renderer command already includes \`--dark\`.

What profiling would help distinguish these cases if the slowdown returns?
`,comments:0,createdAt:`2026-09-18T11:29:38Z`,labels:[],number:6020,repo:`jesseduffield/lazygit`,title:`File-switch diff display takes ~1.5s in long-running tmux session; restart restores ~53ms`,url:`https://github.com/jesseduffield/lazygit/issues/6020`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:82627,repoSizeKb:157821,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:62,score:{value:8,band:`high`,classe:{n:2,why:[`text: 'slow'`]},alcance:{n:3,why:[`default path: 'always'`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:3,why:[`40 merges in 90d`,`median merge 0d`,`62% of recent issues got a maintainer reply`]},notes:[],estimated:!0}},{body:`### Describe the bug
After opening lazygit, it crash with the following error : 

> Failed to find CreatePseudoConsole procedure in kernel32.dll: The specified procedure could not be found.


<img width="959" height="293" alt="Image" src="https://github.com/user-attachments/assets/15f92b1c-4627-4810-b1d9-bf8bd23c8a57" />

This happen in Windows 10 (Version 10.0.14393) under Hyper-V
This might be due to an old version of Windows being used (I can't update it to see if it solve the issue). 

### To Reproduce
Open lazygit.`,comments:2,createdAt:`2026-09-07T07:08:03Z`,labels:[`bug`],number:6002,repo:`jesseduffield/lazygit`,title:`Failed to find CreatePseudoConsole procedure in kernel32.dll: The specified procedure could not be found.`,url:`https://github.com/jesseduffield/lazygit/issues/6002`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:3,repoStars:82627,repoSizeKb:157821,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:62,score:{value:8,band:`high`,classe:{n:3,why:[`text: 'crash'`]},alcance:{n:2,why:[`3 participants, 0 reactions`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:3,why:[`40 merges in 90d`,`median merge 0d`,`62% of recent issues got a maintainer reply`]},notes:[],estimated:!0}},{body:`**lnav version**
v0.14.1

**Describe the bug**
When entering an SQL query in \`lnav\`, an autocomplete suggestion can appear after the terminating \`;\`. The suggested text appears to come from one of the HTTP header values contained in the Caddy access log.

This does not happen the first time the query is entered and executed. On the first run, no autocomplete suggestion is shown for the final \`;\` and the query executes normally.

When entering the same query again, an autocomplete suggestion appears after the final \`;\`.

Pressing \`Enter\` then accepts the suggestion instead of executing the SQL query.

This unexpectedly modifies the query and can result in an SQL syntax error.

**To Reproduce**
Steps to reproduce the behavior:

1. Open \`lnav\` with the attached Caddy access log and enter SQL mode.

2. Enter the following query for the first time:

\`\`\`sql
select * from caddy_log where 1=1;
\`\`\`

3. No autocomplete suggestion is shown for the final \`;\`. Press \`Enter\` and the query executes normally.

4. Enter the same query again:

\`\`\`sql
select * from caddy_log where 1=1;
\`\`\`

5. After typing the final \`;\`, an autocomplete suggestion appears.

In this case, the suggested text appears to come from the \`Alt-Svc\` response header in the Caddy log, for example:

\`\`\`text
h3=":443"; ma=2592000
\`\`\`

<img width="691" height="490" alt="Image" src="https://github.com/user-attachments/assets/36cc8ef5-d1a4-4281-9cbb-866cdea46350" />

6. Press \`Enter\`.

7. The autocomplete suggestion is inserted into the query instead of executing it. The resulting modified query fails with an SQL syntax error.

<img width="630" height="62" alt="Image" src="https://github.com/user-attachments/assets/86af5bfc-8eee-4050-bce7-c9e3673a19e1" />

**Example Caddy access log entries**

\`\`\`json
{"level":"info","ts":1789375804.3620076,"logger":"http.log.access.example","msg":"handled request","request":{"remote_ip":"192.0.2.10","remote_port":"44050","client_ip":"192.0.2.10","proto":"HTTP/1.1","method":"GET","host":"example.com","uri":"/firebase-key.json","headers":{"Next-Action":["x"],"X-Nextjs-Request-Id":["deadbeef"],"User-Agent":["Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"],"Accept-Encoding":["gzip, deflate"],"Accept":["*/*"],"Connection":["keep-alive"]},"tls":{"resumed":false,"version":772,"cipher_suite":4865,"proto":"http/1.1","server_name":"example.com","ech":false}},"bytes_read":0,"user_id":"","duration":0.000580557,"size":664,"status":200,"resp_headers":{"Server":["Caddy"],"Alt-Svc":["h3=\\":443\\"; ma=2592000"],"Content-Type":["text/html"]},"stbu_server_name":"example.com"}
{"level":"info","ts":1789375805.1945455,"logger":"http.log.access.example","msg":"handled request","request":{"remote_ip":"192.0.2.10","remote_port":"43534","client_ip":"192.0.2.10","proto":"HTTP/1.1","method":"GET","host":"example.com","uri":"/","headers":{"User-Agent":["Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"],"Accept-Encoding":["gzip, deflate"],"Accept":["application/json"],"Connection":["keep-alive"],"X-Livewire":["1"],"Content-Type":["application/json"]},"tls":{"resumed":false,"version":772,"cipher_suite":4865,"proto":"http/1.1","server_name":"example.com","ech":false}},"bytes_read":0,"user_id":"","duration":0.000663673,"size":664,"status":200,"resp_headers":{"Server":["Caddy"],"Alt-Svc":["h3=\\":443\\"; ma=2592000"],"Content-Type":["text/html"]},"stbu_server_name":"example.com"}
\`\`\`

**Expected behavior**

Pressing \`Enter\` after a complete SQL statement ending in \`;\` should execute the query, not accept an autocomplete suggestion.

The behavior should also be consistent between the first and subsequent executions of the same query.
`,comments:0,createdAt:`2026-09-14T13:02:03Z`,labels:[`bug`],number:1751,repo:`tstack/lnav`,title:`SQL autocomplete is unexpectedly applied when pressing Enter after ;`,url:`https://github.com/tstack/lnav/issues/1751`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:10698,repoSizeKb:66457,merges90d:3,medianMergeDays:0,outsiderPct:92,issueResponsePct:48,score:{value:8,band:`high`,classe:{n:2,why:[`label: bug`]},alcance:{n:3,why:[`default path: 'first run'`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:3,why:[`sounds localised: 'instead of'`]},acceptance:{n:2,why:[`3 merges in 90d`,`median merge 0d`,`92% of merges from occasional authors`]},notes:[],estimated:!0}},{body:'fd version: `10.4.2`\n\nI ran the same file types listings on "cold" OS with buffers flushed:\n\n* `rg` took 37s (second run after some time took 19s, with piping to `lscolors`)\n* `fd` took 1m8s\n\nCounted the returned results, `33679` for `rg` and `33676` for `fd`. So difference is inconsequential.\n\nSo it is quite strange that a program made to find strings inside files is much faster that a program made specifically to list _fast_ dirs and files.\n\nSo I will use `rg` to find my files and pipe it to `lscolors` to achieve the same highlighting as `fd`. But it is quite confusing from a user perspective due to the expectation that `fd` would be the fastest tool possible to do this.',comments:2,createdAt:`2026-07-24T14:42:10Z`,labels:[`question`],number:2072,repo:`sharkdp/fd`,title:`fd twice as slow as rg for same dir traversals`,url:`https://github.com/sharkdp/fd/issues/2072`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:3,repoStars:44525,repoSizeKb:2403,merges90d:38,medianMergeDays:3,outsiderPct:64,issueResponsePct:71,score:{value:7,band:`high`,classe:{n:2,why:[`text: 'slow'`]},alcance:{n:2,why:[`3 participants, 0 reactions`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:2,why:[`small codebase (2 MB)`]},acceptance:{n:3,why:[`38 merges in 90d`,`median merge 3d`,`64% of merges from occasional authors`,`71% of recent issues got a maintainer reply`]},notes:[],estimated:!0}},{body:`## Describe the bug

When using the separate **Staged changes / Unstaged changes** panels, the **Staged changes** panel becomes gray/inactive when it is fully maximized.

The panel can be maximized through the intermediate screen modes normally. The problem occurs specifically when reaching the final/full maximization state using \`Ctrl+\`.

This appears to be a regression introduced in **lazygit 0.60.0**. Versions **0.59.0 and earlier work correctly**.

## To Reproduce

1. Open a Git repository in lazygit.
2. Modify a file.
3. Stage the file.
4. Select the **Staged changes** panel.
5. Press \`Ctrl+\` to increase the panel's screen mode.
6. Continue pressing \`Ctrl+\` until the final/full maximization state is reached.
7. Observe that the Staged changes panel becomes gray/inactive.

## Expected behavior

The Staged changes panel should remain active and usable when fully maximized, just as it does in the preceding screen modes.

## Actual behavior

At the final/full maximization state, the Staged changes panel becomes gray/inactive.

It still occupies the full screen, but it appears to lose focus and cannot be interacted with normally.

The problem is specific to the separate staged/unstaged panel layout. Using the single Main view does not exhibit this behavior.

## Screenshots

See attached screenshot.

## Version info

### Affected

\`\`\`text
lazygit 0.60.0 and later
\`\`\`

The issue is reproducible with the current version as well:

\`\`\`text
commit=0134df802366186633176dd2e093a25a1d56c199
build date=2026-09-06T02:37:12Z
build source=unknown
version=0134df80
os=linux
arch=amd64
git version=2.52.0
\`\`\`

### Working

\`\`\`text
lazygit 0.59.0 and earlier
\`\`\`

I have verified that versions before 0.60.0 do not exhibit this behavior.

## Additional context

It seems that this issue is not present in the master, so it might have been already fixed. However I found other problems in master that were also reported.

https://github.com/jesseduffield/lazygit/issues/5974#issuecomment-5804429217`,comments:0,createdAt:`2026-09-24T00:09:01Z`,labels:[`bug`],number:6055,repo:`jesseduffield/lazygit`,title:`Staging pannel goes inactive when fully maximized`,url:`https://github.com/jesseduffield/lazygit/issues/6055`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:82627,repoSizeKb:157821,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:62,score:{value:7,band:`high`,classe:{n:2,why:[`label: bug`,`text: 'regression'`]},alcance:{n:2,why:[`single reporter, no platform qualifier`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:3,why:[`40 merges in 90d`,`median merge 0d`,`62% of recent issues got a maintainer reply`]},notes:[],estimated:!0}},{body:`### \`ya env\` output

\`\`\`Shell
Yazi
    Version: 26.8.15 (Arch Linux 2026-08-19)
    Debug  : false
    Triple : x86_64-unknown-linux-gnu (linux-x86_64)
    Rustc  : 1.97.1 (8bab26f4 2026-07-14)
    Backtrace: None

Ya
    Version: 26.8.15 (Arch Linux 2026-08-19)
    Debug  : false
    Triple : x86_64-unknown-linux-gnu (linux-x86_64)
    Rustc  : 1.97.1 (8bab26f4 2026-07-14)

Config
    Init             : /home/user/.config/yazi/init.lua (3802 chars)
    Yazi             : /home/user/.config/yazi/yazi.toml (3404 chars)
    Keymap           : /home/user/.config/yazi/keymap.toml (4048 chars)
    Theme            : /home/user/.config/yazi/theme.toml (2199 chars)
    VFS              : /home/user/.config/yazi/vfs.toml (No such file or directory (os error 2))
    Package          : /home/user/.config/yazi/package.toml (976 chars)
    Dark/light flavor: ArcSwapAny("") / ArcSwapAny("")

Emulator
    TERM                : Some("xterm-kitty")
    TERM_PROGRAM        : None
    TERM_PROGRAM_VERSION: None
    Brand.from_env      : Some(Kitty)
    Emulator.probe      : Emulator { brand: Kitty, version: "kitty(0.48.2)", csi_u: Some(0), kgp: true, sixel: false, background: Some([65535, 65535, 65535]), color_scheme: Some(true), csi_16t: (7, 14), force_16t: false, osc_5522: true, cursor_blink: false, cursor_shape: Some(1), mux: None }

Adapter
    Drivers.matches: Kgp
    TERM.dimension : Dimension { cols: 152, rows: 98, width: 1064, height: 1372 }

Desktop
    XDG_SESSION_TYPE           : Some("wayland")
    WAYLAND_DISPLAY            : Some("wayland-0")
    DISPLAY                    : Some(":1")
    NIRI_SOCKET                : None
    SWAYSOCK                   : None
    HYPRLAND_INSTANCE_SIGNATURE: None
    WAYFIRE_SOCKET             : None

SSH
    shared.in_ssh_connection: false

WSL
    WSL: false

Variables
    SHELL              : Some("/bin/bash")
    EDITOR             : Some("nvim")
    VISUAL             : None
    YAZI_FILE_ONE      : None
    YAZI_CONFIG_HOME   : None
    YAZI_ZOXIDE_OPTS   : None
    SSH_AUTH_SOCK      : None
    FZF_DEFAULT_OPTS   : None
    FZF_DEFAULT_COMMAND: None

Text Opener
    default     : Some(OpenerRuleArc(OpenerRule { id: Id(3), run: NonEmptyString("\${EDITOR:-vi} %s"), block: true, orphan: false, desc: "$EDITOR", for: Unix, spread: true }))
    block-create: Some(OpenerRuleArc(OpenerRule { id: Id(3), run: NonEmptyString("\${EDITOR:-vi} %s"), block: true, orphan: false, desc: "$EDITOR", for: Unix, spread: true }))
    block-rename: Some(OpenerRuleArc(OpenerRule { id: Id(3), run: NonEmptyString("\${EDITOR:-vi} %s"), block: true, orphan: false, desc: "$EDITOR", for: Unix, spread: true }))

Multiplexers
    tmux version       : No such file or directory (os error 2)
    tmux build flags   : enable-sixel=Unknown
    ZELLIJ_SESSION_NAME: None
    Zellij version     : No such file or directory (os error 2)

Dependencies
    file          : 5.48
    ueberzugpp    : No such file or directory (os error 2)
    ffmpeg/ffprobe: 9.0.1 / 9.0.1
    pdftoppm      : 26.08.0
    magick        : 7.1.2-29
    fzf           : 0.74.3
    fd/fdfind     : 10.4.2 / No such file or directory (os error 2)
    rg            : 15.2.0
    chafa         : No such file or directory (os error 2)
    zoxide        : 0.10.0
    7zz/7z        : No such file or directory (os error 2) / 26.02
    resvg         : No such file or directory (os error 2)
    jq            : No such file or directory (os error 2)

Clipboard
    wl-copy/paste: 2.3.0 / 2.3.0
    xclip        : No such file or directory (os error 2)
    xsel         : No such file or directory (os error 2)

Routine
    \`file -bL --mime-type\`: text/plain
\`\`\`

### Please describe the problem you're trying to solve

Thank you for the recycle bin implementation in yazi that was missing until now; it makes it now the only necessary file manager on your computer.

However, one thing I find missing is the ability to sort the files in the order (or rather reverse order) of their deletion. If you have files that have accumulated for weeks or months, you are more likely to want to restore a newly deleted file rather than one that you haven’t touched in a while. This is a constant need when I used other file managers and all of them that I know on every OS can sort the most recent deleted files. Unfortunately none of the existing sort possibilities yet implemented in yazi (by file birth or modification timestamp) works the same in the recycle bin. Especially if you have several files with the same name, you are more likely to want to restore the last deleted one (or maybe the oldest); and the other timestamps might be misleading.

### Would you be willing to contribute this feature?

- [x] Yes, I'll give it a shot

### Describe the solution you'd like

In the recycle bin, add the option to show the deleted timestamp as a column and allow to sort by it, like in other file managers.

One can even make this sorting permanent with the Folder Rules “plugin” option.

Maybe it can be also added as a spotter information, but the main need is to have it as a sortable column.

### Additional context

As for sorting files… randomly, I don’t find any case where it’s useful, unless you are bored. Maybe it was an Easter egg implemented in the software?

### Checklist

- [x] I have searched the existing issues/discussions
- [x] The [latest nightly build](https://yazi-rs.github.io/docs/installation/#binaries) doesn't already have this feature`,comments:0,createdAt:`2026-08-25T18:30:12Z`,labels:[`feature`],number:4287,repo:`sxyazi/yazi`,title:`Sort deleted files by deletion timestamp`,url:`https://github.com/sxyazi/yazi/issues/4287`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:42382,repoSizeKb:9901,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:43,score:{value:7,band:`high`,classe:{n:1,why:[`labelled 'feature', not a defect`]},alcance:{n:3,why:[`default path: 'every'`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:2,why:[`small codebase (9 MB)`]},acceptance:{n:2,why:[`40 merges in 90d`,`median merge 0d`]},notes:[],estimated:!0}},{body:`### What system are you running Yazi on?

Linux Wayland

### What terminal are you running Yazi in?

Konsole

### \`ya env\` output

\`\`\`Shell
ya env
error: unrecognized subcommand 'env'
Usage: ya <COMMAND>
For more information, try '--help'.
\`\`\`

### Describe the bug

On an empty Yazi profile, I just added the configuration for Folder‐specific rules as is on the page https://yazi-rs.github.io/docs/tips
Like in any other folder, I expect subfolders are listed in front of files.

### Minimal reproducer

Surprisingly, unlike the other folders, in the Downloads folder, files and subfolders are mixed.
Manually choosing other sorting methods in this folder doesn’t help.
After some tinkering, I inverted the last false on the line:
opt.by, opt.reverse, opt.dir_first = "mtime", true, false
This did put folders in front, but the sorting methods still have problems: you can’t properly sort by let’s say extension or by size. Moreover, the bug extends on any folder, not only the ones listed explicitly in the plugin: the sorting (let’s say again) on extension or size is still broken in any folder.

### Anything else?

_No response_

### Checklist

- [x] I tried the [latest nightly build](https://yazi-rs.github.io/docs/installation#binaries), and the issue is still reproducible
- [x] I updated the environment information (\`ya env\`) field to the nightly that I tried
- [x] I can reproduce it after disabling all custom configs/plugins (\`mv ~/.config/yazi ~/.config/yazi-backup\`)`,comments:9,createdAt:`2026-07-09T20:23:47Z`,labels:[`bug`],number:4110,repo:`sxyazi/yazi`,title:`Folder-specific rules`,url:`https://github.com/sxyazi/yazi/issues/4110`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:10,repoStars:42382,repoSizeKb:9901,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:43,score:{value:7,band:`high`,classe:{n:2,why:[`label: bug`,`text: 'broken'`]},alcance:{n:3,why:[`10 participants, 0 reactions`]},verificabilidade:{n:2,why:[`repro steps, no version pinned`]},effort:{n:2,why:[`small codebase (9 MB)`]},acceptance:{n:2,why:[`40 merges in 90d`,`median merge 0d`]},notes:[],estimated:!0}},{body:`**lnav version**
v0.12.4 (debian 13)

**Describe the bug**
Text inputs like search or filter do not accept some non alphanumeric keyboard inputs.
Pressing Enter or Backspace produce a space or, in filter, it produces spaces and write error : error: UTF-8 error: code points greater than 0x10ffff are not defined

**To Reproduce**
Launch lnav and try to search or filter, validating with Enter do not confirm and produce one space.
Try to delete the space with Backspace and it produces one more space
Escape input is correctly accepted (closing filter or search)

**To be noted**
My current setup is Debian 13, Sway (wayland), Foot terminal, SSH, and TERM=xterm-256color
Same problem outside SSH
The problem do not occur with Konsole or Xterm within the exact same setup (even when they are executed within foot teminal)`,comments:2,createdAt:`2026-09-07T08:39:38Z`,labels:[`bug`],number:1748,repo:`tstack/lnav`,title:`Text inputs in search or filter do not accept all keyboard inputs like Backspace or Enter`,url:`https://github.com/tstack/lnav/issues/1748`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:3,repoStars:10698,repoSizeKb:66457,merges90d:3,medianMergeDays:0,outsiderPct:92,issueResponsePct:48,score:{value:7,band:`high`,classe:{n:2,why:[`label: bug`]},alcance:{n:2,why:[`3 participants, 0 reactions`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:2,why:[`3 merges in 90d`,`median merge 0d`,`92% of merges from occasional authors`]},notes:[],estimated:!0}},{body:`**lnav version**
lnav 0.14.1

**Describe the bug**
I wanted to view the test log of ctest with lnav so i opened LastTest.log using lnav, it opens then when i run \`ctest .\` again sometimes lnav shows 
ⓘ info: No log or text files are currently loaded                              │
 = help: Use the :open command to open a file or directory       

Video

https://github.com/user-attachments/assets/ff382978-77c8-448c-8369-c06464f795a6

**To Reproduce**
run a test using ctest
open generated LastTest.log file that gets created
run the test again
`,comments:2,createdAt:`2026-09-08T09:26:35Z`,labels:[`bug`],number:1749,repo:`tstack/lnav`,title:`lnav doesn't consistently reload LastTest.log file generated by ctest when a new test is run`,url:`https://github.com/tstack/lnav/issues/1749`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:3,repoStars:10698,repoSizeKb:66457,merges90d:3,medianMergeDays:0,outsiderPct:92,issueResponsePct:48,score:{value:7,band:`high`,classe:{n:2,why:[`label: bug`]},alcance:{n:2,why:[`3 participants, 0 reactions`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:2,why:[`3 merges in 90d`,`median merge 0d`,`92% of merges from occasional authors`]},notes:[],estimated:!0}},{body:`**lnav version**
v0.14.0

**Describe the bug**
Unable to instruct lnav to open a file scrolled to a particular line with either the \`file:linenumber\` method i've seen mentioned or with \`-c ":goto line number"\`

This may be specific to a log format and file size as I am able to go to a specific line for a plain text file with \`lnav file:linenumber\`. I can't share the specific file I'm having problems with right now so I will have to try crafting a specific test file for this later.

In the debug logs for the successful case I see:
\`\`\`
2026-08-14T16:40:40.697751-07:00 D t0 lnav.cc:1982 initial rescan found 1 files
2026-08-14T16:40:40.697755-07:00 D t0 lnav.exec-phase.cc:44 phase completed: scan
2026-08-14T16:40:40.697822-07:00 I t0 [37896::rebuild_indexes-1] textfile_sub_source.cc:1775 file open request to jump to line: 10
2026-08-14T16:40:40.697830-07:00 I t0 [37896::rebuild_indexes-1] textfile_sub_source.cc:1793 /private/tmp/foobar.txt
2026-08-14T16:40:40.697834-07:00 I t0 [37896::rebuild_indexes-1] textfile_sub_source.cc:1795   setting requested selection: 10
2026-08-14T16:40:40.697838-07:00 I t0 [37896::rebuild_indexes-1] textfile_sub_source.cc:1797   actual top is now: 0
2026-08-14T16:40:40.697842-07:00 I t0 [37896::rebuild_indexes-1] textfile_sub_source.cc:1799   actual selection is now: 10
\`\`\`

I don't see that on the failing case, i see this:
\`\`\`
2026-08-14T16:41:36.321511-07:00 D t0 lnav.cc:1982 initial rescan found 1 files
2026-08-14T16:41:36.321515-07:00 D t0 lnav.exec-phase.cc:44 phase completed: scan
2026-08-14T16:41:36.321848-07:00 D t0 [38035::rebuild_indexes-1] logfile_sub_source.cc:1070 no time left, skipping /private/tmp/test.txt
\`\`\`
`,comments:1,createdAt:`2026-08-14T23:48:37Z`,labels:[`bug`],number:1741,repo:`tstack/lnav`,title:`Unable to open a file at a specific line number`,url:`https://github.com/tstack/lnav/issues/1741`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:2,repoStars:10698,repoSizeKb:66457,merges90d:3,medianMergeDays:0,outsiderPct:92,issueResponsePct:48,score:{value:7,band:`high`,classe:{n:2,why:[`label: bug`]},alcance:{n:2,why:[`2 participants, 0 reactions`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:2,why:[`3 merges in 90d`,`median merge 0d`,`92% of merges from occasional authors`]},notes:[],estimated:!0}},{body:`From what I understand (I could not find anything documented), ellipses are supposed to be shown after a directory name when its entries under it are completely truncated.

However, when starting a search this symbol sometimes appears on directories with listing under them. This is usually easy enough to reproduce on a search with many results in many subdirectories. 

This is related to #1213 as a potential different use of this symbol that I think would make more sense.`,comments:0,createdAt:`2026-09-02T14:30:51Z`,labels:[`bug`],number:1214,repo:`Canop/broot`,title:`Inconsistent use of ellipses when truncating lists during a search`,url:`https://github.com/Canop/broot/issues/1214`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:12956,repoSizeKb:20598,merges90d:25,medianMergeDays:1,outsiderPct:45,issueResponsePct:38,score:{value:6,band:`medium`,classe:{n:2,why:[`label: bug`]},alcance:{n:2,why:[`single reporter, no platform qualifier`]},verificabilidade:{n:2,why:[`repro steps, no version pinned`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:3,why:[`25 merges in 90d`,`median merge 1d`,`45% of merges from occasional authors`]},notes:[],estimated:!0}},{body:`I had bottom frozen on 0.8.0 for reasons I didn't remember.
I unfroze it and discovered why I had it frozen

Bottom fails to display any network activity (all 0's) when launched from a different network namespace.

But it works when it's root.

The change occurred between 0.8 and 0.9  I believe.`,comments:5,createdAt:`2025-09-28T15:54:30Z`,labels:[],number:1826,repo:`ClementTsang/bottom`,title:`bottom requires root to display network activity from different netns`,url:`https://github.com/ClementTsang/bottom/issues/1826`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:6,repoStars:14052,repoSizeKb:90744,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:42,score:{value:6,band:`medium`,classe:{n:2,why:[`text: 'fails to'`]},alcance:{n:3,why:[`6 participants, 0 reactions`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:2,why:[`40 merges in 90d`,`median merge 0d`]},notes:[],estimated:!0}},{body:`### \`ya env\` output

\`\`\`Shell
Yazi
    Version: 26.9.1 (Terra 2025-12-27)
    Debug  : false
    Triple : x86_64-unknown-linux-gnu (linux-x86_64)
    Rustc  : 1.98.0 (88d9e12a 2026-08-18)
    Backtrace: None

Ya
    Version: 26.9.1 (Terra 2025-12-27)
    Debug  : false
    Triple : x86_64-unknown-linux-gnu (linux-x86_64)
    Rustc  : 1.98.0 (88d9e12a 2026-08-18)

Config
    Init             : /home/pisek/.config/yazi/init.lua (2563 chars)
    Yazi             : /home/pisek/.config/yazi/yazi.toml (406 chars)
    Keymap           : /home/pisek/.config/yazi/keymap.toml (2802 chars)
    Theme            : /home/pisek/.config/yazi/theme.toml (47 chars)
    VFS              : /home/pisek/.config/yazi/vfs.toml (No such file or directory (os error 2))
    Package          : /home/pisek/.config/yazi/package.toml (833 chars)
    Dark/light flavor: ArcSwapAny("noctalia") / ArcSwapAny("noctalia")

Emulator
    TERM                : Some("tmux-256color")
    TERM_PROGRAM        : Some("tmux")
    TERM_PROGRAM_VERSION: Some("3.7c")
    Brand.from_env      : None
    Emulator.probe      : Emulator { brand: Unknown, version: ArcSwapAny(""), csi_u: None, kgp: false, kgp_shm: false, sixel: false, background: Some([6168, 6168, 6168]), color_scheme: Some(false), csi_16t: (10, 21), force_16t: false, osc_5522: false, cursor_blink: false, cursor_shape: None, mux: Some(Mux { sixel: true }), probe: Probe { id: Id(1), completed: false }, started: false }

Adapter
    Drivers.matches: Wayland
    TERM.dimension : Dimension { cols: 93, rows: 45, width: 930, height: 945 }

Desktop
    XDG_SESSION_TYPE           : Some("wayland")
    WAYLAND_DISPLAY            : Some("wayland-1")
    DISPLAY                    : Some(":0")
    NIRI_SOCKET                : Some("/run/user/1000/niri.wayland-1.1265.sock")
    SWAYSOCK                   : None
    HYPRLAND_INSTANCE_SIGNATURE: None
    WAYFIRE_SOCKET             : None

SSH
    shared.in_ssh_connection: false

WSL
    WSL: false

Variables
    SHELL              : Some("/usr/bin/zsh")
    EDITOR             : Some("/usr/bin/hx")
    VISUAL             : Some("/usr/bin/hx")
    YAZI_FILE_ONE      : None
    YAZI_CONFIG_HOME   : None
    YAZI_ZOXIDE_OPTS   : None
    SSH_AUTH_SOCK      : None
    FZF_DEFAULT_OPTS   : None
    FZF_DEFAULT_COMMAND: None

Text Opener
    default     : Some(OpenerRuleArc(OpenerRule { id: Id(3), run: "\${EDITOR:-vi} %s", block: true, orphan: false, desc: "$EDITOR", for: Unix, spread: true }))
    block-create: Some(OpenerRuleArc(OpenerRule { id: Id(3), run: "\${EDITOR:-vi} %s", block: true, orphan: false, desc: "$EDITOR", for: Unix, spread: true }))
    block-rename: Some(OpenerRuleArc(OpenerRule { id: Id(3), run: "\${EDITOR:-vi} %s", block: true, orphan: false, desc: "$EDITOR", for: Unix, spread: true }))

Multiplexers
    tmux version       : tmux 3.7c
    tmux build flags   : enable-sixel=Supported
    ZELLIJ_SESSION_NAME: None
    Zellij version     : No such file or directory (os error 2)

Dependencies
    file          : 5.46
    ueberzugpp    : No such file or directory (os error 2)
    ffmpeg/ffprobe: 8.1.2 / 8.1.2
    pdftoppm      : 26.01.0
    magick        : 7.1.2-27
    fzf           : 0.74.3
    fd/fdfind     : 10.4.2 / No such file or directory (os error 2)
    rg            : 15.2.0
    chafa         : 1.18.2
    zoxide        : 0.9.8
    7zz/7z        : 26.02 / 26.02
    resvg         : 0.47.0
    jq            : 1.8.1

Clipboard
    wl-copy/paste: 2.2.1 / 2.2.1
    xclip        : No such file or directory (os error 2)
    xsel         : 1.2.1

Routine
    \`file -bL --mime-type\`: text/plain
\`\`\`

### Please describe the problem you're trying to solve

For a few times already, my configuration of Yazi broke, because the adapter for image preview got better.

According to the documentation, I have to install Überzug++ as I am using Alacritty on Niri, however, before I was using Chafa just fine, so when I updated the system, image preview suddenly broke.

### Would you be willing to contribute this feature?

- [ ] Yes, I'll give it a shot

### Describe the solution you'd like

The proposal is that, the environment scanner should also detect, if the package is installed, and if not, fallback even more.

### Additional context

_No response_

### Checklist

- [x] I have searched the existing issues/discussions
- [x] The [latest nightly build](https://yazi-rs.github.io/docs/installation/#binaries) doesn't already have this feature`,comments:0,createdAt:`2026-09-12T21:02:30Z`,labels:[`feature`],number:4350,repo:`sxyazi/yazi`,title:`Fallback more when dependency not found`,url:`https://github.com/sxyazi/yazi/issues/4350`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:42382,repoSizeKb:9901,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:43,score:{value:6,band:`medium`,classe:{n:1,why:[`labelled 'feature', not a defect`]},alcance:{n:2,why:[`single reporter, no platform qualifier`]},verificabilidade:{n:3,why:[`repro steps and a version`]},effort:{n:2,why:[`small codebase (9 MB)`]},acceptance:{n:2,why:[`40 merges in 90d`,`median merge 0d`]},notes:[],estimated:!0}},{body:`### \`ya env\` output

\`\`\`Shell
not available
\`\`\`

### Please describe the problem you're trying to solve

As of https://yazi-rs.github.io/docs/plugins/utils there is no current find function available to use for plugins beside using emit.

Also this \`emit find\` does always show up an empty input dialog overwriting the last entered find.

It is not supported as of now to enter letters directly to add these to the current find input.

### Would you be willing to contribute this feature?

- [ ] Yes, I'll give it a shot

### Describe the solution you'd like

By adding a function callable within a plugin there will be ways to:
- get the current find input
- passing a string to find without having an interactive input

Alternatively additional args could be given to \`emit find\`
\`--query\` : echoes the current text used in find
\`--text=\` : directly uses this text to find without showing input dialog
\`--add_character=\` : adds the given character
\`--rem_character\` : removes the last entered character
\`--delay=\` : proper way to reduce performance impact by not triggering the find right away but with a given delay in seconds or milliseconds. This should have a default value when using add_character or rem_character or use a new configurable value as fallback.

By adding such functionality it will be achievable to directly use find by typing without having an input dialog.

Also might be a good suggestion to add this for search and filter accordingly.

### Additional context

_No response_

### Checklist

- [x] I have searched the existing issues/discussions
- [x] The [latest nightly build](https://yazi-rs.github.io/docs/installation/#binaries) doesn't already have this feature`,comments:5,createdAt:`2026-07-12T09:44:33Z`,labels:[`feature`],number:4116,repo:`sxyazi/yazi`,title:`Feature Request: find function available for plugins or more args for emit find`,url:`https://github.com/sxyazi/yazi/issues/4116`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:6,repoStars:42382,repoSizeKb:9901,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:43,score:{value:6,band:`medium`,classe:{n:1,why:[`labelled 'feature', not a defect`]},alcance:{n:3,why:[`6 participants, 0 reactions`]},verificabilidade:{n:2,why:[`repro steps, no version pinned`]},effort:{n:2,why:[`small codebase (9 MB)`]},acceptance:{n:2,why:[`40 merges in 90d`,`median merge 0d`]},notes:[],estimated:!0}},{body:`lnav 0.14.0
Konsole on openSUSE Slowroll
TERM=xterm-256color, COLORTERM=truecolor
tput colors returns 256
infocmp xterm-256color succeeds
notcurses-info 3.0.17 works perfectly with RGB/256 colors and 0 input errors
lnav produces random characters and duplicated keyboard input
TERM=xterm avoids corruption but reduces colors to 8 and removes highlighting
official static lnav.org (0.14) binary reproduces the same issue
distro-packaged lnav reproduces it too

run  lnav (from TW slowroll repo -- lnav-0.14 pkg) on TW slowroll (TWS) with notcurses-info 3.0.17 
OR
lnav.org statically linked lnav on TWS
load any log and random characters appear on the screen, highlights don't display.  It's unusable.`,comments:0,createdAt:`2026-08-31T22:00:30Z`,labels:[`bug`],number:1745,repo:`tstack/lnav`,title:`lnav 0.14.0: display corruption and duplicated input on Konsole with xterm-256color`,url:`https://github.com/tstack/lnav/issues/1745`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:10698,repoSizeKb:66457,merges90d:3,medianMergeDays:0,outsiderPct:92,issueResponsePct:48,score:{value:6,band:`medium`,classe:{n:3,why:[`text: 'corruption'`]},alcance:{n:2,why:[`single reporter, no platform qualifier`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:2,why:[`3 merges in 90d`,`median merge 0d`,`92% of merges from occasional authors`]},notes:[],estimated:!0}},{body:`Broot stops searching when it has found enough results to fill the screen. This is reasonable behaviour and plays to the tool's strength. However, broot can in some cases search all paths and it typically informs the user when it has truncated a listing.

As the tool currently presents listings, it is ambiguous whether or not the results shown to user are complete or if broot has just stopped searching. broot should present when paths are completely or incompletely searched to prevent this ambiguity.

I though of 3 different ways to present this information:
- A string after the directory name
- A list item in the listing, though this has the downside that it clutters up the view quite a bit
- Re-using ellipses for this purpose instead of the currently (probably buggy) behaviour, see #1214 

\`\`\`
/home/user/project
 ├──src
 │  ├──main 10 items not searched
 │  │  ├──search.rs
 │  │  └──2 unlisted
 │  ├──util
 │  │  └──searchlib.rs
 │  │  └──10 items not searched
 ├──doc …
 │  ├──search …
 │  │  └──searching-and-finding.md
 Hit enter to focus, esc to clear the filter, ? for help, or a space then a verb
search                                                                  h:n  gi:y
\`\`\`
`,comments:0,createdAt:`2026-09-02T14:30:23Z`,labels:[`enhancement`],number:1213,repo:`Canop/broot`,title:`Show when an incomplete search has take place`,url:`https://github.com/Canop/broot/issues/1213`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:12956,repoSizeKb:20598,merges90d:25,medianMergeDays:1,outsiderPct:45,issueResponsePct:38,score:{value:5,band:`medium`,classe:{n:1,why:[`labelled 'enhancement', not a defect`]},alcance:{n:2,why:[`single reporter, no platform qualifier`]},verificabilidade:{n:2,why:[`repro steps, no version pinned`]},effort:{n:3,why:[`sounds localised: 'instead of'`]},acceptance:{n:3,why:[`25 merges in 90d`,`median merge 1d`,`45% of merges from occasional authors`]},notes:[],estimated:!0}},{body:`

Currently I use this transformer for video files, which works well:

    {
        input_extensions: [ "mkv", "mp4", "webm", "avi", "mov", "flv", "wmv", "m4v", "ts", "mpg", "mpeg", "3gp" ]
        output_extension: png
        mode: image
        command: [ "ffmpeg", "-ss", "00:00:05", "-i", "{input-path}", "-vframes", "1", "-y", "{output-path}" ]
    }

However, it of course only produces a static thumbnail. What I would really like is live playback in the preview panel using mpv's kitty output driver:

    mpv --profile=sw-fast --vo=kitty --vo-kitty-use-shm=yes --really-quiet --pause video.mkv

This is not possible with the current transformer model as it is file-in file-out, and \`--vo=kitty\` renders escape sequences directly to the terminal rather than writing to a file. I am not sure how large a change this would be, but I believe it would require something like a passthrough mode where broot positions the cursor at the top left of the preview panel, spawns the process, and terminates it on deselection. Something similar has been discussed in #943 where another user wanted to pass the preview region to neovim entirely, which I would personally find very useful as well.

Is there any chance you would consider supporting something like this?`,comments:4,createdAt:`2026-04-11T23:34:14Z`,labels:[`enhancement`],number:1153,repo:`Canop/broot`,title:`Feature request: live video preview via mpv --vo=kitty`,url:`https://github.com/Canop/broot/issues/1153`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:5,repoStars:12956,repoSizeKb:20598,merges90d:25,medianMergeDays:1,outsiderPct:45,issueResponsePct:38,score:{value:5,band:`medium`,classe:{n:1,why:[`labelled 'enhancement', not a defect`]},alcance:{n:3,why:[`5 participants, 0 reactions`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:3,why:[`25 merges in 90d`,`median merge 1d`,`45% of merges from occasional authors`]},notes:[],estimated:!0}},{body:`### Is your feature request related to a problem? Please describe.

\`gui.sidePanelWidth\` is a fraction of the screen width. On an ultrawide monitor even 0.2 makes the side panels much wider than their content needs, and that space is more useful in the main view.

### Describe the solution you'd like

A new integer setting \`gui.sidePanelMaxWidth\` that limits the side section to a number of characters. \`sidePanelWidth\` keeps working as today, but the resulting width never exceeds \`sidePanelMaxWidth\`. Default 0 means no limit.

\`\`\`yaml
gui:
  sidePanelWidth: 0.3333
  sidePanelMaxWidth: 60
\`\`\`

### Describe alternatives you've considered

Reducing sidePanelWidth to something like 0.1. That fits an ultrawide screen when the terminal is maximized, but as soon as the terminal window is not full screen the side panels become too narrow to read.

### Additional context

--`,comments:0,createdAt:`2026-09-18T14:07:04Z`,labels:[`enhancement`],number:6021,repo:`jesseduffield/lazygit`,title:`Allow capping the side panel width in absolute characters`,url:`https://github.com/jesseduffield/lazygit/issues/6021`,reactions:2,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:82627,repoSizeKb:157821,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:62,score:{value:5,band:`medium`,classe:{n:1,why:[`labelled 'enhancement', not a defect`]},alcance:{n:2,why:[`1 participants, 2 reactions`]},verificabilidade:{n:2,why:[`repro steps, no version pinned`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:3,why:[`40 merges in 90d`,`median merge 0d`,`62% of recent issues got a maintainer reply`]},notes:[],estimated:!0}},{body:`In certain situations when a widget has an internal column with numbers containing a variable amounts of digits, when the widget is configured to be narrow enough the usage values get truncated in an unhelpful manner. 

For example in the CPU Use widget, if an use percentage hits 100% and the widget is too narrow, the value gets truncated as \`10…\` instead of moving one column left (even though there would be space for it) or dropping the percent sign. 
<img width="103" height="146" alt="Image" src="https://github.com/user-attachments/assets/c3b22ecc-245b-475c-b821-7284b106bb45" />

This is such a minor thing that i feel a bit bad even writing a report about it, but i don't have time to look at fixing this myself right now.`,comments:1,createdAt:`2026-09-19T11:44:15Z`,labels:[],number:2254,repo:`ClementTsang/bottom`,title:`Occasional unhelpful truncation with ellipsis in narrow widgets`,url:`https://github.com/ClementTsang/bottom/issues/2254`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:2,repoStars:14052,repoSizeKb:90744,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:42,score:{value:5,band:`medium`,classe:{n:2,why:[`no strong signal, assumed ordinary bug`]},alcance:{n:2,why:[`2 participants, 0 reactions`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:3,why:[`sounds localised: 'instead of'`]},acceptance:{n:2,why:[`40 merges in 90d`,`median merge 0d`]},notes:[],estimated:!0}},{body:`### Checklist

- [x] I've looked through [the documentation](https://bottom.pages.dev/nightly/) and  [existing open issues](https://github.com/ClementTsang/bottom/issues?q=is%3Aopen+is%3Aissue+label%3Afeature) for similar feature requests.


### Describe the feature request

Right now basic mode always prints 4 CPU per row even when there is plenty of horizontal space. This is problematic on servers with higher CPU count. For example I was working on a machine with 100+ cores, and \`bottom\` can only show the first 96 cores, and then just truncates the rest.

It's probably easier to understand by looking at screenshot:

<img width="2215" height="908" alt="Image" src="https://github.com/user-attachments/assets/f92bde11-f47c-4e54-b41d-b6dde371b118" />

Not only is the horizontal space not utilized well, but a lot of vertical space is also eaten, and I end up only seeing 4 rows of the "process" table. Making it very unusable.

For comparison, \`htop\` prints CPUs in much denser (but arguably unreadable) format. But it takes up much less rows, while not truncating any CPU entries, and still leave plenty of space below for the "processes table"
<img width="2215" height="326" alt="Image" src="https://github.com/user-attachments/assets/25c3f11a-cfe7-4cb6-acaa-d0a4e68c0b12" />`,comments:3,createdAt:`2026-05-27T15:23:35Z`,labels:[`feature`],number:2078,repo:`ClementTsang/bottom`,title:`Support "dense" CPU widget in basic mode`,url:`https://github.com/ClementTsang/bottom/issues/2078`,reactions:1,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:4,repoStars:14052,repoSizeKb:90744,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:42,score:{value:5,band:`medium`,classe:{n:1,why:[`labelled 'feature', not a defect`]},alcance:{n:3,why:[`4 participants, 1 reactions`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:2,why:[`40 merges in 90d`,`median merge 0d`]},notes:[],estimated:!0}},{body:`Can I suggest a nifty feature inspired by ranger's \`:flat\`

A toggle that makes only files visible, no directories. These files are from multiple levels down the hierarchy.

Useful when there are few files spread in many sub-directories.

It could potentially also take an argument like \`:flat 3\` to view 3 levels down, instead of all. With no argument should view all.`,comments:0,createdAt:`2025-12-22T20:21:35Z`,labels:[`enhancement`],number:1112,repo:`Canop/broot`,title:`Flat view`,url:`https://github.com/Canop/broot/issues/1112`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:12956,repoSizeKb:20598,merges90d:25,medianMergeDays:1,outsiderPct:45,issueResponsePct:38,score:{value:4,band:`low`,classe:{n:1,why:[`labelled 'enhancement', not a defect`]},alcance:{n:2,why:[`single reporter, no platform qualifier`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:3,why:[`sounds localised: 'instead of'`]},acceptance:{n:3,why:[`25 merges in 90d`,`median merge 1d`,`45% of merges from occasional authors`]},notes:[],estimated:!0}},{body:"While showing a scrollable list is sometimes desired, I think broot's default behaviour of truncating lists is one of its major strengths. There should be a way to keep lists truncated (aka, showing `N unlisted`) after initiating a total search.",comments:0,createdAt:`2026-09-02T14:29:04Z`,labels:[`enhancement`],number:1212,repo:`Canop/broot`,title:`Add a way to keep lists truncated when doing a total-search`,url:`https://github.com/Canop/broot/issues/1212`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:12956,repoSizeKb:20598,merges90d:25,medianMergeDays:1,outsiderPct:45,issueResponsePct:38,score:{value:4,band:`low`,classe:{n:1,why:[`labelled 'enhancement', not a defect`]},alcance:{n:2,why:[`single reporter, no platform qualifier`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:3,why:[`sounds localised: 'should be'`]},acceptance:{n:3,why:[`25 merges in 90d`,`median merge 1d`,`45% of merges from occasional authors`]},notes:[],estimated:!0}},{body:`### Is your feature request related to a problem? Please describe.

LazyGit allows copying and pasting commits between branches. However, when I try to copy and paste commits between worktrees, then I am unable to. 

### Describe the solution you'd like

I would like to copy and paste commits from one worktree to another worktree. 

### Describe alternatives you've considered

The only way to currently do it is to delete the worktree so that I can load the two branches within the same worktree. I currently can't load two branches within the same worktree because if an existing worktree already exists for that branch, then I can't load that branch in the current worktree. 

### Additional context

N/A

<!--
You may be able to add your desired feature with a custom command. Check out the examples here: https://github.com/jesseduffield/lazygit/wiki/Custom-Commands-Compendium

If a custom command does what you want but you still want to see the feature built-in to lazygit, feel free to paste the custom command into the issue to help us better understand the functionality you want.
-->

`,comments:1,createdAt:`2026-09-16T05:10:47Z`,labels:[`enhancement`],number:6017,repo:`jesseduffield/lazygit`,title:`Allow copy and paste of commits between worktrees.`,url:`https://github.com/jesseduffield/lazygit/issues/6017`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:2,repoStars:82627,repoSizeKb:157821,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:62,score:{value:4,band:`low`,classe:{n:1,why:[`labelled 'enhancement', not a defect`]},alcance:{n:2,why:[`2 participants, 0 reactions`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:3,why:[`40 merges in 90d`,`median merge 0d`,`62% of recent issues got a maintainer reply`]},notes:[],estimated:!0}},{body:`### An inconvinience

I have cloned [boost repo](https://github.com/boostorg/boost). 

I made a change for a lib. 

I wanted to get a patch.

But there's a nuance: all libs in boost's repo are wrapped into submodules.

So, lazygit does not even allow to do patch for it, saying something like:

- Ctrl+P :  "no patch created yet, stage plz"
- Space at submodule i.e. at staging outside of submodule: "repos can only stage submoduless' commits"

### current workaround

\`git diff --submodule=diff\`

### Additional context

\`lazygit --version\`
\`commit=, build date=, build source=unknown, version=0.65.0, os=linux, arch=amd64, git version=2.55.0\``,comments:2,createdAt:`2026-09-11T21:40:54Z`,labels:[`enhancement`],number:6012,repo:`jesseduffield/lazygit`,title:`Add a button, somewhere in C-p probably, to create a patch from outside of a submodule`,url:`https://github.com/jesseduffield/lazygit/issues/6012`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:3,repoStars:82627,repoSizeKb:157821,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:62,score:{value:4,band:`low`,classe:{n:1,why:[`labelled 'enhancement', not a defect`]},alcance:{n:2,why:[`3 participants, 0 reactions`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:3,why:[`40 merges in 90d`,`median merge 0d`,`62% of recent issues got a maintainer reply`]},notes:[],estimated:!0}},{body:`### Checklist

- [x] I've looked through [the documentation](https://bottom.pages.dev/nightly/) and  [existing open issues](https://github.com/ClementTsang/bottom/issues?q=is%3Aopen+is%3Aissue+label%3Afeature) for similar feature requests.


### Describe the feature request

when showing RAM usage, would be nice to see ZRAM usage as well (compressed RAM)`,comments:1,createdAt:`2026-03-18T19:11:58Z`,labels:[`feature`],number:2002,repo:`ClementTsang/bottom`,title:`Show zram usage`,url:`https://github.com/ClementTsang/bottom/issues/2002`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:2,repoStars:14052,repoSizeKb:90744,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:42,score:{value:4,band:`low`,classe:{n:1,why:[`labelled 'feature', not a defect`]},alcance:{n:2,why:[`2 participants, 0 reactions`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:2,why:[`no difficulty signal`]},acceptance:{n:2,why:[`40 merges in 90d`,`median merge 0d`]},notes:[],estimated:!0}},{body:`### Is your feature request related to a problem? Please describe

I usually keep the commits panel in normal/compact screen mode. It shows the
commit hash, author, graph, and subject, but not when each commit was created.

The timestamp becomes visible after enlarging the panel with \`+\`, but this
changes the layout and shows an absolute date or time. I would like to see the
relative age while keeping the compact one-line layout, especially when
scanning recent commits.

### Describe the solution you'd like

Add an optional relative-age column to commit rows in the compact view:

    82c03593  4m  IL  ○─ Merge pull request...
    059c9ca0  2h  IL  ○  Leave the pause...
    ece5ac1a  3d  IL  ○  Merge pull request...

Using the same short representation as the branches panel (\`4m\`, \`2h\`, \`3d\`)
would keep the column narrow and make the two panels consistent.

This could be exposed as either:

- a toggle in the commits Log menu, with the choice persisted; or
- an opt-in configuration setting such as \`showCommitAgeInCompactView\`.

The existing compact layout should remain the default.

### Current implementation

The required data and formatter already appear to exist:

- Commits contain \`UnixTimestamp\`.
- \`utils.UnixToTimeAgo(timestamp)\` in \`pkg/utils/date.go\` converts a Unix
  timestamp into the compact \`s\`, \`m\`, \`h\`, \`d\`, \`w\`, \`M\`, or \`y\` format.
- \`pkg/commands/git_commands/branch_loader.go\` uses \`UnixToTimeAgo\` when
  populating \`Branch.Recency\`, which is rendered as the first column in the
  branches panel.
- Stash entries use the same formatter.
- In \`pkg/gui/presentation/commits.go\`, \`displayCommit\` already has access to
  \`commit.UnixTimestamp\`. However, its date column is populated only when
  \`fullDescription\` is true:

      descriptionString := ""
      if fullDescription {
          descriptionString = style.FgBlue.Sprint(
              utils.UnixToDateSmart(
                  now,
                  commit.UnixTimestamp,
                  timeFormat,
                  shortTimeFormat,
              ),
          )
      }

- \`fullDescription\` is passed by the commits context when the screen mode is
  not \`SCREEN_NORMAL\`, which explains why the timestamp appears after pressing
  \`+\` but not in the normal compact view.

A possible implementation would therefore reuse \`UnixToTimeAgo\` for the
description column when compact relative ages are enabled, without requiring
another Git command or additional commit data.

Relevant files:

- \`pkg/utils/date.go\`
- \`pkg/commands/git_commands/branch_loader.go\`
- \`pkg/gui/presentation/branches.go\`
- \`pkg/gui/presentation/commits.go\`
- \`pkg/gui/context/local_commits_context.go\`

### Describe alternatives you've considered

- Enlarging the commits panel with \`+\`. This shows a timestamp, but changes the
  layout and uses \`timeFormat\` / \`shortTimeFormat\` rather than relative age.
- Customizing \`branchLogCmd\`. It can display \`%cr\`, but only changes the branch
  log in the main panel and does not affect the interactive commits list.
- Opening a separate \`git log\` or \`tig\` view. This loses the integrated lazygit
  commit workflow.

### Additional context

PR #5846 proposes \`normal\`, \`comfortable\`, and \`spacious\` commit display
formats, with author and date on a second line in the latter two modes:

https://github.com/jesseduffield/lazygit/pull/5846

That proposal is related, but this request is specifically about showing a
small relative-age column in the existing one-line compact layout.`,comments:0,createdAt:`2026-09-10T10:37:40Z`,labels:[`enhancement`],number:6010,repo:`jesseduffield/lazygit`,title:`Show relative commit age in the compact commits view`,url:`https://github.com/jesseduffield/lazygit/issues/6010`,reactions:0,policy:{level:1,rule:null,source:null,verified:!1,label:`grey`},participants:1,repoStars:82627,repoSizeKb:157821,merges90d:40,medianMergeDays:0,outsiderPct:0,issueResponsePct:62,score:{value:3,band:`low`,classe:{n:1,why:[`labelled 'enhancement', not a defect`]},alcance:{n:1,why:[`narrow platform/config: 'only when'`]},verificabilidade:{n:1,why:[`no reproduction in the report`]},effort:{n:3,why:[`sounds localised: 'one-line'`]},acceptance:{n:3,why:[`40 merges in 90d`,`median merge 0d`,`62% of recent issues got a maintainer reply`]},notes:[],estimated:!0}}]},u=e(),d=l.issues,f=l.generated,p={1:`comment`,2:`string`,3:`keyword`,4:`number`};function m({n:e,label:t,color:r}){let{theme:i}=n();return(0,u.jsxs)(`span`,{className:`inline-flex items-center gap-1.5`,title:t,children:[(0,u.jsx)(`span`,{className:`text-[11px] font-mono`,style:{color:i.comment},children:t}),(0,u.jsx)(`span`,{className:`inline-flex gap-0.5`,children:[1,2,3].map(t=>(0,u.jsx)(`span`,{className:`w-1.5 h-3 rounded-sm`,style:{backgroundColor:t<=e?r:i.bg1}},t))})]})}function h({issue:e}){let{theme:t}=n(),[r,i]=(0,s.useState)(!1),a=e.score,o=t[p[e.policy.level]];return(0,u.jsxs)(`li`,{className:`rounded-lg p-5`,style:{backgroundColor:t.bg,border:`1px solid ${t.bg1}`},children:[(0,u.jsxs)(`div`,{className:`flex items-baseline justify-between gap-4 flex-wrap`,children:[(0,u.jsxs)(`a`,{href:e.url,target:`_blank`,rel:`noopener noreferrer`,className:`font-mono text-sm transition-opacity hover:opacity-70`,style:{color:t.function},children:[e.repo,`#`,e.number]}),(0,u.jsxs)(`span`,{className:`text-xs font-mono`,style:{color:t.comment},children:[e.repoStars.toLocaleString(),` stars`]})]}),(0,u.jsx)(`h3`,{className:`text-base mt-1 mb-4 font-sans`,style:{color:t.fg},children:e.title}),(0,u.jsxs)(`div`,{className:`flex flex-wrap items-center gap-x-5 gap-y-2 mb-3`,children:[(0,u.jsxs)(`span`,{className:`text-xs font-mono px-2 py-0.5 rounded`,style:{color:a.band===`high`?t.bg:t.fg,backgroundColor:a.band===`high`?t.accent:t.bg1},children:[`value `,a.value]}),(0,u.jsx)(m,{n:a.classe.n,label:`class`,color:t.accent}),(0,u.jsx)(m,{n:a.alcance.n,label:`reach`,color:t.accent}),(0,u.jsx)(m,{n:a.verificabilidade.n,label:`repro`,color:t.accent}),(0,u.jsx)(m,{n:a.effort.n,label:`effort`,color:t.function}),(0,u.jsx)(m,{n:a.acceptance.n,label:`accept`,color:t.function})]}),(0,u.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3 text-xs`,children:[(0,u.jsxs)(`span`,{className:`font-mono`,style:{color:o},children:[`AI policy: `,e.policy.label,e.policy.verified?``:` (unread)`]}),(0,u.jsx)(`button`,{onClick:()=>i(!r),className:`font-mono underline underline-offset-2 transition-opacity hover:opacity-70`,style:{color:t.comment},children:r?`hide`:`why`})]}),a.notes.map(e=>(0,u.jsxs)(`p`,{className:`text-xs mt-3 font-mono`,style:{color:t.number},children:[`! `,e]},e)),r&&(0,u.jsxs)(`dl`,{className:`mt-4 pt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs`,style:{borderTop:`1px solid ${t.bg1}`},children:[[[`class`,a.classe],[`reach`,a.alcance],[`repro`,a.verificabilidade],[`effort`,a.effort],[`acceptance`,a.acceptance]].map(([e,n])=>(0,u.jsxs)(`div`,{children:[(0,u.jsxs)(`dt`,{className:`font-mono`,style:{color:t.comment},children:[e,` `,n.n]}),(0,u.jsx)(`dd`,{style:{color:t.operator},children:n.why.join(` · `)||`—`})]},e)),e.policy.rule&&(0,u.jsxs)(`div`,{className:`sm:col-span-2`,children:[(0,u.jsxs)(`dt`,{className:`font-mono`,style:{color:t.comment},children:[`policy (`,e.policy.source,`)`]}),(0,u.jsx)(`dd`,{style:{color:t.operator},children:e.policy.rule})]})]})]})}function g(){let{theme:e}=n(),[t,r]=(0,s.useState)(``),[i,a]=(0,s.useState)(4),o=(0,s.useMemo)(()=>{let e=t.trim().toLowerCase();return d.filter(t=>t.policy.level>i?!1:e?t.repo.toLowerCase().includes(e)||t.title.toLowerCase().includes(e)||t.labels.some(t=>t.toLowerCase().includes(e)):!0)},[t,i]);return(0,u.jsxs)(`div`,{className:`w-full max-w-4xl mx-auto px-4 py-20`,children:[(0,u.jsx)(`p`,{className:`text-xs font-mono tracking-widest uppercase mb-4`,style:{color:e.accent},children:`Find something to fix`}),(0,u.jsx)(`h1`,{className:`text-3xl sm:text-4xl font-bold mb-4`,style:{color:e.fg},children:`Issues worth your weekend`}),(0,u.jsxs)(`p`,{className:`max-w-2xl text-base leading-relaxed mb-3`,style:{color:e.operator},children:[`Every aggregator shows you the `,(0,u.jsx)(`code`,{className:`font-mono text-sm`,children:`good first issue`}),` `,`label. The label lies: someone already has a branch, or the maintainer has not merged anything since 2024, or the project forbids the way you work. Everything below survived those three checks, then got scored on what the fix is worth.`]}),(0,u.jsxs)(`p`,{className:`max-w-2xl text-sm leading-relaxed mb-10`,style:{color:e.comment},children:[`The scores are estimates from labels and text — press `,(0,u.jsx)(`em`,{children:`why`}),` on any card to see the evidence behind each one. Projects that prohibit AI-assisted contribution are labelled, never hidden: contributing by hand is fine, and then the rule is just something to cite.`]}),(0,u.jsxs)(`div`,{className:`flex flex-wrap gap-3 items-center mb-8`,children:[(0,u.jsx)(`input`,{value:t,onChange:e=>r(e.target.value),placeholder:`filter by repo, title or label`,className:`flex-1 min-w-[220px] px-3 py-2 rounded-lg text-sm font-mono outline-none`,style:{backgroundColor:e.bg,border:`1px solid ${e.bg1}`,color:e.fg}}),(0,u.jsx)(`div`,{className:`flex gap-1`,children:[{level:1,label:`grey only`},{level:3,label:`no prohibits`},{level:4,label:`everything`}].map(t=>(0,u.jsx)(`button`,{onClick:()=>a(t.level),className:`px-3 py-2 rounded-lg text-xs font-mono transition-colors`,style:{backgroundColor:i===t.level?e.accent:`transparent`,color:i===t.level?e.bg:e.comment,border:`1px solid ${i===t.level?e.accent:e.bg1}`},children:t.label},t.level))})]}),(0,u.jsx)(`ul`,{className:`flex flex-col gap-4`,children:o.map(e=>(0,u.jsx)(h,{issue:e},`${e.repo}#${e.number}`))}),o.length===0&&(0,u.jsx)(`p`,{className:`text-sm`,style:{color:e.comment},children:`Nothing matches that filter.`}),(0,u.jsxs)(`p`,{className:`text-xs font-mono mt-10`,style:{color:e.comment},children:[o.length,` of `,d.length,` · last run `,f.slice(0,10),` ·`,` `,(0,u.jsx)(`a`,{href:`https://github.com/harbefas`,className:`underline underline-offset-2`,children:`built with oss-triage`})]})]})}(0,c.createRoot)(document.getElementById(`root`)).render((0,u.jsx)(s.StrictMode,{children:(0,u.jsxs)(a,{children:[(0,u.jsx)(i,{current:`Find`}),(0,u.jsx)(g,{}),(0,u.jsx)(o,{})]})}));