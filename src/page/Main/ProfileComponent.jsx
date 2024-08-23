import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import Common from "@style/common"

const rankStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .5em;

  width: 100%;
  padding: 1em 1em 0;

  background-color: rgba(${Common.colors.primary300});

  img {
    width: 3.5em;
    height: 3.5em;

    border-radius: 50%;
    border: 2px solid rgba(${Common.colors.text});
  }

  .profile {
    display: flex;
    flex-direction: column;

    font-size: 1em;
    font-weight: 800;
    color: rgba(${Common.colors.text});

    .name {
      font-size: 1em;
      font-weight: 800;
    }
    
    .league-rank, .country {
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.1);
      width: max-content;
      padding: .3em .5em;
      border-radius: .5em;
      font-size: .7em;
    }
  }
`;

export const ProfileComponent = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");  // 이미지 경로 저장

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const userResponse = await fetch('http://127.0.0.1:8000/user/1/get-user-info');
        const userData = await userResponse.json();
        setUserData(userData);

        console.log("Fetching user country image...");
        // 이미지를 가져오는 API 호출
        const imageResponse = await fetch('http://127.0.0.1:8000/user/1/get-country-image');
        if (imageResponse.ok) {
          const imageBlob = await imageResponse.text();  // SVG는 텍스트로 처리
          setImageSrc(`data:image/svg+xml;base64,${btoa(imageBlob)}`);  // base64로 변환하여 사용
        } else {
          console.error("Failed to fetch country image.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={rankStyle}>
      <img src={imageSrc} alt="Country flag" />
      <div className="profile">
        <div className="name">{userData.user_name}</div>
        <div className="country">{userData.country}</div>
      </div>
    </div>
  );
};
