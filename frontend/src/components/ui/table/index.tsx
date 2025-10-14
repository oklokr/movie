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
  selectTable?: boolean;
  selectKey?: string | number | null;
  onSelect?: (item: T) => void;
}

export default function Table<T extends { [key: string]: any }>({
  columns,
  data,
  loading = false,
  onRowClick,
  rowKey,
  selectTable = false,
  selectKey = null,
  onSelect,
}: TableProps<T>) {
  if (loading) return <div className="spinner" />;
  return (
    <div className="table">
      <table>
        <colgroup>
          {selectTable && <col style={{ width: "40px" }} />}
          {columns.map((col) => (
            <col key={String(col.key)} style={{ width: col.width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {selectTable && <th></th>}
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectTable ? 1 : 0)}
                style={{ textAlign: "center" }}
              >
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => {
              const key = rowKey ? item[rowKey] : idx;
              const isSelected = key === selectKey;
              return (
                <tr
                  key={rowKey ? String(item[rowKey]) : idx}
                  onClick={() => onRowClick && onRowClick(item)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {selectTable && (
                    <td>
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => onSelect?.(item)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={String(col.key)}>
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
