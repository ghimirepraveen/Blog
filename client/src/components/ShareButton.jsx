import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  WhatsappIcon,
} from "react-share";

const ShareButtons = ({ url, title }) => {
  return (
    <div className="flex justify-end gap-4 mt-4">
      <FacebookShareButton url={url} quote={title} hashtag="#yourHashtag">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={url} appId="YOUR_FACEBOOK_APP_ID">
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton>
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
