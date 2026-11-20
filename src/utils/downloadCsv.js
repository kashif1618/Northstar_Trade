export function downloadCsv(filename, rows) {
  const escapeCell = (value) => `"${String(value).replaceAll('"', '""')}"`;
  const csv = rows.map((row) => row.map(escapeCell).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
