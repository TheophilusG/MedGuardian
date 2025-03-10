'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, Activity, Heart, Timer, Bell, User, Calendar, MapPin } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MedGuardianDashboard = () => {
  const [vitals, setVitals] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [currentPatient, setCurrentPatient] = useState({
    name: "Sarah Ahmed",
    age: 68,
    risk: "High",
    condition: "Cardiac History",
    location: "Jimma, Ethiopia",
    lastCheckup: "2024-01-15"
  });

  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm text-gray-500">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm font-semibold" style={{ color: item.color }}>
              {item.name}: {item.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const newVital = {
        time,
        heartRate: Math.floor(70 + Math.random() * 20),
        bloodOxygen: Math.floor(95 + Math.random() * 5),
        systolic: Math.floor(120 + Math.random() * 20),
        diastolic: Math.floor(80 + Math.random() * 10)
      };

      setVitals(prev => [...prev.slice(-20), newVital]);

      if (Math.random() < 0.1) {
        const newAlert = {
          id: Date.now(),
          type: Math.random() > 0.5 ? 'warning' : 'critical',
          message: `Elevated heart rate detected: ${newVital.heartRate} BPM`,
          timestamp: new Date().toLocaleTimeString()
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 5));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Activity className="text-white h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              MedGuardian Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="animate-pulse">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Live Monitoring</span>
              </div>
            </div>
            <Bell className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Patient Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="text-blue-500" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="font-semibold text-lg">{currentPatient.name}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Age</div>
                  <div className="font-semibold text-lg">{currentPatient.age}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Risk Level</div>
                  <div className="font-semibold text-lg">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {currentPatient.risk}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Condition</div>
                  <div className="font-semibold text-lg">{currentPatient.condition}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="font-semibold text-lg flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{currentPatient.location}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Last Checkup</div>
                  <div className="font-semibold text-lg flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{currentPatient.lastCheckup}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-red-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Heart className="text-red-500 h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Heart Rate</div>
                    <div className="text-2xl font-bold text-red-500">
                      {vitals[vitals.length - 1]?.heartRate || '--'} BPM
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Timer className="text-blue-500 h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Blood Pressure</div>
                    <div className="text-2xl font-bold text-blue-500">
                      {vitals[vitals.length - 1]?.systolic || '--'}/{vitals[vitals.length - 1]?.diastolic || '--'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Activity className="text-green-500 h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Blood Oxygen</div>
                    <div className="text-2xl font-bold text-green-500">
                      {vitals[vitals.length - 1]?.bloodOxygen || '--'}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts and Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vital Signs Chart */}
          <Card className="md:col-span-2 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Real-Time Vital Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vitals} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke="#ef4444" 
                      name="Heart Rate (BPM)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="bloodOxygen" 
                      stroke="#3b82f6" 
                      name="Blood Oxygen (%)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Section */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="text-red-500" />
                <span>Recent Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <Alert 
                    key={alert.id} 
                    variant={alert.type === 'critical' ? 'destructive' : 'default'}
                    className="transition-all duration-300 hover:scale-102 cursor-pointer"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="flex justify-between">
                      <span>{alert.type === 'critical' ? 'Critical Alert' : 'Warning'}</span>
                      <span className="text-sm text-gray-500">{alert.timestamp}</span>
                    </AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedGuardianDashboard;