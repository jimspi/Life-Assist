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
                  ) : (
                    <Eye className="h-6 w-6 text-blue-600" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{upload.name}</h3>
                    <p className="text-sm text-gray-600">
                      {upload.analysis.category} • {new Date(upload.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {upload.insights.estimated_project_cost}
                  </div>
                  <div className="text-xs text-gray-500">
                    {upload.insights.difficulty} • {upload.insights.time_estimate}
                  </div>
                </div>
              </div>

              {upload.analysis.items.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Detected Items</h4>
                  <div className="space-y-2">
                    {upload.analysis.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-900">{item.name}</span>
                        <div className="text-xs text-gray-500">
                          {item.quantity} • {Math.round(item.confidence * 100)}% confidence
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {upload.analysis.price_comparison.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Price Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2">Store</th>
                          <th className="text-left py-2">Price</th>
                          <th className="text-left py-2">Total</th>
                          <th className="text-left py-2">Availability</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upload.analysis.price_comparison.map((price, idx) => (
                          <tr key={idx} className={`${idx === 0 ? 'bg-green-50' : ''}`}>
                            <td className="py-2 font-medium">{price.store}</td>
                            <td className="py-2">{price.price} {price.per}</td>
                            <td className="py-2 font-medium">{price.total}</td>
                            <td className="py-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                price.availability === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {price.availability}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {upload.analysis.recommendations.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">AI Recommendations</h4>
                  <div className="space-y-2">
                    {upload.analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {upload.analysis.project_suggestions.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Project Ideas</h4>
                  <div className="flex flex-wrap gap-2">
                    {upload.analysis.project_suggestions.map((project, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Was this analysis helpful?</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        userLearning.recordFeedback({
                          uploadId: upload.id,
                          helpful: true,
                          category: upload.analysis.category,
                          timestamp: new Date().toISOString()
                        });
                      }}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>Helpful</span>
                    </button>
                    <button
                      onClick={() => {
                        userLearning.recordFeedback({
                          uploadId: upload.id,
                          helpful: false,
                          category: upload.analysis.category,
                          timestamp: new Date().toISOString()
                        });
                      }}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <ThumbsDown className="h-3 w-3" />
                      <span>Not helpful</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {uploads.length === 0 && (
          <div className="text-center py-12">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No uploads yet</h3>
            <p className="text-gray-600 mb-4">Upload your first image or video to get started with AI analysis</p>
            <button
              onClick={() => setCurrentView('upload')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload Content
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentView('analysis')}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Analysis
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Upload Content</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
            What are you looking for? (Optional)
          </label>
          <textarea
            id="context"
            placeholder="e.g., 'I want to build a garden retaining wall', 'Looking for dinner recipe ideas', 'Need to identify this plant', 'Shopping for similar items'..."
            value={userContext}
            onChange={(e) => setUserContext(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Provide context to get more relevant suggestions and recommendations
          </p>
        </div>

        <div 
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Content</h2>
          <p className="text-gray-600 mb-6">
            Drag and drop your images or videos here, or click to browse files
          </p>
          <label className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer text-lg transition-colors">
            Choose Files
            <input 
              type="file" 
              className="hidden" 
              accept="image/*,video/*" 
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  Array.from(e.target.files).forEach(file => handleFile(file, userContext));
                }
              }} 
            />
          </label>
          <p className="text-sm text-gray-500 mt-4">
            Supports: JPG, PNG, GIF, MP4, MOV, AVI (Max 50MB each)
          </p>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 mb-3">What happens after upload?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <Brain className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-900">AI Analysis</h4>
                <p className="text-sm text-blue-700">Advanced computer vision identifies objects, context, and meaning in any image</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Search className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-900">Smart Search</h4>
                <p className="text-sm text-blue-700">Finds relevant information, prices, and sources across the entire web</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-900">Personalized Insights</h4>
                <p className="text-sm text-blue-700">Tailored recommendations based on your context and goals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Universal Analysis - Works with Any Content:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
            <div>🍳 <strong>Food & Recipes</strong><br/>Identify ingredients, get recipes, find substitutes</div>
            <div>🏠 <strong>Home & Garden</strong><br/>DIY projects, price comparisons, material guides</div>
            <div>👕 <strong>Fashion & Style</strong><br/>Find similar items, price check, style suggestions</div>
            <div>📱 <strong>Electronics</strong><br/>Tech specs, reviews, better deals, accessories</div>
            <div>🌱 <strong>Plants & Nature</strong><br/>Species identification, care guides, where to buy</div>
            <div>🎨 <strong>Art & Crafts</strong><br/>Supply lists, tutorials, creative inspiration</div>
            <div>🚗 <strong>Vehicles & Parts</strong><br/>Part identification, maintenance, upgrades</div>
            <div>📚 <strong>Books & Learning</strong><br/>Reading recommendations, study resources</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Choose Your Plan</h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto">
        Get smarter insights and better deals with our AI-powered content analysis
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Object.entries(plans).map(([planKey, plan]) => (
          <div key={planKey} className={`bg-white rounded-lg shadow-sm border-2 ${user?.plan === planKey ? 'border-blue-500' : 'border-gray-200'} p-6`}>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Monthly Uploads</span>
                <span className="font-medium">{plan.uploads}</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Features</h4>
              <ul className="space-y-1">
                {plan.features.map(feature => (
                  <li key={feature} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <button 
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  user?.plan === planKey 
                    ? 'bg-gray-100 text-gray-600 cursor-default' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={user?.plan === planKey}
              >
                {user?.plan === planKey ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">AI Analyzer</span>
              </div>
              
              <div className="flex space-x-6">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('analysis')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'analysis' || currentView === 'upload' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Content Analysis
                </button>
                <button
                  onClick={() => setCurrentView('upload')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'upload' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upload
                </button>
                <button
                  onClick={() => setCurrentView('pricing')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'pricing' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pricing
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email || 'user@example.com'}</span>
              <Settings className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'analysis' && renderAnalysis()}
        {currentView === 'upload' && renderUpload()}
        {currentView === 'pricing' && renderPricing()}
      </main>
    </div>
  );
};

export default AIContentAnalyzer;
