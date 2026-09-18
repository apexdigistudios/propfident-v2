"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "next-themes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ChevronsUpDown, 
  LogOut, 
  LayoutDashboard, 
  BookOpen, 
  LogIn,
  Sun,
  Moon,
  Mail,
  Plus,
  Check,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TradingAccount {
  id: string;
  account_name: string;
  account_type: string;
}

export function AppSidebar() {
  const pathname = usePathname();
  const supabase = createClient();
  const { theme, setTheme } = useTheme();

  const [user, setUser] = useState<{ id: string; name: string; email: string; avatar: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth Modal State
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Account Switcher State
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<TradingAccount | null>(null);
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountType, setNewAccountType] = useState("");
  const [accountSubmitting, setAccountSubmitting] = useState(false);

  const fetchAccounts = async (userId: string) => {
    const { data } = await supabase
      .from("trading_accounts")
      .select("id, account_name, account_type")
      .eq("user_id", userId);

    if (data && data.length > 0) {
      setAccounts(data);
      setActiveAccount(data[0]);
    } else {
      setAccounts([]);
      setActiveAccount(null);
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
      } else {
        setUser(null);
        setAccounts([]);
        setActiveAccount(null);
      }
      setLoading(false);
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
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
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
      .insert([
        {
          user_id: user.id,
          account_name: newAccountName,
          account_type: newAccountType,
        },
      ])
      .select();

    setAccountSubmitting(false);

    if (!error && data) {
      setAccounts((prev) => [...prev, data[0]]);
      setActiveAccount(data[0]);
      setAddAccountOpen(false);
      setNewAccountName("");
      setNewAccountType("");
    } else if (error) {
      alert(error.message);
    }
  };

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Playbook", href: "/dashboard/playbook", icon: BookOpen },
  ];

  return (
    <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono font-bold shrink-0">
                      <ShieldAlert className="h-4 w-4" />
                    </div>
                    <div className="grid flex-1 text-left text-xs leading-tight">
                      <span className="truncate font-bold">
                        {activeAccount ? activeAccount.account_name : "Select Account"}
                      </span>
                      <span className="truncate text-[10px] text-muted-foreground font-mono">
                        {activeAccount ? activeAccount.account_type : "No Account Linked"}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 rounded-lg" align="start" side="bottom" sideOffset={4}>
                  <DropdownMenuLabel className="text-[10px] font-mono text-muted-foreground uppercase">
                    Trading Accounts
                  </DropdownMenuLabel>
                  {accounts.map((acc) => (
                    <DropdownMenuItem
                      key={acc.id}
                      onClick={() => setActiveAccount(acc)}
                      className="text-xs flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{acc.account_name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{acc.account_type}</span>
                      </div>
                      {activeAccount?.id === acc.id && <Check className="h-3.5 w-3.5 text-primary" />}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setAddAccountOpen(true)} className="text-xs cursor-pointer gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Trading Account</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] font-mono uppercase tracking-wider">
              Terminal
            </SidebarGroupLabel>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg shrink-0">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="rounded-lg font-mono text-xs">
                        {user ? user.name.slice(0, 2).toUpperCase() : "G"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-xs leading-tight">
                      <span className="truncate font-semibold">
                        {loading ? "Loading..." : user ? user.name : "Sign In"}
                      </span>
                      <span className="truncate text-[10px] text-muted-foreground font-mono">
                        {loading ? "..." : user ? user.email : "Guest Trader"}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  {user ? (
                    <>
                      <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-xs">
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="rounded-lg font-mono text-xs">
                              {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-xs leading-tight">
                            <span className="truncate font-semibold">{user.name}</span>
                            <span className="truncate text-[10px] text-muted-foreground font-mono">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                    </>
                  ) : (
                    <>
                      <DropdownMenuLabel className="text-xs text-muted-foreground">
                        Account Access
                      </DropdownMenuLabel>
                      <DropdownMenuItem onClick={handleGoogleLogin} className="text-xs cursor-pointer">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in with Google
                      </DropdownMenuItem>
                      <DialogTrigger asChild>
                        <DropdownMenuItem className="text-xs cursor-pointer">
                          <Mail className="mr-2 h-4 w-4" />
                          Sign in with Email
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="text-xs cursor-pointer">
                      {theme === "dark" ? (
                        <Moon className="mr-2 h-4 w-4" />
                      ) : (
                        <Sun className="mr-2 h-4 w-4" />
                      )}
                      Theme
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme("light")} className="text-xs cursor-pointer">
                        <Sun className="mr-2 h-4 w-4" /> Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")} className="text-xs cursor-pointer">
                        <Moon className="mr-2 h-4 w-4" /> Dark
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  {user && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={async () => {
                          await supabase.auth.signOut();
                        }}
                        className="text-xs text-destructive focus:text-destructive cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Email Login Modal */}
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Sign In to Propfident</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEmailLogin} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-xs font-mono font-medium text-muted-foreground">Email</label>
            <Input
              type="email"
              placeholder="trader@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono font-medium text-muted-foreground">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full text-xs font-mono" disabled={authLoading}>
            {authLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </DialogContent>

      {/* Add Trading Account Modal */}
      <Dialog open={addAccountOpen} onOpenChange={setAddAccountOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add Trading Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAccount} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-mono font-medium text-muted-foreground">Account Name</label>
              <Input
                type="text"
                placeholder="e.g. FTMO $100k"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono font-medium text-muted-foreground">Account Type</label>
              <Input
                type="text"
                placeholder="e.g. Evaluation / Funded"
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full text-xs font-mono" disabled={accountSubmitting}>
              {accountSubmitting ? "Creating..." : "Save Account"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}