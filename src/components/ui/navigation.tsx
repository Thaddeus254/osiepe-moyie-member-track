import React, { useState } from 'react';
import { Menu, X, Users, DollarSign, FileText, Vote, Home } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'contributions', label: 'Contributions', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'voting', label: 'Voting', icon: Vote },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/50 shadow-soft">
      <div className="container flex h-18 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="#">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-bold sm:inline-block text-foreground">
              OSIEPE MOYIE C.B.O
            </span>
          </a>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "relative transition-colors hover:text-primary",
                  currentPage === item.id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                <span className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </span>
                {currentPage === item.id && (
                  <div className="absolute -bottom-[1.1rem] left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Future search functionality */}
          </div>
          <nav className="flex items-center">
            <Button variant="outline" size="sm" className="mr-2">
              Login
            </Button>
            <button
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 px-0 md:hidden"
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
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors",
                  currentPage === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                )}
              >
                <span className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}