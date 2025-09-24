export function codeOption(items, addOption, upperCaseLabel = false) {
  if (!items) return false;
  const options =
    items?.map((item) => ({
      label: upperCaseLabel
        ? item.commonName.charAt(0).toUpperCase() + item.commonName.slice(1)
        : item.commonName,
      value: item.commonValue,
    })) || [];
  return addOption ? [addOption, ...options] : options;
}
