import React, { createContext } from 'react';
import BlogDetails from '@/component/blogdetailspart';

export const MyContext = createContext();

export default function Page() {
  const someValue = "Shared value";
  return (
    <MyContext.Provider value={someValue}>
      <BlogDetails />
    </MyContext.Provider>
  );
}