// This is a custom Table component located in your components/ui folder.
import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-md p-4">
      <table className="min-w-full">{children}</table>
    </div>
  );
};

export const TableHead: React.FC = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableRow: React.FC = ({ children }) => (
  <tr className="border-b">{children}</tr>
);

export const TableCell: React.FC = ({ children }) => (
  <td className="px-4 py-2">{children}</td>
);

export const TableHeaderCell: React.FC = ({ children }) => (
  <th className="px-4 py-2 text-left">{children}</th>
);
