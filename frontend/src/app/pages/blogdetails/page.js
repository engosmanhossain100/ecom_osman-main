"use client";

import React, { createContext } from 'react';
import BlogDetails from '@/component/blogdetailspart';

export const MyContext = createContext();

export default function Page() {
  return (
    <MyContext.Provider value={{}}>
      <BlogDetails />
    </MyContext.Provider>
  );
}