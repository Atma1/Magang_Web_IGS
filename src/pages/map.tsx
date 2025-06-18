import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MapDisplay from '../components/map/MapDisplay';
import MapLegend from '../components/map/MapLegend';
import MapFilter from '../components/map/MapFilter';
import { useSensors } from '../hooks/useSensors';
import Loading from '../components/common/Loading';

const MapPage: NextPage = () => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const { sensors, loading } = useSensors();

  const filteredSensors = filterStatus
    ? sensors.filter(sensor => sensor.status === filterStatus)
    : sensors;

  return (
    <div className='pt-28'>
      <Head>
        <title>Sensor Map | LEWS</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Sensor Locations</h1>
          <p className="text-gray-600 mt-2">Interactive map of monitoring stations</p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-card">
          <div className="p-4 border-b border-gray-100">
            <MapFilter onFilterChange={setFilterStatus} filter={filterStatus} />
          </div>

          <div className="h-[600px] relative">
            {loading ? (
              <Loading />
            ) : (
              <MapDisplay sensors={filteredSensors} />
            )}
          </div>

          <div className="p-4 border-t border-gray-100">
            <MapLegend />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
