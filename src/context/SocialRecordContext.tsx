import React, { createContext, useContext, useEffect, useState } from 'react';
import { SocialRecord } from '../types';

interface SocialRecordContextType {
  records: SocialRecord[];
  addRecord: (record: Omit<SocialRecord, 'id'>) => void;
  updateRecord: (id: string, record: Omit<SocialRecord, 'id'>) => void;
  deleteRecord: (id: string) => void;
  exportData: () => void;
}

const SocialRecordContext = createContext<SocialRecordContextType | undefined>(undefined);

export const SocialRecordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<SocialRecord[]>(() => {
    const savedRecords = localStorage.getItem('dogSocialRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  useEffect(() => {
    localStorage.setItem('dogSocialRecords', JSON.stringify(records));
  }, [records]);

  const addRecord = (record: Omit<SocialRecord, 'id'>) => {
    const newRecord = {
      ...record,
      id: crypto.randomUUID(),
    };
    setRecords(prev => [...prev, newRecord]);
  };

  const updateRecord = (id: string, record: Omit<SocialRecord, 'id'>) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...record, id } : r));
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(records, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `dog-social-records-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <SocialRecordContext.Provider value={{ records, addRecord, updateRecord, deleteRecord, exportData }}>
      {children}
    </SocialRecordContext.Provider>
  );
};

export const useSocialRecords = () => {
  const context = useContext(SocialRecordContext);
  if (context === undefined) {
    throw new Error('useSocialRecords must be used within a SocialRecordProvider');
  }
  return context;
}; 