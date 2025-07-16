import React, { useState } from 'react';
import { Menu, X, Users, DollarSign, FileText, Vote, Home, LogOut, Shield } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userType?: 'member' | 'admin' | null;
  userData?: any;
  onLogout?: () => void;
}

export function Navigation({ currentPage, onPageChange, userType, userData, onLogout }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const memberNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'contributions', label: 'Contributions', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'voting', label: 'Voting', icon: Vote },
  ];

  const adminNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'voting', label: 'Voting', icon: Vote },
  ];

  const navItems = userType === 'admin' ? adminNavItems : memberNavItems;

  return (
    <nav className="bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 w-full border-b border-border/50 shadow-medium">
      <div className="container flex h-20 items-center px-6">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="#">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="hidden font-bold sm:inline-block text-foreground text-lg">
              OSIEPE MOYIE C.B.O
            </span>
          </a>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "relative transition-all duration-200 hover:text-primary px-3 py-2 rounded-lg",
                  currentPage === item.id
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:bg-muted/50"
                )}
              >
                <span className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </span>
                {currentPage === item.id && (
                  <div className="absolute -bottom-[1.3rem] left-0 right-0 h-1 bg-gradient-primary rounded-full shadow-glow" />
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Future search functionality */}
          </div>
          <nav className="flex items-center space-x-3">
            {userType && userData && (
              <>
                <div className="hidden md:block text-right mr-3">
                  <p className="text-sm font-medium text-foreground">{userData.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {userType === 'admin' ? 'Administrator' : `Member ${userData.id}`}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onLogout}
                  className="border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
            {!userType && (
              <Button variant="outline" size="sm" className="shadow-soft hover:shadow-medium">
                Login
              </Button>
            )}
            <button
              className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 px-0 md:hidden hover:bg-muted/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-2 px-6 pb-4 pt-2 bg-white/95 backdrop-blur-lg border-t border-border/50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                  currentPage === item.id
                    ? "bg-gradient-primary text-primary-foreground shadow-medium"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/70"
                )}
              >
                <span className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </span>
              </button>
            ))}
            {userType && userData && (
              <div className="pt-3 border-t border-border/50 mt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    onLogout?.();
                    setIsMenuOpen(false);
                  }}
                  className="w-full border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
