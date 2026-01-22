import React, { useState, useEffect } from 'react';
import MapCanvas from '../MapCanvas';
import DrawingTools from '../DrawingTools';
import ActivitySelector from '../ActivitySelector';
import PaceCalculator from '../PaceCalculator';
import RouteStats from '../RouteStats';
import RouteForm from '../RouteForm';
import { exportToGPX } from '../../utils/gpxExport';

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
      // 1. Minta token transaksi dari backend
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

      // 2. Tampilkan pop-up pembayaran Midtrans
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
    <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Map Area */}
        <div className="lg:col-span-2 relative z-10">
          <div className="bg-brand-light dark:bg-brand-dark rounded-xl shadow-lg h-[calc(100vh-120px)] overflow-hidden">
            <MapCanvas
              isDrawing={isDrawing}
              showWaypoints={showWaypoints}
              onRouteChange={setRoutePoints}
            />
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-brand-light dark:bg-brand-dark rounded-xl shadow-lg h-[calc(100vh-120px)] flex flex-col">
            <div className="flex-grow p-1 overflow-y-auto">
              <div className="p-4 space-y-6">
                {/* Section 1: Stats & Export */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light">Route Statistics & Export</h3>
                  <RouteStats
                    points={routePoints}
                    activity={activity}
                    pace={pace}
                    onExport={handleExport}
                    showDownloadSuccess={showDownloadSuccess}
                  />
                </div>

                <hr className="border-black/10 dark:border-white/10" />

                {/* Section 2: Planning Tools */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light">Planning Tools</h3>
                  <DrawingTools
                    isDrawing={isDrawing}
                    onDrawingToggle={() => setIsDrawing(!isDrawing)}
                    showWaypoints={showWaypoints}
                    onWaypointsToggle={() => setShowWaypoints(!showWaypoints)}
                  />
                  <ActivitySelector
                    activity={activity}
                    onActivityChange={setActivity}
                  />
                </div>

                <hr className="border-black/10 dark:border-white/10" />

                {/* Section 3: Pace */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light">Pace Calculator</h3>
                  <PaceCalculator
                    activity={activity}
                    distance={calculateDistance()}
                    onPaceChange={setPace}
                  />
                </div>

                <hr className="border-black/10 dark:border-white/10" />

                {/* Section 4: Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light">Route Details</h3>
                  <RouteForm onFormChange={setRouteDetails} />
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