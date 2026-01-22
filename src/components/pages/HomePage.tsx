import React from 'react';
import { ArrowRight, PencilLine, FileCog, Download, MapPin, Clock, Zap, Shield, ChevronRight, Activity, Route, FileDown } from 'lucide-react';

interface HomePageProps {
  onNavigateToCreate: () => void;
  theme: 'dark' | 'light';
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToCreate, theme }) => {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section - Modern with gradient and pattern */}
      <section className="relative pt-20 pb-28 md:pt-28 md:pb-40 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-white to-brand-light dark:from-brand-dark dark:via-brand-primary/30 dark:to-brand-dark"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-full border border-brand-secondary/20">
                <Zap className="w-4 h-4 text-brand-secondary" />
                <span className="text-sm font-medium text-brand-secondary">Route planning made easy</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                <span className="text-brand-dark dark:text-white">Create </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">Fake</span>
                <br />
                <span className="text-brand-dark dark:text-white">Running Routes</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Draw custom, realistic running routes anywhere in the world. Generate GPX files compatible with Strava and other fitness apps.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button
                  onClick={onNavigateToCreate}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-brand-secondary text-white font-semibold rounded-full shadow-lg shadow-brand-secondary/30 hover:shadow-xl hover:shadow-brand-secondary/40 transition-all duration-300 transform hover:scale-105"
                >
                  Create Your Route
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-6 py-4 text-brand-dark dark:text-white font-medium hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors"
                >
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Graphic - Enhanced */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/20 to-brand-primary/20 rounded-full blur-2xl scale-110"></div>
                
                {/* Main circle */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-brand-light to-white dark:from-brand-dark dark:to-brand-primary/30 rounded-full flex items-center justify-center shadow-2xl border border-brand-secondary/10">
                  {/* Inner decorative ring */}
                  <div className="absolute inset-4 border-2 border-dashed border-brand-secondary/20 rounded-full"></div>
                  
                  <img 
                    src={theme === 'dark' ? '/lgooo.png' : '/lgoood.png'} 
                    alt="Fake The Run Graphic" 
                    className="w-48 h-48 lg:w-64 lg:h-64 drop-shadow-xl" 
                  />
                </div>
                
                {/* Floating badges around the circle */}
                <div className="absolute -top-4 right-10 px-4 py-2 bg-white dark:bg-brand-dark rounded-lg shadow-lg border border-gray-100 dark:border-white/10 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-secondary" />
                  <span className="text-sm font-medium text-brand-dark dark:text-white">Strava Ready</span>
                </div>
                
                <div className="absolute -bottom-4 left-0 px-4 py-2 bg-white dark:bg-brand-dark rounded-lg shadow-lg border border-gray-100 dark:border-white/10 flex items-center gap-2">
                  <Route className="w-5 h-5 text-brand-secondary" />
                  <span className="text-sm font-medium text-brand-dark dark:text-white">Custom Routes</span>
                </div>
                
                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 px-4 py-2 bg-white dark:bg-brand-dark rounded-lg shadow-lg border border-gray-100 dark:border-white/10 flex items-center gap-2">
                  <FileDown className="w-5 h-5 text-brand-secondary" />
                  <span className="text-sm font-medium text-brand-dark dark:text-white">GPX Export</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-brand-dark border-y border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-2">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Routes Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-2">5K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">GPX Compatible</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-brand-light dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-secondary/10 text-brand-secondary text-sm font-medium rounded-full mb-4">Features</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-white mb-6">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features to create and export realistic running routes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group p-6 bg-white dark:bg-brand-primary/30 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-brand-secondary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors">
                <MapPin className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">Any Location</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose any location in the world as your starting point</p>
            </div>
            
            {/* Feature 2 */}
            <div className="group p-6 bg-white dark:bg-brand-primary/30 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-brand-secondary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors">
                <PencilLine className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">Custom Design</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Draw routes in any shape - letters, patterns, or free form</p>
            </div>
            
            {/* Feature 3 */}
            <div className="group p-6 bg-white dark:bg-brand-primary/30 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-brand-secondary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors">
                <Clock className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">Realistic Pace</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Set custom pace and elevation for realistic activity data</p>
            </div>
            
            {/* Feature 4 */}
            <div className="group p-6 bg-white dark:bg-brand-primary/30 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-brand-secondary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors">
                <Shield className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">Secure Export</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Download GPX files safely with token-based system</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-white to-brand-light dark:from-brand-primary/20 dark:to-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-secondary/10 text-brand-secondary text-sm font-medium rounded-full mb-4">How It Works</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-white mb-6">
              Create Routes in 3 Steps
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple, fast, and intuitive route creation process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative p-8 bg-white dark:bg-brand-dark rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 text-center h-full">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  1
                </div>
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10 text-brand-secondary mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <PencilLine className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4">Design Your Route</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose a location and draw your route in any shape you want - letters, animals, or custom designs.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative p-8 bg-white dark:bg-brand-dark rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 text-center h-full">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  2
                </div>
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10 text-brand-secondary mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <FileCog className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4">Generate GPX File</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our system creates a realistic GPX file with proper elevation data and route details.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative p-8 bg-white dark:bg-brand-dark rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 text-center h-full">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  3
                </div>
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10 text-brand-secondary mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4">Download & Use</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Download your GPX file and upload it to Strava or any other fitness app.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Mulai dari Rp 10.000 per unduhan file.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-brand-primary to-brand-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Create Your First Route?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have already created their custom running routes. Start designing now!
          </p>
          <button
            onClick={onNavigateToCreate}
            className="group inline-flex items-center justify-center px-10 py-5 bg-brand-secondary text-white text-lg font-bold rounded-full shadow-2xl shadow-brand-secondary/30 hover:shadow-3xl hover:shadow-brand-secondary/50 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/lgooo.png" alt="Logo" className="h-10 w-10" />
                <span className="text-xl font-bold text-white">Fake The Run</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create, plan, and export custom running routes for Strava and other fitness applications.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={onNavigateToCreate} className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">
                    Create Route
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-brand-secondary transition-colors text-sm">
                    How It Works
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Info */}
            <div>
              <h4 className="text-white font-semibold mb-4">Information</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Activity className="w-4 h-4 text-brand-secondary" />
                  Strava Compatible
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <FileDown className="w-4 h-4 text-brand-secondary" />
                  GPX Format Export
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Shield className="w-4 h-4 text-brand-secondary" />
                  Secure & Private
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Fake The Run. All Rights Reserved.
              </p>
              <p className="text-xs text-gray-600">
                Kompatibel dengan format GPX • Siap diekspor untuk diunggah ke Strava
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;