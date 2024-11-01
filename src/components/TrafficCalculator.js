import React, { useState, useEffect } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

const options = [
  { id: 0, name: 'per sec' },
  { id: 1, name: 'per min' },
  { id: 2, name: 'per hour' },
  { id: 3, name: 'per day' },
  { id: 4, name: 'per month' },
  { id: 5, name: 'per year' }
]

const formatNumber = (num) => {
  let formattedNum;
  let unit;

  if (num < 1000) {
    formattedNum = num.toFixed(2);
    unit = 'req';
  } else if (num < 1000000) {
    formattedNum = (num / 1000).toFixed(2);
    unit = 'K req';
  } else if (num < 1000000000) {
    formattedNum = (num / 1000000).toFixed(2);
    unit = 'M req';
  } else {
    formattedNum = (num / 1000000000).toFixed(2);
    unit = 'B req';
  }

  return `${formattedNum} ${unit}`;
};

const timeUnitConversion = {
  'per sec': 1,
  'per min': 60,
  'per hour': 3600,
  'per day': 86400,
  'per month': 2592000,
  'per year': 31536000,
};

const namingMap = {
  'perSec': 'per second',
  'perMin': 'per minute',
  'perHour': 'per hour',
  'perDay': 'per day',
  'perMonth': 'per month',
  'perYear': 'per year',
}

const TrafficCalculator = () => {
  const [traffic, setTraffic] = useState([]);
  const [numRequests, setNumRequests] = useState(0);
  const [selected, setSelected] = useState(options[0].name);

  // useEffect(() => {
  //   calculateTraffic();
  // }, []);

  const handleReset = () => {
    setNumRequests(0);
    calculateTraffic();
  }

  const calculateTraffic = () => {
    const baseRequests = parseFloat(numRequests);
    const ratePerSecond = baseRequests / timeUnitConversion[selected];

    const calculatedTraffic = {
      perSec: formatNumber(ratePerSecond),
      perMin: formatNumber(ratePerSecond * 60),
      perHour: formatNumber(ratePerSecond * 3600),
      perDay: formatNumber(ratePerSecond * 86400),
      perMonth: formatNumber(ratePerSecond * 2592000),
      perYear: formatNumber(ratePerSecond * 31536000),
    };

    const finalResults = [];
    for (const [key, value] of Object.entries(calculatedTraffic)) {
      finalResults.push({ title: `${value} ${namingMap[key]}` });
    }
    setTraffic(finalResults);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-2">
        <label htmlFor="request" className="block text-sm/6 font-medium text-white">
          Number of Requests
        </label>
        <div className="mt-2">
          <input
            id="request"
            name="request"
            type="number"
            autoComplete="request"
            value={numRequests}
            onChange={(e) => setNumRequests(e.target.value)}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="country" className="block text-sm/6 font-medium text-white">
          Time Range:
        </label>
        <div className="mt-2">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            onChange={handleChange}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6 [&_*]:text-black"
          >
            {
              options.map((option) => {
                return (
                  <option key={option.id} value={option.value}>{option.name}</option>
                )
              })
            }
          </select>
        </div>
      </div>

      <div className="sm:col-span-2">
        <div className="mt-8 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            onClick={calculateTraffic}
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Calculate
          </button>
          <button onClick={handleReset} type="button" className="text-sm/6 font-semibold text-white">
            Reset
          </button>
        </div>
      </div>

      <div className="sm:col-span-4">
        <ul role="list" className="">
          {traffic.map((request) => (
            <li key={request.title} className="relative flex items-center space-x-4 py-2">
              <div className="min-w-0 flex-auto">
                <div className="flex items-center gap-x-3">
                  <div className="flex-none rounded-full p-1">
                    <ArrowLongRightIcon className="h-4 w-4" />
                  </div>
                  <h2 className="min-w-0 text-sm/6 font-semibold text-white">
                    <span className="whitespace-nowrap">{request.title}</span>
                  </h2>
                </div>
              </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrafficCalculator;