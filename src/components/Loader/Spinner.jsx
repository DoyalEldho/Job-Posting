import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
