"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "next-themes";
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  Menu, 
  Plus, 
  Check, 
  LogIn, 
  LogOut, 
  Sun, 
  Moon, 
  Mail, 
  Laptop, 
  MonitorCog,
  Calculator,
  Building2,
  Zap
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TradingAccount {
  id: string;
  account_name: string;
  account_type: string;
}

export function MobileNav() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "overview";
  const supabase = createClient();
  const { theme, setTheme } = useTheme();

  const [user, setUser] = useState<{ id: string; name: string; email: string; avatar: string } | null>(null);

  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<TradingAccount | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountsModalOpen, setAccountsModalOpen] = useState(false);
  const [addAccountModalOpen, setAddAccountModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountType, setNewAccountType] = useState("");
  const [accountSubmitting, setAccountSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const fetchAccounts = async (userId: string) => {
    const { data } = await supabase
      .from("trading_accounts")
      .select("id, account_name, account_type")
      .eq("user_id", userId);

    if (data && data.length > 0) {
      setAccounts(data);
      setActiveAccount(data[0]);
    }
  };

  useEffect(() => {
    async function getUserData() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser({
          id: authUser.id,
          name: authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "Trader",
          email: authUser.email || "",
          avatar: authUser.user_metadata?.avatar_url || "",
        });
        fetchAccounts(authUser.id);
      }
    }
    getUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Trader",
          email: session.user.email || "",
          avatar: session.user.user_metadata?.avatar_url || "",
        });
        fetchAccounts(session.user.id);
      } else {
        setUser(null);
        setAccounts([]);
        setActiveAccount(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/userpane` },
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setAuthLoading(false);
    if (!error) {
      setEmailModalOpen(false);
      setEmail("");
      setPassword("");
    } else {
      alert(error.message);
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setAccountSubmitting(true);
    const { data, error } = await supabase
      .from("trading_accounts")
      .insert([{ user_id: user.id, account_name: newAccountName, account_type: newAccountType }])
      .select();

    setAccountSubmitting(false);
    if (!error && data) {
      setAccounts((prev) => [...prev, data[0]]);
      setActiveAccount(data[0]);
      setAddAccountModalOpen(false);
      setNewAccountName("");
      setNewAccountType("");
    } else if (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-2 bg-background/85 dark:bg-[#121212]/90 backdrop-blur-2xl border border-border/40 shadow-2xl rounded-full p-1.5">
          
          {/* 1. Overview */}
          <Link
            href="/userpane"
            className={`flex items-center justify-center size-9 rounded-full transition-all ${
              currentView === "overview"
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
            title="Overview"
          >
            <LayoutDashboard className="size-4" />
          </Link>

          {/* 2. Account Intel */}
          <Link
            href="/userpane?view=account-intel"
            className={`flex items-center justify-center size-9 rounded-full transition-all ${
              currentView === "account-intel"
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
            title="Account Intel"
          >
            <MonitorCog className="size-4" />
          </Link>

          {/* 3. Journal */}
          <Link
            href="/userpane?view=journal"
            className={`flex items-center justify-center size-9 rounded-full transition-all ${
              currentView === "journal"
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
            title="Journal"
          >
            <BookOpen className="size-4" />
          </Link>

          {/* 4. Free Tool (Lot Calc) */}
          <Link
            href="/userpane?view=lot-calculator"
            className={`flex items-center justify-center size-9 rounded-full transition-all ${
              currentView === "lot-calculator"
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
            title="Lot Calculator"
          >
            <Calculator className="size-4" />
          </Link>

          {/* 5. Menu Button */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="flex items-center justify-center size-9 rounded-full bg-primary/20 text-primary border border-primary/30 transition-all"
                title="Open Terminal Menu"
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl border-t border-border px-6 pb-8 pt-4 max-h-[85vh] overflow-y-auto">
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
              
              {user ? (
                <div className="flex items-center justify-between p-3 mb-4 bg-muted/40 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Avatar className="size-9 rounded-xl border border-primary/20">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xs font-mono font-bold bg-primary/10 text-primary">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold text-xs truncate">{user.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono truncate">{user.email}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-muted/30 rounded-2xl border border-border/50 space-y-2">
                  <p className="text-xs text-muted-foreground font-mono">Sign in to sync your terminal data.</p>
                  <div className="flex gap-2">
                    <Button onClick={() => { setMenuOpen(false); handleGoogleLogin(); }} className="flex-1 text-xs font-mono gap-1.5 h-8 rounded-xl" variant="outline">
                      <LogIn className="size-3.5" /> Google
                    </Button>
                    <Button onClick={() => { setMenuOpen(false); setEmailModalOpen(true); }} className="flex-1 text-xs font-mono gap-1.5 h-8 rounded-xl" variant="outline">
                      <Mail className="size-3.5" /> Email
                    </Button>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setAccountsModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 mb-4 rounded-xl border border-border/60 hover:bg-accent transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="size-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">{activeAccount ? activeAccount.account_name : "Select Account"}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{activeAccount ? activeAccount.account_type : "No Account Linked"}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">Switch</span>
              </button>

              <SheetHeader className="text-left mb-2">
                <SheetTitle className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                  Navigation
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-1">
                <Link
                  href="/userpane"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent text-xs font-mono"
                >
                  <LayoutDashboard className="size-4 text-primary" />
                  <span>Overview</span>
                </Link>
                <Link
                  href="/userpane?view=account-intel"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent text-xs font-mono"
                >
                  <MonitorCog className="size-4 text-primary" />
                  <span>Account Intel</span>
                </Link>
                <Link
                  href="/userpane?view=journal"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent text-xs font-mono"
                >
                  <BookOpen className="size-4 text-primary" />
                  <span>Journal</span>
                </Link>

                <div className="pt-3">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase px-2.5">Free Tools</span>
                  <div className="mt-1 space-y-1 pl-2">
                    <Link
                      href="/userpane?view=lot-calculator"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent text-xs font-mono"
                    >
                      <Calculator className="size-3.5 text-primary" />
                      <span>Lot Calculator</span>
                    </Link>
                    <Link
                      href="/userpane?view=prop-match"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent text-xs font-mono"
                    >
                      <Building2 className="size-3.5 text-primary" />
                      <span>Prop Match</span>
                    </Link>
                    <Link
                      href="/userpane?view=trade-assist"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent text-xs font-mono"
                    >
                      <Zap className="size-3.5 text-primary" />
                      <span>Trade Assist</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/50 space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-muted/20">
                    <span className="text-xs font-mono text-muted-foreground">Appearance</span>
                    <div className="flex gap-1">
                      <Button variant={theme === "light" ? "default" : "ghost"} size="sm" onClick={() => setTheme("light")} className="size-7 p-0 rounded-lg">
                        <Sun className="size-3.5" />
                      </Button>
                      <Button variant={theme === "dark" ? "default" : "ghost"} size="sm" onClick={() => setTheme("dark")} className="size-7 p-0 rounded-lg">
                        <Moon className="size-3.5" />
                      </Button>
                      <Button variant={theme === "system" ? "default" : "ghost"} size="sm" onClick={() => setTheme("system")} className="size-7 p-0 rounded-lg">
                        <Laptop className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  {user && (
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        setMenuOpen(false);
                        await supabase.auth.signOut();
                      }}
                      className="w-full text-xs font-mono gap-2 h-9 rounded-xl mt-2"
                    >
                      <LogOut className="size-4" /> Log out
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>

      <Dialog open={accountsModalOpen} onOpenChange={setAccountsModalOpen}>
        <DialogContent className="sm:max-w-[360px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Trading Accounts
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            {accounts.length === 0 ? (
              <p className="text-xs text-muted-foreground font-mono text-center py-4">No accounts linked yet.</p>
            ) : (
              accounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    setActiveAccount(acc);
                    setAccountsModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    activeAccount?.id === acc.id ? "bg-primary/10 border-primary/40 text-primary" : "border-border/60 hover:bg-accent"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">{acc.account_name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{acc.account_type}</span>
                  </div>
                  {activeAccount?.id === acc.id && <Check className="size-4 text-primary" />}
                </button>
              ))
            )}
            <Button
              variant="outline"
              onClick={() => {
                setAccountsModalOpen(false);
                setAddAccountModalOpen(true);
              }}
              className="w-full text-xs font-mono gap-2 mt-2 h-9 rounded-xl"
            >
              <Plus className="size-4" /> Add Trading Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={addAccountModalOpen} onOpenChange={setAddAccountModalOpen}>
        <DialogContent className="sm:max-w-[360px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Add Trading Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAccount} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-muted-foreground">Account Name</label>
              <Input type="text" placeholder="e.g. FTMO $100k" value={newAccountName} onChange={(e) => setNewAccountName(e.target.value)} required className="h-9 text-xs rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-muted-foreground">Account Type</label>
              <Input type="text" placeholder="e.g. Evaluation / Funded" value={newAccountType} onChange={(e) => setNewAccountType(e.target.value)} required className="h-9 text-xs rounded-xl" />
            </div>
            <Button type="submit" className="w-full text-xs font-mono h-9 rounded-xl" disabled={accountSubmitting}>
              {accountSubmitting ? "Creating..." : "Save Account"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
        <DialogContent className="sm:max-w-[360px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Sign In with Email</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEmailLogin} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-muted-foreground">Email</label>
              <Input type="email" placeholder="trader@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-9 text-xs rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-muted-foreground">Password</label>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-9 text-xs rounded-xl" />
            </div>
            <Button type="submit" className="w-full text-xs font-mono h-9 rounded-xl" disabled={authLoading}>
              {authLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}