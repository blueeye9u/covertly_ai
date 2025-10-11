// src/components/SubscriptionPlans.js

import React from "react";

const SubscriptionPlans = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center md:flex-row">
      {/* Premium Plan */}
      <div className="border-gray-200 m-4 max-w-sm overflow-hidden rounded border bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Premium Plan</h2>
        <p className="text-gray-700 mb-6">
          To discover our platform & its features
        </p>
        <div className="mb-4 text-4xl font-bold">
          $19<span className="text-lg font-normal">/ per month</span>
        </div>
        <ul className="mb-6">
          <li className="mb-2">Unlimited use of GPT-3.5</li>
          <li className="mb-2">No limits on tokens or words</li>
          <li className="mb-2">
            Expect seamless transition and continued access to valued features
          </li>
        </ul>
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Upgrade Plan
        </button>
      </div>

      {/* Advance Plan */}
      <div className="border-gray-200 m-4 max-w-sm overflow-hidden rounded border bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Advance Plan</h2>
        <p className="text-gray-700 mb-6">
          To discover our platform & its features
        </p>
        <div className="mb-4 text-4xl font-bold">
          $34<span className="text-lg font-normal">/ per month</span>
        </div>
        <ul className="mb-6">
          <li className="mb-2">
            Grants access to GPT-4o initially for 600k tokens
          </li>
          <li className="mb-2">No daily question limits</li>
          <li className="mb-2">
            Top-up options available: $10 for 250k more tokens for GPT-4o;
            top-up tokens do not expire
          </li>
        </ul>
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
