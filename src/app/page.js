"use client"

import StorageCalculator from '@/components/StorageCalculator';
import TrafficCalculator from '@/components/TrafficCalculator';
import React, { useState } from 'react';

const tabs = [
  { name: 'Traffic Calculator', href: '#', current: true, id: '1' },
  { name: 'Storage Calculator', href: '#', current: false, id: '2' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  return (
    <div className="bg-gray-900 px-6 py-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">System Design Emulator</h2>
        <p className="mt-4 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
          Your go-to tool for quick estimations during system design interviews!
        </p>
      </div>
      <div className="mx-auto max-w-xl text-center">
        <div className="flex py-4 mt-2">
          <ul role="list" className="flex min-w-full flex-none gap-x-6 px-2 font-semibold text-gray-400">
            {tabs.map((tab) => (
              <li key={tab.name} className="text-lg w-1/2">
                <a href={tab.href} onClick={() => setCurrentTab(tab.id)} className={classNames(tab.id === currentTab ? 'text-indigo-100' : '', 'text-center')}>
                  {tab.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-2xl border-b border-t border-white/20 pb-6">
        {currentTab === '1' ? <TrafficCalculator /> : <StorageCalculator />}
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-1">
          
          </div>
          <div className="sm:col-span-1">
            <a
              href="https://buymeacoffee.com/primph"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-white font-medium rounded-md px-4 py-2 flex items-center justify-center hover:bg-yellow-600 transition duration-300 ease-in-out shadow-lg max-w-xs"
            >
              <span className="text-md mr-2">☕</span>
              Buy me a coffee
            </a>
          </div>
          <div className="sm:col-span-1">
          
          </div>
        </div>
      </div>
    </div>
  )
}
