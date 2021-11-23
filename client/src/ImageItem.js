const ImageItem = ({ key, id, description, url }) => {
  return (
    <span>
      <img src={url} />
      <div>
        {id}
        {description}
      </div>
    </span>
  );
};
export default ImageItem;
