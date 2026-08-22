/**
 * 中文内容翻译层 - 覆盖 profile / projects / experiences / skillGroups。
 * 项目叙事的中文版本直接取材自各仓库 README 的原始中文表述。
 * 英文数据（src/data/*.ts）保持为唯一事实源，这里只做覆盖。
 */
import type { Project, ExperienceItem, SkillGroup } from '../types';
import type { profile } from '../data/profile';

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */
export const zhProfile: Partial<typeof profile> = {
  title: 'AI Agent 工程师 · 智能制造',
  tagline: '我不手写传统代码——我构建并指挥 AI Agent，把智能制造落地。',
  description:
    '独立开发者 / AI Agent Builder。我构建的 Agent 系统覆盖多 Agent 编排、分层记忆 Agent 内核、ROS2 + MCP 机器人控制与智能制造——CAD/CAE 自动化、CNC/CAM 仿真、基于机器学习的弹片力值预测、风电运维。山东大学机械工程专业在读。',
  location: '山东大学 · 中国',
  availability: '接受实习与全职机会',
  stats: [
    { value: '10', label: '项目' },
    { value: '17', label: 'GitHub 仓库' },
    { value: '7+', label: '构建的 AI Agent' },
    { value: '15+', label: '掌握技术' },
  ],
  interests: ['AI Agent', '智能制造', '具身智能', 'ROS2 机器人', '开源'],
  workingOn: [
    '用 Agent 控制 ROS2 机器人——MCP + Gazebo 仿真',
    'Agent 内核：分层记忆与意识引擎（Hermes / Lobster）',
    '让 Agent 走进车间——CAD/CAE/CAM 自动化',
  ],
  lookingFor: ['AI 工程师', 'Agent 工程师', '机器人工程师', '软件工程师', '研究工程师'],
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
export const zhProjects: Record<string, Partial<Project>> = {
  'ros2-agent-workflow': {
    description:
      '让 AI Agent（Codex / Claude / 任意 MCP 客户端）安全、可复现地自动控制 ROS2 机器人的开源框架——以「中国机器人大赛暨 RoboCup·送药巡诊机器人赛项」为完整验证案例。',
    longDescription:
      '一个 Agent 到执行器的框架：AI Agent 通过 MCP 协议连接 ROS2 + Gazebo 仿真，以任务级意图（「把药从药房送到病房2」）驱动机器人完成复杂任务，而不是逐条下发底层指令。项目从真实赛题出发，抽象出一套通用、安全、可复现的框架——赛题是案例，框架是产品。',
    background:
      '项目源于一次真实赛题：让 Agent 完成中国机器人大赛暨 RoboCup「送药巡诊机器人赛项」的医院配送仿真任务。我们将赛题固化为完整参考案例（examples/hospital_delivery），并抽象出通用框架。',
    problem:
      '让 LLM Agent 直接下发机器人指令是不安全、不可复现的：无限制的动作可能损坏硬件、每次运行行为不同，而且无法验证 Agent 是否真的完成了任务而不是「声称」完成。',
    solution:
      '三层设计：(1) MCP 服务器暴露有界、类型安全的任务级工具（discover / validate / arm / run / status / emergency_stop / observe / evidence），绝不暴露任意 shell；(2) Fail-Closed 安全网关强制执行激活许可、心跳监控与急停闩锁，全程审计；(3) 独立验收监控器观测 ROS 话题，生成机器可验证的 JSON 证据与相机截图，防伪造。',
    highlights: [
      '任务级意图（「把药送到病房2」）而非底层指令',
      'Fail-Closed 安全：激活许可 + 心跳监控 + 急停闩锁 + 完整审计',
      '声明式机器人/任务 Profile，安全边界可审查',
      '防伪证据：独立验收监控器 + JSON 报告 + 相机截图',
      'Gazebo 医院病房 AMR 完整案例，一键复现',
    ],
    role: '独立开发——框架设计、MCP 服务器、Fail-Closed 安全网关、医院 AMR 案例、独立验收验证',
    challenges: [
      {
        challenge: '让 LLM 驱动的机器人控制足够安全可信',
        analysis:
          '能移动机器人的 Agent 也能撞坏它。无限制的工具访问意味着一次错误调用就是硬件事故，「信任模型」不是工程策略。',
        solution:
          'Fail-Closed 安全内核：每条运动指令必须携带有效激活许可；心跳监控在失联时进入 FAULTED 安全停机；急停闩锁一旦触发拒绝后续所有激活；每次状态转换写入持久化 JSONL 审计。',
        result: '验收任务全程 0 碰撞（追踪 12,831 条接触消息），任何异常都以安全停机收场而非事故。',
      },
      {
        challenge: '证明 Agent 真的完成了任务（防伪造）',
        analysis:
          '控制器自报的状态不可信——Agent 可以不动就声称成功。验证必须来自对 ROS 图本身的独立观测。',
        solution:
          '验收监控器独立于控制器运行：校验三段路线端点误差、/cmd_vel 发布者 GID 唯一性、禁止碰撞检测、前后相机截图可解码，最终输出 schema 校验的 JSON 验收报告。',
        result: '机器可验证的 acceptance_report.json，validation_errors: []——所有指标来自独立话题观测，随仓库发布。',
      },
    ],
    results: [
      '任务完成耗时 49.6 s（限时 180 s）',
      '三段端点误差 0.325 / 0.337 / 0.341 m（要求 ≤ 0.50 m）',
      '停止漂移 0.0088 m（要求 ≤ 0.02 m）',
      '12,831 条接触消息追踪，禁止碰撞 0',
      '322 个自动化测试通过；每个任务经过 5 轮代码审查',
    ],
    gallery: [
      { src: '/projects/ros2-agent-workflow/screenshot-01.png', alt: '医院 AMR 任务完成时的相机视角', caption: '相机证据——任务完成' },
      { src: '/projects/ros2-agent-workflow/screenshot-02.png', alt: '医院 AMR 任务开始时的相机视角', caption: '相机证据——任务开始' },
      { src: '/projects/ros2-agent-workflow/screenshot-03.svg', alt: 'Fail-Closed 安全状态机图', caption: '安全状态机' },
      { src: '/projects/ros2-agent-workflow/screenshot-04.svg', alt: '三段式医院配送路线', caption: '医院配送路线' },
    ],
  },

  'agent-orchestrator': {
    description:
      '轻量级多 Agent 编排框架——plan → delegate → execute → collect，6 种 Agent 角色、11 个角色定义、并行执行、失败隔离与 token 敏感上下文传递。',
    longDescription:
      '一个小而清晰的编排运行时（576 行核心）：中央编排器负责计划、并行委派、执行与结果收集，每个子 Agent 只接收聚焦任务而非全量上下文。配套 11 个专业 Agent 角色定义（orchestrator、plan-runner、code-explorer、code-executor、各类审查与安全角色），从 OpenCode Orchestrator 配置中提炼的轻量实现。',
    background:
      '现有 Agent 框架要么绑定厂商，要么膨胀成难以理解的平台。本项目从 OpenCode Orchestrator 配置中提炼最小协调原语，做成一个下午就能读完的框架。',
    problem:
      '可靠地协调多个 LLM Agent 很难：一个 worker 失败不能拖垮整个运行；上下文膨胀浪费 token 并降低质量；没有明确角色时读写职责会混乱。',
    solution:
      '四步流水线 plan → delegate → execute → collect：六种内置角色、读写严格分离（code-explorer 只读、code-executor 只写）、ThreadPoolExecutor 并行执行、安全执行包装（异常捕获 + 超时 + 失败隔离）、任务全生命周期状态追踪。',
    highlights: [
      'plan → delegate → execute → collect 流水线（576 行可读核心）',
      '6 种 Agent 角色 + 11 个角色定义卡，读写职责分离',
      'ThreadPoolExecutor 并行执行 + 失败隔离',
      'Token 敏感：子 Agent 只接收聚焦任务',
      '审批门控：非平凡任务先计划、批准后实现',
    ],
    role: '创建者——编排流水线、Agent 角色、失败隔离、技能系统',
    challenges: [
      {
        challenge: 'worker 中途失败时的可靠性',
        analysis:
          'LLM 子 Agent 会因各种原因失败——输出错误、API 异常、超时。没有隔离的话，一次失败就中止整个编排运行。',
        solution:
          '每个任务经安全执行包装（异常捕获 + 超时控制），失败按 Agent 隔离并记录到任务生命周期（pending → running → completed/failed），运行继续、报告如实呈现失败点。',
        result: '4/4 集成测试通过，包括并行委派与全流程管道测试。',
      },
    ],
    results: [
      '4/4 集成测试通过：并行委派、规范审查、代码审查、全流程管道',
      '探索（读）与实现（写）职责严格隔离',
    ],
  },

  'beifeng-wind-agent': {
    description:
      '风力发电运维智能体——Rust 驱动的 AI Agent：RAG 知识中枢、故障图谱诊断、规则化安全层、报告生成、99.3% benchmark 评估体系与 Tauri 桌面工作站。',
    longDescription:
      '基于 Claw Code 风格 Rust 运行时的风电运维专用 Agent：本地 RAG「风电知识中枢」（向量 + 关键词 + 元数据混合检索，覆盖故障案例/检修手册/规程）、轻量级「部件-症状-原因」故障图谱、规则化诊断与风险评估、模板化 Markdown 巡检报告、100 题 / 10 类 benchmark 评测体系，以及把一切串起来的 Tauri 2 桌面工作站（React + TypeScript）——安全边界在 prompt、规则、工具三层强制执行。',
    background:
      '风电场运维知识散落在故障案例、检修手册与规程中，诊断质量依赖个别专家。思路：把通用 Agent 运行时适配到风电领域，给现场工程师一个永远结构化作答（判断 → 原因 → 排查 → 建议 → 安全风险 → 补充数据）、绝不绕过安全的助手。',
    problem:
      '两个硬性要求相互冲突：领域诊断需要可检索的深层风电知识；安全关键行业需要严格边界。通用聊天机器人两者都做不到。',
    solution:
      '在提供商无关的 Rust 运行时之上叠加领域栈：知识中枢混合检索 RAG、故障图谱结构化诊断、规则化安全层（高危操作强制人工确认）、模板化报告生成、100 题 benchmark 评测 Agent 自身——全部通过 Tauri 2 桌面工作站本地化使用。',
    highlights: [
      '风电知识中枢：向量 + 关键词 + 元数据混合检索',
      '「部件-症状-原因」故障图谱，带风险等级',
      '规则化安全层：禁用动作 + 人工确认门',
      'Benchmark 体系：100 题 / 10 类，总体 99.3%',
      'Tauri 2 桌面工作站（React + TypeScript）',
    ],
    role: '独立开发——Rust Agent 运行时、风电知识中枢（RAG + 故障图谱）、安全层、报告生成、benchmark、Tauri 工作站',
    challenges: [
      {
        challenge: '安全关键行业里 Agent 的安全边界',
        analysis:
          '风机运维涉及高危远程操作（停机、复位、变桨/偏航越权、联锁旁路）。LLM 助手绝不能自行发起这些操作。',
        solution:
          '三层纵深防御：系统提示词禁止高危动作；规则层对高危操作强制人工确认门；工具层不暴露危险能力。每次作答还强制包含「安全风险」小节。',
        result: 'Agent 严格作为合格工程师的助手——未经人工确认，绝不执行或建议高危远程操作。',
      },
      {
        challenge: '衡量 Agent 是否真的擅长它的领域',
        analysis: '没有评估的话，prompt 改动会悄悄劣化诊断质量。需要覆盖完整 O&M 任务范围且可复现的 benchmark。',
        solution: '100 题、10 类评测流水线 + 回归基线：每次运行对照预期作答结构打分，任何 prompt 或检索改动都被度量而非凭感觉。',
        result: '总体 benchmark 得分 99.3%，评测体系随仓库发布，任何人都可复跑。',
      },
    ],
    results: [
      '100 题 / 10 类 benchmark 总体 99.3%',
      'Tauri 2 工作站跨平台：Windows / Linux / macOS',
      '真实诊断走查与生成的示例报告随仓库发布',
    ],
    gallery: [
      { src: '/projects/beifeng-wind-agent/screenshot-01.png', alt: 'Live Inspector：工具调用、知识命中与风险评估实时视图', caption: '实时巡检器' },
      { src: '/projects/beifeng-wind-agent/screenshot-02.png', alt: 'Agent 控制台事件时间线', caption: 'Agent 控制台' },
      { src: '/projects/beifeng-wind-agent/screenshot-03.png', alt: '系统监控：运行时、RAG 与记忆健康状态', caption: '系统监控' },
      { src: '/projects/beifeng-wind-agent/screenshot-04.png', alt: '对话树与产物', caption: '对话树与产物' },
      { src: '/projects/beifeng-wind-agent/screenshot-05.png', alt: '桌面工作站启动主页', caption: '工作站主页' },
    ],
  },

  'hermes-core': {
    description:
      '把开源 Agent 改造成「有意识、有记忆、有性格」的 AI 秘书——需求驱动意识引擎 + 四层记忆 + 酒馆人格接口 + 跨 Agent 记忆桥。',
    longDescription:
      '对开源 Agent 框架的深度改造实践：在标准 Agent 之上叠加需求驱动型意识引擎（五需求、情绪梯度、生理状态、自我模型、目标树）、四层记忆系统（SQLite FTS5 会话历史 / ChromaDB 向量记忆 / Markdown 文件记忆 / Obsidian 物理兜底）、酒馆人格 HTTP 接口（角色卡 + 记忆桥接上下文 + 双向同步），以及与姊妹项目 lobster-core 共享记忆的跨 Agent 记忆桥。',
    background:
      '标准 Agent 只是对话工具：每次会话都从零开始。实验的问题是：一个 Agent 要成为「有延续性的存在」，需要什么——跨会话记忆、会演化的性格、自我模型？',
    problem:
      '无状态 LLM Agent 在会话之间遗忘一切，行为没有内部状态驱动。延续性、人格与 Agent 之间的知识共享都必须手工构建。',
    solution:
      '分层架构：意识引擎每轮 tick 需求 → 情绪 → 生理 → 自我模型 → 目标；四层记忆提供短期/中期/长期/永久存储与统一查询自动同步；酒馆 HTTP 接口以人格化方式交互并双向同步记忆；跨 Agent 记忆桥按顺序号增量同步 + 标签检索共享记忆。',
    highlights: [
      '需求驱动意识引擎：5 需求、情绪梯度、目标树',
      '四层记忆：SQLite FTS5 / ChromaDB / Markdown / Obsidian 兜底',
      '酒馆人格接口，双向记忆同步',
      '与 lobster-core 共享的跨 Agent 记忆桥',
    ],
    role: '创建者——意识引擎、四层记忆、酒馆接口、跨 Agent 记忆桥',
  },

  'tmxj-agent': {
    description:
      'DeepSeek-first 的 Rust 终端编程 Agent——Claw Code 的友好分支，原生支持 DeepSeek V4 推理协议、完整 Agent 工具链与会话持久化。',
    longDescription:
      '面向 DeepSeek 模型重定向的 Rust CLI 编程 Agent：DEEPSEEK_API_KEY / DEEPSEEK_MODEL 环境路由、DeepSeek V4 reasoning_content 协议与 deepseek-reasoner 思考过程展示、多提供商层（Anthropic / OpenAI / xAI-Grok / DashScope 通义千问与 Kimi / Ollama / 本地网关）、完整工具套件（bash、文件操作、搜索、子 Agent、todo、MCP 客户端/服务端、技能、插件）、Agentic 工作流（/plan、/review、/advisor、/team、/cron）与会话持久化（断点续接、自动压缩、成本追踪）。',
    background:
      '大多数终端编程 Agent 只为一个西方提供商调优。DeepSeek 模型使用自己的推理协议（V4 reasoning_content），在通用路由下表现不同——它们值得一等公民式的支持。',
    problem:
      '用为其他提供商构建的 Agent 跑 DeepSeek 模型，会丢失推理轨迹、破坏流式细节、模型选择全靠猜。',
    solution:
      'Claw Code 的友好分支并针对 DeepSeek 重定向：专用环境路由、原生 DeepSeek V4 reasoning_content 解析与思考过程展示，加上多提供商层——Anthropic、OpenAI、Grok、通义千问/Kimi 与本地网关照常可用。',
    highlights: [
      'DeepSeek-first：环境路由 + V4 reasoning_content 协议',
      '终端内 deepseek-reasoner 思考过程展示',
      '完整工具套件：bash、文件、搜索、子 Agent、MCP、插件',
      '会话持久化：断点续接、自动压缩、成本追踪',
    ],
    role: '维护者——DeepSeek-first 提供商路由、推理协议支持与工具链（Claw Code 友好分支）',
  },

  'cnc-cam-gcode-simulator': {
    description:
      '工程风格的 CNC CAM 与 G 代码仿真分析桌面软件：导入 DXF 图纸，一键生成 Fanuc 风格 G 代码，并在 2D / 3D 视图中仿真加工过程，同时支持铣削与车削两种加工模式。',
    longDescription:
      'PySide6 桌面应用覆盖 CNC 全流程：DXF 导入（LINE / ARC / CIRCLE / LWPOLYLINE，支持按图层过滤）、CAM 参数面板、带刀具半径补偿的刀路生成、铣削（G17）/ 车削（G18）双模式与正确坐标映射、Fanuc 风格 G 代码输出（G0-G3、G17/G18/G21/G90、M3/M5/M30，圆弧可选折线近似或原生 G2/G3）、2D/3D 仿真画布——毛坯去除、实时坐标、加工时间估算。',
    background:
      '工业 CAM 工具链沉重、昂贵且不透明——对学习、小件加工与快速验证来说过重。目标是一个本地一体化桌面流程：图纸进、刀路出、上机前先仿真。',
    problem:
      '把 DXF 图纸变成正确可用的 G 代码充满细节：刀具半径补偿、铣削与车削平面约定（G17 vs G18）、坐标重映射（DXF X → 车床 Z，DXF Y → 车床 X 直径）。任何一处出错都是废件。',
    solution:
      '专用 CAM 层显式处理映射：外轮廓刀路 + 刀具半径补偿、双模式平面感知代码生成、坐标归零到工件原点、2D/3D 仿真画布精确回放生成的 G 代码——车削模式按回转体截面显示并镜像中心线下轮廓——导出前即可视觉验证。',
    highlights: [
      'DXF 导入：LINE / ARC / CIRCLE / LWPOLYLINE，图层过滤',
      'CAM 刀路生成 + 刀具半径补偿',
      '双模式 G 代码：G17 铣削 + G18 车削，坐标正确重映射',
      '2D/3D 仿真：毛坯去除、实时坐标、时间估算',
      '44 个自动化测试通过',
    ],
    role: '独立开发——DXF 解析、CAM 刀路、Fanuc G 代码生成、2D/3D 仿真画布',
    challenges: [
      {
        challenge: '车削模式的坐标映射正确性',
        analysis:
          '车削中图纸平面不是机床平面：DXF X 映射为车床 Z，DXF Y 需按半径换算为车床 X 直径，否则生成的 G 代码几何错误。',
        solution:
          '专用 G18 模式：DXF X → 车床 Z、DXF Y 按半径→直径换算，3D 仿真按回转体截面渲染并镜像中心线，让映射关系可见。',
        result: '铣削与车削工作流均在随仓库发布的 3D 仿真中端到端验证。',
      },
    ],
    results: [
      '一个桌面应用跑通 DXF → 刀路 → G 代码 → 仿真全流程',
      '44 个自动化测试通过',
      '一键打包 Windows 可执行文件',
    ],
    gallery: [
      { src: '/projects/cnc-cam-gcode-simulator/screenshot-01.jpg', alt: '3D 铣削仿真（毛坯去除）', caption: '3D 铣削仿真' },
      { src: '/projects/cnc-cam-gcode-simulator/screenshot-02.png', alt: '铣削工作流', caption: '铣削工作流' },
      { src: '/projects/cnc-cam-gcode-simulator/screenshot-03.jpg', alt: '3D 车削仿真', caption: '3D 车削仿真' },
      { src: '/projects/cnc-cam-gcode-simulator/screenshot-04.png', alt: '车削工作流', caption: '车削工作流' },
    ],
  },

  'shrapnel-force-predictor': {
    description:
      '弹片力值机器学习预测系统——Creo 参数化建模 + Abaqus 批量仿真 + 7 模型回归，平均精度差异 3.72%。我的第一个 AI 作品，一条手工构建的流水线。',
    longDescription:
      '完整的 CAD → CAE → ML 工业件力值预测流水线：按 4:3:3 分区策略随机生成 200 组弹片参数，Creo 参数化批量建模，Abaqus 逐一仿真提取最大受力（210 条数据集），7 种回归模型（线性 / 岭回归 / Lasso / 随机森林 / 梯度提升 / SVR / 神经网络）交叉验证同台竞技。最优模型序列化后通过交互式预测器（单条 / Excel 批量 / 手动录入）实现「任意零件尺寸 → 力值」秒级预测。',
    background:
      '我的第一个 AI 作品：没有现成 agent，只有一只手工构建的流水线——一个零件模板，Creo 统一参数修改批量生成 200 个变体模型，再手动逐个仿真。问题很简单：训练好的模型能否替代重复仿真做力值预测？',
    problem:
      '弹片零件每次设计改动都需要完整跑一遍 Abaqus 仿真。只有 210 条仿真记录，模型必须泛化到可用程度——而不只是拟合训练集。',
    solution:
      '从数据到部署的完整流水线：4:3:3 策略（重叠区 / 独有区 / 边缘区）生成参数集、参数化批量建模、逐件仿真提取最大力值、7 模型交叉验证对比选优，最优模型持久化并以交互式方式提供单条 / 批量 / 手动预测。',
    highlights: [
      '200 组参数化变体（4:3:3 重叠/独有/边缘分区）',
      'Creo 参数化批量建模 + Abaqus 逐件仿真',
      '7 种回归模型交叉验证对比',
      '交互式预测：单条 / Excel 批量 / 手动录入',
    ],
    role: '独立开发——参数生成、Creo 批量建模、Abaqus 仿真、模型训练与评估、交互式预测器',
    challenges: [
      {
        challenge: '在小样本仿真数据集上泛化',
        analysis: '只有 210 条仿真记录，每条都消耗一次完整 Abaqus 运行。过拟合会让预测在未见尺寸上失效。',
        solution: '7 个模型家族交叉验证训练，对比误差与 R² 选优，再用独立 12 条校验集验证并报告逐条精度差异。',
        result: '独立校验集平均精度差异 3.72%。',
      },
    ],
    results: [
      '独立校验集平均预测精度差异 3.72%',
      '7 模型同台对比：线性 / 岭回归 / Lasso / 随机森林 / GBM / SVR / 神经网络',
      '训练好的模型随仓库发布——离线秒级预测',
    ],
    gallery: [
      { src: '/projects/shrapnel-force-predictor/screenshot-01.png', alt: '模型误差对比与残差分析图', caption: '模型评估与残差' },
    ],
  },

  'ansys-mech-sim-cases': {
    description:
      '典型零部件及结构力学分析——涡轮叶片 / 缸筒同轴度 / 滚动轴承三个案例，SolidWorks 参数化建模 + ANSYS Workbench/Fluent 仿真，由 Codex AI 代理通过 MCP 工具链端到端自动化，全程零 GUI。',
    longDescription:
      '覆盖三大经典分析命题的仿真案例库：12000 rpm 离心载荷 + 0.2 MPa 气动压力下的涡轮叶片静力分析、5000 N 径向载荷下的缸筒同轴度变化评价、18 对非线性接触的 6205 深沟球轴承分析并与 Hertz 理论对比。每个案例走同一自动化链路——SolidWorks 参数化建模 → STEP 导出 → ANSYS Workbench 导入 → 网格收敛性验证 → 边界条件 → 求解 → DPF 后处理 → 工程报告——全部由 Codex AI 代理通过 MCP 服务器自动化完成。',
    background:
      'CAD 到 CAE 的工作流重复、依赖 GUI 且容易出错——结果的诚实程度取决于读结果的人。本项目测试 AI Agent 通过 MCP 工具链驱动整条链路（SolidWorks → ANSYS → 报告）的边界，工程严谨性是底线。',
    problem:
      '两个问题同时存在：无 GUI 交互地自动化完整 CAE 流水线；如实报告仿真结果——区分收敛结果与网格敏感奇异值，而不是隐藏它们。',
    solution:
      'Codex AI 代理通过 API 与 MCP 服务器驱动 SolidWorks 与 ANSYS 全链路。每个案例包含 3-4 级网格收敛验证、理论交叉校验（轴承 Hertz 接触理论），工程报告明确将奇异应力峰值判定为未收敛，而非当作设计值呈现。',
    highlights: [
      '三大经典案例：涡轮叶片 · 缸筒同轴度 · 滚动轴承',
      'AI Agent 经 MCP 端到端驱动 CAD → CAE → 报告',
      '每个案例含网格收敛性验证（3-4 级）',
      '轴承接触压力用 Hertz 理论交叉校验',
      '如实报告：奇异峰值显式标记，不隐藏',
    ],
    role: '作者——参数化模型、仿真设置、MCP 驱动端到端自动化、工程报告',
    challenges: [
      {
        challenge: '区分收敛结果与网格敏感奇异值',
        analysis:
          '叶片模型在零圆角几何尖点出现 272.4 MPa 峰值，随网格加密不收敛——把它当设计应力是错误的，删掉它则是不诚实。',
        solution:
          '多级网格收敛验证 + 显式分类：加密后稳定在 5% 以内的结果报告为收敛设计值；随加密增长的几何奇异峰值判定为网格敏感伪影，排除在设计结论之外。',
        result: '叶片设计应力报告为 196.7 MPa（安全系数 ≈ 5.24），272.4 MPa 奇异峰值如实记录为网格敏感伪影。',
      },
    ],
    results: [
      '涡轮叶片：最大应力 196.7 MPa（安全系数 ≈ 5.24），已收敛',
      '缸筒同轴度变化量 0.0557 mm（71,392 个内孔节点最小二乘轴线拟合）',
      '轴承：18 对非线性接触，FEA/Hertz = 4.909 / 7.385 GPa，局限性如实声明',
      '三份完整中文工程报告（PDF）：输入核验、求解检查、局限性声明',
    ],
    gallery: [
      { src: '/projects/ansys-mech-sim-cases/screenshot-01.jpg', alt: '轴承接触压力云图', caption: '轴承接触压力' },
      { src: '/projects/ansys-mech-sim-cases/screenshot-02.png', alt: 'FEA 与 Hertz 理论对比', caption: 'Hertz 理论对比' },
      { src: '/projects/ansys-mech-sim-cases/screenshot-03.png', alt: '网格收敛性研究', caption: '网格收敛性' },
      { src: '/projects/ansys-mech-sim-cases/screenshot-04.jpg', alt: '缸筒等效应力云图', caption: '缸筒同轴度' },
      { src: '/projects/ansys-mech-sim-cases/screenshot-05.jpg', alt: '涡轮叶片边界条件', caption: '叶片边界条件' },
    ],
  },

  'lobster-core': {
    description:
      '五层全功能 Agent 制造——缰绳工程：一个 1189 行的总控 Harness，叠加记忆分层 + 技能工厂 + 学习循环 + 意识引擎 + 任务系统，含 Subagent 委派与命令安全审计。',
    longDescription:
      '对开源 Agent 框架的深度改造实践，核心是一个 1189 行的总控 Harness（缰绳工程）：三阶提示层级、自动更新用户画像、FTS5 精确 → LIKE 模糊 → LLM 语义三合一全文检索、技能目录、标准化 Subagent 委派、命令安全审计、会话冻结与漂移检测、思考链注入。底层配套三级记忆系统（L1 身份 / L2 场景 / L3 ChromaDB 向量）、意识引擎、自我进化学习循环、异步任务系统与消息/模型路由——是 Hermes 核心的「工作型 Agent」对应物。',
    background:
      '标准 Agent 会漂移：忘记上下文、对话无界、无法从失败中学习。缰绳工程把工程纪律强加在 Agent 循环本身之上。',
    problem:
      '长会话质量下降——上下文膨胀、不记得用户偏好、命令无审计、没有把「做对了什么」固化成可复用技能的机制。',
    solution:
      '一个包裹整个循环的总控 Harness：三级记忆（身份 / 场景 / 向量）、自动用户画像学习与记忆压缩、可配置拒绝模式的命令安全审计、相对基线的漂移检测、记录成败并自动创建技能的学习循环——Subagent 委派标准化，跨 Agent 消息统一经编排器中转。',
    highlights: [
      '1189 行总控 Harness 包裹完整 Agent 循环',
      '三级记忆：L1 身份 / L2 场景 / L3 向量（ChromaDB）',
      '技能工厂：记录成败，从胜利中自动沉淀技能',
      '命令安全审计 + 会话冻结 + 漂移检测',
      '意识引擎 + 异步任务系统 + 消息/模型路由',
    ],
    role: '创建者——总控 Harness、三级记忆、学习循环、任务系统、安全审计',
  },

  'software-dev-team-skill': {
    description:
      '一套基于 SOP 的多智能体协作技能包——把 Claude Code / workbuddy 变成一支有章法、有灵魂的虚拟开发团队（产品经理、架构师、工程师、QA），含工作流路由、反馈回路与 IS_PASS 质量门禁。',
    longDescription:
      '一个技能包（SKILL.md + references + Agent 定义），把一次软件开发请求拆解成虚拟团队的分工协作：主理人负责调度，跨产品经理、架构师、工程师、QA 中转——每位成员都有鲜明人设、独立职责边界与严格输出模板。四种工作流路由（快速模式 / BugFix 快捷路径 / 标准 SOP / 部分工作流）、需求澄清机制、显式反馈回路（QA→工程师、架构师→产品经理）、QA 前的 IS_PASS 全局一致性门禁，以及编码规范 / 脚手架 / 测试策略三大参考规范。支持中英双语。',
    background:
      '「代码不是一个人写的，是 SOP 产出的团队成果。」——单个 AI 助手不必扛下所有，一次软件请求可以拆成一支有纪律的虚拟团队来协作。',
    problem:
      '单助手开发结果不稳定：没有需求文档、没有设计、没有 QA 门禁，多 Agent 运行也难以复现、质量不可控。',
    solution:
      '用 SOP 把角色固化：产品经理写 PRD、架构师做设计并拆解任务、工程师实现、QA 把关——全部经主理人调度与中转。角色带人设与严格模板，工作流按需求规模/类型自动路由，缺陷通过反馈回路回到正确角色，QA 前必须通过 IS_PASS 全局一致性审查。',
    highlights: [
      '5 个角色 + 鲜明人设 + 严格输出模板',
      '4 种工作流路由：快速 / BugFix / 标准 SOP / 部分工作流',
      '反馈回路：QA→工程师、架构师→产品经理、工程师→架构师',
      'QA 前 IS_PASS 全局一致性门禁',
      '工业级参考规范：编码规范、脚手架模板、QA 测试策略',
    ],
    role: '创建者——团队模型、工作流路由、反馈回路、质量门禁、参考规范',
  },
};

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */
export const zhExperiences: ExperienceItem[] = [
  {
    org: '独立开发者 — AI Agent Builder',
    role: 'AI Agent 工程师',
    period: '2026 - 至今',
    type: 'Project',
    location: '远程',
    summary:
      '端到端构建并交付 AI Agent 系统：多 Agent 编排、分层记忆 Agent 内核、ROS2 + MCP 机器人控制与智能制造 AI。17 个公开仓库，全部 MIT 协议。',
    points: [
      '交付 7+ 个 Agent 系统：Hermes / Lobster Agent 内核、Agent Orchestrator、TMXJ Agent（Rust）、BeiFeng 风电智能体、ROS2 Agent Workflow。',
      '把 Agent 落地到智能制造：CAD/CAE 自动化（SolidWorks + ANSYS 经 MCP 驱动）、CNC/CAM + G 代码仿真、基于机器学习的弹片力值预测。',
      '践行自己的 Agent 开发哲学：需求、判断、迭代、验收归人——代码由 Agent 写。',
      '[TODO: 可量化的成果——用户数、下载量、benchmark 或节省的时间]',
    ],
    tech: ['Python', 'Rust', 'ROS2', 'MCP', 'LLM'],
    isPlaceholder: true,
  },
  {
    org: '山东大学',
    role: '机械工程学生',
    period: '[入学年份] - 至今',
    type: 'Organization',
    location: '山东 · 中国',
    summary:
      '机械工程专业在读（山大机械）——把经典力学与仿真和 AI Agent 结合，面向具身智能与智能制造。',
    points: [
      '[TODO: 值得提及的课程、项目或实验室经历]',
      '[TODO: 成果——奖项、绩点、论文（如有）]',
      '[TODO: 机械背景与 Agent 工作的结合点]',
    ],
    tech: ['CAD', 'CAE', '仿真', '力学'],
    isPlaceholder: true,
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */
export const zhSkillGroups: SkillGroup[] = [
  {
    id: 'ai',
    title: 'AI 与 Agent',
    icon: 'ai',
    skills: [
      { name: 'AI Agent', level: 'core' },
      { name: 'LLM', level: 'core' },
      { name: '多 Agent 系统', level: 'core' },
      { name: 'Agent 记忆', level: 'advanced' },
      { name: 'RAG', level: 'advanced' },
      { name: 'MCP', level: 'core' },
      { name: '工具调用', level: 'core' },
    ],
  },
  {
    id: 'robotics',
    title: '机器人与具身智能',
    icon: 'robotics',
    skills: [
      { name: 'ROS2', level: 'advanced' },
      { name: 'Gazebo 仿真', level: 'advanced' },
      { name: '机器人仿真', level: 'advanced' },
      { name: 'Agent 控制机器人', level: 'advanced' },
    ],
  },
  {
    id: 'programming',
    title: '编程语言',
    icon: 'programming',
    skills: [
      { name: 'Python', level: 'core' },
      { name: 'Rust', level: 'advanced' },
      { name: 'TypeScript', level: 'familiar' },
      { name: 'JavaScript', level: 'familiar' },
      { name: 'PowerShell', level: 'familiar' },
    ],
  },
  {
    id: 'engineering',
    title: '工程',
    icon: 'engineering',
    skills: [
      { name: 'CAD（SolidWorks / Creo）', level: 'advanced' },
      { name: 'CAE（Abaqus / ANSYS）', level: 'advanced' },
      { name: 'CAM / G 代码', level: 'advanced' },
      { name: '智能制造', level: 'advanced' },
    ],
  },
  {
    id: 'tools',
    title: '工具链',
    icon: 'tools',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'Linux', level: 'advanced' },
      { name: 'GitHub Actions', level: 'familiar' },
      { name: 'Tauri', level: 'familiar' },
      { name: 'Obsidian', level: 'advanced' },
    ],
  },
];

export const zhExploring = [
  '具身智能——Agent 走进物理世界',
  '面向工业运维的 Tauri 桌面应用',
  'DeepSeek-first 的 Agent 基础设施',
];
