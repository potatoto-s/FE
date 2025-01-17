import { useController } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  messageColor?: 'green' | 'red';
};

const PhoneNumberInput = ({
  label,
  name,
  control,
  placeholder = '010-1234-5678',
  messageColor = 'red',
}: Props) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value.replace(/\D/g, ''); // 숫자만 유지
    if (formattedValue.length > 3 && formattedValue.length <= 7) {
      formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
    } else if (formattedValue.length > 7) {
      formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}-${formattedValue.slice(7, 11)}`;
    }
    onChange(formattedValue); // react-hook-form에 업데이트
  };

  return (
    <>
      <div className="flex items-center relative flex-wrap sm:flex-nowrap">
        <label className="w-1/4 sm:w-1/4 text-gray-700 pr-2 mb-2 sm:mb-0">
          {label}
        </label>
        <div className="flex items-center w-2/4 relative">
          <input
            type="tel"
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      {error && (
        <p
          className={`text-${
            messageColor === 'green' ? 'green-500' : 'red-500'
          } text-sm mt-1 ml-[25%]`}
        >
          {error.message}
        </p>
      )}
    </>
  );
};

export default PhoneNumberInput;
