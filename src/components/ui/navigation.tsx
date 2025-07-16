import React, { useState } from 'react';
import { Menu, X, Users, DollarSign, FileText, Vote, Home, LogOut, Shield, User, ChevronDown } from 'lucide-react';
import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
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
      <div className="container flex h-16 sm:h-20 items-center px-4 sm:px-6">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="#">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Users className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <span className="hidden font-bold lg:inline-block text-foreground text-sm sm:text-lg">
              OSIEPE MOYIE C.B.O
            </span>
          </a>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "relative transition-all duration-200 hover:text-primary px-2 lg:px-3 py-2 rounded-lg",
                  currentPage === item.id
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:bg-muted/50"
                )}
              >
                <span className="flex items-center space-x-1 lg:space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </span>
                {currentPage === item.id && (
                  <div className="absolute -bottom-[1rem] sm:-bottom-[1.3rem] left-0 right-0 h-1 bg-gradient-primary rounded-full shadow-glow" />
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
                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-auto px-2 sm:px-3">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={userData.profilePhoto} alt={userData.name} />
                          <AvatarFallback className="bg-gradient-primary text-white text-sm">
                            {userData.firstName?.charAt(0) || userData.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:block text-left">
                          <p className="text-sm font-medium text-foreground leading-none">
                            {userData.firstName || userData.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {userType === 'admin' ? 'Administrator' : `Member ${userData.id}`}
                          </p>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center space-x-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userData.profilePhoto} alt={userData.name} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {userData.firstName?.charAt(0) || userData.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userData.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={onLogout}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            {!userType && (
              <Button variant="outline" size="sm" className="shadow-soft hover:shadow-medium">
                Login
              </Button>
            )}
            <button
              className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-8 w-8 sm:h-10 sm:w-10 px-0 md:hidden hover:bg-muted/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-2 px-4 sm:px-6 pb-4 pt-2 bg-white/95 backdrop-blur-lg border-t border-border/50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "block w-full text-left px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200",
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
              <div className="pt-3 border-t border-border/50 mt-3 space-y-3">
                <div className="flex items-center space-x-3 px-3 sm:px-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userData.profilePhoto} alt={userData.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {userData.firstName?.charAt(0) || userData.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{userData.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {userType === 'admin' ? 'Administrator' : `Member ${userData.id}`}
                    </p>
                  </div>
                </div>
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
