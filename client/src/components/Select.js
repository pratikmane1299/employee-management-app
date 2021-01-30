function Select({ name, label, options, classes, register, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        className={`form-control ${error ? 'is-invalid': ''}`}
        placeholder="Select Department"
        ref={register}
      >
        <option value="">select</option>
        {options.map((value, i) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{error?.message}</div>
    </div>
  );
}

export default Select;
