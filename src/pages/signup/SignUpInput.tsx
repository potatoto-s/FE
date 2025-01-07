import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label: string;
  inputType: HTMLInputTypeAttribute;
  attribute?: UseFormRegisterReturn;
  children?: ReactNode;
  message?: string;
  messageColor?: 'green' | 'red';
  placeholder?: string;
};

function SignUpInput({
  label,
  inputType,
  attribute,
  children,
  message,
  messageColor = 'red',
  placeholder,
}: Props) {
  return (
    <>
      <div className="flex items-center relative flex-wrap sm:flex-nowrap">
        <label className="w-1/4 sm:w-1/4 text-gray-700 pr-2 mb-2 sm:mb-0">
          {label}
        </label>
        {inputType === 'radio' ? (
          <div className="flex items-center space-x-4">{children}</div>
        ) : (
          <div className="flex items-center w-2/4 relative">
            <input
              type={inputType}
              {...attribute}
              placeholder={placeholder}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {children && (
              <div className="absolute right-[-4rem]">{children}</div>
            )}
          </div>
        )}
      </div>
      {message && (
        <p
          className={`text-${
            messageColor === 'green' ? 'green-500' : 'red-500'
          } text-sm mt-1 ml-[25%]`}
        >
          {message}
        </p>
      )}
    </>
  );
}

export default SignUpInput;
