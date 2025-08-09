import React, { useState } from 'react';
import { Brain, Upload, Search, Zap, Eye, Star, ArrowRight, Check, Camera, TrendingUp, Lightbulb, Target, BookOpen } from 'lucide-react';

const LandingPagePreview = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert('Demo: Would redirect to app!');
  };

  const handleGetStarted = () => {
    alert('Demo: Would redirect to app!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AI Analyzer</span>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 AI Analyzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPagePreview;
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <button
                onClick={handleGetStarted}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your AI-Powered
              <span className="text-blue-600 block">Visual Intelligence Assistant</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload any photo or video and get instant AI analysis, personalized insights, and smart recommendations. 
              Our AI learns your interests and gets smarter with every interaction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleEmailSubmit}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>Start Analyzing</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-12">Free to start • No credit card required • Privacy-first</p>

            {/* Demo Analysis Flow */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-6 text-left">
                      <div className="flex items-center space-x-2 mb-3">
                        <Upload className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Upload: garden_photo.jpg</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        📸 "I want to improve my garden space"
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-left">
                      <div className="text-sm font-medium text-blue-900 mb-2">🧠 AI Analysis</div>
                      <div className="text-xs text-blue-700">
                        • Identifies plants, soil, layout<br/>
                        • Analyzes lighting conditions<br/>
                        • Detects garden challenges
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-green-50 rounded-lg p-4 text-left">
                      <div className="text-sm font-medium text-green-900 mb-2">💡 Smart Insights</div>
                      <div className="text-xs text-green-700">
                        "Your tomatoes need more support. Consider adding stakes or cages."
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-left">
                      <div className="text-sm font-medium text-purple-900 mb-2">🎯 Personalized Tips</div>
                      <div className="text-xs text-purple-700">
                        Based on your gardening history: "Try companion planting with basil"
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-orange-50 rounded-lg p-4 text-left">
                      <div className="text-sm font-medium text-orange-900 mb-2">📚 Learning</div>
                      <div className="text-xs text-orange-700">
                        AI remembers you love organic gardening and suggests eco-friendly solutions
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-left">
                      <div className="text-sm font-medium text-yellow-900 mb-2">🔮 Next Steps</div>
                      <div className="text-xs text-yellow-700">
                        "Schedule watering reminders" + seasonal planting calendar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Universal AI Visual Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced computer vision and natural language processing that understands any image, 
              learns from your interactions, and provides increasingly personalized insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-blue-50 border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Universal Recognition</h3>
              <p className="text-gray-600">
                Analyzes any image content - food, plants, objects, spaces, documents, art. 
                Understands context, relationships, and provides detailed insights about what it sees.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-green-50 border border-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Continuous Learning</h3>
              <p className="text-gray-600">
                Remembers your interests, preferences, and goals. Gets smarter with each upload, 
                providing increasingly relevant and personalized recommendations.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-purple-50 border border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Context-Aware Insights</h3>
              <p className="text-gray-600">
                Combines what it sees with your stated goals and past behavior to provide 
                actionable, relevant suggestions tailored specifically to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Analyze Anything, Learn Everything
            </h2>
            <p className="text-xl text-gray-600">
              From cooking to learning, gardening to creativity - your AI assistant adapts to your interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Food & Cooking</h3>
              <p className="text-gray-600 text-sm">
                "What can I make with these ingredients?" Get recipes, nutritional info, 
                cooking tips, and dietary suggestions based on your preferences.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Plants & Nature</h3>
              <p className="text-gray-600 text-sm">
                Identify species, diagnose plant health, get care instructions, 
                and receive seasonal gardening advice tailored to your garden.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Learning & Education</h3>
              <p className="text-gray-600 text-sm">
                Analyze documents, explain concepts, solve problems, and get study recommendations 
                based on your learning style and progress.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Art & Creativity</h3>
              <p className="text-gray-600 text-sm">
                Get artistic inspiration, technique analysis, color palette suggestions, 
                and creative project ideas based on your artistic interests.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Home & Lifestyle</h3>
              <p className="text-gray-600 text-sm">
                Interior design advice, organization tips, home improvement suggestions, 
                and space optimization based on your living style.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Problem Solving</h3>
              <p className="text-gray-600 text-sm">
                Analyze problems, brainstorm solutions, get step-by-step guidance, 
                and receive insights tailored to your approach and experience level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Learns Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI That Actually Learns You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike generic AI, our system builds a personal understanding of your interests, 
              goals, and preferences to provide increasingly relevant insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Remembers Your Interests</h3>
                  <p className="text-gray-600">
                    Tracks what types of content you upload most, your feedback patterns, 
                    and builds a profile of your interests and expertise levels.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Adapts to Your Goals</h3>
                  <p className="text-gray-600">
                    Learns from the context you provide and adjusts recommendations 
                    to match your current projects, skill level, and preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Improves With Feedback</h3>
                  <p className="text-gray-600">
                    Uses your thumbs up/down feedback to understand what insights 
                    are most valuable to you and refines future recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Journey Example</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900">Upload 1: Garden Photo</div>
                  <div className="text-xs text-gray-600 mt-1">AI learns: User interested in gardening</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900">Upload 5: Cooking Ingredients</div>
                  <div className="text-xs text-gray-600 mt-1">AI learns: User cooks with garden herbs</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900">Upload 10: Any New Photo</div>
                  <div className="text-xs text-gray-600 mt-1">AI suggests: Garden-to-table recipe ideas</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-900">Result: Personalized Intelligence</div>
                  <div className="text-xs text-blue-700 mt-1">Every recommendation now fits your lifestyle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free and upgrade as your AI gets smarter. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">Free</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">10 uploads per month</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Basic AI analysis</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Essential insights</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Basic learning</span>
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Get Started Free
              </button>
            </div>

            <div className="bg-white rounded-xl border-2 border-blue-500 p-8 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">Pro</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$19</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">500 uploads per month</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Advanced AI analysis</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Deep personalization</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Learning analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Priority processing</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Export insights</span>
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Pro Trial
              </button>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Unlimited uploads</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Custom AI models</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">API access</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Dedicated support</span>
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Analysis Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Images Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Content Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready for Your Personal AI Assistant?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who use AI to understand their world better, one photo at a time.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg flex items-center space-x-2 mx-auto"
          >
            <span>Start Your AI Journey</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">AI Analyzer</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your personal AI visual intelligence assistant that learns and grows with you.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
