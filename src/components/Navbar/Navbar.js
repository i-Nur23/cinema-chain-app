export const Navbar = () => {
  return (
    <div className='container px-20'>
      <div className='flex justify-between py-4'>
        <a className=' my-auto'>
          <p className="font-cressida text-5xl">Драйв</p>
        </a>
        <div className="flex justify-between gap-20">
          <a href="#" className='my-auto text-xl p-4 hover:text-cyan-700 ease-in-out duration-150'>
            Афиша
          </a>

          <a href="#" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Сеть
          </a>

          <a href="#" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Акции
          </a>

          <a href="#" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Новости
          </a>
        </div>

        <a className='my-auto text-xl p-4 rounded hover:bg-cyan-700 hover:text-white ease-in-out duration-300' href="#">
          <p>Вход</p>
        </a>


      </div>
      <hr/>
    </div>
  )
}