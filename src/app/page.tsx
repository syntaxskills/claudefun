import { CopyButton } from "./CopyButton";
import styles from "./page.module.css";

const statusBarConfig = `{
  "statusLine": {
    "type": "command",
    "command": "printf ' %s  %s  %s ' \\"$(basename \\\\\\"$PWD\\\\\\")\\" \\"$(git branch --show-current 2>/dev/null || echo no-git)\\" \\"$(date +%H:%M)\\""
  }
}`;

const spinnerVerbs = `{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": [
      "summoning context",
      "polishing tokens",
      "bribing the typechecker",
      "untangling imports",
      "pretending this is deterministic",
      "negotiating with lint",
      "checking vibes against reality",
      "folding stack traces",
      "seasoning the prompt",
      "making the diff less cursed"
    ]
  }
}`;

const corporateSpinnerVerbs = `{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": [
      "正在降本增效，重构业务闭环",
      "同步推进颗粒度拆解与链路打通",
      "持续优化用户心智占位",
      "对核心路径进行端到端赋能",
      "重新梳理底层逻辑和场景抓手",
      "围绕 ROI 做精细化运营迭代",
      "快速对齐战略方向，形成方法论沉淀",
      "正在做流量侧与供给侧双向协同",
      "聚焦核心 KPI，拉齐团队水位",
      "尝试通过中台能力完成生态反哺",
      "基于长期主义做全链路价值转化",
      "持续推进体验升级与认知渗透",
      "对业务进行结构化拆解和策略收口",
      "当前处于小步快跑的灰度验证阶段",
      "围绕关键路径打造增长飞轮"
    ]
  }
}`;

const packs = [
  {
    name: "Good Statusbar",
    tag: "statusLine",
    summary:
      "A compact Claude Code status line that shows repo context without turning the terminal into a dashboard.",
    detail: "Project, git branch, and local time. Small enough to stay out of the way.",
    code: statusBarConfig,
  },
  {
    name: "Funny Spinner Verbs",
    tag: "microcopy",
    summary:
      "A small set of loading verbs for Claude-flavored tools that should feel playful without becoming childish.",
    detail: "Use as a source list for custom UI states, status messages, or local wrappers.",
    code: spinnerVerbs,
  },
  {
    name: "Corporate Nonsense Spinner",
    tag: "zh-cn / microcopy",
    summary:
      "中文互联网黑话版 spinner verbs. Perfect for pretending the loading state is aligned with strategy.",
    detail: "Replace boring loading copy with high-density business abstraction.",
    code: corporateSpinnerVerbs,
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="ClaudeFun navigation">
        <a className={styles.brand} href="https://syntaxskills.com">
          Syntax Skills
        </a>
        <div className={styles.navMeta}>
          <span>ClaudeFun</span>
          <span>config registry</span>
        </div>
      </nav>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>claudefun.syntaxskills.com</p>
          <h1>Fancy Claude configs, minus the boring defaults.</h1>
          <p className={styles.lede}>
            A small collection of useful, stylish, and lightly ridiculous Claude configuration
            ideas. Starting with status bars and spinner copy.
          </p>
        </div>

        <aside className={styles.panel} aria-label="Current collection status">
          <div>
            <span>packs</span>
            <strong>{packs.length}</strong>
          </div>
          <div>
            <span>tone</span>
            <strong>fun / sharp</strong>
          </div>
          <div>
            <span>rule</span>
            <strong>copyable</strong>
          </div>
        </aside>
      </section>

      <section className={styles.featured} aria-label="Featured configuration packs">
        {packs.map((pack) => (
          <article className={styles.card} key={pack.name}>
            <div className={styles.cardHeader}>
              <div>
                <span>{pack.tag}</span>
                <h2>{pack.name}</h2>
              </div>
              <CopyButton text={pack.code} />
            </div>
            <p>{pack.summary}</p>
            <p className={styles.detail}>{pack.detail}</p>
            <pre>
              <code>{pack.code}</code>
            </pre>
          </article>
        ))}
      </section>

      <section className={styles.submit}>
        <div>
          <p className={styles.kicker}>what belongs here</p>
          <h2>Configs should be useful, funny, or both.</h2>
        </div>
        <ul>
          <li>Good terminal taste.</li>
          <li>No noisy dashboards.</li>
          <li>No fake productivity magic.</li>
          <li>Easy to copy, edit, and steal responsibly.</li>
        </ul>
      </section>
    </main>
  );
}
