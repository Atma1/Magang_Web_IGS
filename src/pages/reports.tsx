import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import ReportForm from '../components/reports/ReportForm';
import ReportsList from '../components/reports/ReportsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const ReportsPage: NextPage = () => {
  const handleSuccessfulSubmission = () => {
    toast.success("Report submitted successfully", {
      description: "Thank you for your report. Authorities have been notified.",
    });
  };

  return (
    <>
      <Head>
        <title>Citizen Reports | LEWS</title>
        <meta name="description" content="Report landslide incidents or concerns, and view existing reports." />
      </Head>
      
      <div className="container py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">Citizen Reports</h1>
          <p className="text-muted-foreground mt-2">Report landslide incidents or concerns, and view existing reports.</p>
        </motion.div>
        
        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="submit">Submit Report</TabsTrigger>
            <TabsTrigger value="view">View Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="submit" className="mt-6">
            <motion.div
              key="submit-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReportForm onSuccess={handleSuccessfulSubmission} />
            </motion.div>
          </TabsContent>
          <TabsContent value="view" className="mt-6">
            <motion.div
              key="view-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReportsList />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ReportsPage;
