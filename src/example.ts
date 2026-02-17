// example.ts
import { type Locale, D3Timeline } from "@yiwei016/d3timeline";

import "@yiwei016/d3timeline/index.css";
import "./example.css";
// 演示代码
let projectTimeline: D3Timeline;
let versionsTimeline: D3Timeline;
let eventLog: LogEntry[] = [];

interface LogEntry {
  timestamp: number | string;
  message: any;
  type: string;
}

function initDemo() {
  initProjectTimeline();
  initVersionsTimeline();
}

function initProjectTimeline() {
  const container = document.getElementById(
    "project-timeline",
  ) as HTMLDivElement;
  projectTimeline = new D3Timeline(container);

  // 添加时间线
  projectTimeline.addTimeline("产品运营", "#4facfe", "stage3");
  projectTimeline.addTimeline("市场推广", "#f093fb", "stage2");
  projectTimeline.addTimeline("项目开发", "#667eea", "stage1");

  // 添加示例事件
  projectTimeline.addEvents([
    {
      title: "项目启动",
      description: "正式开始项目开发",
      startTime: new Date("2026-01-15"),
      color: "#667eea",
      timelineId: "stage1",
    },
    {
      title: "功能开发",
      description: "核心功能开发",
      startTime: new Date("2026-01-25"),
      color: "#667eea",
      timelineId: "stage1",
    },
    {
      title: "项目内测",
      description: "项目内部使用",
      startTime: new Date("2026-02-10"),
      color: "#667eea",
      timelineId: "stage1",
    },
    // ===== 市场推广阶段（项目试用后启动）=====
    {
      title: "推广策划",
      description: "制定市场推广策略",
      startTime: new Date("2026-03-05"),
      color: "#f093fb",
      timelineId: "stage2",
    },
    {
      title: "内容制作",
      description: "制作推广物料和内容",
      startTime: new Date("2026-03-15"),
      color: "#f093fb",
      timelineId: "stage2",
    },
    {
      title: "渠道投放",
      description: "多渠道推广投放",
      startTime: new Date("2026-04-01"),
      color: "#f093fb",
      timelineId: "stage2",
    },
    {
      title: "效果分析",
      description: "分析推广效果数据",
      startTime: new Date("2026-04-20"),
      color: "#f093fb",
      timelineId: "stage2",
    },

    // ===== 产品运营阶段（推广开始后启动）=====
    {
      title: "运营规划",
      description: "制定产品运营方案",
      startTime: new Date("2026-03-10"),
      color: "#4facfe",
      timelineId: "stage3",
    },
    {
      title: "用户反馈收集",
      description: "收集用户试用反馈",
      startTime: new Date("2026-03-25"),
      color: "#4facfe",
      timelineId: "stage3",
    },
    {
      title: "数据分析",
      description: "用户行为数据分析",
      startTime: new Date("2026-04-15"),
      color: "#4facfe",
      timelineId: "stage3",
    },
    {
      title: "运营优化",
      description: "优化运营策略",
      startTime: new Date("2026-05-01"),
      color: "#4facfe",
      timelineId: "stage3",
    },
    {
      title: "用户回访",
      description: "阶段性用户回访",
      startTime: new Date("2026-05-05"),
      endTime: new Date("2026-05-15"),
      color: "#4facfe",
      timelineId: "stage3",
    },
  ]);

  // 缩放控制
  const zoomSlider = document.getElementById("zoomSlider") as HTMLInputElement;
  const zoomValue = document.getElementById("zoomValue") as HTMLSpanElement;

  zoomSlider.addEventListener("input", (e) => {
    const zoom = parseFloat((e.target as any).value);
    projectTimeline.setZoom(zoom);
    zoomValue.textContent = zoom.toFixed(1) + "x";
  });

  // 监听D3缩放事件来更新滑块
  projectTimeline.on("zoom.end", ({ scale }) => {
    zoomSlider.value = String(scale);
    zoomValue.textContent = scale.toFixed(1) + "x";
  });

  projectTimeline.on("click", ({ data }) => {
    logEvent(`"${data.title}"被点击`, "system");
  });

  logEvent("D3.js时间轴初始化完成", "system");
}

