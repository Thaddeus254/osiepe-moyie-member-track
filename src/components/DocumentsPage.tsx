import React from 'react';
import { FileText, Download, Eye, Calendar, Shield, Users, Scale } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function DocumentsPage() {
  const documents = [
    {
      id: 1,
      title: "OSIEPE MOYIE CBO Constitution",
      description: "Official constitution governing the organization",
      type: "Constitution",
      lastUpdated: "January 2024",
      size: "2.3 MB",
      icon: Scale,
      restricted: false,
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Meeting Minutes - February 2024",
      description: "Minutes from the monthly general meeting",
      type: "Minutes",
      lastUpdated: "February 20, 2024",
      size: "856 KB",
      icon: FileText,
      restricted: true,
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Financial Reports Q4 2023",
      description: "Quarterly financial statements and audit report",
      type: "Financial",
      lastUpdated: "January 15, 2024",
      size: "1.8 MB",
      icon: FileText,
      restricted: true,
      downloadUrl: "#"
    },
    {
      id: 4,
      title: "Member Registration Guidelines",
      description: "Guidelines for new member registration",
      type: "Guidelines",
      lastUpdated: "December 2023",
      size: "450 KB",
      icon: Users,
      restricted: false,
      downloadUrl: "#"
    },
    {
      id: 5,
      title: "Training Materials - Financial Literacy",
      description: "Educational materials for member development",
      type: "Training",
      lastUpdated: "November 2023",
      size: "3.2 MB",
      icon: FileText,
      restricted: true,
      downloadUrl: "#"
    },
    {
      id: 6,
      title: "Code of Conduct",
      description: "Member code of conduct and disciplinary procedures",
      type: "Policy",
      lastUpdated: "October 2023",
      size: "680 KB",
      icon: Shield,
      restricted: false,
      downloadUrl: "#"
    }
  ];

  const categories = [
    { name: "All Documents", count: documents.length, active: true },
    { name: "Constitution", count: documents.filter(d => d.type === "Constitution").length, active: false },
    { name: "Minutes", count: documents.filter(d => d.type === "Minutes").length, active: false },
    { name: "Financial", count: documents.filter(d => d.type === "Financial").length, active: false },
    { name: "Policies", count: documents.filter(d => d.type === "Policy").length, active: false },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      Constitution: "bg-primary",
      Minutes: "bg-success",
      Financial: "bg-warning",
      Guidelines: "bg-accent",
      Training: "bg-secondary",
      Policy: "bg-destructive"
    };
    return colors[type as keyof typeof colors] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8 px-4">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Documents & Resources</h1>
          <p className="text-muted-foreground max-w-2xl">
            Access important CBO documents including the constitution, meeting minutes, financial reports, and training materials.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={category.active ? "default" : "outline"}
              size="sm"
              className={category.active ? "bg-gradient-primary" : ""}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Important Notice */}
        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-foreground">Access Notice</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Some documents are restricted to verified members only. Please ensure you are logged in with your member credentials to access all available documents. 
              If you're unable to access a document you need, contact the secretary or chairperson.
            </p>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="group shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-lg ${getTypeColor(doc.type)} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <doc.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <Badge variant="secondary" className="text-xs">
                      {doc.type}
                    </Badge>
                    {doc.restricted && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Members Only
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {doc.title}
                  </CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{doc.lastUpdated}</span>
                  </div>
                  <div>{doc.size}</div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-primary text-primary-foreground"
                    disabled={doc.restricted}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={doc.restricted}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                
                {doc.restricted && (
                  <p className="text-xs text-muted-foreground text-center">
                    Login required to access this document
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Constitution Highlight */}
        <Card className="shadow-medium bg-gradient-primary text-primary-foreground">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-lg bg-white/20 flex items-center justify-center">
                <Scale className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">OSIEPE MOYIE CBO Constitution</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  The foundation document governing our community-based organization
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-primary-foreground/90">
              Our constitution outlines the rules, procedures, and governance structure that guide our organization. 
              It includes information about membership, leadership roles, financial management, and member rights and responsibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" className="flex-1">
                <Eye className="mr-2 h-4 w-4" />
                Read Online
              </Button>
              <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Need Help Accessing Documents?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you're having trouble accessing any documents or need additional information, please contact our leadership team:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-muted">
                <p className="font-medium text-foreground">Chairperson</p>
                <p className="text-sm text-muted-foreground">General inquiries</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="font-medium text-foreground">Secretary</p>
                <p className="text-sm text-muted-foreground">Document requests</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="font-medium text-foreground">Treasurer</p>
                <p className="text-sm text-muted-foreground">Financial reports</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">Email: osiepemoyie16@gmail.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}