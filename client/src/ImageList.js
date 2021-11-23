import ImageItem from './ImageItem';

const ImageList = ({ data }) => {
  return Object.values(data).map((e) => {
    return (
      <ImageItem
        id={e.id}
        description={e.description}
        url={e.assets.preview.url}
      />
    );
  });
};
export default ImageList;