function initVersionsTimeline() {
  const container = document.getElementById(
    "versions-timeline",
  ) as HTMLDivElement;
  versionsTimeline = new D3Timeline(container);

  // 添加时间线
  versionsTimeline.addTimeline("项目内测", "#4facfe", "beta_line");
  versionsTimeline.addTimeline("功能开发", "#f093fb", "develop_line");
  versionsTimeline.addTimeline("项目启动", "#667eea", "start_line");

  versionsTimeline.addEvents([
    {
      title: "项目启动(第一阶段)",
      description: "启动项目开发的第一阶段",
      startTime: new Date("2026-01-15"),
      color: "#667eea",
      timelineId: "start_line",
      stage: { id: 1, index: 0 },
    },
    {
      title: "功能开发(第一阶段)",
      description: "功能开发",
      startTime: new Date("2026-01-21"),
      color: "#f093fb",
      timelineId: "develop_line",
      stage: { id: 1, index: 1 },
    },
    {
      title: "项目内测(第一阶段)",
      description: "项目内测",
      startTime: new Date("2026-02-25"),
      color: "#4facfe",
      timelineId: "beta_line",
      stage: { id: 1, index: 2 },
    },
    {
      title: "项目启动(第二阶段)",
      description: "启动项目开发的第二阶段",
      startTime: new Date("2026-02-01"),
      color: "#667eea",
      timelineId: "start_line",
      stage: { id: 2, index: 0 },
    },
    {
      title: "功能开发(第二阶段)",
      description: "功能开发",
      startTime: new Date("2026-02-10"),
      color: "#f093fb",
      timelineId: "develop_line",
      stage: { id: 2, index: 1 },
    },
    {
      title: "项目内测(第二阶段)",
      description: "项目内测",
      startTime: new Date("2026-03-10"),
      color: "#4facfe",
      timelineId: "beta_line",
      stage: { id: 2, index: 2 },
    },
    {
      title: "项目启动(第三阶段)",
      description: "启动项目开发的第三阶段",
      startTime: new Date("2026-03-15"),
      color: "#667eea",
      timelineId: "start_line",
      stage: { id: 3, index: 0 },
    },
    {
      title: "功能开发(第三阶段)",
      description: "功能开发",
      startTime: new Date("2026-03-21"),
      color: "#f093fb",
      timelineId: "develop_line",
      stage: { id: 3, index: 1 },
    },
    {
      title: "项目内测(第三阶段)",
      description: "项目内测",
      startTime: new Date("2026-04-21"),
      color: "#4facfe",
      timelineId: "beta_line",
      stage: { id: 3, index: 2 },
    },
  ]);
}

function addRandomEvent() {
  if (projectTimeline.getTimelines().length === 0) {
    logEvent("请先添加时间线", "warning");
    return;
  }

  const timelineIndex = Math.floor(
    Math.random() * projectTimeline.getTimelines().length,
  );
  const selectedTimeline = projectTimeline.getTimelines()[timelineIndex];

  const startDate = new Date("2026-01-01");
  const endDate = new Date("2026-12-31");
  const randomDate = new Date(
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime()),
  );

  const event = projectTimeline.addEvent(
    {
      title: `事件 ${Math.floor(Math.random() * 100)}`,
      description: "这是一个随机添加的事件",
      startTime: randomDate,
      color: selectedTimeline.color,
    },
    selectedTimeline.id,
  );

  logEvent(
    `在时间线 "${selectedTimeline.name}" 上添加了事件: ${event?.title}`,
    "point",
  );
}

