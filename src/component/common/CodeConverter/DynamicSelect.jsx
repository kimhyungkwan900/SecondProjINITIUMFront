import { useState, useEffect } from 'react';

const DynamicSelect = ({ 
  value, 
  onChange, 
  placeholder, 
  fetchOptions, 
  ...props 
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedOptions = await fetchOptions();
        setOptions(fetchedOptions);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch options:", err);
      }
      setLoading(false);
    };

    loadOptions();
  }, [fetchOptions]);

  return (
    <select value={value} onChange={onChange} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {loading && <option value="">Loading...</option>}
      {error && <option value="">Error loading data</option>}
      {!loading && !error && options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default DynamicSelect;
