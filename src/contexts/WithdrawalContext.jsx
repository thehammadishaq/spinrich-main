import  { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const WithdrawalContext = createContext();

export const WithdrawalProvider = ({ children }) => {
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);

    return (
        <WithdrawalContext.Provider value={{ withdrawalRequests, setWithdrawalRequests }}>
            {children}
        </WithdrawalContext.Provider>
    );
};

// Add prop types validation
WithdrawalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
