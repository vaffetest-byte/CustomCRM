import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Mock Data Initialization
    const [contacts, setContacts] = useState([
        { id: 1, name: 'Alice Freeman', email: 'alice@example.com', company: 'TechNova', status: 'Active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', company: 'BuildCo', status: 'Lead' },
    ]);

    const [lenders, setLenders] = useState([
        { id: 1, name: 'Capital One Biz', repName: 'Sarah Conner', email: 'sarah@capitalone.com', tier: 'Tier 1' },
        { id: 2, name: 'Rapid Finance', repName: 'Mike Ross', email: 'mike@rapid.com', tier: 'Tier 2' },
    ]);

    const [deals, setDeals] = useState([
        {
            id: 1,
            dealName: 'TechNova Expansion',
            dba: 'TechNova',
            stage: 'Underwriting',
            amount: 50000,
            owner: 'Admin',
            offers: [
                { id: 1, lenderId: 1, amount: 45000, rate: 1.25, term: 120, status: 'Presented' }
            ],
            attachments: [
                { id: 'f1', name: 'Bank_Statements_Jan-Mar.pdf', size: '2.4 MB', type: 'application/pdf' },
                { id: 'f2', name: 'Merchant_Application_Signed.pdf', size: '1.1 MB', type: 'application/pdf' }
            ]
        }
    ]);

    const addDeal = (deal) => {
        setDeals([...deals, { ...deal, id: Date.now() }]);
    };

    const updateDeal = (id, updatedDeal) => {
        setDeals(deals.map(d => d.id === id ? updatedDeal : d));
    };

    const [users, setUsers] = useState([
        { id: 1, name: 'Ryan Crawford', email: 'ryan@stakent.com', role: 'Admin', status: 'Active', avatar: null },
        { id: 2, name: 'Sarah Connor', email: 'sarah@stakent.com', role: 'Manager', status: 'Active', avatar: null },
        { id: 3, name: 'Mike Ross', email: 'mike@stakent.com', role: 'Sales', status: 'Inactive', avatar: null },
    ]);

    const addUser = (user) => {
        setUsers([...users, { ...user, id: Date.now(), status: 'Active' }]);
    };

    const updateUser = (id, updatedUser) => {
        setUsers(users.map(u => u.id === id ? updatedUser : u));
    };

    const deleteUser = (id) => {
        setUsers(users.filter(u => u.id !== id));
    };

    const addLender = (lender) => {
        setLenders([...lenders, { ...lender, id: Date.now() }]);
    };

    return (
        <DataContext.Provider value={{
            contacts, setContacts,
            lenders, setLenders, addLender,
            deals, setDeals, addDeal, updateDeal,
            users, addUser, updateUser, deleteUser
        }}>
            {children}
        </DataContext.Provider>
    );
};
