'use client'

import React, { useState } from 'react';
import { Brain, Upload, Search, Zap, DollarSign, Star, ArrowRight, Check, Camera, Eye, TrendingUp, Shield, Users, Globe } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetStarted();
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AI Analyzer</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <button
                onClick={onGetStarted}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free and upgrade as your needs grow. No hidden fees.
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
                  <span className="text-gray-600">Price comparison</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Simple recommendations</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
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
                  <span className="text-gray-600">Smart recommendations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Project suggestions</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Brand recognition</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Historical tracking</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
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
                  <span className="text-gray-600">Enterprise AI models</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Custom integrations</span>
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
                  <span className="text-gray-600">Priority support</span>
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Recognition Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$2.3M</div>
              <div className="text-gray-600">Total Savings Found</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Retail Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Saving Money?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of smart shoppers who use AI to make better purchasing decisions.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg flex items-center space-x-2 mx-auto"
          >
            <span>Start Analyzing for Free</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">AI Analyzer</span>
              </div>
              <p className="text-gray-400 text-sm">
                Smart content analysis powered by advanced AI to help you save money and make better decisions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
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
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
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

export default LandingPage;
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn Your Photos Into
              <span className="text-blue-600 block">Smart Shopping Decisions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload any image or video and get instant AI-powered analysis, price comparisons across retailers, 
              and personalized project recommendations. Save money and make smarter purchases.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>Start Analyzing</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mb-12">Free to start • No credit card required</p>

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-6 text-left">
                      <div className="flex items-center space-x-2 mb-3">
                        <Upload className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Upload: product_photo.jpg</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        📸 Item detected with 95% confidence
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-left">
                      <div className="text-sm font-medium text-blue-900 mb-2">💡 AI Analysis</div>
                      <div className="text-xs text-blue-700">
                        • Category identified<br/>
                        • Project suggestions generated<br/>
                        • Price comparison ready
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-green-50 rounded-lg p-4 text-left">
                      <div className="text-sm font-medium text-green-900 mb-2">💰 Best Price Found</div>
                      <div className="text-xs text-green-700">
                        Save up to 30% vs regular retail
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-left">
                      <div className="text-sm font-medium text-purple-900 mb-2">🔧 Smart Recommendation</div>
                      <div className="text-xs text-purple-700">
                        Personalized suggestions based on your preferences
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge computer vision and machine learning algorithms analyze your content 
              to provide actionable insights and save you money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-blue-50 border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Object Recognition</h3>
              <p className="text-gray-600">
                Advanced AI identifies objects, materials, quantities, and context with 95%+ accuracy. 
                Recognizes thousands of products across categories.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-green-50 border border-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Price Search</h3>
              <p className="text-gray-600">
                Instantly compares prices across 50+ major retailers including Home Depot, Amazon, 
                Best Buy, and specialized suppliers to find the best deals.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-purple-50 border border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Recommendations</h3>
              <p className="text-gray-600">
                AI learns your preferences and suggests DIY projects, complementary items, 
                and money-saving opportunities tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Project
            </h2>
            <p className="text-xl text-gray-600">
              From home improvement to shopping research, AI Analyzer helps you make smarter decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Home Improvement</h3>
              <p className="text-gray-600 text-sm">
                Upload photos of materials, tools, or spaces to get project ideas, cost estimates, 
                and supplier recommendations for your next renovation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Gardening & Landscaping</h3>
              <p className="text-gray-600 text-sm">
                Identify plants, tools, and materials. Get seasonal project suggestions 
                and find the best deals on gardening supplies.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tools & Equipment</h3>
              <p className="text-gray-600 text-sm">
                Compare tool prices, find compatible accessories, and get recommendations 
                for completing your workshop setup.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Kitchen & Appliances</h3>
              <p className="text-gray-600 text-sm">
                Plan kitchen renovations, find appliance deals, and get suggestions 
                for cookware and utensil upgrades.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Shopping</h3>
              <p className="text-gray-600 text-sm">
                Research products before buying, find better alternatives, 
                and discover bulk purchase opportunities for maximum savings.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Arts & Crafts</h3>
              <p className="text-gray-600 text-sm">
                Identify craft supplies, get project inspiration, and find the best deals 
                on materials for your creative endeavors.
              </p>
            </div>
          </div>
        </div>
