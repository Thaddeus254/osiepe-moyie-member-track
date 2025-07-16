import React from 'react';
import { Users, DollarSign, Shield, FileText, Vote, TrendingUp, Bell, CreditCard, Heart, Star, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Breadcrumb } from './ui/breadcrumb';
import communityUnity from '../assets/community-unity.jpg';
import financialGrowth from '../assets/financial-growth.jpg';
import heroBackground from '../assets/hero-background.jpg';

interface HomePageProps {
  onPageChange: (page: string) => void;
  currentPage?: string;
}

export function HomePage({ onPageChange, currentPage = 'home' }: HomePageProps) {
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
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto max-w-6xl px-4 pt-4">
        <Breadcrumb 
          items={[
            { label: 'Home', onClick: () => onPageChange('home') }
          ]}
        />
      </div>

      {/* Hero Section */}
      <section 
        className="relative py-16 sm:py-24 lg:py-32 px-4 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-community opacity-10 animate-gradient"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8 animate-bounce-in">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow animate-pulse-glow">
                  <Heart className="mr-2 h-4 w-4" />
                  Building Stronger Communities Together
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gradient animate-float">
                    OSIEPE MOYIE
                  </span>
                  <br />
                  <span className="text-foreground">Community Based</span>
                  <br />
                  <span className="text-primary">Organization</span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Empowering our community through <span className="text-primary font-semibold">collective savings</span>, 
                  <span className="text-accent font-semibold"> welfare support</span>, and 
                  <span className="text-primary font-semibold"> transparent governance</span>. 
                  Your digital gateway to financial security and community solidarity.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="btn-community group"
                  onClick={() => onPageChange('dashboard')}
                >
                  <Users className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Member Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="hover-lift shadow-medium hover:shadow-strong border-2 border-primary/20"
                  onClick={() => onPageChange('documents')}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  View Constitution
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Star className="h-5 w-5 text-accent fill-current" />
                  <span className="text-sm font-medium">5+ Years of Service</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">80+ Active Members</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">98% Success Rate</span>
                </div>
              </div>
            </div>

            {/* Right content - Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-strong hover:shadow-glow transition-all duration-500 hover-lift">
                <img 
                  src={communityUnity}
                  alt="Community Unity Illustration"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-primary/10"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-accent p-4 rounded-full shadow-accent animate-float">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-primary p-4 rounded-full shadow-glow animate-float" style={{ animationDelay: '1s' }}>
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Community Impact
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Building trust and financial security together
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="community-card text-center group hover-lift animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6 sm:pt-8 pb-4 sm:pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-gradient-community flex items-center justify-center shadow-glow group-hover:scale-110 transition-all duration-300">
                      <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <img 
            src={financialGrowth}
            alt="Financial Growth Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Star className="mr-2 h-4 w-4" />
              Comprehensive Member Services
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
              Everything You Need for
              <span className="text-gradient"> Financial Growth</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Manage your CBO membership, track contributions, and stay connected with your community 
              through our comprehensive digital platform designed for transparency and ease of use.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer community-card hover-lift hover-glow animate-bounce-in"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={feature.action}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-community flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-medium">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-foreground text-base sm:text-lg font-bold group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-primary text-sm font-medium flex items-center">
                      Learn more
                      <TrendingUp className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-community relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-accent"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                <Heart className="mr-2 h-4 w-4" />
                Join Our Growing Community
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                Ready to Build Your
                <span className="block text-accent"> Financial Future?</span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Contact our dedicated leadership team to learn more about membership benefits 
                and start your journey with OSIEPE MOYIE C.B.O today.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-base sm:text-lg font-bold">osiepemoyie16@gmail.com</p>
                    <p className="text-white/80 text-xs sm:text-sm">Primary Contact Email</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-white/90 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Chairperson</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Secretary</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Treasurer</span>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Start Your Membership Journey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}