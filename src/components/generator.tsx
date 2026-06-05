"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

type GeneratorType = "weekly" | "daily" | "summary";

const GENERATORS: Record<
  GeneratorType,
  { title: string; emoji: string; placeholder: string }
> = {
  weekly: {
    title: "周报生成器",
    emoji: "📋",
    placeholder:
      "输入本周工作要点，例如：\n- 完成了用户登录模块的开发\n- 修复了3个线上bug\n- 参加了项目评审会议",
  },
  daily: {
    title: "日报生成器",
    emoji: "📝",
    placeholder:
      "输入今天的工作内容，例如：\n- 写了接口文档\n- 联调了支付模块\n- code review了小王的PR",
  },
  summary: {
    title: "工作总结",
    emoji: "📊",
    placeholder:
      "输入这段时间的工作内容，例如：\n- 负责了新版APP的首页重构\n- 带领3人小组完成了sprint目标\n- 性能优化使页面加载速度提升40%",
  },
};

const STORAGE_KEY = "openai_api_key";

export function Generator({ type }: { type: GeneratorType }) {
  const { title, emoji, placeholder } = GENERATORS[type];
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleGenerate = useCallback(async () => {
    const apiKey = localStorage.getItem(STORAGE_KEY);
    if (!apiKey) {
      setOutput("❌ 请先在页面顶部配置 OpenAI API Key");
      return;
    }
    if (!input.trim()) {
      setOutput("❌ 请输入工作内容要点");
      return;
    }

    setLoading(true);
    setOutput("");

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, content: input, type }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "请求失败" }));
        setOutput(`❌ ${err.error || "请求失败，请检查API Key"}`);
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setOutput("❌ 响应异常");
        setLoading(false);
        return;
      }

      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setOutput(text);
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== "AbortError") {
        setOutput(`❌ 网络错误: ${e.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [input, type]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (loading && abortRef.current) {
      abortRef.current.abort();
    }
    setInput("");
    setOutput("");
  };

  return (
    <Card className="p-6 space-y-4 border-border">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          {title}
        </h2>
        <button
          onClick={handleReset}
          className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
        >
          清空重置
        </button>
      </div>

      <Textarea
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        className="resize-none"
      />

      <div className="flex gap-2">
        <Button onClick={handleGenerate} disabled={loading || !input.trim()}>
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> AI正在生成...
            </span>
          ) : (
            `✨ 生成${title.replace("生成器", "")}`
          )}
        </Button>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              生成结果
            </span>
            <button
              onClick={handleCopy}
              className="text-sm text-primary hover:underline cursor-pointer"
            >
              {copied ? "✅ 已复制" : "📋 复制"}
            </button>
          </div>
          <div className="bg-muted rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap min-h-[100px]">
            {output}
          </div>
        </div>
      )}
    </Card>
  );
}
