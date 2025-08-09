import { useState, useCallback } from "react";
import { Navbar } from "@/components/legal/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload as UploadIcon, 
  FileText, 
  File, 
  CheckCircle, 
  AlertCircle,
  Download,
  Sparkles,
  Search,
  Eye
} from "lucide-react";

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  clauses: {
    type: string;
    content: string;
    confidence: number;
  }[];
  riskFactors: {
    level: "low" | "medium" | "high";
    description: string;
  }[];
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysisResult(null);
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} is ready for analysis`,
      });
    }
  }, [toast]);

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        summary: "This is a standard employment contract under Indian labour laws with competitive terms. The document outlines employee responsibilities, compensation structure, and termination procedures in compliance with Industrial Disputes Act, 1947 and Shops and Establishments Act. Overall assessment indicates favorable terms for both parties under Indian employment regulations.",
        keyPoints: [
          "Annual salary of ₹15,00,000 with performance bonuses as per company policy",
          "30 days paid vacation and ESI/PF benefits as per Indian labour laws",
          "3-month probationary period with evaluation as per Industrial Disputes Act",
          "Confidentiality and non-disclosure agreements compliant with Indian Contract Act",
          "Termination requires 30-day written notice as per Shops & Establishments Act"
        ],
        clauses: [
          {
            type: "Compensation Clause",
            content: "Employee shall receive an annual salary of fifteen lakh rupees (₹15,00,000), payable in monthly installments as per Payment of Wages Act, 1936...",
            confidence: 0.95
          },
          {
            type: "Confidentiality Clause",
            content: "Employee agrees to maintain confidentiality of all proprietary information and trade secrets as per Indian Contract Act, 1872...",
            confidence: 0.92
          },
          {
            type: "Termination Clause",
            content: "Either party may terminate this agreement with thirty (30) days written notice as per Industrial Disputes Act, 1947...",
            confidence: 0.98
          },
          {
            type: "Non-Compete Clause",
            content: "Employee shall not engage in competing business activities during employment and for 12 months thereafter, subject to enforceability under Indian Contract Act...",
            confidence: 0.87
          }
        ],
        riskFactors: [
          {
            level: "medium",
            description: "Non-compete clause duration may be unenforceable as per Indian Contract Act, Section 27 (restraint of trade)"
          },
          {
            level: "low",
            description: "Confidentiality terms are reasonable and compliant with Indian Contract Act, 1872"
          },
          {
            level: "low",
            description: "Termination notice period complies with Industrial Disputes Act and state labour laws"
          }
        ]
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "Your document has been successfully analyzed.",
      });
    }, 2500);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "low": return "outline";
      case "medium": return "secondary";
      case "high": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Document Analyzer
          </h1>
          <p className="text-muted-foreground">
            Upload legal documents for AI-powered analysis per Indian legal framework and clause extraction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-primary mb-4">Upload Document</h3>
              
              {!file ? (
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent-gold transition-smooth cursor-pointer"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-2">Click to upload or drag and drop</p>
                  <p className="text-muted-foreground text-sm">PDF, DOCX, or TXT files (max 10MB)</p>
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];
                      if (selectedFile) onDrop([selectedFile]);
                    }}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-accent-gold-light rounded-lg">
                    <FileText className="h-6 w-6 text-accent-gold-dark" />
                    <div className="flex-1">
                      <p className="font-medium text-accent-gold-dark">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Analyzing document...</span>
                        <span className="text-sm font-medium">{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="w-full" />
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={isAnalyzing}
                      variant="hero"
                      className="flex-1"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isAnalyzing ? "Analyzing..." : "Analyze Document"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setFile(null)}
                      disabled={isAnalyzing}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Supported Features */}
            <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-primary mb-4">AI Analysis Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-hero rounded-lg">
                    <FileText className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Document Summarization</p>
                    <p className="text-sm text-muted-foreground">Get key insights and overview</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-hero rounded-lg">
                    <Search className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Clause Extraction</p>
                    <p className="text-sm text-muted-foreground">Identify legal clauses and terms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-hero rounded-lg">
                    <AlertCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Risk Assessment</p>
                    <p className="text-sm text-muted-foreground">Highlight potential issues</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                {/* Summary */}
                <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-primary mb-4">Document Summary</h3>
                  <p className="text-foreground leading-relaxed">{analysisResult.summary}</p>
                </Card>

                {/* Key Points */}
                <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-primary mb-4">Key Points</h3>
                  <ul className="space-y-2">
                    {analysisResult.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-foreground text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Extracted Clauses */}
                <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-primary mb-4">Extracted Clauses</h3>
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      {analysisResult.clauses.map((clause, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="bg-accent-gold-light text-accent-gold-dark border-accent-gold">
                              {clause.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(clause.confidence * 100)}% confidence
                            </span>
                          </div>
                          <p className="text-sm text-foreground">{clause.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>

                {/* Risk Assessment */}
                <Card className="p-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-primary mb-4">Risk Assessment</h3>
                  <div className="space-y-3">
                    {analysisResult.riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-secondary rounded-lg">
                        <AlertCircle className={`h-4 w-4 mt-0.5 ${getRiskColor(risk.level)}`} />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant={getRiskBadgeVariant(risk.level)} className="text-xs">
                              {risk.level.toUpperCase()} RISK
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{risk.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-8 shadow-card border-0 bg-card/50 backdrop-blur-sm text-center">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Analysis Results</h3>
                <p className="text-muted-foreground">
                  Upload and analyze a document to see detailed insights here
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}