import React from 'react'
import { aboutAppImageLinks } from '../../Links/images/imageLinks'

const VideoplayerComponent = () => {

  return (
    <div className="mb-8">
      <div className="w-full lg:w-3/5 mx-auto rounded-md overflow-hidden">
        <iframe
          src={aboutAppImageLinks.appVideoPlayLink}
          className="w-full h-96"
          title="About App Video"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
    </div>
  );
}



export default VideoplayerComponent