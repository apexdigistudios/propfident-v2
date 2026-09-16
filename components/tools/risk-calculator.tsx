"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, Send, RefreshCw, Calculator, ShieldAlert, CheckCircle2, Copy, Check } from "lucide-react";
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
  const [copied, setCopied] = useState<boolean>(false);
  
  // Form State
  const [balance, setBalance] = useState<string>("");
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLossPips, setStopLossPips] = useState<string>("");
  const [pair, setPair] = useState<string>("EURUSD");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Prevents the main browser page from scrolling by targeting internal container only
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
          text: "👋 Hey trader! I'll calculate your position size for your prop firm account.",
        },
      ]);

      setIsTyping(true);
      await new Promise((r) => setTimeout(r, 1500));
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "First, what is your account balance in USD? (e.g. 50000, 100000)",
        },
      ]);
      setIsTyping(false);
      setStep(1);
    };

    initChat();
  }, []);

  const handleCopyLot = (lotSize: string) => {
    navigator.clipboard.writeText(lotSize);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStep1Balance = async () => {
    const numBalance = parseFloat(balance);
    if (!numBalance || numBalance <= 0) return;

    setMessages((prev) => [...prev, { sender: "user", text: `$${numBalance.toLocaleString()}` }]);
    setStep(0);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000));
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

    await new Promise((r) => setTimeout(r, 1000));
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

    await new Promise((r) => setTimeout(r, 1000));
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Which asset or instrument are you trading?",
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

    await new Promise((r) => setTimeout(r, 1500));

    const balNum = parseFloat(balance) || 100000;
    const slNum = parseFloat(stopLossPips) || 15;
    const riskAmt = (balNum * riskPercent) / 100;
    const pairSpec = PAIR_SPECS[selectedPair] || PAIR_SPECS.EURUSD;
    const lotSize = slNum > 0 ? riskAmt / (slNum * pairSpec.pipValue) : 0;

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "🎯 Sizing calculated. Click the lot size below to copy it:",
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
          text: "👋 What is your account balance in USD?",
        },
      ]);
      setIsTyping(false);
      setStep(1);
    }, 800);
  };

  return (
    <Card className="w-full border-border/60 bg-background/50 backdrop-blur-md shadow-2xl max-w-2xl mx-auto flex flex-col h-[600px]">
      <CardHeader className="border-b border-border/40 pb-3 shrink-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Back to Homepage"
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2 text-primary font-mono text-sm font-semibold">
            <Calculator className="h-4 w-4" />
            <span>AI RISK & LOT ASSISTANT</span>
          </div>
        </div>
        {step === 5 && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="font-mono text-xs gap-1">
            <RefreshCw className="h-3.5 w-3.5" /> New Calculation
          </Button>
        )}
      </CardHeader>

      <CardContent ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {msg.sender === "user" ? (
              <div className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs bg-primary text-primary-foreground">
                <User className="h-3.5 w-3.5" />
              </div>
            ) : (
              <div className="h-7 w-7 rounded-full overflow-hidden shrink-0 border border-border bg-surface flex items-center justify-center">
                <Image src="/logo.png" alt="Site Logo" width={28} height={28} className="object-cover" />
              </div>
            )}

            {msg.type === "result" && msg.data ? (
              <div className="w-full max-w-sm rounded-xl border border-primary/30 bg-surface/90 p-4 space-y-4 shadow-lg">
                <div className="grid grid-cols-2 gap-3 border-b border-border/50 pb-3">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">Max Cash Risk</span>
                    <span className="text-xl font-bold text-foreground">${msg.data.riskAmount.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">Recommended Position</span>
                    <button
                      type="button"
                      onClick={() => handleCopyLot(msg.data!.calculatedLotSize.toFixed(2))}
                      className="inline-flex items-center gap-1.5 text-xl font-bold text-primary hover:opacity-80 transition-opacity group"
                      title="Click to copy lot size"
                    >
                      <span>{msg.data.calculatedLotSize.toFixed(2)} Lots</span>
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      )}
                    </button>
                  </div>
                </div>

                {msg.data.riskPercent > 2 ? (
                  <div className="flex items-center gap-2 p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px]">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span>High Risk Warning: Risking over 2% may violate prop firm drawdown rules.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px]">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Risk level is within standard prop firm safety limits.</span>
                  </div>
                )}

                <p className="text-[10px] text-muted-foreground/80 font-mono text-center pt-2 border-t border-border/40">
                  ⚠️ <strong>Disclaimer:</strong> Always make sure these sizing parameters are suitable for your specific account leverage and prop firm rules before executing.
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
            <div className="h-6 w-6 rounded-full overflow-hidden border border-border shrink-0">
              <Image src="/logo.png" alt="Site Logo" width={24} height={24} className="object-cover" />
            </div>
            <span className="animate-pulse">Assistant is typing...</span>
          </div>
        )}
      </CardContent>

      <div className="border-t border-border/40 p-3 bg-surface/30 shrink-0">
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
              placeholder="Enter balance e.g. 100000"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="font-mono bg-surface text-xs"
              autoFocus
            />
            <Button type="submit" size="sm" className="gap-1 font-mono text-xs" disabled={!balance}>
              Send <Send className="h-3 w-3" />
            </Button>
          </form>
        )}

        {step === 2 && (
          <div className="grid grid-cols-4 gap-2">
            {[0.5, 1, 1.5, 2].map((pct) => (
              <Button
                key={pct}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleStep2Risk(pct)}
                className="font-mono text-xs hover:border-primary hover:text-primary"
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
              placeholder="Enter stop loss in pips (e.g. 15)"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
              className="font-mono bg-surface text-xs"
              autoFocus
            />
            <Button type="submit" size="sm" className="gap-1 font-mono text-xs" disabled={!stopLossPips}>
              Send <Send className="h-3 w-3" />
            </Button>
          </form>
        )}

        {step === 4 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(PAIR_SPECS).map(([key, item]) => (
              <Button
                key={key}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleStep4Pair(key)}
                className="font-mono text-xs hover:border-primary hover:text-primary"
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {(step === 0 || step === 5) && !isTyping && (
          <div className="text-center text-[11px] font-mono text-muted-foreground py-1">
            {step === 5 ? "Calculation complete. Click 'New Calculation' to restart." : "Waiting for response..."}
          </div>
        )}
      </div>
    </Card>
  );
}