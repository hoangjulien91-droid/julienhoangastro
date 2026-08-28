const { spawn } = require("child_process");
const WebSocket = require("ws");

const BROWSER_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BREAKPOINTS = [
  { name: "Mobile Compact", width: 320, height: 568, mobile: true },
  { name: "Mobile Standard (iPhone)", width: 390, height: 844, mobile: true },
  { name: "Tablette Portrait (iPad)", width: 768, height: 1024, mobile: false },
  { name: "Desktop Standard", width: 1280, height: 800, mobile: false }
];

const PAGES_TO_TEST = [
  "/",
  "/formation/pst",
  "/formation/pst/planning",
  "/formation/pst/106",
  "/formation/pst/108",
  "/formation/pst/120",
  "/formation/pst/123",
  "/formation/pst/124"
];

async function runResponsiveAudit() {
  console.log("=== PROTOCOLE RECETTE RESPONSIVE JULIENHOANG.COM (/formation/pst) ===");
  
  const port = 9226;
  const edgeProcess = spawn(BROWSER_PATH, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    "--disable-gpu",
    "--window-size=1440,900"
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const targetsRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const targets = await targetsRes.json();
    const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
    await new Promise((r) => ws.on("open", r));

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (data) => {
          const msg = JSON.parse(data);
          if (msg.id === msgId) {
            ws.off("message", handler);
            resolve(msg.result);
          }
        };
        ws.on("message", handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send("Page.enable");
    await send("DOM.enable");
    await send("Runtime.enable");

    const auditSummary = [];

    for (const bp of BREAKPOINTS) {
      await send("Emulation.setDeviceMetricsOverride", {
        width: bp.width,
        height: bp.height,
        deviceScaleFactor: 1,
        mobile: bp.mobile,
        screenOrientation: { angle: 0, type: "portraitPrimary" }
      });
      await send("Emulation.setTouchEmulationEnabled", { enabled: bp.mobile });

      let bpPassed = true;
      const issues = [];

      for (const pageUrl of PAGES_TO_TEST) {
        await send("Page.navigate", { url: `http://127.0.0.1:8789${pageUrl}` });
        await new Promise((r) => setTimeout(r, 400));

        const evalRes = await send("Runtime.evaluate", {
          expression: `(() => {
            const clientWidth = document.documentElement.clientWidth;
            const scrollWidth = document.documentElement.scrollWidth;
            const hasHorizontalScroll = scrollWidth > clientWidth;
            const overflowDiff = scrollWidth - clientWidth;

            return {
              clientWidth,
              scrollWidth,
              hasHorizontalScroll,
              overflowDiff
            };
          })()`,
          returnByValue: true
        });

        const data = evalRes.result.value;
        if (data.hasHorizontalScroll) {
          bpPassed = false;
          issues.push({ page: pageUrl, error: `Débordement horizontal : +${data.overflowDiff}px` });
        }
      }

      auditSummary.push({
        Breakpoint: bp.name,
        Largeur: `${bp.width}px`,
        PagesTestées: PAGES_TO_TEST.length,
        DébordementHorizontal: bpPassed ? "0 px (100% Fluide)" : "❌ DÉBORDEMENT",
        Statut: bpPassed ? "✅ PASS" : "❌ FAIL"
      });
    }

    ws.close();
    console.table(auditSummary);

  } finally {
    edgeProcess.kill();
  }
}

runResponsiveAudit();
