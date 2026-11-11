import { LANG_KEY, storageGet } from "./storage.js";

const UI = {
  es: {
    title: "Prompt Atelier — Ingeniería de prompts",
    description: "Roadmap de ingeniería de prompts: anatomía, técnicas, patrones, software y agentes.",
    nav: "Contenido",
    toLight: "Cambiar a claro",
    toDark: "Cambiar a oscuro",
    language: "Idioma"
  },
  en: {
    title: "Prompt Atelier — Prompt engineering",
    description: "A prompt engineering roadmap: anatomy, techniques, patterns, software, and agents.",
    nav: "Contents",
    toLight: "Switch to light",
    toDark: "Switch to dark",
    language: "Language"
  }
};

const EN = {
  "skip": "Skip to content",
  "toc.label": "On this page",
  "toc.home": "Start",
  "toc.1": "Anatomy",
  "toc.2": "Techniques",
  "toc.3": "Patterns",
  "toc.4": "Software",
  "toc.5": "Agents",
  "toc.6": "Method",
  "toc.7": "Examples",
  "toc.8": "Skill",
  "toc.apply": "Apply",
  "hero.note1": "A prompt",
  "hero.frame": "CRISPE · universal structure",
  "hero.prompt": "<span>$</span>Role: senior software architect, AWS\n<span>$</span>Context: monolith → microservices\n<span>$</span>Task: design the network architecture\n<span>$</span>Constraints: no SQL, 500 words max\n<span>$</span>Format: Markdown table + commented code",
  "hero.note2": "is a document.",
  "hero.kicker": "Roadmap",
  "hero.title": "Prompt engineering, from draft to system.",
  "hero.lede": "The full roadmap for learning prompt engineering, from the fundamentals to architecture and agents. A professional prompt is rarely a single sentence.",
  "hero.cta1": "Start at phase 1",
  "hero.cta2": "Jump to the method",
  "step.1": "Anatomy",
  "step.2": "Techniques",
  "step.3": "Patterns",
  "step.4": "Software",
  "step.5": "Agents",
  "step.6": "Method",
  "f1.kicker": "Phase 01 · Basics",
  "f1.title": "Fundamentals and prompt anatomy",
  "f1.lede": "Advanced techniques wait until the base structure is solid. A professional prompt is a structured document.",
  "f1.anatomy": "The standard anatomy",
  "f1.role.label": "Role",
  "f1.role.title": "Persona",
  "f1.role.body": "Who the model should be.",
  "f1.role.ex": "Act as a senior software architect who specializes in AWS.",
  "f1.ctx.label": "Context",
  "f1.ctx.title": "Background",
  "f1.ctx.body": "The problem, not the wish.",
  "f1.ctx.ex": "We are migrating a monolith to microservices.",
  "f1.task.label": "Task",
  "f1.task.title": "Instruction",
  "f1.task.body": "The exact action it must take.",
  "f1.task.ex": "Design the network architecture.",
  "f1.limit.label": "Constraints",
  "f1.limit.title": "Limits",
  "f1.limit.body": "What stays out, with a measurable cap.",
  "f1.limit.ex": "Do not use relational databases. Limit the answer to 500 words.",
  "f1.format.label": "Format",
  "f1.format.title": "Output",
  "f1.format.body": "How you want the answer, not only what it should say.",
  "f1.format.ex": "Return a Markdown table and the code in commented blocks.",
  "f1.skills": "Base skills",
  "f1.s1.title": "Systematic thinking",
  "f1.s1.body": "Break a complex problem into simple variables.",
  "f1.s2.title": "Linguistic precision",
  "f1.s2.body": "Remove ambiguity. The model has no human common sense; it assumes only what is written.",
  "f1.s3.title": "Iterative mindset",
  "f1.s3.body": "The first prompt is a draft. Adjust it from the hallucinations or drift in the first answer.",
  "f2.kicker": "Phase 02 · Intermediate",
  "f2.title": "Prompting techniques and styles",
  "f2.lede": "Proven methods for steering the reasoning of large language models.",
  "f2.shot.title": "Zero-shot and few-shot",
  "f2.shot.zero": "<strong>Zero-shot.</strong> Ask for a task with no prior examples. It works for common tasks.",
  "f2.shot.few": "<strong>Few-shot.</strong> Put 2 to 5 input-output examples inside the prompt. The fastest way to set tone, format, and style without describing them in the abstract.",
  "f2.cot.title": "Chain-of-Thought",
  "f2.cot.body": "Forces the model to unpack its logic before the final answer. It cuts hallucinations in math and logic.",
  "f2.cot.phrase": "“Think step by step” or “Unpack your reasoning before the final verdict.”",
  "f2.cot.zero": "<strong>Zero-shot CoT.</strong> Add “Let's think step by step” at the end of the prompt.",
  "f2.iter.title": "Iterative and heuristic prompting",
  "f2.iter.heur": "<strong>Heuristics.</strong> Critical instructions go last: LLMs have a recency bias. Separate context from instructions with clear delimiters (<code>###</code>, <code>\"\"\"</code>, tags).",
  "f2.iter.loop": "<strong>Iteration.</strong> Prompt, evaluate, refine. If the model is verbose, add a length limit. If it invents data: “Answer only from the text provided.”",
  "f2.code.label": "Delimiters · context kept apart from the order",
  "f2.code.body": "### Instructions\nAnswer only from the text provided. 120 words maximum.\n\n\"\"\"\n[paste the source text here]\n\"\"\"\n\n<data>\n[tables, logs, or fragments that must not mix with the order]\n</data>\n\nLet's think step by step.",
  "f3.kicker": "Phase 03 · Professional",
  "f3.title": "Advanced patterns and protocols",
  "f3.lede": "To scale, use documented patterns, the same way software engineering uses design patterns.",
  "f3.flip.title": "The model interviews you",
  "f3.flip.body": "You ask it to question you until it has enough information to finish the task.",
  "f3.flip.ex": "Ask me one question at a time about my business until you can write a perfect marketing plan.",
  "f3.meta.title": "A prompt that writes another",
  "f3.meta.body": "Use one LLM to write a prompt for another LLM. The first designs the brief; the second runs it.",
  "f3.self.title": "Several paths, one conclusion",
  "f3.self.body": "The model writes several answers to the same question, compares the lines of thought, and keeps the most frequent or logical conclusion.",
  "f3.tot.title": "Branches with a way back",
  "f3.tot.body": "It explores branches of reasoning, estimates their chance of success, and backs out if a branch is a dead end. Useful for strategic planning.",
  "f4.kicker": "Phase 04 · Software",
  "f4.title": "Prompting for development",
  "f4.lede": "Programming demands absolute precision and control of the context. Every case gets a protocol before the code.",
  "f4.gen.label": "Generation from scratch",
  "f4.gen.title": "Stack, pattern, names",
  "f4.gen.body": "Name the exact stack (versions and libraries), the design pattern (MVC, Singleton), and the naming conventions.",
  "f4.gen.codeLabel": "Example",
  "f4.gen.code": "Write a functional React component\nusing TypeScript and Tailwind CSS.\nUse hooks. Do not include explanations,\nonly the code.",
  "f4.debug.title": "Failure, trace, expected",
  "f4.debug.body": "Include the failing code, the exact error message (stack trace), and the expected behavior.",
  "f4.debug.code": "Analyze the following stack trace step by\nstep, identify the failing line,\nexplain why it fails, and then provide\nthe corrected code.",
  "f4.ref.label": "Refactoring",
  "f4.ref.title": "The metric comes first",
  "f4.ref.1": "Reduce cyclomatic complexity?",
  "f4.ref.2": "Make it more readable?",
  "f4.ref.3": "Align it with SOLID?",
  "f4.ref.body": "Without that metric, “improve it” is not a task.",
  "f4.test.label": "Tests · TDD",
  "f4.test.title": "Cases, not empty coverage",
  "f4.test.body": "Pass the production code and ask for concrete cases: edge cases and the happy path, with a named framework (Jest, PyTest).",
  "f5.kicker": "Phase 05 · Agents",
  "f5.title": "The same prompt does not fit every model",
  "f5.lede": "Adapt the heuristics to the agent. The format the model read in training is the one to use.",
  "f5.gpt.1": "Responds well to context structured in Markdown.",
  "f5.gpt.2": "A sharply defined role anchors it.",
  "f5.gpt.3": "It follows complex instructions in a single block.",
  "f5.claude.1": "Trained to read XML: wrap context, instructions, and data in tags.",
  "f5.claude.2": "Use <code>&lt;context&gt;</code>, <code>&lt;instructions&gt;</code>, and <code>&lt;examples&gt;</code>.",
  "f5.claude.3": "A large context window. Stronger on code and long documents.",
  "f5.gem.1": "Huge context windows and multimodal input (video and image).",
  "f5.gem.2": "Useful for a whole repository or a massive manual in one prompt.",
  "f5.gem.3": "Responds well to direct examples and clear lists.",
  "f5.code.label": "Claude envelope · the tags from this phase",
  "f5.code.body": "<context>\nWe are migrating a monolith to microservices.\n</context>\n\n<instructions>\nAct as a senior software architect who specializes in AWS.\nDesign the network architecture.\nDo not use relational databases. 500 words maximum.\nReturn a Markdown table and the code in commented blocks.\n</instructions>\n\n<examples>\nInput: an orders service coupled to a single database.\nOutput: a table of network boundaries and one commented block per service.\n</examples>",
  "m.kicker": "06 · Craft",
  "m.title": "A professional working method",
  "m.lede": "How prompt engineering stops being a trick and becomes an engineering process inside a company.",
  "m.v.title": "Version control",
  "m.v.body": "Complex prompts live in a repository (GitHub) or a prompt manager.",
  "m.pipe.title": "Modularization",
  "m.pipe.body": "One prompt classifies, another extracts data, a third drafts.",
  "m.pipe.1": "Classify",
  "m.pipe.2": "Extract",
  "m.pipe.3": "Draft",
  "m.eval.title": "Evaluation",
  "m.eval.body": "Measure whether version 2 of a prompt beats version 1 against a test set.",
  "m.skip": "Drop the trick.",
  "m.struck.1": "a 2,000-word mega-prompt",
  "m.struck.2": "prompts with no history",
  "m.struck.3": "“I like it better”",
  "m.instead": "a versioned, measured pipeline.",
  "ex.kicker": "Examples",
  "ex.title": "One prompt for each piece of the guide",
  "ex.lede": "Each block below is a phase's rule, written as a prompt. The last two put the roadmap together: the same brief, weak and effective.",
  "ex.f1": "Phase 01 · Anatomy",
  "ex.f1.label": "Role, context, one task, constraints, format",
  "ex.f1.code": "Role: Act as a senior software architect who specializes in AWS.\nContext: We are migrating a monolith to microservices.\nTask: Design the network architecture.\nConstraints: Do not use relational databases. Limit the answer to 500 words.\nFormat: Return a Markdown table and the code in commented blocks.",
  "ex.f2": "Phase 02 · Techniques",
  "ex.f2.few": "Two to five input-output pairs. The tone lives in the examples, not in a description.",
  "ex.f2.few.code": "Classify the ticket. Answer with one word only: bug, question, or order.\n\nInput: The checkout screen stays blank.\nOutput: bug\n\nInput: Can I pay by bank transfer?\nOutput: question\n\nInput: I want two units of the same order.\nOutput: order",
  "ex.f2.cot": "The reasoning line goes at the end. Use it for logic, not for a common task.",
  "ex.f2.cot.code": "Three services share one database and the peak is 2,000 req/s.\nWhich one do you split first?\nBreak down your reasoning before the final verdict.\nLet's think step by step.",
  "ex.f2.del.label": "Delimiters",
  "ex.f2.del": "The critical order stays last. The source text does not mix with the instruction. If it invents data, close that door.",
  "ex.f2.del.code": "### Instructions\nAnswer only from the text provided. 120 words maximum.\n\n\"\"\"\nPeak: 2,000 req/s. Team of 6. No relational databases.\n\"\"\"\n\nLet's think step by step.",
  "ex.f3": "Phase 03 · Patterns",
  "ex.f3.flip": "One question at a time, then wait. Not a full questionnaire.",
  "ex.f3.flip.code": "Ask me questions one at a time about my business until you can draft a marketing plan.\nWait for my answer before the next question.",
  "ex.f3.meta": "The first model writes the prompt. It does not do the job.",
  "ex.f3.meta.code": "Write a prompt for another model.\nIt must ask only for the network architecture, with a role, context, one task, a 500-word cap, and a Markdown table.\nDo not design the architecture. Return the prompt.",
  "ex.f3.tree": "Several routes, one discarded, the one that closes stays. This is for planning, not for classifying a ticket.",
  "ex.f3.tree.code": "Produce three routes for splitting the orders monolith.\nEstimate which one has a way out.\nDrop the one that does not close and keep the strongest.",
  "ex.f4": "Phase 04 · Software",
  "ex.f4.gen.label": "From scratch",
  "ex.f4.gen.code": "Write a functional React component\nusing TypeScript and Tailwind CSS.\nUse hooks. Do not include explanations,\nonly the code.",
  "ex.f4.debug.code": "Analyze the following stack trace step by\nstep, identify the failing line,\nexplain why it fails, then provide\nthe corrected code.",
  "ex.f4.ref.label": "Refactor",
  "ex.f4.ref.code": "Metric: reduce cyclomatic complexity.\nRewrite the function without changing its behavior.\nDo not use “improve it” as the criterion.",
  "ex.f4.test.label": "Tests",
  "ex.f4.test.code": "Write Jest tests.\nCover the happy path and this edge case:\nif items is undefined, the total is 0.",
  "ex.f5": "Phase 05 · Models",
  "ex.f5.gpt": "Markdown, a defined role, and a single block.",
  "ex.f5.gpt.code": "# Role\nSenior software architect, AWS.\n\n# Context\nOrders monolith moving to microservices.\n\n# Task\nDesign only the network architecture.\n\n# Output\nOne Markdown table. 500 words maximum.",
  "ex.f5.claude": "The three tags separate context, order, and example.",
  "ex.f5.claude.code": "<contexto>\nWe are migrating a monolith to microservices.\n</contexto>\n\n<instrucciones>\nAct as a senior software architect who specializes in AWS.\nDesign the network architecture.\nDo not use relational databases. 500 words maximum.\n</instrucciones>\n\n<ejemplos>\nInput: an orders service coupled to a single database.\nOutput: a table of network boundaries, one row per service.\n</ejemplos>",
  "ex.f5.gem": "One direct example, one list, and the whole manual fits in the same prompt.",
  "ex.f5.gem.code": "Read the manual below this order.\nReturn a list:\n- boundary\n- reason\n\nExample:\nInput: a service coupled to a single database.\nOutput: one bullet with the boundary and the reason.\n\n[the full manual goes here]",
  "ex.m": "Phase 06 · Method",
  "ex.m.pipe.label": "Pipeline",
  "ex.m.pipe": "Three prompts. None of them does the other two jobs.",
  "ex.m.pipe.code": "1. Classify\nLabel each module: order, payment, or inventory.\n\n2. Extract\nPull the peak, the team size, and the databases that are cited.\nDo not invent figures.\n\n3. Draft\nWrite only the network architecture table.\n500 words maximum.",
  "ex.m.eval.label": "Evaluation",
  "ex.m.eval": "Version 2 is measured against version 1 on a set. “I like it better” does not count.",
  "ex.m.eval.code": "Compare prompt v2 with v1 on these 10 tickets.\nCount how many stay within 500 words\nand do not invent figures.\nDo not say which one you like better.",
  "ex.close": "The ones that close the roadmap",
  "ex.close.lede": "The same brief, twice. The effective version uses the pieces above in one prompt and leaves out the work that belongs in the next one.",
  "ex.arch": "Architecture, one task only",
  "ex.bad": "Weak prompt",
  "ex.good": "Effective version",
  "ex.arch.bad": "Build the architecture for my app, the code, the tests, and the marketing plan. Make it nice.",
  "ex.arch.bad1": "Five tasks in one sentence. No role, context, limit, or format.",
  "ex.arch.bad2": "“Make it nice” is not a metric. The model invents the rest.",
  "ex.arch.good": [
    "Role: Act as a senior software architect who specializes in AWS.",
    "",
    "### Context",
    "\"\"\"",
    "We are migrating an orders monolith to microservices.",
    "Peak: 2,000 req/s. Team of 6. No relational databases.",
    "\"\"\"",
    "",
    "Task: Design only the network architecture.",
    "Do not write code, tests, or marketing: those are separate prompts.",
    "",
    "Constraints:",
    "- Do not use relational databases.",
    "- Do not invent figures that are not in the context.",
    "- 500 words maximum.",
    "",
    "Format: one Markdown table (service, boundary, reason).",
    "",
    "Example:",
    "Input: an orders service coupled to a single database.",
    "Output: a table of network boundaries, one row per service.",
    "",
    "If a fact is missing, ask one question and wait.",
    "Produce three routes, drop the one that does not close, and keep the strongest.",
    "Answer only from the text provided.",
    "Let's think step by step."
  ].join("\n"),
  "ex.code": "Debugging, with the context in hand",
  "ex.code.bad": "Fix this React bug.",
  "ex.code.bad1": "No code, no stack trace, no expected behavior.",
  "ex.code.bad2": "Without a stack or a test framework, the fix cannot be checked.",
  "ex.code.good": [
    "Role: TypeScript reviewer.",
    "Stack: React 18, TypeScript 5, Jest. Functional component, hooks only.",
    "",
    "### Code",
    "\"\"\"",
    "function Total({ items }) {",
    "  return items.reduce((sum, item) => sum + item.price);",
    "}",
    "\"\"\"",
    "",
    "### Exact error",
    "\"\"\"",
    "TypeError: Cannot read properties of undefined (reading 'reduce')",
    "\"\"\"",
    "",
    "Expected: if items is undefined, return 0.",
    "Metric: cover the happy path and that edge case in Jest.",
    "",
    "Analyze the stack trace step by step, identify the line,",
    "explain why it fails, then return the corrected code and the tests.",
    "Answer only from the code and the error provided."
  ].join("\n"),
  "sk.kicker": "Skill",
  "sk.title": "Review against the examples page",
  "sk.lede": "revise-prompt has no second list. It checks the draft against the pieces of the guide and, if you ask for a correction, shapes it like the prompts on Examples.",
  "sk.case": "On the weak architecture prompt",
  "sk.case.in": "What you paste",
  "sk.case.prompt": "Correct this prompt:\nBuild the architecture for my app, the code, the tests, and the marketing plan. Make it nice.",
  "sk.case.out": "What it returns",
  "sk.case.reply": "## Verdict\nIt does not hold: four jobs and no metric.\n\n## Gaps\n- Phase 1 — Task: architecture, code, tests, and marketing in one sentence.\n- Phase 1 — Constraints: “Make it nice” cannot be measured.\n- Method — Modularization: code and marketing belong in other prompts.\n\n## Prompt\nThe effective architecture version, on the examples page.",
  "sk.review.title": "Review",
  "sk.review.body": "If you only ask what is wrong, it returns the verdict and the gaps. It does not rewrite.",
  "sk.fix.title": "Correct",
  "sk.fix.body": "If you ask to improve it, the new prompt follows the effective example: role, delimited context, one task, constraints, format, and the critical order last.",
  "sk.split.title": "Split",
  "sk.split.body": "If the draft does more than one job, it cuts it the way the phase 06 pipeline does: one classifies, another extracts, a third drafts.",
  "sk.ask": "How to ask",
  "sk.ask.label": "Phrases that trigger it",
  "sk.ask.code": "Review this prompt.\nImprove this prompt.\nCorrect this prompt.\nSuggest a prompt to design only the network architecture.",
  "sk.list.title": "What it compares",
  "sk.list.body": "Anatomy, technique, pattern, software, model, and method, in that order. Few-shot only when the tone must match the example. Chain-of-thought at the end only for logic or debugging.",
  "sk.where.title": "Where it lives",
  "sk.where.body": ".cursor/skills/revise-prompt/ in this repository. The rubric ships with the guide.",
  "sk.lang.title": "Language",
  "sk.lang.body": "The answer comes back in the language of the draft. The piece names stay the ones on this page.",
  "footer.line": "A guide by <a href=\"https://github.com/AbdielFco\" rel=\"noreferrer\">AbdielFco</a>"
};

