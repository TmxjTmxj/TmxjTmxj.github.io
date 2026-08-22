# CONTENT TODO — 上线前需要你补充的内容

身份、邮箱、GitHub、10 个真实项目的**叙事（background / problem / solution / highlights / challenges / results）与真实图片**已全部接入，叙事素材来自你各仓库的 README（真实赛题、真实指标、真实难点）。
以下是**剩余**需要你本人处理的内容，按优先级排列。

## ✅ 已完成（无需处理）

- [x] 姓名 / 邮箱 / GitHub / 站点域名 / SEO
- [x] 8 个真实项目：真实标题、描述、链接、技术栈、分类、年份
- [x] **项目叙事全部基于仓库 README 撰写**（问题 → 解决方案 → 工程难点 → 量化结果），无虚构数据
- [x] **真实图片已接入**：ros2-agent-workflow（banner/架构图/相机证据/安全状态机）、beifeng-wind-agent（5 张桌面端截图）、cnc-cam-gcode-simulator（4 张界面截图）、shrapnel-force-predictor（模型评估图）、ansys-mech-sim-cases（5 张仿真云图）
- [x] 大图已压缩（>250KB 转 JPEG q85 / 宽 1400）
- [x] GitHub 统计模块（实时 16 repos / stars / 语言分布）
- [x] 经历基于真实公开信息（删除了虚构条目）
- [x] 深色主题、SEO、404、部署工作流
- [x] **中英文切换**：导航栏 EN/中 按钮，UI 文案 + 项目/经历/技能内容全量双语（中文叙事取材自仓库 README），选择持久化到 localStorage
- [x] **设计 v2（Engineer Blueprint）**：蓝图网格 + 角标 + spec-index 区块 + 滚动进度条 + 导航下划线 + metric 读数 + 终端 READY
- [x] 新增真实项目：lobster-core（五层 Agent 制造）、software-dev-team-skill（SOP 虚拟团队技能包）
- [x] 修复：LinkedIn 未配置时不再显示（原占位链接是坏链）；简历页加联系方式条
- [x] 统计同步：Projects 10 / GitHub 仓库 17 / AI Agents 7+
- [x] **v3**：整卡可点（stretched-link，修复"点不了"）+ hero AgentNet 连接网络动画 + 渐变高光；GitHub 统计改纯烘焙数据（彻底消除 403 控制台报错）；修复 target-size，自动跟随浏览器语言

## 1. 补几张图（低优先级）

以下 3 个仓库里没有现成截图，封面仍是生成式占位图（风格统一的示意图，可先用）：

- [ ] agent-orchestrator — 可补一张运行记录/终端截图到 `public/projects/agent-orchestrator/`
- [ ] hermes-core — 可补一张架构或对话截图到 `public/projects/hermes-core/`
- [ ] tmxj-agent — 可补一张终端界面截图到 `public/projects/tmxj-agent/`
- [ ] beifeng-wind-agent — 架构图 `architecture.svg` 是生成的（内容与 README 一致），有官方架构图时可替换

补图后把 `src/data/projects.ts` 里对应项目的 `image` 路径改一下即可。

## 2. 经历细节（src/data/experience.ts）

- [ ] 独立开发者条目：补充最后一条 `[TODO: measurable outcomes]` 真实数据（可参考：16 仓库、322 测试的 ros2 框架、99.3% benchmark 等）
- [ ] 山东大学条目：入学年份 `[START_YEAR]`、真实课程/项目/奖项
- [ ] 填好后删除两条的 `isPlaceholder: true`

## 3. 简历 PDF

- [ ] 用你的真实简历替换 `public/resume/resume.pdf`（保持同名）
- [ ] 更新 `profile.ts` 的 `resumeUpdated`

## 4. 其他

- [ ] LinkedIn：`profile.ts` 的 `linkedin` 字段（有账号就填，没有可删）
- [ ] 头像：`public/avatar/avatar.svg`（现在是「天漠雪佳」竖排字标，可用真实照片替换）
- [ ] `scripts/og-card.html` 已用真实信息渲染 og-image.png（品牌改动时重渲染，见 README）
- [ ] （可选）Google Search Console 提交 sitemap.xml
- [ ] （可选）`siteConfig.analytics` 接入统计（默认关闭）

## 5. 上线前自查

- [ ] `npm run build` + `npm run lint` 零错误
- [ ] 375 / 768 / 1024 / 1440 四个宽度检查
- [ ] 深色/浅色/系统主题切换
- [ ] `/projects` 搜索 + 分类筛选
- [ ] 项目详情页灯箱键盘操作（Esc / ← / →）
- [ ] 线上硬刷新 `/projects/<slug>`（404 恢复）
- [ ] Lighthouse 四项 ≥ 90（当前实测 95 / 100 / 100 / 100）
