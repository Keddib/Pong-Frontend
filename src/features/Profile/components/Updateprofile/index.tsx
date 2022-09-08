import React, { ChangeEvent, useRef, useState } from "react";
import useAuth from "hooks/useAuth";
import Image from "components/Image";
import TwoFA from "features/TFA";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Spinner } from "components/Loading";
import { User } from "types/app";
import useProfileState from "features/Profile/hooks/useProfileState";

function EditProfile() {
  const { user, updateUser } = useAuth();
  const send = useProfileState().send;
  const [image, setImage] = useState(user.avatar);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const subButtonRef = useRef(null);

  function hundleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const elm = event.target.files[0];
      setImage(URL.createObjectURL(elm));
    }
  }

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (subButtonRef.current) {
      const currentButton = subButtonRef.current as typeof subButtonRef & {
        disabled: boolean;
      };
      currentButton.disabled = true;
    }
    setLoading(true);
    setError("");
    const target = e.target as typeof e.target & {
      elements: {
        nickname: { value: string };
        avatar: { files: File[] };
      };
    };
    const nickname = target.elements.nickname.value;
    const avatar = target.elements.avatar.files[0];
    if (!nickname && !avatar) {
      setError("one failed is required");
      setLoading(false);
      if (subButtonRef.current) {
        const currentButton = subButtonRef.current as typeof subButtonRef & {
          disabled: boolean;
        };
        currentButton.disabled = false;
      }
      return;
    }
    // send response to update user
    try {
      if (nickname) {
        const res = await axiosPrivate.patch<User>(`/user/nickname`, {
          nickname,
        });
        updateUser(res.data);
        send({
          type: "DATA_CHANGED",
          data: res.data,
          error: null,
        });
      }
      if (avatar) {
        const avatarData = new FormData();
        avatarData.append("avatar", avatar, avatar.name);
        const res = await axiosPrivate.patch<User>(`/user/avatar`, avatarData);
        updateUser(res.data);
        send({
          type: "DATA_CHANGED",
          data: res.data,
          error: null,
        });
      }
      target.elements.nickname.value = "";
    } catch (err) {
      setError("upload filed! please try again");
    }
    setLoading(false);
    if (subButtonRef.current) {
      const currentButton = subButtonRef.current as typeof subButtonRef & {
        disabled: boolean;
      };
      currentButton.disabled = false;
    }
  }

  return (
    <div className="rounded-2xl bg-spaceCadet p-2 md:p-4 flex flex-col gap-2">
      <h2 className="mb-2 capitalize text-xl md:text-3xl">Edit Profile</h2>
      <div className="w-full flex flex-col items-center gap-4 py-10">
        <form
          className="flex flex-col gap-8 pt-4 w-full max-w-[400px]"
          onSubmit={submit}
        >
          <label htmlFor="photo" className="flex items-center gap-2">
            <div className="shrink-0 inline h-16 w-16 ">
              <Image
                className="object-cover rounded-full"
                imageUrl={image}
                alt="Current profile"
              />
            </div>
            <span className="sr-only">Choose profile photo</span>
            <input
              onChange={hundleImageChange}
              id="avatar"
              type="file"
              className="profile-picture-input"
            />
          </label>
          <label htmlFor="nickname" className="block font-poppins capitalize ">
            <span className="text-lotion">nickname</span>
            <input
              id="nickname"
              placeholder="nickname"
              type="text"
              className="input--2 text-lotion border border-lotion placeholder-lotion/50"
            />
          </label>
          {error && <p className="text-red/70">{error}</p>}
          <button
            ref={subButtonRef}
            type="submit"
            className="button--2 flex justify-center items-center"
          >
            {loading ? <Spinner /> : "continue"}
          </button>
        </form>
        {user.tfaEnabled ? (
          <p> Two-factor authentication enable ✅</p>
        ) : (
          <TwoFA />
        )}
      </div>
    </div>
  );
}

export default EditProfile;
