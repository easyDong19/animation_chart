import { Children, isValidElement, ReactNode } from 'react';

export const getChildOfType = (
  children: ReactNode,
  type: React.ElementType
) => {
  const childrenArray = Children.toArray(children);
  return (
    childrenArray.find(
      (child) => isValidElement(child) && child.type === type
    ) || null
  );
};
