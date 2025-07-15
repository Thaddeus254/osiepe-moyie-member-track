import React from 'react';
import { Users, DollarSign, Shield, FileText, Vote, TrendingUp, Bell, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const features = [
    {
      icon: DollarSign,
      title: 'Contribution Tracking',
      description: 'Track monthly shares (Ksh 100) and welfare (Ksh 100) contributions automatically.',
      action: () => onPageChange('contributions')
    },
    {
      icon: Shield,
      title: 'Bereavement Fund',
      description: 'Automated collection for member (Ksh 1,000) and dependent (Ksh 500) bereavements.',
      action: () => onPageChange('contributions')
    },
    {
      icon: FileText,
      title: 'Constitution & Documents',
      description: 'Access to CBO constitution, meeting minutes, and important documents.',
      action: () => onPageChange('documents')
    },
    {
      icon: Vote,
      title: 'Secure Voting',
      description: 'Participate in CBO elections and important decisions securely.',
      action: () => onPageChange('voting')
    },
    {
      icon: TrendingUp,
      title: 'Financial Reports',
      description: 'View your contribution history, balances, and financial statements.',
      action: () => onPageChange('dashboard')
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get reminders for dues, meetings, and important CBO announcements.',
      action: () => onPageChange('dashboard')
    }
  ];

  const stats = [
    { label: 'Active Members', value: '80+', icon: Users },
    { label: 'Monthly Contributions', value: 'Ksh 200', icon: CreditCard },
    { label: 'Years of Service', value: '5+', icon: Shield },
    { label: 'Success Rate', value: '98%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  OSIEPE MOYIE
                </span>
                <br />
                Community Based Organization
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Empowering our community through collective savings, welfare support, and transparent governance. 
                Your digital gateway to financial security and community solidarity.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary text-primary-foreground shadow-medium hover:shadow-strong transition-all"
                onClick={() => onPageChange('dashboard')}
              >
                <Users className="mr-2 h-5 w-5" />
                Member Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onPageChange('documents')}
              >
                <FileText className="mr-2 h-5 w-5" />
                View Constitution
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-all">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Comprehensive Member Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your CBO membership, track contributions, and stay connected with your community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer shadow-soft hover:shadow-medium transition-all hover:-translate-y-1"
                onClick={feature.action}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contact our leadership team to learn more about membership and our services.
          </p>
          <div className="space-y-2">
            <p className="text-foreground font-medium">Email: osiepemoyie16@gmail.com</p>
            <p className="text-muted-foreground">Chairperson • Secretary • Treasurer</p>
          </div>
        </div>
      </section>
    </div>
  );
}