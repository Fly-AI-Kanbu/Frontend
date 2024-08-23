import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import Common from "@style/common"

const userInfoComponentStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .5em;

  width: 100%;
  padding: 2em;

  background-color: rgba(${Common.colors.border});

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
    .nationality {
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.1);
      width: max-content;
      padding: .3em .5em;
      border-radius: .5em;
      font-size: .7em;
    }
  }
`;

export const UserInfoComponent = () => {
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태
  const [loading, setLoading] = useState(true);   // 로딩 상태
  const [imageSrc, setImageSrc] = useState("");   // 프로필 이미지 경로

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 사용자 정보 가져오기
        console.log("Fetching user data...");
        const userResponse = await fetch('http://127.0.0.1:8000/user/1/get-user-info');
        const userData = await userResponse.json();
        setUserData(userData);

        // 사용자 국기 이미지 가져오기
        console.log("Fetching user country image...");
        const imageResponse = await fetch('http://127.0.0.1:8000/user/1/get-country-image');
        if (imageResponse.ok) {
          const imageBlob = await imageResponse.text();
          setImageSrc(`data:image/svg+xml;base64,${btoa(imageBlob)}`);
        } else {
          console.error("Failed to fetch country image.");
        }

        setLoading(false); // 데이터 로드 완료
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
    <div className={userInfoComponentStyle}>
      {/* 백엔드에서 받아온 프로필 이미지를 사용 */}
      <img src={imageSrc} alt="Country flag" />
      <div className='profile'>
        <div className='name'>{userData.user_name}</div>
        <div className='nationality'>{userData.country}</div>
      </div>
    </div>
  );
};
