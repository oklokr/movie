"use client";

interface Column<T> {
  label: string;
  key: keyof T | string;
  width?: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  onRowClick?: (item: T) => void;
  rowKey?: keyof T;
}

export default function Table<T extends { [key: string]: any }>({
  columns,
  data,
  loading = false,
  onRowClick,
  rowKey,
}: TableProps<T>) {
  if (loading) return <div className="spinner" />;
  return (
    <div className="table">
      <table>
        <colgroup>
          {columns.map((col) => (
            <col key={String(col.key)} style={{ width: col.width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={rowKey ? String(item[rowKey]) : idx}
                onClick={() => onRowClick && onRowClick(item)}
                style={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
