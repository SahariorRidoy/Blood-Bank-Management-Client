import React, { useState } from "react";

const FundingPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details:", paymentDetails);
    alert("Payment successful!");
  };

  return (
    <div className="funding-page max-w-5xl mx-auto mt-16 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Support Our Cause</h1>
      <p className="text-center text-gray-600 mb-6">Your contribution can make a real difference. Please enter your payment details below.</p>

      <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            required
            className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="form-row flex gap-4 mb-4">
          <div className="form-group w-1/2">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentDetails.expiryDate}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="form-group w-1/2">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={paymentDetails.amount}
            onChange={handleInputChange}
            required
            className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Donate
        </button>
      </form>
    </div>
  );
};

export default FundingPage;