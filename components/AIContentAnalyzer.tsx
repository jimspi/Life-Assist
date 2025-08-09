'use client'

import React, { useState, useEffect } from 'react';
import { Upload, Camera, Brain, Search, TrendingUp, DollarSign, MapPin, Star, Clock, Tag, Eye, Zap, Crown, Settings, Plus, Filter, BarChart3, ThumbsUp, ThumbsDown } from 'lucide-react';
import { userLearning } from '@/lib/userLearning';

interface AnalysisItem {
  name: string;
  quantity: string;
  confidence: number;
}

interface PriceComparison {
  store: string;
  price: string;
  per: string;
  total: string;
  availability: string;
}

interface UploadAnalysis {
  category: string;
  items: AnalysisItem[];
  project_suggestions: string[];
  price_comparison: PriceComparison[];
  recommendations: string[];
}

interface UploadInsights {
  estimated_project_cost: string;
  difficulty: string;
  time_estimate: string;
}

interface UploadData {
  id: string;
  type: 'image' | 'video';
  name: string;
  uploadedAt: string;
  analysis: UploadAnalysis;
  insights: UploadInsights;
  imageData?: string;
}

interface User {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  usage: {
    uploads: number;
    insights: number;
    savings: number;
  };
  preferences: {
    stores: string[];
    categories: string[];
    budget: string;
  };
}

interface Plan {
  name: string;
  price: string;
  uploads: number | string;
  features: string[];
  color: string;
}

