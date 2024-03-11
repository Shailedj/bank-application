import './nav.css';
export default function Nav() {

  return (
    <div className='div'> 
      <h1 className='head'>BadBank</h1>
      <nav>
        <a href='#/' >Home</a>
        <a href="#/create" >Create</a>
        <a href="#/deposit" >Deposit</a>
        <a href='#/withdraw' >WithDraw</a>
        <a href='#/alldata' >AllData</a>
      </nav>
    </div>
  )
}