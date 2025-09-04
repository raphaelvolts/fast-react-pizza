export default function InputBox({
  type,
  name,
  id,
  defaultValue = "",
  value = undefined,
  onChange = null,
  width,
}) {
  const base =
    "border border-stone-200 bg-stone-50 transition-all duration-100 focus:outline-yellow-300";
  const styles = {
    width: {
      small: base + " ml-1 rounded-full px-4 py-2 md:px-6 md:py-3 w-96",
      full: base + " ml-1 rounded-full px-4 py-2 md:px-6 md:py-3 w-full",
    },
    checkbox:
      base +
      " h-4 w-4 accent-yellow-400 active:ring active:ring-yellow-300 active:ring-offset-2",
  };

  if (type === "checkbox")
    return (
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={styles[type]}
      />
    );
  if (defaultValue !== "")
    return (
      <input
        id={id}
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className={styles.width[width]}
        required
      />
    );
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={styles.width[width]}
      required
    />
  );
}
// rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3
