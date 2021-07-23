import "./Avatar.scss";

const Avatar = ({ register }) => {
  return (
    <label htmlFor='avatar' className='signup__label'>
      Avatar
      <input
        ref={register}
        type='file'
        name='avatar'
        id='avatar'
        className='signup__avatar'
      />
    </label>
  );
};

export default Avatar;
