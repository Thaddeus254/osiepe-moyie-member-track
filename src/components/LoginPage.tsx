import React, { useState } from 'react';
import { Users, Shield, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginPageProps {
  onLogin: (userType: 'member' | 'admin', userData: any) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [memberCredentials, setMemberCredentials] = useState({
    memberId: '',
    password: ''
  });
  const [adminCredentials, setAdminCredentials] = useState({
    email: '',
    password: ''
  });

  const handleMemberLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock member login - in real app, this would validate against backend
    if (memberCredentials.memberId && memberCredentials.password) {
      const mockMemberData = {
        id: memberCredentials.memberId,
        name: "John Doe",
        email: "john.doe@email.com",
        joinDate: "January 2020",
        status: "Active",
        totalContributions: 12000,
        currentBalance: 8500,
        pendingFines: 200
      };
      onLogin('member', mockMemberData);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock admin login - in real app, this would validate against backend
    if (adminCredentials.email && adminCredentials.password) {
      const mockAdminData = {
        id: 'admin001',
        name: "Admin User",
        email: adminCredentials.email,
        role: "Administrator",
        permissions: ['manage_members', 'financial_reports', 'voting_management', 'document_management']
      };
      onLogin('admin', mockAdminData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-glow">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your OSIEPE MOYIE CBO account</p>
        </div>

        <Card className="shadow-strong border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-foreground">Choose Login Type</CardTitle>
            <CardDescription className="text-center">
              Select your account type to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="member" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="member" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Member
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="member">
                <form onSubmit={handleMemberLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="memberId">Member ID</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="memberId"
                        type="text"
                        placeholder="Enter your member ID (e.g., OM001)"
                        value={memberCredentials.memberId}
                        onChange={(e) => setMemberCredentials(prev => ({ ...prev, memberId: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="memberPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={memberCredentials.password}
                        onChange={(e) => setMemberCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary text-white shadow-medium hover:shadow-strong transition-all">
                    Sign In as Member
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="Enter your admin email"
                        value={adminCredentials.email}
                        onChange={(e) => setAdminCredentials(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="adminPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your admin password"
                        value={adminCredentials.password}
                        onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-accent text-white shadow-medium hover:shadow-strong transition-all">
                    Sign In as Admin
                    <Shield className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Forgot your password?{' '}
                <button className="text-primary hover:underline font-medium">
                  Contact Administrator
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Demo Credentials:<br />
            Member: OM001 / password123<br />
            Admin: admin@osiepe.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}