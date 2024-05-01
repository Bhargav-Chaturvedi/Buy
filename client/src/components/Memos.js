import "./com.css";
import React, { useState, useEffect } from "react";
const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const memosMessage = async () => {
            const memos = await contract.getMemos();
            setMemos(memos);
        };
        contract && memosMessage();
    }, [contract]);

    return (
        <div className="memo-container">
        <table>
            <thead>
                <tr className="columnNames">
                    <th className="column">Name</th>
                    <th className="column">Timestamp</th>
                    <th className="column">Message</th>
                    <th className="column">From</th>
                </tr>
            </thead>
            <tbody>
                {memos.map((memo) => (
                    <tr key={memo.id}>
                        <td className="memo-cell">{memo.name}</td>
                        <td className="memo-cell">
                            {new Date(memo.timestamp * 1000).toLocaleString()}
                        </td>
                        <td className="memo-cell">{memo.message}</td>
                        <td className="memo-cell">{memo.from}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default Memos;