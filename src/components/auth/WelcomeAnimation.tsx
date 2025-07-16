import React, { useEffect, useState } from 'react';
import { CheckCircle, Sparkles, Heart } from 'lucide-react';

interface WelcomeAnimationProps {
  isVisible: boolean;
  userName: string;
  userType: 'member' | 'admin';
  onComplete: () => void;
}

export function WelcomeAnimation({ isVisible, userName, userType, onComplete }: WelcomeAnimationProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 2500),
      setTimeout(() => onComplete(), 4000)
    ];

    return () => timers.forEach(clearTimeout);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-bounce-in">
        {/* Success Icon */}
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center transition-all duration-1000 ${stage >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <CheckCircle className="h-10 w-10 text-white" />
        </div>

        {/* Welcome Message */}
        <div className={`space-y-2 mb-6 transition-all duration-1000 delay-500 ${stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-foreground">Welcome, {userName}! 🎉</h2>
          <p className="text-muted-foreground">
            You've successfully logged in as {userType === 'admin' ? 'an Administrator' : 'a Member'}
          </p>
        </div>

        {/* Animated Elements */}
        <div className={`flex justify-center space-x-4 transition-all duration-1000 delay-1000 ${stage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="animate-bounce">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div className="animate-bounce delay-100">
            <Heart className="h-6 w-6 text-accent" />
          </div>
          <div className="animate-bounce delay-200">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Loading indicator */}
        <div className="mt-6">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-3000 ease-out"
              style={{ width: stage >= 1 ? '100%' : '0%' }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Setting up your dashboard...</p>
        </div>
      </div>
    </div>
  );
}