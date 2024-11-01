import React, { useState, useEffect } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

const options = [
  { id: 0, name: 'KB' },
  { id: 1, name: 'MB' },
  { id: 2, name: 'GB' },
  { id: 3, name: 'TB' }
]

const namingMap = {
  'perDay': 'per day',
  'perMonth': 'per month',
  'perYear': 'per year',
}

const unitsInBytes = {
  KB: 1 / 1024,
  MB: 1,
  GB: 1024,
  TB: 1024 * 1024,
};

const formatNumber = (num) => {
  if (typeof num!== 'number' || isNaN(num)) {
    console.error('Invalid input for formatNumber:', num);
    return 'N/A';
  }

  let formattedNum;
  let unit;

  if (num < 1000) {
    formattedNum = num.toFixed(2);
    unit = 'MB';
  } else if (num < 1000000) {
    formattedNum = (num / 1000).toFixed(2);
    unit = 'GB';
  } else {
    formattedNum = (num / 1000000).toFixed(2);
    unit = 'TB';
  }

  return `${formattedNum} ${unit}`;
};

const StorageCalculator = () => {
  const [storage, setStorage] = useState([]);
  const [storagePerItem, setStoragePerItem] = useState(0);
  const [itemPerDay, setItemPerDay] = useState(0);
  const [daysPerYear, setDaysPerYear] = useState(365);
  const [yearsToStore, setYearsToStore] = useState(0);
  const [selected, setSelected] = useState(options[0].name);

  // useEffect(() => {
  //   calculateStorage();
  // }, []);

  const handleReset = () => {
    setStoragePerItem(0);
    setItemPerDay(0);
    setDaysPerYear(365);
    setYearsToStore(0);
  }

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const calculateStorage = () => {
    console.log(selected)
    const storagePerItemInBytes = parseFloat(storagePerItem) * unitsInBytes[selected];
    const dailyStorage = storagePerItemInBytes * parseFloat(itemPerDay);

    const days = parseFloat(daysPerYear) || 365;
    let totalStorage = dailyStorage * days;

    if (yearsToStore) {
      totalStorage *= parseFloat(yearsToStore);
    }

    const calculatedStorage = {
      perDay: formatNumber(dailyStorage),
      perMonth: formatNumber(dailyStorage * 30),
      perYear: formatNumber(totalStorage),
    };

    const finalResults = [];
    for (const [key, value] of Object.entries(calculatedStorage)) {
      finalResults.push({ title: `${value} ${namingMap[key]}` });
    }
    setStorage(finalResults);
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
      <div className="sm:col-span-2">
        <label htmlFor="request" className="block text-sm/6 font-medium text-white">
          Storage Per Item
        </label>
        <div className="mt-2">
          <input
            id="request"
            name="request"
            type="number"
            autoComplete="request"
            value={storagePerItem}
            onChange={(e) => setStoragePerItem(e.target.value)}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="country" className="block text-sm/6 font-medium text-white">
          Unit
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
        <label htmlFor="request" className="block text-sm/6 font-medium text-white">
          Items Per Day
        </label>
        <div className="mt-2">
          <input
            id="items"
            name="items"
            type="number"
            autoComplete="items"
            value={itemPerDay}
            onChange={(e) => setItemPerDay(e.target.value)}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="request" className="block text-sm/6 font-medium text-white">
          Days Per Year
        </label>
        <div className="mt-2">
          <input
            id="days"
            name="days"
            type="number"
            autoComplete="days"
            value={daysPerYear}
            onChange={(e) => setDaysPerYear(e.target.value)}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
          />
        </div>
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="request" className="block text-sm/6 font-medium text-white">
          Years To Store
        </label>
        <div className="mt-2">
          <input
            id="years"
            name="years"
            type="number"
            autoComplete="years"
            value={yearsToStore}
            onChange={(e) => setYearsToStore(e.target.value)}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="mt-8 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            onClick={calculateStorage}
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
          {storage.map((request) => (
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

export default StorageCalculator;