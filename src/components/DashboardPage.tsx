import React from 'react';
import { DollarSign, Calendar, AlertTriangle, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DashboardPageProps {
  onPageChange: (page: string) => void;
  memberData: any;
}

export function DashboardPage({ onPageChange, memberData }: DashboardPageProps) {

  const recentTransactions = [
    { date: "Feb 15, 2024", type: "Monthly Contribution", amount: 200, status: "Paid" },
    { date: "Feb 10, 2024", type: "Bereavement Fund", amount: 1000, status: "Paid" },
    { date: "Jan 15, 2024", type: "Monthly Contribution", amount: 200, status: "Paid" },
    { date: "Jan 20, 2024", type: "Meeting Fine", amount: 100, status: "Pending" },
  ];

  const upcomingEvents = [
    { date: "Mar 20, 2024", event: "Monthly Meeting", location: "Community Hall" },
    { date: "Mar 25, 2024", event: "Training Workshop", location: "Office" },
    { date: "Apr 1, 2024", event: "Annual General Meeting", location: "School Hall" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero py-6 px-4">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-3 py-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome back, {memberData.name}
          </h1>
          <p className="text-muted-foreground">
            Member ID: {memberData.id} • Joined: {memberData.joinDate} • Status: {memberData.status}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Ksh {memberData.totalContributions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+Ksh 200 from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Ksh {memberData.currentBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Available for withdrawal</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Fines</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">Ksh {memberData.pendingFines}</div>
              <p className="text-xs text-muted-foreground">Due before next meeting</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground">March 15, 2024</div>
              <p className="text-xs text-muted-foreground">Monthly contribution due</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft border-0 bg-white/95">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Recent Transactions</CardTitle>
                    <CardDescription>Your latest financial activities</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onPageChange('contributions')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{transaction.type}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium text-foreground">Ksh {transaction.amount}</p>
                        <Badge variant={transaction.status === "Paid" ? "default" : "destructive"}>
                          {transaction.status === "Paid" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <Card className="shadow-soft border-0 bg-white/95">
              <CardHeader>
                <CardTitle className="text-foreground">Upcoming Events</CardTitle>
                <CardDescription>Don't miss these important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="space-y-2 p-4 rounded-lg bg-gradient-card border border-border/50 hover:shadow-soft transition-all">
                      <div className="flex items-center text-sm text-primary font-medium">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <p className="font-medium text-foreground">{event.event}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft border-0 bg-white/95">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                className="bg-gradient-primary text-primary-foreground shadow-medium hover:shadow-strong transition-all h-12"
                onClick={() => onPageChange('contributions')}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Make Payment
              </Button>
              <Button 
                variant="outline"
                className="h-12 hover:bg-muted/70 transition-all"
                onClick={() => onPageChange('documents')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                View Documents
              </Button>
              <Button 
                variant="outline"
                className="h-12 hover:bg-muted/70 transition-all"
                onClick={() => onPageChange('voting')}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Check Voting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}