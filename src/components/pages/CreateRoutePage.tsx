import React, { useState } from 'react';
import MapCanvas from '../MapCanvas';
import DrawingTools from '../DrawingTools';
import ActivitySelector from '../ActivitySelector';
import PaceCalculator from '../PaceCalculator';
import RouteStats from '../RouteStats';
import RouteForm from '../RouteForm';
import { exportToGPX } from '../../utils/gpxExport';
import { Map, Settings, BarChart3 } from 'lucide-react';

// Deklarasikan window.snap
declare global {
  interface Window {
    snap: any;
  }
}

interface RoutePoint {
  lat: number;
  lng: number;
  timestamp: number;
}

const CreateRoutePage = () => {
  const [isDrawing, setIsDrawing] = useState(true);
  const [showWaypoints, setShowWaypoints] = useState(true);
  const [activity, setActivity] = useState<'run' | 'bike'>('run');
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [pace, setPace] = useState(360); // Default pace: 6:00/km
  const [routeDetails, setRouteDetails] = useState({ name: '', description: '' });
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'settings'>('stats');

  const calculateDistance = () => {
    if (routePoints.length < 2) return 0;

    let totalDistance = 0;
    for (let i = 1; i < routePoints.length; i++) {
      const R = 6371; // Earth's radius in km
      const dLat = (routePoints[i].lat - routePoints[i - 1].lat) * Math.PI / 180;
      const dLng = (routePoints[i].lng - routePoints[i - 1].lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(routePoints[i - 1].lat * Math.PI / 180) * Math.cos(routePoints[i].lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      totalDistance += R * c;
    }
    return totalDistance;
  };

  const handleExport = async () => {
    if (routePoints.length === 0) {
      alert('Silakan buat rute terlebih dahulu.');
      return;
    }

    // PAYMENT GATEWAY DISABLED - Direct export without payment
    // TODO: Re-enable payment gateway when ready
    try {
      exportToGPX(routePoints, activity, routeDetails, pace);

      setShowDownloadSuccess(true);
      setTimeout(() => {
        setShowDownloadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saat export:', error);
      alert('Terjadi kesalahan saat export. Silakan coba lagi.');
    }

    /* PAYMENT GATEWAY CODE - TEMPORARILY DISABLED
    try {
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route_name: routeDetails.name || 'GPX Route',
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal membuat transaksi');
      }

      const { token } = await response.json();

      window.snap.pay(token, {
        onSuccess: function (result: any) {
          console.log(result);
          exportToGPX(routePoints, activity, routeDetails, pace);
          setShowDownloadSuccess(true);
          setTimeout(() => {
            setShowDownloadSuccess(false);
          }, 3000);
        },
        onPending: function (result: any) {
          console.log(result);
          alert('Menunggu pembayaran Anda!');
        },
        onError: function (result: any) {
          console.log(result);
          alert('Pembayaran gagal!');
        },
        onClose: function () {
          alert('Anda menutup pop-up tanpa menyelesaikan pembayaran');
        },
      });
    } catch (error) {
      console.error('Error saat proses pembayaran:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
    */
  };


  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-brand-light via-white to-brand-light dark:from-brand-dark dark:via-brand-primary/10 dark:to-brand-dark">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2 relative z-10">
            <div className="bg-white dark:bg-brand-dark rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 h-[calc(100vh-200px)] overflow-hidden">
              {/* Map Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-brand-secondary/10 to-transparent border-b border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-brand-secondary" />
                  <span className="font-medium text-brand-dark dark:text-white">Map Canvas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDrawing
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}>
                    {isDrawing ? '● Drawing Mode' : '○ View Mode'}
                  </span>
                  <span className="px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full text-xs font-medium">
                    {routePoints.length} points
                  </span>
                </div>
              </div>
              <div className="h-[calc(100%-52px)]">
                <MapCanvas
                  isDrawing={isDrawing}
                  showWaypoints={showWaypoints}
                  onRouteChange={setRoutePoints}
                />
              </div>
            </div>
          </div>

          {/* Controls Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-brand-dark rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 h-[calc(100vh-200px)] flex flex-col overflow-hidden">
              {/* Sidebar Header with Tabs */}
              <div className="flex border-b border-gray-100 dark:border-white/10">
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all ${activeTab === 'stats'
                    ? 'text-brand-secondary border-b-2 border-brand-secondary bg-brand-secondary/5'
                    : 'text-gray-500 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Stats & Export
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all ${activeTab === 'settings'
                    ? 'text-brand-secondary border-b-2 border-brand-secondary bg-brand-secondary/5'
                    : 'text-gray-500 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-grow overflow-y-auto">
                <div className="p-4 space-y-5">
                  {activeTab === 'stats' ? (
                    <>
                      {/* Route Statistics */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-brand-dark dark:text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                          Route Statistics
                        </h3>
                        <RouteStats
                          points={routePoints}
                          activity={activity}
                          pace={pace}
                          onExport={handleExport}
                          showDownloadSuccess={showDownloadSuccess}
                        />
                      </div>

                      {/* Drawing Tools */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-brand-dark dark:text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                          Drawing Tools
                        </h3>
                        <DrawingTools
                          isDrawing={isDrawing}
                          onDrawingToggle={() => setIsDrawing(!isDrawing)}
                          showWaypoints={showWaypoints}
                          onWaypointsToggle={() => setShowWaypoints(!showWaypoints)}
                        />
                      </div>

                      {/* Activity Type */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-brand-dark dark:text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                          Activity Type
                        </h3>
                        <ActivitySelector
                          activity={activity}
                          onActivityChange={setActivity}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Pace Calculator */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-brand-dark dark:text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                          Pace Calculator
                        </h3>
                        <PaceCalculator
                          activity={activity}
                          distance={calculateDistance()}
                          onPaceChange={setPace}
                        />
                      </div>

                      {/* Route Details */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-brand-dark dark:text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                          Route Details
                        </h3>
                        <RouteForm onFormChange={setRouteDetails} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Distance: {calculateDistance().toFixed(2)} km</span>
                  <span>Points: {routePoints.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CreateRoutePage;