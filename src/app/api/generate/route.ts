import { NextRequest } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPTS: Record<string, string> = {
  weekly: `你是一位专业的职场助手。用户会提供本周的工作内容要点，请帮ta生成一份结构清晰、专业得体的周报。

要求：
1. 分为"本周完成工作"、"进行中工作"、"下周计划"三个部分
2. 语言专业但不生硬，突出工作成果和价值
3. 适当润色，让普通工作也显得有分量
4. 控制在300-500字
5. 使用中文输出`,

  daily: `你是一位专业的职场助手。用户会提供今天的工作内容要点，请帮ta生成一份简洁清晰的日报。

要求：
1. 分为"今日完成"和"明日计划"两部分
2. 语言简洁、重点突出
3. 每项工作用一句话概括，不超过150字
4. 使用中文输出`,

  summary: `你是一位专业的职场助手。用户会提供一段时间的工作内容要点，请帮ta生成一份正式的工作总结。

要求：
1. 包含"工作概述"、"主要成果"、"经验与反思"、"下一步规划"四个部分
2. 语言正式、有高度，体现专业素养
3. 善于从日常工作中提炼亮点和价值
4. 控制在500-800字
5. 使用中文输出`,
};

export async function POST(request: NextRequest) {
  const { apiKey, content, type } = await request.json();

  if (!apiKey || !content || !type) {
    return new Response(
      JSON.stringify({ error: "缺少必要参数" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const systemPrompt = SYSTEM_PROMPTS[type];
  if (!systemPrompt) {
    return new Response(
      JSON.stringify({ error: "无效的类型" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const openai = new OpenAI({ apiKey });

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content },
    ],
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) {
          controller.enqueue(encoder.encode(text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
