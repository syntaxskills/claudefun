import { getTranslations, setRequestLocale } from "next-intl/server";
import { CopyButton } from "../CopyButton";
import styles from "../page.module.css";

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

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: "en" | "zh" }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const otherLocale = locale === "en" ? "zh" : "en";
  const packs = [
    {
      name: t("packs.statusbar.name"),
      tag: t("packs.statusbar.tag"),
      summary: t("packs.statusbar.summary"),
      detail: t("packs.statusbar.detail"),
      code: statusBarConfig,
    },
    {
      name: t("packs.spinner.name"),
      tag: t("packs.spinner.tag"),
      summary: t("packs.spinner.summary"),
      detail: t("packs.spinner.detail"),
      code: spinnerVerbs,
    },
    {
      name: t("packs.corporateSpinner.name"),
      tag: t("packs.corporateSpinner.tag"),
      summary: t("packs.corporateSpinner.summary"),
      detail: t("packs.corporateSpinner.detail"),
      code: corporateSpinnerVerbs,
    },
  ];

  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label={t("navLabel")}>
        <a className={styles.brand} href="https://syntaxskills.com">
          {t("syntaxSkills")}
        </a>
        <div className={styles.navMeta}>
          <span>ClaudeFun</span>
          <span>{t("registryLabel")}</span>
          <a href={`/${otherLocale}`}>{otherLocale.toUpperCase()}</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>{t("domain")}</p>
          <h1>{t("heroTitle")}</h1>
          <p className={styles.lede}>{t("heroLede")}</p>
        </div>

        <aside className={styles.panel} aria-label={t("statusLabel")}>
          <div>
            <span>{t("packsLabel")}</span>
            <strong>{packs.length}</strong>
          </div>
          <div>
            <span>{t("toneLabel")}</span>
            <strong>{t("toneValue")}</strong>
          </div>
          <div>
            <span>{t("ruleLabel")}</span>
            <strong>{t("ruleValue")}</strong>
          </div>
        </aside>
      </section>

      <section className={styles.featured} aria-label={t("featuredLabel")}>
        {packs.map((pack) => (
          <article className={styles.card} key={pack.name}>
            <div className={styles.cardHeader}>
              <div>
                <span>{pack.tag}</span>
                <h2>{pack.name}</h2>
              </div>
              <CopyButton text={pack.code} copyLabel={t("copy")} copiedLabel={t("copied")} />
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
          <p className={styles.kicker}>{t("belongsKicker")}</p>
          <h2>{t("belongsTitle")}</h2>
        </div>
        <ul>
          <li>{t("criteria1")}</li>
          <li>{t("criteria2")}</li>
          <li>{t("criteria3")}</li>
          <li>{t("criteria4")}</li>
        </ul>
      </section>
    </main>
  );
}
