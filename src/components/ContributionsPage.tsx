import React, { useState } from 'react';
import { DollarSign, AlertTriangle, Calendar, TrendingUp, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ContributionsPage() {
  const [selectedYear, setSelectedYear] = useState('2024');

  const contributionTypes = [
    {
      title: "Monthly Shares",
      amount: 100,
      description: "Monthly share contribution",
      color: "bg-primary",
      icon: DollarSign
    },
    {
      title: "Monthly Welfare",
      amount: 100,
      description: "Monthly welfare contribution",
      color: "bg-success",
      icon: TrendingUp
    },
    {
      title: "Bereavement (Member)",
      amount: 1000,
      description: "When a member passes away",
      color: "bg-muted-foreground",
      icon: AlertTriangle
    },
    {
      title: "Bereavement (Dependent)",
      amount: 500,
      description: "When a member's dependent passes away",
      color: "bg-muted-foreground",
      icon: AlertTriangle
    }
  ];

  const penalties = [
    { type: "Missed Meeting", amount: 100, description: "Fine for missing monthly meeting" },
    { type: "Late Payment", amount: "+10%", description: "10% penalty on late contributions" },
    { type: "Misconduct", amount: 1000, description: "Fine for serious misconduct" }
  ];

  const paymentHistory = [
    { date: "Feb 2024", shares: 100, welfare: 100, bereavement: 0, fines: 0, total: 200, status: "Paid" },
    { date: "Jan 2024", shares: 100, welfare: 100, bereavement: 1000, fines: 100, total: 1300, status: "Paid" },
    { date: "Dec 2023", shares: 100, welfare: 100, bereavement: 0, fines: 0, total: 200, status: "Paid" },
    { date: "Nov 2023", shares: 100, welfare: 100, bereavement: 500, fines: 0, total: 700, status: "Paid" },
    { date: "Oct 2023", shares: 100, welfare: 100, bereavement: 0, fines: 0, total: 200, status: "Paid" },
    { date: "Sep 2023", shares: 0, welfare: 0, bereavement: 0, fines: 110, total: 110, status: "Pending" },
  ];

  const summary = {
    totalPaid: 3010,
    totalPending: 110,
    yearlyTarget: 2400,
    completionRate: 95
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8 px-4">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contributions & Payments</h1>
            <p className="text-muted-foreground">Track your monthly contributions, bereavements, and penalties</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid ({selectedYear})</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">Ksh {summary.totalPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last year</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">Ksh {summary.totalPending}</div>
              <p className="text-xs text-muted-foreground">Due before next meeting</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Yearly Target</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Ksh {summary.yearlyTarget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Regular contributions only</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{summary.completionRate}%</div>
              <p className="text-xs text-muted-foreground">On-time payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="structure">Fee Structure</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Current Month Status */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">March 2024 Status</CardTitle>
                  <CardDescription>Your current month contributions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-primary/10">
                      <div className="text-sm text-primary font-medium">Monthly Shares</div>
                      <div className="text-2xl font-bold text-primary">Ksh 100</div>
                      <Badge variant="destructive" className="mt-2">Pending</Badge>
                    </div>
                    <div className="p-4 rounded-lg bg-success/10">
                      <div className="text-sm text-success font-medium">Monthly Welfare</div>
                      <div className="text-2xl font-bold text-success">Ksh 100</div>
                      <Badge variant="destructive" className="mt-2">Pending</Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-primary text-primary-foreground shadow-medium hover:shadow-strong transition-all">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Pay March Contributions (Ksh 200)
                  </Button>
                </CardContent>
              </Card>

              {/* Outstanding Items */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">Outstanding Items</CardTitle>
                  <CardDescription>Items requiring your attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border border-warning bg-warning/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">September 2023 Fine</p>
                        <p className="text-sm text-muted-foreground">Late payment + Meeting absence</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-warning">Ksh 110</p>
                        <Badge variant="destructive">Overdue</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Pay Outstanding Fine
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Payment History</CardTitle>
                <CardDescription>Complete record of your contributions and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-medium text-foreground">Period</th>
                        <th className="text-left p-4 font-medium text-foreground">Shares</th>
                        <th className="text-left p-4 font-medium text-foreground">Welfare</th>
                        <th className="text-left p-4 font-medium text-foreground">Bereavement</th>
                        <th className="text-left p-4 font-medium text-foreground">Fines</th>
                        <th className="text-left p-4 font-medium text-foreground">Total</th>
                        <th className="text-left p-4 font-medium text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="p-4 text-foreground">{payment.date}</td>
                          <td className="p-4 text-muted-foreground">Ksh {payment.shares}</td>
                          <td className="p-4 text-muted-foreground">Ksh {payment.welfare}</td>
                          <td className="p-4 text-muted-foreground">Ksh {payment.bereavement}</td>
                          <td className="p-4 text-muted-foreground">Ksh {payment.fines}</td>
                          <td className="p-4 font-medium text-foreground">Ksh {payment.total}</td>
                          <td className="p-4">
                            <Badge variant={payment.status === "Paid" ? "default" : "destructive"}>
                              {payment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Contribution Types */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">Contribution Structure</CardTitle>
                  <CardDescription>Regular and special contribution amounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contributionTypes.map((contribution, index) => (
                    <div key={index} className="flex items-center p-4 rounded-lg border border-border">
                      <div className={`h-10 w-10 rounded-lg ${contribution.color} flex items-center justify-center mr-4`}>
                        <contribution.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{contribution.title}</p>
                        <p className="text-sm text-muted-foreground">{contribution.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">Ksh {contribution.amount}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Penalties */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">Penalty Structure</CardTitle>
                  <CardDescription>Fines and penalties as per constitution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {penalties.map((penalty, index) => (
                    <div key={index} className="flex items-center p-4 rounded-lg border border-warning bg-warning/5">
                      <div className="h-10 w-10 rounded-lg bg-warning flex items-center justify-center mr-4">
                        <AlertTriangle className="h-5 w-5 text-warning-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{penalty.type}</p>
                        <p className="text-sm text-muted-foreground">{penalty.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-warning">
                          {typeof penalty.amount === 'string' ? penalty.amount : `Ksh ${penalty.amount}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}