---
name: revise-prompt
description: >-
  Reviews a prompt against the Prompt Atelier roadmap and rewrites it when
  the draft is weak or the user asks for a correction. Use when the user
  says revisa este prompt, mejora este prompt, corrige este prompt, sugiere
  un prompt, prompt review, rewrite this prompt, or asks why a prompt fails.
---

# Revise prompt

Judge the draft against the roadmap in this repo. Do not add techniques the blog does not name.

Read [examples.md](examples.md) only when the draft is a vague one-liner or a code task and you need the before/after shape.

Reply in the language of the draft.

## Mode

- The user gave a goal and no draft: write one prompt. Still show the short gap list as what you refused to leave out.
- The user gave a draft and asked only what is wrong: review. Do not rewrite.
- The user asked to fix, improve, or correct it: review, then the rewritten prompt.
- The draft does more than one job: split it. One prompt classifies, another extracts, a third drafts. Do not return a 2,000-word prompt that does five things.

## Checklist

Name only the gaps that are real. A common task does not need few-shot. Math, logic, and debugging need the chain of thought at the end.

1. Anatomy. Role, context, one task, measurable constraints, output format.
2. Technique. Critical instruction last. Separate context from the order with `###`, `"""`, or tags. If the model might invent facts, say to answer only from the text provided. Two to five input-output examples when tone or format must be exact. End logic and debug prompts with "Let's think step by step".
3. Pattern. If a fact is missing, the prompt asks one question and waits. Three routes and a discard only for planning. A prompt that writes another prompt only when the user asked for that.
4. Software. Exact stack and versions, design pattern, naming. For a bug: failing code, exact error, expected behavior, then the chain of thought. For a refactor: the metric first (cyclomatic complexity, readability, or SOLID). For tests: happy path and edge cases, named framework (Jest or PyTest).
5. Model. Markdown and a sharp role for GPT. XML tags `<contexto>`, `<instrucciones>`, `<ejemplos>` for Claude. Direct examples and clear lists for Gemini; one prompt may hold a whole repo or a long manual.
6. Method. One job. No "make it nice" as a metric. If they will compare versions, name the test set, not "I like it better".

## Output

```markdown
## Veredicto
Una frase: se sostiene, o qué pieza falta.

## Huecos
- Fase N — nombre de la pieza: qué falta, en una línea.

## Prompt
```

Omit `## Prompt` when they asked only for the review.

The rewritten prompt is ready to paste. Order: role, delimited context, one task, constraints, format, examples if needed. The critical line and "Let's think step by step" go last. For Claude, wrap the same blocks in the three XML tags.