const AIContentAnalyzer: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [uploads, setUploads] = useState<UploadData[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [userContext, setUserContext] = useState<string>('');

  const plans: Record<string, Plan> = {
    free: {
      name: 'Free',
      price: '$0',
      uploads: 10,
      features: ['Basic analysis', 'Price comparison', 'Simple recommendations'],
      color: 'bg-gray-100 text-gray-800'
    },
    pro: {
      name: 'Pro',
      price: '$19',
      uploads: 500,
      features: ['Advanced AI analysis', 'Smart recommendations', 'Project suggestions', 'Brand recognition', 'Historical tracking'],
      color: 'bg-blue-100 text-blue-800'
    },
    enterprise: {
      name: 'Enterprise',
      price: '$99',
      uploads: 'Unlimited',
      features: ['Enterprise AI models', 'Custom integrations', 'Team collaboration', 'Advanced analytics', 'Priority processing'],
      color: 'bg-purple-100 text-purple-800'
    }
  };

  useEffect(() => {
    const demoUser: User = {
      id: 'demo-user',
      email: 'user@example.com',
      plan: 'free',
      usage: {
        uploads: 0,
        insights: 0,
        savings: 0
      },
      preferences: {
        stores: [],
        categories: [],
        budget: 'moderate'
      }
    };

    setUser(demoUser);
    setUploads([]);

    const learningInsights = userLearning.getLearningInsights();
    setUser(prev => prev ? {
      ...prev,
      usage: {
        ...prev.usage,
        uploads: learningInsights.totalUploads
      }
    } : null);
  }, []);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], userContext);
    }
  };

  const analyzeWithAI = async (imageData: string, fileName: string, userContext?: string): Promise<UploadAnalysis> => {
    try {
      const personalizedContext = userLearning.getPersonalizedContext();
      const fullContext = userContext ? 
        `${userContext}\n\n${personalizedContext}` : 
        personalizedContext;

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          filename: fileName,
          userContext: fullContext
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      return result.analysis;
    } catch (error) {
      console.error('AI analysis error:', error);
      return {
        category: 'General Item',
        items: [{ name: 'Detected Item', quantity: '1', confidence: 0.85 }],
        project_suggestions: ['Project suggestion based on content'],
        price_comparison: [
          { store: 'Store A', price: '$XX.XX', per: 'each', total: '$XX.XX', availability: 'In Stock' }
        ],
        recommendations: ['AI recommendation based on analysis']
      };
    }
  };

  const handleFile = async (file: File, context?: string) => {
    if (!file) return;

    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      
      const newUpload: UploadData = {
        id: Date.now().toString(),
        type: file.type.startsWith('video/') ? 'video' : 'image',
        name: file.name,
        uploadedAt: new Date().toISOString(),
        imageData,
        analysis: {
          category: 'Analyzing...',
          items: [],
          project_suggestions: [],
          price_comparison: [],
          recommendations: ['Analysis in progress...']
        },
        insights: {
          estimated_project_cost: 'Calculating...',
          difficulty: 'Unknown',
          time_estimate: 'Estimating...'
        }
      };
      
      setUploads(prev => [newUpload, ...prev]);
      
      try {
        const analysis = await analyzeWithAI(imageData, file.name, context);
        
        const uploadWithAnalysis = { ...newUpload, analysis };
        userLearning.updateFromUpload(uploadWithAnalysis);
        
        setUploads(prev => prev.map(upload => 
          upload.id === newUpload.id 
            ? {
                ...upload,
                analysis,
                insights: {
                  estimated_project_cost: '$100-500',
                  difficulty: 'Beginner',
                  time_estimate: '1-2 hours'
                }
              }
            : upload
        ));

        setUser(prev => prev ? {
          ...prev,
          usage: {
            ...prev.usage,
            uploads: prev.usage.uploads + 1,
            insights: prev.usage.insights + 1
          }
        } : null);

      } catch (error) {
        console.error('Analysis failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const filteredUploads = uploads.filter(upload => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'images') return upload.type === 'image';
    if (selectedFilter === 'videos') return upload.type === 'video';
    return upload.analysis.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Content Analyzer</h1>
          <p className="text-gray-600 mt-1">Upload images and videos for instant insights and recommendations</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${user ? plans[user.plan]?.color : ''}`}>
          {user ? plans[user.plan]?.name : 'Free'} Plan
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Uploads</p>
              <p className="text-2xl font-bold text-gray-900">{user?.usage.uploads || 0}</p>
              <p className="text-xs text-gray-500">of {user ? plans[user.plan]?.uploads : 10} monthly</p>
            </div>
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Insights</p>
              <p className="text-2xl font-bold text-gray-900">{user?.usage.insights || 0}</p>
              <p className="text-xs text-gray-500">Generated</p>
            </div>
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Money Saved</p>
              <p className="text-2xl font-bold text-gray-900">${user?.usage.savings || 0}</p>
              <p className="text-xs text-gray-500">Through better deals</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-orange-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Learning</h3>
              <p className="text-sm text-gray-600">Getting smarter</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-center">
            {(() => {
              const insights = userLearning.getLearningInsights();
              return (
                <>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{insights.level}</div>
                    <div className="text-xs text-gray-500">AI Level</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{insights.categories}</div>
                    <div className="text-xs text-gray-500">Categories</div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Upload</h2>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">Drop your image or video here</p>
          <p className="text-gray-600 mb-4">or click to browse files</p>
          <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
            Choose File
            <input 
              type="file" 
              className="hidden" 
              accept="image/*,video/*" 
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], userContext)} 
            />
          </label>
        </div>
      </div>

      {uploads.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Analysis</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {uploads.slice(0, 3).map(upload => (
                <div key={upload.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {upload.type === 'video' ? (
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Camera className="h-6 w-6 text-purple-600" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Eye className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{upload.name}</h3>
                    <p className="text-sm text-gray-600">{upload.analysis.category}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Cost: {upload.insights.estimated_project_cost}</span>
                      <span>Difficulty: {upload.insights.difficulty}</span>
                      <span>Time: {upload.insights.time_estimate}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(upload.uploadedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Content Analysis</h1>
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Content</option>
            <option value="images">Images Only</option>
            <option value="videos">Videos Only</option>
          </select>
          <button
            onClick={() => setCurrentView('upload')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Upload Content</span>
          </button>
        </div>
      </div>

      {isAnalyzing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-blue-900 font-medium">Analyzing content with AI...</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {filteredUploads.map(upload => (
          <div key={upload.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {upload.type === 'video' ? (
                    <Camera className="h-6 w-6 text-purple-600" />
