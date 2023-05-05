import { Tab } from '@headlessui/react'
import {ActorsPanel, DirectorsPanel} from "../../../components/TabPanels";

export const ActorsDirectorsList = () => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return(
    <div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            key={0}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                selected
                  ? 'bg-white shadow'
                  : 'hover:text-blue-800'
              )
            }
          >
            Актёры
          </Tab>
          <Tab
            key={1}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                selected
                  ? 'bg-white shadow'
                  : 'hover:text-blue-800'
              )
            }
          >
            Режиссёры
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 focus:ring-0">
            <Tab.Panel
              key={0}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none'
              )}
            >
              <ActorsPanel/>
            </Tab.Panel>
          <Tab.Panel
            key={1}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none'
            )}
          >
            <DirectorsPanel/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}