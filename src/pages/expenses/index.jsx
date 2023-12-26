import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col bg-black">
      <div className="mx-auto my-8 justify-between">
        <div className="flex flex-col gap-6">
          <div className="mb-4">
            <div className="profile-photo flex  justify-center mt-4">
              <div>
                {profilePhoto && (
                  <div className="profile">
                    <img
                      className="rounded-full"
                      src={profilePhoto}
                      alt="Profile"
                    />
                    <button
                      className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={signUserOut}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="expenses-count overflow-auto">
              <table className="w-full">
                <caption className="text-gray-300 font-extrabold mb-5  text-center">
                  {name}'s Expense Tracker
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-3 sm:px-12 py-3 text-center">
                      Your Balance
                    </th>
                    <th scope="col" className="px-3 sm:px-12 py-3 text-center">
                      Income
                    </th>
                    <th scope="col" className="px-3 sm:px-12 py-3 text-center">
                      Expense
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      className="px-6 sm:px-12 py-4 font-medium text-gray-900 text-center dark:text-white"
                    >
                      {balance >= 0 ? (
                        <h2>${balance}</h2>
                      ) : (
                        <h2>-${balance * -1}</h2>
                      )}
                    </td>
                    <td className="px-6 sm:px-12 py-4 font-medium text-gray-900 text-center dark:text-white">
                      ${income}
                    </td>
                    <td className="px-6 sm:px-12 py-4 font-medium text-gray-900 text-center dark:text-white">
                      ${expenses}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="form-container">
              <form
                className="add-transaction flex flex-col"
                onSubmit={onSubmit}
              >
                <input
                  type="text"
                  placeholder="Description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  required
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <div className="flex flex-col mx-auto mb-3">
                  <div className="mx-auto">
                    <input
                      type="radio"
                      id="expense"
                      value="expense"
                      checked={transactionType === "expense"}
                      onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <label htmlFor="expense" className="text-gray-300 mx-2">
                      Expense
                    </label>
                    <input
                      type="radio"
                      id="income"
                      value="income"
                      checked={transactionType === "income"}
                      onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <label htmlFor="income" className="text-gray-300 mx-2">
                      Income
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        <div>
          <h3 className="font-extrabold text-center my-2">Transactions</h3>
        </div>
        <div>
          <table className="w-full bg-gray-800 text-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Transaction Amount</th>
                <th className="py-2 px-4 border-b">Transaction Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const {
                  description,
                  transactionAmount,
                  transactionType,
                  tableDate,
                } = transaction;
                return (
                  <tr key={tableDate}>
                    <td className="py-2 px-4 border-b">{description}</td>
                    <td
                      className={`py-2 px-4 border-b text-${
                        transactionType === "expense" ? "red" : "green"
                      }`}
                    >
                      ${transactionAmount}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <label
                        style={{
                          color:
                            transactionType === "expense" ? "red" : "green",
                        }}
                      >
                        {" "}
                        {transactionType}{" "}
                      </label>
                    </td>
                    <td className="py-2 px-4 border-b">{tableDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
