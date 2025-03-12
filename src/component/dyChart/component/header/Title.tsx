import React, { ReactNode } from 'react';

export const Title = ({ field }: { field: any }) => {
  return <div className={field.className}>{field.name}</div>;
};
