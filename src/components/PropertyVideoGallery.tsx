interface PropertyVideoGalleryProps {
    videos: string[];
  }
  
  export default function PropertyVideoGallery({
    videos,
  }: PropertyVideoGalleryProps) {
    if (!videos || videos.length === 0) return null;
  
    return (
      <div className="space-y-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl bg-black"
          >
            <video
              controls
              playsInline
              className="w-full h-[250px] md:h-[500px] object-cover"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    );
  }