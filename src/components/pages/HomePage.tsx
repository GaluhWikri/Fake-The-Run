import React, { useState } from 'react';
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
  AlertCircle,
} from 'lucide-react';

interface HomePageProps {
  onNavigateToCreate: () => void;
  theme: 'dark' | 'light';
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToCreate, theme }) => {
  const [stravaTab, setStravaTab] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <main className="overflow-x-hidden">
      {/* ===== Hero Section — flat, no gradient text, line-grid + box background ===== */}
      <section className="relative pt-20 pb-28 md:pt-28 md:pb-40 bg-brand-light dark:bg-brand-dark border-b border-gray-200 dark:border-white/10 overflow-hidden">
        {/* Background line-grid pattern (garis-garis) — solid strokes, no gradient */}
        <div
          className="absolute inset-0 opacity-[0.5] dark:opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(229,83,61,0.18) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(229,83,61,0.18) 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
          }}
        />

        {/* Background boxes (kotak-kotak) — outline squares scattered */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-16 left-[6%] w-24 h-24 border border-brand-secondary/20"></div>
          <div className="absolute top-32 left-[14%] w-12 h-12 border border-brand-secondary/15"></div>
          <div className="absolute bottom-20 left-[22%] w-32 h-32 border border-brand-secondary/15"></div>
          <div className="absolute top-24 right-[8%] w-20 h-20 border border-brand-secondary/20"></div>
          <div className="absolute bottom-28 right-[16%] w-16 h-16 border border-brand-secondary/15"></div>
          <div className="absolute bottom-12 right-[4%] w-40 h-40 border border-brand-secondary/10"></div>
          <div className="absolute top-1/2 left-[38%] w-14 h-14 border border-brand-secondary/10 rotate-45"></div>
          <div className="absolute top-[70%] right-[32%] w-10 h-10 border border-brand-secondary/15"></div>
          {/* Filled accent boxes — solid, small */}
          <div className="absolute top-28 left-[30%] w-3 h-3 bg-brand-secondary/40"></div>
          <div className="absolute bottom-36 right-[26%] w-2.5 h-2.5 bg-brand-secondary/40"></div>
          <div className="absolute top-[62%] left-[8%] w-2 h-2 bg-brand-secondary/30"></div>
        </div>

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

            {/* Right Graphic — circular logo, no square */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 bg-white dark:bg-brand-primary/40 rounded-full flex items-center justify-center shadow-xl border border-gray-200 dark:border-white/10">
                {/* Inner dashed ring — circular */}
                <div className="absolute inset-6 border-2 border-dashed border-brand-secondary/30 rounded-full"></div>

                <img
                  src={theme === 'dark' ? '/lgooo.png' : '/lgoood.png'}
                  alt="Fake The Run Graphic"
                  className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover"
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

      {/* ===== How to Upload to Strava Section — user friendly ===== */}
      <section id="upload-strava" className="py-20 md:py-28 bg-brand-light dark:bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-secondary/10 text-brand-secondary text-sm font-medium rounded-full mb-4">
              Strava Guide
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark dark:text-white mb-6">
              How to Upload to Strava
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Already downloaded your GPX file? Pick the device you're using and follow the steps.
            </p>
          </div>

          {/* Device Tab Switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-white dark:bg-brand-primary/30 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
              <button
                onClick={() => setStravaTab('desktop')}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                  stravaTab === 'desktop'
                    ? 'bg-brand-secondary text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-brand-secondary'
                }`}
              >
                <Globe className="w-4 h-4" />
                Desktop / Web
              </button>
              <button
                onClick={() => setStravaTab('mobile')}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                  stravaTab === 'mobile'
                    ? 'bg-brand-secondary text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-brand-secondary'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Mobile App
              </button>
            </div>
          </div>

          {/* Steps — vertical timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[22px] top-4 bottom-4 w-px bg-gray-200 dark:bg-white/10 hidden sm:block"></div>

            <div className="space-y-4">
              {(stravaTab === 'desktop'
                ? [
                    {
                      title: 'Open Strava in your browser',
                      desc: 'Go to strava.com and log in with your account.',
                      link: 'https://www.strava.com',
                      linkText: 'Open strava.com',
                    },
                    {
                      title: 'Click the "Upload" button',
                      desc: 'It is the upload icon at the top-right corner of the page.',
                    },
                    {
                      title: 'Choose the "File" tab',
                      desc: 'Make sure you are on "File", not "Device".',
                    },
                    {
                      title: 'Drop your GPX file',
                      desc: 'Drag the .gpx file you downloaded from Fake The Run into the upload box, or click "Browse files".',
                    },
                    {
                      title: 'Fill in the activity details',
                      desc: 'Pick the matching sport (Run or Ride), add a title, and set privacy.',
                      hint: 'Important: the sport type must match what you chose in Fake The Run.',
                    },
                    {
                      title: 'Review and click "Publish"',
                      desc: 'Check distance, pace and elevation — they should match the app. Then publish.',
                    },
                  ]
                : [
                    {
                      title: 'Open the Strava app',
                      desc: 'Launch Strava on your phone and make sure you are logged in.',
                    },
                    {
                      title: 'Tap "You" then the "+" button',
                      desc: 'The "You" tab is at the bottom bar; the "+" button is at the top-right.',
                    },
                    {
                      title: 'Select "Activity"',
                      desc: 'Choose "Activity" (not "Record") from the menu that opens.',
                    },
                    {
                      title: 'Choose "File" as the source',
                      desc: 'Then browse and pick the .gpx file from your Downloads folder.',
                      hint: 'Send the file to your phone first via email, Google Drive, or USB.',
                    },
                    {
                      title: 'Set the sport type and publish',
                      desc: 'Pick Run or Ride, add a title, then tap "Publish".',
                    },
                  ]
              ).map((step, i) => (
                <div key={i} className="relative flex gap-4 sm:gap-5">
                  {/* Numbered circle on timeline */}
                  <div className="relative z-10 flex-shrink-0 w-11 h-11 bg-brand-secondary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-brand-light dark:ring-brand-dark">
                    {i + 1}
                  </div>

                  {/* Card */}
                  <div className="flex-1 p-5 bg-white dark:bg-brand-primary/20 rounded-xl border border-gray-200 dark:border-white/10 hover:border-brand-secondary/40 transition-colors">
                    <h4 className="font-semibold text-brand-dark dark:text-white mb-1.5">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.desc}
                    </p>

                    {step.hint && (
                      <div className="mt-3 flex items-start gap-2 p-2.5 bg-brand-secondary/8 rounded-lg border border-brand-secondary/20">
                        <AlertCircle className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-secondary font-medium">{step.hint}</span>
                      </div>
                    )}

                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-brand-secondary text-white text-xs font-semibold rounded-full hover:bg-brand-secondary/90 transition-colors"
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

          {/* Quick Tips — visual cards */}
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark dark:text-white">
                Before You Upload
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white dark:bg-brand-primary/20 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-brand-secondary" />
                  <h4 className="font-semibold text-sm text-brand-dark dark:text-white">
                    Match the sport type
                  </h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Run vs Ride in Strava must match your choice in Fake The Run, or pace and calories
                  will be off.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-brand-primary/20 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-brand-secondary" />
                  <h4 className="font-semibold text-sm text-brand-dark dark:text-white">
                    Numbers should line up
                  </h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Distance, pace, moving time and elevation come from the same model, so they should
                  match.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-brand-primary/20 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-brand-secondary" />
                  <h4 className="font-semibold text-sm text-brand-dark dark:text-white">
                    Duplicate warning is fine
                  </h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  If Strava warns about a duplicate, you can safely dismiss it — the GPX is a
                  standalone file.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-brand-primary/20 rounded-xl border border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4 text-brand-secondary" />
                  <h4 className="font-semibold text-sm text-brand-dark dark:text-white">
                    Getting the file to your phone
                  </h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Email it to yourself or use Google Drive / Dropbox, then pick it from the app's
                  file browser.
                </p>
              </div>
            </div>
          </div>

          {/* CTA nudge */}
          <div className="mt-10 p-6 bg-white dark:bg-brand-primary/20 rounded-2xl border border-brand-secondary/30 text-center">
            <p className="text-brand-dark dark:text-white font-medium mb-4">
              Belum punya file GPX-nya? Buat rute dulu dalam hitungan menit.
            </p>
            <button
              onClick={onNavigateToCreate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary text-white text-sm font-semibold rounded-full hover:bg-brand-secondary/90 transition-colors"
            >
              Create Your Route
              <ArrowRight className="w-4 h-4" />
            </button>
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
