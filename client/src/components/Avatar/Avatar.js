import "./Avatar.scss";

const Avatar = ({ onChange }) => {
  return (
    <label htmlFor='avatar' className='signup__label'>
      Avatar
      <input
        type='file'
        id='avatar'
        className='signup__avatar'
        onChange={onChange}
      />
    </label>
  );
};

export default Avatar;
