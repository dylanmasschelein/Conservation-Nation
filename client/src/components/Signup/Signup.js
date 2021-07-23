import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Signup.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { displayModal } from "../../redux/reducers/modalSlice";
import { toggleNavbar } from "../../redux/reducers/navbarSlice";
import { toggleLogin } from "../../redux/reducers/loginSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [swapForm, setSwapForm] = useState(true);

  const successAlert = () => {
    dispatch(
      displayModal({
        toggleModal: true,
        redirect: "/user/register",
        text: "Signup successful! Please login to continue",
      })
    );
    dispatch(toggleNavbar(true));
    dispatch(toggleLogin(true));
  };

  const failedAlert = () => {
    dispatch(
      displayModal({
        toggleModal: true,
        redirect: "/user/register",
        text: "Passwords must match!",
      })
    );
  };

  // Used React--hooks-form library for form validation
  const onSubmit = async (data) => {
    const avatar = new FormData();
    avatar.append("avatar", data.avatar[0]);

    console.log(data.avatar[0].name);
    const signup = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      country: data.country,
      volunteer: data.volunteer,
      avatar: data.avatar[0].name,
      about: data.about,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const formRes = await axios.post(`/user/register`, signup);
      await axios.post(`/avatar`, avatar);

      formRes.data.status === "ok"
        ? successAlert(formRes.data.data)
        : failedAlert();
    } catch (err) {
      console.error(err);
    }
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
        {swapForm && (
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
        )}
        {!swapForm && (
          <div className='signup__right'>
            {/* <label htmlFor='avatar' className='signup__label'>
              Avatar
              <input
                {...register("avatar", { required: true })}
                type='file'
                id='avatar'
                className='signup__avatar'
              />
            </label> */}
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
              {errors.email && (
                <p className='signup__error'>Email is required</p>
              )}
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
        )}
      </form>
      <FontAwesomeIcon
        icon={swapForm ? faArrowRight : faArrowLeft}
        onClick={() => setSwapForm(!swapForm)}
        className='signup__icon'
      />
    </div>
  );
};

export default Signup;
