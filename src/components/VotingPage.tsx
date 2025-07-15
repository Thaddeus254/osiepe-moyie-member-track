import React from 'react';
import { Vote, Clock, CheckCircle, Users, Calendar, AlertCircle, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function VotingPage() {
  const activeVotes = [
    {
      id: 1,
      title: "Annual Budget Approval 2024",
      description: "Vote on the proposed annual budget for fiscal year 2024",
      deadline: "March 25, 2024",
      totalVoters: 80,
      votedCount: 45,
      status: "active",
      userVoted: false,
      category: "Financial"
    },
    {
      id: 2,
      title: "New Leadership Elections",
      description: "Election for Chairperson, Secretary, and Treasurer positions",
      deadline: "April 15, 2024",
      totalVoters: 80,
      votedCount: 12,
      status: "active",
      userVoted: false,
      category: "Leadership"
    }
  ];

  const completedVotes = [
    {
      id: 3,
      title: "Constitution Amendment - Meeting Times",
      description: "Amendment to change monthly meeting schedule",
      deadline: "February 20, 2024",
      totalVoters: 80,
      votedCount: 72,
      status: "completed",
      userVoted: true,
      result: "Approved",
      category: "Constitutional"
    },
    {
      id: 4,
      title: "New Member Admission - Batch 5",
      description: "Approval of 8 new member applications",
      deadline: "January 30, 2024",
      totalVoters: 75,
      votedCount: 68,
      status: "completed",
      userVoted: true,
      result: "Approved",
      category: "Membership"
    }
  ];

  const upcomingVotes = [
    {
      id: 5,
      title: "Training Program Budget",
      description: "Approval for financial literacy training program budget",
      startDate: "April 1, 2024",
      category: "Development"
    },
    {
      id: 6,
      title: "Loan Policy Review",
      description: "Review and updates to member loan policy",
      startDate: "April 10, 2024",
      category: "Policy"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Financial: "bg-success",
      Leadership: "bg-primary",
      Constitutional: "bg-warning",
      Membership: "bg-accent",
      Development: "bg-secondary",
      Policy: "bg-muted-foreground"
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "destructive" : "default";
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8 px-4">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Voting Center</h1>
          <p className="text-muted-foreground max-w-2xl">
            Participate in important CBO decisions through secure online voting. Your voice matters in shaping our community's future.
          </p>
        </div>

        {/* Voting Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Votes</CardTitle>
              <Vote className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{activeVotes.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting your participation</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Participation</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">92%</div>
              <p className="text-xs text-muted-foreground">Voting participation rate</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Votes</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{upcomingVotes.length}</div>
              <p className="text-xs text-muted-foreground">Scheduled for next month</p>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-foreground">Secure Voting</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All votes are conducted through secure, encrypted channels. Your voting choices are anonymous and cannot be traced back to you. 
              Only verified members can participate in voting, and each member can vote only once per issue.
            </p>
          </CardContent>
        </Card>

        {/* Active Votes */}
        {activeVotes.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Active Votes</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {activeVotes.map((vote) => (
                <Card key={vote.id} className="shadow-soft hover:shadow-medium transition-all border-l-4 border-l-destructive">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">
                            <Clock className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                          <Badge variant="outline" className={`${getCategoryColor(vote.category)} text-white`}>
                            {vote.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-foreground">{vote.title}</CardTitle>
                        <CardDescription>{vote.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Participation</span>
                        <span className="text-foreground">{vote.votedCount}/{vote.totalVoters} members</span>
                      </div>
                      <Progress value={(vote.votedCount / vote.totalVoters) * 100} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Deadline: {vote.deadline}
                      </div>
                      {vote.userVoted ? (
                        <Badge variant="default">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Voted
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-gradient-primary text-primary-foreground shadow-medium hover:shadow-strong transition-all"
                      disabled={vote.userVoted}
                    >
                      <Vote className="mr-2 h-4 w-4" />
                      {vote.userVoted ? "Already Voted" : "Vote Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Votes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Recent Results</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {completedVotes.map((vote) => (
              <Card key={vote.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                        <Badge variant="outline" className={`${getCategoryColor(vote.category)} text-white`}>
                          {vote.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-foreground">{vote.title}</CardTitle>
                      <CardDescription>{vote.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Final Participation</span>
                      <span className="text-foreground">{vote.votedCount}/{vote.totalVoters} members</span>
                    </div>
                    <Progress value={(vote.votedCount / vote.totalVoters) * 100} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Result: <span className="font-medium text-success">{vote.result}</span>
                    </div>
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      You Voted
                    </Badge>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Results
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Votes */}
        {upcomingVotes.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Upcoming Votes</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {upcomingVotes.map((vote) => (
                <Card key={vote.id} className="shadow-soft">
                  <CardHeader>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          <Calendar className="h-3 w-3 mr-1" />
                          Upcoming
                        </Badge>
                        <Badge variant="outline" className={`${getCategoryColor(vote.category)} text-white`}>
                          {vote.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-foreground">{vote.title}</CardTitle>
                      <CardDescription>{vote.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Starts: {vote.startDate}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Help Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">How Voting Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Voting Process</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Active votes are announced to all members</li>
                  <li>2. Click "Vote Now" to access the secure voting platform</li>
                  <li>3. Cast your vote within the specified deadline</li>
                  <li>4. Results are published after voting closes</li>
                </ol>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Important Notes</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Only verified members can participate</li>
                  <li>• One vote per member per issue</li>
                  <li>• Voting is anonymous and secure</li>
                  <li>• Late votes are not counted</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}