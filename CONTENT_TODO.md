# CONTENT TODO — 上线前需要你补充的内容

身份、邮箱、GitHub、真实项目链接与描述已全部接入（数据来自你的 GitHub 账号）。
以下是**剩余**需要你本人补充的内容，按优先级排列。

## ✅ 已完成（无需处理）

- [x] 姓名：天漠雪佳
- [x] 邮箱：yztmxj@163.com
- [x] GitHub：TmxjTmxj（导航/页脚/联系页/JSON-LD）
- [x] 站点域名：https://tmxjtmxj.github.io（canonical/OG/sitemap/robots）
- [x] 8 个真实项目：标题、描述（忠实翻译自仓库介绍）、GitHub 链接、githubRepo（卡片实时星标/语言徽标）、分类、技术栈、年份、架构图（含 Mermaid）
- [x] GitHub 统计模块：已启用（16 repos / stars / followers / 语言分布，实时 API + 缓存）
- [x] 经历：基于真实公开信息重写（独立开发者 AI Agent Builder + 山东大学机械），删除了所有虚构条目
- [x] 技能：按你的真实仓库重新整理（Python/Rust/ROS2/Gazebo/MCP/Agent Memory/CAD/CAE/CAM…）
- [x] 深色/浅色主题、SEO、404、部署工作流全部就绪

## 1. 项目叙事（最重要 — src/data/projects.ts）

每个项目对象里 `background / problem / solution` 目前是 `[TODO: ...]` 模板。
招聘者最想看的就是这部分，请为每个项目写下**你自己的话**：

- [ ] ros2-agent-workflow — background / problem / solution
- [ ] agent-orchestrator — background / problem / solution
- [ ] beifeng-wind-agent — background / problem / solution
- [ ] hermes-core — background / problem / solution
- [ ] tmxj-agent — background / problem / solution
- [ ] cnc-cam-gcode-simulator — background / problem / solution
- [ ] shrapnel-force-predictor — background / problem / solution（已有真实结果：3.72% 精度差）
- [ ] ansys-mech-sim-cases — background / problem / solution

写完后把该项目对象的 `isPlaceholder: true` 删掉（卡片上的黄色 Placeholder 徽标随之消失）。

## 2. Engineering Challenges / Results（可选但加分 — src/data/projects.ts）

- [ ] 重点项目补 `challenges`（Challenge → Analysis → Solution → Result 结构，见类型定义）
- [ ] 重点项目补 `results`（可量化成果：速度提升、准确率、任务数…）
- [ ] 没有 challenges/results 的项目，详情页会自动隐藏这两个模块（无需处理）

## 3. 项目截图（public/projects/<slug>/）

目前封面/架构图/截图是程序生成的占位 SVG（带 "placeholder asset" 水印）：

- [ ] ros2-agent-workflow — cover + 2 张真实截图
- [ ] agent-orchestrator — cover + 2 张真实截图
- [ ] beifeng-wind-agent — cover + 2 张真实截图
- [ ] hermes-core / tmxj-agent / cnc-cam-gcode-simulator / shrapnel-force-predictor / ansys-mech-sim-cases — cover
- [ ] 推荐 WebP/PNG，封面 1200×800，每张 < 150KB（README 有详细说明）

## 4. 经历细节（src/data/experience.ts）

- [ ] 独立开发者条目：补充 `[TODO: measurable outcomes]` 一条真实数据
- [ ] 山东大学条目：入学年份 `[START_YEAR]`、真实课程/项目/奖项
- [ ] 填好后删除两条的 `isPlaceholder: true`

## 5. 简历 PDF

- [ ] 用你的真实简历替换 `public/resume/resume.pdf`（保持同名）
- [ ] 更新 `profile.ts` 的 `resumeUpdated`

## 6. 其他

- [ ] LinkedIn：`profile.ts` 的 `linkedin` 字段（有账号就填，没有可删）
- [ ] 头像：`public/avatar/avatar.svg`（现在是「天漠雪佳」竖排字标，可用真实照片替换）
- [ ] `scripts/og-card.html` 已用真实信息重新渲染 og-image.png（姓名改动时重渲染，见 README）
- [ ] 部署：推送到 `TmxjTmxj.github.io` 仓库后，Settings → Pages → Source 选 **GitHub Actions**
- [ ] （可选）Google Search Console 提交 sitemap.xml
- [ ] （可选）`siteConfig.analytics` 接入统计（默认关闭）

## 7. 上线前自查

- [ ] `npm run build` + `npm run lint` 零错误
- [ ] 375 / 768 / 1024 / 1440 四个宽度检查
- [ ] 深色/浅色/系统主题切换
- [ ] `/projects` 搜索 + 分类筛选
- [ ] 项目详情页灯箱键盘操作（Esc / ← / →）
- [ ] 线上硬刷新 `/projects/<slug>`（404 恢复）
- [ ] Lighthouse 四项 ≥ 90（当前实测 95 / 100 / 100 / 100）
