import classNames from 'classnames';
import React from 'react';

export const Button = ({ field }: { field: any }) => {
  return (
    <button
      onClick={field.clickEvent}
      className={classNames(
        {
          'border-gray-800 border flex items-center gap-[0.375rem] px-3 py-[0.375rem] rounded-[0.25rem]':
            field.default,
        },
        field?.className
      )}
    >
      <div>{field.name}</div>
    </button>
  );
};
