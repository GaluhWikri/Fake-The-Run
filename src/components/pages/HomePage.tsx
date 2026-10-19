import React from 'react';
import {
  ArrowRight,
  PencilLine,
  FileCog,
  Download,
  MapPin,
  Clock,
  Zap,
  Shield,
  ChevronRight,
  Activity,
  Route,
  FileDown,
  ExternalLink,
  CheckCircle2,
  Smartphone,
  Globe,
} from 'lucide-react';

interface HomePageProps {
  onNavigateToCreate: () => void;
  theme: 'dark' | 'light';
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToCreate, theme }) => {
  return (
    <main className="overflow-x-hidden">
      {/* ===== Hero Section — flat, no gradients ===== */}
      <section className="relative pt-20 pb-28 md:pt-28 md:pb-40 bg-brand-light dark:bg-brand-dark border-b border-gray-200 dark:border-white/10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 border border-brand-secondary/30 rounded-full">
                <Zap className="w-4 h-4 text-brand-secondary" />
                <span className="text-sm font-medium text-brand-secondary">
                  Route planning made easy
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                <span className="text-brand-dark dark:text-white">Create </span>
                <span className="text-brand-secondary">Fake</span>
                <br />
                <span className="text-brand-dark dark:text-white">Running Routes</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Draw custom, realistic running routes anywhere in the world. Generate GPX files
                compatible with Strava and other fitness apps.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button
                  onClick={onNavigateToCreate}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-brand-secondary text-white font-semibold rounded-full shadow-lg hover:bg-brand-secondary/90 transition-all duration-300 transform hover:scale-105"
                >
                  Create Your Route
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() =>
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="inline-flex items-center gap-2 px-6 py-4 text-brand-dark dark:text-white font-medium border border-gray-300 dark:border-white/20 rounded-full hover:border-brand-secondary hover:text-brand-secondary transition-colors"
                >
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Graphic — flat card */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 bg-white dark:bg-brand-primary/40 rounded-3xl flex items-center justify-center shadow-xl border border-gray-200 dark:border-white/10">
                <div className="absolute inset-4 border-2 border-dashed border-brand-secondary/30 rounded-2xl"></div>

                <img
                  src={theme === 'dark' ? '/lgooo.png' : '/lgoood.png'}
                  alt="Fake The Run Graphic"
                  className="w-48 h-48 lg:w-64 lg:h-64"
                />

                {/* Floating badges — solid, no gradient */}
                <div className="absolute -top-4 right-10 px-4 py-2 bg-white dark:bg-brand-dark rounded-lg shadow-lg border border-gray-200 dark:border-white/10 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-secondary" />
                  <span className="text-sm font-medium text-brand-dark dark:text-white">
                    Strava Ready
                  </span>
                </div>

                <div className="absolute -bottom-4 left-0 px-4 py-2 bg-white dark:bg-brand-dark rounded-lg shadow-lg border border-gray-200 dark:border-white/10 flex items-center gap-2">
                  <Route className="w-5 h-5 text-brand-secondary" />
                  <span className="text-sm font-medium text-brand-dark dark:text-white">
                    Custom Routes
                  </span>
                </div>

                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 px-4 py-2 bg-white dark:bg-brand-dark rounded-lg shadow-lg border border-gray-200 dark:border-white/10 flex items-center gap-2">
                  <FileDown className="w-5 h-5 text-brand-secondary" />
                  <span className="text-sm font-medium text-brand-dark dark:text-white">
                    GPX Export
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Section ===== */}
      <section className="py-12 bg-white dark:bg-brand-dark border-b border-gray-200 dark:border-white/10">
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

      {/* ===== Features Section ===== */}
      <section className="py-20 md:py-28 bg-brand-light dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-secondary/10 text-brand-secondary text-sm font-medium rounded-full mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-white mb-6">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features to create and export realistic running routes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group p-6 bg-white dark:bg-brand-primary/30 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-brand-secondary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors">
                <MapPin className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">
                Any Location
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose any location in the world as your starting point
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 bg-white dark:bg-brand-primary/30 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-brand-secondary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors">
                <PencilLine className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">
                Custom Design
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Draw routes in any shape — letters, patterns, or free form
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 bg-white dark:bg-brand-primary/30 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-brand-secondary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors">
                <Clock className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">
                Realistic Pace
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Set custom pace and elevation for realistic activity data
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 bg-white dark:bg-brand-primary/30 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-brand-secondary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-secondary/20 transition-colors">
                <Shield className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">
                Secure Export
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download GPX files safely with token-based system
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works Section ===== */}
      <section
        id="how-it-works"
        className="py-20 md:py-28 bg-white dark:bg-brand-dark border-y border-gray-200 dark:border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-secondary/10 text-brand-secondary text-sm font-medium rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-white mb-6">
              Create Routes in 3 Steps
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple, fast, and intuitive route creation process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="relative p-8 bg-brand-light dark:bg-brand-primary/20 rounded-2xl border border-gray-200 dark:border-white/10 text-center h-full hover:shadow-lg transition-shadow duration-300">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  1
                </div>
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-brand-secondary/10 text-brand-secondary mx-auto mb-6 mt-4">
                  <PencilLine className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4">
                  Design Your Route
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose a location and draw your route in any shape you want — letters, animals, or
                  custom designs. Use Snap to Roads for realistic routing.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="relative p-8 bg-brand-light dark:bg-brand-primary/20 rounded-2xl border border-gray-200 dark:border-white/10 text-center h-full hover:shadow-lg transition-shadow duration-300">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  2
                </div>
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-brand-secondary/10 text-brand-secondary mx-auto mb-6 mt-4">
                  <FileCog className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4">
                  Generate GPX File
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Set your pace or target time, name your route, and our system creates a realistic
                  GPX file with proper elevation data and consistent statistics.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="relative p-8 bg-brand-light dark:bg-brand-primary/20 rounded-2xl border border-gray-200 dark:border-white/10 text-center h-full hover:shadow-lg transition-shadow duration-300">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-brand-secondary text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  3
                </div>
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-brand-secondary/10 text-brand-secondary mx-auto mb-6 mt-4">
                  <Download className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4">
                  Download & Upload
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Download your GPX file and upload it to Strava or any other fitness app. See the
                  Strava upload guide below for step-by-step instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How to Upload to Strava Section ===== */}
      <section
        id="upload-strava"
        className="py-20 md:py-28 bg-brand-light dark:bg-brand-dark"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-secondary/10 text-brand-secondary text-sm font-medium rounded-full mb-4">
              Strava Guide
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-white mb-6">
              How to Upload to Strava
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              After downloading your GPX file from Fake The Run, follow these steps to publish it as
              a Strava activity.
            </p>
          </div>

          {/* Method A: Desktop / Web */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark dark:text-white">
                Method A — Via Strava Web (Desktop)
              </h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Open Strava.com',
                  desc: 'Go to https://www.strava.com and log in to your account.',
                  link: 'https://www.strava.com',
                  linkText: 'Open Strava',
                },
                {
                  title: 'Click "Upload"',
                  desc: 'In the top-right corner, click the "Upload" button (upload icon).',
                },
                {
                  title: 'Select "File" tab',
                  desc: 'On the upload page, select the "File" tab (not "Device").',
                },
                {
                  title: 'Drag your GPX file',
                  desc: 'Drag the .gpx file you downloaded from Fake The Run into the upload area, or click "Browse files" to select it.',
                },
                {
                  title: 'Edit activity details',
                  desc: 'Set the activity type (Run / Ride), title, description, and privacy. Make sure the sport type matches what you chose in Fake The Run.',
                },
                {
                  title: 'Click "Publish"',
                  desc: 'Review the distance, pace, and elevation — they should match what you saw in Fake The Run. Then click "Publish" to post the activity.',
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 bg-white dark:bg-brand-primary/20 rounded-xl border border-gray-200 dark:border-white/10"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-secondary text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-brand-dark dark:text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{step.desc}</p>
                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-brand-secondary font-medium hover:underline"
                      >
                        {step.linkText}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Method B: Mobile App */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark dark:text-white">
                Method B — Via Strava Mobile App
              </h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Open the Strava app',
                  desc: 'Launch the Strava app on your phone (iOS or Android). Make sure you are logged in.',
                },
                {
                  title: 'Go to "You" tab',
                  desc: 'Tap the "You" tab at the bottom, then tap the "+" button at the top-right.',
                },
                {
                  title: 'Select "Activity"',
                  desc: 'From the menu, choose "Activity" (not "Record").',
                },
                {
                  title: 'Choose "File"',
                  desc: 'Select "File" as the upload source, then pick the .gpx file you downloaded (check your Downloads folder).',
                },
                {
                  title: 'Set sport type & details',
                  desc: 'Choose the correct sport (Run / Ride), add a title and description, then tap "Publish".',
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 bg-white dark:bg-brand-primary/20 rounded-xl border border-gray-200 dark:border-white/10"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-secondary text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-brand-dark dark:text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips / Checklist */}
          <div className="p-6 bg-white dark:bg-brand-primary/20 rounded-2xl border border-brand-secondary/30">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-brand-secondary" />
              <h3 className="text-lg font-bold text-brand-dark dark:text-white">
                Tips for a Clean Upload
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>
                  Match the sport type in Strava with what you selected in Fake The Run (Run vs
                  Ride). A mismatch can affect pace and calorie calculations.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>
                  The distance, pace, moving time, and elevation in Strava should match what you
                  saw in Fake The Run — they are generated from the same data model.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>
                  If Strava shows a "Possible Duplicate" warning, you can safely dismiss it — the
                  GPX is a standalone activity, not synced from a device.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>
                  To transfer the GPX file to your phone, email it to yourself, use Google Drive /
                  Dropbox, or connect via USB. Then pick it from the Strava app's file picker.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== CTA Section — flat, no gradient ===== */}
      <section className="py-20 md:py-28 bg-brand-primary border-t border-white/10">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Create Your First Route?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have already created their custom running routes. Start
            designing now!
          </p>
          <button
            onClick={onNavigateToCreate}
            className="group inline-flex items-center justify-center px-10 py-5 bg-brand-secondary text-white text-lg font-bold rounded-full shadow-xl hover:bg-brand-secondary/90 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* ===== Footer ===== */}
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
                Create, plan, and export custom running routes for Strava and other fitness
                applications.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={onNavigateToCreate}
                    className="text-gray-400 hover:text-brand-secondary transition-colors text-sm"
                  >
                    Create Route
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-gray-400 hover:text-brand-secondary transition-colors text-sm"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      document.getElementById('upload-strava')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-gray-400 hover:text-brand-secondary transition-colors text-sm"
                  >
                    Upload to Strava Guide
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
