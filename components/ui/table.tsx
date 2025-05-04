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

// Define the prop types for each of the table components
interface TableHeadProps {
  children: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

interface TableRowProps {
  children: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({ children }) => (
  <tr className="border-b">{children}</tr>
);

interface TableCellProps {
  children: React.ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({ children }) => (
  <td className="px-4 py-2">{children}</td>
);

interface TableHeaderCellProps {
  children: React.ReactNode;
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ children }) => (
  <th className="px-4 py-2 text-left">{children}</th>
);
