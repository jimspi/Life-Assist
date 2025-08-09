interface UserLearningData {
  categories: Record<string, number>;        
  stores: Record<string, number>;           
  projects: Record<string, number>;         
  budget_preference: 'budget' | 'moderate' | 'premium';
  upload_count: number;
  last_updated: string;
}

interface UploadFeedback {
  uploadId: string;
  helpful: boolean;
  category: string;
  timestamp: string;
}

class UserLearningService {
  private readonly STORAGE_KEY = 'ai_analyzer_user_learning';
  
  getUserLearningData(): UserLearningData {
    if (typeof window === 'undefined') {
      return this.getDefaultLearningData();
    }
    
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return this.getDefaultLearningData();
  }

  private getDefaultLearningData(): UserLearningData {
    return {
      categories: {},
      stores: {},
      projects: {},
      budget_preference: 'moderate',
      upload_count: 0,
      last_updated: new Date().toISOString()
    };
  }

  updateFromUpload(uploadData: any) {
    const learning = this.getUserLearningData();
    
    const category = uploadData.analysis.category;
    learning.categories[category] = (learning.categories[category] || 0) + 1;
    
    uploadData.analysis.project_suggestions.forEach((project: string) => {
      learning.projects[project] = (learning.projects[project] || 0) + 0.5;
    });
    
    uploadData.analysis.price_comparison.forEach((price: any) => {
      learning.stores[price.store] = (learning.stores[price.store] || 0) + 0.3;
    });
    
    learning.upload_count += 1;
    learning.last_updated = new Date().toISOString();
    
    this.saveLearningData(learning);
  }

  recordFeedback(feedback: UploadFeedback) {
    const learning = this.getUserLearningData();
    
    const weight = feedback.helpful ? 1.5 : -0.5;
    learning.categories[feedback.category] = 
      (learning.categories[feedback.category] || 0) + weight;
    
    this.saveLearningData(learning);
  }

  getPersonalizedContext(): string {
    const learning = this.getUserLearningData();
    
    if (learning.upload_count < 3) {
      return '';
    }

    const topCategories = Object.entries(learning.categories)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);

    const preferredStores = Object.entries(learning.stores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([store]) => store);

    const favoriteProjects = Object.entries(learning.projects)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([project]) => project);

    return `
User Learning Context (${learning.upload_count} previous uploads):
- Frequently interested in: ${topCategories.join(', ')}
- Preferred stores: ${preferredStores.join(', ')}
- Favorite project types: ${favoriteProjects.join(', ')}
- Budget preference: ${learning.budget_preference}

Please prioritize recommendations that align with these user preferences while still being helpful for the current upload.
    `.trim();
  }

  private saveLearningData(data: UserLearningData) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }

  getLearningInsights() {
    const learning = this.getUserLearningData();
    
    const topCategory = Object.entries(learning.categories)
      .sort(([,a], [,b]) => b - a)[0];
    
    const learningLevel = learning.upload_count < 5 ? 'Learning' : 
                         learning.upload_count < 20 ? 'Smart' : 'Expert';
    
    return {
      level: learningLevel,
      topCategory: topCategory?.[0] || 'General',
      totalUploads: learning.upload_count,
      categories: Object.keys(learning.categories).length
    };
  }
}

export const userLearning = new UserLearningService();
