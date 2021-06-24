import "./Signup.scss";
import axios from "axios";
import { useForm } from "react-hook-form";

const Signup = (props) => {
  const { setOpen, setOpenLogin, setRedirect, setToggleModal, setModalText } =
    props;

  const successAlert = () => {
    setRedirect("/user/register");
    setToggleModal(true);
    setModalText("Signup successful! Please login to continue");
    setOpen(true);
    setOpenLogin(true);
  };

  const failedAlert = () => {
    setRedirect("/user/register");
    setToggleModal(true);
    setModalText("Passwords must match!");
  };

  // Used React--hooks-form library for form validation
  const onSubmit = (data) => {
    axios
      .post(`http://localhost:8080/user/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        country: data.country,
        volunteer: data.volunteer,
        about: data.about,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
      .then((res) => {
        res.data.status === "ok" ? successAlert(res.data.data) : failedAlert();
      })
      .catch((err) => console.error(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className='signup'>
      <h2 className='signup__name'>Register here!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='signup__form'>
        <div className='signup__left'>
          <label htmlFor='firstName' className='signup__label'>
            First name
            <input
              {...register("firstName", { required: true })}
              id='firstName'
              className='signup__input'
            />
            {errors.firstName && (
              <p className='signup__error'>First name is required</p>
            )}
          </label>
          <label htmlFor='lastName' className='signup__label'>
            Last Name
            <input
              {...register("lastName", { required: true })}
              className='signup__input'
            />
            {errors.lastName && (
              <p className='signup__error'>Last name is required</p>
            )}
          </label>
          <label htmlFor='address' className='signup__label'>
            Address
            <input
              {...register("address", { required: true })}
              id='address'
              className='signup__input'
            />
            {errors.address && (
              <p className='signup__error'>Address is required</p>
            )}
          </label>
          <label htmlFor='city' className='signup__label'>
            City
            <input
              {...register("city", { required: true })}
              id='city'
              className='signup__input'
            />
            {errors.city && <p className='signup__error'>City is required</p>}
          </label>
          <label htmlFor='country' className='signup__label'>
            Country
            <input
              {...register("country", { required: true })}
              id='country'
              className='signup__input'
            />
            {errors.country && (
              <p className='signup__error'>Country is required</p>
            )}
          </label>

          <label htmlFor='about' className='signup__label'>
            About you...
            <input
              type='textarea'
              {...register("about", { required: true })}
              id='about'
              className='signup__input signup__input--about'
            />
            {errors.about && (
              <p className='signup__error'>About you is required</p>
            )}
          </label>
        </div>
        <div className='signup__right'>
          <label htmlFor='avatar' className='signup__label'>
            Avatar
            <input type='file' id='avatar' className='signup__avatar' />
          </label>
          <label
            htmlFor='volunteer'
            className='signup__label signup__label--radio'
          >
            Avaliable to volunteer?
          </label>
          <div className='signup__radio'>
            <label>
              <input
                type='radio'
                value='Yes'
                {...register("volunteer", { required: true })}
                id='yes'
              />
              Yes
            </label>
            <label>
              <input
                type='radio'
                value='No'
                {...register("volunteer", { required: true })}
                id='no'
              />
              No
              {errors.volunteer && (
                <p className='signup__error'>Availabilty is required</p>
              )}
            </label>
          </div>

          <label htmlFor='email' className='signup__label'>
            Email
            <input
              type='email'
              {...register("email", { required: true })}
              id='email'
              className='signup__input'
            />
            {errors.email && <p className='signup__error'>Email is required</p>}
          </label>
          <label htmlFor='password' className='signup__label'>
            Password
            <input
              type='password'
              {...register("password", { required: true })}
              id='password'
              className='signup__input'
            />
            {errors.password && (
              <p className='signup__error'>Password is required</p>
            )}
          </label>
          <label htmlFor='password' className='signup__label'>
            Confirm Password
            <input
              type='password'
              {...register("confirmPassword", { required: true })}
              id='confirmPassword'
              className='signup__input'
            />
            {errors.confirmPassword && (
              <p className='signup__error'>Confirm password is required</p>
            )}
          </label>

          <button type='submit' className='signup__submit'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
