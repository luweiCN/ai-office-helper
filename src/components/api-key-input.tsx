"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "openai_api_key";

export function ApiKeyInput() {
  const [key, setKey] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(STORAGE_KEY) || "";
  });
  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(STORAGE_KEY);
  });

  const handleSave = () => {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
      setSaved(true);
    }
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setKey("");
    setSaved(false);
  };

  if (saved) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
        <span>API Key 已配置</span>
        <button
          onClick={handleClear}
          className="text-primary hover:underline cursor-pointer"
        >
          重新设置
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="password"
        placeholder="输入 OpenAI API Key（sk-...）"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="max-w-xs"
      />
      <Button size="sm" onClick={handleSave} disabled={!key.trim()}>
        保存
      </Button>
    </div>
  );
}
