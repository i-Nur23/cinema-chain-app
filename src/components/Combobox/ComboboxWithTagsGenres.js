import {CheckIcon, ChevronUpDownIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {Combobox, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";

export const ComboboxWithTagsGenres = ({values, setValues, initList, placeholder, isInvalid, onChange}) => {

  const [query, setQuery] = useState('');

  const filteredValues =
    query === ''
      ? initList
      : initList.filter((g) =>
        g.description
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return(
    <Combobox value={values} onChange={setValues} by="id" multiple>
      <div className="relative">
        <div
          className={`relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border ${!isInvalid ? 'border-gray-300' : 'border-red-700'} focus:outline-none`}
        >
          <div className={`flex px-2 min-h-[40px] flex-wrap ${values.length !== 0 ? 'pt-2' : ''}`}
               onChange={onChange}>
            {
              values.map(value =>
                <div className="flex gap-2 m-1 text-sm h-4/5 p-1 rounded bg-gray-200"
                     onChange={onChange}
                >
                  {value.description}
                  <XMarkIcon className="w-4 h-4 m-auto cursor-pointer" onClick={() => setValues(values.filter(_value => _value.id !== value.id ))}/>
                </div>
              )
            }
            <Combobox.Input
              className="w-full border-none py-2 px-2 text-sm leading-5 text-gray-900 focus:ring-0"
              placeholder={placeholder}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={onChange}>
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredValues.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Ничего не найдено.
              </div>
            ) : (
              filteredValues.map((genre, index) => (
                <Combobox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-200' : ''
                    }`
                  }
                  value={genre}
                >
                  {({ selected, active }) => (
                    <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {genre.description}
                                </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? '' : 'text-gray-700'
                          }`}
                        >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