let spanish = {};
let nodes = [];

export function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function currentLang() {
  return document.documentElement.lang === "en" ? "en" : "es";
}

function paintChrome(lang) {
  const ui = lang === "en" ? UI.en : UI.es;
  document.title = ui.title;
  document.documentElement.lang = lang === "en" ? "en" : "es";
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute("content", ui.description);
  }
  const toc = document.querySelector("[data-toc]");
  if (toc) {
    toc.setAttribute("aria-label", ui.nav);
  }
  const themeButton = document.querySelector("[data-theme-toggle]");
  const light = currentTheme() === "light";
  if (themeButton) {
    themeButton.setAttribute("aria-pressed", light ? "true" : "false");
    themeButton.setAttribute("aria-label", light ? ui.toDark : ui.toLight);
  }
  const current = lang === "en" ? "en" : "es";
  const langTrigger = document.querySelector("[data-lang-trigger]");
  const langMenu = document.getElementById("lang-menu");
  const langCurrent = document.querySelector("[data-lang-current]");
  if (langTrigger) {
    langTrigger.setAttribute("aria-label", ui.language);
  }
  if (langMenu) {
    langMenu.setAttribute("aria-label", ui.language);
    langMenu.querySelectorAll("[data-lang]").forEach((button) => {
      button.setAttribute("aria-selected", button.getAttribute("data-lang") === current ? "true" : "false");
    });
  }
  if (langCurrent) {
    langCurrent.textContent = current === "en" ? "English" : "Español";
  }
}

export function applyCopy(lang) {
  const pack = lang === "en" ? EN : spanish;
  nodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!Object.prototype.hasOwnProperty.call(pack, key)) {
      console.error("prompt-atelier: missing copy", lang, key);
      return;
    }
    if (node.getAttribute("data-i18n-mode") === "html") {
      node.innerHTML = pack[key];
    } else {
      node.textContent = pack[key];
    }
  });
  paintChrome(lang);
}

export function initI18n() {
  nodes = Array.from(document.querySelectorAll("[data-i18n]"));
  spanish = {};
  nodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (Object.prototype.hasOwnProperty.call(spanish, key)) {
      return;
    }
    spanish[key] = node.getAttribute("data-i18n-mode") === "html" ? node.innerHTML : node.textContent;
  });
  applyCopy(storageGet(LANG_KEY) === "en" ? "en" : "es");
}
