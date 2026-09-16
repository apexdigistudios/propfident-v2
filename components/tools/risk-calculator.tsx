"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User, Send, RefreshCw, Calculator, ShieldAlert, CheckCircle2, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PAIR_SPECS: Record<string, { pipValue: number; label: string }> = {
  EURUSD: { pipValue: 10, label: "EUR/USD" },
  GBPUSD: { pipValue: 10, label: "GBP/USD" },
  USDJPY: { pipValue: 6.7, label: "USD/JPY" },
  XAUUSD: { pipValue: 10, label: "XAU/USD (Gold)" },
  BTCUSD: { pipValue: 1, label: "BTC/USD" },
};

interface Message {
  sender: "bot" | "user";
  text?: string;
  type?: "text" | "result";
  data?: {
    riskAmount: number;
    calculatedLotSize: number;
    riskPercent: number;
    pair: string;
  };
}

export function RiskLotCalculator() {
  const [step, setStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [copied, setCopied] = useState(false);

  // Form State
  const [balance, setBalance] = useState<string>("");
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLossPips, setStopLossPips] = useState<string>("");
  const [pair, setPair] = useState<string>("EURUSD");

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
      await new Promise((r) => setTimeout(r, 1200));
      setMessages([
        {
          sender: "bot",
          text: "👋 Hey trader! I'll help you calculate the exact lot size for your prop firm account in seconds.",
        },
      ]);

      setIsTyping(true);
      await new Promise((r) => setTimeout(r, 1800));
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "First, what is your current account balance in USD? (e.g. 50000, 100000)",
        },
      ]);
      setIsTyping(false);
      setStep(1);
    };

    initChat();
  }, []);

  const handleStep1Balance = async () => {
    const numBalance = parseFloat(balance);
    if (!numBalance || numBalance <= 0) return;

    setMessages((prev) => [...prev, { sender: "user", text: `$${numBalance.toLocaleString()}` }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200));
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Got it! What percentage of your account are you risking on this trade?",
      },
    ]);
    setIsTyping(false);
    setStep(2);
  };

  const handleStep2Risk = async (selectedRisk: number) => {
    setRiskPercent(selectedRisk);
    setMessages((prev) => [...prev, { sender: "user", text: `${selectedRisk}% Risk` }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200));
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Understood. How many pips or points is your stop loss?",
      },
    ]);
    setIsTyping(false);
    setStep(3);
  };

  const handleStep3StopLoss = async () => {
    const pips = parseFloat(stopLossPips);
    if (!pips || pips <= 0) return;

    setMessages((prev) => [...prev, { sender: "user", text: `${pips} pips` }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200));
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Almost done! Which asset or instrument are you trading?",
      },
    ]);
    setIsTyping(false);
    setStep(4);
  };

  const handleStep4Pair = async (selectedPair: string) => {
    setPair(selectedPair);
    setMessages((prev) => [...prev, { sender: "user", text: PAIR_SPECS[selectedPair].label }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1800));

    const balNum = parseFloat(balance) || 100000;
    const slNum = parseFloat(stopLossPips) || 15;
    const riskAmt = (balNum * riskPercent) / 100;
    const pairSpec = PAIR_SPECS[selectedPair] || PAIR_SPECS.EURUSD;
    const lotSize = slNum > 0 ? riskAmt / (slNum * pairSpec.pipValue) : 0;

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "🎯 Here is your calculated position sizing parameter:",
      },
      {
        sender: "bot",
        type: "result",
        data: {
          riskAmount: riskAmt,
          calculatedLotSize: lotSize,
          riskPercent,
          pair: selectedPair,
        },
      },
    ]);
    setIsTyping(false);
    setStep(5);
  };

  const handleCopyLot = (lotSize: number) => {
    navigator.clipboard.writeText(lotSize.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setBalance("");
    setStopLossPips("");
    setMessages([]);
    setStep(0);
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          sender: "bot",
          text: "👋 Let's compute a new trade setup. What is your account balance in USD?",
        },
      ]);
      setIsTyping(false);
      setStep(1);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-lg mx-auto flex flex-col h-[450px] sm:h-[500px] rounded-[28px] border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
      <CardHeader className="border-b border-white/10 py-2.5 px-4 shrink-0 flex flex-row items-center justify-between backdrop-blur-md bg-white/5 rounded-t-[28px]">
        <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-wide">
          <Calculator className="h-4 w-4" />
          <span>AI RISK & LOT ASSISTANT</span>
        </div>
        {step === 5 && (
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
                <div className="grid grid-cols-2 gap-2 border-b border-white/10 pb-2.5">
                  <div>
                    <span className="text-[9px] text-muted-foreground uppercase block font-medium">Max Cash Risk</span>
                    <span className="text-lg font-bold text-foreground">${msg.data.riskAmount.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-muted-foreground uppercase block font-medium">Recommended Lot</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-bold text-blue-500">
                        {msg.data.calculatedLotSize.toFixed(2)} <span className="text-[10px] text-muted-foreground font-normal">Lots</span>
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 shrink-0 rounded-full hover:bg-white/20"
                        onClick={() => handleCopyLot(msg.data!.calculatedLotSize)}
                        title="Copy Lot Size"
                      >
                        {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {msg.data.riskPercent > 2 ? (
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-500 text-[10px]">
                    <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                    <span>High Risk Warning: Over 2% risk violates standard rules.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px]">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Risk level is within prop firm safe parameters.</span>
                  </div>
                )}

                <p className="text-[9px] text-muted-foreground border-t border-white/10 pt-1.5 italic">
                  Always confirm size suits active account rules.
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
            <span className="animate-pulse">Assistant is typing...</span>
          </div>
        )}
      </CardContent>

      <div className="border-t border-white/10 p-2.5 bg-white/5 backdrop-blur-md shrink-0 rounded-b-[28px]">
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStep1Balance();
            }}
            className="flex gap-2"
          >
            <Input
              type="number"
              placeholder="Enter balance (e.g. 50000)"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="h-8 rounded-full bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-md text-xs placeholder:text-muted-foreground/60"
            />
            <Button type="submit" size="sm" className="h-8 rounded-full px-3 text-xs gap-1 bg-blue-600 hover:bg-blue-700" disabled={!balance}>
              Send <Send className="h-3 w-3" />
            </Button>
          </form>
        )}

        {step === 2 && (
          <div className="grid grid-cols-4 gap-1.5">
            {[0.5, 1, 1.5, 2].map((pct) => (
              <Button
                key={pct}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleStep2Risk(pct)}
                className="h-8 rounded-full border-white/20 bg-white/10 backdrop-blur-md text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600"
              >
                {pct}%
              </Button>
            ))}
          </div>
        )}

        {step === 3 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStep3StopLoss();
            }}
            className="flex gap-2"
          >
            <Input
              type="number"
              placeholder="Stop loss in pips (e.g. 15)"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
              className="h-8 rounded-full bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-md text-xs placeholder:text-muted-foreground/60"
            />
            <Button type="submit" size="sm" className="h-8 rounded-full px-3 text-xs gap-1 bg-blue-600 hover:bg-blue-700" disabled={!stopLossPips}>
              Send <Send className="h-3 w-3" />
            </Button>
          </form>
        )}

        {step === 4 && (
          <div className="grid grid-cols-3 gap-1.5">
            {Object.entries(PAIR_SPECS).map(([key, item]) => (
              <Button
                key={key}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleStep4Pair(key)}
                className="h-8 rounded-full border-white/20 bg-white/10 backdrop-blur-md text-[11px] hover:bg-blue-600 hover:text-white hover:border-blue-600 truncate"
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {(step === 0 || step === 5) && !isTyping && (
          <div className="text-center text-[10px] text-muted-foreground py-0.5">
            {step === 5 ? "Calculation complete." : "Waiting..."}
          </div>
        )}
      </div>
    </Card>
  );
}