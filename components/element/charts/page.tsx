'use client';
import Breadcrumb from '@/components/element/other/breadcrumb';
import ChartOne from '@/components/element/charts/ChartOne';
import ChartTwo from '@/components/element/charts/ChartTwo';
import ChartThree from '@/components/element/charts/ChartThree';
import React from 'react';

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
