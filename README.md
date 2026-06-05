# 🤖 AI办公助手

> 用 AI 一键生成专业周报、日报、工作总结。告别加班写汇报，解放你的双手。

## ✨ 功能

- 📋 **周报生成器** — 自动分为"本周完成/进行中/下周计划"
- 📝 **日报生成器** — 简洁清晰，重点突出
- 📊 **工作总结** — 概述+成果+反思+规划
- ⚡ **流式输出** — 实时看到生成过程
- 🌗 **暗色/亮色主题** — 自动适配系统偏好
- 🔒 **隐私安全** — API Key 仅存本地浏览器
- 📱 **移动端适配** — 手机也能用

## 🛠 技术栈

- **Next.js 16** + TypeScript
- **Tailwind CSS** + shadcn/ui
- **OpenAI GPT-4o-mini** API
- **Vercel** 免费部署

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/luweiCN/ai-office-helper.git
cd ai-office-helper
npm install
```

### 2. 配置 API Key

启动后在页面右上角输入你的 OpenAI API Key（以 `sk-` 开头），会自动保存到浏览器本地。

> 没有 API Key？去 [platform.openai.com](https://platform.openai.com/api-keys) 注册获取。

### 3. 启动开发

```bash
npm run dev
```

打开 http://localhost:3000 即可使用。

## 🌐 部署到 Vercel（免费）

1. Fork 本仓库到你自己的 GitHub
2. 打开 [vercel.com/new](https://vercel.com/new)
3. 选择你 Fork 的仓库
4. 点 Deploy，等待完成
5. 获得一个 `xxx.vercel.app` 的免费域名

无需配置环境变量，API Key 由用户在页面自行输入。

## 💰 变现思路

- **按次收费**：接入微信/支付宝支付，¥1-2/次
- **会员制**：¥9.9/月无限使用
- **定制开发**：帮企业定制内部版，¥500+
- **卖源码**：作为模板出售给其他开发者

## 📄 开源协议

MIT License — 可自由使用、修改、转售。
