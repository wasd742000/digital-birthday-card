import React from 'react';

const LazyLoadedVideo = () => {
  return (
    <video controls>
      <source src="/assets/videos/1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyLoadedVideo;
