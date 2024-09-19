import logo from "../asset/icons/logo.png";

const Nav = () => {
  return (
    <header className='flex justify-center p-5'>
        <nav>
            <a href ="/">
                <img src={logo} alt='Logo' width={130} height={29}/>
            </a>
        </nav>
    </header>
  )
}

export default Nav