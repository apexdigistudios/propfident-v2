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
        text: "Briefly mention your trade confluence or rationale (e.g., London breakout).",
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

    const entryNum = parseFloat(entry) || 0;
    const slNum = parseFloat(stopLoss) || 0;
    const tpNum = parseFloat(takeProfit) || 0;

    const risk = Math.abs(entryNum - slNum);
    const reward = Math.abs(tpNum - entryNum);
    const rrRatio = risk > 0 ? (reward / risk).toFixed(2) : "0.00";

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "✨ Audit complete! Here is your trade plan:" },
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
    <Card className="w-full max-w-lg mx-auto flex flex-col h-[450px] sm:h-[500px] rounded-[28px] border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
      <CardHeader className="border-b border-white/10 py-2.5 px-4 shrink-0 flex flex-row items-center justify-between backdrop-blur-md bg-white/5 rounded-t-[28px]">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-wide">
          <Brain className="h-4 w-4" />
          <span>AI TRADE PLANNER</span>
        </div>
        {step === 7 && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="h-7 text-[11px] rounded-full gap-1 hover:bg-white/10">
            <RefreshCw className="h-3 w-3" /> Reset
          </Button>
        )}
      </CardHeader>

      <CardContent
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 text-xs scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {msg.sender === "user" ? (
              <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[10px] shadow-sm">
                <User className="h-3 w-3" />
              </div>
            ) : (
              <div className="shrink-0 pt-0.5">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
            )}

            {msg.type === "result" && msg.data ? (
              <div className="w-full max-w-xs sm:max-w-sm rounded-2xl border border-white/20 dark:border-white/10 bg-white/20 dark:bg-white/10 backdrop-blur-xl p-3 sm:p-4 space-y-3 shadow-xl">
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> PRE-TRADE AUDIT
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[9px] rounded-full px-2 py-0.5 ${
                      msg.data.direction === "BUY"
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : "border-rose-500/30 text-rose-400 bg-rose-500/10"
                    }`}
                  >
                    {msg.data.pair} — {msg.data.direction}
                  </Badge>
                </div>

                {/* Detailed Plan Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 text-[10px]">
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase font-medium">Entry</span>
                    <span className="font-bold text-foreground">{msg.data.entry}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase font-medium">Stop Loss</span>
                    <span className="font-bold text-rose-400">{msg.data.stopLoss}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase font-medium">Take Profit</span>
                    <span className="font-bold text-emerald-400">{msg.data.takeProfit}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase font-medium">R : R Ratio</span>
                    <span
                      className={`font-bold ${
                        Number(msg.data.rrRatio) >= 1.5 ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      1 : {msg.data.rrRatio}
                    </span>
                  </div>
                </div>

                {/* Risk Evaluation */}
                {Number(msg.data.rrRatio) < 1.5 ? (
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-500 text-[10px]">
                    <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                    <span>Low R:R Warning: Setup offers below standard 1:1.5 threshold.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px]">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Risk-to-Reward ratio satisfies strict prop rules.</span>
                  </div>
                )}

                {/* Trade Confluence Summary */}
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[9px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                    <FileText className="h-3 w-3 text-primary" /> Setup Confluence
                  </span>
                  <p className="text-foreground text-[10px] leading-relaxed">{msg.data.notes}</p>
                </div>

                {/* Disclaimer */}
                <p className="text-[9px] text-muted-foreground border-t border-white/10 pt-1.5 italic">
                  Ensure setup aligns with active prop firm risk parameters.
                </p>
              </div>
            ) : (
              <div
                className={`max-w-[82%] rounded-[18px] px-3.5 py-2 leading-relaxed shadow-sm text-xs ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-xs"
                    : "bg-white/20 dark:bg-white/10 border border-white/20 dark:border-white/10 backdrop-blur-md text-foreground rounded-tl-xs"
                }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] py-1">
            <Image src="/logo.png" alt="Logo" width={18} height={18} className="object-contain animate-pulse" />
            <span className="animate-pulse">Evaluating setup...</span>
          </div>
        )}
      </CardContent>

      <div className="border-t border-white/10 p-2.5 bg-white/5 backdrop-blur-md shrink-0 rounded-b-[28px]">
        {step === 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {["EURUSD", "GBPUSD", "XAUUSD", "NAS100"].map((p) => (
              <Button
                key={p}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleStep1Pair(p)}
                className="h-8 rounded-full border-white/20 bg-white/10 backdrop-blur-md text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600"
              >
                {p}
              </Button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-1.5">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => handleStep2Direction("BUY")}
              className="h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs gap-1"
            >
              <TrendingUp className="h-3.5 w-3.5" /> BUY
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleStep2Direction("SELL")}
              className="h-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs gap-1"
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
              placeholder="Entry price (e.g. 1.0850)"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="h-8 rounded-full bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-md text-xs placeholder:text-muted-foreground/60"
            />
            <Button type="submit" size="sm" className="h-8 rounded-full px-3 text-xs gap-1 bg-blue-600 hover:bg-blue-700" disabled={!entry}>
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
              placeholder="Stop Loss price (e.g. 1.0820)"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="h-8 rounded-full bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-md text-xs placeholder:text-muted-foreground/60"
            />
            <Button type="submit" size="sm" className="h-8 rounded-full px-3 text-xs gap-1 bg-blue-600 hover:bg-blue-700" disabled={!stopLoss}>
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
              placeholder="Take Profit price (e.g. 1.0910)"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="h-8 rounded-full bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-md text-xs placeholder:text-muted-foreground/60"
            />
            <Button type="submit" size="sm" className="h-8 rounded-full px-3 text-xs gap-1 bg-blue-600 hover:bg-blue-700" disabled={!takeProfit}>
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
              placeholder="Describe setup confluence..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-8 rounded-full bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-md text-xs placeholder:text-muted-foreground/60"
            />
            <Button type="submit" size="sm" className="h-8 rounded-full px-3 text-xs gap-1 bg-blue-600 hover:bg-blue-700">
              Audit <Sparkles className="h-3 w-3" />
            </Button>
          </form>
        )}

        {(step === 0 || step === 7) && !isTyping && (
          <div className="text-center text-[10px] text-muted-foreground py-0.5">
            {step === 7 ? "Audit complete." : "Waiting..."}
          </div>
        )}
      </div>
    </Card>
  );
}