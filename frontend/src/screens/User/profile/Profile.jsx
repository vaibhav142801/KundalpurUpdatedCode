import React from "react";
import profileimg from "../../../assets/profileimg.jpg";
import "./Profile.css";
function Profile() {
  return (
    <>
      <div className="Profile-main-div">
        <div>
          <div className="main-inear-prifile-div">
            <div className="left-inear-div-profile">
              <h2>Complete your Profile</h2>
            </div>
            <div className="right-inear-div-profile">
              <div className="upload-profile-div-main">
                <input type="file" />
                <div className="profile-img-div">
                  <img src={profileimg} alt="profileimg" />
                </div>
                <p>Upload Photo</p>
              </div>
            </div>
          </div>
          <div className="form-main-div-profile">
            <div>
              <div className="input-group-profile">
                <label htmlFor="email">Full Name</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="enter email"
                  //   value={email}
                  //   onChange={handleInputChange}
                />
              </div>
              <div className="input-group-profile">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="enter email"
                  //   value={email}
                  //   onChange={handleInputChange}
                />
              </div>
              <div className="input-group-profile">
                <label htmlFor="email">Date of Birth </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="enter email"
                  //   value={email}
                  //   onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div>
                <div className="input-group-profile">
                  <label htmlFor="email">Mobile Number</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="enter email"
                    //   value={email}
                    //   onChange={handleInputChange}
                  />
                </div>
                <div className="input-group-profile">
                  <label htmlFor="email">Create password</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="enter email"
                    //   value={email}
                    //   onChange={handleInputChange}
                  />
                </div>
                <div className="input-group-profile">
                  <label htmlFor="email">Anniversary date</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="enter email"
                    //   value={email}
                    //   onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="input-group-profile1">
            <label htmlFor="email">Anniversary date</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="enter email"
              //   value={email}
              //   onChange={handleInputChange}
            />
          </div>
          <div className="save-btn-profile-div">
            <button className="save-btn-profile">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
