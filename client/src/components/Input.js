function Input({ name, type, label, classes, placeholder, register, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        ref={register}
      />
      <div className="invalid-feedback">{error?.message}</div>
    </div>
  );
}

export default Input;
