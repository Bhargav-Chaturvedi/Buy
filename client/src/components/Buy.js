import { ethers } from 'ethers';
import "./com.css";
// import "./shop.png";
const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.1") }; // Fixed the typo here
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    console.log("Transection is done");
  };

  return (
   <>
    <p className="messages-title">Give Your Grocery Orders</p>
    <form onSubmit={buyChai} className='forms'>
      <label className='lables'>Name</label>
      <input type="text" id="name" placeholder="Enter your name" className='inputArea'/>
      <label className='lables'>Groceries Items </label>
      <input type="text" id="message" placeholder="Enter your Message for us" className='inputArea'/>
      <button type="submit" className='button' disabled={!state.contract}>Pay</button>
    </form>
    </>
  );
};

export default Buy;
