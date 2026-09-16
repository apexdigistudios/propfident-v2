"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Brain, User, Send, RefreshCw, Sparkles, CheckCircle2, TrendingUp, TrendingDown, ShieldAlert, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Message {
  sender: "bot" | "user";
  text?: string;
  type?: "text" | "result";
  data?: {
    pair: string;
    direction: "BUY" | "SELL";
    entry: string;
    stopLoss: string;
    takeProfit: string;
    rrRatio: string;
    notes: string;
  };
}

export function AITradePlanner() {
  const [step, setStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);

  // Trade Setup State
  const [pair, setPair] = useState<string>("EURUSD");
  const [direction, setDirection] = useState<"BUY" | "SELL">("BUY");
  const [entry, setEntry] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [takeProfit, setTakeProfit] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Inner Chat Box Container Ref
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll ONLY the inner chat box container
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const initChat = async () => {
      setIsTyping(true);
      await new Promise((r) => setTimeout(r, 1000));
      setMessages([
        {
          sender: "bot",
          text: "🧠 Welcome to the AI Pre-Trade Audit. Let's vet your trade setup against prop firm rules.",
        },
      ]);

      setIsTyping(true);
      await new Promise((r) => setTimeout(r, 1500));
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Which instrument or pair are you planning to trade?",
        },
      ]);
      setIsTyping(false);
      setStep(1);
    };

    initChat();
  }, []);

  const handleStep1Pair = async (selectedPair: string) => {
    setPair(selectedPair);
    setMessages((prev) => [...prev, { sender: "user", text: selectedPair }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000));
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: `Got it, ${selectedPair}. What is your position direction?` },
    ]);
    setIsTyping(false);
    setStep(2);
  };

  const handleStep2Direction = async (dir: "BUY" | "SELL") => {
    setDirection(dir);
    setMessages((prev) => [...prev, { sender: "user", text: dir }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000));
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "What is your planned Entry Price?" },
    ]);
    setIsTyping(false);
    setStep(3);
  };

  const handleStep3Entry = async () => {
    if (!entry) return;
    setMessages((prev) => [...prev, { sender: "user", text: `Entry: ${entry}` }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000));
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "What is your Stop Loss price?" },
    ]);
    setIsTyping(false);
    setStep(4);
  };

  const handleStep4StopLoss = async () => {
    if (!stopLoss) return;
    setMessages((prev) => [...prev, { sender: "user", text: `SL: ${stopLoss}` }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000));
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "What is your Take Profit target price?" },
    ]);
    setIsTyping(false);
    setStep(5);
  };

  const handleStep5TakeProfit = async () => {
    if (!takeProfit) return;
    setMessages((prev) => [...prev, { sender: "user", text: `TP: ${takeProfit}` }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000));
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Briefly mention your trade confluence or rationale (e.g., London session breakout, key support level).",
      },
    ]);
    setIsTyping(false);
    setStep(6);
  };

  const handleStep6Notes = async () => {
    const finalNotes = notes.trim() || "Technical price-action setup";
    setMessages((prev) => [...prev, { sender: "user", text: finalNotes }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1800));

    // Calculate R:R Ratio
    const entryNum = parseFloat(entry) || 0;
    const slNum = parseFloat(stopLoss) || 0;
    const tpNum = parseFloat(takeProfit) || 0;

    const risk = Math.abs(entryNum - slNum);
    const reward = Math.abs(tpNum - entryNum);
    const rrRatio = risk > 0 ? (reward / risk).toFixed(2) : "0.00";

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "✨ Audit complete! Here is your detailed pre-flight trade plan:" },
      {
        sender: "bot",
        type: "result",
        data: {
          pair,
          direction,
          entry,
          stopLoss,
          takeProfit,
          rrRatio,
          notes: finalNotes,
        },
      },
    ]);
    setIsTyping(false);
    setStep(7);
  };

  const handleReset = () => {
    setEntry("");
    setStopLoss("");
    setTakeProfit("");
    setNotes("");
    setMessages([]);
    setStep(0);
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        { sender: "bot", text: "🧠 Ready for another audit. Which asset are you trading?" },
      ]);
      setIsTyping(false);
      setStep(1);
    }, 1000);
  };

  return (
    <Card className="w-full border-border/60 bg-background/50 backdrop-blur-md shadow-2xl max-w-2xl mx-auto flex flex-col h-[580px]">
      <CardHeader className="border-b border-border/40 pb-3 shrink-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-mono text-sm font-semibold">
          <Brain className="h-4 w-4" />
          <span>AI TRADE PLANNER</span>
        </div>
        {step === 7 && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="font-mono text-xs gap-1">
            <RefreshCw className="h-3.5 w-3.5" /> Reset Audit
          </Button>
        )}
      </CardHeader>

      <CardContent
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {msg.sender === "user" ? (
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-xs">
                <User className="h-3.5 w-3.5" />
              </div>
            ) : (
              <div className="shrink-0 pt-0.5">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            )}

            {msg.type === "result" && msg.data ? (
              <div className="w-full max-w-md rounded-xl border border-primary/30 bg-surface/90 p-4 space-y-4 shadow-xl">
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> PRE-TRADE AUDIT PLAN
                  </span>
                  <Badge
                    variant="outline"
                    className={`font-mono text-[10px] ${
                      msg.data.direction === "BUY"
                        ? "border-emerald-500/30 text-emerald-500"
                        : "border-rose-500/30 text-rose-500"
                    }`}
                  >
                    {msg.data.pair} — {msg.data.direction}
                  </Badge>
                </div>

                {/* Detailed Plan Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 bg-muted/30 p-3 rounded-lg border border-border/40 text-[11px]">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase">Entry Level</span>
                    <span className="font-bold text-foreground">{msg.data.entry}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase">Stop Loss</span>
                    <span className="font-bold text-rose-500">{msg.data.stopLoss}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase">Take Profit</span>
                    <span className="font-bold text-emerald-500">{msg.data.takeProfit}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase">Risk : Reward</span>
                    <span
                      className={`font-bold ${
                        Number(msg.data.rrRatio) >= 1.5 ? "text-emerald-500" : "text-amber-500"
                      }`}
                    >
                      1 : {msg.data.rrRatio}
                    </span>
                  </div>
                </div>

                {/* Risk Evaluation */}
                {Number(msg.data.rrRatio) < 1.5 ? (
                  <div className="flex items-center gap-2 p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px]">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span>Low R:R Warning: Setup offers below standard 1:1.5 threshold.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px]">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Risk-to-Reward ratio satisfies strict prop management rules.</span>
                  </div>
                )}

                {/* Trade Confluence Summary */}
                <div className="p-3 rounded bg-surface border border-border/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                    <FileText className="h-3 w-3 text-primary" /> Setup Confluence Rationale
                  </span>
                  <p className="text-foreground text-[11px] leading-relaxed">{msg.data.notes}</p>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-muted-foreground border-t border-border/40 pt-2 italic">
                  Disclaimer: Always ensure this trade plan aligns with your current account balance, active prop firm parameters, and risk limits prior to execution.
                </p>
              </div>
            ) : (
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-surface border border-border/60 text-foreground rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono py-1">
            <Image src="/logo.png" alt="Logo" width={20} height={20} className="object-contain animate-pulse" />
            <span className="animate-pulse">Evaluating setup...</span>
          </div>
        )}
      </CardContent>

      <div className="border-t border-border/40 p-3 bg-surface/30 shrink-0">
        {step === 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["EURUSD", "GBPUSD", "XAUUSD", "NAS100"].map((p) => (
              <Button
                key={p}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleStep1Pair(p)}
                className="font-mono text-xs hover:border-primary"
              >
                {p}
              </Button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => handleStep2Direction("BUY")}
              className="font-mono text-xs gap-1"
            >
              <TrendingUp className="h-3.5 w-3.5" /> BUY
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleStep2Direction("SELL")}
              className="font-mono text-xs gap-1"
            >
              <TrendingDown className="h-3.5 w-3.5" /> SELL
            </Button>
          </div>
        )}

        {step === 3 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStep3Entry();
            }}
            className="flex gap-2"
          >
            <Input
              type="number"
              step="any"
              placeholder="e.g. 1.0850 or 2350.50"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="font-mono bg-surface text-xs"
            />
            <Button type="submit" size="sm" className="gap-1 font-mono text-xs" disabled={!entry}>
              Next <Send className="h-3 w-3" />
            </Button>
          </form>
        )}

        {step === 4 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStep4StopLoss();
            }}
            className="flex gap-2"
          >
            <Input
              type="number"
              step="any"
              placeholder="e.g. 1.0820 or 2340.00"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="font-mono bg-surface text-xs"
            />
            <Button type="submit" size="sm" className="gap-1 font-mono text-xs" disabled={!stopLoss}>
              Next <Send className="h-3 w-3" />
            </Button>
          </form>
        )}

        {step === 5 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStep5TakeProfit();
            }}
            className="flex gap-2"
          >
            <Input
              type="number"
              step="any"
              placeholder="e.g. 1.0910 or 2380.00"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="font-mono bg-surface text-xs"
            />
            <Button type="submit" size="sm" className="gap-1 font-mono text-xs" disabled={!takeProfit}>
              Next <Send className="h-3 w-3" />
            </Button>
          </form>
        )}

        {step === 6 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStep6Notes();
            }}
            className="flex gap-2"
          >
            <Input
              type="text"
              placeholder="Describe your setup or news confluence..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="font-mono bg-surface text-xs"
            />
            <Button type="submit" size="sm" className="gap-1 font-mono text-xs">
              Audit <Sparkles className="h-3 w-3" />
            </Button>
          </form>
        )}

        {(step === 0 || step === 7) && !isTyping && (
          <div className="text-center text-[11px] font-mono text-muted-foreground py-1">
            {step === 7 ? "Audit complete. Click 'Reset Audit' for another trade." : "Waiting..."}
          </div>
        )}
      </div>
    </Card>
  );
}