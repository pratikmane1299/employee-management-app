function Radio({ name, value, register, }) {
  return (
    <div className="form-check form-check-inline">
      <label className="form-check-label">
        <input
          type="radio"
          name={name}
          className="form-check-input"
          value={value}
          ref={register}
        />
        {value}
      </label>
    </div>
  );
}

export default Radio;
