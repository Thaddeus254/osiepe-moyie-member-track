import React, { useState } from 'react';
import { Users, Shield, Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';

interface LoginPageProps {
  onLogin: (userType: 'member' | 'admin', userData: any, isFirstLogin: boolean) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [memberCredentials, setMemberCredentials] = useState({
    memberId: '',
    password: ''
  });
  const [adminCredentials, setAdminCredentials] = useState({
    email: '',
    password: ''
  });

  const handleMemberLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (memberCredentials.memberId && memberCredentials.password) {
        const mockMemberData = {
          id: memberCredentials.memberId,
          name: "John Doe",
          firstName: "John",
          email: "john.doe@email.com",
          phone: "+254712345678",
          joinDate: "January 2020",
          status: "Active",
          totalContributions: 12000,
          currentBalance: 8500,
          pendingFines: 200,
          profilePhoto: null,
          hasChangedPassword: memberCredentials.password !== 'temp123'
        };
        
        const isFirstLogin = memberCredentials.password === 'temp123';
        onLogin('member', mockMemberData, isFirstLogin);
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (adminCredentials.email && adminCredentials.password) {
        const mockAdminData = {
          id: 'admin001',
          name: "Admin User",
          firstName: "Admin",
          email: adminCredentials.email,
          role: "Administrator",
          profilePhoto: null,
          permissions: ['manage_members', 'financial_reports', 'voting_management', 'document_management'],
          hasChangedPassword: adminCredentials.password !== 'admin123'
        };
        
        const isFirstLogin = adminCredentials.password === 'admin123';
        onLogin('admin', mockAdminData, isFirstLogin);
      } else {
        setError('Please enter valid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md animate-bounce-in">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-glow animate-pulse-glow">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Sign in to access your OSIEPE MOYIE CBO account</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-strong border-0 bg-white/95 backdrop-blur-sm hover-lift">
          <CardHeader className="pb-4 px-4 sm:px-6">
            <CardTitle className="text-center text-foreground text-lg sm:text-xl">Choose Login Type</CardTitle>
            <CardDescription className="text-center text-sm">
              Select your account type to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            {error && (
              <Alert className="mb-4 border-destructive/50 bg-destructive/5">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="member" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
                <TabsTrigger value="member" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Member</span>
                  <span className="sm:hidden">Member</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                  <span className="sm:hidden">Admin</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="member">
                <form onSubmit={handleMemberLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="memberId" className="text-sm font-medium">Member ID</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="memberId"
                        type="text"
                        placeholder="Enter your member ID (e.g., OM001)"
                        value={memberCredentials.memberId}
                        onChange={(e) => setMemberCredentials(prev => ({ ...prev, memberId: e.target.value }))}
                        className="pl-10 h-12 form-input"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberPassword" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="memberPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={memberCredentials.password}
                        onChange={(e) => setMemberCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10 h-12 form-input"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary text-white shadow-medium hover:shadow-strong transition-all h-12 text-sm sm:text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      <>
                        Sign In as Member
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail" className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="Enter your admin email"
                        value={adminCredentials.email}
                        onChange={(e) => setAdminCredentials(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 h-12 form-input"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your admin password"
                        value={adminCredentials.password}
                        onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10 h-12 form-input"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-accent text-white shadow-medium hover:shadow-strong transition-all h-12 text-sm sm:text-base"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      <>
                        Sign In as Admin
                        <Shield className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Forgot your password?{' '}
                <button className="text-primary hover:underline font-medium transition-colors">
                  Contact Administrator
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-4 sm:mt-6 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <p><span className="font-medium">Member:</span> OM001 / temp123</p>
              <p><span className="font-medium">Admin:</span> admin@osiepe.com / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}