import React, { useState } from 'react';
import { 
  Users, DollarSign, FileText, Vote, TrendingUp, AlertTriangle, 
  Calendar, Settings, UserPlus, Download, Filter, Search,
  Eye, Edit, Trash2, CheckCircle, XCircle, Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Progress } from './ui/progress';

interface AdminDashboardProps {
  adminData: any;
  onPageChange: (page: string) => void;
}

export function AdminDashboard({ adminData, onPageChange }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    totalMembers: 80,
    activeMembers: 75,
    pendingApplications: 5,
    totalContributions: 1600000,
    monthlyTarget: 16000,
    currentMonthCollection: 14200,
    pendingPayments: 1800,
    overduePayments: 3,
    activeVotes: 2,
    completedVotes: 15,
    documentsUploaded: 25,
    meetingsThisYear: 8
  };

  const recentMembers = [
    { id: 'OM076', name: 'Mary Wanjiku', joinDate: '2024-03-15', status: 'Active', contributions: 600 },
    { id: 'OM077', name: 'Peter Kimani', joinDate: '2024-03-10', status: 'Active', contributions: 400 },
    { id: 'OM078', name: 'Grace Muthoni', joinDate: '2024-03-05', status: 'Pending', contributions: 0 },
    { id: 'OM079', name: 'David Ochieng', joinDate: '2024-02-28', status: 'Active', contributions: 800 },
    { id: 'OM080', name: 'Sarah Njeri', joinDate: '2024-02-25', status: 'Active', contributions: 1200 }
  ];

  const pendingPayments = [
    { memberId: 'OM045', name: 'John Mwangi', amount: 200, type: 'Monthly Contribution', dueDate: '2024-03-15', overdue: true },
    { memberId: 'OM023', name: 'Alice Wanjiru', amount: 100, type: 'Fine', dueDate: '2024-03-20', overdue: false },
    { memberId: 'OM067', name: 'Robert Kiprotich', amount: 200, type: 'Monthly Contribution', dueDate: '2024-03-15', overdue: true },
    { memberId: 'OM012', name: 'Jane Akinyi', amount: 1000, type: 'Bereavement', dueDate: '2024-03-25', overdue: false }
  ];

  const recentActivities = [
    { type: 'payment', member: 'OM034 - Michael Ouma', action: 'Paid monthly contribution', amount: 'Ksh 200', time: '2 hours ago' },
    { type: 'member', member: 'OM078 - Grace Muthoni', action: 'New member application', amount: '', time: '4 hours ago' },
    { type: 'vote', member: 'System', action: 'New vote created: Budget Approval', amount: '', time: '6 hours ago' },
    { type: 'document', member: 'Admin', action: 'Uploaded meeting minutes', amount: '', time: '1 day ago' },
    { type: 'payment', member: 'OM056 - Elizabeth Wambui', action: 'Paid bereavement contribution', amount: 'Ksh 1000', time: '1 day ago' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment': return <DollarSign className="h-4 w-4 text-success" />;
      case 'member': return <UserPlus className="h-4 w-4 text-primary" />;
      case 'vote': return <Vote className="h-4 w-4 text-accent" />;
      case 'document': return <FileText className="h-4 w-4 text-warning" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="default" className="bg-success text-success-foreground"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'Pending':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'Inactive':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-6 px-4">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {adminData.name}</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalMembers}</div>
              <p className="text-xs text-success">+5 this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Collection</CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Ksh {stats.currentMonthCollection.toLocaleString()}</div>
              <Progress value={(stats.currentMonthCollection / stats.monthlyTarget) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">{Math.round((stats.currentMonthCollection / stats.monthlyTarget) * 100)}% of target</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Ksh {stats.pendingPayments.toLocaleString()}</div>
              <p className="text-xs text-warning">{stats.overduePayments} overdue</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Votes</CardTitle>
              <Vote className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.activeVotes}</div>
              <p className="text-xs text-muted-foreground">{stats.completedVotes} completed this year</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
            <TabsTrigger value="voting">Voting</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Activities</CardTitle>
                  <CardDescription>Latest system activities and member actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                        <div className="flex-shrink-0 mt-0.5">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{activity.member}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                          {activity.amount && (
                            <p className="text-sm font-medium text-success">{activity.amount}</p>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Payments */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">Pending Payments</CardTitle>
                  <CardDescription>Members with outstanding payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingPayments.map((payment, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${payment.overdue ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/30'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">{payment.name}</p>
                            <p className="text-sm text-muted-foreground">{payment.memberId} • {payment.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">Ksh {payment.amount}</p>
                            <p className={`text-xs ${payment.overdue ? 'text-destructive' : 'text-muted-foreground'}`}>
                              Due: {payment.dueDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Member Management</CardTitle>
                    <CardDescription>Manage CBO members and applications</CardDescription>
                  </div>
                  <Button className="bg-gradient-primary">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-medium text-foreground">Member ID</th>
                        <th className="text-left p-3 font-medium text-foreground">Name</th>
                        <th className="text-left p-3 font-medium text-foreground">Join Date</th>
                        <th className="text-left p-3 font-medium text-foreground">Status</th>
                        <th className="text-left p-3 font-medium text-foreground">Contributions</th>
                        <th className="text-left p-3 font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentMembers.map((member, index) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/50">
                          <td className="p-3 font-medium text-foreground">{member.id}</td>
                          <td className="p-3 text-foreground">{member.name}</td>
                          <td className="p-3 text-muted-foreground">{member.joinDate}</td>
                          <td className="p-3">{getStatusBadge(member.status)}</td>
                          <td className="p-3 text-foreground">Ksh {member.contributions.toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">Total Collections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">Ksh {stats.totalContributions.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">All time contributions</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">Ksh {stats.currentMonthCollection.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">March 2024 collections</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-foreground">Outstanding</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">Ksh {stats.pendingPayments.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Pending payments</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="voting" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Voting Management</CardTitle>
                    <CardDescription>Create and manage voting sessions</CardDescription>
                  </div>
                  <Button className="bg-gradient-accent">
                    <Vote className="mr-2 h-4 w-4" />
                    Create Vote
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Voting management interface will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Reports & Analytics</CardTitle>
                    <CardDescription>Generate and download various reports</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Financial Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Member Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    Analytics Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    Meeting Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}