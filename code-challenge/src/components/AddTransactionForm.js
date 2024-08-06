import React, { useState } from 'react';

function AddTransactionForm({ onAddTransaction }) {
  //const [formData, setFormData] = useState({
  //   date: '',
  //   description: '',
  //   category: '',
  //   amount: ''
  // });

  // Handle changes in form inputs
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.date && formData.description && formData.category && formData.amount) {
  //     try {
  //       await onAddTransaction(formData);
  //       setFormData({
  //         date: '',
  //         description: '',
  //         category: '',
  //         amount: ''
  //       });
  //     } catch (error) {
  //       console.error('Error adding transaction:', error);
  //     }
  //   } else {
  //     alert('Please fill out all fields.');
  //   }
  // };
const [date,setDate] = useState('')
const [description,setDescription] = useState('')
const [category,setCategory] = useState('')
const [amount,setAmount] = useState('')
async function submitData(event){
  event.preventDefault()
  let response = await fetch('http://localhost:8001/transactions',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      date:date,
      description:description,
      category:category,
      amount:amount
    })
  })
  let data = await response.json()
}
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={submitData} >
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e)=>{setDate(e.target.value)}}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={category}
            onChange={(e)=>{setCategory(e.target.value)}}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={amount}
            onChange={(e)=>{setAmount(e.target.value)}}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
