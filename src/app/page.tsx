"use client";

import { useState } from "react";
import { Generator } from "@/components/generator";
import { ApiKeyInput } from "@/components/api-key-input";

type Tab = "weekly" | "daily" | "summary";

const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: "weekly", label: "周报", emoji: "📋" },
  { key: "daily", label: "日报", emoji: "📝" },
  { key: "summary", label: "工作总结", emoji: "📊" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("weekly");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-2xl">🤖</span> AI办公助手
          </h1>
          <ApiKeyInput />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2 py-4">
          <h2 className="text-2xl font-bold">
            告别加班写周报，AI帮你一键搞定
          </h2>
          <p className="text-muted-foreground">
            输入工作要点，AI自动生成专业周报、日报、工作总结
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Generator */}
        <Generator type={activeTab} />

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 py-4">
          {[
            { icon: "⚡", title: "极速生成", desc: "3秒出稿" },
            { icon: "🎯", title: "专业表达", desc: "职场话术" },
            { icon: "🔒", title: "隐私安全", desc: "本地存储" },
          ].map((f) => (
            <div
              key={f.title}
              className="text-center p-3 rounded-lg bg-muted/50"
            >
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="text-sm font-medium">{f.title}</div>
              <div className="text-xs text-muted-foreground">{f.desc}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        AI办公助手 — 使用 OpenAI GPT-4o-mini 驱动 · 你的 API Key 仅在本地使用
      </footer>
    </div>
  );
}