function addRandomRangeEvent() {
  if (projectTimeline.getTimelines().length === 0) {
    logEvent("请先添加时间线", "warning");
    return;
  }

  const timelineIndex = Math.floor(
    Math.random() * projectTimeline.getTimelines().length,
  );
  const selectedTimeline = projectTimeline.getTimelines()[timelineIndex];

  const startDate = new Date("2026-01-01");
  const endDate = new Date("2026-12-31");
  const startTime = new Date(
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime()),
  );
  const endTime = new Date(
    startTime.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000,
  );

  const event = projectTimeline.addEvent(
    {
      title: `范围事件 ${Math.floor(Math.random() * 100)}`,
      description: "这是一个随机添加的范围事件",
      startTime: startTime,
      endTime: endTime,
      color: selectedTimeline.color,
    },
    selectedTimeline.id,
  );

  logEvent(
    `在时间线 "${selectedTimeline.name}" 上添加了范围事件: ${event?.title}`,
    "range",
  );
}

function addTimeline() {
  const colors = [
    "#667eea",
    "#f093fb",
    "#4facfe",
    "#43e97b",
    "#fa709a",
    "#fee140",
  ];
  const names = ["开发", "设计", "测试", "运维", "市场", "销售"];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomName = names[Math.floor(Math.random() * names.length)] + "时间线";

  const newTimeline = projectTimeline.addTimeline(randomName, randomColor);
  logEvent(`添加了新的时间线: ${newTimeline.name}`, "system");
}

function removeTimeline() {
  if (projectTimeline.getTimelines().length > 0) {
    const removedTimeline =
      projectTimeline.getTimelines()[projectTimeline.getTimelines().length - 1];
    projectTimeline.removeTimeline(removedTimeline.id);
    logEvent(`删除了时间线: ${removedTimeline.name}`, "system");
  } else {
    logEvent("没有可删除的时间线", "warning");
  }
}

function resetView() {
  projectTimeline.resetView();
  const zoomSlider = document.getElementById("zoomSlider") as HTMLInputElement;
  zoomSlider.value = "1";
  const zoomValue = document.getElementById("zoomValue") as HTMLSpanElement;
  zoomValue.textContent = "1.0x";
  logEvent("视图已重置", "system");
}

function exportData() {
  const data = projectTimeline.exportDataString();
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "projectTimeline-data.json";
  a.click();
  URL.revokeObjectURL(url);
  logEvent("数据已导出", "system");
}

function importData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = (e.target as any).files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textContent = (e.target as any).result;
        const success = projectTimeline.importDataString(textContent);
        if (success) {
          logEvent("数据导入成功", "system");
        } else {
          logEvent("数据导入失败", "error");
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

function toggleStageLines() {
  versionsTimeline.isStageLineVisible
    ? versionsTimeline.hideStageLines()
    : versionsTimeline.showStageLines();
}

function changeLocale(newLocale: Locale) {
  projectTimeline.changeLocale(newLocale);
  versionsTimeline.changeLocale(newLocale);
}

function logEvent(message: any, type = "info") {
  const timestamp = new Date().toLocaleTimeString("zh-CN");
  const logEntry = { message, type, timestamp };
  eventLog.unshift(logEntry);

  if (eventLog.length > 20) {
    eventLog = eventLog.slice(0, 20);
  }

  updateEventLogDisplay();
}

function updateEventLogDisplay() {
  const logContainer = document.getElementById("eventLog") as HTMLDivElement;
  logContainer.innerHTML = eventLog
    .map(
      (entry) => `
    <div class="event-item ${entry.type === "range" ? "range" : ""}">
        <strong>[${entry.timestamp}]</strong> ${entry.message}
    </div>
`,
    )
    .join("");
}

// 初始化演示
document.addEventListener("DOMContentLoaded", initDemo);

window.addRandomEvent = addRandomEvent;
window.addRandomRangeEvent = addRandomRangeEvent;
window.addTimeline = addTimeline;
window.removeTimeline = removeTimeline;
window.resetView = resetView;
window.exportData = exportData;
window.importData = importData;
window.toggleStageLines = toggleStageLines;
window.changeLocale = changeLocale;
