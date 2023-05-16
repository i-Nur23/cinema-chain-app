export const Footer = () => {
  return (
    <div className=' bg-cyan-800'>
      <div className='container px-20 mx-auto'>
      <div className='flex justify-between py-4'>
        <div className='flex justify-between gap-6'>
          <div className='text-white font-cressida text-5xl'>
            Драйв
          </div>
          <div>
            <p className="text-white my-2">@2012-2023</p>
            <p className="text-white my-2">Сеть кинотеатров "Драйв"</p>
          </div>
        </div>
        <div>
          <ul style={{direction: 'rtl'}}>
            <li className='my-2'>
              <a href="/" className='text-white hover:text-gray-300 ease-in-out duration-200'>
                Афиша
              </a>
            </li>
            <li className='my-2'>
              <a href="/chain" className='text-white hover:text-gray-300 ease-in-out duration-200'>
                Сеть
              </a>
            </li>
            <li className='my-2'>
              <a href="/cityoffices" className='text-white hover:text-gray-300 ease-in-out duration-200'>
                Кинотеатры
              </a>
            </li>
            <li className='my-2'>
              <a href="/complaints" className='text-white hover:text-gray-300 ease-in-out duration-200' style={{direction: 'rtl'}}>
                Оставить жалобу
              </a>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  )
}