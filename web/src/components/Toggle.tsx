import { ChangeEvent } from 'react';

type ToggleProps = {
  label: string
  labelClassNames?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Toggle = ({ label, labelClassNames, onChange }: ToggleProps) => {
  return (
    <label
      htmlFor="toggleThree"
      className="flex items-center cursor-pointer select-none text-dark dark:text-white w-fit"
    >
      <span className={`mr-2.5 ${labelClassNames}`}>{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          id="toggleThree"
          className="peer sr-only"
          onChange={onChange}
        />
        <div
          className="block h-8 rounded-full bg-gray-200 dark:bg-dark-2 w-14"
        ></div>
        <div
          className="absolute flex items-center justify-center w-6 h-6 transition bg-white rounded-full dot dark:bg-dark-5 left-1 top-1 peer-checked:translate-x-full peer-checked:bg-primary"
        >
         <span className="hidden active">
            <svg
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
               <path
                 d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                 fill="white"
                 stroke="white"
                 strokeWidth="0.4"
               />
            </svg>
         </span>
          <span className="text-body-color dark:text-light inactive">
            <svg
              className="w-4 h-4 strokeCurrent"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M6 18L18 6M6 6l12 12"
               ></path>
            </svg>
         </span>
        </div>
      </div>
    </label>
  )
}
